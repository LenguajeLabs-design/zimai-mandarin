interface EmptyStateProps {
  eyebrow?: string
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ eyebrow, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <div className="empty-state__mark" aria-hidden="true">字</div>
      <h2>{title}</h2>
      <p>{description}</p>
      {action && <button className="button button--secondary" type="button" onClick={action.onClick}>{action.label}</button>}
    </div>
  )
}
