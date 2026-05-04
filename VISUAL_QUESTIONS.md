# Visuele vragen — Nano Banana prompts

Zes hoog-leverage visuele vragen voor de quiz, elk met 4 image-opties (24 stills totaal).

## Hoe deze doc gebruiken

1. Genereer alle 4 stills per vraag in Nano Banana met de prompts hieronder.
2. Drop ze in `/public/q/<slug>/<naam>.jpg` (de paden staan al goed in de JSON-snippets).
3. Plak het JSON-blok van die vraag in `content/quizzes/welk-nederlands.json` onderaan de `questions`-array (vóór de afsluitende `]`). Vergeet de komma niet.
4. Zodra een vraag in de JSON staat én alle 4 images bestaan, valt 'ie automatisch in de pool van 30 lifestyle-vragen waaruit de quiz random 6 trekt. Render-kant detecteert visuele opties zelf — geen extra config.

**Aspect ratio voor alle stills: 1:1 vierkant, 1024×1024.**
**Look & feel: editorial photo, lichtelijk filmische korrel, daglicht of zacht avondlicht, NL-context herkenbaar.**

---

## Vraag 1 · "Welke avond eindigt voor jou hier?"

**ID:** `q61_visual_avond`
**Slug folder:** `/public/q/welke-avond/`
**Disambigueert:** Padel-Pa vs Crossfit-Boomer vs Sober Curious vs Kringloop-Koningin

### A. Padel-baan met biertjes — `padel.jpg`

> Photorealistic editorial photo of a Dutch indoor padel club at golden hour, two men in their mid-30s in athletic wear holding glasses of pilsner beer at a wooden bench, padel rackets and a bag of yellow padel balls beside them, glass-walled court in soft background, warm afternoon light through the windows, slight film grain, square 1:1 composition, mood: lekker spelen na werk, Amsterdam-Zuid sport club aesthetic.

### B. CrossFit-box na een wod — `crossfit.jpg`

> Photorealistic editorial photo of a Dutch CrossFit gym interior just after a workout, athlete in their late 30s sitting on a black plyo box wiping forehead with a chalked hand, kettlebells, barbells with bumper plates, and a rower visible behind, harsh industrial overhead lighting on polished concrete floor, sweat on temple, intense and gritty mood, square 1:1, Rotterdam or Utrecht CrossFit affiliate aesthetic.

### C. Mocktail-bar Amsterdam — `mocktail.jpg`

> Photorealistic editorial photo of a stylish Amsterdam mocktail bar at night, customer in their late 20s holding a colorful non-alcoholic drink with cucumber and edible flower garnish, dim warm mood lighting, brass fixtures and dark green velvet, Pulitzer Hotel or Mr Sun bar aesthetic, square 1:1, mood: sober curious avond, conscious-but-fun energy.

### D. Kringloop-vondst op Insta — `kringloop.jpg`

> Photorealistic editorial photo of a young Dutch person in their late 20s in front of an Amsterdam kringloop store interior holding up a vintage thrifted leather jacket to their smartphone camera, racks of second-hand clothes and old vinyl in background, natural daylight from the front window, casual oversized outfit, square 1:1, mood: kringloop-vondst voor insta, vintage-curated energy.

### JSON-snippet

```json
{
  "id": "q61_visual_avond",
  "prompt": "Welke avond eindigt voor jou hier?",
  "subtitle": "Foto's, geen woorden — kies de scene die het meest klopt.",
  "lifestyle": true,
  "options": [
    {
      "label": "Padel-baan met biertjes",
      "image": "/q/welke-avond/padel.jpg",
      "tags": { "generation": 1980, "region": "hollands", "register": "informeel", "vibe": "sport" }
    },
    {
      "label": "CrossFit-box na de wod",
      "image": "/q/welke-avond/crossfit.jpg",
      "tags": { "generation": 1985, "register": "informeel", "vibe": "sport" }
    },
    {
      "label": "Mocktail-bar in Amsterdam",
      "image": "/q/welke-avond/mocktail.jpg",
      "tags": { "generation": 1992, "region": "noord-holland", "register": "informeel", "vibe": "wellness" }
    },
    {
      "label": "Kringloop-vondst voor de gram",
      "image": "/q/welke-avond/kringloop.jpg",
      "tags": { "generation": 1995, "region": "hollands", "register": "informeel", "vibe": "vintage" }
    }
  ]
}
```

