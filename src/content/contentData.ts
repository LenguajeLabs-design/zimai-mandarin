import baseContent from './content.json'
import { contentExpansion } from './contentExpansion'
import type { ContentData } from './types'

const base = baseContent as ContentData

export const content: ContentData = {
  ...base,
  characters: [...base.characters, ...contentExpansion.characters],
  families: [...base.families, ...contentExpansion.families],
  words: [...base.words, ...contentExpansion.words],
}
