"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import type { Archetype } from "@/lib/quiz-types";

interface DemoValues {
  g: number;
  r: number;
  rg: number;
  region: string;
  register: string;
  essence: string;
}

interface Props {
  archetypes: Archetype[];
}

const DEMO_VALUES: Record<string, DemoValues> = {
  "bourgondische-boekhouder": {
    g: 42, r: 78, rg: 64, region: "Brabant", register: "Informeel",
    essence: "Werkt netjes en op tijd, maar gaat los als de rosé op tafel komt.",
  },
  "hagenese-hipster": {
    g: 68, r: 52, rg: 58, region: "Holland", register: "Informeel",
    essence: "Mengt formeel en straat alsof dat normaal is. En het is normaal, blijkbaar.",
  },
  "achterhoekse-academicus": {
    g: 32, r: 71, rg: 76, region: "Achterhoek", register: "Formeel",
    essence: "Leest drie boeken tegelijk en zegt nooit 'doei' maar 'tot ziens'.",
  },
  "belgisch-geinfecteerd": {
    g: 55, r: 67, rg: 54, region: "Vlaanderen", register: "Informeel",
    essence: "Zegt 'goesting' zonder ironie en 'na' aan het einde van zinnen.",
  },
  "amsterdams-modieus": {
    g: 88, r: 49, rg: 70, region: "Holland", register: "Straattaal",
    essence: "Wisselt 'no cap' en 'wallahi' af met 'gewoon eerlijk'. Geen oordeel.",
  },
  "drentse-trompetterik": {
    g: 28, r: 82, rg: 68, region: "Drenthe", register: "Dialect",
    essence: "Zegt weinig, maar wat hij zegt klopt. Heeft een hond die hem aanvoelt.",
  },
  "limburgse-bourgondier": {
    g: 38, r: 84, rg: 72, region: "Limburg", register: "Dialect",
    essence: "Carnaval is geen optie maar religie. Eet vier maaltijden per dag minimaal.",
  },
  "stadskind-van-niemand": {
    g: 56, r: 38, rg: 42, region: "Holland", register: "Neutraal",
    essence: "Spreekt het Nederlands van NPO Radio 1. Onmisbaar in elk team.",
  },
  "padel-pa": {
    g: 58, r: 56, rg: 70, region: "Holland", register: "Sport",
    essence: "Drie keer per week padel. WhatsApp-groep heet 'De Boys 🎾'. Witte Tesla op de oprit.",
  },
  "yoga-mompreneur": {
    g: 62, r: 51, rg: 68, region: "Bussum", register: "Wellness",
    essence: "Coach-bedrijfje met _wellbeing in de naam. Zegt 'ik leef vanuit mijn waarden'.",
  },
  "bakfietsouder": {
    g: 75, r: 58, rg: 62, region: "Amsterdam", register: "Bewust",
    essence: "Stintje voor de school-run, biologische marshmallows, zoon heet Tobias.",
  },
  "boomer-op-marktplaats": {
    g: 18, r: 48, rg: 60, region: "Holland", register: "Vintage",
    essence: "Jaarkaart NS, fietst dagelijks naar de bakker, weet alle benzineprijzen.",
  },
  "kringloop-koningin": {
    g: 70, r: 47, rg: 64, region: "Hollands", register: "Vintage",
    essence: "Vintage Marlboro denim, 50m² benedenwoning vol stuff, alles is een verhaal.",
  },
  "friese-stille": {
    g: 45, r: 88, rg: 76, region: "Friesland", register: "Dialect",
    essence: "Antwoordt met één woord, fietst tegen de wind in tot Workum, zegt 'krek' dagelijks.",
  },
  "rotterdamse-sjef": {
    g: 60, r: 73, rg: 68, region: "Rotterdam", register: "No-nonsense",
    essence: "Witte Nike Air Force, patatje met op de markt, accepteert geen gezeik.",
  },
  "tinder-veteraan": {
    g: 72, r: 44, rg: 58, region: "Amsterdam", register: "Single",
    essence: "Drie jaar swipen, ironisch maar net niet, boekhandel-date als second move.",
  },
  "run-club-hardloper": {
    g: 70, r: 56, rg: 78, region: "Holland", register: "Sport",
    essence: "Garmin aan, Strava open, halve marathon op het programma. WhatsApp 'De Boys 🏃'.",
  },
  "ai-bestie": {
    g: 65, r: 51, rg: 72, region: "Holland", register: "Online",
    essence: "ChatGPT op plek 1 in het dock. Spreekt 'promptje' zonder twijfel. LinkedIn over AI-workflow.",
  },
  "insta-goeroe": {
    g: 68, r: 49, rg: 80, region: "Amsterdam", register: "Online",
    essence: "Verkoopt cursus '12 weken naar financiële vrijheid'. Bali rooftop pool. 'Mindset' 3× per dag.",
  },
  "fatbike-tiener": {
    g: 92, r: 68, rg: 84, region: "Holland", register: "Straat",
    essence: "Apollo Phantom, helm in de hand, 'broedie schiet door'. Vrijdag-avond door de winkelstraat met de boys.",
  },
  "skibidi-kid": {
    g: 96, r: 52, rg: 78, region: "Holland", register: "Straat",
    essence: "'Skibidi sigma Ohio' aan tafel. Roblox 4u per dag. iPad-fed sinds peuter. Vraagt 'wat is jouw rizz score?'",
  },
  "grwm-girlie": {
    g: 82, r: 56, rg: 72, region: "Amsterdam", register: "Online",
    essence: "Get Ready With Me elke ochtend voor 8000 followers. Iced matcha bij Pancakes Amsterdam. 'Liiiteralllyy ✨'.",
  },
  "sober-curious": {
    g: 64, r: 49, rg: 71, region: "Holland", register: "Wellness",
    essence: "Drinkt sinds 2024 niks meer. Mocktail-fanatic. 'Ik voel me écht beter sinds ik gestopt ben.'",
  },
  "festival-veteraan": {
    g: 60, r: 52, rg: 68, region: "Holland", register: "Cultureel",
    essence: "Was Lowlands-fanatic, nu met Tobias in de bakfietsbuggy naar Mysteryland. Alpine Earplugs in pastel.",
  },
  "crossfit-boomer": {
    g: 22, r: 51, rg: 76, region: "Holland", register: "Sport",
    essence: "55+ in betere vorm dan z'n kinderen. Whey shake, PR's elke maand, Joe Rogan in de auto.",
  },
};

