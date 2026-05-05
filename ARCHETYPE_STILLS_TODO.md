# Archetype stills — Nano Banana prompts (resterende 13)

Twaalf archetypes hebben nog geen still op de result-page (en yoga-mompreneur heeft alleen een video, geen still). Deze 13 hieronder, in dezelfde stijl als je bestaande 12 stills.

## Stijl-anker

De bestaande stills zijn **stylized digital oil paintings / painterly editorial caricatures**, niet photorealistic photos. Karakteristiek:

- Painterly digital olieverf, **zichtbare penseelvegen**, subtiel getextureerde achtergrond
- **Lichte caricatuur** — iets grotere kop, expressieve ogen/mond, maar nog steeds herkenbaar als een persoon (geen cartoon)
- **Sterk rim-licht** vanuit één kant, gloeiende rand op kaak/schouder/haar
- **Verzadigde geschilderde achtergrond** in de archetype-kleur (deep navy, magenta, donkergroen, etc.) — soms abstract, soms vage NL-context
- **Levendige kleuren**, hoog contrast, glowing skin highlights
- **9:16 verticaal** portret, 3/4 of upper-body
- Magazine-cover editorial vibe, expressieve persoonlijkheid in één blik

Elke prompt hieronder bevat de basis-stijl al — gewoon in één keer kopiëren in Nano Banana.

## Workflow

1. Genereer alle 13 stills (1 weekend werk)
2. Drop ze in `/public/images/` met de exacte filename
3. Run het sync-script (helemaal onderaan deze doc) — voegt automatisch het `image`-veld toe aan elke archetype in de JSON
4. Commit + push → result-pages krijgen hero-image

---

## 1. Bourgondische Boekhouder

**File:** `/public/images/bourgondische-boekhouder.jpg`

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 42-year-old Dutch man, neatly trimmed brown beard, side-parted hair, slim chino and Tommy Hilfiger polo, gold pinky ring, holding up a glass of rosé as if mid-toast. Background: painterly Brabantse backyard backdrop in deep wine-burgundy and warm amber, abstract glowing dots suggesting LED string lights, hint of wooden overkapping silhouette. Lighting: strong warm rim light from upper-left, golden glow on cheek and shoulder. Expression: confident smirking, slightly raised eyebrow. Mood: vrijdag is heilig.
```

---

## 2. Hagenese Hipster

**File:** `/public/images/hagenese-hipster.jpg`

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 34-year-old Den Haag man, beige fisherman beanie, tortoiseshell glasses, linen shirt under a chunky bouclé cardigan, holding an oat-milk flat white in a beige stoneware cup. Background: deep teal painted backdrop with abstract café window-light hint. Lighting: strong rim light from upper-left, soft golden edge on glasses frame and cardigan ribbing. Expression: slightly self-aware smirk, knowing eyes. Mood: tussen meeting en column.
```

---

## 3. Achterhoekse Lezer

**File:** `/public/images/achterhoekse-academicus.jpg` _(filename keeps the original ID — slug is unchanged)_

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 26-year-old woman, shoulder-length wavy brown hair, oversized cream cable-knit sweater, round wire glasses, holding a Sarah J. Maas paperback flagged with bright pink sticky-notes close to chest. Background: deep dusty-rose painted backdrop with abstract bookshelf-shadow hints. Lighting: warm candlelight rim from her right, glow on cheek and edge of sweater. Expression: cozy content soft smile, eyes lit up. Mood: voor de zoveelste keer ACOTAR.
```

---

## 4. Belgisch Geïnfecteerd

**File:** `/public/images/belgisch-geinfecteerd.jpg`

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 38-year-old Dutch person, corduroy jacket over a knit jumper, wool scarf, holding a Duvel goblet half-full with frothy beer. Background: dark mahogany painted backdrop suggesting Vlaams brasserie wood-paneling, abstract brass-fixture glow. Lighting: warm amber rim from upper-right, golden glow on jaw. Expression: satisfied content smirk, eye glint. Mood: goesting in een waterzooi, allez.
```

---

## 5. Drentse Rust-Influencer

