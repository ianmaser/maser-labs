"use client";

/* ============================================================================
   MASER LABS — HeroCanvas
   A self-contained animated background centerpiece. Drop it into your existing
   Hero section as an absolutely-positioned background BEHIND your copy.

   ── USAGE ───────────────────────────────────────────────────────────────────
   Your Hero section already has the headline, sub-line, intake hook, and CTAs.
   This component is only the glowing graphic + scrim that sits behind them:

     import HeroCanvas from "@/components/sections/HeroCanvas";

     export function Hero() {
       return (
         <section className="relative min-h-[92vh] overflow-hidden bg-[#050506]">
           <HeroCanvas />                     // fills the section, z-0
           <div className="relative z-10 ...">// your existing hero copy
             <h1>Build for what's next.</h1>
             ...
           </div>
         </section>
       );
     }

   Requirements on the parent <section>:
     • position: relative  (Tailwind `relative`)
     • a height  (min-h-[...] or h-screen) — the canvas fills the parent, so the
       parent must have real height or the canvas will be 0px tall.
     • your copy must be `relative z-10` (or any z above 0) to sit on top.

   No dependencies. Pure Canvas 2D. All the perf work is baked in:
     • bloom blurred on a ¼-res buffer (the big cost win)
     • 30fps cap · prefers-reduced-motion → single static frame
     • pauses when scrolled offscreen or the tab is hidden
     • internal resolution capped; DPR forced to 1 + fewer particles on mobile
   ========================================================================== */

import { useEffect, useRef } from "react";

type Vec = number[];

