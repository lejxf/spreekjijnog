import type {
  Quiz,
  QuizOption,
  Archetype,
  UserProfile,
  QuizResult,
  Register,
} from "./quiz-types";

/**
 * Score a quiz attempt given the user's selected option index per question.
 * Returns a profile (3 axes) and the best-matching archetype.
 */
export function scoreQuiz(
  quiz: Quiz,
  answers: { questionId: string; optionIndex: number }[],
): QuizResult {
  const pickedTags = answers
    .map((a) => {
      const q = quiz.questions.find((q) => q.id === a.questionId);
      const opt: QuizOption | undefined = q?.options[a.optionIndex];
      return opt?.tags;
    })
    .filter((t): t is NonNullable<typeof t> => t != null);

  // Generation: average of picked generation tags
  const genValues = pickedTags
    .map((t) => t.generation)
    .filter((v): v is number => typeof v === "number");
  const avgGeneration =
    genValues.length > 0
      ? genValues.reduce((a, b) => a + b, 0) / genValues.length
      : null;

  // Region: count occurrences (multi-region tags split on '/')
  const regionCounts: Record<string, number> = {};
  let regionTagged = 0;
  pickedTags.forEach((t) => {
    if (t.region) {
      regionTagged++;
      t.region.split("/").forEach((r) => {
        const key = r.trim();
        regionCounts[key] = (regionCounts[key] || 0) + 1;
      });
    }
  });
  const sortedRegions = Object.entries(regionCounts).sort(
    (a, b) => b[1] - a[1],
  );
  const dominantRegion = sortedRegions[0]?.[0] ?? null;
  const regionStrength =
    sortedRegions[0] && regionTagged
      ? Math.round((sortedRegions[0][1] / regionTagged) * 100)
      : 0;

  // Register: count occurrences
  const registerCounts: Record<string, number> = {};
  let registerTagged = 0;
  pickedTags.forEach((t) => {
    if (t.register) {
      registerTagged++;
      registerCounts[t.register] = (registerCounts[t.register] || 0) + 1;
    }
  });
  const sortedRegisters = Object.entries(registerCounts).sort(
    (a, b) => b[1] - a[1],
  );
  const dominantRegister = (sortedRegisters[0]?.[0] as Register) ?? null;
  const registerStrength =
    sortedRegisters[0] && registerTagged
      ? Math.round((sortedRegisters[0][1] / registerTagged) * 100)
      : 0;

  // Generation strength: map avg year to 0-100. 1950 = 0, 2025 = 100.
  const generationStrength =
    avgGeneration != null
      ? clamp(Math.round(((avgGeneration - 1950) / (2025 - 1950)) * 100), 0, 100)
      : 50;

  const profile: UserProfile = {
    avgGeneration,
    dominantRegion,
    dominantRegister,
    regionStrength,
    registerStrength,
    generationStrength,
  };

  const archetype = matchArchetype(profile, quiz.archetypes);
  return { profile, archetype };
}

/**
 * Match a profile to its closest archetype using axis-weighted distance.
 */
function matchArchetype(profile: UserProfile, archetypes: Archetype[]): Archetype {
  let best = archetypes[0];
  let bestScore = -Infinity;

  for (const arch of archetypes) {
    let score = 0;

    // Generation match (weight 3)
    if (profile.avgGeneration != null && arch.axes.generation_min != null && arch.axes.generation_max != null) {
      const mid = (arch.axes.generation_min + arch.axes.generation_max) / 2;
      const halfRange = (arch.axes.generation_max - arch.axes.generation_min) / 2 || 10;
      const dist = Math.abs(profile.avgGeneration - mid);
      // Inside range scores high, outside drops linearly
      const genMatch = Math.max(0, 1 - dist / (halfRange * 2.5));
      score += genMatch * 3;
    }

    // Region match (weight 4)
    if (profile.dominantRegion && arch.axes.region) {
      const archRegions = arch.axes.region.split("/").map((r) => r.trim());
      if (archRegions.includes(profile.dominantRegion)) {
        score += 4;
      } else if (
        archRegions.some((r) => profile.dominantRegion!.includes(r) || r.includes(profile.dominantRegion!))
      ) {
        score += 2;
      }
    }

    // Register match (weight 2)
    if (profile.dominantRegister && arch.axes.register) {
      if (profile.dominantRegister === arch.axes.register) {
        score += 2;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = arch;
    }
  }

  return best;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

/**
 * Pretty-print a region for the result page.
 */
export function formatRegion(region: string | null): string {
  if (!region) return "Geen sterke regio";
  const map: Record<string, string> = {
    "noord-brabant": "Brabant",
    "limburg": "Limburg",
    "noord-holland": "Noord-Holland",
    "zuid-holland": "Zuid-Holland",
    "utrecht": "Utrecht",
    "gelderland": "Gelderland",
    "achterhoek": "Achterhoek",
    "twente": "Twente",
    "drenthe": "Drenthe",
    "groningen": "Groningen",
    "friesland": "Friesland",
    "zeeland": "Zeeland",
    "flevoland": "Flevoland",
    "vlaams": "Vlaanderen",
    "hollands": "Holland",
    "noord": "Noord-Nederland",
  };
  return map[region] ?? region;
}

export function formatRegister(register: Register | null): string {
  if (!register) return "Wisselend";
  const map: Record<Register, string> = {
    formeel: "Formeel",
    neutraal: "Neutraal",
    informeel: "Informeel",
    straat: "Straattaal",
    dialect: "Dialect",
  };
  return map[register];
}
