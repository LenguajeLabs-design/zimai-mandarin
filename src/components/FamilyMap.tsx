import type { Character, Family, Word } from '../content/types'
import { AudioButton } from './AudioButton'
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
  return (
    <div className={`family-map${mini ? ' family-map--mini' : ''}`} aria-label={`${family.title} word map`}>
      <div className="family-map__root">
        <span className="family-map__eyebrow">root</span>
        <span className="family-map__character" lang="zh-CN">{root.hanzi}</span>
        <span className="family-map__pinyin">{root.pinyin}</span>
        <span className="family-map__gloss">{root.gloss}</span>
        <AudioButton audioKey={root.audioKey} text={root.hanzi} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} compact label={`Play audio for root ${root.hanzi}`} />
      </div>
      <div className="family-map__branches">
        {words.map((word) => <div className="family-map__branch" key={word.id}><span className="branch-line" aria-hidden="true" /><WordNode word={word} root={root} onOpen={onOpenWord} audio={audio} compact={mini} /></div>)}
      </div>
    </div>
  )
}
