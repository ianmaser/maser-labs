"use client";

import { Globe, Bot, Palette, BarChart3 } from "lucide-react";
import Card from "@/components/ui/Card";
import GlowContainer from "@/components/ui/GlowContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { siteContent } from "@/content/site-content";

const ICONS = [Globe, Bot, Palette, BarChart3] as const;

export default function Services(): React.ReactElement {
  return (
    <section id="services" className="dot-grid py-24">
      <GlowContainer color="cyan" intensity="subtle">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Services" headline="What we build" />

          <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2" stagger={0.12}>
            {siteContent.services.map((service, i) => {
              const Icon = ICONS[i];
              return (
                <StaggerItem key={service.title}>
                  <Card className="group h-full">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle bg-bg-base text-accent-cyan transition-colors group-hover:border-accent-cyan/30">
                      <Icon size={20} />
                    </div>
                    <h3>{service.title}</h3>
                    <p className="mt-2">{service.blurb}</p>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </GlowContainer>
    </section>
  );
}
