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
      title={label ?? `Play audio for ${text}`}
      onClick={() => (isPlaying ? onStop() : onPlay(audioKey, text))}
    >
      <span aria-hidden="true">{isPlaying ? '■' : '◖'}</span>
      {!compact && <span>{isPlaying ? 'Playing' : 'Hear it'}</span>}
    </button>
  )
}
