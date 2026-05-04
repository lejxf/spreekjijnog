"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { scoreQuiz } from "@/lib/scoring";
import type { Quiz, QuizQuestion, QuizOption, Answer } from "@/lib/quiz-types";

/** A question is "visual" when every option has an image. Auto-detected, no flag needed. */
function isVisual(q: QuizQuestion): boolean {
  return q.options.length > 0 && q.options.every((o) => !!o.image);
}

interface Props {
  quiz: Quiz;
}

const VERFIJNING_COUNT = 6;
/** Of the 6 verfijning slots, how many should be visual questions when available. */
const VISUAL_TARGET = 2;
const SKIP_INDEX = -1;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** A question is "lifestyle" (verfijning) if its id is q31_ or higher. */
function isLifestyle(q: QuizQuestion): boolean {
  const m = q.id.match(/^q(\d+)_/);
  if (!m) return false;
  return parseInt(m[1], 10) >= 31;
}

export default function QuizFlow({ quiz }: Props) {
  const router = useRouter();

  // Build session: 1 multi-select woordenset + 6 lifestyle questions
  // (biased toward VISUAL_TARGET visual questions when available)
  const sessionQuestions = useMemo<QuizQuestion[]>(() => {
    const multi = quiz.questions.find((q) => q.type === "multi_select");
    const lifestylePool = quiz.questions.filter((q) => isLifestyle(q));
    const visualPool = lifestylePool.filter(isVisual);
    const textPool = lifestylePool.filter((q) => !isVisual(q));

    const targetVisual = Math.min(VISUAL_TARGET, visualPool.length);
    const pickedVisual = shuffle(visualPool).slice(0, targetVisual);
    const pickedText = shuffle(textPool).slice(
      0,
      VERFIJNING_COUNT - pickedVisual.length,
    );
    const verfijning = shuffle([...pickedVisual, ...pickedText]);

    return multi ? [multi, ...verfijning] : verfijning;
  }, [quiz.questions]);

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [animatingOut, setAnimatingOut] = useState<number | null>(null);
  const [navigating, setNavigating] = useState(false);
  const [multiPicked, setMultiPicked] = useState<number[]>([]);

  const currentIndex = answers.length;
  const totalQuestions = sessionQuestions.length;
  const currentQuestion = sessionQuestions[currentIndex];
  const isMulti = currentQuestion?.type === "multi_select";
  const teaserIndex = 2; // shown right after the multi-select + 1 verfijning

  const teaserArchetype = useMemo(() => {
    if (answers.length < 1) return null;
    return scoreQuiz({ ...quiz, questions: sessionQuestions }, answers).archetype;
  }, [answers, quiz, sessionQuestions]);

  function handleSingleSelect(optionIndex: number) {
    if (animatingOut !== null) return;
    setAnimatingOut(optionIndex);

    setTimeout(() => {
      const newAnswers: Answer[] = [
        ...answers,
        { questionId: currentQuestion.id, selected: [optionIndex] },
      ];
      setAnswers(newAnswers);
      setAnimatingOut(null);

      if (newAnswers.length >= totalQuestions) {
        navigateToResult(newAnswers);
      }
    }, 320);
  }

  function toggleMulti(optionIndex: number) {
    setMultiPicked((prev) =>
      prev.includes(optionIndex)
        ? prev.filter((i) => i !== optionIndex)
        : [...prev, optionIndex],
    );
  }

  function submitMulti() {
    if (animatingOut !== null) return;
    setAnimatingOut(0);
    setTimeout(() => {
      const newAnswers: Answer[] = [
        ...answers,
        { questionId: currentQuestion.id, selected: [...multiPicked] },
      ];
      setAnswers(newAnswers);
      setMultiPicked([]);
      setAnimatingOut(null);

      if (newAnswers.length >= totalQuestions) {
        navigateToResult(newAnswers);
      }
    }, 280);
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

    // Encode top-3 matches as e.g. m=bourgondische-boekhouder:73,drentse-trompetterik:18,stadskind-van-niemand:9
    const matchesParam = result.topMatches
      .map((m) => `${m.archetype.id}:${m.percentage}`)
      .join(",");
    params.set("m", matchesParam);

    router.push(`/r/${result.archetype.id}?${params.toString()}`);
  }

  if (navigating) {
    return (
      <div className="text-center py-32">
        <p className="eyebrow text-[var(--ink-soft)]">Resultaat berekenen…</p>
      </div>
    );
  }

  const progress = (currentIndex / totalQuestions) * 100;
  const showTeaser =
    currentIndex === teaserIndex && teaserArchetype && currentIndex > 0;
  const questionNumber = String(currentIndex + 1).padStart(2, "0");
  const totalNumber = String(totalQuestions).padStart(2, "0");

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 sm:py-12">
      {/* Progress */}
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

      {/* Mid-quiz teaser */}
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

      {/* Question */}
      <div
        className={`transition-opacity duration-300 ${
          animatingOut !== null ? "opacity-0" : "opacity-100"
        }`}
        key={currentQuestion.id}
      >
        <h1 className="display text-3xl sm:text-4xl md:text-5xl mb-3 leading-tight text-[var(--ink)]">
          {currentQuestion.prompt}
        </h1>

        {currentQuestion.subtitle && (
          <p className="text-base text-[var(--ink-soft)] mb-8 leading-relaxed">
            {currentQuestion.subtitle}
          </p>
        )}

        {!currentQuestion.subtitle && <div className="mb-8" />}

        {isMulti ? (
          <MultiSelectGrid
            options={currentQuestion.options.map((o) => o.label)}
            picked={multiPicked}
            onToggle={toggleMulti}
            onSubmit={submitMulti}
            disabled={animatingOut !== null}
          />
        ) : isVisual(currentQuestion) ? (
          <VisualChoiceGrid
            options={currentQuestion.options}
            animatingOut={animatingOut}
            onSelect={handleSingleSelect}
            onSkip={() => handleSingleSelect(SKIP_INDEX)}
          />
        ) : (
          <SingleChoiceList
            options={currentQuestion.options.map((o) => o.label)}
            animatingOut={animatingOut}
            onSelect={handleSingleSelect}
            onSkip={() => handleSingleSelect(SKIP_INDEX)}
          />
        )}
      </div>
    </div>
  );
}

