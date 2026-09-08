"""Regenerate only brochure pages 8–9; preserve the other approved pages.

Optional authoring step, never part of the Node production build.
Requires reportlab, pypdf, pypdfium2 and a licensed CJK TrueType font.
"""
import argparse
import io
from pathlib import Path
from xml.sax.saxutils import escape
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
import pypdfium2 as pdfium

parser = argparse.ArgumentParser()
parser.add_argument("--font", required=True, type=Path)
args = parser.parse_args()
academy = Path(__file__).resolve().parents[1]
target = academy / "public/downloads/AIelsen-FDE-Academy-Brochure.pdf"
preview = academy.parent / ".generated/academy-review/pdf"
preview.mkdir(parents=True, exist_ok=True)
pdfmetrics.registerFont(TTFont("AcademyCJK", str(args.font), subfontIndex=0))
old = PdfReader(target)
w, h = float(old.pages[7].mediabox.width), float(old.pages[7].mediabox.height)
buffer = io.BytesIO()
c = canvas.Canvas(buffer, pagesize=(w, h), pageCompression=1)
ink, teal, muted = "#001f3f", "#007d86", "#536979"


def paragraph(text, x, top, width, size=10, color=ink, leading=None):
    style = ParagraphStyle("body", fontName="AcademyCJK", fontSize=size,
                           leading=leading or size * 1.65, textColor=HexColor(color),
                           wordWrap="CJK")
    p = Paragraph(escape(text), style)
    _, height = p.wrap(width, h)
    p.drawOn(c, x, top - height)
    return top - height


def label(text, x, y, size=8, color=teal):
    c.setFillColor(HexColor(color))
    c.setFont("Helvetica", size)
    c.drawString(x, y, text)


def frame(number, eyebrow, title, subtitle):
    c.setFillColor(HexColor("#ffffff")); c.rect(0, 0, w, h, fill=1, stroke=0)
    label("AIelsen", 42, h - 45, 22, "#3246db")
    label("FDE ACADEMY", w - 137, h - 41, 9, ink)
    c.setStrokeColor(HexColor("#d5e1e7")); c.line(42, h - 63, w - 42, h - 63)
    label(eyebrow, 42, h - 90, 8)
    paragraph(title, 42, h - 105, w - 84, 27, leading=37)
    paragraph(subtitle, 42, h - 151, w - 84, 10, muted)
    c.line(42, 43, w - 42, 43)
    label("AIelsen / FIELD DELIVERY EDUCATION", 42, 28, 7, muted)
    label(f"{number:02d} / 12", w - 83, 28, 8, ink)


frame(8, "CASE STUDIES / DISCOVER - BUILD - VERIFY", "案例分析：从问题到交付",
      "沿着发现、行动和判断学习案例，再按课程完成可检查的作业。")
cards = [
    ("Airbus × Palantir / Skywise", "把散落数据连接成业务对象", "W04 / W05 / W11", "airbus",
     ["发现：设备、部件、工单与事件时间能否对应？", "行动：建立来源与对象关系，先交付一个可核验查询。", "交付：对象图、时间关系测试和第二场景的复用接口。"], ["数据", "对象", "应用", "复用"]),
    ("Morgan Stanley × OpenAI", "把专家判断变成评估标准", "W05 / W07 / W10", "morgan",
     ["发现：失败来自检索、版本、引用还是答案理解？", "行动：专家分层评分，一次改一层，持续运行回归。", "交付：12 题评估集、错误分类与质量/采用观察方案。"], ["问题", "评分", "修复", "回归"]),
    ("Klarna × OpenAI", "把对话结束推进到问题解决", "W02 / W08 / W10", "klarna",
     ["发现：重复咨询源于误答、状态未变还是交接丢失？", "行动：核对业务状态，受控执行，异常带上下文转人。", "交付：动作状态机、幂等测试与真正解决的验收指标。"], ["理解", "查证", "处理", "确认"]),
]
top = h - 193
for name, title, weeks, slug, lines, nodes in cards:
    bottom = top - 171
    c.setFillColor(HexColor("#f1f7f6")); c.setStrokeColor(HexColor("#c5dcda"))
    c.rect(42, bottom, w - 84, 159, fill=1, stroke=1)
    label(name, 57, top - 30, 9, teal)
    label(weeks, w - 164, top - 30, 8, muted)
    paragraph(title, 57, top - 39, w - 114, 15, leading=22)
    y = top - 68
    for line in lines:
        y = paragraph(line, 57, y, w - 114, 9.6, leading=15) - 3
    for index, node in enumerate(nodes):
        x = 57 + index * 119
        c.setFillColor(HexColor("#e0efeb")); c.rect(x, bottom + 12, 99, 23, fill=1, stroke=0)
        paragraph(node, x + 10, bottom + 31, 78, 9, teal, leading=14)
        if index < 3:
            label(">", x + 105, bottom + 20, 10, teal)
    c.linkURL(f"https://fde.aielsen.com/academy/zh/cases/{slug}/", (42, bottom, w - 42, top - 12), relative=0)
    top = bottom - 5
