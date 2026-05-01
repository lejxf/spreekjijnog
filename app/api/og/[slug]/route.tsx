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

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#faf6ee",
          padding: "70px 80px",
          fontFamily: "system-ui, sans-serif",
          color: "#2a2620",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 40,
            color: "#6b5f4f",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>SpreekJijNog</span>
          <span>spreekjijnog.nl</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#6b5f4f",
              marginBottom: 10,
              display: "flex",
            }}
          >
            Ik ben een
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#b85c3e",
              marginBottom: 30,
              display: "flex",
            }}
          >
            {archetypeName}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "#2a2620",
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 40,
          }}
        >
          <Bar label="Generatie" value={g} />
          <Bar label={region ? formatRegion(region) : "Regio"} value={r} />
          <Bar
            label={register ? formatRegister(register) : "Register"}
            value={rg}
          />
        </div>
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
        gap: 6,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          color: "#6b5f4f",
        }}
      >
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div
        style={{
          height: 8,
          width: "100%",
          background: "#e6dcc8",
          borderRadius: 4,
          display: "flex",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: "#b85c3e",
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );
}
