export const siteContent = {
  nav: {
    links: [
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "About", href: "#about" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Free Consult", href: "#contact" },
  },

  hero: {
    headline: "Build for what's next.",
    subline:
      "Custom software, AI automation, and web services, engineered for the modern era.",
    ctaPrimary: "Free Consult",
    ctaSecondary: "See our work",
    hookPlaceholder: "What's your big idea?",
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
      image: "/portfolio/edge.png",
      liveUrl: "",
    },
    {
      title: "Hold or Fold",
      blurb:
        "An AI poker assistant that reads a photo of the table and recommends the play in real time.",
      techDetails: "React Native, Claude Vision API, real-time image analysis",
      image: "/portfolio/hold-or-fold.png",
      liveUrl: "",
    },
    {
      title: "Heart2Heart",
      blurb:
        "A voice-first dating platform — designed, built, and launched end to end.",
      techDetails: "React Native, voice processing, full-stack E2E",
      image: "/portfolio/13.png",
      liveUrl: "",
    },
  ],

  about: {
    headline: "Why Maser Labs",
    story:
      "I spent years building software at Citibank and Verizon — large-scale systems where reliability and quality aren't optional. Now I bring that same engineering discipline to businesses that want agency-quality work without the agency overhead. You get a senior engineer who actually builds your project, not a sales team that hands it off. I'm deeply fluent in AI — not as a buzzword, but as a practical tool I use every day to ship faster and build smarter. That means you get modern, forward-looking solutions at a speed that surprises people.",
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
      description: "We talk about your goals — free, no pressure.",
    },
    {
      step: 2,
      title: "Proposal & Timeline",
      description: "Clear scope, clear price, no surprises.",
    },
    {
      step: 3,
      title: "Build & Updates",
      description: "Regular progress updates — you're never in the dark.",
    },
    {
      step: 4,
      title: "Launch & Support",
      description: "Go live, plus support after.",
    },
  ],

  pricing: {
    signalLine:
      "Projects can start as low as a few hundred to tens of thousands depending on scope — the free consult is where we figure out what's right for you.",
    cta: "Book a Free Consult",
  },

  leadMagnet: {
    headline: "Free 15-Min AI & Web Opportunity Audit",
    description:
      "Already have a website? Book a quick call and let's talk about how we can improve your business. Whether it's changes your website, an automation opportunity, or an SEO gap, we'll give it the modern, forward-looking treatment it deserves.",
    cta: "Book Your Free Audit",
  },

  form: {
    serviceOptions: [
      "Website",
      "App",
      "AI Automation",
      "Dashboard",
      "Design & UX",
      "SEO",
      "Other (please specify below)",
      "Not sure/Just exploring",
    ],
    budgetOptions: [
      "Under $2,000",
      "$2,000 – $5,000",
      "$5,000 – $10,000",
      "$10,000+",
      "Not sure yet",
    ],
    timelineOptions: [
      "ASAP",
      "1–2 months",
      "3–6 months",
      "No rush — just exploring",
    ],
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Maser Labs. All rights reserved.`,
    socials: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/ian-maser/" },
      { platform: "GitHub", url: "https://github.com/ianmaser" },
    ],
  },
} as const;
