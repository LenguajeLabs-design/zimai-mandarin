interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  autoFocus?: boolean
}

export function SearchInput({ value, onChange, onClear, autoFocus = false }: SearchInputProps) {
  return (
    <label className="search-field">
      <span className="search-field__icon" aria-hidden="true">⌕</span>
      <span className="sr-only">Search Chinese, pinyin, or English</span>
      <input autoFocus={autoFocus} value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search words, pinyin, or gloss" type="search" />
      {value && <button className="search-field__clear" type="button" onClick={onClear} aria-label="Clear search">×</button>}
    </label>
  )
}
