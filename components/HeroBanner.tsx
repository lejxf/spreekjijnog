"use client";

import { useEffect, useState, useRef } from "react";

interface Character {
  id: string;
  first: string;
  second: string;
  bg: string;
  accent: string;
  hasImage: boolean;
}

// Trending + semi-trending pool for the hero banner
const POOL: Character[] = [
  // Trending
  { id: "padel-pa",          first: "Padel",         second: "Pa",          bg: "#1c2440", accent: "#ff7e3a", hasImage: true  },
  { id: "yoga-mompreneur",   first: "Yoga",          second: "Mompreneur",  bg: "#3a4a3a", accent: "#e8b4a5", hasImage: false },
  { id: "bakfietsouder",     first: "Bakfiets",      second: "Ouder",       bg: "#2a3a25", accent: "#d49a3e", hasImage: true  },
  { id: "insta-goeroe",      first: "Insta",         second: "Goeroe",      bg: "#15101e", accent: "#f4c542", hasImage: true  },
  { id: "run-club-hardloper",first: "Run Club",      second: "Hardloper",   bg: "#0d3530", accent: "#bef264", hasImage: true  },
  { id: "ai-bestie",         first: "AI",            second: "Bestie",      bg: "#0a1830", accent: "#22d3ee", hasImage: true  },
  { id: "fatbike-tiener",    first: "Fatbike",       second: "Tiener",      bg: "#1a1612", accent: "#fb2c36", hasImage: true  },
  { id: "skibidi-kid",       first: "Skibidi",       second: "Kid",         bg: "#1a0d2e", accent: "#a855f7", hasImage: true  },
  { id: "grwm-girlie",       first: "GRWM",          second: "Girlie",      bg: "#3d0a2d", accent: "#ff66c4", hasImage: true  },
  // Semi-trending
  { id: "amsterdams-modieus",first: "Amsterdams",    second: "Modieus",     bg: "#180818", accent: "#ff3d8a", hasImage: true  },
  { id: "boomer-op-marktplaats", first: "Boomer",    second: "Marktplaats", bg: "#3d1815", accent: "#e8c882", hasImage: true  },
  { id: "tinder-veteraan",   first: "Tinder",        second: "Veteraan",    bg: "#3a0e2a", accent: "#f3c896", hasImage: true  },
  { id: "kringloop-koningin",first: "Kringloop",     second: "Koningin",    bg: "#2c1632", accent: "#d68aaa", hasImage: true  },
];

const PANEL_COUNT_DESKTOP = 6;
const PANEL_COUNT_MOBILE = 6; // also 6 (3x2 grid on mobile)
const CYCLE_MS = 5500;
const FADE_MS = 500;

/** Pick N random unique indexes from pool, optionally avoiding overlap with previous set. */
function pickIndexes(count: number, total: number, avoid: number[] = []): number[] {
  const indices = Array.from({ length: total }, (_, i) => i);
  // Bias against indexes that were just shown
  indices.sort(() => Math.random() - 0.5);
  const fresh = indices.filter((i) => !avoid.includes(i));
  const reused = indices.filter((i) => avoid.includes(i));
  return [...fresh, ...reused].slice(0, count);
}

export default function HeroBanner() {
  const [activeIndexes, setActiveIndexes] = useState<number[]>(() =>
    pickIndexes(PANEL_COUNT_DESKTOP, POOL.length),
  );
  const [fading, setFading] = useState(false);
  const tickRef = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActiveIndexes((prev) =>
          pickIndexes(PANEL_COUNT_DESKTOP, POOL.length, prev),
        );
        setFading(false);
        tickRef.current += 1;
      }, FADE_MS);
    }, CYCLE_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-banner relative w-full overflow-hidden bg-[var(--paper)]">
      <div className="grid grid-cols-3 sm:grid-cols-6 grid-rows-2 sm:grid-rows-1 h-full">
        {activeIndexes.map((idx, panelIdx) => {
          const c = POOL[idx];
          return (
            <Panel
              key={`${panelIdx}-${c.id}-${tickRef.current}`}
              character={c}
              fading={fading}
            />
          );
        })}
      </div>

      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 px-6 sm:px-10 pt-6 flex justify-between items-baseline z-10 text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] font-medium text-white/60 pointer-events-none">
        <span>SpreekJijNog · Nº 01</span>
        <span className="hidden sm:inline">22 archetypes · Mei 2026</span>
      </div>

      {/* Centered headline */}
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
          <span
            className="display-italic"
            style={{ color: "#f5a623" }}
          >
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
      `}</style>
    </section>
  );
}

function Panel({
  character,
  fading,
}: {
  character: Character;
  fading: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden border-r border-b border-white/10 last:border-r-0"
      style={{
        background: character.bg,
        transition: `opacity ${FADE_MS}ms ease`,
        opacity: fading ? 0 : 1,
      }}
    >
      {/* Accent diagonal */}
      <div
        aria-hidden
        className="absolute -top-12 -right-12 w-40 h-40 rotate-45 opacity-15 pointer-events-none"
        style={{ background: character.accent }}
      />

      {/* Video */}
      <video
        src={`/video/${character.id}.mp4`}
        poster={character.hasImage ? `/images/${character.id}.jpg` : undefined}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(1.05) contrast(1.02)" }}
      />

      {/* Bottom name label */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-2 sm:p-3 text-center">
        <div className="display text-white leading-[1.0]" style={{
          fontSize: "clamp(11px, 1.2vw, 18px)",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          textShadow: "0 2px 8px rgba(0,0,0,0.7)",
        }}>
          {character.first}{" "}
          <span className="display-italic block sm:inline" style={{ color: character.accent }}>
            {character.second}
          </span>
        </div>
      </div>

      {/* Subtle bottom gradient for label legibility */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"
      />
    </div>
  );
}
