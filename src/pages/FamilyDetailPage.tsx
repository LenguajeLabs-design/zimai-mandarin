import { useEffect } from 'react'
import type { Character, Family, Word } from '../content/types'
import { highlightedCharacters } from '../content/utils'
import { AudioButton } from '../components/AudioButton'
import { FamilyMap } from '../components/FamilyMap'
import { StatusBadge } from '../components/StatusBadge'

interface FamilyDetailPageProps {
  family: Family
  root: Character
  words: Word[]
  saved: boolean
  learnedWords: string[]
  onBack: () => void
  onToggleSaved: () => void
  onToggleLearned: (id: string) => void
  onOpenWord: (id: string) => void
  onPrevious: () => void
  onNext: () => void
  audio: { playingKey: string | null; onPlay: (key: string, text: string) => void; onStop: () => void; audioMessage: string | null }
  onViewed: () => void
}

export function FamilyDetailPage({ family, root, words, saved, learnedWords, onBack, onToggleSaved, onToggleLearned, onOpenWord, onPrevious, onNext, audio, onViewed }: FamilyDetailPageProps) {
  useEffect(() => onViewed(), [family.id])
  const learnedCount = words.filter((word) => learnedWords.includes(word.id)).length
  return (
    <div className="page page--detail">
      <button className="back-button" type="button" onClick={onBack}><span aria-hidden="true">←</span> All families</button>
      <header className="detail-header">
        <div>
          <p className="eyebrow">Word map {String(family.sortOrder).padStart(2, '0')} · {family.sourceIds[0] === 'hsk-1-selected-placeholder' ? 'source pinned for review' : 'HSK 1'}</p>
          <h1>{family.title}</h1>
          <p className="detail-header__description">{family.shortDescription}</p>
        </div>
        <div className="detail-actions">
          <button className={`button button--secondary${saved ? ' is-selected' : ''}`} type="button" onClick={onToggleSaved}>{saved ? '♥ Saved' : '♡ Save family'}</button>
          <AudioButton audioKey={root.audioKey} text={root.hanzi} audioUrl={root.audio?.natural} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} label={`Play audio for root ${root.hanzi}`} />
        </div>
      </header>
      <section className="detail-map-section" aria-labelledby="map-heading">
        <div className="section-heading"><div><p className="eyebrow">Start with the anchor</p><h2 id="map-heading">One character, many directions.</h2></div><span className="section-heading__count">{learnedCount}/{words.length} learned</span></div>
        <FamilyMap family={family} root={root} words={words} audio={audio} onOpenWord={onOpenWord} />
      </section>
      <section className="meaning-note"><div className="meaning-note__mark" aria-hidden="true">{root.hanzi}</div><div><p className="eyebrow">Family note</p><p>{family.meaningNote}</p></div></section>
      {audio.audioMessage && <p className="audio-message" role="status">{audio.audioMessage}</p>}
      <section className="detail-word-list" aria-labelledby="words-heading">
        <div className="section-heading"><div><p className="eyebrow">Take a closer look</p><h2 id="words-heading">Connected words</h2></div></div>
        <div className="detail-words">
          {words.map((word) => <div className="detail-word-row" key={word.id}><div><span className="detail-word-row__hanzi" lang="zh-CN">{highlightedCharacters(word.hanzi, root.hanzi).map(({ character, isRoot }, index) => <span className={isRoot ? 'root-char' : undefined} key={`${character}-${index}`}>{character}</span>)}</span><span className="detail-word-row__pinyin">{word.pinyin}</span><span className="detail-word-row__gloss">{word.gloss}</span></div><div className="detail-word-row__actions"><StatusBadge label={word.hskLevel} /><button className={`learn-button${learnedWords.includes(word.id) ? ' is-learned' : ''}`} type="button" onClick={() => onToggleLearned(word.id)} aria-pressed={learnedWords.includes(word.id)}>{learnedWords.includes(word.id) ? '✓ Learned' : 'Mark learned'}</button></div></div>)}
        </div>
      </section>
      <div className="detail-pagination"><button className="text-button" type="button" onClick={onPrevious}>← Previous family</button><button className="text-button" type="button" onClick={onNext}>Next family →</button></div>
    </div>
  )
}
