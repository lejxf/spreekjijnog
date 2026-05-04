import Link from "next/link";
import quizData from "@/content/quizzes/welk-nederlands.json";
import type { Quiz } from "@/lib/quiz-types";
import ArchetypeCarousel from "@/components/ArchetypeCarousel";
import HeroBanner from "@/components/HeroBanner";

const quiz = quizData as Quiz;

export default function Home() {
  return (
    <>
      {/* Full-bleed cycling video hero */}
      <HeroBanner />

      <div className="px-6 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          {/* CTA + description */}
          <div className="fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <Link
                href="/quiz/welk-nederlands"
                className="group inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--paper)] px-7 py-4 text-base font-medium hover:bg-[var(--stamp)] transition-colors"
              >
                <span>Begin de quiz</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--ink-faint)]">
                <span>Geen account</span>
                <span>·</span>
                <span>Geen e‑mail</span>
                <span>·</span>
                <span>Geen cookies</span>
              </div>
            </div>

            <p className="text-lg sm:text-xl leading-relaxed text-[var(--ink-soft)] max-w-2xl">
              Aan het eind krijg je een eerlijk taal-profiel terug — op
              generatie, regio, toon en lifestyle — plus een archetype dat je
              waarschijnlijk wilt screenshotten.
            </p>
          </div>

          {/* Archetype carousel — visual trailer */}
          <div className="fade-up" style={{ animationDelay: "0.3s" }}>
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
              title="Toon"
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
              <span className="display-italic text-[var(--stamp)]">
                Nederlands
              </span>{" "}
              spreekt. Tot blijkt dat een Brabander helemaal niet hetzelfde
              Nederlands spreekt als een Drent. Of als je dochter.
            </p>
          </div>

          {/* Second CTA at the bottom */}
          <div className="mt-12 pt-12 border-t border-[var(--rule)] text-center">
            <p className="eyebrow mb-4 text-[var(--ink-soft)]">
              Klaar voor je profiel?
            </p>
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
    </>
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
