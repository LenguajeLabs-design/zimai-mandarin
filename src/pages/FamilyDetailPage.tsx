import { useEffect } from 'react'
import type { Character, Family, Word } from '../content/types'
import { highlightedCharacters } from '../content/utils'
import { AudioButton } from '../components/AudioButton'
import { FamilyMap } from '../components/FamilyMap'
import { StatusBadge } from '../components/StatusBadge'
import { localizedFamilyDescription, localizedFamilyNote, localizedFamilyTitle, localizedWordGloss, siteCopy } from '../content/previewTranslations'
import { useExplanationLanguage } from '../hooks/useExplanationLanguage'

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
  const { language } = useExplanationLanguage()
  const copy = siteCopy[language].detail
  const title = localizedFamilyTitle(family, language)
  const learnedCount = words.filter((word) => learnedWords.includes(word.id)).length
  const familyLevel = words.find((word) => word.hskLevel !== 'Related')?.hskLevel ?? 'Curated'
  return (
    <div className="page page--detail">
      <button className="back-button" type="button" onClick={onBack}><span aria-hidden="true">←</span> {copy.back}</button>
      <header className="detail-header">
        <div>
          <p className="eyebrow">{copy.wordMap} {String(family.sortOrder).padStart(2, '0')} · {familyLevel}</p>
          <h1>{title}</h1>
          <p className="detail-header__description">{localizedFamilyDescription(family, language)}</p>
        </div>
        <div className="detail-actions">
          <button className={`button button--secondary${saved ? ' is-selected' : ''}`} type="button" onClick={onToggleSaved}>{saved ? `♥ ${copy.saved}` : `♡ ${copy.save}`}</button>
          <AudioButton audioKey={root.audioKey} text={root.hanzi} audioUrl={root.audio?.natural} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} label={`${copy.playRoot} ${root.hanzi}`} />
        </div>
      </header>
      <section className="detail-map-section detail-map-section--constellation" aria-labelledby="map-heading">
        <div className="section-heading"><div><p className="eyebrow">{copy.directions}</p><h2 id="map-heading">{copy.follow}</h2></div><span className="section-heading__count">{learnedCount}/{words.length} {copy.learned}</span></div>
        <FamilyMap family={family} root={root} words={words} audio={audio} onOpenWord={onOpenWord} />
      </section>
      <section className="meaning-note"><div className="meaning-note__mark" aria-hidden="true">{root.hanzi}</div><div><p className="eyebrow">{copy.note}</p><p>{localizedFamilyNote(family, language)}</p></div></section>
      {audio.audioMessage && <p className="audio-message" role="status">{audio.audioMessage}</p>}
      <section className="detail-word-list" aria-labelledby="words-heading">
        <div className="section-heading"><div><p className="eyebrow">{copy.closerLook}</p><h2 id="words-heading">{copy.connectedWords}</h2></div></div>
        <div className="detail-words">
          {words.map((word) => <div className="detail-word-row" key={word.id}><div><span className="detail-word-row__hanzi" lang="zh-CN">{highlightedCharacters(word.hanzi, root.hanzi).map(({ character, isRoot }, index) => <span className={isRoot ? 'root-char' : undefined} key={`${character}-${index}`}>{character}</span>)}</span><span className="detail-word-row__pinyin">{word.pinyin}</span><span className="detail-word-row__gloss">{localizedWordGloss(word, language)}</span></div><div className="detail-word-row__actions"><StatusBadge label={word.hskLevel} /><button className={`learn-button${learnedWords.includes(word.id) ? ' is-learned' : ''}`} type="button" onClick={() => onToggleLearned(word.id)} aria-pressed={learnedWords.includes(word.id)}>{learnedWords.includes(word.id) ? `✓ ${copy.learned}` : copy.markLearned}</button></div></div>)}
        </div>
      </section>
      <div className="detail-pagination"><button className="text-button" type="button" onClick={onPrevious}>← {copy.previous}</button><button className="text-button" type="button" onClick={onNext}>{copy.next} →</button></div>
    </div>
  )
}
