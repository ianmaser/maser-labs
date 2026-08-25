import Button from "@/components/ui/Button";
import IntakeFormTop from "@/components/forms/IntakeFormTop";
import HeroBackdrop from "@/components/hero-files/HeroBackdrop";
import { siteContent } from "@/content/site-content";

const { headline, subline, ctaPrimary, ctaSecondary } = siteContent.hero;

export default function Hero(): React.ReactElement {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050506]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        {/* Hero showpiece graphic */}
        <div
          className="relative -mt-6 mb-0 h-[22rem] w-full max-w-6xl sm:h-[28rem] md:h-[36rem]"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 75% at 50% 42%, black 45%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 75% at 50% 42%, black 45%, transparent 100%)",
          }}
        >
          <HeroBackdrop />
        </div>

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
