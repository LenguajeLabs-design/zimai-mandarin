import type { Character, Family, Word } from '../content/types'
import { FamilyCard } from '../components/FamilyCard'
import { FamilyMap } from '../components/FamilyMap'
import { EmptyState } from '../components/EmptyState'
import { localizedFamilyDescription, localizedFamilyTitle, siteCopy } from '../content/previewTranslations'
import { useExplanationLanguage } from '../hooks/useExplanationLanguage'

interface FamilyLibraryPageProps {
  families: Family[]
  getRoot: (family: Family) => Character
  getWords: (family: Family) => Word[]
  savedFamilies: string[]
  learnedWords: string[]
  filter: 'all' | 'hsk' | 'hsk2' | 'hsk3' | 'hsk4' | 'hsk5' | 'hsk6' | 'saved' | 'recent'
  onFilter: (filter: 'all' | 'hsk' | 'hsk2' | 'hsk3' | 'hsk4' | 'hsk5' | 'hsk6' | 'saved' | 'recent') => void
  recentFamilies: string[]
  onOpenFamily: (id: string) => void
  onToggleSaved: (id: string) => void
  onOpenWord: (id: string) => void
  audio: { playingKey: string | null; onPlay: (key: string, text: string) => void; onStop: () => void }
}

const filterIds: FamilyLibraryPageProps['filter'][] = ['all', 'hsk', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'saved', 'recent']

