# Changelog

This file records meaningful product and implementation changes to Zìmài. Dates use YYYY-MM-DD.

## 2026-09-25

### Added

- Expanded the library from four to eight word-family maps: 好, 家, 小, and 水 join 学, 电, 人, and 看.
- Expanded the library from eight to sixteen maps with beginner-friendly anchors: 吃, 去, 上, 下, 开, 来, 说, and 见.
- Added forty provisional Related words across the new families, each with a first example sentence for context practice.
- Added a local-first review schedule with “Needs another look” and “I know it” actions.
- Persisted review intervals, streaks, due dates, and learned-word state in versioned local storage.
- Added example-sentence metadata and audio asset slots to the content model.
- Added example sentences for the current HSK 1 core words.
- Added a reviewed-recording workflow in `public/audio/README.md`.

### Changed

- Shifted the visual system to a cool porcelain, graphite, indigo, and teal palette.
- Made family-card titles lead with the Chinese anchor character and de-emphasize the word “family.”
- Removed the visible “family” descriptor from individual card headings; the card remains accessible as “学 family” to assistive technology.
- Replaced ambiguous audio half-circle marks with clear circular play and stop icons.
- Wired audio playback to prefer `audio.natural` recordings and gracefully fall back to Mandarin speech synthesis.
- Updated the README to describe the current sixteen-family build and backup workflow.
- Added an “In context” sentence layer to the word quick view.

### Verification

- `npm run check` passes.
- `npm test -- --run` passes.
- `npm run build` passes.

### Content note

The new family vocabulary is intentionally marked `Related` until the source list and HSK mappings are formally verified. The current source metadata remains a prototype placeholder.

HSK 1 entries now require at least one example sentence during content validation. The new words remain intentionally marked `Related` until the source list and HSK mappings are formally verified. Native recordings are not bundled yet; the playback pipeline is ready to use them as soon as reviewed assets are supplied.
