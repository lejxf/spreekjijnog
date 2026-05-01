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

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
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
  // After notFound() returns never, archetype is non-null. Re-bind for TS.
  const arch = archetype;

  const g = parseInt(sp.g ?? "50", 10);
  const r = parseInt(sp.r ?? "0", 10);
  const rg = parseInt(sp.rg ?? "0", 10);
  const region = sp.reg || null;
  const register = (sp.rs as Register) || null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 sm:py-16">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-widest text-[var(--muted)] mb-3">
          Jouw archetype
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold mb-4 text-[var(--foreground)]">
          {arch.name}
        </h1>
        <p className="text-lg text-[var(--muted)] leading-relaxed max-w-xl mx-auto">
          {arch.description}
        </p>
      </div>

      {/* Profile axes */}
      <div className="bg-[var(--card)] rounded-2xl p-6 sm:p-8 mb-8 border border-[var(--border)]">
        <h2 className="text-xs uppercase tracking-widest text-[var(--muted)] mb-6">
          Jouw taalprofiel
        </h2>
        <div className="space-y-5">
          <AxisRow label="Generatie" value={g} leftLabel="Ouder" rightLabel="Jonger" />
          <AxisRow
            label={`Regio${region ? `: ${formatRegion(region)}` : ""}`}
            value={r}
            leftLabel="Wisselend"
            rightLabel="Sterk"
          />
          <AxisRow
            label={`Register${register ? `: ${formatRegister(register)}` : ""}`}
            value={rg}
            leftLabel="Wisselend"
            rightLabel="Sterk"
          />
        </div>
      </div>

      {/* Share */}
      <ShareButtons archetype={arch} slug={slug} searchParams={sp} />

      {/* Try again / try other quiz */}
      <div className="text-center mt-12">
        <a
          href="/quiz/welk-nederlands"
          className="text-[var(--accent)] underline hover:no-underline text-sm"
        >
          Doe de quiz nog een keer
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
      <div className="flex justify-between mb-2 text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-[var(--muted)]">{value}%</span>
      </div>
      <div className="relative h-2 bg-[var(--border)] rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-[var(--accent)] rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}
