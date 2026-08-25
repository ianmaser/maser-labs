import GlowContainer from "@/components/ui/GlowContainer";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteContent } from "@/content/site-content";

const { signalLine, cta } = siteContent.pricing;

export default function Pricing(): React.ReactElement {
  return (
    <section className="py-16">
      <GlowContainer color="cyan" intensity="subtle">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading eyebrow="Pricing" headline="Transparent from the start" />
          <p className="mt-6 text-lg leading-relaxed text-text-muted">
            {signalLine}
          </p>
          <div className="mt-8">
            <Button href="#contact" size="lg">
              {cta}
            </Button>
          </div>
        </div>
      </GlowContainer>
    </section>
  );
}
