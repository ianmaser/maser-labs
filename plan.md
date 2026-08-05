# Maser Labs — Build Plan

### Technical Execution Document for Claude CLI

> Companion to `PLAN_01_Strategy.md` (the source-of-truth for all business/positioning/design decisions). This document translates that strategy into stack, architecture, components, schema, and phased build steps. **Read `PLAN_01_Strategy.md` first** — it holds the "why" behind every decision here.

> **How to use this doc with Claude CLI:** Work phase by phase, top to bottom. Complete and verify each phase before moving to the next. After each phase, save a session recap. Do not skip ahead — later phases assume earlier ones are done and tested.

---

## 0. Locked Technical Decisions

| Decision        | Choice                                                                            |
| --------------- | --------------------------------------------------------------------------------- |
| Framework       | **Next.js (App Router)** — SSR for SEO, Ian's daily stack                         |
| Language        | TypeScript                                                                        |
| Styling         | Tailwind CSS (+ shadcn/ui optional for form primitives)                           |
| Chatbot backend | **Next.js API route** (server-side, Anthropic key never exposed to client)        |
| Data / leads    | **Supabase** (Postgres + RLS)                                                     |
| Hosting         | Vercel                                                                            |
| Domain          | maserlabs.ai                                                                      |
| Analytics       | PostHog (preferred) or GA4                                                        |
| Hero showpiece  | **Lightweight** — static/generated graphic + CSS motion (NOT live WebGL/Three.js) |

---

## 1. Scope Split (what's in each phase)

**v1 (launch blocker):** all page sections, both intake forms → Supabase + email notify, hero showpiece graphic, full responsive + performance, core SEO, analytics, deploy.

**v1.5 (fast-follow post-launch):** AI chatbot (Claude), Calendly booking, blog/content section, advanced animations beyond core hero.

**v2 (later):** lead magnet automation, CRM pipeline view, pro bono case studies added to portfolio.

---

## 2. Architecture Overview

```
Browser (Next.js App Router, SSR)
  |
  |-- Static/SSR pages (SEO-optimized, fast)
  |-- Client components for interactivity (forms, animations, chatbot widget)
  |
  |-- POST /api/lead      -> validate -> insert into Supabase `leads` -> send email notification
  |-- POST /api/chat (v1.5)-> Claude API (server-side, key hidden) -> stream response
  |
Supabase (Postgres + RLS)
  |-- leads table
  |-- chat_conversations table (v1.5)
  |
External:
  |-- Anthropic Claude API (v1.5, via server route only)
  |-- Email service (Resend recommended) for instant lead notifications
  |-- PostHog / GA4 for analytics
  |-- Vercel for hosting + deploy
```

**Key architectural principles:**

- All secrets (Anthropic key, Supabase service role, Resend key) live in server-side env vars ONLY. Never in client components.
- Pages are Server Components by default; only interactive pieces (`"use client"`) are client components — keeps SEO and performance strong.
- The Supabase anon key is used client-side ONLY if needed; lead inserts go through the API route (server-side) so validation and notification happen server-side and RLS/service-role stays protected.

---

## 3. Project Setup (Phase 0)

**Goal:** clean, deployable skeleton before any real content.

Steps:

1. `npx create-next-app@latest maser-labs --typescript --tailwind --app --eslint`
2. Set up folder structure:
   ```
   /app
     /(site)           -> main marketing page route group
       page.tsx        -> the landing page (composes all sections)
       layout.tsx      -> root layout, metadata, fonts, analytics
     /api
       /lead/route.ts  -> lead capture endpoint
       /chat/route.ts  -> chatbot endpoint (v1.5, stub for now)
   /components
     /sections         -> Hero, Services, Portfolio, About, Process, Pricing, etc.
     /ui               -> reusable primitives (Button, Card, GlowContainer, etc.)
     /forms            -> IntakeFormTop, IntakeFormBottom
     /chat             -> ChatWidget (v1.5)
   /lib
     supabase.ts       -> Supabase client init
     validation.ts     -> lead form validation (zod)
     analytics.ts      -> PostHog/GA init + event helpers
   /content
     site-content.ts   -> ALL copy in one place (headlines, services, portfolio blurbs)
   /public
     /images, /portfolio, /portrait
   ```
