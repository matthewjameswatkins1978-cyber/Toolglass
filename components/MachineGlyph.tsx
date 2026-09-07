type GlyphName =
  | 'cursor'
  | 'prompt'
  | 'floppy'
  | 'folder'
  | 'database'
  | 'tape'
  | 'packet'
  | 'plug'
  | 'magnifier'
  | 'bug'
  | 'branch'
  | 'warning';

const paths: Record<GlyphName, React.ReactNode> = {
  cursor: <path d="M10 7 37 25l-11 2 5 11-5 2-5-11-8 8Z" />,
  prompt: <><path d="m10 17 8 7-8 7" /><path d="M23 31h15" /></>,
  floppy: <><path d="M9 8h25l5 5v27H9Z" /><path d="M15 8v11h17V8" /><path d="M15 29h17v11H15Z" /></>,
  folder: <><path d="M6 13h13l4 4h19v22H6Z" /><path d="M6 17h36" /></>,
  database: <><ellipse cx="24" cy="11" rx="14" ry="5" /><path d="M10 11v12c0 3 6 5 14 5s14-2 14-5V11M10 23v12c0 3 6 5 14 5s14-2 14-5V23" /><path d="M10 17c0 3 6 5 14 5s14-2 14-5" /></>,
  tape: <><circle cx="24" cy="24" r="15" /><circle cx="24" cy="24" r="5" /><path d="M9 24H5m38 0h-4M24 9V5m0 38v-4" /></>,
  packet: <><path d="m7 16 17-9 17 9-17 9Z" /><path d="M7 16v16l17 9 17-9V16M24 25v16" /><path d="m15 12 17 9" /></>,
  plug: <><path d="M18 7v13m12-13v13M14 19h20v4a10 10 0 0 1-20 0Z" /><path d="M24 33v8m-7 0h14" /></>,
  magnifier: <><circle cx="21" cy="21" r="12" /><path d="m30 30 10 10" /></>,
  bug: <><path d="M18 20a7 7 0 0 1 12 0v10a7 7 0 0 1-12 0Z" /><path d="M24 13v-5M15 21H8m32 0h-7M16 29H9m30 0h-7M17 16l-5-5m19 5 5-5" /></>,
  branch: <><path d="M14 8v22c0 5 4 8 9 8h11" /><path d="M14 18h11c5 0 8-3 8-8" /><circle cx="14" cy="8" r="3" /><circle cx="34" cy="38" r="3" /><circle cx="33" cy="10" r="3" /></>,
  warning: <><path d="m24 6 18 34H6Z" /><path d="M24 17v11m0 6v2" /></>,
};

export default function MachineGlyph({
  name,
  size = 34,
  className,
}: {
  name: GlyphName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export type { GlyphName };
