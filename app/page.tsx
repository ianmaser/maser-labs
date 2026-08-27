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

export default function Home(): React.ReactElement {
  return (
    <>
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
