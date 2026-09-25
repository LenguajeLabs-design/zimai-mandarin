import type { Character, Family, Word } from '../content/types'
import { FamilyMap } from './FamilyMap'

interface FamilyCardProps {
  family: Family
  root: Character
  words: Word[]
  saved: boolean
  onOpen: () => void
  onToggleSaved: () => void
  onOpenWord: (wordId: string) => void
  audio: { playingKey: string | null; onPlay: (key: string, text: string) => void; onStop: () => void }
}

export function FamilyCard({ family, root, words, saved, onOpen, onToggleSaved, onOpenWord, audio }: FamilyCardProps) {
  return (
    <article className="family-card">
      <div className="family-card__header">
        <div>
          <p className="eyebrow">Word map {String(family.sortOrder).padStart(2, '0')}</p>
          <h2 aria-label={family.title}><span className="family-card__title-character" lang="zh-CN">{root.hanzi}</span></h2>
          <p className="family-card__description">{family.shortDescription}</p>
        </div>
        <button className={`icon-button${saved ? ' is-selected' : ''}`} type="button" onClick={onToggleSaved} aria-pressed={saved} aria-label={saved ? `Remove ${family.title} from saved` : `Save ${family.title}`} title={saved ? 'Remove from saved' : 'Save family'}>
          {saved ? '♥' : '♡'}
        </button>
      </div>
      <FamilyMap family={family} root={root} words={words} audio={audio} onOpenWord={onOpenWord} mini />
      <div className="family-card__footer">
        <span className="family-card__meta">{words.length} connected words</span>
        <button className="text-button" type="button" onClick={onOpen}>Open family <span aria-hidden="true">↗</span></button>
      </div>
    </article>
  )
}
