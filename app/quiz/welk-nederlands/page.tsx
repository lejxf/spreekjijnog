import type { Metadata } from "next";
import quizData from "@/content/quizzes/welk-nederlands.json";
import type { Quiz } from "@/lib/quiz-types";
import { jsonLd, quizSchema } from "@/lib/structured-data";
import QuizFlow from "./QuizFlow";

const quiz = quizData as Quiz;

export const metadata: Metadata = {
  title: "Welk Nederlands spreek jij?",
  description:
    "Vijftien woorden, drie minuten, één archetype. Een redactionele taal-quiz die je classificeert op generatie, regio en register.",
  alternates: {
    canonical: "/quiz/welk-nederlands",
  },
  openGraph: {
    title: "Welk Nederlands spreek jij?",
    description:
      "Vijftien woorden, drie minuten, één archetype. Op generatie, regio en register.",
    url: "/quiz/welk-nederlands",
    type: "website",
  },
};

export default function QuizPage() {
  // Quiz pool: 1 multi-select woordenset (~15 words) + 6 verfijning lifestyle vragen + 28 archetypes.
  // questionCount reflects the user experience: 7 screens.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          quizSchema({
            questionCount: 7,
            archetypeCount: quiz.archetypes.length,
          }),
        )}
      />
      <QuizFlow quiz={quiz} />
    </>
  );
}
