import type { Metadata } from "next";
import Link from "next/link";
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
        <header className="pt-6 pb-4 px-6">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="SpreekJijNog — naar de homepage"
              className="inline-block transition-opacity hover:opacity-80"
            >
              {/* Inline SVG so the logo renders crisp + transparent on every background */}
              <svg
                width="56"
                height="56"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M 56 60 Q 40 60 40 76 L 40 280 Q 40 296 56 296 L 96 296 L 88 350 L 148 296 L 344 296 Q 360 296 360 280 L 360 76 Q 360 60 344 60 Z"
                  fill="#f5a623"
                />
                <text
                  x="200"
                  y="142"
                  textAnchor="middle"
                  fontFamily="var(--font-fraunces), Georgia, serif"
                  fontSize="78"
                  fontWeight="600"
                  fill="#0f0d0a"
                  letterSpacing="-2"
                >
                  Spreek
                </text>
                <text
                  x="200"
                  y="216"
                  textAnchor="middle"
                  fontFamily="var(--font-fraunces), Georgia, serif"
                  fontSize="78"
                  fontStyle="italic"
                  fontWeight="500"
                  fill="#0f0d0a"
                  letterSpacing="-2"
                >
                  Jij
                </text>
                <text
                  x="200"
                  y="290"
                  textAnchor="middle"
                  fontFamily="var(--font-fraunces), Georgia, serif"
                  fontSize="78"
                  fontWeight="600"
                  fill="#0f0d0a"
                  letterSpacing="-2"
                >
                  Nog.nl?
                </text>
              </svg>
            </Link>
            <span className="eyebrow hidden sm:inline text-[var(--ink-soft)]">
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
