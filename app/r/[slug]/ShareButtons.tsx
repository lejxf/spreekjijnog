"use client";

import { useState } from "react";
import type { Archetype } from "@/lib/quiz-types";

interface Props {
  archetype: Archetype;
  slug: string;
  searchParams: Record<string, string | undefined>;
}

export default function ShareButtons({ archetype, slug, searchParams }: Props) {
  const [copied, setCopied] = useState(false);

  function getUrl() {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const base =
      typeof window !== "undefined"
        ? `${window.location.origin}/r/${slug}`
        : `https://spreekjijnog.nl/r/${slug}`;
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }

  const shareText = `Ik ben een ${archetype.name} volgens SpreekJijNog 😅 Wat ben jij? `;

  async function handleNativeShare() {
    const url = getUrl();
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: `Ik ben een ${archetype.name}`,
          text: shareText,
          url,
        });
      } catch {
        // user cancelled, ignore
      }
    } else {
      handleCopy();
    }
  }

  async function handleCopy() {
    const url = getUrl();
    try {
      await navigator.clipboard.writeText(`${shareText}${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  function platformUrl(platform: "whatsapp" | "facebook" | "x" | "linkedin") {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(shareText);
    switch (platform) {
      case "whatsapp":
        return `https://wa.me/?text=${text}${url}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case "x":
        return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }
  }

  return (
    <div>
      <button
        onClick={handleNativeShare}
        className="w-full bg-[var(--accent)] text-white px-6 py-4 rounded-full text-lg font-medium hover:bg-[#9d4d34] transition-colors active:scale-[0.98] mb-4"
      >
        Deel je resultaat
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
        <a
          href={platformUrl("whatsapp")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] text-sm font-medium"
        >
          WhatsApp
        </a>
        <a
          href={platformUrl("facebook")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] text-sm font-medium"
        >
          Facebook
        </a>
        <a
          href={platformUrl("linkedin")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] text-sm font-medium"
        >
          LinkedIn
        </a>
        <button
          onClick={handleCopy}
          className="px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] text-sm font-medium"
        >
          {copied ? "Gekopieerd!" : "Kopieer link"}
        </button>
      </div>
    </div>
  );
}
