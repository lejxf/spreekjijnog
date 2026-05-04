"use client";

import { useEffect, useState, useRef } from "react";

interface Character {
  id: string;
  first: string;
  second: string;
  bg: string;
  accent: string;
  hasImage: boolean;
  hasVideo: boolean;
}

const POOL: Character[] = [
  { id: "padel-pa",              first: "Padel",        second: "Pa",          bg: "#1c2440", accent: "#ff7e3a", hasImage: true, hasVideo: true },
  { id: "yoga-mompreneur",       first: "Yoga",         second: "Mompreneur",  bg: "#3a4a3a", accent: "#e8b4a5", hasImage: true, hasVideo: true },
  { id: "bakfietsouder",         first: "Bakfiets",     second: "Ouder",       bg: "#2a3a25", accent: "#d49a3e", hasImage: true, hasVideo: true },
  { id: "insta-goeroe",          first: "Insta",        second: "Goeroe",      bg: "#15101e", accent: "#f4c542", hasImage: true, hasVideo: true },
  { id: "run-club-hardloper",    first: "Run Club",     second: "Hardloper",   bg: "#0d3530", accent: "#bef264", hasImage: true, hasVideo: true },
  { id: "ai-bestie",             first: "AI",           second: "Bestie",      bg: "#0a1830", accent: "#22d3ee", hasImage: true, hasVideo: true },
  { id: "fatbike-tiener",        first: "Fatbike",      second: "Tiener",      bg: "#1a1612", accent: "#fb2c36", hasImage: true, hasVideo: true },
  { id: "skibidi-kid",           first: "Skibidi",      second: "Kid",         bg: "#1a0d2e", accent: "#a855f7", hasImage: true, hasVideo: true },
  { id: "grwm-girlie",           first: "GRWM",         second: "Girlie",      bg: "#3d0a2d", accent: "#ff66c4", hasImage: true, hasVideo: true },
  { id: "amsterdams-modieus",    first: "Amsterdams",   second: "Modieus",     bg: "#180818", accent: "#ff3d8a", hasImage: true, hasVideo: true },
  { id: "boomer-op-marktplaats", first: "Boomer",       second: "Marktplaats", bg: "#3d1815", accent: "#e8c882", hasImage: true, hasVideo: true },
  { id: "tinder-veteraan",       first: "Tinder",       second: "Veteraan",    bg: "#3a0e2a", accent: "#f3c896", hasImage: true, hasVideo: true },
  { id: "kringloop-koningin",    first: "Kringloop",    second: "Koningin",    bg: "#2c1632", accent: "#d68aaa", hasImage: true, hasVideo: true },
];

const PANEL_COUNT = 6;
// Same on mobile + desktop; performance handled via stagger + Ken Burns + viewport pause
const VIDEO_SLOTS = 3;
/** How often a single panel swaps its character. With one swap per tick, the full hero feels alive but never busy. */
const CYCLE_MS = 2200;
const FADE_MS = 500;
const STAGGER_PER_PANEL_MS = 250;

function pickIndexes(count: number, total: number, avoid: number[] = []): number[] {
  const indices = Array.from({ length: total }, (_, i) => i);
  indices.sort(() => Math.random() - 0.5);
  const fresh = indices.filter((i) => !avoid.includes(i));
  const reused = indices.filter((i) => avoid.includes(i));
  return [...fresh, ...reused].slice(0, count);
}

function pickVideoSlots(count: number): Set<number> {
  const slots = Array.from({ length: PANEL_COUNT }, (_, i) => i)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
  return new Set(slots);
}

/** Pick a new POOL index for a single panel — must differ from current panel value AND from other active panels. */
function pickReplacementIndex(currentIndexes: number[], panelToSwap: number): number {
  const used = new Set(currentIndexes);
  const available = POOL.map((_, i) => i).filter((i) => !used.has(i));
  if (available.length > 0) {
    return available[Math.floor(Math.random() * available.length)];
  }
  // Fallback: pool smaller than panel count — pick any index different from the current one.
  const others = POOL.map((_, i) => i).filter(
    (i) => i !== currentIndexes[panelToSwap],
  );
  return others[Math.floor(Math.random() * others.length)];
}

