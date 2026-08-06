import GlowContainer from "@/components/ui/GlowContainer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import GhostWordmark from "@/components/ui/GhostWordmark";

export default function KitchenSink(): React.ReactElement {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-24">
        {/* Typography */}
        <section>
          <h2 className="mb-8 border-b border-border-subtle pb-4 text-sm font-mono uppercase tracking-widest text-accent-cyan">
            Typography
          </h2>
          <div className="space-y-6">
            <h1>Build for what&apos;s next.</h1>
            <h2>Custom software, AI automation, and web services</h2>
            <h3>Engineered for the modern era</h3>
            <p>
              Custom software built by a senior engineer from Citibank &amp;
              Verizon. We build fast, modern websites, AI automations, and
              business tools that actually work.
            </p>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="mb-8 border-b border-border-subtle pb-4 text-sm font-mono uppercase tracking-widest text-accent-cyan">
            Buttons
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button>Free Consult</Button>
            <Button size="lg">Free Consult (lg)</Button>
            <Button variant="secondary">See our work</Button>
            <Button variant="secondary" size="lg">
              See our work (lg)
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="mb-8 border-b border-border-subtle pb-4 text-sm font-mono uppercase tracking-widest text-accent-cyan">
            Cards
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <h3>Web &amp; App Development</h3>
              <p className="mt-2">
                A fast, modern website or app that actually works — and that you
                own.
              </p>
            </Card>
            <Card glow>
              <h3>AI Automation &amp; Integration</h3>
              <p className="mt-2">
                Cut the busywork. Chatbots, automated workflows, and AI tools
                tailored to your business.
              </p>
            </Card>
            <Card>
              <h3>Design &amp; UX</h3>
              <p className="mt-2">
                Interfaces people enjoy using. Full design, not just code.
              </p>
            </Card>
            <Card glow>
              <h3>Business Systems &amp; Dashboards</h3>
              <p className="mt-2">
                Replace the spreadsheet chaos with a clean tool built for how
                you actually work.
              </p>
            </Card>
          </div>
        </section>

        {/* Section Headings */}
        <section>
          <h2 className="mb-8 border-b border-border-subtle pb-4 text-sm font-mono uppercase tracking-widest text-accent-cyan">
            Section Headings
          </h2>
          <div className="space-y-12">
            <SectionHeading eyebrow="Services" headline="What we build" />
            <SectionHeading
              eyebrow="Portfolio"
              headline="Recent work"
              accentColor="purple"
            />
            <SectionHeading
              eyebrow="About"
              headline="Why Maser Labs"
              centered={false}
            />
          </div>
        </section>

        {/* GlowContainer */}
        <section>
          <h2 className="mb-8 border-b border-border-subtle pb-4 text-sm font-mono uppercase tracking-widest text-accent-cyan">
            Glow Containers
          </h2>
          <div className="space-y-8">
            <GlowContainer color="cyan" intensity="medium">
              <div className="rounded-2xl border border-border-subtle bg-bg-elevated p-12 text-center">
                <h3>Cyan glow (medium)</h3>
                <p className="mt-2">Content lit from within.</p>
              </div>
            </GlowContainer>
            <GlowContainer color="purple" intensity="strong">
              <div className="rounded-2xl border border-border-subtle bg-bg-elevated p-12 text-center">
                <h3>Purple glow (strong)</h3>
                <p className="mt-2">Content lit from within.</p>
              </div>
            </GlowContainer>
            <GlowContainer color="both" intensity="medium">
              <div className="rounded-2xl border border-border-subtle bg-bg-elevated p-12 text-center">
                <h3>Both glows (medium)</h3>
                <p className="mt-2">Dual cyan + purple.</p>
              </div>
            </GlowContainer>
          </div>
        </section>

        {/* Ghost Wordmark */}
        <section>
          <h2 className="mb-8 border-b border-border-subtle pb-4 text-sm font-mono uppercase tracking-widest text-accent-cyan">
            Ghost Wordmark
          </h2>
          <div className="relative rounded-2xl border border-border-subtle bg-bg-elevated p-16">
            <GhostWordmark />
            <p className="relative mt-4 text-center text-text-muted">
              Content sits on top of the ghosted wordmark
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
