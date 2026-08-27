"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import GlowContainer from "@/components/ui/GlowContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { siteContent } from "@/content/site-content";

export default function Portfolio(): React.ReactElement {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Portfolio"
          headline="Recent work"
          accentColor="purple"
        />

        <StaggerContainer className="mt-16 grid gap-8 lg:grid-cols-3" stagger={0.15}>
          {siteContent.portfolio.map((project, i) => (
            <StaggerItem key={project.title}>
            <GlowContainer
              color={i % 2 === 0 ? "cyan" : "purple"}
              intensity="subtle"
            >
              <div className="group rounded-2xl border border-border-subtle bg-bg-elevated overflow-hidden">
                {/* Screenshot placeholder */}
                <div className="aspect-video w-full bg-bg-base/80 flex items-center justify-center border-b border-border-subtle">
                  <span className="text-sm text-text-muted/40">
                    {project.title} screenshot
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3>{project.title}</h3>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted transition-colors hover:text-accent-cyan"
                        aria-label={`Visit ${project.title}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  <p className="mt-2">{project.blurb}</p>

                  {/* Expandable tech details */}
                  <button
                    onClick={() =>
                      setExpandedIndex(expandedIndex === i ? null : i)
                    }
                    className="mt-4 flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-accent-cyan transition-colors hover:text-accent-cyan/80"
                  >
                    Tech details
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        expandedIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedIndex === i && (
                    <p className="mt-2 text-sm text-text-muted/70">
                      {project.techDetails}
                    </p>
                  )}
                </div>
              </div>
            </GlowContainer>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