---

## Vraag 2 · "Welke koffie ben jij?"

**ID:** `q62_visual_koffie`
**Slug folder:** `/public/q/welke-koffie/`
**Disambigueert:** Yoga-Mompreneur / Bakfiets-Ouder vs no-nonsense werknemer vs Hagenese Hipster vs Boomer

### A. Oat-flat-white Lola Bikes — `oat-flat-white.jpg`

> Photorealistic close-up of a beige stoneware cup with a perfectly poured oat-milk flat white, latte art tulip visible, on a reclaimed-wood counter in an Amsterdam specialty coffee shop (Lola Bikes & Coffee or White Label aesthetic), sunlight from large windows, plants and a bicycle wheel softly out of focus in background, square 1:1, mood: bewuste ochtend-koffie.

### B. Automaat op het werk — `automaat.jpg`

> Photorealistic close-up of a plain white plastic cup with watery brown coffee being filled at a Selecta or Douwe Egberts office vending machine, fluorescent corporate office lighting, beige carpet edge and grey wall partition visible, mundane and unromantic, square 1:1, mood: gewoon koffie van het werk, Dutch kantoor aesthetic.

### C. Espresso in Italiaans café — `espresso.jpg`

> Photorealistic editorial photo of a tiny white espresso cup with crema-topped dark espresso on a saucer with a small biscotti, marble counter, vintage chrome lever espresso machine in soft background, late afternoon warm window light, Den Haag Italian café aesthetic, square 1:1, mood: klein bakkie zwart, refined cultural energy.

### D. Senseo bij ma — `senseo.jpg`

> Photorealistic photo of a black Philips Senseo coffee machine on a granite kitchen counter in a typical 2010s Dutch suburban kitchen, two round coffee pads beside it, beige curtains and an embroidered wall calendar in soft focus, late morning daylight, slightly outdated homely interior, square 1:1, mood: koffietje bij ma in Veenendaal.

### JSON-snippet

```json
{
  "id": "q62_visual_koffie",
  "prompt": "Welke koffie ben jij?",
  "subtitle": "Een ochtend zegt veel.",
  "lifestyle": true,
  "options": [
    {
      "label": "Oat-flat-white bij de specialty coffee",
      "image": "/q/welke-koffie/oat-flat-white.jpg",
      "tags": { "generation": 1992, "region": "hollands", "register": "informeel", "vibe": "bewust" }
    },
    {
      "label": "Automaatkoffie van het werk",
      "image": "/q/welke-koffie/automaat.jpg",
      "tags": { "generation": 1975, "register": "neutraal", "vibe": "no-nonsense" }
    },
    {
      "label": "Espresso in een Italiaans café",
      "image": "/q/welke-koffie/espresso.jpg",
      "tags": { "generation": 1982, "region": "zuid-holland", "register": "informeel", "vibe": "cultureel" }
    },
    {
      "label": "Senseo bij ma",
      "image": "/q/welke-koffie/senseo.jpg",
      "tags": { "generation": 1965, "region": "hollands", "register": "informeel", "vibe": "vintage" }
    }
  ]
}
```

---

## Vraag 3 · "Welke fiets staat in jouw schuur?"

**ID:** `q63_visual_fiets`
**Slug folder:** `/public/q/welke-fiets/`
**Disambigueert:** Bakfiets-Ouder vs Fatbike-Tiener vs Padel-Pa/Run-Club vs Universele NPC. **Killer-vraag** — fiets = identiteit in NL.

### A. Bakfiets Urban Arrow — `bakfiets.jpg`

> Photorealistic editorial photo of an Urban Arrow bakfiets parked on the sidewalk outside an Amsterdam Marqt or Albert Heijn To Go, child's helmet hanging on the steering, two reusable canvas tote bags clipped to the handlebars, kid's drawings stuck to the front cargo box, warm afternoon light, soft urban Oud-Zuid background, square 1:1, mood: school-run stop, conscious parent energy.

### B. Fatbike bij McDonald's — `fatbike.jpg`

> Photorealistic editorial photo of a black fatbike with chunky knobby tires and a visible electric battery parked outside a McDonald's or Domino's at dusk, neon signage reflecting off the glossy paint, no helmet visible, bag of fast food in the front basket, gritty Dutch suburban street, square 1:1, mood: fatbike-jongen, slightly rebellious teen energy.

