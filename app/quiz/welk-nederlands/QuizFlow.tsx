"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { scoreQuiz } from "@/lib/scoring";
import type { Quiz } from "@/lib/quiz-types";

interface Props {
  quiz: Quiz;
}

interface Answer {
  questionId: string;
  optionIndex: number;
}

export default function QuizFlow({ quiz }: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [animatingOut, setAnimatingOut] = useState<number | null>(null);
  const currentIndex = answers.length;
  const totalQuestions = quiz.questions.length;
  const isComplete = currentIndex >= totalQuestions;
  const currentQuestion = quiz.questions[currentIndex];
  const teaserIndex = Math.floor(totalQuestions / 2);

  // Compute mid-quiz teaser archetype on the fly
  const teaserArchetype = useMemo(() => {
    if (answers.length < 5) return null;
    return scoreQuiz(quiz, answers).archetype;
  }, [answers, quiz]);

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
        // Complete: compute result and navigate
        const result = scoreQuiz(quiz, newAnswers);
        const params = new URLSearchParams({
          g: String(result.profile.generationStrength),
          r: String(result.profile.regionStrength),
          rg: String(result.profile.registerStrength),
          reg: result.profile.dominantRegion ?? "",
          rs: result.profile.dominantRegister ?? "",
        });
        router.push(`/r/${result.archetype.id}?${params.toString()}`);
      }
    }, 350);
  }

  if (isComplete) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-[var(--muted)]">Resultaat berekenen...</p>
      </div>
    );
  }

  const progress = ((currentIndex + (animatingOut !== null ? 1 : 0)) / totalQuestions) * 100;
  const showTeaser = currentIndex === teaserIndex && teaserArchetype;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 sm:py-16">
      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex justify-between text-xs text-[var(--muted)] mb-2 uppercase tracking-wider">
          <span>Vraag {currentIndex + 1} van {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mid-quiz teaser */}
      {showTeaser && teaserArchetype && (
        <div className="mb-8 p-4 bg-[var(--accent-soft)] rounded-xl text-center text-sm">
          <span className="text-[var(--muted)]">Tot nu toe neig je naar </span>
          <strong className="text-[var(--foreground)]">{teaserArchetype.name}</strong>
          <span className="text-[var(--muted)]">. Nog {totalQuestions - currentIndex} vragen.</span>
        </div>
      )}

      {/* Question */}
      <div
        className={`transition-opacity duration-300 ${
          animatingOut !== null ? "opacity-0" : "opacity-100"
        }`}
        key={currentQuestion.id}
      >
        <h1 className="text-2xl sm:text-3xl font-semibold mb-8 leading-snug">
          {currentQuestion.prompt}
        </h1>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, i) => {
            const isSelected = animatingOut === i;
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={animatingOut !== null}
                className={`
                  text-left px-5 py-4 rounded-xl border-2 transition-all
                  ${
                    isSelected
                      ? "bg-[var(--accent)] text-white border-[var(--accent)] scale-[0.98]"
                      : "bg-[var(--card)] border-[var(--border)] hover:border-[var(--accent)] active:scale-[0.98]"
                  }
                  disabled:cursor-not-allowed
                `}
              >
                <span className="text-base sm:text-lg leading-snug">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
