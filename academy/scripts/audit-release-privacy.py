"""Read-only review of an explicitly selected public Academy export.

Checks published text, PDF text/metadata and ZIP members. It reports locations,
never matched sensitive values. This is a release check, not a privacy certification.
"""
import argparse
import json
import re
from pathlib import Path, PurePosixPath
from zipfile import ZipFile
from pypdf import PdfReader

parser = argparse.ArgumentParser()
parser.add_argument("export", type=Path)
args = parser.parse_args()
root = args.export.resolve(strict=True)
assert (root / "zh" / "cases" / "index.html").is_file(), "Select the public Academy export"
patterns = {
    "local-source-path": r"file://|[A-Z]:[\\/](?:AI(?: Project)?|Business|Users)[\\/]",
    "private-thread-or-attachment": r"codex://threads/|微信图片_\d+|codex-clipboard-[a-f0-9-]+",
    "private-key": r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----",
    "credential-shaped-value": r"(?:sk-(?:proj-)?[A-Za-z0-9_-]{24,}|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})",
    "phone-shaped-value-requires-review": r"(?<!\d)(?:\+86[- ]?)?1[3-9]\d{9}(?!\d)",
    "internal-editorial-context": r"原始教研材料|按用户提供的教研|对原始教研线索的加工|supplied curriculum image|How curriculum leads were processed",
}
text_types = {".html", ".json", ".md", ".js", ".css", ".txt", ".svg", ".xml", ".py", ".csv"}
issues = []
counts = {"text_files": 0, "pdf_files": 0, "pdf_pages": 0, "zip_files": 0, "zip_members": 0}


def scan(text, location):
    for kind, pattern in patterns.items():
        if re.search(pattern, text, re.IGNORECASE):
            issues.append({"location": location, "kind": kind})
    for address in re.findall(r"[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}", text):
        if not re.search(r"@(?:[\w.-]+\.)?(?:example\.(?:com|org|net)|test|invalid)$", address):
            issues.append({"location": location, "kind": "email-requires-owner-review"})


for file in root.rglob("*"):
    if not file.is_file():
        continue
    location = file.relative_to(root).as_posix()
    if file.suffix.lower() in text_types:
        counts["text_files"] += 1
        scan(file.read_text(encoding="utf-8"), location)
    elif file.suffix.lower() == ".pdf":
        counts["pdf_files"] += 1
        reader = PdfReader(file)
        counts["pdf_pages"] += len(reader.pages)
        scan(str(reader.metadata or {}), location + "#metadata")
        for index, page in enumerate(reader.pages):
            scan(page.extract_text() or "", location + "#page=" + str(index + 1))
            for annot in page.get("/Annots", []):
                scan(str(annot.get_object()), location + "#annotation=" + str(index + 1))
    elif file.suffix.lower() == ".zip":
        counts["zip_files"] += 1
        with ZipFile(file) as archive:
            for member in archive.infolist():
                counts["zip_members"] += 1
                name = PurePosixPath(member.filename)
                if name.is_absolute() or ".." in name.parts or any(part in {".git", ".env", "__pycache__"} for part in name.parts):
                    issues.append({"location": location, "kind": "unexpected-archive-path"})
                scan(member.filename, location + "#member-name")
                if not member.is_dir() and name.suffix.lower() in text_types:
                    scan(archive.read(member).decode("utf-8"), location + "#" + name.as_posix())

print(json.dumps({"scope": "Public Academy export; text, PDF content/metadata/links and ZIP members. Pattern review only; hosting logs, browser notes and semantic re-identification need separate review.", "counts": counts, "issues": issues}, ensure_ascii=False, indent=2))
raise SystemExit(1 if issues else 0)
