import type { Character, Family, Word } from '../content/types'
import { useState } from 'react'
import { localizedFamilyTitle, localizedRootGloss, siteCopy } from '../content/previewTranslations'
import { useExplanationLanguage } from '../hooks/useExplanationLanguage'
import { AudioButton } from './AudioButton'
import { StrokeOrderSheet } from './StrokeOrderSheet'
import { WordNode } from './WordNode'

interface FamilyMapProps {
  family: Family
  root: Character
  words: Word[]
  audio: { playingKey: string | null; onPlay: (key: string, text: string) => void; onStop: () => void }
  onOpenWord: (wordId: string) => void
  mini?: boolean
}

export function FamilyMap({ family, root, words, audio, onOpenWord, mini = false }: FamilyMapProps) {
  const [isStrokeOrderOpen, setIsStrokeOrderOpen] = useState(false)
  const { language } = useExplanationLanguage()
  const copy = siteCopy[language].map
  const title = localizedFamilyTitle(family, language)
  const rootGloss = localizedRootGloss(root.id, root.gloss, language)

  return (
    <>
      <div className={`family-map${mini ? ' family-map--mini' : ''}`} aria-label={`${title} ${copy.wordMap}`}>
        <div className="family-map__root">
          <span className="family-map__eyebrow">{copy.root}</span>
          <button className="family-map__character" type="button" lang="zh-CN" onClick={() => setIsStrokeOrderOpen(true)} aria-label={`${copy.showStroke} ${root.hanzi}`}>{root.hanzi}</button>
          <span className="family-map__pinyin">{root.pinyin}</span>
          <span className="family-map__gloss">{rootGloss}</span>
          <AudioButton audioKey={root.audioKey} text={root.hanzi} audioUrl={root.audio?.natural} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} compact label={`${copy.playRoot} ${root.hanzi}`} />
        </div>
        <div className="family-map__branches">
          {words.map((word) => <div className="family-map__branch" key={word.id}><WordNode word={word} root={root} onOpen={onOpenWord} audio={audio} compact={mini} /></div>)}
        </div>
      </div>
      {isStrokeOrderOpen && <StrokeOrderSheet character={root} onClose={() => setIsStrokeOrderOpen(false)} />}
    </>
  )
}
