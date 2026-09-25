# Changelog

This file records meaningful product and implementation changes to Zìmài. Dates use YYYY-MM-DD.

## 2026-09-25

### Added

- Expanded the library from four to eight word-family maps: 好, 家, 小, and 水 join 学, 电, 人, and 看.
- Added a local-first review schedule with “Needs another look” and “I know it” actions.
- Persisted review intervals, streaks, due dates, and learned-word state in versioned local storage.

### Changed

- Shifted the visual system to a cool porcelain, graphite, indigo, and teal palette.
- Made family-card titles lead with the Chinese anchor character and de-emphasize the word “family.”
- Removed the visible “family” descriptor from individual card headings; the card remains accessible as “学 family” to assistive technology.
- Replaced ambiguous audio half-circle marks with clear circular play and stop icons.
- Updated the README to describe the current eight-family build and backup workflow.

### Verification

- `npm run check` passes.
- `npm test -- --run` passes.
- `npm run build` passes.

### Content note

The new family vocabulary is intentionally marked `Related` until the source list and HSK mappings are formally verified. The current source metadata remains a prototype placeholder.
