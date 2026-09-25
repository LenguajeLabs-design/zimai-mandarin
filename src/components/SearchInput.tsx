interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  autoFocus?: boolean
}

export function SearchInput({ value, onChange, onClear, autoFocus = false }: SearchInputProps) {
  const { language } = useExplanationLanguage()
  const copy = siteCopy[language].search
  return (
    <label className="search-field">
      <span className="search-field__icon" aria-hidden="true">⌕</span>
      <span className="sr-only">{copy.label}</span>
      <input autoFocus={autoFocus} value={value} onChange={(event) => onChange(event.target.value)} placeholder={copy.placeholder} type="search" />
      {value && <button className="search-field__clear" type="button" onClick={onClear} aria-label={copy.clear}>×</button>}
    </label>
  )
}
import { siteCopy } from '../content/previewTranslations'
import { useExplanationLanguage } from '../hooks/useExplanationLanguage'
