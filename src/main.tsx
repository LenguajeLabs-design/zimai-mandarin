import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ExplanationLanguageProvider } from './hooks/useExplanationLanguage'
import './styles/tokens.css'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(<StrictMode><ExplanationLanguageProvider><App /></ExplanationLanguageProvider></StrictMode>)
