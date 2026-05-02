import { ImageResponse } from "next/og";
import quizData from "@/content/quizzes/welk-nederlands.json";
import type { Quiz, Register } from "@/lib/quiz-types";
import { formatRegion, formatRegister } from "@/lib/scoring";

export const runtime = "edge";

const quiz = quizData as Quiz;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);

  const archetype = quiz.archetypes.find((a) => a.id === slug);
  const g = parseInt(searchParams.get("g") ?? "50", 10);
  const r = parseInt(searchParams.get("r") ?? "0", 10);
  const rg = parseInt(searchParams.get("rg") ?? "0", 10);
  const region = searchParams.get("reg") ?? "";
  const register = (searchParams.get("rs") as Register | null) ?? null;

  const archetypeName = archetype?.name ?? "Onbekend Type";
  const tagline = archetype
    ? archetype.description.split(".")[0] + "."
    : "Doe de quiz om te zien wat jij bent.";

  // Split name into words to italicise the second word as accent
  const nameWords = archetypeName.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f4ede0",
          padding: "60px 70px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: "#1a1612",
          position: "relative",
        }}
      >
        {/* Top eyebrow with rules */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5a4d3e",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 500,
          }}
        >
          <span>SpreekJijNog · Nº 01</span>
          <span>spreekjijnog.nl</span>
        </div>

        {/* Top rule */}
        <div
          style={{
            display: "flex",
            height: 1,
            background: "#cbc1a9",
            marginBottom: 50,
          }}
        />

        {/* Eyebrow label */}
        <div
          style={{
            display: "flex",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5a4d3e",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          Ik ben een
        </div>

        {/* Archetype name — display serif */}
        <div
          style={{
            fontSize: 110,
            fontWeight: 700,
            lineHeight: 0.95,
            color: "#1a1612",
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            marginBottom: 28,
            letterSpacing: -1.5,
          }}
        >
          {nameWords.map((word, i) => (
            <span
              key={i}
              style={{
                fontStyle: i === 1 ? "italic" : "normal",
                color: i === 1 ? "#c84a32" : "#1a1612",
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
            fontSize: 26,
            lineHeight: 1.35,
            color: "#5a4d3e",
            maxWidth: 900,
            fontFamily: "system-ui, sans-serif",
            marginBottom: 40,
          }}
        >
          {tagline}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Bottom rule */}
        <div
          style={{
            display: "flex",
            height: 1,
            background: "#cbc1a9",
            marginBottom: 24,
          }}
        />

        {/* Three axes */}
        <div
          style={{
            display: "flex",
            gap: 32,
          }}
        >
          <Bar label="Generatie" value={g} />
          <Bar label={region ? formatRegion(region) : "Regio"} value={r} />
          <Bar
            label={register ? formatRegister(register) : "Register"}
            value={rg}
          />
        </div>

        {/* Decorative stamp number top-right */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 70,
            fontSize: 0,
            display: "flex",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontSize: 16,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#1a1612",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 500,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#c84a32",
            fontFamily: "Georgia, serif",
          }}
        >
          {value}%
        </span>
      </div>
      <div
        style={{
          height: 4,
          width: "100%",
          background: "#cbc1a9",
          display: "flex",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: "#c84a32",
          }}
        />
      </div>
    </div>
  );
}
