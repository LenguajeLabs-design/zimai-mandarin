import type { Character, Family, Word } from '../content/types'
import { EmptyState } from '../components/EmptyState'
import { FamilyCard } from '../components/FamilyCard'
import { StatusBadge } from '../components/StatusBadge'

interface SavedPageProps {
  families: Family[]
  getRoot: (family: Family) => Character
  getWords: (family: Family) => Word[]
  savedFamilies: string[]
  savedWords: string[]
  recentFamilies: string[]
  onOpenFamily: (id: string) => void
  onToggleSaved: (id: string) => void
  onOpenWord: (id: string) => void
  audio: { playingKey: string | null; onPlay: (key: string, text: string) => void; onStop: () => void }
}

export function SavedPage({ families, getRoot, getWords, savedFamilies, savedWords, recentFamilies, onOpenFamily, onToggleSaved, onOpenWord, audio }: SavedPageProps) {
  const savedFamilyItems = families.filter((family) => savedFamilies.includes(family.id))
  const recentItems = families.filter((family) => recentFamilies.includes(family.id)).sort((a, b) => recentFamilies.indexOf(a.id) - recentFamilies.indexOf(b.id))
  return (
    <div className="page page--saved">
      <header className="page-header page-header--compact"><div><p className="eyebrow">A low-pressure revisit space</p><h1>Your shelf.</h1><p className="page-header__lede">Keep the families and words you want to see again.</p></div></header>
      {savedFamilyItems.length === 0 && savedWords.length === 0 && recentItems.length === 0 ? <EmptyState eyebrow="Nothing saved yet" title="Your shelf is waiting." description="Save a family when its connections feel useful. Your choices stay on this device." action={{ label: 'Browse families', onClick: () => onOpenFamily('') }} /> : <>
        {savedFamilyItems.length > 0 && <section className="saved-section"><div className="section-heading"><div><p className="eyebrow">Saved families</p><h2>Maps to return to</h2></div></div><div className="family-grid family-grid--saved">{savedFamilyItems.map((family) => <FamilyCard key={family.id} family={family} root={getRoot(family)} words={getWords(family)} saved onOpen={() => onOpenFamily(family.id)} onToggleSaved={() => onToggleSaved(family.id)} onOpenWord={onOpenWord} audio={audio} />)}</div></section>}
        {savedWords.length > 0 && <section className="saved-section"><div className="section-heading"><div><p className="eyebrow">Saved words</p><h2>Small anchors</h2></div></div><div className="saved-word-list">{savedWords.map((id) => { const family = families.find((item) => getWords(item).some((word) => word.id === id)); const word = family && getWords(family).find((item) => item.id === id); return word && family ? <div className="saved-word" key={word.id}><div><span className="saved-word__hanzi" lang="zh-CN">{word.hanzi}</span><span className="saved-word__pinyin">{word.pinyin}</span><span className="saved-word__gloss">{word.gloss}</span></div><StatusBadge label={word.hskLevel} /></div> : null })}</div></section>}
        {recentItems.length > 0 && <section className="saved-section saved-section--recent"><div className="section-heading"><div><p className="eyebrow">Recently viewed</p><h2>Continue where you left off</h2></div></div><div className="recent-list">{recentItems.map((family) => <button className="recent-item" type="button" key={family.id} onClick={() => onOpenFamily(family.id)}><span className="recent-item__character" lang="zh-CN">{getRoot(family).hanzi}</span><span><strong>{family.title}</strong><small>{family.shortDescription}</small></span><span aria-hidden="true">→</span></button>)}</div></section>}
      </>}
    </div>
  )
}
