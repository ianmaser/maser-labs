import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import LeadMagnet from "@/components/sections/LeadMagnet";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import GradientDivider from "@/components/ui/GradientDivider";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Maser Labs",
  description:
    "Custom software, AI automation, and web services engineered for the modern era.",
  url: "https://maserlabs.ai",
  founder: {
    "@type": "Person",
    name: "Ian Maser",
    jobTitle: "Founder & Lead Engineer",
  },
  serviceType: [
    "Web & App Development",
    "AI Automation & Integration",
    "Design & UX",
    "Business Systems & Dashboards",
  ],
  areaServed: "US",
  priceRange: "$$",
};

export default function Home(): React.ReactElement {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <Hero />
      <TrustStrip />
      <Services />
      <GradientDivider />
      <Portfolio />
      <GradientDivider />
      <About />
      <GradientDivider />
      <Process />
      <GradientDivider />
      <Pricing />
      <LeadMagnet />
      <GradientDivider />
      <Contact />
      <Footer />
    </>
  );
}