### C. Carbon racefiets bij de Amstel — `racefiets.jpg`

> Photorealistic editorial photo of a high-end carbon road bike (Pinarello or Cervelo style) leaning against a tree along the Amstel river, full Castelli Lycra kit and helmet on the grass beside it, Garmin computer mounted on the handlebars, golden-hour Dutch polder light with cows in soft distant focus, square 1:1, mood: zondagochtend rondje van 80 km, serious cyclist energy.

### D. Omafiets met kratje — `omafiets.jpg`

> Photorealistic photo of a classic black Dutch omafiets with woven front basket holding a paper bag of fresh bread and a baguette sticking out, crocheted seat cover, leaning against a brick wall in a typical Dutch suburban street, soft afternoon light, square 1:1, mood: gewoon naar de bakker, neutral everyday energy.

### JSON-snippet

```json
{
  "id": "q63_visual_fiets",
  "prompt": "Welke fiets staat in jouw schuur?",
  "subtitle": "Fiets = identiteit. Kies eerlijk.",
  "lifestyle": true,
  "options": [
    {
      "label": "Bakfiets Urban Arrow",
      "image": "/q/welke-fiets/bakfiets.jpg",
      "tags": { "generation": 1988, "region": "noord-holland/utrecht", "register": "informeel", "vibe": "bewust" }
    },
    {
      "label": "Fatbike bij McDonald's",
      "image": "/q/welke-fiets/fatbike.jpg",
      "tags": { "generation": 2010, "region": "noord-holland", "register": "straat", "vibe": "rauw" }
    },
    {
      "label": "Carbon racefiets",
      "image": "/q/welke-fiets/racefiets.jpg",
      "tags": { "generation": 1980, "region": "hollands", "register": "informeel", "vibe": "sport" }
    },
    {
      "label": "Omafiets met kratje",
      "image": "/q/welke-fiets/omafiets.jpg",
      "tags": { "generation": 1990, "register": "neutraal", "vibe": "huiselijk" }
    }
  ]
}
```

---

## Vraag 4 · "Welk huiselijk moment is jouw zaterdag?"

**ID:** `q64_visual_zaterdag`
**Slug folder:** `/public/q/zaterdag/`
**Disambigueert:** Bourgondische-Boekhouder vs Yoga-Mompreneur vs Limburgse-Bourgondiër vs Drentse-Rust-Influencer

### A. Borrelplankje LED-tuin — `borrelplankje.jpg`

> Photorealistic editorial photo of a Dutch suburban backyard at dusk in Brabant or Limburg, wooden picnic table set with a generous borrelplankje (cheese cubes, droge worst, olives, mosterd dipsaus), warm LED string lights overhead and embedded under a wooden overkapping, glasses of rosé and pilsner, group of laughing 40-somethings just out of focus in background, square 1:1, mood: gezellig zaterdagavond bij ons, Brabantse warmth.

### B. Macha-ceremonie aanrecht — `macha.jpg`

> Photorealistic photo of a modern minimalist Dutch kitchen counter at morning, bamboo macha whisk and small ceramic green-tea bowl with frothy bright-green matcha, jar of organic ceremonial-grade matcha powder, sliced lemon on a wooden board, a Joolz teether off to the side suggesting a small child, soft white sunlight from large windows, Scandi-Dutch interior, square 1:1, mood: zaterdagochtend rituaal, mompreneur energy.

### C. Vasteloavend Maastricht — `vasteloavend.jpg`

> Photorealistic editorial photo of a vasteloavend (carnaval) parade in Maastricht, group of revelers in colorful homemade costumes and face paint cheering with plastic cups of beer, brass band marching past in vintage uniforms, daytime sun on cobblestone Vrijthof, festive joyful chaos, square 1:1, mood: vasteloavend, Limburgse carnival energy.

### D. Drents tuintje — `drenthe.jpg`

> Photorealistic editorial photo of a quiet small backyard in a Drenthe or Groningen village, simple weathered wooden bench, white porcelain cup of black coffee on a saucer, an open Dagblad van het Noorden newspaper folded beside, beuken-haag with autumn leaves, soft overcast Dutch northern daylight, peaceful and bare, square 1:1, mood: kalm an, no-nonsense rust.

### JSON-snippet