3. Install deps: `@supabase/supabase-js`, `zod`, `resend`, `posthog-js`, animation lib (`framer-motion` recommended for tasteful scroll/reveal animations), `lucide-react` (icons).
4. Set up `.env.local` + `.env.example` (see §9 for full var list).
5. Configure fonts: a clean modern sans (Inter or Geist via `next/font`).
6. Set up the design token system in Tailwind config (see §4).
7. Deploy skeleton to Vercel immediately, confirm it builds and serves. **Get the staging URL live on day one.**

**Verify before next phase:** blank site builds, deploys, loads on Vercel.

---

## 4. Design System / Tokens (Phase 1)

Translate `PLAN_01 §4` into concrete tokens. Define in Tailwind config + CSS variables.

**Color tokens:**

```
--bg-base:      near-black (e.g. #05060A / #0A0B10)
--bg-elevated:  slightly lighter dark for cards (e.g. #0F1117)
--text-primary: near-white (#F5F7FA)
--text-muted:   muted gray (#9CA3B0)
--accent-cyan:  electric blue/cyan (e.g. #22D3EE / #38BDF8)
--accent-purple:violet/purple (e.g. #8B5CF6 / #A855F7)
--accent-glow:  used for radial glows (cyan/purple at low opacity)
--border-subtle:thin dark border (#1C1F27)
```

Rules (from strategy):

- Accents (cyan/purple) ONLY in glows, gradients, CTAs, highlights, graphic elements — **NEVER on body/paragraph text**.
- Headlines: `--text-primary` white. Body: `--text-muted`.
- Backgrounds are never flat — use radial-gradient glow layers behind key sections.

**Reusable primitives to build first:**

- `GlowContainer` — a wrapper that places a soft radial glow (cyan or purple) behind its children. This is THE repeatable depth technique (PLAN_01 §4). Used behind hero, portfolio pieces, CTA sections.
- `Button` — primary (accent gradient), secondary (dark w/ subtle border). Subtle hover glow/scale.
- `Card` — rounded, `--bg-elevated`, thin border, optional inner glow. For services + portfolio.
- `SectionHeading` — eyebrow label (small, accent, uppercase) + big white headline. Matches ref pattern.
- `GhostWordmark` — huge faded "MASER LABS" background text (for footer/section bg).

**Typography scale:** large confident headlines (clamp() for responsive), comfortable body, generous line-height. Mobile-first sizes.

**Verify:** a "kitchen sink" test page rendering all primitives correctly on mobile + desktop.

---

## 5. Content Layer (Phase 2)

Put ALL copy in `/content/site-content.ts` as typed objects so it's editable in one place and Claude CLI isn't hardcoding strings across components.

Populate from `PLAN_01`:

- **Hero:** headline "Build for what's next.", sub-line "High-quality custom software, AI automation, and web services for the modern era." (see PLAN_01 §1 for optional sub-line polish), CTAs ("Free Consult" / "See our work")
- **Trust strip:** "Built by an engineer from Citibank & Verizon" + tech logos list
- **Services (4):** Web & App Development / AI Automation & Integration / Design & UX / Business Systems & Dashboards — with the plain-English blurbs from PLAN_01 §3.4
- **Portfolio (3):** EDGE, Hold or Fold, Heart2Heart — outcome-focused blurbs from PLAN_01 §3.5 + expandable tech details + live links
- **About:** enterprise background (Citibank/Verizon), AI-fluency/speed angle, "quiet intensity" tone (PLAN_01 §3.6 + §4.1)
- **Process (4 steps):** Discovery / Proposal / Build / Launch+Support (PLAN_01 §3.7)
- **Pricing:** hidden model — soft range signal line + free consult CTA (PLAN_01 §3.8, §5). NO published prices.
- **Lead magnet:** "Free 15-Min AI & Web Opportunity Audit" framing (PLAN_01 §3.9)
- **Stats:** real numbers only (5 yrs exp, enterprise clients, projects) — never fabricate
- **Footer:** contact, socials, ghost wordmark

