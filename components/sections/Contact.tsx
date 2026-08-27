import GlowContainer from "@/components/ui/GlowContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import IntakeFormBottom from "@/components/forms/IntakeFormBottom";

export default function Contact(): React.ReactElement {
  return (
    <section id="contact" className="dot-grid py-24">
      <GlowContainer color="both" intensity="subtle">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="Contact"
            headline="Let's build something great"
          />
          <div className="mt-12">
            <IntakeFormBottom />
          </div>
        </div>
      </GlowContainer>
    </section>
  );
}
