import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://spreekjijnog.nl"),
  title: {
    default: "SpreekJijNog — Welk Nederlands spreek jij?",
    template: "%s | SpreekJijNog",
  },
  description:
    "Drie minuten, vijftien woorden, en je weet welk type Nederlands jij spreekt. Op generatie, regio en register.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "SpreekJijNog",
    title: "SpreekJijNog — Welk Nederlands spreek jij?",
    description:
      "Drie minuten, vijftien woorden, en je weet welk type Nederlands jij spreekt.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpreekJijNog — Welk Nederlands spreek jij?",
    description:
      "Drie minuten, vijftien woorden, en je weet welk type Nederlands jij spreekt.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--border)] py-6 mt-12 text-center text-sm text-[var(--muted)]">
          <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row justify-between gap-2">
            <span>SpreekJijNog · voor de gein, niet voor de wetenschap</span>
            <nav className="flex gap-4 justify-center">
              <a href="/over" className="hover:text-[var(--accent)]">Over</a>
              <a href="/privacy" className="hover:text-[var(--accent)]">Privacy</a>
              <a href="/disclaimer" className="hover:text-[var(--accent)]">Disclaimer</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
