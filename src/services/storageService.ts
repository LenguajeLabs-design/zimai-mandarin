export type ReviewRating = 'again' | 'good'

export interface ReviewProgress {
  dueAt: string
  intervalDays: number
  streak: number
  lastReviewedAt?: string
}

export interface LibraryState {
  version: number
  savedFamilies: string[]
  savedWords: string[]
  learnedWords: string[]
  recentFamilies: string[]
  reviewProgress: Record<string, ReviewProgress>
}

export const STORAGE_KEY = 'zimai-library-v1'
export const STORAGE_VERSION = 2
export const initialLibraryState: LibraryState = {
  version: STORAGE_VERSION,
  savedFamilies: [],
  savedWords: [],
  learnedWords: [],
  recentFamilies: [],
  reviewProgress: {},
}

export function readLibraryState(storage: Pick<Storage, 'getItem'>): LibraryState {
  try {
    const stored = storage.getItem(STORAGE_KEY)
    if (!stored) return initialLibraryState
    const parsed = JSON.parse(stored) as Partial<LibraryState>
    if (parsed.version !== 1 && parsed.version !== STORAGE_VERSION) return initialLibraryState
    return { ...initialLibraryState, ...parsed, reviewProgress: parsed.reviewProgress ?? {}, version: STORAGE_VERSION }
  } catch {
    return initialLibraryState
  }
}

export function writeLibraryState(storage: Pick<Storage, 'setItem'>, state: LibraryState): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(state))
}
