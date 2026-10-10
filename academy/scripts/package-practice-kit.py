"""Create the public practice ZIP from an explicit allowlist; never pack caches."""
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
source = root / 'practice-kit'
target = root / 'public/downloads/fde-practice-kit.zip'
allowed = {'.py', '.md', '.json', '.csv'}
files = sorted(p for p in source.rglob('*') if p.is_file()
               and '__pycache__' not in p.parts
               and (p.suffix in allowed or p.name == 'LICENSE'))
assert (source / 'LICENSE') in files, 'Download must include the project license'
with ZipFile(target, 'w', compression=ZIP_DEFLATED) as archive:
    for file in files:
        name = file.relative_to(source).as_posix()
        info = ZipInfo('fde-practice-kit/' + name, date_time=(2026, 10, 10, 0, 0, 0))
        info.compress_type = ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        archive.writestr(info, file.read_bytes())
print(f'Packaged {len(files)} reviewed practice files, including LICENSE; no caches.')
