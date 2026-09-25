import type { ContentLabel } from '../content/types'

export function StatusBadge({ label }: { label: ContentLabel }) {
  return <span className={`status-badge status-badge--${label === 'Related' ? 'related' : 'hsk'}`}>{label}</span>
}
