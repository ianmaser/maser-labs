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
    credibilityLine:
      "Professional software engineering experience at enterprise scale",
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
      "My name is Ian Maser and I'm the founder of Maser Labs. I've spent years in the tech industry building software for enterprise-level companies; large-scale systems where reliability and quality aren't optional. Now my team and I bring that same professional discipline to businesses that want agency-quality work without the traditional agency overhead. We are an AI-driven agency and we use the latest AI tools to move faster, automate repetitive work, and deliver more efficiently. But make no mistake, we are not “vibe-coders.” Our work is backed by years of professional experience across software development, design, and technology. Every project is approached with the architecture, testing, maintainability, and technical rigor you’d expect from seasoned experts in their fields.",
    stats: [
      { label: "Years Experience", value: "5+" },
      { label: "Enterprise Clients", value: "Fortune 500" },
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
      "Every engagement is tailored to the scope, complexity, and goals of your project.",
    cta: "Book a Free Consult",
  },

  leadMagnet: {
    headline: "Free 15-Min AI & Web Opportunity Audit",
    description:
      "Already have a website, project, or business? Book a quick call and let’s talk about how we can help. Whether it’s improving your website, identifying an automation opportunity, or closing an SEO gap, we’ll help bring it up to modern standards and position it for what’s next.",
    cta: "Book Your Free Audit",
  },

  form: {
    serviceOptions: [
      "Website",
      "Web or Mobile App",
      "AI & Automation",
      "Internal Tool / Dashboard",
      "UI/UX Design",
      "SEO & Optimization",
      "Other (please specify below)",
      "Not sure / Just exploring",
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
