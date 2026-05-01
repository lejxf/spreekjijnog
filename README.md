# SpreekJijNog.nl

Welk Nederlands spreek jij eigenlijk? Een Nederlandse quizsite die je taalgebruik plot op generatie, regio en register, met een deelbaar archetype als resultaat.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Vercel hosting (target)
- Plausible analytics (cookieless, in te schakelen)

## Lokaal draaien

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Projectstructuur

```
app/
  page.tsx                  # Landing page
  layout.tsx                # Root layout met footer + metadata
  globals.css               # Tailwind + warm kleurpalet
  over/                     # Over-pagina (editorial framing)
  privacy/                  # AVG-basis
  disclaimer/               # Voor-de-gein-disclaimer
  quiz/welk-nederlands/     # Eerste quiz (MVP placeholder)
content/
  quizzes/                  # Quiz-content als JSON (versionable)
```

## Stappenplan

Zie `SpreekJijNog_Stappenplan.md` in de parent-folder voor de fasering.

## Status

- ✅ Fase 0: Voorbereiding
- 🟡 Fase 1: Tech foundation (in progress)
- ⏳ Fase 2: Eerste quiz prototype
- ⏳ Fase 3: Content uitbouwen
- ⏳ Fase 4: Soft launch
- ⏳ Fase 5: Public launch
