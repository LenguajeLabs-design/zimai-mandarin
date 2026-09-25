import { useCallback, useRef, useState } from 'react'

export function useAudio() {
  const [playingKey, setPlayingKey] = useState<string | null>(null)
  const [audioMessage, setAudioMessage] = useState<string | null>(null)
  const nativeAudioRef = useRef<HTMLAudioElement | null>(null)
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const play = useCallback((key: string, text: string, audioUrl?: string) => {
    setAudioMessage(null)
    nativeAudioRef.current?.pause()
    nativeAudioRef.current = null
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    speechUtteranceRef.current = null

    if (!audioUrl || typeof window === 'undefined') {
      if (typeof window === 'undefined' || !('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
        setAudioMessage('Audio preview is not available in this browser yet.')
        return
      }

      const speech = new SpeechSynthesisUtterance(text)
      const mandarinVoice = window.speechSynthesis.getVoices().find((voice) => /^(zh|cmn)(-|_)/i.test(voice.lang) || /mandarin|chinese/i.test(voice.name))
      if (mandarinVoice) speech.voice = mandarinVoice
      speech.lang = mandarinVoice?.lang ?? 'zh-CN'
      speech.rate = 0.86
      speech.pitch = 1
      speech.onstart = () => setPlayingKey(key)
      speech.onend = () => {
        if (speechUtteranceRef.current !== speech) return
        speechUtteranceRef.current = null
        setPlayingKey(null)
      }
      speech.onerror = (event) => {
        if (speechUtteranceRef.current !== speech || event.error === 'canceled') return
        speechUtteranceRef.current = null
        setPlayingKey(null)
        setAudioMessage('The device voice preview could not play. Please check your browser audio settings.')
      }
      speechUtteranceRef.current = speech
      window.speechSynthesis.speak(speech)
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
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    speechUtteranceRef.current = null
    setPlayingKey(null)
  }, [])

  return { playingKey, audioMessage, onPlay: play, onStop: stop }
}
