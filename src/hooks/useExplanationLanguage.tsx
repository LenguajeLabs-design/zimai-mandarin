import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type ExplanationLanguage = 'en' | 'ko'

const STORAGE_KEY = 'zimai-explanation-language-v1'

interface ExplanationLanguageContextValue {
  language: ExplanationLanguage
  setLanguage: (language: ExplanationLanguage) => void
}

const ExplanationLanguageContext = createContext<ExplanationLanguageContextValue | null>(null)

function getInitialLanguage(): ExplanationLanguage {
  if (typeof window === 'undefined') return 'en'

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'ko') return stored
  } catch {
    // A blocked or private storage context should not prevent the preview from loading.
  }

  return 'en'
}

export function ExplanationLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<ExplanationLanguage>(getInitialLanguage)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // The preference still applies for this session when storage is unavailable.
    }
  }, [language])

  return <ExplanationLanguageContext.Provider value={{ language, setLanguage }}>{children}</ExplanationLanguageContext.Provider>
}

export function useExplanationLanguage(): ExplanationLanguageContextValue {
  const context = useContext(ExplanationLanguageContext)
  if (!context) throw new Error('useExplanationLanguage must be used inside ExplanationLanguageProvider')
  return context
}
