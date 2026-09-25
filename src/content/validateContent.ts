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
  const familiesById = new Map(data.families.map((family) => [family.id, family]))
  data.families.forEach((family) => {
    if (!characterIds.has(family.rootCharacterId)) errors.push(`Missing root character for ${family.id}`)
    if (family.members.length < 5) errors.push(`Family has fewer than five words: ${family.id}`)
    family.members.forEach((wordId) => {
      if (!wordIds.has(wordId)) errors.push(`Missing word ${wordId} in ${family.id}`)
    })
  })
  data.words.forEach((word) => {
    if (!familyIds.has(word.familyId)) errors.push(`Missing family for ${word.id}`)
    if (!word.rootCharacterIds.every((id) => characterIds.has(id))) errors.push(`Missing root reference for ${word.id}`)
    if (word.isExtension && !word.extensionReason) errors.push(`Related word without extensionReason: ${word.id}`)
    if (word.hskLevel === 'HSK 2' && !familiesById.get(word.familyId)?.sourceIds.includes('hsk-2-official-syllabus')) errors.push(`HSK 2 word without official HSK 2 source: ${word.id}`)
    if (!word.examples.length) errors.push(`Word without an example sentence: ${word.id}`)
    word.examples.forEach((example, index) => {
      if (!example.hanzi || !example.pinyin || !example.gloss) errors.push(`Incomplete example sentence ${index + 1} for ${word.id}`)
    })
  })
  data.families.forEach((family) => {
    if (family.sourceIds.includes('hsk-2-official-syllabus') && !family.members.some((wordId) => data.words.find((word) => word.id === wordId)?.hskLevel === 'HSK 2')) errors.push(`HSK 2 family has no verified core member: ${family.id}`)
  })
  return errors
}

export const contentValidationErrors = validateContent(content as ContentData)