const CYCLE_MS = 3800;

export default function ArchetypeCarousel({ archetypes }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
  const colors = current.colors;

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
        {/* Phantom stack behind */}
        <div
          aria-hidden
          className="absolute inset-x-6 top-3 h-full opacity-50"
          style={{
            background: colors.bg,
            transform: "rotate(-0.6deg)",
            filter: "saturate(0.7)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-3 top-1.5 h-full opacity-75"
          style={{
            background: colors.bg,
            transform: "rotate(0.4deg)",
            filter: "saturate(0.85)",
          }}
        />

        {/* Active card */}
        <Link
          href="/quiz/welk-nederlands"
          className="relative block overflow-hidden transition-transform hover:-translate-y-0.5"
          style={{
            background: colors.bg,
            color: colors.text,
            transition: "background 0.6s ease, color 0.6s ease",
          }}
        >
          {/* Decorative accent stripe */}
          <div
            aria-hidden
            className="absolute -top-20 -right-24 w-64 h-64 opacity-20 rotate-45"
            style={{ background: colors.accent }}
          />

          <div className="relative p-6 sm:p-8 md:p-10">
            <CardContent
              key={current.id}
              archetype={current}
              demo={demo}
              colors={colors}
              indexLabel={String(index + 1).padStart(2, "0")}
              totalLabel={String(total).padStart(2, "0")}
            />
          </div>
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
              i === index ? "w-8" : "w-3 hover:opacity-80"
            }`}
            style={{
              background: i === index ? arch.colors.bg : "var(--rule)",
            }}
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
  colors,
  indexLabel,
  totalLabel,
}: {
  archetype: Archetype;
  demo: DemoValues;
  colors: Archetype["colors"];
  indexLabel: string;
  totalLabel: string;
}) {
  const words = archetype.name.split(" ");
  return (
    <div className="card-fade">
      {/* Eyebrow line */}
      <div className="flex items-baseline justify-between mb-5">
        <span
          className="text-xs uppercase font-medium"
          style={{ letterSpacing: "0.2em", color: colors.accent }}
        >
          Archetype
        </span>
        <span
          className="text-xs uppercase font-medium opacity-60"
          style={{ letterSpacing: "0.2em" }}
        >
          <span className="display text-base opacity-100">{indexLabel}</span>
          {" / "}
          {totalLabel}
        </span>
      </div>

      {/* Name */}
      <h3 className="display text-3xl sm:text-5xl md:text-6xl leading-[0.95] mb-4">
        {words.map((word, i) => (
          <span
            key={i}
            className={i === 1 ? "display-italic" : ""}
            style={i === 1 ? { color: colors.accent } : undefined}
          >
            {word}
            {i < words.length - 1 && " "}
          </span>
        ))}
      </h3>

      {/* Essence */}
      <p
        className="text-base sm:text-lg leading-snug mb-6 max-w-prose"
        style={{ opacity: 0.75 }}
      >
        {demo.essence}
      </p>

      {/* Mini axes */}
      <div
        className="grid grid-cols-3 gap-4 sm:gap-6 pt-5 border-t"
        style={{ borderColor: `${colors.accent}40` }}
      >
        <MiniStat label="Generatie" value={demo.g} colors={colors} />
        <MiniStat label={demo.region} value={demo.r} colors={colors} />
        <MiniStat label={demo.register} value={demo.rg} colors={colors} />
      </div>

      <style>{`
        .card-fade {
          animation: cardEnter 0.7s ease-out;
        }
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function MiniStat({
  label,
  value,
  colors,
}: {
  label: string;
  value: number;
  colors: Archetype["colors"];
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span
          className="text-[0.6rem] sm:text-[0.65rem] uppercase font-medium opacity-60"
          style={{ letterSpacing: "0.18em" }}
        >
          {label}
        </span>
        <span
          className="display text-lg sm:text-xl"
          style={{ color: colors.accent }}
        >
          {value}%
        </span>
      </div>
      <div
        className="relative h-px"
        style={{ background: `${colors.accent}30` }}
      >
        <div
          className="absolute inset-y-[-1px] left-0 transition-[width] duration-700 ease-out"
          style={{
            width: `${value}%`,
            height: "3px",
            background: colors.accent,
          }}
        />
      </div>
    </div>
  );
}
