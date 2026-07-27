const SIZES = {
  // Badge is sized to each text size's default line-height so the row
  // never grows taller than the plain wordmark did before it existed.
  sm: { badge: 20, text: "text-sm", gap: "gap-1.5" },
  lg: { badge: 28, text: "text-lg", gap: "gap-2" },
} as const;

function LogoMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Coach Zone"
      className="shrink-0"
    >
      <rect
        width="64"
        height="64"
        rx="14"
        fill="#111111"
        stroke="#262626"
        strokeWidth="1"
      />
      <path
        d="M18 19 H45 L19 45 H44"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-emerald-500"
      />
      <circle cx="18" cy="19" r="4.5" className="fill-emerald-500" />
      <path d="M51 45 L43 40.5 L43 49.5 Z" className="fill-emerald-500" />
    </svg>
  );
}

export function Logo({
  variant = "full",
  size = "lg",
  className,
}: {
  variant?: "full" | "mark";
  size?: "sm" | "lg";
  className?: string;
}) {
  const { badge, text, gap } = SIZES[size];

  if (variant === "mark") return <LogoMark size={badge} />;

  return (
    <span className={`inline-flex items-center ${gap} ${className ?? ""}`}>
      <LogoMark size={badge} />
      <span className={`${text} font-semibold tracking-tight`}>
        Coach <span className="text-emerald-500">Zone</span>
      </span>
    </span>
  );
}
