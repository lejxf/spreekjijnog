import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over",
  description:
    "Wat is SpreekJijNog. Een redactionele publicatie over Nederlands taalgebruik anno nu.",
};

export default function OverPage() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-12">
      <div className="section-rule eyebrow mb-8">
        <span>Colofon</span>
      </div>
      <h1 className="display text-4xl sm:text-5xl mb-8 leading-tight">
        Over <span className="display-italic text-[var(--stamp)]">SpreekJijNog</span>
      </h1>
      <div className="space-y-5 text-[var(--ink-soft)] leading-relaxed text-lg">
        <p>
          SpreekJijNog is een redactionele site over Nederlands taalgebruik
          anno nu. We meten, met zachte hand, hoe jouw Nederlands zich
          verhoudt tot wat er in de rest van het land en in andere generaties
          gesproken wordt.
        </p>
        <p>
          We baseren onze quizzes op publiek beschikbare bronnen — onder andere
          het Meertens Instituut, het Instituut voor de Nederlandse Taal,
          Onze Taal en de Etymologiebank. Die instellingen bedanken we voor
          hun open onderzoek.
        </p>
        <p>
          Vragen, aanvullingen of een spreekwoord dat we vergeten zijn? Mail{" "}
          <a
            className="editorial-link"
            href="mailto:redactie@spreekjijnog.nl"
          >
            redactie@spreekjijnog.nl
          </a>
          .
        </p>
      </div>
    </article>
  );
}
