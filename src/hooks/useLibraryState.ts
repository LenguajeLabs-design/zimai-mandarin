import { useCallback, useEffect, useState } from 'react'
import { readLibraryState, writeLibraryState, type LibraryState, type ReviewRating } from '../services/storageService'

export function useLibraryState() {
  const [state, setState] = useState<LibraryState>(() => readLibraryState(window.localStorage))

  useEffect(() => {
    writeLibraryState(window.localStorage, state)
  }, [state])

  const toggle = useCallback((key: 'savedFamilies' | 'savedWords' | 'learnedWords', id: string) => {
    setState((current) => {
      const values = current[key]
      return { ...current, [key]: values.includes(id) ? values.filter((value) => value !== id) : [...values, id] }
    })
  }, [])

  const markFamilyViewed = useCallback((familyId: string) => {
    setState((current) => ({
      ...current,
      recentFamilies: [familyId, ...current.recentFamilies.filter((id) => id !== familyId)].slice(0, 6),
    }))
  }, [])

  const recordReview = useCallback((wordId: string, rating: ReviewRating) => {
    setState((current) => {
      const previous = current.reviewProgress[wordId]
      const now = new Date()
      const intervalDays = rating === 'good' ? Math.min(Math.max(previous?.intervalDays ? Math.round(previous.intervalDays * 2.4) : 1, 1), 30) : 0
      const dueAt = new Date(now.getTime() + (rating === 'good' ? intervalDays * 24 * 60 * 60 * 1000 : 10 * 60 * 1000))
      return {
        ...current,
        reviewProgress: {
          ...current.reviewProgress,
          [wordId]: {
            dueAt: dueAt.toISOString(),
            intervalDays,
            streak: rating === 'good' ? (previous?.streak ?? 0) + 1 : 0,
            lastReviewedAt: now.toISOString(),
          },
        },
      }
    })
  }, [])

  return {
    state,
    toggleSavedFamily: (id: string) => toggle('savedFamilies', id),
    toggleSavedWord: (id: string) => toggle('savedWords', id),
    toggleLearnedWord: (id: string) => toggle('learnedWords', id),
    markFamilyViewed,
    recordReview,
  }
}
