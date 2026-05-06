import type { MetadataRoute } from "next";
import quizData from "@/content/quizzes/welk-nederlands.json";
import type { Quiz } from "@/lib/quiz-types";

const SITE_URL = "https://spreekjijnog.nl";
const quiz = quizData as Quiz;

/**
 * Sitemap auto-includes:
 *  - Homepage (highest priority, daily frequency for the live carousel)
 *  - Quiz entry page (high priority — the single conversion path)
 *  - All 28 archetype result pages (medium priority, monthly — they don't change often)
 *  - Static info pages (over, privacy, disclaimer)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/quiz/welk-nederlands`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/over`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const archetypeEntries: MetadataRoute.Sitemap = quiz.archetypes.map((a) => ({
    url: `${SITE_URL}/r/${a.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...archetypeEntries];
}
