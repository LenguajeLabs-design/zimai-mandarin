import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import rawContent from './content/content.json'
import type { ContentData, Family } from './content/types'
import { familyWords } from './content/utils'
import { AppShell, type NavDestination } from './components/AppShell'
import { QuickView } from './components/QuickView'
import { useAudio } from './hooks/useAudio'
import { useLibraryState } from './hooks/useLibraryState'
import { FamilyDetailPage } from './pages/FamilyDetailPage'
import { FamilyLibraryPage } from './pages/FamilyLibraryPage'
import { SavedPage } from './pages/SavedPage'
import { SearchPage } from './pages/SearchPage'
import { ReviewPage } from './pages/ReviewPage'
import { PracticePage } from './pages/PracticePage'
import { GuidePage } from './pages/GuidePage'
import { AboutPage } from './pages/AboutPage'

const content = rawContent as ContentData

type Route = { kind: 'library' | 'saved' | 'search' | 'review' | 'practice' | 'guide' | 'about' | 'detail' | 'word'; familyId?: string; wordId?: string; query?: string }

const appBasePath = import.meta.env.BASE_URL.replace(/\/$/, '')

function appPath(path: string) {
  return `${appBasePath}${path}`
}

function routePath(pathname: string) {
  if (appBasePath && appBasePath !== '/' && (pathname === appBasePath || pathname.startsWith(`${appBasePath}/`))) {
    return pathname.slice(appBasePath.length) || '/'
  }
  return pathname
}

function parseRouteFromPath(pathWithSearch: string): Route {
  const [pathname, search] = pathWithSearch.split('?')
  const path = routePath(pathname).replace(/\/$/, '') || '/families'
  if (path.startsWith('/families/')) return { kind: 'detail', familyId: path.split('/')[2] }
  if (path.startsWith('/words/')) return { kind: 'word', wordId: path.split('/')[2] }
  if (path === '/saved') return { kind: 'saved' }
  if (path === '/review') return { kind: 'review' }
  if (path === '/practice') return { kind: 'practice' }
  if (path === '/guide') return { kind: 'guide' }
  if (path === '/about') return { kind: 'about' }
  if (path === '/search') return { kind: 'search', query: new URLSearchParams(search ?? '').get('q') ?? '' }
  return { kind: 'library' }
}

function parseRoute(): Route {
  return parseRouteFromPath(`${window.location.pathname}${window.location.search}`)
}

function useRoute() {
  const [route, setRoute] = useState<Route>(parseRoute)
  const navigate = useCallback((path: string, from?: string) => {
    window.history.pushState({ from }, '', appPath(path))
    setRoute(parseRoute())
  }, [])
  useEffect(() => { const handlePopState = () => setRoute(parseRoute()); window.addEventListener('popstate', handlePopState); return () => window.removeEventListener('popstate', handlePopState) }, [])
  return { route, navigate }
}

function baseDestination(route: Route): NavDestination {
  if (route.kind === 'saved') return 'saved'
  if (route.kind === 'review') return 'review'
  if (route.kind === 'practice') return 'practice'
  if (route.kind === 'guide') return 'guide'
  if (route.kind === 'about') return 'about'
  if (route.kind === 'search') return 'search'
  return 'families'
}

