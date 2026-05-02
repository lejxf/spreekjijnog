import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Wat we wel en niet bewaren over jou op SpreekJijNog.",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-12">
      <div className="section-rule eyebrow mb-8">
        <span>De kleine letters</span>
      </div>
      <h1 className="display text-4xl sm:text-5xl mb-8 leading-tight">Privacy</h1>
      <div className="space-y-5 text-[var(--ink-soft)] leading-relaxed text-lg">
        <p>
          SpreekJijNog vraagt geen account, geen e‑mailadres en plaatst geen
          cookies. Je antwoorden worden anoniem opgeslagen om je een deelbaar
          resultaat te geven; ze zijn niet aan jouw persoon gekoppeld.
        </p>
        <h2 className="display text-2xl text-[var(--ink)] pt-4">Wat we meten</h2>
        <p>
          We gebruiken Plausible, een Europese, cookieloze analytics‑dienst.
          Geen IP‑adressen worden bewaard, geen profielen aangemaakt. Je
          bezoek is voor ons een geaggregeerd cijfer.
        </p>
        <h2 className="display text-2xl text-[var(--ink)] pt-4">Verwijdering</h2>
        <p>
          Heb je je quizresultaat‑URL en wil je deze laten verwijderen? Stuur
          de link naar{" "}
          <a className="editorial-link" href="mailto:redactie@spreekjijnog.nl">
            redactie@spreekjijnog.nl
          </a>{" "}
          en we halen 'm offline.
        </p>
      </div>
    </article>
  );
}
