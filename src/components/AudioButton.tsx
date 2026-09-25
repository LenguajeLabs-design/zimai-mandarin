interface AudioButtonProps {
  audioKey: string
  text: string
  playingKey: string | null
  onPlay: (key: string, text: string) => void
  onStop: () => void
  label?: string
  compact?: boolean
}

export function AudioButton({ audioKey, text, playingKey, onPlay, onStop, label, compact = false }: AudioButtonProps) {
  const isPlaying = playingKey === audioKey
  return (
    <button
      className={`audio-button${compact ? ' audio-button--compact' : ''}${isPlaying ? ' is-playing' : ''}`}
      type="button"
      aria-label={label ?? `Play audio for ${text}`}
      aria-pressed={isPlaying}
      title={label ?? `Play audio for ${text}`}
      onClick={() => (isPlaying ? onStop() : onPlay(audioKey, text))}
    >
      <span className="audio-button__icon" aria-hidden="true">
        {isPlaying ? <svg viewBox="0 0 16 16" focusable="false"><rect x="4" y="4" width="8" height="8" rx="1" /></svg> : <svg viewBox="0 0 16 16" focusable="false"><path d="M5 3.5v9l7.5-4.5L5 3.5Z" /></svg>}
      </span>
      {!compact && <span>{isPlaying ? 'Playing' : 'Hear it'}</span>}
    </button>
  )
}
