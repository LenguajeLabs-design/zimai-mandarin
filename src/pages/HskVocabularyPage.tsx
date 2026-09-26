import { useEffect, useMemo, useState } from 'react'
import type { Character, ContentLabel, Family, HskLevel, HskVocabularyEntry, Word } from '../content/types'
import type { HskFilter } from '../components/AppShell'
import { AudioButton } from '../components/AudioButton'
import { EmptyState } from '../components/EmptyState'
import { SearchInput } from '../components/SearchInput'
import { WordNode } from '../components/WordNode'
import { localizedWordGloss, siteCopy } from '../content/previewTranslations'
import { useExplanationLanguage } from '../hooks/useExplanationLanguage'
import { wordMatchesQuery } from '../content/utils'

interface HskVocabularyPageProps {
  words: Word[]
  hskVocabulary: HskVocabularyEntry[]
  hskSourceUrl: string
  families: Family[]
  getRoot: (family: Family) => Character
  initialLevel?: HskLevel
  initialFilter: HskFilter
  onOpenWord: (id: string) => void
  audio: { playingKey: string | null; onPlay: (key: string, text: string) => void; onStop: () => void }
}

interface HskListItem {
  entry: HskVocabularyEntry
  mappedWord?: Word
}

const levels: HskLevel[] = [1, 2, 3, 4, 5, 6]

function StandaloneHskRow({ entry, audio, language }: { entry: HskVocabularyEntry; audio: HskVocabularyPageProps['audio']; language: 'en' | 'ko' }) {
  const audioLabel = `${siteCopy[language].quick.play} ${entry.hanzi}, ${entry.gloss}`
  return (
    <article className="hsk-word-row">
      <div className="hsk-word-row__main">
        <span className="hsk-word-row__hanzi" lang="zh-CN">{entry.hanzi}</span>
        <span className="hsk-word-row__details"><span className="hsk-word-row__pinyin">{entry.pinyin}</span><span className="hsk-word-row__gloss">{entry.gloss}</span>{entry.traditional !== entry.hanzi && <span className="hsk-word-row__traditional">繁 {entry.traditional}</span>}</span>
      </div>
      <div className="hsk-word-row__meta"><span className="status-badge status-badge--hsk">HSK {entry.hskLevel}</span><span className="hsk-word-row__unmapped">Words to explore</span><AudioButton audioKey={`hsk-${entry.id}`} text={entry.hanzi} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} compact label={audioLabel} /></div>
    </article>
  )
}

