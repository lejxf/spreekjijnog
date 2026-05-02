import type { Metadata } from "next";
import { notFound } from "next/navigation";
import quizData from "@/content/quizzes/welk-nederlands.json";
import type { Quiz, Register } from "@/lib/quiz-types";
import { formatRegion, formatRegister } from "@/lib/scoring";
import ShareButtons from "./ShareButtons";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    g?: string;
    r?: string;
    rg?: string;
    reg?: string;
    rs?: string;
  }>;
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

  const title = `Ik ben een ${archetype.name}`;
  const description = archetype.description.split(".")[0] + ".";

  const ogQuery = new URLSearchParams({
    g: sp.g ?? "50",
    r: sp.r ?? "0",
    rg: sp.rg ?? "0",
    reg: sp.reg ?? "",
    rs: sp.rs ?? "",
  });

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

  const g = parseInt(sp.g ?? "50", 10);
  const r = parseInt(sp.r ?? "0", 10);
  const rg = parseInt(sp.rg ?? "0", 10);
  const region = sp.reg || null;
  const register = (sp.rs as Register) || null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 sm:py-12">
      {/* Issue marker */}
      <div className="flex items-center justify-between mb-12 pb-4 border-b border-[var(--rule)]">
        <span className="eyebrow">Uitkomst · Editie van vandaag</span>
        <span className="eyebrow text-[var(--ink-faint)]">15 vragen</span>
      </div>

      {/* Eyebrow */}
      <div className="section-rule eyebrow mb-8">
        <span>Jij bent</span>
      </div>

      {/* Archetype headline */}
      <div className="mb-10 text-center sm:text-left">
        <h1
          className="display text-5xl sm:text-7xl text-[var(--ink)] mb-2 stamp-in"
          style={{ animationDelay: "0.1s" }}
        >
          {arch.name.split(" ").map((word, i) => (
            <span key={i} className={i === 1 ? "display-italic text-[var(--stamp)]" : ""}>
              {word}
              {i < arch.name.split(" ").length - 1 && " "}
            </span>
          ))}
        </h1>
        <p
          className="text-lg sm:text-xl text-[var(--ink-soft)] leading-relaxed mt-6 fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          {arch.description}
        </p>
      </div>

      {/* Profile axes — magazine-style infographic */}
      <div
        className="border-y border-[var(--rule)] py-8 my-12 fade-up"
        style={{ animationDelay: "0.55s" }}
      >
        <div className="section-rule eyebrow mb-6">
          <span>Jouw taalprofiel</span>
        </div>
        <div className="space-y-7">
          <AxisRow
            label="Generatie"
            value={g}
            leftLabel="Ouder Nederlands"
            rightLabel="Jonger Nederlands"
          />
          <AxisRow
            label={`Regio${region ? ` · ${formatRegion(region)}` : ""}`}
            value={r}
            leftLabel="Geen sterke streek"
            rightLabel="Sterke streek"
          />
          <AxisRow
            label={`Register${register ? ` · ${formatRegister(register)}` : ""}`}
            value={rg}
            leftLabel="Wisselend"
            rightLabel="Eén toon dominant"
          />
        </div>
      </div>

      {/* Share */}
      <div className="fade-up" style={{ animationDelay: "0.7s" }}>
        <div className="section-rule eyebrow mb-6">
          <span>Stuur door</span>
        </div>
        <ShareButtons archetype={arch} slug={slug} searchParams={sp} />
      </div>

      {/* Try again */}
      <div className="text-center mt-16 pt-8 border-t border-[var(--rule)]">
        <a
          href="/quiz/welk-nederlands"
          className="editorial-link text-sm"
        >
          Probeer het nog een keer →
        </a>
      </div>
    </div>
  );
}

function AxisRow({
  label,
  value,
  leftLabel,
  rightLabel,
}: {
  label: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        <span className="eyebrow text-[var(--ink)]">{label}</span>
        <span className="display text-2xl text-[var(--stamp)]">{value}%</span>
      </div>
      <div className="relative h-px bg-[var(--rule)] mb-2">
        <div
          className="absolute inset-y-[-2px] left-0 bg-[var(--stamp)]"
          style={{ width: `${value}%`, height: "5px", top: "-2px" }}
        />
      </div>
      <div className="flex justify-between text-xs text-[var(--ink-faint)]">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}
