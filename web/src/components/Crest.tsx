export function Crest({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" stroke="#D4AF37" strokeWidth="1.4" />
      <path d="M11 27V15l5 7 4-9 4 9 5-7v12" stroke="#D4AF37" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="20" cy="10" r="1.8" fill="#D4AF37" />
    </svg>
  );
}
