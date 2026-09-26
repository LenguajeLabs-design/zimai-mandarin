import baseContent from './content.json'
import { contentExpansion } from './contentExpansion'
import { generatedAudioPaths } from './generatedAudio'
import hskVocabularyJson from './hskVocabulary.json'
import type { AudioAssets, ContentData, HskVocabularyData, HskVocabularyEntry } from './types'

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

const hskVocabularyData = hskVocabularyJson as HskVocabularyData
export const hskVocabularySource = hskVocabularyData.source
export const hskVocabulary: HskVocabularyEntry[] = hskVocabularyData.levels.flatMap((level) => level.words)
