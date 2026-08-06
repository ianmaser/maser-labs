import { Globe, Bot, Palette, BarChart3 } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteContent } from "@/content/site-content";

const ICONS = [Globe, Bot, Palette, BarChart3] as const;

export default function Services(): React.ReactElement {
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Services" headline="What we build" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {siteContent.services.map((service, i) => {
            const Icon = ICONS[i];
            return (
              <Card key={service.title} className="group">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle bg-bg-base text-accent-cyan transition-colors group-hover:border-accent-cyan/30">
                  <Icon size={20} />
                </div>
                <h3>{service.title}</h3>
                <p className="mt-2">{service.blurb}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
