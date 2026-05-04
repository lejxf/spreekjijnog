/**
 * LiveBadge — small social-proof / FOMO indicator on the homepage.
 *
 * Early stage (count below threshold or unknown): shows "Net live" framing
 * to avoid fake numbers when no one has done the quiz yet.
 *
 * Production: pass a real `count` prop sourced from analytics or a counter
 * service (Plausible API, Vercel KV, etc.). Once count crosses MIN_REVEAL_COUNT
 * we switch to social-proof framing ("X Nederlanders deden de quiz").
 */

interface Props {
  /** Number of completed quizzes. Pass undefined to force the "Net live" frame. */
  count?: number;
}

const MIN_REVEAL_COUNT = 1000;

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 100_000) return `${Math.floor(n / 1_000)}K`;
  // Use Dutch number formatting (period as thousands separator)
  return n.toLocaleString("nl-NL");
}

export default function LiveBadge({ count }: Props) {
  const showCount = typeof count === "number" && count >= MIN_REVEAL_COUNT;

  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-2 text-xs sm:text-sm text-[var(--ink-faint)]"
    >
      <span
        aria-hidden
        className="relative inline-flex h-2 w-2"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--stamp)] opacity-60 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--stamp)]" />
      </span>
      {showCount ? (
        <span>
          <strong className="text-[var(--ink)] font-medium">
            {formatCount(count!)}
          </strong>{" "}
          Nederlanders deden de quiz
        </span>
      ) : (
        <span>
          <strong className="text-[var(--ink)] font-medium">Net live</strong>{" "}
          — wees een van de eersten
        </span>
      )}
    </div>
  );
}
