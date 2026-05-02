import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "SpreekJijNog is voor de gein, geen wetenschappelijke test.",
};

export default function DisclaimerPage() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-12">
      <div className="section-rule eyebrow mb-8">
        <span>Voor de duidelijkheid</span>
      </div>
      <h1 className="display text-4xl sm:text-5xl mb-8 leading-tight">
        <span className="display-italic text-[var(--stamp)]">Disclaimer</span>
      </h1>
      <div className="space-y-5 text-[var(--ink-soft)] leading-relaxed text-lg">
        <p>
          SpreekJijNog is voor de gein. Onze quizzes zijn geen
          wetenschappelijke testen en pretenderen geen taalkundige autoriteit.
          Onze archetypes zijn met liefde geschreven maar passen nooit
          precies — dat is geen bug, dat is taal.
        </p>
        <p>
          Inhoudelijke onjuistheden gespot? Mail{" "}
          <a className="editorial-link" href="mailto:redactie@spreekjijnog.nl">
            redactie@spreekjijnog.nl
          </a>{" "}
          en we passen het aan.
        </p>
      </div>
    </article>
  );
}
