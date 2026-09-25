import type { Source } from '../content/types'

interface AboutPageProps {
  source: Source
  onBrowse: () => void
  onGuide: () => void
}

export function AboutPage({ source, onBrowse, onGuide }: AboutPageProps) {
  return (
    <div className="page page--about">
      <header className="page-header page-header--compact"><div><p className="eyebrow">Content and source notes</p><h1>A small,<br /><em>deliberate collection.</em></h1><p className="page-header__lede">Zìmài is designed as a visual reference, not a claim to cover every beginner word or every HSK version.</p></div></header>
      <section className="about-intro"><span className="about-intro__mark" lang="zh-CN">脉</span><p>“Family” means a curated teaching grouping: a shared character, morpheme, or a beginner-useful relationship. It does not automatically mean historical etymology.</p></section>
      <section className="about-grid" aria-label="Collection notes">
        <article className="about-card"><p className="eyebrow">Content policy</p><h2>Curate the connection first.</h2><p>Each family is edited for visual usefulness. HSK membership stays separate from the family relationship, and useful outside-list words are labeled Related.</p></article>
        <article className="about-card"><p className="eyebrow">Audio</p><h2>Pronunciation stays close.</h2><p>Audio is reserved for reviewed native recordings. Items without an approved asset stay visibly pending rather than switching to robotic browser speech.</p></article>
        <article className="about-card"><p className="eyebrow">Local by design</p><h2>Your shelf stays yours.</h2><p>Saved, learned, and recently viewed states live in versioned local storage. There are no accounts, streaks, or cloud profiles in this first slice.</p></article>
      </section>
      <section className="source-panel" aria-labelledby="source-heading"><div><p className="eyebrow">Current prototype source</p><h2 id="source-heading">{source.name}</h2><p>{source.notes}</p></div><dl><div><dt>Version</dt><dd>{source.version}</dd></div><div><dt>Level</dt><dd>{source.level}</dd></div><div><dt>License</dt><dd>{source.license}</dd></div></dl></section>
      <div className="about-actions"><button className="button button--primary" type="button" onClick={onBrowse}>Browse the families →</button><button className="text-button" type="button" onClick={onGuide}>Read the guide</button></div>
    </div>
  )
}
