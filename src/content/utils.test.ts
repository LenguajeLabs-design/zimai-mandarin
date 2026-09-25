import { describe, expect, it } from 'vitest'
import content from './content.json'
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

  it('keeps the prototype content internally consistent', () => {
    expect(contentValidationErrors).toEqual([])
  })

  it('keeps the first HSK 2–3 practice lesson internally coherent', () => {
    expect(practice.builder.tokens.join('')).toBe('我现在在家学习')
    expect(practice.recall.choices.filter((choice) => choice.isCorrect)).toHaveLength(1)
    expect(practice.dialogue.some((turn) => turn.hanzi === practice.recall.audioText)).toBe(true)
  })
})
