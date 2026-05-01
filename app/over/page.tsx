import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over SpreekJijNog",
  description:
    "Wat is SpreekJijNog, wie maakte het en waarom. Een redactionele publicatie over Nederlands taalgebruik.",
};

export default function OverPage() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-16 prose prose-stone">
      <h1 className="text-3xl font-semibold mb-6">Over SpreekJijNog</h1>
      <p className="text-[var(--muted)] leading-relaxed mb-4">
        SpreekJijNog is een redactionele site over Nederlands taalgebruik
        anno nu. We meten, met zachte hand, hoe jouw Nederlands zich
        verhoudt tot wat er in de rest van het land en in andere generaties
        gesproken wordt.
      </p>
      <p className="text-[var(--muted)] leading-relaxed mb-4">
        We baseren onze quizzes op publiek beschikbare bronnen — onder andere
        het Meertens Instituut, het Instituut voor de Nederlandse Taal,
        Onze Taal en de Etymologiebank. Die instellingen bedanken we voor
        hun open onderzoek.
      </p>
      <p className="text-[var(--muted)] leading-relaxed">
        Vragen of aanvullingen? Mail ons op{" "}
        <a
          className="text-[var(--accent)] underline"
          href="mailto:redactie@spreekjijnog.nl"
        >
          redactie@spreekjijnog.nl
        </a>
        .
      </p>
    </article>
  );
}
