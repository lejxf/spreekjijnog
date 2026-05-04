"use client";

import { useState } from "react";
import type { Archetype } from "@/lib/quiz-types";

interface Props {
  archetype: Archetype;
}

function sanitizeName(raw: string): string {
  return raw
    .trim()
    .slice(0, 30)
    .replace(/[^\p{L}\s'\-]/gu, "")
    .trim();
}

/**
 * "Tag een vriend"-mechanic: pre-fills a WhatsApp share with a callout to a specific friend.
 *
 * Generates copy like:
 *   "Tim, ik denk dat JIJ een Bakfiets Ouder bent 🚲 — Zo gênant haha. Doe de test: spreekjijnog.nl/quiz/welk-nederlands"
 */
export default function TagFriend({ archetype }: Props) {
  const [friend, setFriend] = useState("");

  const emoji = archetype.shareCopy?.emoji ?? "";
  const reaction = archetype.shareCopy?.reaction ?? "";

  function buildWhatsAppUrl(): string {
    const name = sanitizeName(friend) || "Hee";
    const quizUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/quiz/welk-nederlands`
        : "https://spreekjijnog.nl/quiz/welk-nederlands";

    const reactionPart = reaction ? ` — ${reaction}.` : ".";
    const text = `${name}, ik denk dat JIJ een ${archetype.name} bent ${emoji}${reactionPart} Doe de test: ${quizUrl}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = sanitizeName(friend);
    if (!cleaned) return;
    if (typeof window !== "undefined") {
      window.open(buildWhatsAppUrl(), "_blank", "noopener,noreferrer");
    }
  }

  const canSubmit = sanitizeName(friend).length > 0;

  return (
    <div className="mt-12 p-6 sm:p-7 border border-[var(--rule)] bg-[var(--paper-light)]">
      <div className="section-rule eyebrow mb-4">
        <span>Tag een vriend</span>
      </div>
      <p className="text-base text-[var(--ink-soft)] mb-4 leading-relaxed">
        Wie van je vrienden is{" "}
        <em className="display display-italic text-[var(--ink)]">
          écht
        </em>{" "}
        een {archetype.name}? Stuur ze een berichtje.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2"
      >
        <input
          type="text"
          value={friend}
          onChange={(e) => setFriend(e.target.value)}
          placeholder="Bijvoorbeeld: Tim"
          maxLength={30}
          aria-label="Naam van je vriend"
          className="flex-1 px-4 py-3 text-base bg-[var(--paper)] border border-[var(--rule)] focus:border-[var(--ink)] focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="bg-[#25D366] text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          <span>Stuur via WhatsApp</span>
          <span aria-hidden>→</span>
        </button>
      </form>

      <p className="text-xs text-[var(--ink-faint)] mt-3">
        Opent WhatsApp met een vooraf ingevuld bericht. Niets wordt opgeslagen.
      </p>
    </div>
  );
}