export function HskVocabularyPage({ words, hskVocabulary, hskSourceUrl, families, getRoot, initialLevel, initialFilter, onOpenWord, audio }: HskVocabularyPageProps) {
  const { language } = useExplanationLanguage()
  const copy = siteCopy[language].hsk
  const [view, setView] = useState<HskFilter>(initialFilter)
  const [level, setLevel] = useState<HskLevel | 'all'>(initialLevel ?? 'all')
  const [query, setQuery] = useState('')
  const [expandedLevels, setExpandedLevels] = useState<Set<HskLevel>>(() => new Set([initialLevel ?? 1]))

  useEffect(() => {
    setView(initialFilter)
    setLevel(initialLevel ?? 'all')
    setQuery('')
    setExpandedLevels(new Set([initialLevel ?? 1]))
  }, [initialFilter, initialLevel])

  const familyById = useMemo(() => new Map(families.map((family) => [family.id, family])), [families])
  const mappedWordByHanzi = useMemo(() => new Map(words.map((word) => [word.hanzi, word])), [words])
  const hskItems = useMemo(() => hskVocabulary.map((entry) => ({ entry, mappedWord: mappedWordByHanzi.get(entry.hanzi) })), [hskVocabulary, mappedWordByHanzi])
  const exploreItems = useMemo(() => hskItems.filter((item) => !item.mappedWord), [hskItems])
  const sourceItems = view === 'explore' ? exploreItems : hskItems
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const visibleItems = sourceItems.filter(({ entry, mappedWord }) => {
    const levelMatches = level === 'all' || entry.hskLevel === level
    const localizedGloss = mappedWord ? localizedWordGloss(mappedWord, language) : ''
    const queryMatches = !normalizedQuery || [entry.hanzi, entry.traditional, entry.pinyin, entry.pinyinNumbered, entry.gloss, localizedGloss].join(' ').toLocaleLowerCase().includes(normalizedQuery) || (mappedWord ? wordMatchesQuery(mappedWord, query) : false)
    return levelMatches && queryMatches
  })
  const groups = levels.map((currentLevel) => ({
    level: currentLevel,
    items: visibleItems.filter(({ entry }) => entry.hskLevel === currentLevel).sort((a, b) => a.entry.pinyin.localeCompare(b.entry.pinyin)),
  })).filter((group) => group.items.length > 0)

  return (
    <div className="page page--hsk">
      <header className="page-header page-header--compact">
        <div><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="page-header__lede">{copy.description}</p><p className="hsk-source-note">{copy.sourcePrefix} <a href={hskSourceUrl} target="_blank" rel="noreferrer">{copy.sourceName} ↗</a></p></div>
        <div className="header-aside"><span className="header-aside__number">{hskItems.length}</span><span>{copy.wordCount}</span></div>
      </header>

      <section className="hsk-coverage-card" aria-labelledby="hsk-coverage-heading">
        <div><p className="eyebrow">{copy.exploreEyebrow}</p><h2 id="hsk-coverage-heading">{exploreItems.length > 0 ? copy.exploreTitle : copy.exploreEmptyTitle}</h2><p>{copy.exploreDescription}</p></div>
        <button className="button button--secondary" type="button" onClick={() => { setView('explore'); setLevel('all'); setExpandedLevels(new Set([1])) }}>{copy.openExplore} <span aria-hidden="true">→</span></button>
      </section>

      <div className="hsk-toolbar">
        <div className="hsk-view-tabs" role="tablist" aria-label={copy.viewLabel}>
          {(['all', 'explore'] as HskFilter[]).map((nextView) => <button className={`hsk-view-tab${view === nextView ? ' is-active' : ''}`} key={nextView} type="button" role="tab" aria-selected={view === nextView} onClick={() => { setView(nextView); setLevel('all'); setExpandedLevels(new Set([1])) }}>{copy[nextView]}<span>{nextView === 'all' ? hskItems.length : exploreItems.length}</span></button>)}
        </div>
        <div className="filter-row hsk-level-filter" role="tablist" aria-label={copy.levelLabel}>
          <button className={`filter-button${level === 'all' ? ' is-active' : ''}`} type="button" role="tab" aria-selected={level === 'all'} onClick={() => setLevel('all')}>{copy.allLevels}</button>
          {levels.map((nextLevel) => <button className={`filter-button${level === nextLevel ? ' is-active' : ''}`} key={nextLevel} type="button" role="tab" aria-selected={level === nextLevel} onClick={() => { setLevel(nextLevel); setExpandedLevels(new Set([nextLevel])) }}>HSK {nextLevel}</button>)}
        </div>
        <SearchInput value={query} onChange={setQuery} onClear={() => setQuery('')} />
      </div>

      {groups.length > 0 ? <div className="hsk-groups" aria-live="polite">
        {groups.map((group) => <section className="hsk-group" key={group.level} aria-labelledby={`hsk-level-${group.level}`}>
          {(() => { const expanded = Boolean(normalizedQuery) || level !== 'all' || expandedLevels.has(group.level); return <>
            <button className="hsk-group__toggle" type="button" aria-expanded={expanded} aria-controls={`hsk-words-${group.level}`} onClick={() => setExpandedLevels((current) => { const next = new Set(current); if (next.has(group.level)) next.delete(group.level); else next.add(group.level); return next })}>
              <span className="hsk-group__heading"><span><span className="eyebrow">{copy.groupEyebrow}</span><span className="hsk-group__title" id={`hsk-level-${group.level}`}>HSK {group.level}</span></span><span className="hsk-group__count">{group.items.length} {copy.words}</span><span className="hsk-group__chevron" aria-hidden="true">{expanded ? '−' : '+'}</span></span>
            </button>
            {expanded && <div className="hsk-group__words" id={`hsk-words-${group.level}`}>{group.items.map(({ entry, mappedWord }: HskListItem) => { const family = mappedWord ? familyById.get(mappedWord.familyId) : undefined; const sourceLabel = `HSK ${entry.hskLevel}` as ContentLabel; return mappedWord && family ? <WordNode key={entry.id} word={{ ...mappedWord, hskLevel: sourceLabel }} root={getRoot(family)} onOpen={onOpenWord} audio={audio} /> : <StandaloneHskRow key={entry.id} entry={entry} audio={audio} language={language} /> })}</div>}
          </> })()}
        </section>)}
      </div> : <EmptyState eyebrow={view === 'explore' ? copy.explore : copy.viewLabel} title={query ? copy.noMatches : copy.exploreEmptyTitle} description={query ? copy.noMatchesDescription : copy.exploreDescription} action={query ? { label: copy.reset, onClick: () => { setQuery(''); setLevel('all'); setView('all'); setExpandedLevels(new Set([1])) } } : view === 'explore' ? { label: copy.showAll, onClick: () => setView('all') } : undefined} />}
    </div>
  )
}
