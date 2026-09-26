import baseContent from './content.json'
import { contentExpansion } from './contentExpansion'
import { generatedAudioPaths } from './generatedAudio'
import type { AudioAssets, ContentData } from './types'

const base = baseContent as ContentData

function attachGeneratedAudio<T extends { audioKey: string; audio?: AudioAssets }>(item: T): T {
  const generatedPath = generatedAudioPaths[item.audioKey]
  if (!generatedPath || item.audio?.natural) return item

  return {
    ...item,
    audio: { ...item.audio, natural: generatedPath },
  }
}

export const content: ContentData = {
  ...base,
  characters: [...base.characters, ...contentExpansion.characters].map(attachGeneratedAudio),
  families: [...base.families, ...contentExpansion.families],
  words: [...base.words, ...contentExpansion.words].map(attachGeneratedAudio),
}
