import { useState } from 'react'
import type { Character, Family, Word } from '../content/types'
import { AudioButton } from '../components/AudioButton'
import { StatusBadge } from '../components/StatusBadge'
import { useExplanationLanguage } from '../hooks/useExplanationLanguage'
import { localizedExampleGloss, localizedFamilyDescription, localizedFamilyNote, localizedFamilyTitle, localizedRootGloss, localizedWordGloss, previewCopy } from '../content/previewTranslations'

interface LayoutPreviewPageProps {
  families: Family[]
  getRoot: (family: Family) => Character
  getWords: (family: Family) => Word[]
  audio: { playingKey: string | null; onPlay: (key: string, text: string) => void; onStop: () => void }
}

type PreviewView = 'library' | 'detail'

function PreviewWordRow({ word, root, active, onSelect, audio, language }: { word: Word; root: Character; active: boolean; onSelect: () => void; audio: LayoutPreviewPageProps['audio']; language: 'en' | 'ko' }) {
  const rootIndex = word.hanzi.indexOf(root.hanzi)
  const copy = previewCopy[language]
  const gloss = localizedWordGloss(word, language)
  return (
    <div className={`layout-preview__word-row${active ? ' is-active' : ''}`}>
      <button className="layout-preview__word-main" type="button" onClick={onSelect} aria-pressed={active}>
        <strong lang="zh-CN">{rootIndex >= 0 ? <>{word.hanzi.slice(0, rootIndex)}<span className="root-char">{root.hanzi}</span>{word.hanzi.slice(rootIndex + root.hanzi.length)}</> : word.hanzi}</strong>
        <span><b>{word.pinyin}</b><small>{gloss}</small></span>
      </button>
      <StatusBadge label={word.hskLevel} />
      <AudioButton audioKey={word.audioKey} text={word.hanzi} audioUrl={word.audio?.natural} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} compact label={`${copy.playAudio} ${word.hanzi}, ${gloss}`} />
    </div>
  )
}

