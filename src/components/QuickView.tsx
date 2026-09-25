import type { Character, Family, Word } from '../content/types'
import { highlightedCharacters } from '../content/utils'
import { localizedExampleGloss, localizedExtensionReason, localizedFamilyTitle, localizedWordGloss, siteCopy } from '../content/previewTranslations'
import { useExplanationLanguage } from '../hooks/useExplanationLanguage'
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
  const { language } = useExplanationLanguage()
  const copy = siteCopy[language].quick
  const title = localizedFamilyTitle(family, language)
  const gloss = localizedWordGloss(word, language)
  return <div className="quick-view-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="quick-view" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
      <div className="quick-view__handle" aria-hidden="true" />
      <div className="quick-view__topline"><span className="eyebrow">{copy.from} {title}</span><button className="icon-button" type="button" onClick={onClose} aria-label={copy.close}>×</button></div>
      <div className="quick-view__word"><span className="quick-view__hanzi" lang="zh-CN">{highlightedCharacters(word.hanzi, root.hanzi).map(({ character, isRoot }, index) => <span className={isRoot ? 'root-char' : undefined} key={`${character}-${index}`}>{character}</span>)}</span><AudioButton audioKey={word.audioKey} text={word.hanzi} audioUrl={word.audio?.natural} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} label={`${copy.play} ${word.hanzi}`} /></div>
      <p className="quick-view__pinyin">{word.pinyin}</p><p className="quick-view__gloss">{gloss}</p>
      <div className="quick-view__example"><p className="eyebrow">{copy.inContext}</p><p className="quick-view__example-hanzi" lang="zh-CN">{word.examples[0].hanzi}</p><p className="quick-view__example-pinyin">{word.examples[0].pinyin}</p><p className="quick-view__example-gloss">{localizedExampleGloss(word, word.examples[0].gloss, language)}</p></div>
      <div className="quick-view__status"><StatusBadge label={word.hskLevel} />{word.isExtension && word.extensionReason && <p>{localizedExtensionReason(word, language)}</p>}</div>
      <div className="quick-view__actions"><button className={`button button--secondary${saved ? ' is-selected' : ''}`} type="button" onClick={onToggleSaved}>{saved ? `♥ ${copy.saved}` : `♡ ${copy.save}`}</button><button className={`learn-button${learned ? ' is-learned' : ''}`} type="button" onClick={onToggleLearned}>{learned ? `✓ ${copy.markedLearned}` : copy.learned}</button></div>
      <button className="family-link" type="button" onClick={onClose}><span className="family-link__character" lang="zh-CN">{root.hanzi}</span><span><small>{copy.wholeMap}</small><strong>{title}</strong></span><span aria-hidden="true">→</span></button>
    </section>
  </div>
}
