"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
  duration?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
}: ScrollRevealProps): React.ReactElement {
  const reduced = useReducedMotion();

  const offsets = {
    up: { x: 0, y: 40 },
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : { opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger container + item ─────────────────────────────── */

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  stagger = 0.1,
  delay = 0,
}: StaggerContainerProps): React.ReactElement {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

export function StaggerItem({
  children,
  className = "",
  duration = 0.5,
}: StaggerItemProps): React.ReactElement {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduced
          ? undefined
          : {
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }
      }
      transition={{ duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
