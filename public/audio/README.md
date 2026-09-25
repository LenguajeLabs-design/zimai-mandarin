# Zìmài audio assets

Reviewed natural recordings can be added here as MP3 or OGG files. The filename should match the word or character `audioKey`, for example:

```text
word-xuesheng.mp3
root-xue.mp3
```

Then add the public path to the matching content item:

```json
"audio": { "natural": "/zimai-mandarin/audio/word-xuesheng.mp3" }
```

The app will prefer that recording and fall back to Mandarin speech synthesis if the asset is unavailable or fails to play. Recordings should be reviewed by a native Mandarin speaker before being marked as ready.
