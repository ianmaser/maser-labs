import SectionHeading from "@/components/ui/SectionHeading";
import { siteContent } from "@/content/site-content";

export default function Process(): React.ReactElement {
  return (
    <section id="process" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Process" headline="How it works" />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {siteContent.process.map((step) => (
            <div key={step.step} className="relative text-center">
              {/* Step number */}
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-accent-cyan/30 text-lg font-bold text-accent-cyan">
                {step.step}
              </div>
              <h3 className="text-base">{step.title}</h3>
              <p className="mt-2 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
