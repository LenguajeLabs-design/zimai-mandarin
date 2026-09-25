import type { Character, Family, Word } from '../content/types'
import { SearchInput } from '../components/SearchInput'
import { WordNode } from '../components/WordNode'
import { EmptyState } from '../components/EmptyState'
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
  const matchingWords = words.filter((word) => wordMatchesQuery(word, query))
  const groups = families.map((family) => ({ family, matches: matchingWords.filter((word) => word.familyId === family.id) })).filter((group) => group.matches.length > 0)
  return (
    <div className="page page--search">
      <header className="page-header page-header--compact"><div><p className="eyebrow">Find your way in</p><h1>Search the map.</h1><p className="page-header__lede">Try a character, tone-marked pinyin, or an English gloss.</p></div></header>
      <SearchInput value={query} onChange={onQueryChange} onClear={() => onQueryChange('')} autoFocus />
      {groups.length > 0 ? <section className="search-results" aria-live="polite"><p className="results-count">{matchingWords.length} {matchingWords.length === 1 ? 'word' : 'words'} across {groups.length} {groups.length === 1 ? 'family' : 'families'}</p>{groups.map(({ family, matches }) => <section className="search-group" key={family.id}><div className="search-group__header"><div><p className="eyebrow">{family.title}</p><p>{family.shortDescription}</p></div><button className="text-button" type="button" onClick={() => onOpenFamily(family.id)}>Open map ↗</button></div><div className="search-group__words">{matches.map((word) => <WordNode key={word.id} word={word} root={getRoot(family)} onOpen={onOpenWord} audio={audio} />)}</div></section>)}</section> : <EmptyState eyebrow={query ? 'No matches' : 'Start with a word'} title={query ? `Nothing matched “${query}”.` : 'A small search is a good start.'} description={query ? 'Try fewer letters, unaccented pinyin, or a shorter English gloss.' : 'Search across Chinese, pinyin, and the short English glosses in the library.'} action={query ? { label: 'Browse all families', onClick: onBrowse } : undefined} />}
    </div>
  )
}
