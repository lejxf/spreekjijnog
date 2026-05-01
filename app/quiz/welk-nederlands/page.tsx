import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welk Nederlands spreek jij?",
  description:
    "Vijftien woorden, drie minuten, één archetype. Op generatie, regio en register.",
};

// Placeholder voor MVP — quiz logica komt in fase 2 van het stappenplan.
export default function QuizPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm uppercase tracking-widest text-[var(--muted)] mb-4">
        Quiz · placeholder
      </p>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
        Welk Nederlands spreek jij?
      </h1>
      <p className="text-[var(--muted)] max-w-md mb-8">
        Hier komt de quiz-flow. Volgende stap volgens het stappenplan:
        woordendatabase opbouwen en quizflow bouwen.
      </p>
      <a
        href="/"
        className="text-[var(--accent)] underline hover:no-underline"
      >
        Terug naar de homepage
      </a>
    </div>
  );
}
