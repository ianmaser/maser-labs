import GlowContainer from "@/components/ui/GlowContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteContent } from "@/content/site-content";

const { headline, story, stats } = siteContent.about;

export default function About(): React.ReactElement {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Portrait placeholder */}
          <GlowContainer color="purple" intensity="medium">
            <div className="mx-auto aspect-[3/4] w-full max-w-sm rounded-2xl border border-border-subtle bg-bg-elevated/50 flex items-center justify-center">
              <span className="text-sm text-text-muted/40">Portrait</span>
            </div>
          </GlowContainer>

          {/* Content */}
          <div>
            <SectionHeading
              eyebrow="About"
              headline={headline}
              centered={false}
            />
            <p className="mt-6 text-base leading-relaxed text-text-muted">
              {story}
            </p>

            {/* Stats block */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold" style={{ color: '#22D3EE' }}>
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