export default function HeroBanner() {
  const [activeIndexes, setActiveIndexes] = useState<number[]>(() =>
    pickIndexes(PANEL_COUNT, POOL.length),
  );
  const [videoSlots, setVideoSlots] = useState<Set<number>>(() =>
    pickVideoSlots(VIDEO_SLOTS),
  );
  /** Index of the panel currently mid-swap (fading), or null when nothing is fading. */
  const [fadingPanel, setFadingPanel] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  /** Which panel index swaps next — increments 0,1,2,3,4,5,0,1,... so the cycle is sequential not random. */
  const nextPanelRef = useRef<number>(0);

  // Detect accessibility prefs
  useEffect(() => {
    const reduceMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(reduceMql.matches);
    const onChange = () => setReducedMotion(reduceMql.matches);
    reduceMql.addEventListener("change", onChange);
    return () => reduceMql.removeEventListener("change", onChange);
  }, []);

  // Pause cycling + videos when banner is offscreen — biggest mobile win
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setBannerVisible(entry.isIntersecting));
      },
      { threshold: 0.1 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !bannerVisible) return;
    const interval = setInterval(() => {
      // Sequential rotation: panel 0 -> 1 -> 2 -> ... -> 5 -> 0 -> ...
      // The character that rotates IN is still randomly picked from the unused pool, so
      // each panel swap brings a fresh face but the cycling rhythm stays predictable.
      const panelToSwap = nextPanelRef.current;
      nextPanelRef.current = (nextPanelRef.current + 1) % PANEL_COUNT;
      setFadingPanel(panelToSwap);

      setTimeout(() => {
        setActiveIndexes((prev) => {
          const next = [...prev];
          next[panelToSwap] = pickReplacementIndex(prev, panelToSwap);
          return next;
        });
        // 1-in-3 chance the swap also reshuffles which panels run video vs. still.
        // Keeps the video/still mix occasionally varied without re-decoding all 3 every tick.
        if (Math.random() < 0.33) {
          setVideoSlots(pickVideoSlots(VIDEO_SLOTS));
        }
        setFadingPanel(null);
      }, FADE_MS);
    }, CYCLE_MS);

    return () => clearInterval(interval);
  }, [reducedMotion, bannerVisible]);

  return (
    <section
      ref={sectionRef}
      className="hero-banner relative w-full overflow-hidden bg-[var(--paper)]"
    >
      <div className="grid grid-cols-3 sm:grid-cols-6 grid-rows-2 sm:grid-rows-1 h-full">
        {activeIndexes.map((idx, panelIdx) => {
          const c = POOL[idx];
          // Only run video when the character actually has a video file — others fall back to Ken Burns still.
          const playing =
            !reducedMotion && bannerVisible && videoSlots.has(panelIdx) && c.hasVideo;
          const isFading = fadingPanel === panelIdx;
          return (
            <Panel
              key={`${panelIdx}-${c.id}`}
              character={c}
              fading={isFading}
              playing={playing}
              kenBurnsDirection={panelIdx % 2 === 0 ? "in" : "out"}
              delayMs={panelIdx * STAGGER_PER_PANEL_MS}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      <div className="absolute top-0 inset-x-0 px-6 sm:px-10 pt-6 flex justify-between items-baseline z-10 text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] font-medium text-white/60 pointer-events-none">
        <span>SpreekJijNog · Nº 01</span>
        <span className="hidden sm:inline">25 archetypes · Mei 2026</span>{/* full quiz pool — hero rotates 13 trending */}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none">
        <h1
          className="display text-white"
          style={{
            fontSize: "clamp(36px, 6vw, 84px)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            textShadow: "0 4px 30px rgba(0,0,0,0.6)",
          }}
        >
          Welk Nederlands<br />
          spreek jij{" "}
          <span className="display-italic" style={{ color: "#f5a623" }}>
            eigenlijk
          </span>
          ?
        </h1>
        <p
          className="text-white/85 mt-4 text-sm sm:text-base"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
        >
          Vijftien woorden. Twee minuten. Eén archetype.
        </p>
      </div>

      <style>{`
        .hero-banner {
          height: clamp(420px, 60vh, 620px);
          aspect-ratio: auto;
        }
        @media (min-width: 640px) {
          .hero-banner {
            height: clamp(380px, 48vw, 520px);
          }
        }

        /* Ken Burns: subtle slow zoom/pan animation. Cheap GPU compositor effect — no decode cost. */
        @keyframes kenBurnsIn {
          from { transform: scale(1.06) translate(-1%, -1%); }
          to   { transform: scale(1.14) translate(2%, 2%); }
        }
        @keyframes kenBurnsOut {
          from { transform: scale(1.14) translate(2%, -1%); }
          to   { transform: scale(1.06) translate(-1%, 2%); }
        }
        .ken-in  { animation: kenBurnsIn  9s ease-in-out infinite alternate; }
        .ken-out { animation: kenBurnsOut 11s ease-in-out infinite alternate; }

        @media (prefers-reduced-motion: reduce) {
          .ken-in, .ken-out { animation: none; }
        }
      `}</style>
    </section>
  );
}

function Panel({
  character,
  fading,
  playing,
  kenBurnsDirection,
  delayMs,
}: {
  character: Character;
  fading: boolean;
  playing: boolean;
  kenBurnsDirection: "in" | "out";
  delayMs: number;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!playing) return;
    const v = videoRef.current;
    if (!v) return;
    const timer = setTimeout(() => {
      v.play().catch(() => {});
    }, delayMs);
    return () => clearTimeout(timer);
  }, [playing, delayMs]);

  const posterSrc = character.hasImage
    ? `/images/${character.id}.jpg`
    : undefined;
  const kenClass = kenBurnsDirection === "in" ? "ken-in" : "ken-out";

  return (
    <div
      className="relative overflow-hidden border-r border-b border-white/10 last:border-r-0"
      style={{
        background: character.bg,
        transition: `opacity ${FADE_MS}ms ease`,
        opacity: fading ? 0 : 1,
      }}
    >
      <div
        aria-hidden
        className="absolute -top-12 -right-12 w-40 h-40 rotate-45 opacity-15 pointer-events-none"
        style={{ background: character.accent }}
      />

      {playing ? (
        <video
          ref={videoRef}
          src={`/video/${character.id}.mp4`}
          poster={posterSrc}
          loop
          muted
          playsInline
          preload="metadata"
          // @ts-expect-error — non-standard attribute
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(1.05) contrast(1.02)" }}
        />
      ) : posterSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterSrc}
          alt=""
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover ${kenClass}`}
          style={{
            filter: "saturate(1.05) contrast(1.02)",
            willChange: "transform",
          }}
        />
      ) : null}

      <div className="absolute inset-x-0 bottom-0 z-10 p-2 sm:p-3 text-center">
        <div
          className="display text-white leading-[1.0]"
          style={{
            fontSize: "clamp(11px, 1.2vw, 18px)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 8px rgba(0,0,0,0.7)",
          }}
        >
          {character.first}{" "}
          <span
            className="display-italic block sm:inline"
            style={{ color: character.accent }}
          >
            {character.second}
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"
      />
    </div>
  );
}
