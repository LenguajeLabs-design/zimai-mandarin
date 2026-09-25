import type { Character, Family, Word } from '../content/types'
import { SearchInput } from '../components/SearchInput'
import { WordNode } from '../components/WordNode'
import { EmptyState } from '../components/EmptyState'
import { localizedFamilyDescription, localizedFamilyTitle, localizedWordGloss, siteCopy } from '../content/previewTranslations'
import { useExplanationLanguage } from '../hooks/useExplanationLanguage'
import { wordMatchesQuery } from '../content/utils'

interface SearchPageProps {
  query: string
  onQueryChange: (query: string) => void
  families: Family[]
  getRoot: (family: Family) => Character
  words: Word[]
  onOpenWord: (id: string) => void
  onOpenFamily: (id: string) => void
  audio: { playingKey: string | null; onPlay: (key: string, text: string) => void; onStop: () => void }
  onBrowse: () => void
}

export function SearchPage({ query, onQueryChange, families, getRoot, words, onOpenWord, onOpenFamily, audio, onBrowse }: SearchPageProps) {
  const { language } = useExplanationLanguage()
  const copy = siteCopy[language].search
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const matchingWords = words.filter((word) => wordMatchesQuery(word, query) || (language === 'ko' && normalizedQuery.length > 0 && localizedWordGloss(word, language).toLocaleLowerCase().includes(normalizedQuery)))
  const groups = families.map((family) => ({ family, matches: matchingWords.filter((word) => word.familyId === family.id) })).filter((group) => group.matches.length > 0)
  return (
    <div className="page page--search">
      <header className="page-header page-header--compact"><div><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="page-header__lede">{copy.description}</p></div></header>
      <SearchInput value={query} onChange={onQueryChange} onClear={() => onQueryChange('')} autoFocus />
      {groups.length > 0 ? <section className="search-results" aria-live="polite"><p className="results-count">{matchingWords.length} {matchingWords.length === 1 ? copy.word : copy.words} · {groups.length} {groups.length === 1 ? copy.map : copy.maps}</p>{groups.map(({ family, matches }) => <section className="search-group" key={family.id}><div className="search-group__header"><div><p className="eyebrow">{localizedFamilyTitle(family, language)}</p><p>{localizedFamilyDescription(family, language)}</p></div><button className="text-button" type="button" onClick={() => onOpenFamily(family.id)}>{copy.openMap} ↗</button></div><div className="search-group__words">{matches.map((word) => <WordNode key={word.id} word={word} root={getRoot(family)} onOpen={onOpenWord} audio={audio} />)}</div></section>)}</section> : <EmptyState eyebrow={query ? copy.noMatches : copy.start} title={query ? `${copy.nothing} “${query}”.` : copy.start} description={query ? copy.tryFewer : copy.searchAcross} action={query ? { label: copy.browse, onClick: onBrowse } : undefined} />}
    </div>
  )
}
