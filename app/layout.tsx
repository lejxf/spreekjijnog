import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spreekjijnog.nl"),
  title: {
    default: "SpreekJijNog — Welk Nederlands spreek jij eigenlijk?",
    template: "%s · SpreekJijNog",
  },
  description:
    "Vijftien woorden, drie minuten, één archetype op generatie, regio en register. Een redactionele quiz over hoe Nederland praat.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "SpreekJijNog",
    title: "Welk Nederlands spreek jij eigenlijk?",
    description: "Vijftien woorden, drie minuten, één archetype.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Welk Nederlands spreek jij eigenlijk?",
    description: "Vijftien woorden, drie minuten, één archetype.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${fraunces.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="pt-8 pb-4 px-6">
          <div className="max-w-3xl mx-auto flex items-baseline justify-between">
            <a
              href="/"
              className="display text-xl tracking-tight text-[var(--ink)] hover:text-[var(--stamp)] transition-colors"
            >
              SpreekJijNog
            </a>
            <span className="eyebrow hidden sm:inline">
              Een redactioneel taal-experiment
            </span>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[var(--rule)] mt-16 py-8 px-6">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between gap-3 text-sm">
            <span className="text-[var(--ink-soft)]">
              SpreekJijNog · voor de gein, niet voor de wetenschap
            </span>
            <nav className="flex gap-5 text-[var(--ink-soft)]">
              <a href="/over" className="hover:text-[var(--stamp)] transition-colors">
                Over
              </a>
              <a href="/privacy" className="hover:text-[var(--stamp)] transition-colors">
                Privacy
              </a>
              <a href="/disclaimer" className="hover:text-[var(--stamp)] transition-colors">
                Disclaimer
              </a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