export default function HeroCanvas({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const REDUCED = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const FRAME_MS = 1000 / 30;
    const MAX_W = 1600;
    const P = {
      intensity: 1.35,
      saturation: 92,
      pose: 3,
      spin: 0.28,
      pulses: 3,
    };

    let W = 0,
      H = 0,
      R = 0,
      CX = 0,
      CY = 0;
    let L: HTMLCanvasElement, lx: CanvasRenderingContext2D;
    let S: HTMLCanvasElement, sx: CanvasRenderingContext2D;
    let B: HTMLCanvasElement, bx: CanvasRenderingContext2D;
    let G: { v: Vec[]; e: number[][]; f: number[][]; fc: Vec[] };
    let rings: any[], dust: any[], edgeParts: any[], dualEdges: number[][];
    let raf = 0,
      running = false,
      t0 = 0,
      lastDraw = 0;
    let visible = true,
      onscreen = true;
    let drawScene: (now: number, dtScale: number) => void = () => {};

    /* ---------- geometry ---------- */
    function ico() {
      const t = (1 + Math.sqrt(5)) / 2;
      let v: Vec[] = [
        [-1, t, 0],
        [1, t, 0],
        [-1, -t, 0],
        [1, -t, 0],
        [0, -1, t],
        [0, 1, t],
        [0, -1, -t],
        [0, 1, -t],
        [t, 0, -1],
        [t, 0, 1],
        [-t, 0, -1],
        [-t, 0, 1],
      ];
      const f = [
        [0, 11, 5],
        [0, 5, 1],
        [0, 1, 7],
        [0, 7, 10],
        [0, 10, 11],
        [1, 5, 9],
        [5, 11, 4],
        [11, 10, 2],
        [10, 7, 6],
        [7, 1, 8],
        [3, 9, 4],
        [3, 4, 2],
        [3, 2, 6],
        [3, 6, 8],
        [3, 8, 9],
        [4, 9, 5],
        [2, 4, 11],
        [6, 2, 10],
        [8, 6, 7],
        [9, 8, 1],
      ];
      v = v.map((p) => {
        const l = Math.hypot(p[0], p[1], p[2]);
        return [p[0] / l, p[1] / l, p[2] / l];
      });
      const seen: Record<string, number> = {},
        e: number[][] = [];
      for (const tri of f)
        for (let i = 0; i < 3; i++) {
          const a = tri[i],
            b = tri[(i + 1) % 3],
            k = Math.min(a, b) + "_" + Math.max(a, b);
          if (!seen[k]) {
            seen[k] = 1;
            e.push([a, b]);
          }
        }
      const fc: Vec[] = f.map((tri) => {
        const A = v[tri[0]],
          Bb = v[tri[1]],
          Cc = v[tri[2]];
        const p = [
          (A[0] + Bb[0] + Cc[0]) / 3,
          (A[1] + Bb[1] + Cc[1]) / 3,
          (A[2] + Bb[2] + Cc[2]) / 3,
        ];
        const l = Math.hypot(p[0], p[1], p[2]);
        return [p[0] / l, p[1] / l, p[2] / l];
      });
      return { v, e, f, fc };
    }

    /* ---------- (re)build for current size ---------- */
    function build() {
      const cssW = wrap!.clientWidth,
        cssH = wrap!.clientHeight;
      if (cssW < 2 || cssH < 2) return false;

      const isMobile =
        window.matchMedia("(max-width:768px)").matches ||
        window.matchMedia("(pointer:coarse)").matches;
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      const scale = Math.min(dpr, MAX_W / cssW);

      W = Math.round(cssW * scale);
      H = Math.round(cssH * scale);
      canvas!.width = W;
      canvas!.height = H;

      CX = W * 0.55;
      CY = H * 0.55;
      R = Math.min(W, H) * 0.25;
      const dustN = isMobile ? 90 : 220;

      G = ico();

      let s0 = P.pose * 9301 + 49297;
      const rnd = () => {
        s0 = (s0 * 9301 + 49297) % 233280;
        return s0 / 233280;
      };

      const RN = 240;
      const ringPath = (rad: number) => {
        const a: Vec[] = [];
        for (let i = 0; i <= RN; i++) {
          const u = (i / RN) * Math.PI * 2;
          a.push([Math.cos(u) * rad, Math.sin(u) * rad, 0]);
        }
        return a;
      };
      rings = [
        {
          pts: ringPath(1.58),
          ax: 1.18,
          ay: 0.42,
          az: -0.3,
          w: 1.15,
          al: 0.3,
          dir: 1,
          RN,
        },
        {
          pts: ringPath(1.22),
          ax: 0.42,
          ay: 1.05,
          az: 0.55,
          w: 0.9,
          al: 0.22,
          dir: -1,
          RN,
        },
      ];

      dust = [];
      for (let i = 0; i < dustN; i++) {
        const ang = rnd() * 6.284,
          rr = R * (0.3 + Math.pow(rnd(), 0.55) * 2.0);
        const x = CX + Math.cos(ang) * rr * 1.25 - R * 0.1,
          y = CY + Math.sin(ang) * rr * 0.7;
        const fall = Math.max(0, 1 - rr / (R * 2.5));
        dust.push({
          x,
          y,
          r: 0.8 + rnd() * 1.5,
          a: (0.22 + rnd() * 0.5) * fall,
          ph: rnd() * 6.284,
        });
      }
      edgeParts = [];
      for (let i = 0; i < 64; i++)
        edgeParts.push({
          e: (rnd() * G.e.length) | 0,
          t: rnd(),
          s: 0.0006 + rnd() * 0.0016,
        });

      dualEdges = [];
      for (let i = 0; i < G.f.length; i++)
        for (let j = i + 1; j < G.f.length; j++) {
          let sh = 0;
          for (const a of G.f[i]) if (G.f[j].indexOf(a) >= 0) sh++;
          if (sh === 2) dualEdges.push([i, j]);
        }

      L = document.createElement("canvas");
      L.width = W;
      L.height = H;
      lx = L.getContext("2d")!;
      const SW = Math.max(1, Math.round(W / 4)),
        SH = Math.max(1, Math.round(H / 4));
      S = document.createElement("canvas");
      S.width = SW;
      S.height = SH;
      sx = S.getContext("2d")!;
      B = document.createElement("canvas");
      B.width = SW;
      B.height = SH;
      bx = B.getContext("2d")!;

      setupDraw(RN);
      return true;
    }

    function setupDraw(RN: number) {
      const K = P.intensity,
        sat = P.saturation,
        spin = P.spin,
        pulses = P.pulses;
      const ANC_C = [36, 178, 255],
        ANC_V = [150, 74, 255];

      const C = (m: number, l: number, a: number) => {
        const e = Math.min(1, Math.max(0, m)),
          s = e * e * (3 - 2 * e);
        let r = ANC_C[0] + (ANC_V[0] - ANC_C[0]) * s,
          g = ANC_C[1] + (ANC_V[1] - ANC_C[1]) * s,
          b = ANC_C[2] + (ANC_V[2] - ANC_C[2]) * s;
        const lum = r * 0.3 + g * 0.55 + b * 0.15,
          k = sat / 100;
        r = lum + (r - lum) * k;
        g = lum + (g - lum) * k;
        b = lum + (b - lum) * k;
        const f = l / 58;
        return `rgba(${Math.min(255, r * f) | 0},${Math.min(255, g * f) | 0},${Math.min(255, b * f) | 0},${Math.max(0, a)})`;
      };
      const mix = (x: number, y: number) =>
        Math.min(
          1,
          Math.max(
            0,
            0.5 + ((x - CX) / (R * 1.1)) * 0.6 + ((y - CY) / (R * 1.8)) * 0.26,
          ),
        );
      const vis = (d: number) => {
        const x = Math.min(1, Math.max(0, d * 0.5 + 0.5));
        return 0.1 + 0.9 * x * x;
      };
      const rot = (p: Vec, ax: number, ay: number, az: number): Vec => {
        let [x, y, z] = p,
          c,
          s;
        c = Math.cos(az);
        s = Math.sin(az);
        const X = x * c - y * s,
          Y = x * s + y * c;
        c = Math.cos(ay);
        s = Math.sin(ay);
        let X2 = X * c + z * s,
          Z = -X * s + z * c;
        c = Math.cos(ax);
        s = Math.sin(ax);
        const Y2 = Y * c - Z * s;
        Z = Y * s + Z * c;
        return [X2, Y2, Z];
      };
      const proj = (p: Vec, sc: number): Vec => {
        const d = 3.7,
          k = d / (d - p[2] * 0.78);
        return [CX + p[0] * sc * k, CY + p[1] * sc * k, p[2]];
      };
      const line = (a: Vec, b: Vec, w: number, al: number, lig: number) => {
        const g = lx.createLinearGradient(a[0], a[1], b[0], b[1]);
        g.addColorStop(0, C(mix(a[0], a[1]), lig, al * vis(a[2])));
        g.addColorStop(1, C(mix(b[0], b[1]), lig, al * vis(b[2])));
        lx.strokeStyle = g;
        lx.lineWidth = w;
        lx.beginPath();
        lx.moveTo(a[0], a[1]);
        lx.lineTo(b[0], b[1]);
        lx.stroke();
      };
      const node = (p: Vec, r: number, al: number) => {
        const g = lx.createRadialGradient(p[0], p[1], 0, p[0], p[1], r);
        g.addColorStop(0, C(mix(p[0], p[1]), 74, al));
        g.addColorStop(0.22, C(mix(p[0], p[1]), 56, al * 0.5));
        g.addColorStop(1, "rgba(0,0,0,0)");
        lx.fillStyle = g;
        lx.beginPath();
        lx.arc(p[0], p[1], r, 0, 6.284);
        lx.fill();
      };

      drawScene = (now, dtScale) => {
        const T = REDUCED ? 0 : (now - t0) / 1000;
        const A1 = [
          0.38 + P.pose * 0.07 + Math.sin(T * 0.07) * 0.06,
          0.62 + P.pose * 0.11 + T * spin,
          -0.24,
        ];
        const A2 = [
          -0.55 + Math.sin(T * 0.05) * 0.05,
          1.42 + P.pose * 0.09 - T * spin * 1.4,
          0.31,
        ];

        lx.setTransform(1, 0, 0, 1, 0, 0);
        lx.globalCompositeOperation = "source-over";
        lx.clearRect(0, 0, W, H);
        lx.globalCompositeOperation = "lighter";
        lx.lineCap = "round";

        const V = G.v.map((p) => proj(rot(p, A1[0], A1[1], A1[2]), R));
        const VI = G.fc.map((p) => proj(rot(p, A2[0], A2[1], A2[2]), R * 0.5));
        const V2 = G.v.map((p) =>
          proj(rot(p, A1[0] + 0.55, A1[1] - 0.7, A1[2] + 0.4), R * 0.8),
        );

        for (let ri = 0; ri < rings.length; ri++) {
          const rg = rings[ri];
          const ray = rg.ay + T * spin * 0.25 * rg.dir;
          const pts = rg.pts.map((p: Vec) =>
            proj(rot(p, rg.ax, ray, rg.az), R),
          );
          for (let i = 1; i < pts.length; i++)
            line(pts[i - 1], pts[i], rg.w, rg.al, 56);
          if (!REDUCED)
            for (let k = 0; k < pulses; k++) {
              const head =
                (((T * 0.14 * rg.dir + k / pulses + ri * 0.31) % 1) + 1) % 1;
              const hi = Math.floor(head * RN),
                TAIL = 38;
              for (let s = 0; s < TAIL; s++) {
                const i0 = (hi - s + RN * 2) % RN,
                  i1 = (i0 + 1) % RN;
                const f = Math.pow(1 - s / TAIL, 2.2);
                line(pts[i0], pts[i1], rg.w + 1.5 * f, 0.85 * f, 72);
              }
              const hp = pts[hi];
              node(hp, 10 + 16 * vis(hp[2]), 0.55 * vis(hp[2]));
            }
        }

        for (const [i, j] of G.e) line(V2[i], V2[j], 0.7, 0.18, 56);
        for (const [i, j] of G.e) line(V[i], V[j], 1.6, 0.68, 54);
        for (const [i, j] of dualEdges) line(VI[i], VI[j], 1.15, 0.46, 58);
        for (const [i, j] of [
          [0, 3],
          [5, 6],
          [9, 10],
        ])
          line(V[i], V[j], 0.95, 0.34, 62);
        const core = [CX, CY, 1];
        for (const p of V) if (p[2] > 0.35) line(core, p, 0.85, 0.22, 58);

        for (let i = 0; i < V.length; i++) {
          const p = V[i],
            pl = 0.82 + 0.18 * Math.sin(T * 1.1 + i * 1.7);
          node(p, (13 + 16 * vis(p[2])) * pl, 0.5 * vis(p[2]) * pl);
        }
        for (const p of VI) node(p, 8 + 8 * vis(p[2]), 0.32 * vis(p[2]));

        for (const pa of edgeParts) {
          if (!REDUCED) {
            pa.t += pa.s * dtScale;
            if (pa.t > 1) pa.t -= 1;
          }
          const [a, b] = G.e[pa.e],
            p = V[a],
            q = V[b];
          const x = p[0] + (q[0] - p[0]) * pa.t,
            y = p[1] + (q[1] - p[1]) * pa.t,
            d = vis((p[2] + q[2]) / 2);
          lx.fillStyle = C(mix(x, y), 64, 0.68 * d);
          lx.beginPath();
          lx.arc(x, y, 1.2 + 1.6 * d, 0, 6.284);
          lx.fill();
        }
        for (const dd of dust) {
          const tw = 0.75 + 0.25 * Math.sin(T * 0.9 + dd.ph);
          lx.fillStyle = C(mix(dd.x, dd.y), 66, dd.a * tw);
          lx.beginPath();
          lx.arc(dd.x, dd.y, dd.r, 0, 6.284);
          lx.fill();
        }
        const cg = lx.createRadialGradient(CX, CY, 0, CX, CY, R * 0.55);
        const cp = 0.88 + 0.12 * Math.sin(T * 0.8);
        cg.addColorStop(0, C(0.55, 58, 0.34 * cp));
        cg.addColorStop(0.4, C(0.7, 48, 0.12 * cp));
        cg.addColorStop(1, "rgba(0,0,0,0)");
        lx.fillStyle = cg;
        lx.beginPath();
        lx.arc(CX, CY, R * 0.55, 0, 6.284);
        lx.fill();

        /* composite — blur on the ¼-res buffer */
        ctx!.setTransform(1, 0, 0, 1, 0, 0);
        ctx!.globalCompositeOperation = "source-over";
        ctx!.filter = "none";
        ctx!.globalAlpha = 1;
        ctx!.fillStyle = "#050506";
        ctx!.fillRect(0, 0, W, H);
        ctx!.globalCompositeOperation = "lighter";

        const haze = (
          x: number,
          y: number,
          r: number,
          m: number,
          a: number,
        ) => {
          const g = ctx!.createRadialGradient(x, y, 0, x, y, r);
          g.addColorStop(0, C(m, 44, a * K));
          g.addColorStop(0.5, C(m, 38, a * K * 0.34));
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.arc(x, y, r, 0, 6.284);
          ctx!.fill();
        };
        haze(CX - R * 0.75, CY - R * 0.55, R * 2.25, 0, 0.3);
        haze(CX + R * 0.85, CY + R * 0.5, R * 2.0, 1, 0.28);

        sx.setTransform(1, 0, 0, 1, 0, 0);
        sx.globalCompositeOperation = "source-over";
        sx.filter = "none";
        sx.globalAlpha = 1;
        sx.clearRect(0, 0, S.width, S.height);
        sx.drawImage(L, 0, 0, S.width, S.height);

        const bloom = (smallBlurPx: number, upAlpha: number) => {
          bx.setTransform(1, 0, 0, 1, 0, 0);
          bx.globalCompositeOperation = "source-over";
          bx.globalAlpha = 1;
          bx.clearRect(0, 0, B.width, B.height);
          bx.filter = "blur(" + smallBlurPx + "px)";
          bx.drawImage(S, 0, 0);
          bx.filter = "none";
          ctx!.globalAlpha = Math.min(1, upAlpha * K);
          ctx!.drawImage(B, 0, 0, W, H);
        };
        bloom(4, 0.85);
        bloom(1.5, 0.55);

        ctx!.filter = "none";
        ctx!.globalAlpha = Math.min(1, 1.05 * K);
        ctx!.drawImage(L, 0, 0);
        ctx!.globalAlpha = 1;
        ctx!.globalCompositeOperation = "source-over";
      };
    }

    /* ---------- loop ---------- */
    function tick(now: number) {
      raf = requestAnimationFrame(tick);
      if (now - lastDraw < FRAME_MS) return;
      const dt = now - lastDraw;
      lastDraw = now;
      drawScene(now, dt / 16.67);
    }
    function start() {
      if (running || REDUCED || !onscreen || !visible || W < 2) return;
      running = true;
      if (!t0) t0 = performance.now();
      lastDraw = 0;
      raf = requestAnimationFrame(tick);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    /* ---------- (re)init ---------- */
    let lastW = 0,
      lastH = 0;
    function resize() {
      const cssW = wrap!.clientWidth,
        cssH = wrap!.clientHeight;
      if (cssW === lastW && cssH === lastH) return;
      lastW = cssW;
      lastH = cssH;
      stop();
      running = false;
      if (!build()) return;
      if (REDUCED) {
        t0 = performance.now();
        drawScene(performance.now(), 0);
      } else {
        if (t0 === 0) t0 = performance.now();
        start();
      }
    }

    const io = new IntersectionObserver(
      (es) => {
        onscreen = es[0].isIntersecting;
        onscreen ? start() : stop();
      },
      { threshold: 0.01 },
    );
    io.observe(wrap);

    const onVis = () => {
      visible = !document.hidden;
      visible ? start() : stop();
    };
    document.addEventListener("visibilitychange", onVis);

    let rz: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(rz);
      rz = setTimeout(resize, 150);
    });
    ro.observe(wrap);

    resize(); // initial build + start

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      clearTimeout(rz);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background: "#050506",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(5,5,6,0.45) 0%, rgba(5,5,6,0) 18%, rgba(5,5,6,0) 68%, rgba(5,5,6,0.9) 96%, #050506 100%)",
        }}
      />
    </div>
  );
}