// ─── Multi-select grid ─────────────────────────────────────────────────
function MultiSelectGrid({
  options,
  picked,
  onToggle,
  onSubmit,
  disabled,
}: {
  options: string[];
  picked: number[];
  onToggle: (i: number) => void;
  onSubmit: () => void;
  disabled: boolean;
}) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {options.map((label, i) => {
          const isPicked = picked.includes(i);
          return (
            <button
              key={i}
              onClick={() => onToggle(i)}
              disabled={disabled}
              className={`px-3 py-3 sm:px-4 sm:py-3.5 border text-sm sm:text-base text-left transition-all
                ${
                  isPicked
                    ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                    : "bg-[var(--paper-light)] border-[var(--rule)] text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--paper)]"
                }
                disabled:cursor-not-allowed`}
            >
              <span className="leading-snug">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="sticky bottom-4 sm:static flex items-center justify-between gap-4 pt-4 border-t border-[var(--rule)] bg-[var(--paper)]">
        <span className="text-sm text-[var(--ink-soft)]">
          {picked.length === 0 ? (
            <>Geen idee? Sla over.</>
          ) : (
            <>
              <strong className="text-[var(--ink)]">{picked.length}</strong>{" "}
              {picked.length === 1 ? "woord" : "woorden"} aangevinkt
            </>
          )}
        </span>
        <button
          onClick={onSubmit}
          disabled={disabled}
          className="group inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--paper)] px-6 py-3 text-base font-medium hover:bg-[var(--stamp)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>{picked.length === 0 ? "Sla over" : "Volgende"}</span>
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </>
  );
}

// ─── Single-choice list ────────────────────────────────────────────────
function SingleChoiceList({
  options,
  animatingOut,
  onSelect,
  onSkip,
}: {
  options: string[];
  animatingOut: number | null;
  onSelect: (i: number) => void;
  onSkip: () => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-3">
        {options.map((label, i) => {
          const isSelected = animatingOut === i;
          const letter = String.fromCharCode(65 + i);
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
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
              <span className="text-base sm:text-lg leading-snug">{label}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={onSkip}
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
    </>
  );
}

// ─── Visual choice (2×2 image grid) ────────────────────────────────────
function VisualChoiceGrid({
  options,
  animatingOut,
  onSelect,
  onSkip,
}: {
  options: QuizOption[];
  animatingOut: number | null;
  onSelect: (i: number) => void;
  onSkip: () => void;
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {options.map((opt, i) => {
          const isSelected = animatingOut === i;
          if (!opt.image) return null;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              disabled={animatingOut !== null}
              aria-label={opt.label}
              className={`group relative aspect-square overflow-hidden border-2 transition-all
                ${
                  isSelected
                    ? "border-[var(--ink)] scale-[0.98] ring-2 ring-offset-2 ring-offset-[var(--paper)] ring-[var(--stamp)]"
                    : "border-[var(--rule)] hover:border-[var(--ink)] active:scale-[0.98]"
                }
                disabled:cursor-not-allowed`}
            >
              <Image
                src={opt.image}
                alt={opt.label}
                fill
                sizes="(max-width: 768px) 50vw, 320px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Bottom gradient + caption overlay */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none"
              />
              <span className="absolute bottom-3 left-3 right-3 text-white text-sm sm:text-base font-medium leading-tight drop-shadow-md">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={onSkip}
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
    </>
  );
}
