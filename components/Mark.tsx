export function Mark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 60 C14 32, 30 12, 50 12 C70 12, 86 32, 86 60 C87 72, 87 80, 88 90 C81 87, 76 78, 70 78 C63 78, 60 89, 50 89 C40 89, 37 78, 30 78 C24 78, 19 87, 12 90 C13 80, 13 72, 14 60 Z" />
      <g stroke="#cdd5e8" strokeWidth={2.2}>
        <path d="M42.5 50 L57.5 50 L63 57 L50 71 L37 57 Z" />
        <path d="M37 57 L63 57" />
        <path d="M42.5 50 L46 57 M57.5 50 L54 57" />
      </g>
    </svg>
  );
}
