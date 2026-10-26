#!/usr/bin/env python3
"""Toolglass 26 October 2026 original SVG concept plates.

Drawn with svgwrite and Inkscape. No image generation, photography,
external graphics, or historical image reproduction. Deterministic.
"""
from pathlib import Path
import math, random, subprocess
import svgwrite
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
ART=ROOT/'art'; ART.mkdir(exist_ok=True)
W,H=1536,1024
PAPER='#eee9dc'; INK='#202522'; BLUE='#1748a0'; MID='#6683b7'; GREY='#8d8e80'; LIME='#c4ef32'; WHITE='#f9f6ed'


def text(d,s,x,y,size=15,color=BLUE,spacing=1.2,anchor='start'):
    d.add(d.text(s,insert=(x,y),fill=color,font_size=size,font_family='DejaVu Sans Mono',letter_spacing=spacing,text_anchor=anchor))
def rect(d,x,y,w,h,stroke=INK,sw=1.8,fill='none'):
    d.add(d.rect(insert=(x,y),size=(w,h),fill=fill,stroke=stroke,stroke_width=sw))
def line(d,x1,y1,x2,y2,color=GREY,sw=1,dash=None):
    opts={'stroke':color,'stroke_width':sw}
    if dash:opts['stroke_dasharray']=dash
    d.add(d.line((x1,y1),(x2,y2),**opts))
def circ(d,x,y,r,fill='none',stroke=INK,sw=1.5):
    d.add(d.circle(center=(x,y),r=r,fill=fill,stroke=stroke,stroke_width=sw))

def init(file,desc,code):
    d=svgwrite.Drawing(str(ART/file),size=(W,H),viewBox=f'0 0 {W} {H}',profile='full')
    d.add(svgwrite.base.Title('Toolglass | '+code))
    d.add(svgwrite.base.Desc(desc))
    d.add(d.rect(insert=(0,0),size=(W,H),fill=PAPER))
    rng=random.Random(26)
    for _ in range(450):
        d.add(d.circle(center=(rng.uniform(65,W-65),rng.uniform(60,H-60)),r=.65,fill=INK,opacity=.07))
    text(d,'TOOLGLASS / MACHINE FOLKLORE / '+code,92,81,13,BLUE,1.6)
    for x,y in [(104,122),(1432,122),(104,896),(1432,896)]:
        line(d,x-19,y,x+19,y,GREY,.8); line(d,x,y-19,x,y+19,GREY,.8)
    rect(d,100,855,20,20,BLUE,1,BLUE); rect(d,132,855,20,20,INK,1,LIME)
    text(d,'26 / X / 2026',1320,947,12,GREY,1.4)
    return d

