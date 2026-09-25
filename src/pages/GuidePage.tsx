import type { Character, Family, Word } from '../content/types'
import { FamilyMap } from '../components/FamilyMap'
import { siteCopy } from '../content/previewTranslations'
import { useExplanationLanguage } from '../hooks/useExplanationLanguage'

interface GuidePageProps {
  family: Family
  root: Character
  words: Word[]
  onOpenFamily: (id: string) => void
  onOpenWord: (id: string) => void
  onOpenAbout: () => void
  audio: { playingKey: string | null; onPlay: (key: string, text: string) => void; onStop: () => void }
}

export function GuidePage({ family, root, words, onOpenFamily, onOpenWord, onOpenAbout, audio }: GuidePageProps) {
  const { language } = useExplanationLanguage()
  const copy = siteCopy[language].guide
  return (
    <div className="page page--guide">
      <header className="page-header page-header--compact"><div><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.titleFirst}<br /><em>{copy.titleSecond}</em></h1><p className="page-header__lede">{copy.description}</p></div></header>
      <section className="guide-steps" aria-label={copy.stepsLabel}>
        <article className="guide-step"><span className="guide-step__number">01</span><span className="guide-step__character" lang="zh-CN">学</span><h2>{copy.start}</h2><p>{copy.startText}</p></article>
        <article className="guide-step"><span className="guide-step__number">02</span><span className="guide-step__character" lang="zh-CN">学生</span><h2>{copy.branches}</h2><p>{copy.branchesText}</p></article>
        <article className="guide-step"><span className="guide-step__number">03</span><span className="guide-step__character guide-step__character--labels">HSK 1</span><h2>{copy.labels}</h2><p>{copy.labelsText}</p></article>
      </section>
      <section className="guide-demo" aria-labelledby="guide-demo-heading"><div className="section-heading"><div><p className="eyebrow">{copy.context}</p><h2 id="guide-demo-heading">{copy.mapIsLesson}</h2></div><button className="text-button" type="button" onClick={() => onOpenFamily(family.id)}>{copy.openFull} ↗</button></div><FamilyMap family={family} root={root} words={words} audio={audio} onOpenWord={onOpenWord} /></section>
      <section className="guide-footer"><div><p className="eyebrow">{copy.longer}</p><h2>{copy.built}</h2></div><button className="button button--secondary" type="button" onClick={onOpenAbout}>{copy.sourceNotes} →</button></section>
    </div>
  )
}