export function LayoutPreviewPage({ families, getRoot, getWords, audio }: LayoutPreviewPageProps) {
  const { language, setLanguage } = useExplanationLanguage()
  const copy = previewCopy[language]
  const [view, setView] = useState<PreviewView>('library')
  const [familyId, setFamilyId] = useState(families[0]?.id ?? '')
  const [activeWordId, setActiveWordId] = useState<string | null>(null)
  const [isFamilySaved, setIsFamilySaved] = useState(false)
  const [isWordSaved, setIsWordSaved] = useState(false)
  const [isWordLearned, setIsWordLearned] = useState(false)
  const activeFamily = families.find((family) => family.id === familyId) ?? families[0]
  const root = activeFamily ? getRoot(activeFamily) : undefined
  const words = activeFamily ? getWords(activeFamily) : []
  const activeWord = words.find((word) => word.id === activeWordId) ?? words[0]
  const featuredFamilies = families.slice(0, 3)
  const rootGloss = localizedRootGloss(root?.id ?? '', root?.gloss ?? '', language)

  const showDetail = (family: Family) => {
    setFamilyId(family.id)
    setActiveWordId(getWords(family)[0]?.id ?? null)
    setIsWordSaved(false)
    setIsWordLearned(false)
    setView('detail')
  }

  const selectWord = (wordId: string) => {
    setActiveWordId(wordId)
    setIsWordSaved(false)
    setIsWordLearned(false)
  }

  if (!activeFamily || !root) return null

  return (
    <div className="page page--layout-preview">
      <header className="layout-preview__topline">
        <div>
          <p className="eyebrow">{copy.previewLabel}</p>
          <p className="layout-preview__status"><span aria-hidden="true">●</span> {copy.status}</p>
        </div>
        <div className="layout-preview__controls">
          <div className="layout-preview__language" role="group" aria-label={copy.languageLabel}>
            <span>{copy.languageLabel}</span>
            <button className={language === 'en' ? 'is-active' : ''} type="button" onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>{copy.english}</button>
            <button className={language === 'ko' ? 'is-active' : ''} type="button" onClick={() => setLanguage('ko')} aria-pressed={language === 'ko'}>{copy.korean}</button>
          </div>
          <div className="layout-preview__switch" role="tablist" aria-label="Preview screen">
            <button className={view === 'library' ? 'is-active' : ''} type="button" role="tab" aria-selected={view === 'library'} onClick={() => setView('library')}>{copy.library}</button>
            <button className={view === 'detail' ? 'is-active' : ''} type="button" role="tab" aria-selected={view === 'detail'} onClick={() => setView('detail')}>{copy.detail}</button>
          </div>
        </div>
      </header>

      {view === 'library' ? (
        <>
          <header className="layout-preview__hero">
            <div>
              <p className="eyebrow">{copy.editorialEyebrow}</p>
              <h1>{copy.heroTitleFirst}<br /><em>{copy.heroTitleSecond}</em></h1>
              <p>{copy.heroDescription}</p>
            </div>
            <div className="layout-preview__hero-note"><span className="layout-preview__hero-note-mark" lang="zh-CN">字</span><span>{copy.curatedMaps}<br />HSK 1–6</span></div>
          </header>

          <div className="layout-preview__library-grid">
            <section className="layout-preview__featured" aria-labelledby="preview-featured-heading">
              <div className="layout-preview__section-topline"><div><p className="eyebrow">{copy.featuredFamily}</p><h2 id="preview-featured-heading">{localizedFamilyTitle(activeFamily, language)}</h2><p>{localizedFamilyDescription(activeFamily, language)}</p></div><span className="layout-preview__number">{String(activeFamily.sortOrder).padStart(2, '0')}</span></div>
              <div className="layout-preview__featured-map">
                <div className="layout-preview__root-block">
                  <span className="eyebrow">{copy.root}</span>
                  <button className="layout-preview__root-character" type="button" lang="zh-CN" onClick={() => setView('detail')} aria-label={`${copy.openFamilyDetail} ${root.hanzi}`}>{root.hanzi}</button>
                  <span className="layout-preview__root-pinyin">{root.pinyin}</span>
                  <span className="layout-preview__root-gloss">{rootGloss}</span>
                  <AudioButton audioKey={root.audioKey} text={root.hanzi} audioUrl={root.audio?.natural} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} compact label={`${copy.playAudio} ${root.hanzi}`} />
                </div>
                <div className="layout-preview__featured-words">
                  {words.map((word) => <PreviewWordRow key={word.id} word={word} root={root} active={word.id === activeWord?.id} onSelect={() => selectWord(word.id)} audio={audio} language={language} />)}
                </div>
              </div>
              <button className="button button--primary" type="button" onClick={() => showDetail(activeFamily)}>{copy.openFamily} <span aria-hidden="true">→</span></button>
            </section>

            <aside className="layout-preview__sidebar">
              <section className="layout-preview__continue"><p className="eyebrow">{copy.continueLearning}</p><div className="layout-preview__continue-heading"><span lang="zh-CN">{root.hanzi}</span><div><h2>{localizedFamilyTitle(activeFamily, language)}</h2><p>{localizedFamilyDescription(activeFamily, language)}</p></div></div><div className="layout-preview__progress"><span style={{ width: '42%' }} /></div><div className="layout-preview__continue-footer"><span>2 / {words.length}</span><button className="text-button" type="button" onClick={() => showDetail(activeFamily)}>{copy.detail} →</button></div></section>
              <section className="layout-preview__small-card"><div className="layout-preview__small-card-heading"><div><p className="eyebrow">{copy.yourShelf}</p><h2>{copy.savedFamilies}</h2></div><span aria-hidden="true">↗</span></div><div className="layout-preview__saved-roots">{featuredFamilies.map((family) => <button key={family.id} type="button" onClick={() => showDetail(family)} aria-label={`${copy.openFamilyDetail} ${getRoot(family).hanzi}`}><span lang="zh-CN">{getRoot(family).hanzi}</span><small>{getRoot(family).pinyin}</small></button>)}</div></section>
              <section className="layout-preview__small-card layout-preview__review-card"><div className="layout-preview__review-mark" aria-hidden="true">↻</div><div><p className="eyebrow">{copy.reviewGently}</p><h2>{copy.keepTheThread}</h2><p>{copy.returnToWords}</p></div><button className="text-button" type="button" onClick={() => showDetail(activeFamily)}>{copy.startReview}</button></section>
            </aside>
          </div>

          <section className="layout-preview__family-strip" aria-labelledby="preview-explore-heading"><div className="layout-preview__section-topline"><div><p className="eyebrow">{copy.explore}</p><h2 id="preview-explore-heading">{copy.moreWays}</h2></div><span className="layout-preview__muted-count">{families.length} {copy.curatedMaps}</span></div><div className="layout-preview__family-tiles">{featuredFamilies.map((family) => <button className="layout-preview__family-tile" type="button" key={family.id} onClick={() => showDetail(family)}><span className="layout-preview__tile-character" lang="zh-CN">{getRoot(family).hanzi}</span><span><strong>{localizedFamilyTitle(family, language)}</strong><small>{localizedFamilyDescription(family, language)}</small></span><span aria-hidden="true">→</span></button>)}</div></section>
        </>
      ) : (
        <>
          <button className="back-button layout-preview__back" type="button" onClick={() => setView('library')}><span aria-hidden="true">←</span> {copy.previewLibrary}</button>
          <header className="layout-preview__detail-header"><div><p className="eyebrow">{copy.familyMap}</p><h1>{localizedFamilyTitle(activeFamily, language)}</h1><p>{localizedFamilyDescription(activeFamily, language)}</p></div><div className="layout-preview__detail-actions"><button className={`button button--secondary${isFamilySaved ? ' is-selected' : ''}`} type="button" onClick={() => setIsFamilySaved((saved) => !saved)}>{isFamilySaved ? copy.savedFamily : copy.saveFamily}</button><AudioButton audioKey={root.audioKey} text={root.hanzi} audioUrl={root.audio?.natural} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} label={`${copy.playAudio} ${root.hanzi}`} /></div></header>

          <section className="layout-preview__constellation" aria-labelledby="preview-map-heading"><div className="layout-preview__constellation-heading"><div><p className="eyebrow">{copy.oneCharacter}</p><h2 id="preview-map-heading">{copy.followFamily}</h2></div><span>{words.length} {copy.connectedWords}</span></div><div className="layout-preview__constellation-stage"><div className="layout-preview__constellation-root"><span className="eyebrow">{copy.root}</span><button className="layout-preview__constellation-character" type="button" lang="zh-CN" onClick={() => setView('library')}>{root.hanzi}</button><strong>{root.pinyin}</strong><span>{rootGloss}</span><AudioButton audioKey={root.audioKey} text={root.hanzi} audioUrl={root.audio?.natural} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} compact label={`${copy.playAudio} ${root.hanzi}`} /></div><div className="layout-preview__branches">{words.map((word) => <PreviewWordRow key={word.id} word={word} root={root} active={word.id === activeWord?.id} onSelect={() => selectWord(word.id)} audio={audio} language={language} />)}</div></div></section>

          <section className="meaning-note layout-preview__meaning-note"><div className="meaning-note__mark" aria-hidden="true">{root.hanzi}</div><div><p className="eyebrow">{copy.familyNote}</p><p>{localizedFamilyNote(activeFamily, language)}</p></div></section>

          {activeWord && <section className="layout-preview__word-sheet" aria-live="polite"><div className="layout-preview__word-sheet-character" lang="zh-CN">{activeWord.hanzi}</div><div><p className="eyebrow">{copy.selectedWord}</p><h2>{activeWord.pinyin}</h2><p>{localizedWordGloss(activeWord, language)}</p>{activeWord.examples[0] && <div className="layout-preview__example"><strong lang="zh-CN">{activeWord.examples[0].hanzi}</strong><span>{activeWord.examples[0].pinyin}</span><small>{localizedExampleGloss(activeWord, activeWord.examples[0].gloss, language)}</small></div>}</div><div className="layout-preview__word-sheet-actions"><StatusBadge label={activeWord.hskLevel} /><button className={`button button--secondary${isWordSaved ? ' is-selected' : ''}`} type="button" onClick={() => setIsWordSaved((saved) => !saved)}>{isWordSaved ? copy.savedWord : copy.saveWord}</button><button className="button button--primary" type="button" onClick={() => setIsWordLearned((learned) => !learned)}>{isWordLearned ? copy.learned : copy.markLearned}</button></div></section>}
        </>
      )}
    </div>
  )
}
