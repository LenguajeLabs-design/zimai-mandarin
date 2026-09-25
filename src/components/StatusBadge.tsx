import type { ContentLabel } from '../content/types'
import { useExplanationLanguage } from '../hooks/useExplanationLanguage'

export function StatusBadge({ label }: { label: ContentLabel }) {
  const { language } = useExplanationLanguage()
  return <span className={`status-badge status-badge--${label === 'Related' ? 'related' : 'hsk'}`}>{label === 'Related' && language === 'ko' ? '관련 단어' : label}</span>
}
