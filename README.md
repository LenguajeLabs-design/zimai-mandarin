# 字脉 / Zìmài

Zìmài is an iPad-first visual browser for Mandarin word families. The current vertical slice is a local-first React + TypeScript + Vite app with twenty-five HSK 1 prototype maps plus thirteen dedicated HSK 2 maps: 边, 时, 生, 手, 问, 游, 公, 上, 人, 可, 快, 起, and 车. It also includes the first HSK 2–3 Practice lesson: a daily-life conversation, listening-recall shell, sentence builder, and grammar note built around 在.

The product direction is to grow from a calm HSK 1 foundation toward HSK 6 through connected word families, natural audio, example sentences, and spaced review. New vocabulary remains explicitly marked as `Related` until its source and HSK level are verified.

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

User state is stored separately from immutable content in versioned local storage (`zimai-library-v1`). Audio is now recording-only: a reviewed native asset plays when `audio.natural` is present, and items without one remain visibly pending instead of using browser speech synthesis. Recording placement and review guidance live in [`public/audio/README.md`](public/audio/README.md).

The first HSK 2–3 practice slice lives in [`src/content/practice.json`](src/content/practice.json) and is intentionally small. It provides the interaction model for daily-life conversations, listening recall, sentence building, and basic grammar before more scenes and reviewed native recordings are added.

The first HSK 2 content set now includes twenty-eight words in thirteen dedicated families. Labels are only applied to words in those source-backed families. The official HSK 2 syllabus is recorded in the content source metadata; exact exclusive-word membership is cross-checked against the reproducible HSK 2.0 mirror documented there. The official workbook reference remains available for a later licensing and reconciliation pass.

## Change tracking and backups

The GitHub repository is the source-of-truth backup for the project:

https://github.com/LenguajeLabs-design/zimai-mandarin

The `main` branch deploys automatically to GitHub Pages through `.github/workflows/deploy-pages.yml`. Meaningful changes should be documented in [`CHANGELOG.md`](CHANGELOG.md), checked with `npm run check`, `npm test`, and `npm run build`, then committed and pushed to `origin/main`.
