export type HskLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type ContentLabel = `HSK ${HskLevel}` | 'Related'

export interface ExampleSentence {
  hanzi: string
  pinyin: string
  gloss: string
}

export interface AudioAssets {
  natural?: string
  slow?: string
}

export interface Source {
  id: string
  name: string
  version: string
  level: string
  license: string
  retrievedAt?: string
  notes: string
}

export interface Character {
  id: string
  hanzi: string
  pinyin: string
  toneNumber: number
  toneMark: string
  gloss: string
  audioKey: string
  audio?: AudioAssets
  notes?: string
}

export interface Word {
  id: string
  hanzi: string
  pinyin: string
  toneNumbers: number[]
  gloss: string
  literalGloss?: string
  hskLevel: ContentLabel
  isExtension: boolean
  extensionReason?: string
  familyId: string
  rootCharacterIds: string[]
  audioKey: string
  audio?: AudioAssets
  examples: ExampleSentence[]
}

export interface Family {
  id: string
  rootCharacterId: string
  title: string
  shortDescription: string
  meaningNote: string
  members: string[]
  sortOrder: number
  featured: boolean
  contentNotes?: string
  sourceIds: string[]
}

export interface ContentData {
  sources: Source[]
  characters: Character[]
  families: Family[]
  words: Word[]
}
