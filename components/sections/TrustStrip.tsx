import { siteContent } from "@/content/site-content";

const { credibilityLine, techLogos } = siteContent.trustStrip;

export default function TrustStrip(): React.ReactElement {
  return (
    <section className="border-y border-border-subtle bg-bg-elevated/50 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm font-medium text-text-muted">
          {credibilityLine}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {techLogos.map((logo) => (
            <span
              key={logo}
              className="text-xs uppercase tracking-widest text-text-muted/50"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
