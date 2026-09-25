import type { ReactNode } from 'react'

export type NavDestination = 'families' | 'review' | 'saved' | 'search' | 'guide' | 'about'

interface AppShellProps {
  current: NavDestination
  onNavigate: (destination: NavDestination) => void
  children: ReactNode
  savedCount: number
}

const navItems: Array<{ id: NavDestination; label: string; icon: string }> = [
  { id: 'families', label: 'Families', icon: '⌂' },
  { id: 'review', label: 'Review', icon: '↻' },
  { id: 'saved', label: 'Saved', icon: '♡' },
  { id: 'search', label: 'Search', icon: '⌕' },
]

export function AppShell({ current, onNavigate, children, savedCount }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="side-rail">
        <button className="brand" type="button" onClick={() => onNavigate('families')} aria-label="Go to Families">
          <span className="brand__mark">字</span>
          <span className="brand__name">Zìmài</span>
        </button>
        <div className="rail-rule" />
        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map((item) => <button className={`nav-item${current === item.id ? ' is-active' : ''}`} key={item.id} type="button" onClick={() => onNavigate(item.id)} aria-current={current === item.id ? 'page' : undefined}>
            <span className="nav-item__icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
            {item.id === 'saved' && savedCount > 0 && <span className="nav-item__count">{savedCount}</span>}
          </button>)}
        </nav>
        <div className="rail-footer">
          <span className="rail-footer__chinese">字脉</span>
          <span>See the words connect.</span>
          <button className="rail-footer__link" type="button" onClick={() => onNavigate('guide')}>Read the guide <span aria-hidden="true">↗</span></button>
        </div>
      </aside>
      <main className="main-content">{children}</main>
      <nav className="bottom-nav" aria-label="Mobile navigation">
        {navItems.map((item) => <button className={`nav-item${current === item.id ? ' is-active' : ''}`} key={item.id} type="button" onClick={() => onNavigate(item.id)} aria-current={current === item.id ? 'page' : undefined}>
          <span className="nav-item__icon" aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </button>)}
      </nav>
    </div>
  )
}
