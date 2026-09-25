import type { Family, Word } from './types'

const toneMarks: Record<string, string> = {
  ā: 'a', á: 'a', ǎ: 'a', à: 'a', ē: 'e', é: 'e', ě: 'e', è: 'e',
  ī: 'i', í: 'i', ǐ: 'i', ì: 'i', ō: 'o', ó: 'o', ǒ: 'o', ò: 'o',
  ū: 'u', ú: 'u', ǔ: 'u', ù: 'u', ǖ: 'v', ǘ: 'v', ǚ: 'v', ǜ: 'v',
  Ā: 'a', Á: 'a', Ǎ: 'a', À: 'a', Ē: 'e', É: 'e', Ě: 'e', È: 'e',
  Ī: 'i', Í: 'i', Ǐ: 'i', Ì: 'i', Ō: 'o', Ó: 'o', Ǒ: 'o', Ò: 'o',
  Ū: 'u', Ú: 'u', Ǔ: 'u', Ù: 'u', Ǖ: 'v', Ǘ: 'v', Ǚ: 'v', Ǜ: 'v',
}

export function normalizePinyin(value: string): string {
  return value
    .split('')
    .map((character) => toneMarks[character] ?? character)
    .join('')
    .toLowerCase()
    .replace(/[0-5]/g, '')
    .replace(/[\s-]/g, '')
}

export function wordMatchesQuery(word: Word, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return true

  const normalizedPinyinQuery = normalizePinyin(normalizedQuery)
  return [word.hanzi, word.pinyin.toLowerCase(), normalizePinyin(word.pinyin), word.gloss.toLowerCase()]
    .some((value) => value.includes(normalizedQuery) || normalizePinyin(value).includes(normalizedPinyinQuery))
}

export function familyWords(family: Family, words: Word[]): Word[] {
  return family.members.map((wordId) => words.find((word) => word.id === wordId)).filter((word): word is Word => Boolean(word))
}

export function highlightedCharacters(hanzi: string, root: string): Array<{ character: string; isRoot: boolean }> {
  return [...hanzi].map((character) => ({ character, isRoot: character === root }))
}
