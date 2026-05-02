import { ImageResponse } from "next/og";
import quizData from "@/content/quizzes/welk-nederlands.json";
import type { Quiz, Register } from "@/lib/quiz-types";
import {
  generationSummary,
  regionSummary,
  registerSummary,
  type AxisSummary,
} from "@/lib/scoring";

export const runtime = "edge";

const quiz = quizData as Quiz;

const FALLBACK_COLORS = { bg: "#1a1612", accent: "#f5a623", text: "#ffffff" };

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);

  const archetype = quiz.archetypes.find((a) => a.id === slug);
  const colors = archetype?.colors ?? FALLBACK_COLORS;

  const g = parseInt(searchParams.get("g") ?? "50", 10);
  const r = parseInt(searchParams.get("r") ?? "0", 10);
  const rg = parseInt(searchParams.get("rg") ?? "0", 10);
  const region = searchParams.get("reg") ?? "";
  const register = (searchParams.get("rs") as Register | null) ?? null;

  // Sanitize user name for OG image (max 40 chars, letters/space/-/' only)
  const rawName = searchParams.get("n") ?? "";
  const userName =
    rawName
      .trim()
      .slice(0, 40)
      .replace(/[^\p{L}\s'\-]/gu, "")
      .trim() || null;

  const archetypeName = archetype?.name ?? "Onbekend Type";
  const tagline = archetype
    ? archetype.description.split(".")[0] + "."
    : "Doe de quiz om te zien wat jij bent.";

  const nameWords = archetypeName.split(" ");
  const eyebrowLabel = userName ? `${userName} is een` : "Ik ben een";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: colors.bg,
          padding: "60px 70px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: colors.text,
          position: "relative",
        }}
      >
        {/* Decorative diagonal accent stripe top-right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -150,
            width: 400,
            height: 400,
            background: colors.accent,
            opacity: 0.15,
            transform: "rotate(45deg)",
            display: "flex",
          }}
        />

        {/* Top eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
            fontSize: 18,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: colors.accent,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 600,
          }}
        >
          <span>SpreekJijNog · Nº 01</span>
          <span style={{ opacity: 0.6 }}>De Taal‑Editie</span>
        </div>

        {/* Top rule */}
        <div
          style={{
            display: "flex",
            height: 1,
            background: colors.accent,
            opacity: 0.3,
            marginBottom: 56,
          }}
        />

        {/* Eyebrow label */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: colors.accent,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 500,
            marginBottom: 10,
          }}
        >
          {eyebrowLabel}
        </div>

        {/* Archetype name — display serif */}
        <div
          style={{
            fontSize: 116,
            fontWeight: 700,
            lineHeight: 0.92,
            color: colors.text,
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            marginBottom: 24,
            letterSpacing: -2,
          }}
        >
          {nameWords.map((word, i) => (
            <span
              key={i}
              style={{
                fontStyle: i === 1 ? "italic" : "normal",
                color: i === 1 ? colors.accent : colors.text,
                display: "flex",
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 24,
            lineHeight: 1.4,
            color: colors.text,
            opacity: 0.7,
            maxWidth: 900,
            fontFamily: "system-ui, sans-serif",
            marginBottom: 30,
          }}
        >
          {tagline}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Bottom row: three labelled axis stats */}
        <div
          style={{
            display: "flex",
            gap: 28,
            alignItems: "flex-start",
          }}
        >
          <AxisStat
            eyebrow="Generatie"
            summary={generationSummary(g)}
            accent={colors.accent}
            text={colors.text}
          />
          <AxisStat
            eyebrow="Regio"
            summary={regionSummary(region, r)}
            accent={colors.accent}
            text={colors.text}
          />
          <AxisStat
            eyebrow="Register"
            summary={registerSummary(register, rg)}
            accent={colors.accent}
            text={colors.text}
          />
        </div>

        {/* Bottom domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginTop: 32,
            paddingTop: 18,
            borderTop: `1px solid ${colors.accent}40`,
            fontSize: 16,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: colors.accent,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 500,
          }}
        >
          <span>spreekjijnog.nl</span>
          <span style={{ opacity: 0.5 }}>Wat ben jij?</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

function AxisStat({
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
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        style={{
          fontSize: 14,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: accent,
          fontFamily: "system-ui, sans-serif",
          fontWeight: 600,
          marginBottom: 8,
          display: "flex",
        }}
      >
        {eyebrow}
      </span>
      <span
        style={{
          fontSize: 30,
          fontWeight: 700,
          color: text,
          fontFamily: "Georgia, serif",
          lineHeight: 1.05,
          letterSpacing: -0.5,
          marginBottom: 8,
          display: "flex",
        }}
      >
        {summary.label}
      </span>
      <span
        style={{
          fontSize: 14,
          color: text,
          opacity: 0.6,
          fontFamily: "system-ui, sans-serif",
          lineHeight: 1.35,
          display: "flex",
        }}
      >
        {summary.comparison}
      </span>
    </div>
  );
}
