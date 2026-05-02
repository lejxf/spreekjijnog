import Link from "next/link";
import quizData from "@/content/quizzes/welk-nederlands.json";
import type { Quiz } from "@/lib/quiz-types";
import ArchetypeCarousel from "@/components/ArchetypeCarousel";

const quiz = quizData as Quiz;

export default function Home() {
  return (
    <div className="px-6 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Issue marker — newspaper-style */}
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-[var(--rule)]">
          <span className="eyebrow">Nº 01 · De Taal-Editie</span>
          <span className="eyebrow">Mei 2026</span>
        </div>

        {/* Hero */}
        <div className="fade-up" style={{ animationDelay: "0.05s" }}>
          <h1 className="display text-5xl sm:text-7xl md:text-8xl text-[var(--ink)] mb-8">
            Welk Nederlands
            <br />
            spreek jij{" "}
            <span className="display display-italic text-[var(--stamp)]">
              eigenlijk
            </span>
            ?
          </h1>
        </div>

        <div
          className="fade-up max-w-xl mb-12"
          style={{ animationDelay: "0.2s" }}
        >
          <p className="text-lg sm:text-xl leading-relaxed text-[var(--ink-soft)]">
            Vijftien woorden. Drie minuten. Aan het eind krijg je een eerlijk
            taal-profiel terug — op generatie, regio en register — plus een
            archetype dat je waarschijnlijk wilt screenshotten.
          </p>
        </div>

        {/* CTA + meta */}
        <div className="fade-up" style={{ animationDelay: "0.35s" }}>
          <Link
            href="/quiz/welk-nederlands"
            className="group inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--paper)] px-7 py-4 text-base font-medium hover:bg-[var(--stamp)] transition-colors"
          >
            <span>Begin de quiz</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--ink-faint)]">
            <span>· Geen account</span>
            <span>· Geen e‑mail</span>
            <span>· Geen cookies</span>
            <span>· Wel taal</span>
          </div>
        </div>

        {/* Archetype carousel — visual trailer */}
        <div className="fade-up" style={{ animationDelay: "0.5s" }}>
          <ArchetypeCarousel archetypes={quiz.archetypes} />
        </div>

        {/* Editorial — what's it about */}
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-12 pt-12 border-t border-[var(--rule)]">
          <Pillar
            number="I"
            title="Generatie"
            text="Spreek je nog 1985-Nederlands of ben je al lang een TikTok-zoomer? We meten het uit jouw woordkeuzes."
          />
          <Pillar
            number="II"
            title="Regio"
            text="Brabants, Limburgs, Belgisch geïnfecteerd of toch puur Hagenees? De kaart van Nederland zit in jouw uitspraak."
          />
          <Pillar
            number="III"
            title="Register"
            text="Formele kantoor-Nederlands, ontspannen kantine-toon of straat-mengtaal? Eén zinnetje verraadt al wat."
          />
        </div>

        {/* Editorial pull quote */}
        <div className="mt-20 mb-8">
          <div className="section-rule eyebrow mb-6">
            <span>Een korte introductie</span>
          </div>
          <p className="display text-2xl sm:text-3xl leading-snug text-[var(--ink)] max-w-2xl">
            Iedereen denkt dat hij gewoon{" "}
            <span className="display-italic text-[var(--stamp)]">Nederlands</span>{" "}
            spreekt. Tot blijkt dat een Brabander helemaal niet hetzelfde
            Nederlands spreekt als een Drent. Of als je dochter.
          </p>
        </div>

        {/* Second CTA at the bottom */}
        <div className="mt-12 pt-12 border-t border-[var(--rule)] text-center">
          <p className="eyebrow mb-4 text-[var(--ink-soft)]">Klaar voor je profiel?</p>
          <Link
            href="/quiz/welk-nederlands"
            className="group inline-flex items-center gap-3 bg-[var(--stamp)] text-[var(--paper)] px-8 py-4 text-base font-medium hover:bg-[var(--stamp-deep)] transition-colors"
          >
            <span>Doe de quiz</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Pillar({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <div className="display display-italic text-3xl text-[var(--stamp)] mb-2">
        {number}
      </div>
      <div className="eyebrow mb-2">{title}</div>
      <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{text}</p>
    </div>
  );
}
