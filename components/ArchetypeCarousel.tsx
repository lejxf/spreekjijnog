"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import type { Archetype } from "@/lib/quiz-types";

interface DemoArchetype {
  archetype: Archetype;
  /** Sample percentages that match the archetype's profile, for visual demo */
  demo: { g: number; r: number; rg: number; region: string; register: string };
  essence: string;
}

interface Props {
  archetypes: Archetype[];
}

// Sample percentages per archetype — visualises a realistic taalprofiel
const DEMO_VALUES: Record<
  string,
  Omit<DemoArchetype, "archetype"> & { archetypeId: string }
> = {
  "bourgondische-boekhouder": {
    archetypeId: "bourgondische-boekhouder",
    demo: { g: 42, r: 78, rg: 64, region: "Brabant", register: "Informeel" },
    essence: "Werkt netjes en op tijd, maar gaat los als de rosé op tafel komt.",
  },
  "hagenese-hipster": {
    archetypeId: "hagenese-hipster",
    demo: { g: 68, r: 52, rg: 58, region: "Holland", register: "Informeel" },
    essence: "Mengt formeel en straat alsof dat normaal is. En het is normaal, blijkbaar.",
  },
  "achterhoekse-academicus": {
    archetypeId: "achterhoekse-academicus",
    demo: { g: 32, r: 71, rg: 76, region: "Achterhoek", register: "Formeel" },
    essence: "Leest drie boeken tegelijk en zegt nooit 'doei' maar 'tot ziens'.",
  },
  "belgisch-geinfecteerd": {
    archetypeId: "belgisch-geinfecteerd",
    demo: { g: 55, r: 67, rg: 54, region: "Vlaanderen", register: "Informeel" },
    essence: "Zegt 'goesting' zonder ironie en 'na' aan het einde van zinnen.",
  },
  "amsterdams-modieus": {
    archetypeId: "amsterdams-modieus",
    demo: { g: 88, r: 49, rg: 70, region: "Holland", register: "Straattaal" },
    essence: "Wisselt 'no cap' en 'wallahi' af met 'gewoon eerlijk'. Geen oordeel.",
  },
  "drentse-trompetterik": {
    archetypeId: "drentse-trompetterik",
    demo: { g: 28, r: 82, rg: 68, region: "Drenthe", register: "Dialect" },
    essence: "Zegt weinig, maar wat hij zegt klopt. Heeft een hond die hem aanvoelt.",
  },
  "limburgse-bourgondier": {
    archetypeId: "limburgse-bourgondier",
    demo: { g: 38, r: 84, rg: 72, region: "Limburg", register: "Dialect" },
    essence: "Carnaval is geen optie maar religie. Eet vier maaltijden per dag minimaal.",
  },
  "stadskind-van-niemand": {
    archetypeId: "stadskind-van-niemand",
    demo: { g: 56, r: 38, rg: 42, region: "Holland", register: "Neutraal" },
    essence: "Spreekt het Nederlands van NPO Radio 1. Onmisbaar in elk team.",
  },
};

const CYCLE_MS = 3800;

export default function ArchetypeCarousel({ archetypes }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Order matches DEMO_VALUES keys for predictable order
  const ordered = archetypes.filter((a) => DEMO_VALUES[a.id]);
  const total = ordered.length;

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, CYCLE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, total]);

  const current = ordered[index];
  const demo = DEMO_VALUES[current.id];

  return (
    <section className="my-20 sm:my-24">
      <div className="section-rule eyebrow mb-8">
        <span>Een proeve van de uitkomsten</span>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Stack effect: subtle phantom cards behind */}
        <div
          aria-hidden
          className="absolute inset-x-6 top-3 h-full bg-[var(--paper-light)] border border-[var(--rule-soft)]"
          style={{ transform: "rotate(-0.4deg)" }}
        />
        <div
          aria-hidden
          className="absolute inset-x-3 top-1.5 h-full bg-[var(--paper-light)] border border-[var(--rule-soft)]"
          style={{ transform: "rotate(0.3deg)" }}
        />

        {/* Active card */}
        <Link
          href="/quiz/welk-nederlands"
          className="relative block bg-[var(--paper-light)] border border-[var(--ink)] p-6 sm:p-8 transition-transform hover:-translate-y-0.5"
        >
          <CardContent
            key={current.id}
            archetype={current}
            demo={demo.demo}
            essence={demo.essence}
            indexLabel={String(index + 1).padStart(2, "0")}
            totalLabel={String(total).padStart(2, "0")}
          />
        </Link>
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {ordered.map((arch, i) => (
          <button
            key={arch.id}
            onClick={() => {
              setIndex(i);
              setPaused(true);
              setTimeout(() => setPaused(false), 6000);
            }}
            aria-label={`Toon ${arch.name}`}
            className={`h-1 transition-all ${
              i === index
                ? "w-8 bg-[var(--stamp)]"
                : "w-3 bg-[var(--rule)] hover:bg-[var(--ink-faint)]"
            }`}
          />
        ))}
      </div>

      <p className="text-center mt-3 text-xs text-[var(--ink-faint)]">
        Eén van de acht archetypes · Klik om te beginnen
      </p>
    </section>
  );
}

function CardContent({
  archetype,
  demo,
  essence,
  indexLabel,
  totalLabel,
}: {
  archetype: Archetype;
  demo: DemoArchetype["demo"];
  essence: string;
  indexLabel: string;
  totalLabel: string;
}) {
  const words = archetype.name.split(" ");
  return (
    <div className="card-fade">
      {/* Eyebrow line */}
      <div className="flex items-baseline justify-between mb-4">
        <span className="eyebrow">Archetype</span>
        <span className="eyebrow text-[var(--ink-faint)]">
          <span className="display text-base text-[var(--ink)]">
            {indexLabel}
          </span>
          {" / "}
          {totalLabel}
        </span>
      </div>

      {/* Name */}
      <h3 className="display text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-[1] mb-3">
        {words.map((word, i) => (
          <span
            key={i}
            className={
              i === 1
                ? "display-italic text-[var(--stamp)]"
                : ""
            }
          >
            {word}
            {i < words.length - 1 && " "}
          </span>
        ))}
      </h3>

      {/* Essence */}
      <p className="text-base sm:text-lg text-[var(--ink-soft)] leading-snug mb-6 max-w-prose">
        {essence}
      </p>

      {/* Mini axes */}
      <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-[var(--rule)]">
        <MiniAxis label="Generatie" value={demo.g} />
        <MiniAxis label={demo.region} value={demo.r} />
        <MiniAxis label={demo.register} value={demo.rg} />
      </div>

      <style>{`
        .card-fade {
          animation: cardEnter 0.6s ease-out;
        }
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function MiniAxis({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[0.65rem] uppercase tracking-widest text-[var(--ink-soft)] font-medium">
          {label}
        </span>
        <span className="display text-base text-[var(--stamp)]">{value}%</span>
      </div>
      <div className="relative h-px bg-[var(--rule)]">
        <div
          className="absolute inset-y-[-1px] left-0 bg-[var(--stamp)] transition-[width] duration-700 ease-out"
          style={{ width: `${value}%`, height: "3px" }}
        />
      </div>
    </div>
  );
}
