import { describe, expect, it } from 'vitest'
import { content } from './contentData'
import practice from './practice.json'
import { familyWords, highlightedCharacters, normalizePinyin, wordMatchesQuery } from './utils'
import type { ContentData } from './types'
import { initialLibraryState, readLibraryState, writeLibraryState } from '../services/storageService'
import { contentValidationErrors } from './validateContent'

const data = content as ContentData

describe('content utilities', () => {
  it('normalizes tone-marked pinyin for search', () => {
    expect(normalizePinyin('nǚrén')).toBe('nvren')
    expect(normalizePinyin('xue2')).toBe('xue')
  })

  it('matches Chinese, normalized pinyin, and English glosses', () => {
    const phone = data.words.find((word) => word.id === 'word-dianhua')!
    expect(wordMatchesQuery(phone, '电话')).toBe(true)
    expect(wordMatchesQuery(phone, 'dianhua')).toBe(true)
    expect(wordMatchesQuery(phone, 'telephone')).toBe(true)
  })

  it('attaches build-time OpenAI audio to the pilot content', () => {
    const student = data.words.find((word) => word.id === 'word-xuesheng')!
    const root = data.characters.find((character) => character.id === 'char-xue')!
    expect(student.audio?.natural).toBe('/zimai-mandarin/audio/openai/word-xuesheng.mp3')
    expect(root.audio?.natural).toBe('/zimai-mandarin/audio/openai/root-xue.mp3')
  })

  it('keeps family member order from the content file', () => {
    const family = data.families[0]
    const familyMapWords = familyWords(family, data.words)
    expect(familyMapWords).toHaveLength(5)
    expect(familyMapWords.map((word) => word.id)).toEqual(family.members)
    expect(familyMapWords.every((word) => word.hanzi.includes('学'))).toBe(true)
  })

  it('marks the recurring character for root highlighting', () => {
    expect(highlightedCharacters('大学', '学')).toEqual([
      { character: '大', isRoot: false },
      { character: '学', isRoot: true },
    ])
  })

  it('round-trips versioned local library state', () => {
    const state = { ...initialLibraryState, savedFamilies: ['family-xue'], learnedWords: ['word-xuesheng'] }
    const values = new Map<string, string>()
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    }
    writeLibraryState(storage, state)
    expect(readLibraryState(storage)).toEqual(state)
    storage.setItem('zimai-library-v1', JSON.stringify({ version: 0, savedFamilies: ['old'] }))
    expect(readLibraryState(storage)).toEqual(initialLibraryState)
  })

  it('keeps the content set internally consistent', () => {
    expect(contentValidationErrors).toEqual([])
    expect(data.words.every((word) => word.examples.length > 0)).toBe(true)
    expect(data.families.every((family) => family.members.length >= 5)).toBe(true)
  })

  it('keeps dedicated HSK 2 families source-backed', () => {
    const hsk2Families = data.families.filter((family) => family.sourceIds.includes('hsk-2-official-syllabus'))
    const hsk2Words = hsk2Families.flatMap((family) => familyWords(family, data.words)).filter((word) => word.hskLevel === 'HSK 2')
    expect(hsk2Families).toHaveLength(18)
    expect(hsk2Words).toHaveLength(37)
    expect(hsk2Words.every((word) => word.hskLevel === 'HSK 2' && !word.isExtension)).toBe(true)
    expect(hsk2Families.every((family) => familyWords(family, data.words).length >= 5)).toBe(true)
  })

  it('keeps dedicated HSK 3 families source-backed', () => {
    const hsk3Families = data.families.filter((family) => family.sourceIds.includes('hsk-3-official-syllabus'))
    const hsk3Words = hsk3Families.flatMap((family) => familyWords(family, data.words)).filter((word) => word.hskLevel === 'HSK 3')
    expect(hsk3Families).toHaveLength(17)
    expect(hsk3Words).toHaveLength(43)
    expect(hsk3Words.every((word) => word.hskLevel === 'HSK 3' && !word.isExtension)).toBe(true)
    expect(hsk3Families.every((family) => familyWords(family, data.words).length >= 5)).toBe(true)
  })

  it('keeps dedicated HSK 4 families source-backed', () => {
    const hsk4Families = data.families.filter((family) => family.sourceIds.includes('hsk-4-official-syllabus'))
    const hsk4Words = hsk4Families.flatMap((family) => familyWords(family, data.words)).filter((word) => word.hskLevel === 'HSK 4')
    expect(hsk4Families).toHaveLength(19)
    expect(hsk4Words).toHaveLength(63)
    expect(hsk4Words.every((word) => word.hskLevel === 'HSK 4' && !word.isExtension)).toBe(true)
    expect(hsk4Families.every((family) => familyWords(family, data.words).length >= 5)).toBe(true)
  })

  it('keeps dedicated HSK 5 families source-backed', () => {
    const hsk5Families = data.families.filter((family) => family.sourceIds.includes('hsk-5-official-syllabus'))
    const hsk5Words = hsk5Families.flatMap((family) => familyWords(family, data.words)).filter((word) => word.hskLevel === 'HSK 5')
    expect(hsk5Families).toHaveLength(14)
    expect(hsk5Words).toHaveLength(48)
    expect(hsk5Words.every((word) => word.hskLevel === 'HSK 5' && !word.isExtension)).toBe(true)
    expect(hsk5Families.every((family) => familyWords(family, data.words).length >= 5)).toBe(true)
  })

  it('keeps dedicated HSK 6 families source-backed', () => {
    const hsk6Families = data.families.filter((family) => family.sourceIds.includes('hsk-6-official-syllabus'))
    const hsk6Words = hsk6Families.flatMap((family) => familyWords(family, data.words)).filter((word) => word.hskLevel === 'HSK 6')
    expect(hsk6Families).toHaveLength(15)
    expect(hsk6Words).toHaveLength(39)
    expect(hsk6Words.every((word) => word.hskLevel === 'HSK 6' && !word.isExtension)).toBe(true)
    expect(hsk6Families.every((family) => familyWords(family, data.words).length >= 5)).toBe(true)
  })

  it('keeps the first HSK 2–3 practice lesson internally coherent', () => {
    expect(practice.builder.tokens.join('')).toBe('我现在在家学习')
    expect(practice.recall.choices.filter((choice) => choice.isCorrect)).toHaveLength(1)
    expect(practice.dialogue.some((turn) => turn.hanzi === practice.recall.audioText)).toBe(true)
  })
})
