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

  const shareText = `Ik ben een ${archetype.name} volgens SpreekJijNog. Wat ben jij? `;

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
        // user cancelled
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
        className="group w-full bg-[var(--ink)] text-[var(--paper)] px-6 py-4 text-base font-medium hover:bg-[var(--stamp)] transition-colors mb-3 flex items-center justify-center gap-3"
      >
        <span>Deel je uitslag</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <ShareLink href={platformUrl("whatsapp")} label="WhatsApp" />
        <ShareLink href={platformUrl("facebook")} label="Facebook" />
        <ShareLink href={platformUrl("linkedin")} label="LinkedIn" />
        <button
          onClick={handleCopy}
          className="px-4 py-2.5 border border-[var(--rule)] bg-[var(--paper-light)] hover:border-[var(--ink)] text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
        >
          {copied ? "Gekopieerd ✓" : "Kopieer link"}
        </button>
      </div>
    </div>
  );
}

function ShareLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2.5 border border-[var(--rule)] bg-[var(--paper-light)] hover:border-[var(--ink)] text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors text-center"
    >
      {label}
    </a>
  );
}