export function FamilyLibraryPage({ families, getRoot, getWords, savedFamilies, learnedWords, filter, onFilter, recentFamilies, onOpenFamily, onToggleSaved, onOpenWord, audio }: FamilyLibraryPageProps) {
  const { language } = useExplanationLanguage()
  const copy = siteCopy[language].library
  const visibleFamilies = families.filter((family) => {
    if (filter === 'saved') return savedFamilies.includes(family.id)
    if (filter === 'recent') return recentFamilies.includes(family.id)
    if (filter === 'hsk') return getWords(family).some((word) => word.hskLevel === 'HSK 1')
    if (filter === 'hsk2') return getWords(family).some((word) => word.hskLevel === 'HSK 2')
    if (filter === 'hsk3') return getWords(family).some((word) => word.hskLevel === 'HSK 3')
    if (filter === 'hsk4') return getWords(family).some((word) => word.hskLevel === 'HSK 4')
    if (filter === 'hsk5') return getWords(family).some((word) => word.hskLevel === 'HSK 5')
    if (filter === 'hsk6') return getWords(family).some((word) => word.hskLevel === 'HSK 6')
    return true
  }).sort((a, b) => filter === 'recent' ? recentFamilies.indexOf(a.id) - recentFamilies.indexOf(b.id) : a.sortOrder - b.sortOrder)

  const featuredFamily = visibleFamilies[0]
  const featuredRoot = featuredFamily ? getRoot(featuredFamily) : undefined
  const featuredWords = featuredFamily ? getWords(featuredFamily) : []
  const recentFamily = families.find((family) => family.id === recentFamilies[0]) ?? featuredFamily
  const savedFamilyItems = families.filter((family) => savedFamilies.includes(family.id)).slice(0, 3)
  const recentWords = recentFamily ? getWords(recentFamily) : []
  const recentLearnedCount = recentWords.filter((word) => learnedWords.includes(word.id)).length
  const recentProgress = recentWords.length > 0 ? Math.round((recentLearnedCount / recentWords.length) * 100) : 0

  return (
    <div className="page page--library page--layout-preview">
      <header className="layout-preview__hero">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.titleFirst}<br /><em>{copy.titleSecond}</em></h1>
          <p>{copy.description}</p>
        </div>
        <div className="layout-preview__hero-note"><span className="layout-preview__hero-note-mark" lang="zh-CN">字</span><span>{families.length} {copy.curatedMaps}</span></div>
      </header>
      <div className="filter-row" role="tablist" aria-label={copy.filterLabel}>
        {filterIds.map((id) => <button className={`filter-button${filter === id ? ' is-active' : ''}`} key={id} type="button" role="tab" aria-selected={filter === id} onClick={() => onFilter(id)}>{copy.filters[id]}</button>)}
      </div>
      {featuredFamily && featuredRoot ? <>
        <div className="layout-preview__library-grid">
          <section className="layout-preview__featured" aria-labelledby="featured-family-heading">
            <div className="layout-preview__section-topline"><div><p className="eyebrow">{copy.featured}</p><h2 id="featured-family-heading">{localizedFamilyTitle(featuredFamily, language)}</h2><p>{localizedFamilyDescription(featuredFamily, language)}</p></div><span className="layout-preview__number">{String(featuredFamily.sortOrder).padStart(2, '0')}</span></div>
            <div className="library-atlas__map-shell"><FamilyMap family={featuredFamily} root={featuredRoot} words={featuredWords} audio={audio} onOpenWord={onOpenWord} /></div>
            <button className="button button--primary" type="button" onClick={() => onOpenFamily(featuredFamily.id)}>{copy.openMap} <span aria-hidden="true">→</span></button>
          </section>
          <aside className="layout-preview__sidebar" aria-label={copy.sidebarLabel}>
            <section className="layout-preview__continue"><p className="eyebrow">{recentFamily ? copy.continueLearning : copy.startLearning}</p>{recentFamily ? <><div className="layout-preview__continue-heading"><span lang="zh-CN">{getRoot(recentFamily).hanzi}</span><div><h2>{localizedFamilyTitle(recentFamily, language)}</h2><p>{localizedFamilyDescription(recentFamily, language)}</p></div></div><div className="layout-preview__progress"><span style={{ width: `${recentProgress}%` }} /></div><div className="layout-preview__continue-footer"><span>{recentLearnedCount}/{recentWords.length} {copy.learned}</span><button className="text-button" type="button" onClick={() => onOpenFamily(recentFamily.id)}>{copy.continue} →</button></div></> : <p className="layout-preview__empty-copy">{copy.emptyDescription}</p>}</section>
            <section className="layout-preview__small-card"><div className="layout-preview__small-card-heading"><div><p className="eyebrow">{copy.yourShelf}</p><h2>{copy.savedMaps}</h2></div><span aria-hidden="true">↗</span></div>{savedFamilyItems.length > 0 ? <div className="layout-preview__saved-roots">{savedFamilyItems.map((family) => <button key={family.id} type="button" onClick={() => onOpenFamily(family.id)} aria-label={`${copy.openMap}: ${localizedFamilyTitle(family, language)}`}><span lang="zh-CN">{getRoot(family).hanzi}</span><small>{getRoot(family).pinyin}</small></button>)}</div> : <p className="layout-preview__empty-copy">{copy.savePrompt}</p>}</section>
            <section className="layout-preview__small-card layout-preview__review-card"><div className="layout-preview__review-mark" aria-hidden="true">↻</div><div><p className="eyebrow">{copy.reviewGently}</p><h2>{copy.keepThread}</h2><p>{copy.returnToWords}</p></div><button className="text-button" type="button" onClick={() => onOpenFamily(recentFamily?.id ?? featuredFamily.id)}>{copy.returnToMap} →</button></section>
          </aside>
        </div>
        <section className="layout-preview__family-strip" aria-labelledby="collection-heading"><div className="layout-preview__section-topline"><div><p className="eyebrow">{copy.explore}</p><h2 id="collection-heading">{copy.moreWays}</h2></div><span className="layout-preview__muted-count">{visibleFamilies.length} {copy.mapCount}</span></div><div className="family-grid" aria-label={copy.mapCount}>{visibleFamilies.slice(1).map((family) => <FamilyCard key={family.id} family={family} root={getRoot(family)} words={getWords(family)} saved={savedFamilies.includes(family.id)} onOpen={() => onOpenFamily(family.id)} onToggleSaved={() => onToggleSaved(family.id)} onOpenWord={onOpenWord} audio={audio} />)}</div></section>
      </> : <EmptyState eyebrow={copy.emptyEyebrow} title={copy.emptyTitle} description={copy.emptyDescription} action={{ label: copy.browseAll, onClick: () => onFilter('all') }} />}
    </div>
  )
}
