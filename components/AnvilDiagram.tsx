import type { ReactNode } from 'react';

export type AnvilDiagramId = 'closed-loop' | 'transaction-journal';

type AnvilDiagramProps = { diagram: AnvilDiagramId };

const ink = '#171916';
const blue = '#244de8';
const lime = '#c8e85a';
const paper = '#f7f5ed';

function Arrow({ x1, x2, y = 150 }: { x1: number; x2: number; y?: number }) {
  return (
    <g className="anvil-diagram__arrow" fill="none" stroke={blue} strokeWidth="2">
      <path d={`M ${x1} ${y} H ${x2 - 8}`} />
      <path d={`M ${x2 - 14} ${y - 6} L ${x2 - 7} ${y} L ${x2 - 14} ${y + 6}`} />
    </g>
  );
}

function Stage({
  x,
  label,
  title,
  detail,
  number,
  accent = false,
}: {
  x: number;
  label: string;
  title: string;
  detail: string;
  number: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y="78"
        width="176"
        height="144"
        fill={accent ? '#e8edff' : paper}
        stroke={accent ? blue : ink}
        strokeWidth={accent ? 2 : 1}
      />
      <circle cx={x + 20} cy="101" r="11" fill={accent ? blue : ink} />
      <text x={x + 20} y="105" textAnchor="middle" className="anvil-diagram__number" fill={paper}>
        {number}
      </text>
      <text x={x + 15} y="137" className="anvil-diagram__label">{label}</text>
      <text x={x + 15} y="166" className="anvil-diagram__title">{title}</text>
      <text x={x + 15} y="192" className="anvil-diagram__detail">{detail}</text>
    </g>
  );
}

function ClosedLoop() {
  return (
    <svg viewBox="0 0 820 300" role="img" aria-labelledby="closed-loop-title closed-loop-desc">
      <title id="closed-loop-title">The Anvil’s closed operating loop</title>
      <desc id="closed-loop-desc">The machine teaches the model its capabilities, checks a proposal, executes it transactionally, and returns measured evidence that informs the next proposal.</desc>
      <path d="M 28 48 H 762" stroke={ink} strokeWidth="1" />
      <text x="28" y="33" className="anvil-diagram__eyebrow">THE ANVIL / ONE CLOSED LOOP</text>
      <Stage x={28} label="01 / MACHINE" title="Manifest" detail="Capabilities, types, limits" number="1" />
      <Arrow x1={208} x2={222} />
      <Stage x={226} label="02 / MODEL" title="Propose" detail="One typed operation" number="2" />
      <Arrow x1={406} x2={420} />
      <Stage x={424} label="03 / ANVIL" title="Check + run" detail="Validate, then transact" number="3" accent />
      <Arrow x1={604} x2={618} />
      <Stage x={622} label="04 / EVIDENCE" title="Receipt" detail="Result, trace, state hash" number="4" />
      <path d="M 710 232 C 710 280 92 280 92 232" fill="none" stroke={blue} strokeWidth="1.5" strokeDasharray="5 5" />
      <path d="M 86 240 L 92 231 L 99 239" fill="none" stroke={blue} strokeWidth="1.5" />
      <text x="401" y="277" textAnchor="middle" className="anvil-diagram__loop-label">MEASURED EVIDENCE SHAPES THE NEXT PROPOSAL</text>
    </svg>
  );
}

function TransactionJournal() {
  return (
    <svg viewBox="0 0 790 390" role="img" aria-labelledby="journal-title journal-desc">
      <title id="journal-title">A proposed write is committed only after the whole operation succeeds</title>
      <desc id="journal-desc">A write first enters a temporary journal while the original arena stays unchanged. Success commits the new value; a trap discards the journal and preserves the original value.</desc>
      <path d="M 28 48 H 762" stroke={ink} strokeWidth="1" />
      <text x="28" y="33" className="anvil-diagram__eyebrow">THE TRANSACTION / MEMORY BEFORE CONSEQUENCE</text>
      <rect x="34" y="82" width="188" height="88" fill={paper} stroke={ink} />
      <text x="50" y="108" className="anvil-diagram__label">REAL ARENA / BEFORE</text>
      <text x="50" y="144" className="anvil-diagram__value">byte 12 = 18</text>
      <path d="M 222 126 H 283" stroke={blue} strokeWidth="2" />
      <path d="M 275 120 L 284 126 L 275 132" fill="none" stroke={blue} strokeWidth="2" />
      <rect x="292" y="82" width="205" height="88" fill="#e8edff" stroke={blue} strokeWidth="2" />
      <text x="308" y="108" className="anvil-diagram__label">TEMPORARY JOURNAL</text>
      <text x="308" y="144" className="anvil-diagram__value">propose 18 → 99</text>
      <text x="548" y="106" className="anvil-diagram__label">RUN THE WHOLE EXPRESSION</text>
      <text x="548" y="134" className="anvil-diagram__detail">Nothing touches real memory yet.</text>
      <path d="M 394 171 V 209 H 209 V 234 M 394 209 H 585 V 234" fill="none" stroke={ink} strokeWidth="1.5" />
      <circle cx="209" cy="210" r="4" fill={ink} />
      <circle cx="585" cy="210" r="4" fill={ink} />
      <rect x="34" y="240" width="350" height="102" fill={paper} stroke={ink} />
      <rect x="34" y="240" width="6" height="102" fill={lime} />
      <text x="56" y="269" className="anvil-diagram__label">SUCCESS / COMMIT JOURNAL</text>
      <text x="56" y="307" className="anvil-diagram__value">byte 12 = 99</text>
      <text x="56" y="328" className="anvil-diagram__detail">Receipt measures the changed arena.</text>
      <rect x="406" y="240" width="350" height="102" fill={paper} stroke={ink} />
      <rect x="406" y="240" width="6" height="102" fill={blue} />
      <text x="428" y="269" className="anvil-diagram__label">TRAP / DISCARD JOURNAL</text>
      <text x="428" y="307" className="anvil-diagram__value">byte 12 = 18</text>
      <text x="428" y="328" className="anvil-diagram__detail">Before and after are measured again.</text>
      <text x="395" y="374" textAnchor="middle" className="anvil-diagram__loop-label">THE AI MAY SPECULATE. THE MACHINE OWNS THE STATE CHANGE.</text>
    </svg>
  );
}

export default function AnvilDiagram({ diagram }: AnvilDiagramProps) {
  let art: ReactNode;
  let caption: string;

  if (diagram === 'closed-loop') {
    art = <ClosedLoop />;
    caption = 'The model proposes; the machine establishes what happened.';
  } else {
    art = <TransactionJournal />;
    caption = 'A write stays provisional until the full expression succeeds.';
  }

  return (
    <figure className={`anvil-diagram anvil-diagram--${diagram}`}>
      <div className="anvil-diagram__art">{art}</div>
      <figcaption>
        <span>ORIGINAL VECTOR DIAGRAM</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}