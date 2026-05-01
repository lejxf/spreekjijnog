import type { Metadata } from "next";
import quizData from "@/content/quizzes/welk-nederlands.json";
import type { Quiz } from "@/lib/quiz-types";
import QuizFlow from "./QuizFlow";

export const metadata: Metadata = {
  title: "Welk Nederlands spreek jij?",
  description:
    "Dertig woorden, drie minuten, één archetype. Op generatie, regio en register.",
};

export default function QuizPage() {
  const quiz = quizData as Quiz;
  return <QuizFlow quiz={quiz} />;
}
