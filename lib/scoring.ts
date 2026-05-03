import type {
  Quiz,
  Archetype,
  UserProfile,
  QuizResult,
  Register,
  Vibe,
  Answer,
} from "./quiz-types";

/**
 * Score a quiz attempt given the user's answers (each potentially with multiple selected options).
 * Returns a profile (4 axes) and the best-matching archetype.
 */
export function scoreQuiz(quiz: Quiz, answers: Answer[]): QuizResult {
  const pickedTags = answers
    .flatMap((a) => {
      if (!a.selected || a.selected.length === 0) return [];
      const q = quiz.questions.find((q) => q.id === a.questionId);
      if (!q) return [];
      return a.selected
        .filter((idx) => idx >= 0)
        .map((idx) => q.options[idx]?.tags)
        .filter((t): t is NonNullable<typeof t> => t != null);
    });

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

  // Vibe: count occurrences (lifestyle axis)
  const vibeCounts: Record<string, number> = {};
  let vibeTagged = 0;
  pickedTags.forEach((t) => {
    if (t.vibe) {
      vibeTagged++;
      vibeCounts[t.vibe] = (vibeCounts[t.vibe] || 0) + 1;
    }
  });
  const sortedVibes = Object.entries(vibeCounts).sort((a, b) => b[1] - a[1]);
  const dominantVibe = (sortedVibes[0]?.[0] as Vibe) ?? null;
  const vibeStrength =
    sortedVibes[0] && vibeTagged
      ? Math.round((sortedVibes[0][1] / vibeTagged) * 100)
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
    dominantVibe,
    regionStrength,
    registerStrength,
    vibeStrength,
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

    // Vibe match (weight 4) — strong because it's the lifestyle differentiator
    if (profile.dominantVibe && arch.axes.vibe) {
      if (profile.dominantVibe === arch.axes.vibe) {
        score += 4;
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

// ────────────────────────────────────────────────────────────────────────
// Axis summaries — culturally-anchored labels + comparative phrasing
// ────────────────────────────────────────────────────────────────────────

export interface AxisSummary {
  /** The bold label (e.g., "WhatsApp-Nederlands", "Sterk Brabant") */
  label: string;
  /** Short cultural detail in italics (e.g., "Smileys, voicememo's") */
  detail: string;
  /** Comparative one-liner (e.g., "Jonger dan 38% van Nederland") */
  comparison: string;
}

/**
 * Approximate normal CDF: returns probability that X < z given mean=50, stdev=22.
 * Used to translate a 0-100 strength into a percentile feel.
 * Without empirical data we lean on a population approximation that "feels" right.
 */
function approxPercentile(strength: number): number {
  // Sigmoid centred at 50 with slope tuned to give 5/16/50/84/95 at 0/30/50/70/100.
  const z = (strength - 50) / 22;
  // Standard logistic approximation of the normal CDF
  const p = 1 / (1 + Math.exp(-1.65 * z));
  return Math.round(p * 100);
}

/**
 * Cultural-era label per generation strength. 0% = oldest, 100% = youngest.
 */
export function generationSummary(strength: number): AxisSummary {
  let label: string;
  let detail: string;

  if (strength < 20) {
    label = "Cassettetape-Nederlands";
    detail = "Radio 1, brieven met blauwe enveloppe";
  } else if (strength < 40) {
    label = "MSN-Nederlands";
    detail = "Hyves, Onbenullig.com, kabel-internet";
  } else if (strength < 65) {
    label = "WhatsApp-Nederlands";
    detail = "Smileys, voicememo's, 'ik bel je terug'";
  } else if (strength < 85) {
    label = "TikTok-Nederlands";
    detail = "FYP, lowkey, no cap";
  } else {
    label = "Brainrot-Nederlands";
    detail = "Skibidi, sigma, Ohio";
  }

  // Percentile = % of population with LOWER strength (older Dutch) than you
  const percentile = approxPercentile(strength);
  let comparison: string;
  if (percentile <= 50) {
    // You lean older — flex how distinctly old your Dutch is
    const olderShare = 100 - percentile;
    comparison = `Jouw Nederlands is ouder dan ${olderShare}% van Nederland`;
  } else {
    const youngerShare = percentile;
    comparison = `Jouw Nederlands is jonger dan ${youngerShare}% van Nederland`;
  }

  return { label, detail, comparison };
}

/**
 * Region label + comparison.
 * regionStrength = % of region-tagged answers that point to your dominant region.
 */
export function regionSummary(
  region: string | null,
  strength: number,
): AxisSummary {
  if (!region || strength < 25) {
    return {
      label: "Wisselende regio",
      detail: "Geen specifieke streek dominant",
      comparison: "Minder regionaal dan 65% van Nederland",
    };
  }

  const regionName = formatRegion(region);
  const regionalPercentile = approxPercentile(strength);

  let label: string;
  if (strength >= 75) label = `Sterk ${regionName}`;
  else if (strength >= 50) label = `Duidelijk ${regionName}`;
  else label = `Lichte ${regionName}-inkleuring`;

  return {
    label,
    detail: regionalDetail(region),
    comparison: `Meer regionaal dan ${regionalPercentile}% van Nederland`,
  };
}

function regionalDetail(region: string): string {
  const map: Record<string, string> = {
    "noord-brabant": "Houdoe, jonges, gezellig zat",
    "limburg": "Hoi doelf, vasteloavend, vlaai",
    "noord-holland": "Doei, gezellig, lekker man",
    "zuid-holland": "Krek, kek, hartstikke",
    "utrecht": "Halfweg, gewoon, normaal hoor",
    "gelderland": "Eens kijken, allernet, prima",
    "achterhoek": "Boude, tabe, langzaam aan",
    "twente": "Doar, joa, alles guttig",
    "drenthe": "Eens kieken, joa zeker, kalm an",
    "groningen": "Moi, joa joa, koffie klaar?",
    "friesland": "Krek, eala, tige tank",
    "zeeland": "Joost mag het weten",
    "vlaams": "Goesting, na, zenne",
    "hollands": "Doei, hoor, gezellig",
    "noord": "Stil maar trefzeker",
  };
  return map[region] ?? "Specifieke streektonen";
}

/**
 * Register label + comparison.
 * registerStrength = % of register-tagged answers that match your dominant register.
 */
export function registerSummary(
  register: Register | null,
  strength: number,
): AxisSummary {
  if (!register || strength < 25) {
    return {
      label: "Wisselende toon",
      detail: "Schakelt tussen tonen",
      comparison: "Minder consistent dan 60% van Nederland",
    };
  }

  const registerName = formatRegister(register);
  const dominancePercentile = approxPercentile(strength);

  let label: string;
  if (strength >= 75) label = `Vooral ${registerName.toLowerCase()}`;
  else if (strength >= 50) label = `Duidelijk ${registerName.toLowerCase()}`;
  else label = `Iets ${registerName.toLowerCase()}`;

  // Comparison phrasing tailored to register direction
  let comparison: string;
  switch (register) {
    case "formeel":
      comparison = `Formeler dan ${dominancePercentile}% van Nederland`;
      break;
    case "informeel":
      comparison = `Losser dan ${dominancePercentile}% van Nederland`;
      break;
    case "straat":
      comparison = `Meer straattaal dan ${dominancePercentile}% van Nederland`;
      break;
    case "dialect":
      comparison = `Meer dialect dan ${dominancePercentile}% van Nederland`;
      break;
    default:
      comparison = `Consistenter dan ${dominancePercentile}% van Nederland`;
  }

  return {
    label,
    detail: registerDetail(register),
    comparison,
  };
}

function registerDetail(register: Register): string {
  const map: Record<Register, string> = {
    formeel: "Geachte, immer, ten gevolge van",
    neutraal: "Beste, gewoon, prima",
    informeel: "Hoi, joh, gekkenhuis",
    straat: "Skeer, no cap, wallahi",
    dialect: "Boude, hoi doelf, ge zijt",
  };
  return map[register];
}
