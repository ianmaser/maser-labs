"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteContent } from "@/content/site-content";

const { links, cta } = siteContent.nav;

export default function Nav(): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-border-subtle bg-bg-base/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="text-lg font-bold tracking-tight text-text-primary">
          Maser Labs
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href={cta.href}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple px-5 py-2 text-sm font-medium text-bg-base transition-all hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]"
          >
            {cta.label}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-text-primary md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border-subtle bg-bg-base px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-text-muted transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href={cta.href}
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple px-5 py-2.5 text-sm font-medium text-bg-base"
            >
              {cta.label}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
