import type { Character, Family, Word } from '../content/types'
import { FamilyCard } from '../components/FamilyCard'
import { EmptyState } from '../components/EmptyState'

interface FamilyLibraryPageProps {
  families: Family[]
  getRoot: (family: Family) => Character
  getWords: (family: Family) => Word[]
  savedFamilies: string[]
  filter: 'all' | 'hsk' | 'hsk2' | 'saved' | 'recent'
  onFilter: (filter: 'all' | 'hsk' | 'hsk2' | 'saved' | 'recent') => void
  recentFamilies: string[]
  onOpenFamily: (id: string) => void
  onToggleSaved: (id: string) => void
  onOpenWord: (id: string) => void
  audio: { playingKey: string | null; onPlay: (key: string, text: string) => void; onStop: () => void }
}

const filters: Array<{ id: FamilyLibraryPageProps['filter']; label: string }> = [
  { id: 'all', label: 'All families' },
  { id: 'hsk', label: 'HSK 1 core' },
  { id: 'hsk2', label: 'HSK 2 verified' },
  { id: 'saved', label: 'Saved' },
  { id: 'recent', label: 'Recently viewed' },
]

export function FamilyLibraryPage({ families, getRoot, getWords, savedFamilies, filter, onFilter, recentFamilies, onOpenFamily, onToggleSaved, onOpenWord, audio }: FamilyLibraryPageProps) {
  const visibleFamilies = families.filter((family) => {
    if (filter === 'saved') return savedFamilies.includes(family.id)
    if (filter === 'recent') return recentFamilies.includes(family.id)
    if (filter === 'hsk') return getWords(family).some((word) => word.hskLevel === 'HSK 1')
    if (filter === 'hsk2') return getWords(family).some((word) => word.hskLevel === 'HSK 2')
    return true
  }).sort((a, b) => filter === 'recent' ? recentFamilies.indexOf(a.id) - recentFamilies.indexOf(b.id) : a.sortOrder - b.sortOrder)

  return (
    <div className="page page--library">
      <header className="page-header page-header--library">
        <div>
          <p className="eyebrow">A visual vocabulary browser · HSK 1 scope</p>
          <h1>See the words<br /><em>connect.</em></h1>
          <p className="page-header__lede">Browse beginner Mandarin through small, memorable word families.</p>
        </div>
        <div className="header-aside" aria-label="Library summary">
          <span className="header-aside__number">{families.length}</span>
          <span>curated<br />word maps</span>
        </div>
      </header>
      <div className="filter-row" role="tablist" aria-label="Filter families">
        {filters.map((item) => <button className={`filter-button${filter === item.id ? ' is-active' : ''}`} key={item.id} type="button" role="tab" aria-selected={filter === item.id} onClick={() => onFilter(item.id)}>{item.label}</button>)}
      </div>
      {visibleFamilies.length > 0 ? <section className="family-grid" aria-label="Word families">
        {visibleFamilies.map((family) => <FamilyCard key={family.id} family={family} root={getRoot(family)} words={getWords(family)} saved={savedFamilies.includes(family.id)} onOpen={() => onOpenFamily(family.id)} onToggleSaved={() => onToggleSaved(family.id)} onOpenWord={onOpenWord} audio={audio} />)}
      </section> : <EmptyState eyebrow="Nothing here yet" title="Your shelf is waiting." description="Save a family or open one to start building a small personal reference shelf." action={{ label: 'Browse all families', onClick: () => onFilter('all') }} />}
    </div>
  )
}
