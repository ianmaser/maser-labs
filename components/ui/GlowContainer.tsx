interface GlowContainerProps {
  children?: React.ReactNode;
  color?: "cyan" | "purple" | "both";
  intensity?: "subtle" | "medium" | "strong";
  className?: string;
}

const GLOW_COLORS = {
  cyan: "rgba(34, 211, 238, VAR)",
  purple: "rgba(139, 92, 246, VAR)",
} as const;

const INTENSITY_VALUES = {
  subtle: 0.08,
  medium: 0.15,
  strong: 0.25,
} as const;

function buildGlowBackground(
  color: GlowContainerProps["color"],
  intensity: GlowContainerProps["intensity"]
): string {
  const opacity = INTENSITY_VALUES[intensity ?? "medium"];

  if (color === "both") {
    const cyan = GLOW_COLORS.cyan.replace("VAR", String(opacity));
    const purple = GLOW_COLORS.purple.replace("VAR", String(opacity));
    return `radial-gradient(ellipse at 30% 50%, ${cyan}, transparent 70%), radial-gradient(ellipse at 70% 50%, ${purple}, transparent 70%)`;
  }

  const c = GLOW_COLORS[color ?? "cyan"].replace("VAR", String(opacity));
  return `radial-gradient(ellipse at 50% 50%, ${c}, transparent 70%)`;
}

export default function GlowContainer({
  children,
  color = "cyan",
  intensity = "medium",
  className = "",
}: GlowContainerProps): React.ReactElement {
  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: buildGlowBackground(color, intensity) }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
