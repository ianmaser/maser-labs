"use client";

/* ============================================================================
   MASER LABS — HeroBackdrop
   The shipping wrapper around HeroCanvas. Handles the three things that keep
   the animation from hurting the very performance it's meant to prove:

     1. ssr:false dynamic import — no point server-rendering a canvas; keeps the
        animation JS out of the critical path so your headline stays the LCP.
     2. Static poster <img> — paints instantly (so there's never an empty hero),
        AND is the final image on mobile / reduced-motion, where we don't run
        the loop at all.
     3. JS gate — the live canvas only MOUNTS on desktop + fine pointer + motion
        allowed. Phones never load or run it; they keep the fast static image.

   ── SETUP ───────────────────────────────────────────────────────────────────
   • Put HeroCanvas.tsx and this file in  components/sections/
   • Capture the static poster: open maser-hero.html, let it settle a second,
     screenshot the hero (the scrim is baked into that render, so the image is
     already text-ready). Export to WebP, compress hard, drop it at
     public/hero-static.webp  (update the src below if you name it differently).
   • Slot it into your existing Hero section — do NOT duplicate your copy:

       import HeroBackdrop from "@/components/sections/HeroBackdrop";

       export function Hero() {
         return (
           <section className="relative min-h-[92vh] overflow-hidden bg-[#050506]">
             <HeroBackdrop />                       // z-0 background
             <div className="relative z-10 flex flex-col items-center ...">
               /* your existing headline, sub-line, intake hook, CTAs */
//        </div>
//      </section>
//    );
//  }

//  The parent <section> must be `relative` and have real height (min-h-…), and
//  your copy must be `relative z-10` to sit above the backdrop.
//  ==========================================================================

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// No SSR: a canvas renders nothing on the server, and this keeps the animation
// bundle off the critical path.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function HeroBackdrop() {
  // Starts false so server HTML and first client render match (poster only).
  // After mount we decide whether this device gets the live canvas.
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canAnimate = window.matchMedia(
      "(min-width: 768px) and (pointer: fine)",
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setLive(canAnimate.matches && !reduced.matches);
    apply();
    canAnimate.addEventListener("change", apply);
    reduced.addEventListener("change", apply);
    return () => {
      canAnimate.removeEventListener("change", apply);
      reduced.removeEventListener("change", apply);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {/* Instant poster — first paint for everyone, and the final image on
          mobile / reduced-motion. Scrim is baked into the capture. */}
      <img
        src="/hero-static.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          maskImage: "radial-gradient(ellipse 65% 70% at 50% 42%, black 35%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 70% at 50% 42%, black 35%, transparent 90%)",
        }}
      />

      {/* Live canvas overlays the poster on desktop; its own opaque background
          + scrim cover the image once it starts painting. */}
      {live && <HeroCanvas />}
    </div>
  );
}