**File:** `/public/images/drentse-trompetterik.jpg` _(filename keeps original ID)_

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 52-year-old in flannel shirt and beanie, weathered face, holding up an iPhone toward camera as if filming an Insta reel, free hand calmly resting in pocket. Background: muted painterly Drents landscape — autumn moestuin, weathered farmhouse silhouette, overcast sky in deep mossgreen and slate. Lighting: soft cool rim light from left, gentle glow on cheekbone. Expression: peaceful smirk, eyes crinkled, unbothered. Mood: rustig oud worden in Drenthe, 13K volgers.
```

---

## 6. Limburgse Bourgondiër

**File:** `/public/images/limburgse-bourgondier.jpg`

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 47-year-old in colorful homemade vasteloavend costume with pompoms and ruffles, dab of face paint on cheeks, holding a plastic cup of beer aloft mid-toast. Background: deep magenta and gold painted backdrop with abstract carnival-confetti dots and brass-band warm glow. Lighting: strong warm rim from below-left, festive bottom-up glow on chin. Expression: mouth open mid-laugh, eyes squeezed shut with joy. Mood: vasteloavend, jonges.
```

---

## 7. Universele NPC

**File:** `/public/images/stadskind-van-niemand.jpg` _(filename keeps original ID)_

```
Stylized digital oil painting, painterly editorial caricature illustration with bold visible brushwork but deliberate blandness — minimal rim lighting, low-saturation painted backdrop, single character upper body, 9:16 vertical portrait, deliberately flat editorial vibe, dull color palette, no glowing skin highlights. Subject: 24-year-old Dutch person in a generic grey hoodie and plain jeans, totally average forgettable face, no distinguishing features, ordinary mid-length brown hair, blank neutral expression staring straight ahead. Background: pale grey-beige flat painted backdrop, slight texture, no detail. Lighting: deliberately flat from above, no rim glow, no drama, slightly underexposed. Expression: dead-eye neutral, completely empty. Mood: NPC-meme, gewoon iemand.
```

---

## 8. Yoga Mompreneur

**File:** `/public/images/yoga-mompreneur.jpg`

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 33-year-old woman with messy bun and Lululemon high-neck activewear, holding up a ceramic matcha bowl with bamboo whisk visible, gold delicate necklace, healthy glow. Background: soft sage-green painted backdrop with abstract Vondelpark autumn-leaf hints and Joolz stroller silhouette in soft focus. Lighting: warm morning rim from upper-right, glow on hairline and cheek. Expression: calm content smile, manifesting energy. Mood: zaterdagochtend rituaal.
```

---

## 9. Friese Stille

**File:** `/public/images/friese-stille.jpg`

```
Stylized digital oil painting, painterly editorial caricature illustration with restrained brushwork and minimal exaggeration, soft rim lighting from one side, saturated painted backdrop, single character 3/4 length, 9:16 vertical portrait, quiet contemplative magazine-cover editorial vibe, restrained color palette, gentle skin highlights. Subject: 62-year-old Frisian man in a navy wool sweater and flat cap, weathered lined face, holding a white porcelain cup of black coffee close to chest. Background: deep slate-blue painted backdrop suggesting overcast IJsselmeer sky and water, hint of reeds. Lighting: cool soft rim from left, gentle highlight on the lined cheek. Expression: silent contemplative, no smile, peaceful unhurried eyes. Mood: tige tank, klopt.
```

---

## 10. Rotterdamse Sjef

**File:** `/public/images/rotterdamse-sjef.jpg`

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 41-year-old man in a Carhartt workwear jacket, weathered Feyenoord cap, sleeves rolled up showing weathered tattoo'd forearm, work-rough hands. Background: deep industrial-orange painted backdrop with abstract Rotterdam haven cranes and Erasmus bridge silhouette in soft focus. Lighting: cool-warm split rim — cool blue from left, warm orange from right. Expression: direct no-nonsense gaze straight at camera, slight knowing smirk. Mood: niet lullen, doen.
```

---

## 11. Sober Curious

