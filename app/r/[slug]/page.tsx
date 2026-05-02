import type { Metadata } from "next";
import { notFound } from "next/navigation";
import quizData from "@/content/quizzes/welk-nederlands.json";
import type { Quiz, Register } from "@/lib/quiz-types";
import {
  formatRegion,
  formatRegister,
  generationSummary,
  regionSummary,
  registerSummary,
  type AxisSummary,
} from "@/lib/scoring";
import ShareButtons from "./ShareButtons";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    g?: string;
    r?: string;
    rg?: string;
    reg?: string;
    rs?: string;
    n?: string;
  }>;
}

function sanitizeName(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().slice(0, 40);
  if (!trimmed) return null;
  // Strip anything that's not letter, space, hyphen, apostrophe (allows Dutch names)
  const cleaned = trimmed.replace(/[^\p{L}\s'\-]/gu, "");
  return cleaned.trim() || null;
}

const quiz = quizData as Quiz;

function getArchetype(slug: string) {
  return quiz.archetypes.find((a) => a.id === slug);
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const sp = await searchParams;
  const archetype = getArchetype(slug);
  if (!archetype) return {};

  const name = sanitizeName(sp.n);
  const title = name
    ? `${name} is een ${archetype.name}`
    : `Ik ben een ${archetype.name}`;
  const description = archetype.description.split(".")[0] + ".";

  const ogQuery = new URLSearchParams({
    g: sp.g ?? "50",
    r: sp.r ?? "0",
    rg: sp.rg ?? "0",
    reg: sp.reg ?? "",
    rs: sp.rs ?? "",
  });
  if (name) ogQuery.set("n", name);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `/api/og/${slug}?${ogQuery.toString()}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og/${slug}?${ogQuery.toString()}`],
    },
  };
}

export default async function ResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const archetype = getArchetype(slug);

  if (!archetype) {
    notFound();
  }
  const arch = archetype;
  const colors = arch.colors;

  const g = parseInt(sp.g ?? "50", 10);
  const r = parseInt(sp.r ?? "0", 10);
  const rg = parseInt(sp.rg ?? "0", 10);
  const region = sp.reg || null;
  const register = (sp.rs as Register) || null;
  const userName = sanitizeName(sp.n);

  const nameWords = arch.name.split(" ");

  return (
    <>
      {/* Full-bleed hero block in archetype color */}
      <section
        className="relative overflow-hidden -mt-4"
        style={{ background: colors.bg, color: colors.text }}
      >
        {/* Decorative accent corner */}
        <div
          aria-hidden
          className="absolute -top-32 -right-40 w-96 h-96 opacity-15 rotate-45"
          style={{ background: colors.accent }}
        />

        <div className="relative max-w-3xl mx-auto px-6 py-16 sm:py-24">
          {/* Eyebrow */}
          <div
            className="flex items-center justify-between mb-12 pb-4 border-b"
            style={{ borderColor: `${colors.accent}40` }}
          >
            <span
              className="text-xs uppercase font-medium"
              style={{ letterSpacing: "0.2em", color: colors.accent }}
            >
              SpreekJijNog · Uitkomst
            </span>
            <span
              className="text-xs uppercase font-medium opacity-70"
              style={{ letterSpacing: "0.2em" }}
            >
              15 vragen
            </span>
          </div>

          {/* Eyebrow label */}
          <p
            className="eyebrow mb-3 stamp-in"
            style={{ animationDelay: "0.05s", color: colors.accent }}
          >
            {userName ? `${userName} is een` : "Ik ben een"}
          </p>

          {/* Archetype headline */}
          <h1
            className="display text-5xl sm:text-7xl md:text-8xl mb-8 leading-[0.95] stamp-in"
            style={{ animationDelay: "0.15s" }}
          >
            {nameWords.map((word, i) => (
              <span
                key={i}
                className={i === 1 ? "display-italic" : ""}
                style={i === 1 ? { color: colors.accent } : undefined}
              >
                {word}
                {i < nameWords.length - 1 && " "}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-2xl mb-12 fade-up"
            style={{ animationDelay: "0.45s", opacity: 0.8 }}
          >
            {arch.description}
          </p>

          {/* Three labelled axis cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t fade-up"
            style={{
              animationDelay: "0.55s",
              borderColor: `${colors.accent}40`,
            }}
          >
            <AxisCard
              eyebrow="Generatie"
              summary={generationSummary(g)}
              accent={colors.accent}
              text={colors.text}
            />
            <AxisCard
              eyebrow="Regio"
              summary={regionSummary(region, r)}
              accent={colors.accent}
              text={colors.text}
            />
            <AxisCard
              eyebrow="Register"
              summary={registerSummary(register, rg)}
              accent={colors.accent}
              text={colors.text}
            />
          </div>
        </div>
      </section>

      {/* Cream paper section: share + meta */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="section-rule eyebrow mb-6">
          <span>Stuur door</span>
        </div>
        <ShareButtons archetype={arch} slug={slug} searchParams={sp} />

        <div className="text-center mt-16 pt-8 border-t border-[var(--rule)]">
          <a
            href="/quiz/welk-nederlands"
            className="editorial-link text-sm"
          >
            Probeer het nog een keer →
          </a>
        </div>
      </section>
    </>
  );
}

function AxisCard({
  eyebrow,
  summary,
  accent,
  text,
}: {
  eyebrow: string;
  summary: AxisSummary;
  accent: string;
  text: string;
}) {
  return (
    <div className="flex flex-col">
      <span
        className="text-[0.65rem] sm:text-xs uppercase font-medium mb-3"
        style={{ letterSpacing: "0.2em", color: accent, opacity: 0.85 }}
      >
        {eyebrow}
      </span>
      <span
        className="display text-2xl sm:text-3xl leading-tight mb-2"
        style={{ color: text, letterSpacing: "-0.01em" }}
      >
        {summary.label}
      </span>
      <span
        className="text-xs sm:text-sm italic mb-3"
        style={{ color: text, opacity: 0.55, fontFamily: "var(--font-fraunces)" }}
      >
        {summary.detail}
      </span>
      <span
        className="text-xs sm:text-sm leading-snug"
        style={{ color: text, opacity: 0.7 }}
      >
        {summary.comparison}
      </span>
    </div>
  );
}
