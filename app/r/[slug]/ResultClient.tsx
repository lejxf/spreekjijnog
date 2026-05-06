"use client";

import Image from "next/image";
import { useState } from "react";
import type { Archetype, Register } from "@/lib/quiz-types";
import {
  formatRegion,
  formatRegister,
  generationSummary,
  regionSummary,
  registerSummary,
  type AxisSummary,
} from "@/lib/scoring";
import ShareButtons from "./ShareButtons";
import TagFriend from "./TagFriend";

interface ResolvedMatch {
  archetype: Archetype;
  percentage: number;
}

interface Props {
  archetype: Archetype;
  slug: string;
  initialName: string | null;
  scores: {
    g: number;
    r: number;
    rg: number;
    region: string | null;
    register: Register | null;
  };
  searchParams: Record<string, string | undefined>;
  topMatches: ResolvedMatch[];
}

function sanitizeName(raw: string): string {
  return raw
    .trim()
    .slice(0, 40)
    .replace(/[^\p{L}\s'\-]/gu, "")
    .trim();
}

export default function ResultClient({
  archetype,
  slug,
  initialName,
  scores,
  searchParams,
  topMatches,
}: Props) {
  const colors = archetype.colors;
  const [name, setName] = useState<string | null>(initialName);
  const [draftName, setDraftName] = useState("");
  const [showInput, setShowInput] = useState(initialName === null);

  const { g, r, rg, region, register } = scores;
  const nameWords = archetype.name.split(" ");

  function applyName(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = sanitizeName(draftName);
    if (!cleaned) return;
    setName(cleaned);
    setShowInput(false);
    // Update URL so share buttons + OG generation use the name
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("n", cleaned);
      window.history.replaceState({}, "", url.toString());
    }
  }

  function clearName() {
    setName(null);
    setShowInput(true);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("n");
      window.history.replaceState({}, "", url.toString());
    }
  }

  // Build searchParams object for ShareButtons (with current name)
  const sharedSearchParams: Record<string, string | undefined> = {
    ...searchParams,
    n: name ?? undefined,
  };

  return (
    <>
      {/* Full-bleed hero in archetype color */}
      <section
        className="relative overflow-hidden -mt-4"
        style={{ background: colors.bg, color: colors.text }}
      >
        <div
          aria-hidden
          className="absolute -top-32 -right-40 w-96 h-96 opacity-15 rotate-45"
          style={{ background: colors.accent }}
        />

        <div className="relative max-w-5xl mx-auto px-6 py-12 sm:py-20">
          <div
            className="flex items-center justify-between mb-10 pb-4 border-b"
            style={{ borderColor: `${colors.accent}40` }}
          >
            <span
              className="text-xs uppercase font-medium"
              style={{ letterSpacing: "0.2em", color: colors.accent }}
            >
              SpreekJijNog · Uitkomst
            </span>
            <span
              className="text-xs uppercase font-medium opacity-70"
              style={{ letterSpacing: "0.2em" }}
            >
              15 vragen
            </span>
          </div>

          {/* Main hero block: image (when available) + name/description side-by-side on desktop */}
          <div
            className={`${
              archetype.image
                ? "grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8 sm:gap-12 items-center mb-12"
                : "max-w-3xl mb-12"
            }`}
          >
            {archetype.image && (
              <div
                className="relative aspect-[9/14] w-full max-w-sm mx-auto md:max-w-none stamp-in"
                style={{ animationDelay: "0.05s" }}
              >
                {/* Archetype color glow behind image */}
                <div
                  aria-hidden
                  className="absolute -inset-2 blur-2xl opacity-40 rounded-lg"
                  style={{ background: colors.accent }}
                />
                {/* Inner ring */}
                <div
                  aria-hidden
                  className="absolute -inset-1 rounded-sm"
                  style={{ background: `${colors.accent}30` }}
                />
                {/* Video loop when available, otherwise the still image. The image always
                    renders behind the video as a poster so the panel never flashes blank. */}
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={archetype.image}
                    alt={archetype.name}
                    fill
                    sizes="(max-width: 768px) 90vw, 480px"
                    priority
                    className="object-cover"
                  />
                  {archetype.video && (
                    <video
                      src={archetype.video}
                      poster={archetype.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {/* Subtle bottom gradient for depth */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none z-10"
                    style={{
                      background: `linear-gradient(to top, ${colors.bg}cc, transparent)`,
                    }}
                  />
                </div>
              </div>
            )}

            <div className="min-w-0">
              <p
                className="eyebrow mb-3 stamp-in"
                style={{ animationDelay: "0.15s", color: colors.accent }}
              >
                {name ? `${name} is een` : "Ik ben een"}
              </p>

              <h1
                className={`display mb-6 leading-[0.95] stamp-in ${
                  archetype.image
                    ? "text-4xl sm:text-5xl md:text-6xl"
                    : "text-5xl sm:text-7xl md:text-8xl mb-8"
                }`}
                style={{ animationDelay: "0.25s" }}
              >
                {nameWords.map((word, i) => (
                  <span
                    key={i}
                    className={i === 1 ? "display-italic" : ""}
                    style={i === 1 ? { color: colors.accent } : undefined}
                  >
                    {word}
                    {i < nameWords.length - 1 && " "}
                  </span>
                ))}
              </h1>

              <p
                className="text-base sm:text-lg leading-relaxed fade-up"
                style={{ animationDelay: "0.45s", opacity: 0.8 }}
              >
                {archetype.description}
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t fade-up"
            style={{
              animationDelay: "0.55s",
              borderColor: `${colors.accent}40`,
            }}
          >
            <AxisCard
              eyebrow="Generatie"
              summary={generationSummary(g)}
              accent={colors.accent}
              text={colors.text}
            />
            <AxisCard
              eyebrow="Regio"
              summary={regionSummary(region, r)}
              accent={colors.accent}
              text={colors.text}
            />
            <AxisCard
              eyebrow="Toon"
              summary={registerSummary(register, rg)}
              accent={colors.accent}
              text={colors.text}
            />
          </div>
        </div>
      </section>

      {/* Composite breakdown: top 3 archetypes */}
      {topMatches.length > 1 && (
        <section className="max-w-3xl mx-auto px-6 pt-12">
          <div className="section-rule eyebrow mb-6">
            <span>Jouw mix</span>
          </div>
          <p className="text-sm text-[var(--ink-soft)] mb-5 max-w-xl">
            Niemand past honderd procent in één hokje. Hier is jouw blend.
          </p>
          <ul className="space-y-3">
            {topMatches.map((match, i) => (
              <li
                key={match.archetype.id}
                className="flex items-baseline gap-4 sm:gap-6 group"
              >
                <span
                  className="display text-2xl sm:text-3xl tabular-nums w-16 sm:w-20 text-right"
                  style={{ color: match.archetype.colors.accent }}
                >
                  {match.percentage}%
                </span>
                <div
                  className="flex-1 h-px relative"
                  style={{ background: "var(--rule)" }}
                >
                  <div
                    className="absolute inset-y-[-2px] left-0 transition-[width] duration-700 ease-out"
                    style={{
                      width: `${Math.min(100, match.percentage)}%`,
                      height: "5px",
                      background: match.archetype.colors.accent,
                    }}
                  />
                </div>
                <span
                  className={`display text-base sm:text-lg w-44 sm:w-56 text-left ${
                    i === 0 ? "text-[var(--ink)]" : "text-[var(--ink-soft)]"
                  }`}
                >
                  {match.archetype.name}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Cream paper section: name + share */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        {/* Name capture / display */}
        {showInput ? (
          <div
            className="mb-10 p-6 sm:p-7 border border-[var(--rule)] bg-[var(--paper-light)]"
          >
            <div className="section-rule eyebrow mb-4">
              <span>Voor je deelkaart</span>
            </div>
            <p className="text-base text-[var(--ink-soft)] mb-4 leading-relaxed">
              Wil je je naam op de deelkaart? Dan staat er straks{" "}
              <em className="display display-italic">
                &ldquo;[Naam] is een {archetype.name}&rdquo;
              </em>
              . Optioneel — niets wordt opgeslagen.
            </p>
            <form
              onSubmit={applyName}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="Bijvoorbeeld: Lisa"
                maxLength={40}
                className="flex-1 px-4 py-3 text-base bg-[var(--paper)] border border-[var(--rule)] focus:border-[var(--ink)] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!draftName.trim()}
                className="bg-[var(--ink)] text-[var(--paper)] px-6 py-3 text-sm font-medium hover:bg-[var(--stamp)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Voeg toe
              </button>
            </form>
          </div>
        ) : (
          <div className="mb-8 flex items-center justify-between text-sm text-[var(--ink-soft)]">
            <span>
              Naam op je deelkaart:{" "}
              <strong className="text-[var(--ink)]">{name}</strong>
            </span>
            <button
              onClick={clearName}
              className="text-xs text-[var(--ink-faint)] hover:text-[var(--stamp)] underline-offset-4 hover:underline"
            >
              Aanpassen
            </button>
          </div>
        )}

        <div className="section-rule eyebrow mb-6">
          <span>Stuur door</span>
        </div>
        <ShareButtons
          archetype={archetype}
          slug={slug}
          searchParams={sharedSearchParams}
        />

        <TagFriend archetype={archetype} />

        <div className="text-center mt-16 pt-8 border-t border-[var(--rule)]">
          <a href="/quiz/welk-nederlands" className="editorial-link text-sm">
            Probeer het nog een keer →
          </a>
        </div>
      </section>
    </>
  );
}

function AxisCard({
  eyebrow,
  summary,
  accent,
  text,
}: {
  eyebrow: string;
  summary: AxisSummary;
  accent: string;
  text: string;
}) {
  return (
    <div className="flex flex-col">
      <span
        className="text-[0.65rem] sm:text-xs uppercase font-medium mb-3"
        style={{ letterSpacing: "0.2em", color: accent, opacity: 0.85 }}
      >
        {eyebrow}
      </span>
      <span
        className="display text-2xl sm:text-3xl leading-tight mb-2"
        style={{ color: text, letterSpacing: "-0.01em" }}
      >
        {summary.label}
      </span>
      <span
        className="text-xs sm:text-sm italic mb-3"
        style={{
          color: text,
          opacity: 0.55,
          fontFamily: "var(--font-fraunces)",
        }}
      >
        {summary.detail}
      </span>
      <span
        className="text-xs sm:text-sm leading-snug"
        style={{ color: text, opacity: 0.7 }}
      >
        {summary.comparison}
      </span>
    </div>
  );
}