**Verify:** content object typed, complete, no lorem ipsum in final sections.

---

## 6. Page Sections (Phase 3) — build in this order

Each is a component in `/components/sections`, composed into `/app/(site)/page.tsx`. Server components where possible; `"use client"` only for interactive/animated pieces.

1. **Nav** — sticky, logo left, links right, persistent accent CTA ("Free Consult") anchoring to bottom form. Mobile hamburger.
2. **Hero** — headline + sub-line + top intake hook (single-line email capture) + primary/secondary CTA + the showpiece graphic (see §7). GlowContainer behind.
3. **Trust strip** — greyed tech logos + Citibank/Verizon credibility line.
4. **Services** — 4 Cards, outcome-led, icon + headline + blurb, subtle hover.
5. **Portfolio** — 3 project cards, framed dark UI screenshots w/ glow, outcome blurb, expandable tech details, live links. (Pro bono case studies added here in v2.)
6. **About** — portrait (dark/moody/blended, per §4.1) + philosophy/story + stats block. Portrait lives HERE, not hero.
7. **Process** — 4-step visual, reassures non-technical buyers.
8. **Pricing** — hidden-price section: soft range signal + strong free-consult CTA. (No tier cards in v1; if added later, middle-tier-elevated pattern per PLAN_01 §3.8.)
9. **Lead magnet** — free audit offer, CTA to book/submit.
10. **Bottom intake form** — full qualifying form (see §8) + (v1.5) Calendly link.
11. **Footer** — contact, socials, ghost "MASER LABS" wordmark.

**Animation (framer-motion, tasteful):** scroll-triggered fade/slide reveals on sections; subtle parallax; the hero showpiece has its "alive" motion. 2-3 genuine wow moments, calm elsewhere. Respect `prefers-reduced-motion`.

**Verify after each:** section renders correctly, mobile-first, no layout shift, animations smooth.

---

## 7. Hero Showpiece Graphic (Phase 4)

**Approach: LIGHTWEIGHT (locked in PLAN_01 §4). Do NOT build a live WebGL/Three.js particle system.**

Options, in order of preference:

1. **Static/generated hero graphic + CSS/framer-motion layered motion:** an intricate glowing sci-fi/light-beam image (the "maser beam" motif — cyan/purple energy on near-black), with layered CSS animations: breathing glow (opacity/scale pulse), slow gradient drift, subtle mouse-parallax. Lightest + fast + impressive. **Default choice.**
2. **Heavily-compressed hero video (fallback):** if a static graphic can't hit the wow, a short optimized loop (webm/mp4, aggressively compressed, target < 2-3MB, poster image, autoplay muted loop, `prefers-reduced-motion` fallback to static). Reference clip was ~19MB — must compress hard.

**Requirements:**

- Must not tank LCP. Lazy/priority-load appropriately; hero image gets `priority`.
- Mobile: simpler/lighter version if needed. Test on a mid-range phone.
- Reinterpret the "maser/light-beam precision" theme — coherent with EDGE/Hold or Fold aesthetic.

**Verify:** hero looks stunning, LCP under 2.5s on mid-range mobile, no jank.

---

## 8. Lead Capture (Phase 5) — v1 CRITICAL

This is the revenue engine. Must work flawlessly.

