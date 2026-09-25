# Zìmài audio assets

Reviewed native recordings can be added here as MP3 or OGG files. The filename should match the word or character `audioKey`, for example:

```text
word-xuesheng.mp3
root-xue.mp3
```

Then add the public path to the matching content item:

```json
"audio": { "natural": "/zimai-mandarin/audio/word-xuesheng.mp3" }
```

Reviewed recordings remain the preferred audio. If an asset is missing, the app offers a clearly labeled `Preview voice` control that uses the browser's Mandarin device voice as a temporary listening aid; it does not count as native audio and does not change the content's review status. If a reviewed asset fails to play, the app reports the asset problem instead of silently substituting synthetic speech.

Before adding a path to content, each file should be:

1. Recorded by a native Mandarin speaker at a natural, conversational pace.
2. Checked against the displayed Hanzi and pinyin by a second reviewer.
3. Trimmed to clean room tone with no identifying or copyrighted background audio.
4. Exported as a small, web-friendly MP3 or OGG and tested from the GitHub Pages base path.

This repository currently contains the intake workflow but no binary recordings yet. Do not mark an item ready until its file has been reviewed and committed alongside the content update.
