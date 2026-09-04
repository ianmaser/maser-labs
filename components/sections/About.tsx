"use client";

import Image from "next/image";
import GlowContainer from "@/components/ui/GlowContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { siteContent } from "@/content/site-content";

const { headline, story, stats } = siteContent.about;

export default function About(): React.ReactElement {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Portrait */}
          <ScrollReveal direction="left">
            <GlowContainer color="purple" intensity="medium">
              <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border-subtle">
                <Image
                  src="/portrait/portrait-final.JPG"
                  alt="Ian Maser — founder of Maser Labs"
                  width={400}
                  height={533}
                  className="h-full w-full object-cover"
                />
              </div>
            </GlowContainer>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right">
            <div>
              <SectionHeading
                eyebrow="About"
                headline={headline}
                centered={false}
                animated={false}
              />
              <p className="mt-6 text-base leading-relaxed text-text-muted">
                {story}
              </p>

              {/* Stats block */}
              <StaggerContainer className="mt-10 grid grid-cols-3 gap-4" stagger={0.12} delay={0.3}>
                {stats.map((stat) => (
                  <StaggerItem key={stat.label}>
                    <p className="text-2xl font-bold" style={{ color: '#22D3EE' }}>
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-text-muted">
                      {stat.label}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
