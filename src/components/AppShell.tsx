import type { ReactNode } from 'react'
import type { Theme } from '../hooks/useTheme'
import { useExplanationLanguage } from '../hooks/useExplanationLanguage'
import { siteCopy } from '../content/previewTranslations'

export type NavDestination = 'families' | 'review' | 'saved' | 'search' | 'guide' | 'about'

interface AppShellProps {
  current: NavDestination
  onNavigate: (destination: NavDestination) => void
  children: ReactNode
  savedCount: number
  theme: Theme
  onToggleTheme: () => void
}

const navItems: Array<{ id: NavDestination; icon: string }> = [
  { id: 'families', icon: '⌂' },
  { id: 'review', icon: '↻' },
  { id: 'saved', icon: '♡' },
  { id: 'search', icon: '⌕' },
]

export function AppShell({ current, onNavigate, children, savedCount, theme, onToggleTheme }: AppShellProps) {
  const { language, setLanguage } = useExplanationLanguage()
  const copy = siteCopy[language].app
  const isDark = theme === 'dark'
  const themeLabel = isDark ? copy.useLight : copy.useDark
  const themeToggle = (className = '') => <button className={`theme-toggle${className ? ` ${className}` : ''}`} type="button" onClick={onToggleTheme} aria-label={themeLabel} aria-pressed={isDark} title={themeLabel}>
    <span className="theme-toggle__icon" aria-hidden="true">{isDark ? '☼' : '☾'}</span>
    <span>{isDark ? copy.light : copy.dark}</span>
  </button>
  const languageToggle = (className = '') => <div className={`language-toggle${className ? ` ${className}` : ''}`} role="group" aria-label={copy.languageLabel}>
    <span className="language-toggle__label">{copy.languageLabel}</span>
    <button className={language === 'en' ? 'is-active' : ''} type="button" onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>EN</button>
    <button className={language === 'ko' ? 'is-active' : ''} type="button" onClick={() => setLanguage('ko')} aria-pressed={language === 'ko'}>한국어</button>
  </div>

  return (
    <div className="app-shell">
      <aside className="side-rail">
        <button className="brand" type="button" onClick={() => onNavigate('families')} aria-label={copy.brandLabel}>
          <span className="brand__mark">字</span>
          <span className="brand__name">Zìmài</span>
        </button>
        <div className="rail-rule" />
        <nav className="primary-nav" aria-label={copy.primaryNav}>
          {navItems.map((item) => <button className={`nav-item${current === item.id ? ' is-active' : ''}`} key={item.id} type="button" onClick={() => onNavigate(item.id)} aria-current={current === item.id ? 'page' : undefined}>
            <span className="nav-item__icon" aria-hidden="true">{item.icon}</span>
            <span>{copy.nav[item.id as keyof typeof copy.nav]}</span>
            {item.id === 'saved' && savedCount > 0 && <span className="nav-item__count">{savedCount}</span>}
          </button>)}
        </nav>
        {themeToggle()}
        {languageToggle()}
        <div className="rail-footer">
          <span className="rail-footer__chinese">字脉</span>
          <span>{copy.tagline}</span>
          <button className="rail-footer__link" type="button" onClick={() => onNavigate('guide')}>{copy.readGuide} <span aria-hidden="true">↗</span></button>
        </div>
      </aside>
      <main className="main-content">{children}</main>
      <nav className="bottom-nav" aria-label={copy.mobileNav}>
        {themeToggle('theme-toggle--mobile')}
        {languageToggle('language-toggle--mobile')}
        {navItems.map((item) => <button className={`nav-item${current === item.id ? ' is-active' : ''}`} key={item.id} type="button" onClick={() => onNavigate(item.id)} aria-current={current === item.id ? 'page' : undefined}>
          <span className="nav-item__icon" aria-hidden="true">{item.icon}</span>
          <span>{copy.nav[item.id as keyof typeof copy.nav]}</span>
        </button>)}
      </nav>
    </div>
  )
}
