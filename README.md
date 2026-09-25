# 字脉 / Zìmài

Zìmài is an iPad-first visual browser for Mandarin word families. The current vertical slice is a local-first React + TypeScript + Vite app with twenty-five curated prototype maps: 学, 电, 人, 看, 好, 家, 小, 水, 吃, 去, 上, 下, 开, 来, 说, 见, 喝, 买, 做, 有, 在, 住, 要, 给, and 会.

The product direction is to grow from a calm HSK 1 foundation toward HSK 6 through connected word families, natural audio, example sentences, and spaced review. New vocabulary remains explicitly marked as `Related` until its source and HSK level are verified.

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

Content lives in [`src/content/content.json`](src/content/content.json), separate from the map components. Words can now carry future HSK 1–9 labels, example sentences, and natural/slow audio asset slots. The HSK source metadata is intentionally a placeholder and every `Related` word has an explicit extension reason. Before release, replace the placeholder source with a licensed, versioned vocabulary list and reconcile every label.

User state is stored separately from immutable content in versioned local storage (`zimai-library-v1`). Audio is now recording-only: a reviewed native asset plays when `audio.natural` is present, and items without one remain visibly pending instead of using browser speech synthesis. Recording placement and review guidance live in [`public/audio/README.md`](public/audio/README.md).

## Change tracking and backups

The GitHub repository is the source-of-truth backup for the project:

https://github.com/LenguajeLabs-design/zimai-mandarin

The `main` branch deploys automatically to GitHub Pages through `.github/workflows/deploy-pages.yml`. Meaningful changes should be documented in [`CHANGELOG.md`](CHANGELOG.md), checked with `npm run check`, `npm test`, and `npm run build`, then committed and pushed to `origin/main`.
