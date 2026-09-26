# Zìmài audio assets

## OpenAI voice pilot

The app can use build-time OpenAI TTS assets so iPad, MacBook, and other
devices play the same Mandarin voice instead of relying on each device's
speech-synthesis voice. The API key is read only by the local generation
script; it is never sent to the browser or committed to the repository.

With `OPENAI_API_KEY` set in the local environment:

```bash
npm run audio:generate
```

The default run generates up to the first 20 HSK 1 words currently in the
content set, plus their root characters. After listening and reviewing the pilot,
`npm run audio:generate:all` can generate every HSK 1 word and its roots.
Generated files live under `public/audio/openai/` and are tracked separately
from reviewed native recordings.

Reviewed native recordings can be added here as MP3 or OGG files. The filename should match the word or character `audioKey`, for example:

```text
word-xuesheng.mp3
root-xue.mp3
```

Then add the public path to the matching content item:

```json
"audio": { "natural": "/zimai-mandarin/audio/word-xuesheng.mp3" }
```

Reviewed recordings remain the preferred audio. OpenAI-generated files are a
consistent cross-device voice layer, but should still be checked by a native
Mandarin speaker before being treated as final curriculum audio. If an asset
is missing, the app offers a clearly labeled `Preview voice` control that uses
the browser's Mandarin device voice as a temporary listening aid. If an audio
asset fails to play, the app reports the asset problem instead of silently
substituting another voice.

Before adding a path to content, each file should be:

1. Recorded by a native Mandarin speaker at a natural, conversational pace.
2. Checked against the displayed Hanzi and pinyin by a second reviewer.
3. Trimmed to clean room tone with no identifying or copyrighted background audio.
4. Exported as a small, web-friendly MP3 or OGG and tested from the GitHub Pages base path.

This repository currently contains the intake workflow but no binary recordings yet. Do not mark an item ready until its file has been reviewed and committed alongside the content update.

## Improving the temporary device preview

The browser preview is intentionally a fallback, not a native recording. Browsers can expose the operating system's installed speech voices, and the app waits for that voice list before choosing the strongest Mandarin match. On macOS, try Accessibility → Read & Speak → Speak selection → Voice → Manage Voices and install an enhanced Mandarin voice if one is available. The exact names and quality vary by operating system, browser, and device.
