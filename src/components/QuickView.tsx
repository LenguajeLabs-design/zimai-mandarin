import type { Character, Family, Word } from '../content/types'
import { highlightedCharacters } from '../content/utils'
import { AudioButton } from './AudioButton'
import { StatusBadge } from './StatusBadge'

interface QuickViewProps {
  word: Word
  family: Family
  root: Character
  saved: boolean
  learned: boolean
  onClose: () => void
  onToggleSaved: () => void
  onToggleLearned: () => void
  audio: { playingKey: string | null; onPlay: (key: string, text: string) => void; onStop: () => void }
}

export function QuickView({ word, family, root, saved, learned, onClose, onToggleSaved, onToggleLearned, audio }: QuickViewProps) {
  return <div className="quick-view-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="quick-view" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
      <div className="quick-view__handle" aria-hidden="true" />
      <div className="quick-view__topline"><span className="eyebrow">From the {family.title}</span><button className="icon-button" type="button" onClick={onClose} aria-label="Close word view">×</button></div>
      <div className="quick-view__word"><span className="quick-view__hanzi" lang="zh-CN">{highlightedCharacters(word.hanzi, root.hanzi).map(({ character, isRoot }, index) => <span className={isRoot ? 'root-char' : undefined} key={`${character}-${index}`}>{character}</span>)}</span><AudioButton audioKey={word.audioKey} text={word.hanzi} audioUrl={word.audio?.natural} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} label={`Play audio for ${word.hanzi}`} /></div>
      <p className="quick-view__pinyin">{word.pinyin}</p><p className="quick-view__gloss">{word.gloss}</p>
      <div className="quick-view__example"><p className="eyebrow">In context</p><p className="quick-view__example-hanzi" lang="zh-CN">{word.examples[0].hanzi}</p><p className="quick-view__example-pinyin">{word.examples[0].pinyin}</p><p className="quick-view__example-gloss">{word.examples[0].gloss}</p></div>
      <div className="quick-view__status"><StatusBadge label={word.hskLevel} />{word.isExtension && word.extensionReason && <p>{word.extensionReason}</p>}</div>
      <div className="quick-view__actions"><button className={`button button--secondary${saved ? ' is-selected' : ''}`} type="button" onClick={onToggleSaved}>{saved ? '♥ Saved word' : '♡ Save word'}</button><button className={`learn-button${learned ? ' is-learned' : ''}`} type="button" onClick={onToggleLearned}>{learned ? '✓ Learned' : 'Mark learned'}</button></div>
      <button className="family-link" type="button" onClick={onClose}><span className="family-link__character" lang="zh-CN">{root.hanzi}</span><span><small>See the whole map</small><strong>{family.title}</strong></span><span aria-hidden="true">→</span></button>
    </section>
  </div>
}