def memory_plate():
    d=init('the-square-that-wasnt.svg','Concept plate, not a process cross-section. Two nominal transistor footprints remain constrained by capacitor clearance; a tentative vertical array stands aside.','CELL GEOMETRY / 01')
    text(d,'THE CELL / NOT THE SQUARE',123,192,23,INK,1.8)
    text(d,'A CAPACITOR IS MORE THAN ITS FOOTPRINT',123,224,13,BLUE,1.3)
    # First layout: generous six-grid bays and capacitors
    rect(d,122,271,602,466,INK,2)
    text(d,'6F² / PRESENT PATH',149,306,17,BLUE,1.6)
    for i in range(3):
        x=185+i*163
        rect(d,x,363,131,286,GREY,1)
        for k in range(4):
            line(d,x+8,393+k*67,x+122,393+k*67,GREY,.8,'2,9')
        # capacitor cylinders on cells
        d.add(d.ellipse(center=(x+65,453),r=(52,19),fill=WHITE,stroke=INK,stroke_width=2))
        line(d,x+13,453,x+13,559,INK,2)
        line(d,x+117,453,x+117,559,INK,2)
        d.add(d.path(d=f'M{x+13} {559} A52 19 0 0 0 {x+117} {559}',fill='none',stroke=INK,stroke_width=2))
        d.add(d.rect(insert=(x+49,576),size=(32,25),fill=BLUE))
        line(d,x+65,560,x+65,576,BLUE,2)
    text(d,'ROOM FOR CHARGE / CONTACTS / ISOLATION',152,690,13,GREY,1.0)
    # Second layout: smaller bays, but capacitor mouths still overhang
    rect(d,759,271,653,466,INK,2)
    text(d,'4F² / PROPOSED PATH',785,306,17,BLUE,1.6)
    for i in range(4):
        x=792+i*145
        rect(d,x,363,105,286,GREY,1)
        for k in range(4):line(d,x+8,393+k*67,x+97,393+k*67,GREY,.8,'2,9')
        d.add(d.ellipse(center=(x+52,453),r=(55,19),fill=WHITE,stroke=INK,stroke_width=2))
        line(d,x-3,453,x-3,559,INK,1.7)
        line(d,x+107,453,x+107,559,INK,1.7)
        d.add(d.path(d=f'M{x-3} {559} A55 19 0 0 0 {x+107} {559}',fill='none',stroke=INK,stroke_width=1.7))
        rect(d,x+37,576,30,25,BLUE,1,BLUE)
        line(d,x+52,560,x+52,576,BLUE,2)
    # faint collision zone overlay
    for x in [897,1042,1187,1332]:
        line(d,x,395,x,620,BLUE,1,'5,5')
    circ(d,1401,347,7,LIME,INK,1)
    text(d,'PITCH?',1357,689,13,BLUE,1.2,'end')
    # bottom explanatory band: flat versus vertical
    line(d,122,781,1412,781,INK,1.2)
    text(d,'AREA ON PAPER',122,811,15,BLUE,1.5)
    text(d,'IS NOT',405,811,15,INK,1.5)
    text(d,'GOOD BITS PER WAFER',557,811,15,BLUE,1.5)
    # a tiny 3D candidate stack on right
    for k in range(4):
        x=1170+k*35;y=795-k*20
        rect(d,x,y,91,16,BLUE,1.1,LIME if k==3 else WHITE)
    text(d,'3D?',1380,823,14,BLUE,1.4)
    text(d,'FIG. 01 / CONCEPTUAL FOOTPRINTS; NOT A FABRICATION DIAGRAM',215,875,11,GREY,1.2)
    d.save()

