// Quiz content types — used for both content authoring and runtime scoring.

export type Register = "formeel" | "neutraal" | "informeel" | "straat" | "dialect";

/**
 * Lifestyle vibe — distinguishes archetypes that share language axes.
 * Padel-Pa and Yoga-Mompreneur are both Hollands+mid+informeel; vibe separates them.
 */
export type Vibe =
  | "sport"
  | "wellness"
  | "bewust"
  | "vintage"
  | "huiselijk"
  | "no-nonsense"
  | "single"
  | "cultureel"
  | "online"
  | "rauw";

export type Region =
  | "noord-brabant"
  | "limburg"
  | "noord-holland"
  | "zuid-holland"
  | "utrecht"
  | "gelderland"
  | "achterhoek"
  | "twente"
  | "drenthe"
  | "groningen"
  | "friesland"
  | "zeeland"
  | "flevoland"
  | "vlaams"
  | "hollands"
  | "noord";

export interface OptionTags {
  /** Year representing the generational marker. e.g. 2018 = late-2010s slang, 1965 = boomer parlance. */
  generation?: number;
  /** One or more regions, slash-separated for multi-region words. */
  region?: Region | string;
  register?: Register;
  /** Lifestyle vibe — used by lifestyle questions to differentiate same-language archetypes. */
  vibe?: Vibe;
}

export interface QuizOption {
  label: string;
  tags?: OptionTags;
}

export type QuestionType = "single_choice" | "multi_select";

export interface QuizQuestion {
  id: string;
  prompt: string;
  /** Optional subtitle / helper text shown beneath the prompt. */
  subtitle?: string;
  /** Defaults to single_choice when omitted. */
  type?: QuestionType;
  /** True for lifestyle questions used as verfijning after the multi-select. */
  lifestyle?: boolean;
  options: QuizOption[];
}

export interface Answer {
  questionId: string;
  /** Array of selected option indexes. For single_choice: 1 item, or [-1] for "geen idee". For multi_select: 0-N items. */
  selected: number[];
}

export interface ArchetypeProfile {
  /** Min/max generation that maps to this archetype. */
  generation_min?: number;
  generation_max?: number;
  /** Preferred region(s) for this archetype, slash-separated for matching. */
  region?: string;
  register?: Register;
  /** Preferred lifestyle vibe — strong differentiator within same language axes. */
  vibe?: Vibe;
}

export interface ArchetypeColors {
  /** Dark background color (hex with #) used for the share-card and result hero. */
  bg: string;
  /** Bright accent color used for percentages, axes, eyebrow text. */
  accent: string;
  /** Body text color over the dark background (typically white or cream). */
  text: string;
}

export interface Archetype {
  id: string;
  name: string;
  description: string;
  axes: ArchetypeProfile;
  colors: ArchetypeColors;
  /** Optional hero image path (e.g. /images/bakfietsouder.jpg). Falls back to color-only hero when absent. */
  image?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  archetypes: Archetype[];
}

/** Computed profile based on user's answers. */
export interface UserProfile {
  /** Average generation marker (year), or null if no signal. */
  avgGeneration: number | null;
  /** Most-picked region, or null. */
  dominantRegion: string | null;
  /** Most-picked register, or null. */
  dominantRegister: Register | null;
  /** Most-picked lifestyle vibe, or null. */
  dominantVibe: Vibe | null;
  /** How dominant the region is (0-100), based on share of region-tagged answers. */
  regionStrength: number;
  /** How dominant the register is (0-100). */
  registerStrength: number;
  /** How dominant the vibe is (0-100). */
  vibeStrength: number;
  /** Position on generation axis (0 = oldest, 100 = youngest), based on avg gen. */
  generationStrength: number;
}

export interface ArchetypeMatch {
  archetype: Archetype;
  /** Raw weighted score */
  score: number;
  /** Normalized percentage (0-100) within top 3 */
  percentage: number;
}

export interface QuizResult {
  profile: UserProfile;
  /** Primary archetype = topMatches[0].archetype */
  archetype: Archetype;
  /** Top 3 best-matching archetypes with normalized percentages summing to ~100. */
  topMatches: ArchetypeMatch[];
}
