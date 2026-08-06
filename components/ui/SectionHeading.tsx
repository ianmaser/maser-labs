interface SectionHeadingProps {
  eyebrow: string;
  headline: string;
  accentColor?: "cyan" | "purple";
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  headline,
  accentColor = "cyan",
  centered = true,
  className = "",
}: SectionHeadingProps): React.ReactElement {
  const accentClass =
    accentColor === "cyan" ? "text-accent-cyan" : "text-accent-purple";

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${accentClass} mb-3`}
      >
        {eyebrow}
      </p>
      <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight tracking-tight text-text-primary">
        {headline}
      </h2>
    </div>
  );
}
