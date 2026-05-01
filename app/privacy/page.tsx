import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Wat we wel en niet bewaren over jou op SpreekJijNog.",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-16 prose prose-stone">
      <h1 className="text-3xl font-semibold mb-6">Privacy</h1>
      <p className="text-[var(--muted)] leading-relaxed mb-4">
        SpreekJijNog vraagt geen account, geen e-mailadres en plaatst geen
        cookies. Je antwoorden worden anoniem opgeslagen om je een
        deelbaar resultaat te geven; ze zijn niet aan jouw persoon
        gekoppeld.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-3">Wat we meten</h2>
      <p className="text-[var(--muted)] leading-relaxed mb-4">
        We gebruiken Plausible, een Europese, cookieloze analytics-dienst.
        Geen IP-adressen worden bewaard, geen profielen aangemaakt. Je
        bezoek is voor ons een geaggregeerd cijfer.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-3">Verwijdering</h2>
      <p className="text-[var(--muted)] leading-relaxed mb-4">
        Heb je je quizresultaat-URL en wil je deze laten verwijderen? Stuur
        de link naar{" "}
        <a
          className="text-[var(--accent)] underline"
          href="mailto:redactie@spreekjijnog.nl"
        >
          redactie@spreekjijnog.nl
        </a>{" "}
        en we halen 'm offline.
      </p>
    </article>
  );
}
