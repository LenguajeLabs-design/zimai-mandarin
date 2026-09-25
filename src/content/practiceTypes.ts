export type PracticeMode = 'scene' | 'recall' | 'build'

export interface PracticeTurn {
  speaker: string
  hanzi: string
  pinyin: string
  gloss: string
  audioKey: string
}

export interface RecallChoice {
  hanzi: string
  pinyin: string
  gloss: string
  isCorrect: boolean
}

export interface PracticeLesson {
  id: string
  level: string
  title: string
  scene: string
  description: string
  dialogue: PracticeTurn[]
  recall: {
    prompt: string
    audioKey: string
    audioText: string
    choices: RecallChoice[]
    answerNote: string
  }
  builder: {
    prompt: string
    translation: string
    tokens: string[]
    tiles: string[]
    note: string
  }
  grammar: {
    label: string
    title: string
    pattern: string
    explanation: string
    examples: Array<{ hanzi: string; pinyin: string; gloss: string }>
  }
}
