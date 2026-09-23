export function Vial({
  tone,
  code,
}: {
  tone: string;
  code: string;
}) {
  return (
    <svg className="vial" viewBox="0 0 160 210" aria-hidden="true">
      <ellipse cx="80" cy="198" rx="36" ry="6" fill="#1a1214" opacity="0.08" />
      <rect x="62" y="10" width="36" height="16" rx="3" fill="#2a2224" />
      <rect x="68" y="24" width="24" height="12" fill="#d5cdc4" />
      <path
        d="M50 42h60l10 16v112c0 12-10 22-22 22H62c-12 0-22-10-22-22V58l10-16z"
        fill="#fbf8f3"
        stroke="#1a1214"
        strokeOpacity="0.18"
      />
      <path
        d="M46 118h68v52c0 12-10 22-22 22H68c-12 0-22-10-22-22v-52z"
        fill={tone}
      />
      <path
        d="M58 50h8l-6 120"
        stroke="#fff"
        strokeOpacity="0.55"
        strokeWidth="3"
        fill="none"
      />
      <rect x="54" y="72" width="52" height="30" rx="2" fill="#fffefb" />
      <text
        x="80"
        y="91"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="11"
        fill="#1a1214"
        letterSpacing="0.5"
      >
        {code}
      </text>
    </svg>
  );
}
