import { useCallback, useEffect, useRef, useState } from 'react'

function voiceScore(voice: SpeechSynthesisVoice) {
  const language = voice.lang.replace('_', '-').toLowerCase()
  const identity = `${language} ${voice.name}`.toLowerCase()
  if (!/^(cmn|zh)(-|$)/.test(language)) return -1
  if (/yue|cantonese|zh-(hk|mo)(-|$)/.test(identity)) return -1

  let score = 0
  if (/^(cmn|zh)-(cn|hans)(-|$)/.test(language)) score += 100
  else if (/^cmn(-|$)/.test(language)) score += 85
  else if (/^zh-(tw|hant)(-|$)/.test(language)) score += 35
  else score += 20
  if (/mandarin|putonghua|普通话/.test(identity)) score += 20
  if (/enhanced|premium|natural|neural|siri/.test(identity)) score += 5
  if (voice.localService) score += 4
  if (voice.default) score += 1
  return score
}

export function selectMandarinVoice(voices: SpeechSynthesisVoice[]) {
  return [...voices].sort((a, b) => voiceScore(b) - voiceScore(a))[0]
}

export function useAudio() {
  const [playingKey, setPlayingKey] = useState<string | null>(null)
  const [audioMessage, setAudioMessage] = useState<string | null>(null)
  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([])
  const nativeAudioRef = useRef<HTMLAudioElement | null>(null)
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const updateVoices = () => setSystemVoices(window.speechSynthesis.getVoices())
    updateVoices()
    window.speechSynthesis.addEventListener('voiceschanged', updateVoices)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', updateVoices)
  }, [])

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
      const voices = systemVoices.length > 0 ? systemVoices : window.speechSynthesis.getVoices()
      const mandarinVoice = selectMandarinVoice(voices)
      if (mandarinVoice) speech.voice = mandarinVoice
      speech.lang = mandarinVoice?.lang ?? 'zh-CN'
      speech.rate = 0.9
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
        setAudioMessage('This audio asset could not play. Please check the connection or audio file.')
    }
    nativeAudio.onplay = () => setPlayingKey(key)
    nativeAudio.onended = () => {
      nativeAudioRef.current = null
      setPlayingKey(null)
    }
    nativeAudio.onerror = handleFailure
    void nativeAudio.play().catch(handleFailure)
  }, [systemVoices])

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
