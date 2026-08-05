export const siteContent = {
  hero: {
    headline: "Build for what's next.",
    subline:
      "Custom software, AI automation, and web services, engineered for the modern era.",
    ctaPrimary: "Free Consult",
    ctaSecondary: "See our work",
    hookPlaceholder: "What do you want to build?",
  },

  trustStrip: {
    credibilityLine: "Built by an engineer from Citibank & Verizon",
    techLogos: [
      "React",
      "Next.js",
      "TypeScript",
      "Supabase",
      "Claude / Anthropic",
      "Tailwind CSS",
    ],
  },

  services: [
    {
      title: "Web & App Development",
      blurb:
        "A fast, modern website or app that actually works — and that you own.",
    },
    {
      title: "AI Automation & Integration",
      blurb:
        "Cut the busywork. Chatbots, automated workflows, and AI tools tailored to your business.",
    },
    {
      title: "Design & UX",
      blurb: "Interfaces people enjoy using. Full design, not just code.",
    },
    {
      title: "Business Systems & Dashboards",
      blurb:
        "Replace the spreadsheet chaos with a clean tool built for how you actually work.",
    },
  ],

  portfolio: [
    {
      title: "EDGE",
      blurb:
        "An AI-powered trading analytics platform with natural-language strategy building and live market data.",
      techDetails: "Next.js, Supabase, Claude API, real-time data feeds",
      liveUrl: "",
    },
    {
      title: "Hold or Fold",
      blurb:
        "An AI poker assistant that reads a photo of the table and recommends the play in real time.",
      techDetails: "React Native, Claude Vision API, real-time image analysis",
      liveUrl: "",
    },
    {
      title: "Heart2Heart",
      blurb:
        "A voice-first dating platform — designed, built, and launched end to end.",
      techDetails: "React Native, voice processing, full-stack E2E",
      liveUrl: "",
    },
  ],

  about: {
    headline: "Why Maser Labs",
    story:
      "Senior engineer with enterprise roots at Citibank and Verizon, now building for businesses that want agency-quality work with a real human they can talk to.",
    stats: [
      { label: "Years Experience", value: "5+" },
      { label: "Enterprise Clients", value: "Citibank, Verizon" },
      { label: "Projects Shipped", value: "10+" },
    ],
  },

  process: [
    {
      step: 1,
      title: "Discovery",
      description:
        "We talk about your goals — free, no pressure.",
    },
    {
      step: 2,
      title: "Proposal & Timeline",
      description:
        "Clear scope, clear price, no surprises.",
    },
    {
      step: 3,
      title: "Build & Updates",
      description:
        "Regular progress updates — you're never in the dark.",
    },
    {
      step: 4,
      title: "Launch & Support",
      description:
        "Go live, plus support after.",
    },
  ],

  pricing: {
    signalLine:
      "Most projects range from a few thousand to tens of thousands depending on scope — the free consult is where we figure out what's right for you.",
    cta: "Book a Free Consult",
  },

  leadMagnet: {
    headline: "Free 15-Min AI & Web Opportunity Audit",
    description:
      "Book a quick call and walk away with 2-3 specific improvements for your business — whether that's your website, an automation opportunity, or an SEO gap.",
    cta: "Book Your Free Audit",
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Maser Labs. All rights reserved.`,
  },
} as const;