**File:** `/public/images/sober-curious.jpg`

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 28-year-old in a flowy linen shirt with gold hoop earrings and delicate gold chain, holding a coupe-glass mocktail with cucumber slice and an edible-flower garnish, mocktail visibly non-alcoholic. Background: dim painted mocktail-bar backdrop in deep emerald and brass tones, abstract suggestion of brass-fixture glow and dried-flowers vase. Lighting: warm rim from right, golden edge on jaw and earring. Expression: calm content soft smile, knowing eyes, kind. Mood: dry january x 12.
```

---

## 12. Festival-Veteraan-met-Kinderwagen

**File:** `/public/images/festival-veteraan.jpg`

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 35-year-old wearing a thick stack of festival-bracelets on one wrist, bucket hat with festival-pin, worn Lowlands T-shirt, both hands gripping a Joolz Day stroller handlebar with a toddler in tiny ear-protectors visible at the bottom edge of frame. Background: painterly festival-camp at sunset — tents in soft focus, abstract string-light dots, warm dusty-orange sky. Lighting: strong warm rim from upper-left, golden glow on hat brim and shoulders. Expression: joyful but slightly tired half-smile, eyes warm. Mood: Lowlands met de bakfiets-jaren.
```

---

## 13. Crossfit-Boomer

**File:** `/public/images/crossfit-boomer.jpg`

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 55-year-old in a CrossFit-branded tee, athletic shorts, chalk-dusted hands holding a kettlebell handle at hip-level, lean grey-blond cropped hair, sweat-shine on temple. Background: dark gritty painted CrossFit-box backdrop in deep charcoal and rust, abstract WOD-board chalk-marks and barbell silhouettes. Lighting: harsh top-down industrial rim, sweat-highlights on shoulder and temple. Expression: intense focused stare straight at camera, jaw set. Mood: PR vandaag, fysio morgen.
```

---

## 14. Marie van HR (NIEUW)

**File:** `/public/images/marie-van-hr.jpg`

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 35-year-old Dutch woman, sleek low ponytail, tailored cream blazer over a silk navy blouse, gold delicate necklace, holding a navy "Even een touchpoint?"-mug close to chest. Background: deep navy painted backdrop with abstract suggestion of an open MacBook screen and a Peloton bike outline in soft focus. Lighting: cool corporate rim light from upper left, soft sky-blue glow on shoulder. Expression: warm-but-pushy reassuring smile, eyes slightly tilted in active-listening pose. Mood: ik leef voor cultuur en verbinding.
```

---

## 15. De IT'er (NIEUW)

**File:** `/public/images/de-iter.jpg`

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 32-year-old Dutch man, three-day beard, round metal-frame glasses, dark grey Patagonia fleece vest over a black graphic tee that reads "RTFM", holding a mechanical RGB-keyboard horizontally in front of chest. Background: deep purple-magenta painted backdrop with abstract suggestion of three glowing monitors and an ergonomic chair silhouette. Lighting: cool blue-purple rim from below-left, RGB-glow accents on his glasses. Expression: tired but smug, slight knowing smirk. Mood: deze meeting had een mail kunnen zijn.
```

---

## 16. Bodywarmer Henk (NIEUW)

**File:** `/public/images/bodywarmer-henk.jpg`

```
Stylized digital oil painting, painterly editorial caricature illustration with subtle exaggeration of features and bold visible brushwork, strong rim lighting from one side, saturated painted backdrop, single character upper body or 3/4 length, 9:16 vertical portrait, magazine-cover editorial vibe, vivid color palette, glowing skin highlights. Subject: 52-year-old Dutch man, weathered cheeks, navy fleece bodywarmer (gilet) over a grey fleece sweater, faded Schiermonnikoog cap, holding a worn Albert Heijn shopper bag in one hand, other hand tucked into bodywarmer pocket. Background: deep autumn-green painted backdrop with abstract suggestion of a campsite caravan and a barbecue silhouette. Lighting: warm orange rim light from upper-right, golden glow on cap brim. Expression: relaxed knowing smirk, dad-energy stare. Mood: effe niet, ik ben aan het barbecueën.
```

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
- Voegt het pad alleen toe als het bestand er is — geen broken-image-paden in JSON

Run 'm tussendoor steeds, bv. na elke 2-3 stills die je gegenereerd hebt — die archetype-pages zijn dan meteen voorzien.

## Volgorde-aanbeveling

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

Eerste 5 dekken ~30% van alle quiz-uitkomsten af.
