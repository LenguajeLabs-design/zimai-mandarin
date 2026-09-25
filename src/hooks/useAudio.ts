import { useCallback, useEffect, useRef, useState } from 'react'

function chooseMandarinVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const mandarinVoices = voices.filter((voice) => /^zh(?:-|_)/i.test(voice.lang) || /mandarin|普通话|中文/i.test(voice.name))
  const preferred = [/ting[- ]?ting/i, /xiaoxiao/i, /yunxi/i, /google.*(普通话|mandarin)/i, /mei[- ]?jia/i, /sin[- ]?ji/i]
  return preferred.reduce<SpeechSynthesisVoice | undefined>((selected, pattern) => selected ?? mandarinVoices.find((voice) => pattern.test(voice.name)), undefined)
    ?? mandarinVoices.find((voice) => /^zh[-_]cn$/i.test(voice.lang))
    ?? mandarinVoices[0]
}

export function useAudio() {
  const [playingKey, setPlayingKey] = useState<string | null>(null)
  const [audioMessage, setAudioMessage] = useState<string | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const nativeAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const syncVoices = () => setVoices(window.speechSynthesis.getVoices())
    syncVoices()
    window.speechSynthesis.addEventListener('voiceschanged', syncVoices)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', syncVoices)
  }, [])

  const play = useCallback((key: string, text: string, audioUrl?: string) => {
    setAudioMessage(null)
    window.speechSynthesis?.cancel()
    nativeAudioRef.current?.pause()
    nativeAudioRef.current = null

    if (audioUrl && typeof window !== 'undefined') {
      const nativeAudio = new Audio(audioUrl)
      nativeAudioRef.current = nativeAudio
      nativeAudio.onplay = () => setPlayingKey(key)
      nativeAudio.onended = () => {
        nativeAudioRef.current = null
        setPlayingKey(null)
      }
      nativeAudio.onerror = () => {
        nativeAudioRef.current = null
        setPlayingKey(null)
        setAudioMessage('The recording could not play. Falling back to pronunciation audio.')
        play(key, text)
      }
      void nativeAudio.play().catch(() => {
        nativeAudioRef.current = null
        setPlayingKey(null)
        setAudioMessage('The recording could not play. Falling back to pronunciation audio.')
        play(key, text)
      })
      return
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setAudioMessage('Audio is unavailable here. Pinyin is still available.')
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const voice = chooseMandarinVoice(voices.length > 0 ? voices : window.speechSynthesis.getVoices())
    utterance.lang = voice?.lang ?? 'zh-CN'
    if (voice) utterance.voice = voice
    utterance.rate = 0.88
    utterance.pitch = 0.98
    utterance.volume = 1
    utterance.onstart = () => setPlayingKey(key)
    utterance.onend = () => setPlayingKey(null)
    utterance.onerror = () => {
      setPlayingKey(null)
      setAudioMessage('Audio could not play. Pinyin is still available.')
    }
    window.speechSynthesis.speak(utterance)
  }, [voices])

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel()
    nativeAudioRef.current?.pause()
    nativeAudioRef.current = null
    setPlayingKey(null)
  }, [])

  return { playingKey, audioMessage, onPlay: play, onStop: stop }
}
