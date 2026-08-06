import GlowContainer from "@/components/ui/GlowContainer";
import Button from "@/components/ui/Button";
import IntakeFormTop from "@/components/forms/IntakeFormTop";
import { siteContent } from "@/content/site-content";

const { headline, subline, ctaPrimary, ctaSecondary } = siteContent.hero;

export default function Hero(): React.ReactElement {
  return (
    <section className="relative min-h-screen pt-16">
      <GlowContainer color="both" intensity="medium" className="absolute inset-0" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        {/* Showpiece graphic placeholder */}
        <div className="mb-12 h-48 w-48 rounded-full border border-border-subtle bg-bg-elevated/50 shadow-[0_0_80px_rgba(34,211,238,0.1)]" />

        <h1 className="max-w-3xl">{headline}</h1>
        <p className="mt-4 max-w-xl text-lg text-text-muted">{subline}</p>

        {/* Top intake hook */}
        <div className="mt-8">
          <IntakeFormTop />
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="#contact" size="lg">
            {ctaPrimary}
          </Button>
          <Button href="#work" variant="secondary" size="lg">
            {ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