**Supabase `leads` table schema:**

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  source text,                    -- 'hero_hook' | 'bottom_form' | (later) 'chatbot'
  name text,
  email text not null,
  business_name text,
  business_type text,
  service_interest text,          -- Website/App/AI Automation/Dashboard/SEO/Not sure
  budget_range text,
  timeline text,
  project_details text,
  status text default 'new',      -- new | contacted | consult_booked | won | lost
  raw_meta jsonb                  -- utm, referrer, page, etc.
);
-- RLS: no public read. Inserts happen server-side via service role in the API route.
alter table leads enable row level security;
-- (No public policies — all access is server-side via service role key.)
```

**Two forms:**

- `IntakeFormTop` (hero hook): single line — "What do you want to build?" + email → submit. Minimal friction. `source = 'hero_hook'`.
- `IntakeFormBottom` (full qualifier): name, business name/type, service interest (dropdown), budget range (dropdown), timeline, project details (textarea). `source = 'bottom_form'`.

**API route `/api/lead`:**

1. Validate input with zod (server-side).
2. Insert into Supabase `leads` (service role, server-side).
3. Fire instant email notification to Ian via Resend ("New lead: [name] / [service] / [budget]").
4. Return success/error; client shows confirmation state.
5. Capture utm/referrer/page into `raw_meta`.

**Critical:** instant notification is non-negotiable (PLAN_01 §9 — speed of response wins local deals). Consider SMS later.

**Verify:** submit both forms → row lands in Supabase → email arrives within seconds → client shows clean success state. Test validation + error states.

---

## 9. SEO + Analytics + Performance (Phase 6) — v1 CRITICAL

**SEO:**

- Per-page metadata via Next.js Metadata API (title, description, Open Graph, Twitter card).
- Semantic HTML, proper heading hierarchy (one h1 = the hero headline).
- `sitemap.xml` + `robots.txt` (Next.js can generate).
- Schema markup: `LocalBusiness` / `ProfessionalService` JSON-LD (name, area served, services).
- Fast load = ranking factor (see perf below).
- Local SEO groundwork: consistent NAP, set up Google Business Profile (Ian, off-site task).

**Analytics:**

- PostHog (preferred) init in root layout.
- Conversion events: `lead_submitted` (with source), `consult_cta_click`, `portfolio_expand`, scroll-depth, (v1.5) `chat_opened`.
- These are essential before any paid ads (PLAN_01 §8).

**Performance (non-negotiable — the site's quality IS the sales pitch):**

- Images: webp, correct sizing, `next/image`, lazy-load below fold, hero `priority`.
- Target: mobile LCP < 2.5s, strong Lighthouse scores.
- Code-split, minimize client JS, Server Components by default.
- `prefers-reduced-motion` respected.

**Env vars (`.env.example`):**

```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=      # server-only
RESEND_API_KEY=                 # server-only
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
ANTHROPIC_API_KEY=              # server-only, v1.5
NEXT_PUBLIC_SITE_URL=
```

**Verify:** Lighthouse pass (perf/SEO/a11y/best-practices all strong), metadata renders, sitemap/robots live, analytics events fire.

---

## 10. Deploy v1 (Phase 7) — LAUNCH

1. Connect repo to Vercel, configure all env vars in Vercel dashboard.
2. Connect maserlabs.ai domain + SSL.
3. Full QA pass on production: both forms, all sections, mobile + desktop, cross-browser (Chrome/Safari/Firefox), performance.
4. Confirm lead flow end-to-end on production (submit → Supabase → email).
5. Submit sitemap to Google Search Console.
6. **v1 is LIVE. Maser Labs is open for business.**

**This is the launch milestone. Everything below is fast-follow.**

---

## 11. AI Chatbot (Phase 8) — v1.5

The trickiest component, deliberately quarantined post-launch (PLAN_01 §3.12).

**Architecture:**

- `ChatWidget` client component (persistent, dismissible, subtle greet on load — not aggressive).
- `POST /api/chat` server route → Anthropic Claude API (key server-side only) → stream response back.
- Store conversations in Supabase `chat_conversations` (for lead-gen insight + follow-up).

**System prompt / guardrails (from PLAN_01 §3.12) — CRITICAL:**

- Fed real context about Ian + Maser Labs services, process, background, portfolio.
- CAN: answer "can he build X?", explain process/background/differentiators, give ballpark RANGES only (always framed "it depends on scope — the free consult nails it down"), route users to the intake form / booking.
- MUST NOT: quote a firm price, overpromise capability/timelines, drift off-topic into general-assistant behavior. Stays scoped to Maser Labs.
- On buying signals → nudge toward the free consult / intake form.

**Cost controls:** rate-limit per session, cap tokens, use an appropriate Claude model tier for cost/latency.

**Triple duty (why it matters):** lead qualifier + live demo of automation capability ("you could have one of these too") + Ian's own automation practice.

`chat_conversations` schema:

```sql
create table chat_conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  session_id text,
  messages jsonb,                 -- full transcript
  captured_email text,            -- if user shares it
  routed_to_form boolean default false
);
alter table chat_conversations enable row level security;
```

**Verify:** chatbot answers on-brand, refuses firm quotes, routes to consult, never leaks key, handles errors gracefully, respects rate limits.

---

## 12. Remaining Fast-Follows (Phase 9+) — v1.5 / v2

- **Calendly booking** integration (v1.5) — embed/link in pricing, lead magnet, bottom form. Trivial.
- **Blog/content section** (v1.5) — for SEO long-game + lead magnet content. MDX or Supabase-backed.
- **Advanced animations** (v1.5) — beyond core hero, if desired.
- **Lead magnet automation / follow-up sequences** (v2).
- **CRM pipeline view** (v2) — if Supabase table + email isn't enough; add `status`-based admin view or mirror to Airtable.
- **Pro bono case studies** (v2) — add real-estate / ice-cream-shop (before/after!) / MMA-gym projects to portfolio as completed, with testimonials + logos.

---

## 13. Build Phase Checklist (for Claude CLI session tracking)

- [ ] Phase 0 — Project setup + deploy skeleton to Vercel
- [ ] Phase 1 — Design system / tokens / primitives
- [ ] Phase 2 — Content layer populated
- [ ] Phase 3 — Page sections (nav → footer)
- [ ] Phase 4 — Hero showpiece graphic (lightweight)
- [ ] Phase 5 — Lead capture (forms + API + Supabase + email notify)
- [ ] Phase 6 — SEO + analytics + performance
- [ ] Phase 7 — Deploy v1 + domain + QA → **LAUNCH**
- [ ] Phase 8 — AI chatbot (v1.5)
- [ ] Phase 9+ — Calendly, blog, animations, automations, case studies

**Workflow reminder:** one phase at a time, verify + test before proceeding, save a session recap after each phase, don't work directly on main without confirming the phase works. (Ian's established Claude CLI discipline — plan.md driven, phase-gated, session notes.)

---

## 14. Guardrails / Gotchas (learned patterns)

- **Secrets server-side only.** Anthropic key, Supabase service role, Resend key — never in client components or `NEXT_PUBLIC_` vars.
- **Next.js middleware naming** — verify the current App Router conventions for the installed version (prior projects hit silent middleware failures from version-specific naming).
- **Supabase RLS on insert** — inserts need correct policy or service-role path; validate the lead insert actually lands (prior projects hit 403s from RLS + missing user context). Here inserts go server-side via service role, sidestepping that.
- **QueryClient/provider wiring** — if any data-fetching lib is added, ensure its provider wraps the app root (prior projects had silently non-functional hooks from a missing provider).
- **Hero weight** — do NOT let the showpiece tank LCP. Compress hard, lazy-load correctly, test on real mobile.
- **prefers-reduced-motion** — respect it for all animations.
- **Don't over-animate** — 2-3 wow moments, calm elsewhere. The restraint is the point.
