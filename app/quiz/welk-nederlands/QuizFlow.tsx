"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { scoreQuiz } from "@/lib/scoring";
import type { Quiz, QuizQuestion, QuizResult } from "@/lib/quiz-types";

interface Props {
  quiz: Quiz;
}

interface Answer {
  questionId: string;
  optionIndex: number;
}

const QUESTIONS_PER_SESSION = 15;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

type Stage = "quiz" | "name-capture" | "navigating";

export default function QuizFlow({ quiz }: Props) {
  const router = useRouter();

  const sessionQuestions = useMemo<QuizQuestion[]>(
    () => shuffle(quiz.questions).slice(0, QUESTIONS_PER_SESSION),
    [quiz.questions],
  );

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [animatingOut, setAnimatingOut] = useState<number | null>(null);
  const [stage, setStage] = useState<Stage>("quiz");
  const [name, setName] = useState("");
  const [pendingResult, setPendingResult] = useState<QuizResult | null>(null);

  const currentIndex = answers.length;
  const totalQuestions = sessionQuestions.length;
  const currentQuestion = sessionQuestions[currentIndex];
  const teaserIndex = Math.floor(totalQuestions / 2);

  const teaserArchetype = useMemo(() => {
    if (answers.length < 5) return null;
    return scoreQuiz({ ...quiz, questions: sessionQuestions }, answers).archetype;
  }, [answers, quiz, sessionQuestions]);

  function handleSelect(optionIndex: number) {
    if (animatingOut !== null) return;
    setAnimatingOut(optionIndex);

    setTimeout(() => {
      const newAnswers = [
        ...answers,
        { questionId: currentQuestion.id, optionIndex },
      ];
      setAnswers(newAnswers);
      setAnimatingOut(null);

      if (newAnswers.length >= totalQuestions) {
        const result = scoreQuiz(
          { ...quiz, questions: sessionQuestions },
          newAnswers,
        );
        setPendingResult(result);
        setStage("name-capture");
      }
    }, 320);
  }

  function navigateToResult(includeName: boolean) {
    if (!pendingResult) return;
    setStage("navigating");

    const params = new URLSearchParams({
      g: String(pendingResult.profile.generationStrength),
      r: String(pendingResult.profile.regionStrength),
      rg: String(pendingResult.profile.registerStrength),
      reg: pendingResult.profile.dominantRegion ?? "",
      rs: pendingResult.profile.dominantRegister ?? "",
    });

    const trimmedName = name.trim().slice(0, 40);
    if (includeName && trimmedName) {
      params.set("n", trimmedName);
    }

    router.push(`/r/${pendingResult.archetype.id}?${params.toString()}`);
  }

  // ─── Stage: name capture ───────────────────────────────────────────
  if (stage === "name-capture" && pendingResult) {
    return (
      <div className="max-w-xl mx-auto px-6 py-12 sm:py-20">
        <div className="fade-up">
          <div className="section-rule eyebrow mb-8">
            <span>Bijna klaar</span>
          </div>

          <h1 className="display text-3xl sm:text-5xl leading-tight mb-4">
            Hoe heet jij{" "}
            <span className="display-italic text-[var(--stamp)]">eigenlijk</span>?
          </h1>
          <p className="text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed mb-8">
            Vul je voornaam in en die komt op je deelkaart te staan. Optioneel
            — niets wordt opgeslagen.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigateToResult(true);
            }}
            className="space-y-4"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bijvoorbeeld: Lisa"
              autoFocus
              maxLength={40}
              className="w-full px-5 py-4 text-lg bg-[var(--paper-light)] border border-[var(--rule)] focus:border-[var(--ink)] focus:outline-none transition-colors"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={!name.trim()}
                className="group inline-flex items-center justify-center gap-3 bg-[var(--ink)] text-[var(--paper)] px-7 py-4 text-base font-medium hover:bg-[var(--stamp)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Toon mijn resultaat</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
              <button
                type="button"
                onClick={() => navigateToResult(false)}
                className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] underline-offset-4 hover:underline self-center sm:self-auto px-3"
              >
                Sla over
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ─── Stage: navigating ─────────────────────────────────────────────
  if (stage === "navigating") {
    return (
      <div className="text-center py-32">
        <p className="eyebrow text-[var(--ink-soft)]">Resultaat berekenen…</p>
      </div>
    );
  }

  // ─── Stage: quiz ───────────────────────────────────────────────────
  const progress = (currentIndex / totalQuestions) * 100;
  const showTeaser = currentIndex === teaserIndex && teaserArchetype;
  const questionNumber = String(currentIndex + 1).padStart(2, "0");
  const totalNumber = String(totalQuestions).padStart(2, "0");

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 sm:py-12">
      <div className="mb-12">
        <div className="flex justify-between items-baseline mb-3">
          <div className="eyebrow flex items-baseline gap-1">
            <span className="display text-base text-[var(--ink)]">
              {questionNumber}
            </span>
            <span className="text-[var(--ink-faint)]">/ {totalNumber}</span>
          </div>
          <span className="eyebrow text-[var(--ink-faint)]">
            Welk Nederlands
          </span>
        </div>
        <div className="h-px bg-[var(--rule)] relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[var(--stamp)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {showTeaser && teaserArchetype && (
        <div className="mb-10 fade-up">
          <div className="section-rule eyebrow mb-4">
            <span>Tussenstand</span>
          </div>
          <p className="text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
            Je neigt richting{" "}
            <strong className="display display-italic text-[var(--stamp)] text-xl">
              {teaserArchetype.name}
            </strong>
            . Nog {totalQuestions - currentIndex} vragen om te bevestigen of om
            te draaien.
          </p>
        </div>
      )}

      <div
        className={`transition-opacity duration-300 ${
          animatingOut !== null ? "opacity-0" : "opacity-100"
        }`}
        key={currentQuestion.id}
      >
        <h1 className="display text-3xl sm:text-4xl md:text-5xl mb-10 leading-tight text-[var(--ink)]">
          {currentQuestion.prompt}
        </h1>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, i) => {
            const isSelected = animatingOut === i;
            const letter = String.fromCharCode(65 + i);
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={animatingOut !== null}
                className={`group text-left px-5 py-4 sm:px-6 sm:py-5 border transition-all flex items-baseline gap-4
                  ${
                    isSelected
                      ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] scale-[0.99]"
                      : "bg-[var(--paper-light)] border-[var(--rule)] hover:border-[var(--ink)] hover:bg-[var(--paper)] active:scale-[0.99]"
                  }
                  disabled:cursor-not-allowed`}
              >
                <span
                  className={`eyebrow flex-shrink-0 ${
                    isSelected
                      ? "text-[var(--paper)]/60"
                      : "text-[var(--ink-faint)] group-hover:text-[var(--stamp)]"
                  }`}
                >
                  {letter}
                </span>
                <span className="text-base sm:text-lg leading-snug">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