def malloy_plate():
    d=init('the-narrative-machine.svg','Conceptual artist-programmer inside a network of card catalogue, narrative fragments and terminal. Not a portrait or a reconstruction of a particular installation.','NARRABASE / 02')
    text(d,'A STORY YOU HAVE TO SEARCH',123,194,22,INK,1.8)
    text(d,'CARDS / KEYWORDS / PEOPLE / PATHS',123,225,13,BLUE,1.2)
    # card cabinet
    rect(d,118,296,334,452,INK,2)
    text(d,'INDEX / 1979',145,326,14,BLUE,1.5)
    for j in range(5):
        y=354+j*65
        rect(d,149,y,273,53,INK,1.5,WHITE)
        rect(d,167,y+15,85,8,BLUE,0,BLUE)
        line(d,268,y+19,393,y+19,GREY,1)
        line(d,268,y+31,367,y+31,GREY,1)
        rect(d,383,y+38,20,6,INK,.7,LIME if j==2 else WHITE)
    text(d,'FIND / REARRANGE',147,719,13,BLUE,1.2)
    # narrative network center cards
    text(d,'LEXIAS / 1986',517,304,14,BLUE,1.5)
    cards=[(522,349,230,121,'01 / PARTY'),(789,352,230,121,'02 / MEMORY'),(626,543,262,121,'03 / TERMINALS')]
    for i,(x,y,w,h,label) in enumerate(cards):
        rect(d,x,y,w,h,INK,2,WHITE)
        text(d,label,x+17,y+30,14,BLUE,1.3)
        for j in range(4):line(d,x+17,y+48+j*15,x+w-21-(j%3)*23,y+48+j*15,GREY,1)
        rect(d,x+17,y+h-17,30,5,BLUE,0,LIME if i==1 else BLUE)
    # paths connect cards, cabinet, terminal
    d.add(d.path(d='M 452 460 C 488 460 482 402 522 402',fill='none',stroke=BLUE,stroke_width=2))
    d.add(d.path(d='M 752 411 C 769 411 767 413 789 413',fill='none',stroke=BLUE,stroke_width=2))
    d.add(d.path(d='M 904 473 C 907 511 858 515 835 543',fill='none',stroke=BLUE,stroke_width=2))
    d.add(d.path(d='M 628 543 C 598 520 600 474 620 470',fill='none',stroke=BLUE,stroke_width=2))
    for x,y in [(452,460),(522,402),(752,411),(789,413),(904,473),(835,543),(628,543),(620,470)]:circ(d,x,y,5,LIME,INK,1)
    # terminal right, and small human operator within the network
    rect(d,1071,312,348,431,INK,2)
    text(d,'ACEN / 1987',1097,343,14,BLUE,1.5)
    rect(d,1110,382,268,173,INK,2,WHITE)
    rect(d,1125,398,237,142,BLUE,1.5,'#dce2d7')
    text(d,'SEARCH : PARTY',1140,423,13,BLUE,.8)
    for j in range(5):line(d,1140,445+j*17,1330-(j%2)*35,445+j*17,BLUE,1.2)
    rect(d,1183,575,123,16,INK,1,WHITE)
    line(d,1244,556,1244,575,INK,2)
    # person figure sits inside working system, not a likeness
    circ(d,1226,638,21,WHITE,INK,2)
    d.add(d.path(d='M1204 673 Q1227 652 1250 673 L1263 715 L1192 715 Z',fill=WHITE,stroke=INK,stroke_width=2))
    line(d,1208,689,1168,667,INK,2)
    line(d,1248,690,1300,669,INK,2)
    rect(d,1143,658,51,14,INK,1,WHITE)
    line(d,1143,658,1133,648,BLUE,2)
    d.add(d.path(d='M1019 411 C 1045 411 1045 446 1071 446',fill='none',stroke=BLUE,stroke_width=2))
    circ(d,1045,426,7,LIME,INK,1)
    # footer
    line(d,119,793,1419,793,INK,1.2)
    text(d,'THE AUTHOR BUILDS THE ROUTES.',212,846,17,INK,1.4)
    text(d,'THE READER MAKES THE JOURNEY.',212,875,13,BLUE,1.4)
    text(d,'FIG. 02 / CONCEPTUAL, NOT A PORTRAIT OR ARCHIVAL RECONSTRUCTION',724,930,10,GREY,1.1)
    d.save()

def export():
    for stem in ['the-square-that-wasnt','the-narrative-machine']:
        src=ART/(stem+'.svg'); png=ART/(stem+'.png')
        subprocess.run(['inkscape',str(src),'--export-type=png','--export-filename='+str(png),'--export-width=1536'],check=True,stdout=subprocess.DEVNULL)
        with Image.open(png) as im:
            im.convert('RGB').save(ART/(stem+'.webp'),'WEBP',quality=91,method=6)
        png.unlink()
    sheet=Image.new('RGB',(1280,1740),'#e6e2d6')
    for i,stem in enumerate(['the-square-that-wasnt','the-narrative-machine']):
        with Image.open(ART/(stem+'.webp')) as im:
            im.thumbnail((1130,755))
            sheet.paste(im,((1280-im.width)//2,52+i*845))
    sheet.save(ART/'contact-sheet.webp','WEBP',quality=91,method=6)

if __name__=='__main__':
    memory_plate();malloy_plate();export()
    print('Built 2 editable SVGs, 2 WebPs and contact sheet')
