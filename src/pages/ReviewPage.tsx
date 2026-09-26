import { useMemo, useState } from 'react'
import type { Character, Family, Word } from '../content/types'
import { AudioButton } from '../components/AudioButton'
import { StatusBadge } from '../components/StatusBadge'
import { localizedFamilyTitle, localizedWordGloss, siteCopy } from '../content/previewTranslations'
import { useExplanationLanguage } from '../hooks/useExplanationLanguage'
import type { ReviewProgress, ReviewRating } from '../services/storageService'

interface ReviewPageProps {
  families: Family[]
  words: Word[]
  getRoot: (family: Family) => Character
  savedWords: string[]
  recentFamilies: string[]
  learnedWords: string[]
  reviewProgress: Record<string, ReviewProgress>
  onOpenFamily: (id: string) => void
  onOpenWord: (id: string) => void
  onToggleLearned: (id: string) => void
  onReview: (id: string, rating: ReviewRating) => void
  audio: { playingKey: string | null; onPlay: (key: string, text: string) => void; onStop: () => void }
}

function isDue(progress: ReviewProgress | undefined, now: number): boolean {
  return !progress || Date.parse(progress.dueAt) <= now
}

function reviewLabel(progress: ReviewProgress | undefined, now: number, language: 'en' | 'ko'): string {
  const copy = siteCopy[language].review
  if (!progress) return copy.newReady
  if (isDue(progress, now)) return copy.readyAgain
  if (progress.intervalDays === 1) return copy.nextTomorrow
  return language === 'ko' ? `${progress.intervalDays}${copy.nextDays}` : `${copy.nextDays} ${progress.intervalDays} days`
}

export function ReviewPage({ families, words, getRoot, savedWords, recentFamilies, learnedWords, reviewProgress, onOpenFamily, onOpenWord, onToggleLearned, onReview, audio }: ReviewPageProps) {
  const { language } = useExplanationLanguage()
  const copy = siteCopy[language].review
  const sourceWords = useMemo(() => {
    const saved = words.filter((word) => savedWords.includes(word.id))
    if (saved.length > 0) return saved
    const recent = families.filter((family) => recentFamilies.includes(family.id)).flatMap((family) => family.members.map((id) => words.find((word) => word.id === id))).filter((word): word is Word => Boolean(word))
    return recent.length > 0 ? recent : words.slice(0, 8)
  }, [families, recentFamilies, savedWords, words])
  const now = Date.now()
  const reviewWords = useMemo(() => [...sourceWords].sort((a, b) => {
    const aDue = isDue(reviewProgress[a.id], now)
    const bDue = isDue(reviewProgress[b.id], now)
    if (aDue !== bDue) return aDue ? -1 : 1
    return (Date.parse(reviewProgress[a.id]?.dueAt ?? '') || 0) - (Date.parse(reviewProgress[b.id]?.dueAt ?? '') || 0)
  }), [now, reviewProgress, sourceWords])
  const [activeIndex, setActiveIndex] = useState(0)
  const current = reviewWords[activeIndex % reviewWords.length]
  const family = families.find((item) => item.id === current.familyId)!
  const root = getRoot(family)
  const learnedCount = reviewWords.filter((word) => learnedWords.includes(word.id)).length
  const dueCount = reviewWords.filter((word) => isDue(reviewProgress[word.id], now)).length
  const currentProgress = reviewProgress[current.id]
  const handleReview = (rating: ReviewRating) => {
    onReview(current.id, rating)
    if (rating === 'good' && !learnedWords.includes(current.id)) onToggleLearned(current.id)
    setActiveIndex(0)
  }

  return (
    <div className="page page--review">
      <header className="page-header page-header--compact review-header">
        <div><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.titleFirst}<br /><em>{copy.titleSecond}</em></h1><p className="page-header__lede">{copy.description}</p></div>
        <div className="review-summary"><span className="review-summary__number">{dueCount}</span><span>{copy.ready}<small>{learnedCount}/{reviewWords.length} {copy.learnedSet}</small></span></div>
      </header>
      <div className="review-layout">
        <section className="review-card" aria-labelledby="review-word-heading">
          <div className="review-card__topline"><p className="eyebrow">{savedWords.length > 0 ? copy.savedSource : copy.starterSource}</p><span className="review-card__position">{(activeIndex % reviewWords.length) + 1} / {reviewWords.length}</span></div>
          <button className="review-card__word-button" type="button" onClick={() => onOpenWord(current.id)} aria-label={`${current.hanzi}, ${localizedWordGloss(current, language)}`}>
            <span className="review-card__hanzi" lang="zh-CN">{[...current.hanzi].map((character, index) => <span className={character === root.hanzi ? 'root-char' : undefined} key={`${character}-${index}`}>{character}</span>)}</span>
            <span className="review-card__pinyin">{current.pinyin}</span>
            <span className="review-card__gloss">{localizedWordGloss(current, language)}</span>
          </button>
          <div className="review-card__meta"><StatusBadge label={current.hskLevel} />{learnedWords.includes(current.id) && <span className="review-card__learned">✓ {copy.learned}</span>}<AudioButton audioKey={current.audioKey} text={current.hanzi} audioUrl={current.audio?.natural} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} label={`${copy.play} ${current.hanzi}`} /></div>
          <div className="review-card__schedule" role="status"><span className={`review-card__schedule-dot${dueCount > 0 && isDue(currentProgress, now) ? ' is-ready' : ''}`} aria-hidden="true" />{reviewLabel(currentProgress, now, language)}</div>
          <button className="review-card__family" type="button" onClick={() => onOpenFamily(family.id)}><span className="review-card__family-root" lang="zh-CN">{root.hanzi}</span><span><small>{copy.context}</small><strong>{localizedFamilyTitle(family, language)}</strong></span><span aria-hidden="true">→</span></button>
          <div className="review-card__actions"><button className="button button--secondary" type="button" onClick={() => handleReview('again')}>{copy.again}</button><button className="button button--primary" type="button" onClick={() => handleReview('good')}>{copy.good} <span aria-hidden="true">→</span></button></div>
          <button className={`learn-button review-card__manual-learn${learnedWords.includes(current.id) ? ' is-learned' : ''}`} type="button" onClick={() => onToggleLearned(current.id)}>{learnedWords.includes(current.id) ? `✓ ${copy.marked}` : copy.manual}</button>
        </section>
        <aside className="review-list" aria-labelledby="review-list-heading"><div className="section-heading"><div><p className="eyebrow">{copy.smallSet}</p><h2 id="review-list-heading">{copy.keepThread}</h2></div></div>{reviewWords.map((word, index) => <button className={`review-list__item${index === activeIndex % reviewWords.length ? ' is-active' : ''}`} type="button" key={word.id} onClick={() => setActiveIndex(index)}><span className="review-list__index">{String(index + 1).padStart(2, '0')}</span><span><strong lang="zh-CN">{word.hanzi}</strong><small>{word.pinyin} · {localizedWordGloss(word, language)}</small></span>{learnedWords.includes(word.id) && <span className="review-list__check" aria-label={copy.learnedMark}>✓</span>}</button>)}</aside>
      </div>
    </div>
  )
}
