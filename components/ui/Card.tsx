interface CardProps {
  children: React.ReactNode;
  glow?: boolean;
  className?: string;
}

export default function Card({
  children,
  glow = false,
  className = "",
}: CardProps): React.ReactElement {
  return (
    <div
      className={`rounded-2xl border border-border-subtle bg-bg-elevated p-6 transition-all duration-200 hover:border-accent-cyan/20 ${
        glow ? "shadow-[0_0_40px_rgba(34,211,238,0.06)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
