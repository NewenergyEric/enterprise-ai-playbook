"""Render the original repository cover; optional, outside the site build."""
from argparse import ArgumentParser
from pathlib import Path

import pypdfium2 as pdfium
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


def main():
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("--font-dir", type=Path, required=True)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[2]
    for name, filename in [
        ("Sans", "InstrumentSans-Regular.ttf"),
        ("Bold", "InstrumentSans-Bold.ttf"),
        ("Mono", "IBMPlexMono-Regular.ttf"),
    ]:
        pdfmetrics.registerFont(TTFont(name, str(args.font_dir / filename)))

    work = root / ".generated" / "github-brand"
    media = root / "docs" / "media"
    work.mkdir(parents=True, exist_ok=True)
    media.mkdir(parents=True, exist_ok=True)
    width, height = 1600, 800
    pdf = work / "fde-cover.pdf"
    c = canvas.Canvas(str(pdf), pagesize=(width, height), invariant=1)
    c.setAuthor("AIelsen")
    c.setTitle("AIelsen FDE — From the field to working AI")
    c.setSubject("Original repository cover; abstract delivery diagram")
    navy, mint, white = "#001F3F", "#9BE0D5", "#FFFFFF"
    quiet, stroke, panel = "#A7C3D2", "#294965", "#0A2B4A"

    def rect(x, y, w, h, fill, border=None, radius=0):
        c.setFillColor(HexColor(fill))
        c.setStrokeColor(HexColor(border or fill))
        c.setLineWidth(1)
        if radius:
            c.roundRect(x, height - y - h, w, h, radius, fill=1, stroke=bool(border))
        else:
            c.rect(x, height - y - h, w, h, fill=1, stroke=bool(border))

    def line(points, color=stroke, weight=1):
        c.setStrokeColor(HexColor(color))
        c.setLineWidth(weight)
        p = c.beginPath()
        p.moveTo(points[0][0], height - points[0][1])
        for x, y in points[1:]:
            p.lineTo(x, height - y)
        c.drawPath(p)

    def text(x, y, value, size=18, color=white, font="Sans"):
        c.setFillColor(HexColor(color))
        c.setFont(font, size)
        c.drawString(x, height - y, value)

    def dot(x, y, r=4, color=mint, outline=None):
        c.setFillColor(HexColor(color))
        c.setStrokeColor(HexColor(outline or color))
        c.setLineWidth(1)
        c.circle(x, height - y, r, fill=1, stroke=bool(outline))

    def arrow(x1, y1, x2, y2):
        line([(x1, y1), (x2, y2)], mint, 1.5)
        line([(x2 - 7, y2 - 5), (x2, y2), (x2 - 7, y2 + 5)], mint, 1.5)

    rect(0, 0, width, height, navy)
    rect(64, 62, 4, 27, mint)
    text(84, 84, "AIelsen", 29, white, "Bold")
    text(233, 83, "/", 25, quiet)
    text(259, 81, "FIELD ENGINEERING", 14, quiet, "Mono")
    text(64, 290, "FDE", 172, white, "Bold")
    text(72, 353, "From the field", 39, white)
    text(72, 405, "to working AI.", 39, mint)
    line([(72, 448), (463, 448)])
    text(72, 486, "Business value. Engineering judgment.", 19, quiet)
    text(72, 515, "A delivery playbook. A practitioner academy.", 18, quiet)
    text(72, 633, "SERVICES  /  PLAYBOOK  /  ACADEMY", 13, mint, "Mono")

    # Raw evidence becomes structured, testable work across the four panels.
    for x in range(718, 1518, 32):
        for y in range(114, 614, 32):
            dot(x, y, 0.7, stroke)
    text(735, 113, "THE DELIVERY LOOP", 14, mint, "Mono")
    xs = [732, 942, 1152, 1362]
    names = [("01", "DISCOVER"), ("02", "ENGINEER"), ("03", "VERIFY"), ("04", "REUSE")]
    for x, (num, name) in zip(xs, names):
        text(x, 171, num, 12, quiet, "Mono")
        text(x, 199, name, 15, white, "Bold")
    for left, right in zip(xs[:-1], xs[1:]):
        arrow(left + 164, 342, right - 15, 342)
    for x in xs:
        rect(x, 230, 158, 224, panel, stroke, 7)

    for ax, ay, bx, by in [(760, 266, 819, 300), (760, 327, 819, 300),
                          (778, 401, 839, 369), (819, 300, 839, 369),
                          (859, 270, 819, 300), (760, 327, 839, 369)]:
        line([(ax, ay), (bx, by)], "#4B7185", 1.3)
    for x, y, r in [(760, 266, 7), (760, 327, 9), (778, 401, 7),
                    (819, 300, 12), (839, 369, 12), (859, 270, 6)]:
        dot(x, y, r, mint if r == 12 else panel, mint)

    for i, label in enumerate(["OBJECTS", "TOOLS", "ACTIONS"]):
        y = 264 + i * 58
        rect(962, y, 118, 40, "#103A55", "#447185", 3)
        text(973, y + 25, label, 12, mint, "Mono")
        if i < 2:
            line([(1021, y + 40), (1021, y + 58)], mint, 1.5)

    # One unresolved observation avoids implying a fabricated perfect score.
    for i in range(4):
        y = 275 + i * 40
        rect(1176, y - 12, 15, 15, panel, mint, 2)
        if i != 2:
            line([(1179, y - 5), (1183, y), (1188, y - 8)], mint, 1.7)
        else:
            line([(1180, y - 5), (1187, y - 5)], quiet, 1.6)
        line([(1206, y - 4), (1282 - (i % 2) * 18, y - 4)], quiet, 2)

    for row in range(3):
        for col in range(2):
            x, y = 1384 + col * 57, 266 + row * 56
            rect(x, y, 40, 40, mint if (row, col) == (1, 0) else "#103A55", "#447185", 3)
            if (row, col) != (1, 0):
                line([(x + 10, y + 20), (x + 30, y + 20)], mint, 1.2)
                line([(x + 20, y + 10), (x + 20, y + 30)], mint, 1.2)
    for x, label in zip(xs, ["Evidence", "A working chain", "Acceptance", "Team capability"]):
        text(x, 485, label, 16, quiet)

    # Learning returns to field delivery rather than ending as a separate output.
    line([(1441, 509), (1441, 562), (811, 562), (811, 509)], mint, 1.2)
    line([(806, 516), (811, 509), (816, 516)], mint, 1.2)
    rect(984, 548, 284, 28, navy)
    text(1000, 568, "LEARNING BACK INTO DELIVERY", 12, mint, "Mono")
    line([(64, 694), (1536, 694)])
    text(72, 738, "12 WEEKLY MODULES", 13, white, "Mono")
    text(380, 738, "19 CASES & EXERCISES", 13, white, "Mono")
    text(762, 738, "24 TEACHING BOARDS", 13, white, "Mono")
    text(1260, 738, "AIelsen / FDE", 18, quiet)
    c.showPage()
    c.save()
    with pdfium.PdfDocument(str(pdf)) as document:
        page = document[0]
        bitmap = page.render(scale=1)
        bitmap.to_pil().save(media / "fde-cover.png", optimize=True)
        bitmap.close()
        page.close()
    print("Rendered docs/media/fde-cover.png (1600 x 800)")


if __name__ == "__main__":
    main()
