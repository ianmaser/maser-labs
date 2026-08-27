"use client";

import GlowContainer from "@/components/ui/GlowContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { siteContent } from "@/content/site-content";

export default function Process(): React.ReactElement {
  return (
    <section id="process" className="py-24">
      <GlowContainer color="purple" intensity="subtle">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Process" headline="How it works" />

          <StaggerContainer className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.15}>
            {siteContent.process.map((step) => (
              <StaggerItem key={step.step} className="relative text-center">
                {/* Step number */}
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
                  style={{
                    color: '#22D3EE',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(34, 211, 238, 0.3)',
                    boxShadow: '0 0 12px rgba(34, 211, 238, 0.15), 0 0 30px rgba(34, 211, 238, 0.06)',
                  }}
                >
                  {step.step}
                </div>
                <h3 className="text-base">{step.title}</h3>
                <p className="mt-2 text-sm">{step.description}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </GlowContainer>
    </section>
  );
}
