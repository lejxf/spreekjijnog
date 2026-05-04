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
const CYCLE_MS = 3000;
/** Crossfade duration — long enough that the eye can read the blend, short enough to keep momentum. */
const FADE_MS = 900;
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
      // Each Panel handles its own crossfade internally when its character prop changes.
      const panelToSwap = nextPanelRef.current;
      nextPanelRef.current = (nextPanelRef.current + 1) % PANEL_COUNT;
      setActiveIndexes((prev) => {
        const next = [...prev];
        next[panelToSwap] = pickReplacementIndex(prev, panelToSwap);
        return next;
      });
      // Occasionally reshuffle which panels run video vs. still so the mix stays varied.
      if (Math.random() < 0.25) {
        setVideoSlots(pickVideoSlots(VIDEO_SLOTS));
      }
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
          return (
            <Panel
              key={panelIdx}
              character={c}
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

/**
 * Panel renders one tile of the hero. When its `character` prop changes, the new character
 * is mounted as a stacked layer ON TOP of the old one, fading in from opacity 0 → 1 over
 * FADE_MS. The old layer stays visible underneath at full opacity, so the user never sees
 * a blank panel — the new image grows in over the old one for a smooth crossfade. After
 * the fade completes, the old layer is unmounted.
 */
interface Layer {
  character: Character;
  /** Stable identity for React key — increments per character change. */
  layerId: number;
}

function Panel({
  character,
  playing,
  kenBurnsDirection,
  delayMs,
}: {
  character: Character;
  playing: boolean;
  kenBurnsDirection: "in" | "out";
  delayMs: number;
}) {
  const layerIdRef = useRef<number>(0);
  const [layers, setLayers] = useState<Layer[]>(() => [
    { character, layerId: 0 },
  ]);

  // Push a new layer on top when the character changes, then schedule cleanup.
  useEffect(() => {
    setLayers((prev) => {
      const top = prev[prev.length - 1];
      if (top.character.id === character.id) return prev;
      layerIdRef.current += 1;
      return [...prev, { character, layerId: layerIdRef.current }];
    });
  }, [character]);

  // Drop old layers after the crossfade completes — keep only the topmost.
  useEffect(() => {
    if (layers.length <= 1) return;
    const t = window.setTimeout(() => {
      setLayers((prev) => prev.slice(-1));
    }, FADE_MS + 80);
    return () => window.clearTimeout(t);
  }, [layers.length]);

  const top = layers[layers.length - 1];

  return (
    <div
      className="relative overflow-hidden border-r border-b border-white/10 last:border-r-0"
      style={{
        background: top.character.bg,
        transition: `background ${FADE_MS}ms ease`,
      }}
    >
      <div
        aria-hidden
        className="absolute -top-12 -right-12 w-40 h-40 rotate-45 opacity-15 pointer-events-none transition-colors duration-700"
        style={{ background: top.character.accent }}
      />

      {layers.map((layer, i) => {
        const isTop = i === layers.length - 1;
        const isBaseInitial = layers.length === 1;
        return (
          <CharacterLayer
            key={layer.layerId}
            character={layer.character}
            // Only the top layer plays video. Lower layers stay as their poster image.
            playing={isTop && playing && layer.character.hasVideo}
            kenBurnsDirection={kenBurnsDirection}
            delayMs={delayMs}
            // Initial mount renders at full opacity; new layers fade in.
            fadeIn={isTop && !isBaseInitial}
          />
        );
      })}

      <div className="absolute inset-x-0 bottom-0 z-10 p-2 sm:p-3 text-center">
        <div
          className="display text-white leading-[1.0] transition-colors duration-700"
          style={{
            fontSize: "clamp(11px, 1.2vw, 18px)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 8px rgba(0,0,0,0.7)",
          }}
        >
          {top.character.first}{" "}
          <span
            className="display-italic block sm:inline transition-colors duration-700"
            style={{ color: top.character.accent }}
          >
            {top.character.second}
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none z-10"
      />
    </div>
  );
}

/**
 * One stacked content layer: video (if playing) or still image with Ken Burns.
 * `fadeIn=true` starts at opacity 0 and transitions to 1 — used for newly-pushed
 * top layers. `fadeIn=false` keeps full opacity — used for initial mount and for
 * older layers sitting underneath.
 */
function CharacterLayer({
  character,
  playing,
  kenBurnsDirection,
  delayMs,
  fadeIn,
}: {
  character: Character;
  playing: boolean;
  kenBurnsDirection: "in" | "out";
  delayMs: number;
  fadeIn: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [opacity, setOpacity] = useState<number>(fadeIn ? 0 : 1);

  // Trigger the fade-in on the next frame so the browser commits opacity:0 first,
  // then transitions to 1 — without this, React batches both updates and there's no fade.
  useEffect(() => {
    if (!fadeIn) return;
    const t = window.setTimeout(() => setOpacity(1), 20);
    return () => window.clearTimeout(t);
  }, [fadeIn]);

  useEffect(() => {
    if (!playing) return;
    const v = videoRef.current;
    if (!v) return;
    const timer = window.setTimeout(() => {
      v.play().catch(() => {});
    }, delayMs);
    return () => window.clearTimeout(timer);
  }, [playing, delayMs]);

  const posterSrc = character.hasImage
    ? `/images/${character.id}.jpg`
    : undefined;
  const kenClass = kenBurnsDirection === "in" ? "ken-in" : "ken-out";

  return (
    <div
      className="absolute inset-0"
      style={{
        opacity,
        transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        willChange: "opacity",
      }}
    >
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
    </div>
  );
}
