export type ContentLabel = 'HSK 1' | 'Related'

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
