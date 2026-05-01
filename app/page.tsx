import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full text-center">
        <p className="text-sm uppercase tracking-widest text-[var(--muted)] mb-4">
          SpreekJijNog
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight mb-6 text-[var(--foreground)]">
          Welk Nederlands spreek jij eigenlijk?
        </h1>
        <p className="text-lg text-[var(--muted)] mb-10 leading-relaxed">
          Vijftien woorden. Drie minuten. Je krijgt een eerlijk profiel terug
          op generatie, regio en register — plus een archetype dat je
          waarschijnlijk wilt screenshotten.
        </p>

        <Link
          href="/quiz/welk-nederlands"
          className="inline-block bg-[var(--accent)] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#9d4d34] transition-colors active:scale-[0.98]"
        >
          Begin de quiz →
        </Link>

        <p className="text-xs text-[var(--muted)] mt-8">
          Geen account, geen e-mail, geen cookies. Alleen taal.
        </p>
      </div>
    </div>
  );
}
