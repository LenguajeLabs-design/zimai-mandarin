import type { Character, Family, Word } from '../content/types'
import { FamilyMap } from '../components/FamilyMap'

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
  return (
    <div className="page page--guide">
      <header className="page-header page-header--compact"><div><p className="eyebrow">A two-minute orientation</p><h1>How to read<br /><em>a word map.</em></h1><p className="page-header__lede">Zìmài helps you see a recurring character first, then notice how each compound turns toward a new meaning.</p></div></header>
      <section className="guide-steps" aria-label="How to read a word map">
        <article className="guide-step"><span className="guide-step__number">01</span><span className="guide-step__character" lang="zh-CN">学</span><h2>Start with the anchor.</h2><p>The large character is the visual root. Hear it, read its pinyin, and take in the short gloss.</p></article>
        <article className="guide-step"><span className="guide-step__number">02</span><span className="guide-step__character" lang="zh-CN">学生</span><h2>Follow the branches.</h2><p>Look for the recurring character inside each compound. The other character points the meaning in a new direction.</p></article>
        <article className="guide-step"><span className="guide-step__number">03</span><span className="guide-step__character guide-step__character--labels">HSK 1</span><h2>Keep the labels honest.</h2><p>HSK 1 marks the selected source list. Related marks a useful extension, not a claim about the curriculum.</p></article>
      </section>
      <section className="guide-demo" aria-labelledby="guide-demo-heading"><div className="section-heading"><div><p className="eyebrow">See one in context</p><h2 id="guide-demo-heading">The map is the lesson.</h2></div><button className="text-button" type="button" onClick={() => onOpenFamily(family.id)}>Open full map ↗</button></div><FamilyMap family={family} root={root} words={words} audio={audio} onOpenWord={onOpenWord} /></section>
      <section className="guide-footer"><div><p className="eyebrow">Want the longer version?</p><h2>Read how the collection is built.</h2></div><button className="button button--secondary" type="button" onClick={onOpenAbout}>Content and source notes →</button></section>
    </div>
  )
}