paragraph("点击案例卡片阅读完整拆解与原文。公开案例用于研究，具体工程练习使用合成情景。", 42, 101, w - 84, 8, muted)
paragraph("另有交付组织、核保、硬件排查、文档生产、资源协同与结果服务案例。", 42, 82, w - 84, 8, muted)
c.showPage()

frame(9, "FIELD PLAYBOOKS / TEN BUSINESS JOBS", "业务实作：把方法用到具体任务",
      "十类合成情景覆盖增长、知识与运营。每项练习都要交付证据、实现或验证结果。")
jobs = [
    ("增长研究", "market-intelligence", "参数对齐与 VOC 分析", "交付：3 条卖点证据卡与测试方案"),
    ("销售获客", "account-research", "实体归并、信号与会前判断", "交付：五家虚构公司简报及追问"),
    ("营销投放", "paid-media", "跨报表对账与预算实验", "交付：差额明细、假设和停止条件"),
    ("经营分析", "business-review", "漏斗拆解、分群与竞争解释", "交付：事实—假设—验证简报"),
    ("知识服务", "manual-service", "型号过滤、版本与页码引用", "交付：12 题知识测试与失败分析"),
    ("投诉洞察", "complaints", "问题单元、主题与责任闭环", "交付：多维计数和改进验证计划"),
    ("知识运营", "knowledge-feedback", "专家纠错、知识版本与回归", "交付：变更记录和恢复测试"),
    ("门店转化", "store-operations", "预约授权、上下文交接与回写", "交付：状态机、超时与改期测试"),
    ("决策研究", "expert-research", "观点冲突、反证与条件化建议", "交付：三种选择和下一项验证"),
    ("企业 Skill", "enterprise-skills", "输入契约、工具与失败处理", "交付：可运行方法包及迁移清单"),
]
gap = 14
width = (w - 84 - gap) / 2
top = h - 194
for i, (title, slug, method, output) in enumerate(jobs):
    x = 42 + (i % 2) * (width + gap)
    y = top - (i // 2) * 105
    c.setFillColor(HexColor("#f5f8f9")); c.setStrokeColor(HexColor("#d5e1e7"))
    c.rect(x, y - 93, width, 93, fill=1, stroke=1)
    label(f"{i+1:02d}", x + 14, y - 23, 14, teal)
    paragraph(title, x + 44, y - 10, width - 57, 14, leading=21)
    paragraph(method, x + 14, y - 39, width - 28, 9, muted, leading=15)
    paragraph(output, x + 14, y - 61, width - 28, 8.7, ink, leading=14)
    c.linkURL(f"https://fde.aielsen.com/academy/zh/cases/field-{slug}/", (x, y - 93, x + width, y), relative=0)
paragraph("使用合成资料练习。点击卡片查看问题发现、关键取舍、对应周次、样例和验收要求。", 42, 95, w - 84, 8, muted)
c.showPage(); c.save(); buffer.seek(0)
replacement = PdfReader(buffer)
writer = PdfWriter()
for index, page in enumerate(old.pages):
    writer.add_page(replacement.pages[index - 7] if index in (7, 8) else page)
writer.add_metadata({"/Title": "AIelsen FDE Academy | FDE 交付实战课程", "/Author": "AIelsen",
                     "/Subject": "FDE practitioner curriculum, case studies and engineering outputs",
                     "/Creator": "AIelsen course publishing"})
writer.write(target)
updated = PdfReader(target)
for index in range(12):
    if index not in (7, 8):
        assert updated.pages[index].extract_text() == old.pages[index].extract_text(), "Unchanged brochure page drifted"
document = pdfium.PdfDocument(str(target))
for index in (7, 8):
    bitmap = document[index].render(scale=1.4)
    bitmap.to_pil().save(preview / f"brochure-{index+1:02d}.png")
    bitmap.close()
document.close()
assert len(PdfReader(target).pages) == 12
print("Updated brochure pages 8–9; 12 pages preserved. Review .generated/academy-review/pdf/.")
