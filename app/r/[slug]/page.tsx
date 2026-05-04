import type { Metadata } from "next";
import { notFound } from "next/navigation";
import quizData from "@/content/quizzes/welk-nederlands.json";
import type { Quiz, Register } from "@/lib/quiz-types";
import ResultClient from "./ResultClient";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    g?: string;
    r?: string;
    rg?: string;
    reg?: string;
    rs?: string;
    n?: string;
    m?: string;
  }>;
}

interface TopMatch {
  archetypeId: string;
  percentage: number;
}

function parseMatches(raw: string | undefined): TopMatch[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((entry) => {
      const [id, pct] = entry.split(":");
      const n = parseInt(pct ?? "0", 10);
      if (!id) return null;
      return { archetypeId: id.trim(), percentage: isNaN(n) ? 0 : n };
    })
    .filter((m): m is TopMatch => m !== null);
}

const quiz = quizData as Quiz;

function getArchetype(slug: string) {
  return quiz.archetypes.find((a) => a.id === slug);
}

function sanitizeName(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().slice(0, 40);
  if (!trimmed) return null;
  const cleaned = trimmed.replace(/[^\p{L}\s'\-]/gu, "");
  return cleaned.trim() || null;
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

  const initialName = sanitizeName(sp.n);
  const scores = {
    g: parseInt(sp.g ?? "50", 10),
    r: parseInt(sp.r ?? "0", 10),
    rg: parseInt(sp.rg ?? "0", 10),
    region: sp.reg || null,
    register: (sp.rs as Register) || null,
  };

  // Pass through original searchParams for share URLs
  const passthrough: Record<string, string | undefined> = {
    g: sp.g,
    r: sp.r,
    rg: sp.rg,
    reg: sp.reg,
    rs: sp.rs,
    m: sp.m,
  };

  // Resolve top-3 matches from URL into archetype objects
  const matches = parseMatches(sp.m);
  const topMatches = matches
    .map((m) => {
      const a = getArchetype(m.archetypeId);
      if (!a) return null;
      return { archetype: a, percentage: m.percentage };
    })
    .filter((m): m is { archetype: NonNullable<ReturnType<typeof getArchetype>>; percentage: number } => m !== null)
    .slice(0, 3);

  return (
    <ResultClient
      archetype={archetype}
      slug={slug}
      initialName={initialName}
      scores={scores}
      searchParams={passthrough}
      topMatches={topMatches}
    />
  );
}
