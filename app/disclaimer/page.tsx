import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "SpreekJijNog is voor de gein, geen wetenschappelijke test.",
};

export default function DisclaimerPage() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-16 prose prose-stone">
      <h1 className="text-3xl font-semibold mb-6">Disclaimer</h1>
      <p className="text-[var(--muted)] leading-relaxed mb-4">
        SpreekJijNog is voor de gein. Onze quizzes zijn geen
        wetenschappelijke testen en pretenderen geen taalkundige autoriteit.
        Onze archetypes zijn met liefde geschreven maar passen nooit
        precies — dat is geen bug, dat is taal.
      </p>
      <p className="text-[var(--muted)] leading-relaxed">
        Inhoudelijke onjuistheden gespot? Mail ons op{" "}
        <a
          className="text-[var(--accent)] underline"
          href="mailto:redactie@spreekjijnog.nl"
        >
          redactie@spreekjijnog.nl
        </a>{" "}
        en we passen het aan.
      </p>
    </article>
  );
}
