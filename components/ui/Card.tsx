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
      className={`card-glow rounded-2xl border border-border-subtle bg-bg-elevated p-6 transition-all duration-300 ${
        glow ? "card-glow-on" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
