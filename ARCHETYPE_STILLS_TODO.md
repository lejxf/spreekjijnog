# Archetype stills — Nano Banana prompts (resterende 13)

Twaalf archetypes hebben nog geen still op de result-page (en yoga-mompreneur heeft alleen een video, geen still). Deze 13 hieronder, met Nano Banana prompts in dezelfde stijl als de bestaande 12.

## Specs (consistent met bestaande stills)

- **Aspect ratio:** 9:16 verticaal (768×1376 of 1024×1792 — een staand portret)
- **Style:** Photorealistic editorial portrait, lichte film-korrel, daglicht of zacht avondlicht
- **Subject:** één persoon, 3/4 body of bovenlichaam, herkenbare NL-context
- **Mood:** zoals beschreven per archetype — niet gestileerd, wel filmisch
- **Drop in:** `/public/images/<archetype-id>.jpg`

## Workflow

1. Genereer alle 13 stills (1 weekend werk)
2. Drop ze in `/public/images/` met de exacte filename hieronder
3. Run het sync-script (helemaal onderaan deze doc) — dat voegt automatisch het `image`-veld toe aan elke archetype in de JSON
4. Commit + push → result-pages krijgen hero-image

---

## 1. Bourgondische Boekhouder

**File:** `/public/images/bourgondische-boekhouder.jpg`

> Photorealistic editorial portrait, 9:16 vertical composition, of a 42-year-old Dutch man with neatly trimmed beard and well-groomed brown hair, wearing a slim chino, a Tommy Hilfiger polo, and Nike Cortez sneakers, standing in his suburban Tilburg backyard at golden hour. Warm LED string lights overhead and embedded in a wooden overkapping behind him. He's holding a glass of rosé and laughing toward someone off-camera, casual confident energy. Borrelplankje (cheese, droge worst, olives) on a wooden picnic table to the side. White Tesla Model Y partly visible in the driveway through a side gate. Slight film grain, warm afternoon light, mood: gewoon zaterdag bij ons.

## 2. Hagenese Hipster

**File:** `/public/images/hagenese-hipster.jpg`

> Photorealistic editorial portrait, 9:16 vertical, of a 34-year-old man with tortoiseshell glasses and a bouclé fisherman beanie, wearing a linen shirt under a Stüssy cardigan, sitting at an outdoor café table on the Bezuidenhoutseweg in Den Haag. MacBook Air open in front of him with a half-written Substack newsletter on screen. Oat-milk flat white on the table, half a sourdough cookie. Soft late-afternoon light filtering through plane trees. Slightly pretentious-but-aware expression. Slight film grain, mood: tussen meeting en column door.

## 3. Achterhoekse Lezer

**File:** `/public/images/achterhoekse-academicus.jpg` _(filename keeps the original ID since the URL slug is unchanged)_

> Photorealistic editorial portrait, 9:16 vertical, of a 26-year-old woman with shoulder-length brown hair in an oversized cream knit sweater and round wire glasses, sitting in a worn velvet armchair in a cozy Nijmegen attic apartment. She's holding a Sarah J. Maas paperback with bright pink and yellow sticky notes flagging spicy chapters. Tall bookshelf wall behind her, candles lit on a side table, oversized cup of tea on a stack of books. Warm golden lamp light, BookTok aesthetic, soft and intimate. Mood: voor de zoveelste keer ACOTAR.

## 4. Belgisch Geïnfecteerd

**File:** `/public/images/belgisch-geinfecteerd.jpg`

> Photorealistic editorial portrait, 9:16 vertical, of a 38-year-old Dutch person with a content satisfied expression, sitting at a marble-top café table inside a classic Vlaams brasserie with dark wood paneling and brass fixtures. A bowl of waterzooi and a portion of frites in a cone in front, a Duvel goblet half-full. Warm afternoon light through stained-glass windows. Wearing a corduroy jacket and a wool scarf. Mood: goesting in een waterzooi, allez.

## 5. Drentse Rust-Influencer

**File:** `/public/images/drentse-trompetterik.jpg` _(filename keeps the original ID)_

> Photorealistic editorial portrait, 9:16 vertical, of a 52-year-old in a flannel shirt and beanie standing in their Drenthe moestuin (vegetable garden), holding up an iPhone to film a peaceful "rust"-moment for Instagram. Wooden farmhouse in soft focus background, tomato plants and herbs in raised beds, autumn leaves on weathered fence. Soft overcast Dutch northern light. Slightly weathered face, calm and unbothered. Mood: rustig oud worden in Drenthe.

## 6. Limburgse Bourgondiër

**File:** `/public/images/limburgse-bourgondier.jpg`

> Photorealistic editorial portrait, 9:16 vertical, of a 47-year-old in colorful homemade vasteloavend costume with face paint, holding a plastic cup of beer in one hand and a slice of vlaai on a paper plate in the other. Vasteloavend parade in soft focus on Maastricht's Vrijthof behind, brass band and confetti drifting through the air. Joyful festive expression, daytime sun on cobblestone, energetic mood. Slight film grain, mood: vasteloavend, jonges.

## 7. Universele NPC

**File:** `/public/images/stadskind-van-niemand.jpg` _(filename keeps the original ID)_

> Photorealistic editorial portrait, 9:16 vertical, of a 24-year-old Dutch person in a totally nondescript grey hoodie and jeans, deliberately bland forgettable expression, standing in front of a generic bus stop with a Centraal Beheer ad poster on a Hollandse suburban street. Overcast fluorescent daylight, no distinguishing features, no logos, ordinary haircut. Slightly meta self-aware energy. Mood: NPC-meme, voorbijganger.

## 8. Yoga Mompreneur

**File:** `/public/images/yoga-mompreneur.jpg`

