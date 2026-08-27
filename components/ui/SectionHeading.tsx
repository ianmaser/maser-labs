"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  headline: string;
  accentColor?: "cyan" | "purple";
  centered?: boolean;
  animated?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  headline,
  accentColor = "cyan",
  centered = true,
  animated = true,
  className = "",
}: SectionHeadingProps): React.ReactElement {
  const reduced = useReducedMotion();
  const accentClass =
    accentColor === "cyan" ? "text-accent-cyan" : "text-accent-purple";

  const Wrapper = animated && !reduced ? motion.div : "div";
  const motionProps = animated && !reduced
    ? {
        initial: { opacity: 0, y: 24 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, margin: "-80px" } as const,
        transition: { duration: 0.5, ease: "easeOut" as const },
      }
    : {};

  return (
    <Wrapper className={`${centered ? "text-center" : ""} ${className}`} {...motionProps}>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${accentClass} mb-3`}
      >
        {eyebrow}
      </p>
      <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight tracking-tight text-text-primary">
        {headline}
      </h2>
    </Wrapper>
  );
}
