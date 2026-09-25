# Changelog

This file records meaningful product and implementation changes to Zìmài. Dates use YYYY-MM-DD.

## 2026-09-25

### Added

- Expanded the library from four to eight word-family maps: 好, 家, 小, and 水 join 学, 电, 人, and 看.
- Expanded the library from eight to sixteen maps with beginner-friendly anchors: 吃, 去, 上, 下, 开, 来, 说, and 见.
- Added forty provisional Related words across the new families, each with a first example sentence for context practice.
- Expanded the library from sixteen to twenty-five maps with daily-life anchors: 喝, 买, 做, 有, 在, 住, 要, 给, and 会.
- Added forty-five provisional Related words across the new families, each with a first example sentence for context practice.
- Added a local-first review schedule with “Needs another look” and “I know it” actions.
- Persisted review intervals, streaks, due dates, and learned-word state in versioned local storage.
- Added example-sentence metadata and audio asset slots to the content model.
- Added example sentences for the current HSK 1 core words.
- Added a reviewed-recording workflow in `public/audio/README.md`.
- Added animated stroke-order sheets and optional tracing practice for every family root character.
- Added the first HSK 2–3 Practice lesson with a daily-life conversation, listening-recall choices, sentence building, and a basic 在 grammar note.
- Added context sentences to the remaining thirty-two extension words so all 125 vocabulary entries now open with an example.
- Added the first verified HSK 2 content slice: seven dedicated families (边, 时, 生, 手, 问, 游, 公) with sixteen HSK 2 words and context sentences.
- Expanded the verified HSK 2 slice to thirteen dedicated families and twenty-eight words, adding daily-life groups for 上, 人, 可, 快, 起, and 车.
- Standardized the library so every family contains at least five connected words; HSK 2 maps now combine verified HSK 2 core words with clearly marked Related extensions when needed.
- Added HSK 2 source metadata and a reproducible source-mirror note so HSK 2 labels are distinguishable from Related extensions.

### Changed

- Shifted the visual system to a cool porcelain, graphite, indigo, and teal palette.
- Made family-card titles lead with the Chinese anchor character and de-emphasize the word “family.”
- Removed the visible “family” descriptor from individual card headings; the card remains accessible as “学 family” to assistive technology.
- Replaced ambiguous audio half-circle marks with clear circular play and stop icons.
- Wired audio playback to prefer `audio.natural` recordings and gracefully fall back to Mandarin speech synthesis.
- Replaced the speech-synthesis fallback with recording-only playback; missing native assets now show a clear pending state.
- Removed the branch connector line from family rows; it was visually noisy and read like an error at mobile widths.
- Added a dedicated Practice destination so the next learning phase has one clear home instead of crowding the family map.
- Updated the README to describe the current twenty-five-family build and backup workflow.
- Added an “In context” sentence layer to the word quick view.
- Added an HSK 2 verified library filter and dynamic HSK level labels on family detail pages.

### Verification

- `npm run check` passes.
- `npm test -- --run` passes.
- `npm run build` passes.

### Content note

The new HSK 2 slice is intentionally narrow: labels were added only to the sixteen words in seven dedicated families after checking their membership in the HSK 2.0 exclusive list. The larger existing collection remains a prototype HSK 1/Related set and is not automatically promoted.

All vocabulary entries now require at least one complete example sentence during content validation. The new words remain intentionally marked `Related` until the source list and HSK mappings are formally verified. Native recordings are not bundled yet; the recording-only pipeline is ready to use them as soon as reviewed assets are supplied.
