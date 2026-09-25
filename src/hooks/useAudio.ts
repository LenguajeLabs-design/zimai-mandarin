import { useCallback, useRef, useState } from 'react'

export function useAudio() {
  const [playingKey, setPlayingKey] = useState<string | null>(null)
  const [audioMessage, setAudioMessage] = useState<string | null>(null)
  const nativeAudioRef = useRef<HTMLAudioElement | null>(null)

  const play = useCallback((key: string, _text: string, audioUrl?: string) => {
    setAudioMessage(null)
    nativeAudioRef.current?.pause()
    nativeAudioRef.current = null

    if (!audioUrl || typeof window === 'undefined') {
      setAudioMessage('A reviewed native recording is not available for this item yet.')
      return
    }

    const nativeAudio = new Audio(audioUrl)
    nativeAudioRef.current = nativeAudio
    const handleFailure = () => {
      if (nativeAudioRef.current !== nativeAudio) return
        nativeAudioRef.current = null
        setPlayingKey(null)
        setAudioMessage('This reviewed recording could not play. Please check the audio asset.')
    }
    nativeAudio.onplay = () => setPlayingKey(key)
    nativeAudio.onended = () => {
      nativeAudioRef.current = null
      setPlayingKey(null)
    }
    nativeAudio.onerror = handleFailure
    void nativeAudio.play().catch(handleFailure)
  }, [])

  const stop = useCallback(() => {
    nativeAudioRef.current?.pause()
    nativeAudioRef.current = null
    setPlayingKey(null)
  }, [])

  return { playingKey, audioMessage, onPlay: play, onStop: stop }
}
