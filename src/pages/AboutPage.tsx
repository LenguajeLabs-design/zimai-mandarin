import type { Source } from '../content/types'
import { siteCopy } from '../content/previewTranslations'
import { useExplanationLanguage } from '../hooks/useExplanationLanguage'

interface AboutPageProps {
  source: Source
  onBrowse: () => void
  onGuide: () => void
}

export function AboutPage({ source, onBrowse, onGuide }: AboutPageProps) {
  const { language } = useExplanationLanguage()
  const copy = siteCopy[language].about
  return (
    <div className="page page--about">
      <header className="page-header page-header--compact"><div><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.titleFirst}<br /><em>{copy.titleSecond}</em></h1><p className="page-header__lede">{copy.description}</p></div></header>
      <section className="about-intro"><span className="about-intro__mark" lang="zh-CN">脉</span><p>{copy.intro}</p></section>
      <section className="about-grid" aria-label="Collection notes">
        <article className="about-card"><p className="eyebrow">{copy.policy}</p><h2>{copy.policyTitle}</h2><p>{copy.policyText}</p></article>
        <article className="about-card"><p className="eyebrow">{copy.audio}</p><h2>{copy.audioTitle}</h2><p>{copy.audioText}</p></article>
        <article className="about-card"><p className="eyebrow">{copy.local}</p><h2>{copy.localTitle}</h2><p>{copy.localText}</p></article>
      </section>
      <section className="source-panel" aria-labelledby="source-heading"><div><p className="eyebrow">{copy.source}</p><h2 id="source-heading">{source.name}</h2><p>{source.notes}</p></div><dl><div><dt>{copy.version}</dt><dd>{source.version}</dd></div><div><dt>{copy.level}</dt><dd>{source.level}</dd></div><div><dt>{copy.license}</dt><dd>{source.license}</dd></div></dl></section>
      <div className="about-actions"><button className="button button--primary" type="button" onClick={onBrowse}>{copy.browse} →</button><button className="text-button" type="button" onClick={onGuide}>{copy.guide}</button></div>
    </div>
  )
}