```json
{
  "id": "q64_visual_zaterdag",
  "prompt": "Welk huiselijk moment is jouw zaterdag?",
  "subtitle": "Geen goed of fout — kies welke hier het meest jou is.",
  "lifestyle": true,
  "options": [
    {
      "label": "Borrelplankje + LED-strips in de tuin",
      "image": "/q/zaterdag/borrelplankje.jpg",
      "tags": { "generation": 1980, "region": "noord-brabant/limburg", "register": "informeel", "vibe": "huiselijk" }
    },
    {
      "label": "Macha-ceremonie op het aanrecht",
      "image": "/q/zaterdag/macha.jpg",
      "tags": { "generation": 1990, "region": "hollands", "register": "informeel", "vibe": "wellness" }
    },
    {
      "label": "Vasteloavend in Maastricht",
      "image": "/q/zaterdag/vasteloavend.jpg",
      "tags": { "generation": 1975, "region": "limburg", "register": "dialect", "vibe": "huiselijk" }
    },
    {
      "label": "Stille middag in een Drents tuintje",
      "image": "/q/zaterdag/drenthe.jpg",
      "tags": { "generation": 1965, "region": "drenthe/noord", "register": "dialect", "vibe": "no-nonsense" }
    }
  ]
}
```

---

## Vraag 5 · "Wat ligt op je nachtkastje?"

**ID:** `q65_visual_nachtkastje`
**Slug folder:** `/public/q/nachtkastje/`
**Disambigueert:** Achterhoekse-Lezer vs Skibidi/GRWM-Kid vs oude generaties vs Hagenese Hipster. **Intieme micro-tell** — kraakt veel signaal in één scene.

### A. Sarah J. Maas + sticky notes — `booktok.jpg`

> Photorealistic close-up of a cozy bedroom nightstand under soft golden bedside-lamp light, a stack of three Sarah J. Maas paperbacks (A Court of Thorns and Roses series, covers visible) flagged with bright pink and yellow sticky-notes for spicy chapters, a lavender-scented candle burning, AirPods Max headphones on the side, square 1:1, mood: BookTok-routine, cozy reader energy.

### B. iPad TikTok For You — `ipad.jpg`

> Photorealistic photo of a teen bedroom at night with an iPad propped on a nightstand showing a glowing TikTok For You Page feed, K-pop and gaming posters in soft bokeh on the wall behind, blue screen-light glow on dark blue bedding, wired earbuds tangled, square 1:1, mood: in bed scrollen tot 02:00, Gen Z late-night energy.

### C. Cassetterecorder + briefblok — `cassette.jpg`

> Photorealistic photo of a wooden mid-century nightstand with a beige 1980s cassette tape recorder, a hardback library book with a fabric bookmark sticking out, gold-rimmed reading glasses, vintage analog Westclox alarm clock with twin bells, warm yellow lamplight from a fringed lampshade, square 1:1, mood: tape opzetten voor het slapen, boomer bedroom energy.

### D. Bose-koptelefoon + Substack — `bose.jpg`

> Photorealistic editorial photo of a sleek minimalist nightstand in a Den Haag apartment, dark grey Bose QuietComfort Ultra headphones, a freshly printed Substack newsletter on cream paper with a small coffee ring, a Lamy fountain pen, an Aesop bedside lamp, dark muted color palette with brushed brass accents, square 1:1, mood: long-form lezen voor het slapen, Hagenese Hipster energy.

### JSON-snippet

```json
{
  "id": "q65_visual_nachtkastje",
  "prompt": "Wat ligt op je nachtkastje?",
  "subtitle": "Het verraadt meer dan je denkt.",
  "lifestyle": true,
  "options": [
    {
      "label": "Sarah J. Maas met sticky notes",
      "image": "/q/nachtkastje/booktok.jpg",
      "tags": { "generation": 1995, "region": "achterhoek/gelderland", "register": "informeel", "vibe": "cultureel" }
    },
    {
      "label": "iPad met TikTok open",
      "image": "/q/nachtkastje/ipad.jpg",
      "tags": { "generation": 2010, "register": "straat", "vibe": "online" }
    },
    {
      "label": "Cassetterecorder en een briefblok",
      "image": "/q/nachtkastje/cassette.jpg",
      "tags": { "generation": 1955, "register": "formeel", "vibe": "vintage" }
    },
    {
      "label": "Bose-koptelefoon + uitgeprinte Substack",
      "image": "/q/nachtkastje/bose.jpg",
      "tags": { "generation": 1988, "region": "zuid-holland", "register": "informeel", "vibe": "cultureel" }
    }
  ]
}
```

