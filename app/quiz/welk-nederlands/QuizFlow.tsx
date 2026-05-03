"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { scoreQuiz } from "@/lib/scoring";
import type { Quiz, QuizQuestion } from "@/lib/quiz-types";

interface Props {
  quiz: Quiz;
}

interface Answer {
  questionId: string;
  /** -1 = "Geen idee" — answer is recorded but contributes no tags */
  optionIndex: number;
}

const QUESTIONS_PER_SESSION = 15;
const SKIP_INDEX = -1;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function QuizFlow({ quiz }: Props) {
  const router = useRouter();

  const sessionQuestions = useMemo<QuizQuestion[]>(
    () => shuffle(quiz.questions).slice(0, QUESTIONS_PER_SESSION),
    [quiz.questions],
  );

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [animatingOut, setAnimatingOut] = useState<number | null>(null);
  const [navigating, setNavigating] = useState(false);

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
        navigateToResult(newAnswers);
      }
    }, 320);
  }

  function navigateToResult(finalAnswers: Answer[]) {
    setNavigating(true);
    const result = scoreQuiz(
      { ...quiz, questions: sessionQuestions },
      finalAnswers,
    );

    const params = new URLSearchParams({
      g: String(result.profile.generationStrength),
      r: String(result.profile.regionStrength),
      rg: String(result.profile.registerStrength),
      reg: result.profile.dominantRegion ?? "",
      rs: result.profile.dominantRegister ?? "",
    });

    router.push(`/r/${result.archetype.id}?${params.toString()}`);
  }

  // ─── Navigating ────────────────────────────────────────────────────
  if (navigating) {
    return (
      <div className="text-center py-32">
        <p className="eyebrow text-[var(--ink-soft)]">Resultaat berekenen…</p>
      </div>
    );
  }

  // ─── Quiz ──────────────────────────────────────────────────────────
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

        {/* "Geen idee" — low-friction skip option */}
        <button
          onClick={() => handleSelect(SKIP_INDEX)}
          disabled={animatingOut !== null}
          className={`mt-4 w-full text-center py-3 text-sm transition-all disabled:cursor-not-allowed
            ${
              animatingOut === SKIP_INDEX
                ? "bg-[var(--ink)] text-[var(--paper)] scale-[0.99]"
                : "text-[var(--ink-faint)] hover:text-[var(--stamp)] hover:bg-[var(--paper-light)]"
            }`}
        >
          Geen idee · sla over
        </button>
      </div>
    </div>
  );
}
