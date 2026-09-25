import { describe, expect, it } from 'vitest'
import { selectMandarinVoice } from './useAudio'

function voice(name: string, lang: string, localService = true) {
  return { default: false, lang, localService, name, voiceURI: name } as SpeechSynthesisVoice
}

describe('selectMandarinVoice', () => {
  it('prefers mainland Mandarin voices and ignores Cantonese', () => {
    const selected = selectMandarinVoice([
      voice('Cantonese Voice', 'zh-HK'),
      voice('Mandarin Enhanced', 'zh-CN'),
      voice('English Voice', 'en-US'),
    ])

    expect(selected?.name).toBe('Mandarin Enhanced')
  })

  it('supports cmn voices when a zh-CN voice is unavailable', () => {
    const selected = selectMandarinVoice([voice('Chinese Voice', 'cmn-CN')])

    expect(selected?.lang).toBe('cmn-CN')
  })
})
