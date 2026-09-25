# 字脉 / Zìmài

Zìmài is an iPad-first visual browser for beginner Mandarin word families. The first vertical slice is a local-first React + TypeScript + Vite app with four curated prototype maps: 学, 电, 人, and 看.

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

Content lives in [`src/content/content.json`](src/content/content.json), separate from the map components. The HSK source metadata is intentionally a placeholder and every `Related` word has an explicit extension reason. Before release, replace the placeholder source with a licensed, versioned vocabulary list and reconcile every label.

User state is stored separately from immutable content in versioned local storage (`zimai-library-v1`). Audio uses the browser's Mandarin speech-synthesis fallback in this prototype; reviewed local recordings can be added behind the same `useAudio` interface later.
