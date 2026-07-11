export function SelectIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <path
        d="M5 3l14 8-6 1.5L11 19z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <circle cx="12" cy="12" r="9" fill="#2563eb" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

export function OpponentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <path
        d="M12 2.5l10 18H2z"
        fill="#dc2626"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BallIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <circle cx="12" cy="12" r="9" fill="#ffffff" stroke="#111827" strokeWidth="1.4" />
      <path d="M12 8l3.2 2.3-1.2 3.7h-4l-1.2-3.7z" fill="#111827" />
    </svg>
  );
}

export function ConeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <path
        d="M12 3l6 18H6z"
        fill="#f97316"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RunArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <line x1="3" y1="18" x2="18" y2="6" stroke="#111827" strokeWidth="2.5" />
      <path d="M11 5h8v8z" fill="#111827" />
    </svg>
  );
}

export function PassLineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <line
        x1="3"
        y1="18"
        x2="18"
        y2="6"
        stroke="#7c3aed"
        strokeWidth="2.5"
        strokeDasharray="4 3"
      />
      <path d="M11 5h8v8z" fill="#7c3aed" />
    </svg>
  );
}

export function QbIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <circle cx="12" cy="12" r="9" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
      <text
        x="12"
        y="15.5"
        fontSize="8"
        fontWeight="bold"
        textAnchor="middle"
        fill="#111827"
      >
        QB
      </text>
    </svg>
  );
}

export function BlockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <line
        x1="4"
        y1="20"
        x2="16"
        y2="8"
        stroke="#b91c1c"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="11.8"
        y1="3.8"
        x2="20.2"
        y2="12.2"
        stroke="#b91c1c"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScrimmageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <line
        x1="12"
        y1="2"
        x2="12"
        y2="22"
        stroke="#1d4ed8"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function UndoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M7 8H4V5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 8c1.8-2.6 4.6-4 7.5-4A8.5 8.5 0 1 1 4.4 15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RedoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 -scale-x-100">
      <path
        d="M7 8H4V5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 8c1.8-2.6 4.6-4 7.5-4A8.5 8.5 0 1 1 4.4 15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
