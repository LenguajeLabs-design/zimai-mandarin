import content from './content.json'
import type { ContentData } from './types'

export function validateContent(data: ContentData): string[] {
  const errors: string[] = []
  const ids = new Set<string>()
  const addIds = (items: Array<{ id: string }>, kind: string) => {
    items.forEach((item) => {
      if (ids.has(item.id)) errors.push(`Duplicate ${kind} id: ${item.id}`)
      ids.add(item.id)
    })
  }

  addIds(data.sources, 'source')
  addIds(data.characters, 'character')
  addIds(data.families, 'family')
  addIds(data.words, 'word')

  const characterIds = new Set(data.characters.map((character) => character.id))
  const familyIds = new Set(data.families.map((family) => family.id))
  const wordIds = new Set(data.words.map((word) => word.id))
  data.families.forEach((family) => {
    if (!characterIds.has(family.rootCharacterId)) errors.push(`Missing root character for ${family.id}`)
    family.members.forEach((wordId) => {
      if (!wordIds.has(wordId)) errors.push(`Missing word ${wordId} in ${family.id}`)
    })
  })
  data.words.forEach((word) => {
    if (!familyIds.has(word.familyId)) errors.push(`Missing family for ${word.id}`)
    if (!word.rootCharacterIds.every((id) => characterIds.has(id))) errors.push(`Missing root reference for ${word.id}`)
    if (word.isExtension && !word.extensionReason) errors.push(`Related word without extensionReason: ${word.id}`)
    if (word.hskLevel === 'HSK 1' && !word.examples?.length) errors.push(`HSK 1 word without an example sentence: ${word.id}`)
  })
  return errors
}

export const contentValidationErrors = validateContent(content as ContentData)
