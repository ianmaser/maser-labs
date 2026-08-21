import GlowContainer from "@/components/ui/GlowContainer";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteContent } from "@/content/site-content";

const { headline, description, cta } = siteContent.leadMagnet;

export default function LeadMagnet(): React.ReactElement {
  return (
    <section className="py-16">
      <GlowContainer color="purple" intensity="medium">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading eyebrow="Free Audit" headline={headline} accentColor="purple" />
          <p className="mt-6 text-lg leading-relaxed text-text-muted">
            {description}
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
