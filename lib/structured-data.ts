/**
 * JSON-LD schema builders for SpreekJijNog.
 *
 * Use the helpers below to generate structured data, then drop the result inside
 * a <script type="application/ld+json"> tag. Each function returns a plain object;
 * stringify it with JSON.stringify(...) at the call site.
 *
 * Reference: https://schema.org and https://developers.google.com/search/docs/appearance/structured-data
 */

import type { Archetype } from "./quiz-types";

const SITE_URL = "https://spreekjijnog.nl";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SpreekJijNog",
    alternateName: "Spreek Jij Nog?",
    url: SITE_URL,
    inLanguage: "nl-NL",
    description:
      "Welk Nederlands spreek jij eigenlijk? Een redactionele taal-quiz die je classificeert op generatie, regio en register.",
    publisher: {
      "@type": "Organization",
      name: "SpreekJijNog",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SpreekJijNog",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Een redactioneel taal-experiment dat Nederlandstalige taalgebruikers classificeert in 28 archetypes op basis van woordkeuze, regio, register en levensstijl.",
  };
}

/**
 * Quiz schema — Google supports limited "Quiz" via Question/Answer, so we use a
 * lighter LearningResource with educationalUse signal. The structured FAQ-style
 * schema would over-promise rich-result eligibility.
 */
export function quizSchema(opts: {
  questionCount: number;
  archetypeCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Welk Nederlands spreek jij?",
    description: `Een taal-quiz van ${opts.questionCount} vragen die je classificeert in één van ${opts.archetypeCount} Nederlandstalige archetypes.`,
    url: `${SITE_URL}/quiz/welk-nederlands`,
    inLanguage: "nl-NL",
    educationalLevel: "casual",
    educationalUse: "self-assessment",
    timeRequired: "PT3M",
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: "SpreekJijNog",
      url: SITE_URL,
    },
    about: [
      { "@type": "Thing", name: "Nederlandse taal" },
      { "@type": "Thing", name: "Nederlandse archetypes" },
      { "@type": "Thing", name: "Nederlandse dialecten" },
    ],
  };
}

export function archetypeArticleSchema(archetype: Archetype) {
  const imageUrl = archetype.image
    ? `${SITE_URL}${archetype.image}`
    : `${SITE_URL}/logo.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Ik ben een ${archetype.name}`,
    description: archetype.description,
    image: imageUrl,
    inLanguage: "nl-NL",
    url: `${SITE_URL}/r/${archetype.id}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/r/${archetype.id}`,
    },
    publisher: {
      "@type": "Organization",
      name: "SpreekJijNog",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    isPartOf: {
      "@type": "Quiz",
      name: "Welk Nederlands spreek jij?",
      url: `${SITE_URL}/quiz/welk-nederlands`,
    },
  };
}

export function breadcrumbSchema(
  trail: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: step.url,
    })),
  };
}

/**
 * Convenience helper — render a JSON-LD block inline. Call from a server component:
 *   <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema())} />
 */
export function jsonLd(schema: object | object[]): { __html: string } {
  return { __html: JSON.stringify(schema) };
}