export default function App() {
  const { route, navigate } = useRoute()
  const audio = useAudio()
  const library = useLibraryState()
  const [libraryFilter, setLibraryFilter] = useState<'all' | 'hsk' | 'hsk2' | 'hsk3' | 'saved' | 'recent'>('all')
  const currentPath = `${window.location.pathname}${window.location.search}`
  const backgroundRoute = route.kind === 'word' ? parseRouteFromPath(window.history.state?.from ?? '/families') : route
  const families = useMemo(() => [...content.families].sort((a, b) => a.sortOrder - b.sortOrder), [])
  const getRoot = useCallback((family: Family) => content.characters.find((character) => character.id === family.rootCharacterId)!, [])
  const getWords = useCallback((family: Family) => familyWords(family, content.words), [])
  const openFamily = useCallback((id: string) => navigate(`/families/${id}`), [navigate])
  const openWord = useCallback((id: string) => navigate(`/words/${id}`, currentPath), [currentPath, navigate])
  const goToDestination = useCallback((destination: NavDestination) => navigate(destination === 'families' ? '/families' : `/${destination}`), [navigate])
  const detailFamily = backgroundRoute.familyId ? families.find((family) => family.id === backgroundRoute.familyId) : undefined
  const quickWord = route.wordId ? content.words.find((word) => word.id === route.wordId) : undefined
  const quickFamily = quickWord ? families.find((family) => family.id === quickWord.familyId) : undefined
  const quickRoot = quickFamily ? getRoot(quickFamily) : undefined
  const detailIndex = detailFamily ? families.findIndex((family) => family.id === detailFamily.id) : -1
  const goToDetailOffset = (offset: number) => { const next = families[(detailIndex + offset + families.length) % families.length]; openFamily(next.id) }

  const closeQuickView = () => { const from = window.history.state?.from; if (from) navigate(from); else window.history.back() }
  const onSearchQueryChange = (query: string) => navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search')

  let page: ReactNode
  if (backgroundRoute.kind === 'detail' && detailFamily) {
    page = <FamilyDetailPage family={detailFamily} root={getRoot(detailFamily)} words={getWords(detailFamily)} saved={library.state.savedFamilies.includes(detailFamily.id)} learnedWords={library.state.learnedWords} onBack={() => goToDestination('families')} onToggleSaved={() => library.toggleSavedFamily(detailFamily.id)} onToggleLearned={library.toggleLearnedWord} onOpenWord={openWord} onPrevious={() => goToDetailOffset(-1)} onNext={() => goToDetailOffset(1)} audio={audio} onViewed={() => library.markFamilyViewed(detailFamily.id)} />
  } else if (backgroundRoute.kind === 'saved') {
    page = <SavedPage families={families} getRoot={getRoot} getWords={getWords} savedFamilies={library.state.savedFamilies} savedWords={library.state.savedWords} recentFamilies={library.state.recentFamilies} onOpenFamily={(id) => id ? openFamily(id) : goToDestination('families')} onToggleSaved={library.toggleSavedFamily} onOpenWord={openWord} audio={audio} />
  } else if (backgroundRoute.kind === 'review') {
    page = <ReviewPage families={families} words={content.words} getRoot={getRoot} savedWords={library.state.savedWords} recentFamilies={library.state.recentFamilies} learnedWords={library.state.learnedWords} reviewProgress={library.state.reviewProgress} onOpenFamily={openFamily} onOpenWord={openWord} onToggleLearned={library.toggleLearnedWord} onReview={library.recordReview} audio={audio} />
  } else if (backgroundRoute.kind === 'practice') {
    page = <PracticePage audio={audio} />
  } else if (backgroundRoute.kind === 'guide') {
    const guideFamily = families[0]
    page = <GuidePage family={guideFamily} root={getRoot(guideFamily)} words={getWords(guideFamily)} onOpenFamily={openFamily} onOpenWord={openWord} onOpenAbout={() => goToDestination('about')} audio={audio} />
  } else if (backgroundRoute.kind === 'about') {
    page = <AboutPage source={content.sources[0]} onBrowse={() => goToDestination('families')} onGuide={() => goToDestination('guide')} />
  } else if (backgroundRoute.kind === 'search') {
    page = <SearchPage query={backgroundRoute.query ?? ''} onQueryChange={onSearchQueryChange} families={families} getRoot={getRoot} words={content.words} onOpenWord={openWord} onOpenFamily={openFamily} audio={audio} onBrowse={() => goToDestination('families')} />
  } else {
    page = <FamilyLibraryPage families={families} getRoot={getRoot} getWords={getWords} savedFamilies={library.state.savedFamilies} filter={libraryFilter} onFilter={setLibraryFilter} recentFamilies={library.state.recentFamilies} onOpenFamily={openFamily} onToggleSaved={library.toggleSavedFamily} onOpenWord={openWord} audio={audio} />
  }

  return <AppShell current={baseDestination(backgroundRoute)} onNavigate={goToDestination} savedCount={library.state.savedFamilies.length}>{page}{quickWord && quickFamily && quickRoot && <QuickView word={quickWord} family={quickFamily} root={quickRoot} saved={library.state.savedWords.includes(quickWord.id)} learned={library.state.learnedWords.includes(quickWord.id)} onClose={closeQuickView} onToggleSaved={() => library.toggleSavedWord(quickWord.id)} onToggleLearned={() => library.toggleLearnedWord(quickWord.id)} audio={audio} />}</AppShell>
}
