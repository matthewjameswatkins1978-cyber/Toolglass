"""Render the architecture diagram and the compact demo slide deck."""

from __future__ import annotations

import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
DEMO = ROOT / "demo"
FONT = Path("C:/Windows/Fonts/segoeui.ttf")
FONT_BOLD = Path("C:/Windows/Fonts/segoeuib.ttf")
FONT_MONO = Path("C:/Windows/Fonts/consola.ttf")


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def wrapped(draw: ImageDraw.ImageDraw, text: str, xy: tuple[int, int], width: int, fnt: ImageFont.FreeTypeFont, fill: str, spacing: int = 8) -> int:
    lines: list[str] = []
    for paragraph in text.split("\n"):
        lines.extend(textwrap.wrap(paragraph, width=width) or [""])
    draw.multiline_text(xy, "\n".join(lines), font=fnt, fill=fill, spacing=spacing)
    return len(lines) * (fnt.size + spacing)


def box(draw: ImageDraw.ImageDraw, xy: tuple[int, int, int, int], title: str, body: str, fill: str = "#F2F6F8") -> None:
    x1, y1, x2, y2 = xy
    draw.rounded_rectangle(xy, radius=22, fill=fill, outline="#17324D", width=3)
    draw.text((x1 + 22, y1 + 18), title, font=font(FONT_BOLD, 23), fill="#17324D")
    wrapped(draw, body, (x1 + 22, y1 + 63), max(12, (x2 - x1 - 44) // 10), font(FONT, 17), "#263746", spacing=3)


def architecture() -> None:
    image = Image.new("RGB", (1800, 1050), "#FBFCFA")
    draw = ImageDraw.Draw(image)
    draw.text((70, 45), "Toolglass Scout — architecture", font=font(FONT_BOLD, 46), fill="#17324D")
    draw.text((73, 105), "Bounded Strands Agents orchestration; human publication decision remains explicit.", font=font(FONT, 25), fill="#597185")
    boxes = [
        ((70, 210, 330, 455), "Source candidates", "Demo-fed JSON or future source adapters\n\nDiscovery is input, not a publishing action."),
        ((390, 210, 690, 455), "Strands orchestration", "One Agent per bounded stage\n\nOffline deterministic provider for repeatable demos; Bedrock provider selectable."),
        ((750, 160, 1040, 350), "Verification / evidence", "Require HTTP(S) primary sources, claims and an inspectable evidence packet."),
        ((750, 410, 1040, 600), "Dedupe / history", "Canonical source URLs are compared with retained history so old leads stay out of the queue."),
        ((1100, 210, 1400, 455), "Editorial-fit gate", "Score novelty, usefulness, technical interest, evidence quality and reader interest."),
        ((1460, 150, 1730, 335), "Reject / hold", "Weak evidence, duplicates or low fit stop here with an auditable reason."),
        ((1460, 410, 1730, 595), "Draft survivor", "Only passing candidates receive a Show & Tell draft and evidence packet."),
        ((1460, 680, 1730, 865), "Human editor", "APPROVE / REJECT / INVESTIGATE / HOLD\n\nScout never auto-publishes."),
    ]
    for xy, title, body in boxes:
        box(draw, xy, title, body, "#EAF2F4" if "Human" not in title else "#FFF1D6")
    arrows = [((330, 330), (390, 330)), ((690, 330), (750, 255)), ((690, 330), (750, 505)), ((1040, 255), (1100, 330)), ((1040, 505), (1100, 330)), ((1400, 330), (1460, 245)), ((1400, 330), (1460, 500)), ((1595, 595), (1595, 680))]
    for start, end in arrows:
        draw.line((*start, *end), fill="#C26A2B", width=6)
        draw.ellipse((end[0] - 9, end[1] - 9, end[0] + 9, end[1] + 9), fill="#C26A2B")
    draw.rounded_rectangle((70, 700, 1400, 900), radius=22, fill="#EEF0F7", outline="#58658A", width=3)
    draw.text((95, 725), "Truthful AWS boundary", font=font(FONT_BOLD, 28), fill="#303D70")
    wrapped(draw, "Amazon Bedrock is the optional live reasoning provider. Candidate history and provenance are represented as local JSON in this demo; an AgentCore worker and durable AWS storage are the deployment target, not a claim about this offline run.", (95, 780), 100, font(FONT, 23), "#33405F", spacing=6)
    image.save(DOCS / "architecture.png")


def slide(title: str, body: str, number: int, *, mono: bool = False) -> None:
    image = Image.new("RGB", (1920, 1080), "#101A24")
    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, 1920, 20), fill="#E37B36")
    draw.text((105, 90), title, font=font(FONT_BOLD, 58), fill="#F5E8D8")
    fnt = font(FONT_MONO if mono else FONT, 31 if mono else 40)
    wrapped(draw, body, (110, 215), 82 if mono else 65, fnt, "#DCE7EE", spacing=11 if mono else 15)
    draw.text((110, 1000), f"TOOLGLASS SCOUT  /  {number:02d}", font=font(FONT_BOLD, 24), fill="#E37B36")
    image.save(DEMO / f"slide-{number:02d}.png")


def deck() -> None:
    output = (DEMO / "demo_output.txt").read_text(encoding="utf-8")
    slide("The problem", "Small technical publications and solo creators spend their day triaging software leads. The repetitive work is research, verification, deduplication and editorial-fit judgement — before a human editor can make a meaningful decision.", 1)
    slide("Who it is for", "Toolglass Scout is a Professional Agent for small technical publications, researchers, newsletter writers and creators. Why it matters: attention is scarce, and a feed reader gives you more to read. Scout is designed to give you fewer, better-supported candidates.", 2)
    slide("A real end-to-end run", output, 3, mono=True)
    slide("How the agent works", "Strands Agents SDK coordinates explicit stages: discovery input → verification/evidence → dedupe/history → editorial-fit gate → reject/hold OR draft → human decision. The demo is deterministic and credential-free. SCOUT_MODEL=bedrock selects Amazon Bedrock when AWS access is available.", 4)
    slide("The human stays in charge", "A survivor reaches a decision surface with APPROVE, REJECT, INVESTIGATE or HOLD. Toolglass Scout never auto-publishes merely because a model likes something. The point is to give one editor the leverage of a small research desk without automating taste.", 5)


if __name__ == "__main__":
    DOCS.mkdir(parents=True, exist_ok=True)
    DEMO.mkdir(parents=True, exist_ok=True)
    architecture()
    deck()
