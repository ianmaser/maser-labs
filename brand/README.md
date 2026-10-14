# Maser Labs — Logo Assets

How to use the Maser Labs logo files.

**Brand contact:** Ian Maser. Questions on logo usage or brand direction go to him.

---

## Read this first

**All logo files are transparent.** The suffix tells you what background the file is built for, not what background it contains.

- `-ondark` — place on a dark background (near-black, `#0A0B10`)
- `-onlight` — place on a white or light background

**Two exceptions.** `stacked-hero-lockup-full` and the social/banner graphics are finished images with their dark background included. These are complete graphics, not placeable logos — don't put them inside another container.

---

## Quick reference

| If you're doing this | Use this |
|---|---|
| Website header | `maserlabs-logo-horizontal-lockup-clean-ondark.svg` |
| Site footer or anywhere needing a square logo | `maserlabs-logo-stacked-clean-lockup-ondark.svg` |
| Logo with no name (small spaces, app UI) | `maserlabs-logo-mark-clean-ondark.svg` |
| Favicon / browser tab | `maserlabs-favicon.svg` |
| App icon (iOS) | `maserlabs-logo-apple-touch-180.png` |
| App icon (Android) | `maserlabs-logo-android-192.png` |
| Link preview (Slack, LinkedIn, iMessage) | `maserlabs-logo-open-graph-linked-preview-1200.png` |
| Profile picture | `maserlabs-logo-social-512-hero.png` |
| Profile picture, simpler/flatter | `maserlabs-logo-social-400-clean.png` |
| LinkedIn cover | `maserlabs-logo-linkedin-banner-hero.png` |
| X / Twitter header | `maserlabs-logo-x-header-hero.png` |
| Site hero, video intro, title slide | `maserlabs-logo-stacked-hero-lockup-full.png` |
| Video slate (16:9) | `maserlabs-logo-video-hero-16-9.png` |
| On a white page or printed document | `maserlabs-logo-stacked-hero-lockup-onlight.png` |
| Single color, dark background | `maserlabs-logo-stacked-lockup-mono-white-ondark.png` |
| Single color, light background | `maserlabs-logo-stacked-lockup-mono-black-onlight.png` |
| Editing, resizing, or anything not covered here | `MaserLabs Logo Master.ai` |

---

## The three rules

1. **Never recreate or redraw the logo.** Always use these files.
2. **Don't stretch it.** Resize proportionally only — hold Shift in most tools.
3. **Give it room.** Keep clear space around the logo equal to at least the height of the "M" on all sides.

---

## The versions explained

**Hero** — The full glass-and-glow rendering. The showpiece. Use it on the site hero, video intros, and title slides, on near-black only. Use it sparingly; the restraint is what makes it land.

**Clean** — Flat gradient, no glow. The everyday workhorse for the site header, footer, documents, and email.

**Mono** — Single color, white or black. For photography, video overlays, merch, and anywhere the gradient can't reproduce.

## The lockups explained

**Horizontal** — Mark on the left, name on the right. Use it where you have width and little height: site headers, email signatures, document footers.

**Stacked** — Mark on top, name below. Use it in square or tall spaces: social posts, slides, print.

**Mark only** — The ML monogram alone. Use it below about 240px wide, where the name becomes illegible: avatars, app icons, favicons, small UI.

---

## File formats

**SVG** — First choice for anything on the web. Sharp at any size, tiny file. Can be inlined in HTML so CSS can control it.

**PNG** — Transparent background. Use where SVG isn't supported: email signatures, social platforms, PowerPoint, Word.

**AI** — The master source file. Contains every artboard. Use it to export anything not already in this folder, or send it to a printer. Don't edit without checking with Ian.

---

## Web setup

```html
<link rel="icon" href="/maserlabs-favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/maserlabs-logo-apple-touch-180.png">
```

For link previews:

```html
<meta property="og:image" content="https://maserlabs.ai/maserlabs-logo-open-graph-linked-preview-1200.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
```

Point your `site.webmanifest` at `maserlabs-logo-android-192.png`.

**Tip:** Link previews cache hard. After updating the Open Graph image, run the URL through LinkedIn's Post Inspector and X's Card Validator to force a refresh.

**Note:** Run the SVGs through SVGO before deploying — Illustrator output carries extra metadata.

---

## Minimum sizes

| Context | Minimum |
|---|---|
| Full lockup, screen | 240px wide |
| Mark alone, screen | 90px wide |
| Print | 22mm wide |

Below 48px, use the favicon file. It's simplified so the shape still reads.

---

## Backgrounds

| Background | Use |
|---|---|
| Near-black (`#0A0B10`) | Any `-ondark` version — preferred |
| Dark, other shades | `-ondark` clean or mono-white |
| White or light gray | Any `-onlight` version |
| Brand gradient or color | `mono-white-ondark` |
| Photography | `mono-white-ondark`, over a darker area |
| Busy photography | Don't. Find a calmer spot or add a dark overlay. |

---

## Don't

- Don't stretch, squash, or rotate it
- Don't recolor it or apply your own gradient
- Don't add drop shadows, outlines, or strokes
- Don't put an `-ondark` file on a light background, or the reverse
- Don't place it on busy photography
- Don't crop it or use part of the monogram
- Don't put the hero version inside a card or container — it's a finished graphic
- Don't rebuild it in PowerPoint or Canva — use these files
- Don't screenshot the logo from the website

---

## Colors

| Role | Hex |
|---|---|
| Base (background) | `#0A0B10` |
| Cyan | `#22D3EE` |
| Blue | `#38BDF8` |
| Purple | `#8B5CF6` |
| Violet | `#A855F7` |
| Primary text | `#F5F7FA` |
| Muted text | `#9CA3B0` |

Color belongs in glows, gradients, and buttons. Never in body text.

**Type:** Geist Sans for headlines and body, Geist Mono for labels. Where Geist isn't available, use Inter.

---

## Need something that isn't here

The master `.ai` file contains all artboards. Common requests we can export quickly:

- `favicon.ico` for older Safari support
- Android 512 and maskable icons for PWA installs
- Horizontal mono-white, for light backgrounds and photo overlays
- `-onlight` SVGs
- Print formats (PDF, EPS, CMYK)

Ask and we'll bounce them out.

---

*Maser Labs · maserlabs.ai · v1 · 2026*