---

## Vraag 6 · "Welke supermarkt is jouw thuisbasis?"

**ID:** `q66_visual_supermarkt`
**Slug folder:** `/public/q/supermarkt/`
**Disambigueert:** AI-Bestie/online-archetypes vs Friese-Stille vs Brabantse-archetypes vs Bakfiets-Ouder

### A. AH To Go Centraal — `ah-to-go.jpg`

> Photorealistic editorial photo of an Albert Heijn To Go interior at Amsterdam Centraal Station, young commuter in their late 20s grabbing a Tony's Chocolonely bar and a Maaltijdsalade in plastic, fluorescent retail lighting, station hustle and yellow-blue NS signage softly out of focus through the window, square 1:1, mood: snelle pickup voor de trein, hyper-urban energy.

### B. Lidl Drachten — `lidl.jpg`

> Photorealistic editorial photo of a Lidl supermarket parking lot in a Friesland small town like Drachten, regional shopper in their 50s loading a car trunk with bags of groceries, Frisian flag visible on a building in background, pragmatic no-fuss energy, overcast Dutch northern sky, square 1:1, mood: grote weekboodschap, sober pragmatisme.

### C. Plus in Tilburg — `plus.jpg`

> Photorealistic photo of a Plus supermarket interior in Tilburg, friendly cashier in green Plus uniform chatting with a customer at the register, comforting warm fluorescent light, shelves of Limburgse vlaai and Brabantse worstenbroodjes visible nearby, square 1:1, mood: eerst even bij Plus, Brabantse warmth and community.

### D. Marqt Westerstraat — `marqt.jpg`

> Photorealistic editorial photo of a Marqt supermarket interior on the Westerstraat in Amsterdam, shopper in their early 30s in linen and trail-running shoes holding a glass kombucha bottle and a sourdough loaf in a paper bag, exposed brick walls and wooden produce crates, daylight from large front windows, premium organic vibe, square 1:1, mood: bewust boodschappen, conscious consumer energy.

### JSON-snippet

```json
{
  "id": "q66_visual_supermarkt",
  "prompt": "Welke supermarkt is jouw thuisbasis?",
  "subtitle": "Waar je wekelijks eindigt.",
  "lifestyle": true,
  "options": [
    {
      "label": "AH To Go op Centraal",
      "image": "/q/supermarkt/ah-to-go.jpg",
      "tags": { "generation": 1995, "region": "noord-holland", "register": "informeel", "vibe": "online" }
    },
    {
      "label": "Lidl in Drachten",
      "image": "/q/supermarkt/lidl.jpg",
      "tags": { "generation": 1970, "region": "friesland/noord", "register": "dialect", "vibe": "no-nonsense" }
    },
    {
      "label": "Plus in Tilburg",
      "image": "/q/supermarkt/plus.jpg",
      "tags": { "generation": 1980, "region": "noord-brabant", "register": "informeel", "vibe": "huiselijk" }
    },
    {
      "label": "Marqt op de Westerstraat",
      "image": "/q/supermarkt/marqt.jpg",
      "tags": { "generation": 1985, "region": "noord-holland", "register": "informeel", "vibe": "bewust" }
    }
  ]
}
```

---

## Bonus: pre-launch teaser-content

Elke set van 4 stills is gratis Insta/TikTok-content vóór de launch:
- Post de 4 koffie-foto's met *"Welke ben jij? 1, 2, 3 of 4?"* — zwijg over de quiz, alleen de poll.
- Een dag later post je *"Doe nu de hele test op spreekjijnog.nl"*.
- Werkt vooral goed met `welke-fiets` (universele NL-trigger) en `nachtkastje` (intieme reveal).

## Workflow-tip

Genereer per vraag eerst 1 still als test, kijk hoe Nano Banana de "NL-context" pakt. Bij de meeste prompts is de specificiteit ("Drachten", "Maastricht", "Den Haag", "Westerstraat") wat het verschil maakt tussen generic stock-foto en echt-NL-feel. Voeg notities toe als 'editorial photo, slight film grain, 1:1' zodat de stills consistent zijn met de hero-banner.
