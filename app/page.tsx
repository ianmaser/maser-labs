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

export default function Home(): React.ReactElement {
  return (
    <>
      <Nav />
      <Hero />
      <TrustStrip />
      <Services />
      <Portfolio />
      <About />
      <Process />
      <Pricing />
      <LeadMagnet />
      <Contact />
      <Footer />
    </>
  );
}