> Photorealistic editorial portrait, 9:16 vertical, of a 33-year-old woman with messy bun and Lululemon athleisure, holding a ceramic matcha bowl with a bamboo whisk, standing in front of a Joolz stroller in Amsterdam Vondelpark. Athleisure: high-waist leggings, cropped tank top, oversized linen shirt. Late morning soft light through autumn leaves, healthy glow, manifesting calm energy. Yoga mat rolled at her feet. Mood: zaterdagochtend rituaal, mompreneur.

## 9. Friese Stille

**File:** `/public/images/friese-stille.jpg`

> Photorealistic editorial portrait, 9:16 vertical, of a 62-year-old Frisian man in a navy wool sweater and a flat cap, silently sitting on a weathered wooden bench overlooking the IJsselmeer at golden hour. White porcelain cup of black coffee in his hand. Weathered face, peaceful contemplative expression, no smile but content. Soft Frisian overcast light fading into gold. Reeds in foreground, water and sky in soft gradient behind. Mood: tige tank, klopt.

## 10. Rotterdamse Sjef

**File:** `/public/images/rotterdamse-sjef.jpg`

> Photorealistic editorial portrait, 9:16 vertical, of a 41-year-old man in a Carhartt workwear jacket, weathered Feyenoord cap, and steel-toe boots, standing on a small boat at Rotterdam Maashaven. Industrial backdrop with cranes and Erasmus bridge in soft focus. Direct no-nonsense gaze at camera, sleeves rolled up, hands rough from work. Late afternoon harbor light, gritty editorial mood. Mood: niet lullen, doen.

## 11. Sober Curious

**File:** `/public/images/sober-curious.jpg`

> Photorealistic editorial portrait, 9:16 vertical, of a 28-year-old in a flowy linen shirt and gold hoop earrings, holding a colorful non-alcoholic mocktail with cucumber and edible-flower garnish in a coupe glass. Setting: dim mocktail bar Mr Sun or Sazamba in Amsterdam at night, brass fixtures, dark green velvet booth. Calm content expression, soft mood lighting, slight film grain. Mood: dry January x 12, kalm en bewust.

## 12. Festival-Veteraan-met-Kinderwagen

**File:** `/public/images/festival-veteraan.jpg`

> Photorealistic editorial portrait, 9:16 vertical, of a 35-year-old wearing a stack of festival-bracelets, bucket hat, and a worn Lowlands T-shirt, pushing a Joolz Day stroller with a toddler wearing tiny ear-protectors. Festival camping ground in soft focus behind: tents, string lights, bunting. Small bubble blower in toddler's hand. Late afternoon golden light, joyful but slightly tired expression. Mood: Lowlands met de bakfiets-jaren.

## 13. Crossfit-Boomer

**File:** `/public/images/crossfit-boomer.jpg`

> Photorealistic editorial portrait, 9:16 vertical, of a 55-year-old in CrossFit-branded tee, athletic shorts, and weightlifting shoes, with chalk on hands and a kettlebell at his feet. Background: gritty CrossFit box gym interior with WOD scoreboard on the wall, barbells and bumper plates, polished concrete floor. Intense focused expression, sweat on temple, lean grey-blond hair. Harsh industrial overhead lighting, motion-frozen energy. Mood: PR vandaag, fysio morgen.

---

## Sync-script (run na het droppen van images)

Vanuit project root:

```bash
python3 -c "
import json, os
with open('content/quizzes/welk-nederlands.json', 'r', encoding='utf-8') as f:
    d = json.load(f)
added = []
for a in d['archetypes']:
    if 'image' not in a:
        path = f'public/images/{a[\"id\"]}.jpg'
        if os.path.exists(path):
            a['image'] = f'/images/{a[\"id\"]}.jpg'
            added.append(a['id'])
with open('content/quizzes/welk-nederlands.json', 'w', encoding='utf-8') as f:
    json.dump(d, f, indent=2, ensure_ascii=False)
    f.write('\n')
print(f'Added image field to {len(added)} archetype(s):', added)
"
```

Dit script:
- Loopt langs alle archetypes die nog geen `image`-veld hebben
- Checkt of het bestand fysiek bestaat in `/public/images/`
- Voegt het pad alleen toe als het bestand bestaat — geen broken-image-paden in JSON

Je kunt 'm tussendoor steeds runnen — bv. na elke 3 stills die je gegenereerd hebt — en de result-pages voor die archetypes worden meteen voorzien van hun hero-image.

## Bonus tip

Genereer ze in volgorde van **win-rate × trending-status** (welke archetypes de meeste users gaan zien én delen):

| Prio | Archetype | Reden |
|---|---|---|
| 1 | Bourgondische Boekhouder | Wint 10% van quizzes — meest geziene missing image |
| 2 | Hagenese Hipster | Trending Den Haag-energie, evergreen-meme |
| 3 | Yoga-Mompreneur | 4% win-rate, sterke shareability |
| 4 | Belgisch Geïnfecteerd | 5% win-rate, NL/B grenscultuur trending |
| 5 | Crossfit-Boomer | Hyper-trend, na rebalance hoger |
| 6 | Sober Curious | Gen Z-trend |
| 7 | Festival-Veteraan | Festival-seizoen launch-moment |
| 8 | Universele NPC | Meme-archetype, Insta-grappig |
| 9 | Drentse Rust-Influencer | Visuele charm |
| 10 | Achterhoekse Lezer | BookTok-niche |
| 11 | Limburgse Bourgondiër | Carnaval-hook |
| 12 | Friese Stille | Visuele rust |
| 13 | Rotterdamse Sjef | Regionaal |

Eerste 5 dekken al ~30% van alle quiz-uitkomsten af — dat is de minimale set om "geen lege result-pages meer" te claimen.
