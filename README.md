# 字脉 / Zìmài

Zìmài is an iPad-first visual browser for Mandarin word families. The current vertical slice is a local-first React + TypeScript + Vite app with twenty-five HSK 1 prototype maps, thirteen dedicated HSK 2 maps, twelve dedicated HSK 3 maps, fourteen dedicated HSK 4 maps, six HSK 5 maps, and seven HSK 6 maps.

The product direction is to grow from a calm HSK 1 foundation toward HSK 6 through connected word families, natural audio, example sentences, and spaced review. New vocabulary remains explicitly marked as `Related` until its source and HSK level are verified.

The visual system now supports a persistent light/dark theme. Dark mode uses a “Midnight Porcelain” palette: `#0B111A` for the page, `#111A27` for elevated surfaces, `#9AAFFF` for the main indigo accent, `#7ED4D5` for related content, and `#F09A87` for warm error states. The palette avoids pure black and keeps the indigo accent soft enough for long study sessions.

Tap any root character to open animated stroke order and an optional tracing practice mode. Stroke data is supplied by the MIT-licensed Hanzi Writer package and its permissively licensed character dataset.

## Run it

```bash
npm install
npm run dev
```

Checks:

```bash
npm run check
npm test
npm run build
```

## GitHub Pages

This repository is configured to deploy from GitHub Actions to:

https://lenguajelabs-design.github.io/zimai-mandarin/

In the repository settings, set `Pages -> Build and deployment -> Source` to `GitHub Actions`.

## Content note

Content lives in [`src/content/content.json`](src/content/content.json), separate from the map components. Every word now requires at least one complete example sentence, alongside future HSK 1–9 labels and natural/slow audio asset slots. The HSK source metadata is intentionally a placeholder and every `Related` word has an explicit extension reason. Before release, replace the placeholder source with a licensed, versioned vocabulary list and reconcile every label.

User state is stored separately from immutable content in versioned local storage (`zimai-library-v1`). Reviewed native audio remains the preferred path: a reviewed asset plays when `audio.natural` is present. Until recordings are added, items expose a clearly labeled Mandarin device-voice preview so the map remains hearable without presenting synthetic speech as native audio. Recording placement and review guidance live in [`public/audio/README.md`](public/audio/README.md).

The former standalone HSK 2–3 practice slice remains in [`src/content/practice.json`](src/content/practice.json) as a prototype for a future family-linked practice flow. It is not exposed as a separate destination until practice is grounded in the family maps.

The first HSK 2 content set now includes twenty-eight verified HSK 2 core words across thirteen dedicated five-word families. Each map also includes Related extensions where the HSK 2 list does not provide five natural compounds; those supporting words remain visibly separate from the verified HSK 2 core. The official HSK 2 syllabus is recorded in the content source metadata; exact exclusive-word membership is cross-checked against the reproducible HSK 2.0 mirror documented there. The official workbook reference remains available for a later licensing and reconciliation pass.

The first HSK 3 content set now includes thirty-three verified HSK 3 core words across twelve dedicated five-word families, each with a context sentence. Related extensions complete the maps without being promoted to HSK 3. The official HSK 3 syllabus and the reproducible HSK 2.0 Level 3 mirror are recorded in the content source metadata.

The first HSK 4 content set now includes forty-nine verified HSK 4 core words across fourteen dedicated five-word families, each with a context sentence. Related extensions complete the maps without being promoted to HSK 4. The official HSK 4 syllabus and the reproducible HSK 2.0 Level 4 mirror are recorded in the content source metadata; this is an initial verified slice, not the complete HSK 4 vocabulary inventory.

The first HSK 5 slice includes twenty-two verified HSK 5 core words across six dedicated five-word families. The first HSK 6 slice includes twenty-eight verified HSK 6 core words across seven dedicated five-word families. Both slices include context sentences and clearly marked Related extensions; their official syllabi and reproducible HSK 2.0 mirrors are recorded in the content source metadata. These are starting points for the broader HSK 5/6 reading, listening, speaking, and summarization curriculum, not complete level inventories.

The HSK reference browser also includes 5,001 words from the HSK东西 2012 HSK 1–6 definition lists. These are kept separate from the curated family-map content so words without a family connection can be surfaced as `Words to explore`. The source permits non-commercial use with attribution; commercial use requires permission. Re-run `npm run content:import:hsk` to refresh the generated reference data after reviewing source terms.

## Change tracking and backups

The GitHub repository is the source-of-truth backup for the project:

https://github.com/LenguajeLabs-design/zimai-mandarin

The `main` branch deploys automatically to GitHub Pages through `.github/workflows/deploy-pages.yml`. Meaningful changes should be documented in [`CHANGELOG.md`](CHANGELOG.md), checked with `npm run check`, `npm test`, and `npm run build`, then committed and pushed to `origin/main`.
