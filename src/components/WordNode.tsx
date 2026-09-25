import type { Character, Word } from '../content/types'
import { highlightedCharacters } from '../content/utils'
import { AudioButton } from './AudioButton'
import { StatusBadge } from './StatusBadge'

interface WordNodeProps {
  word: Word
  root: Character
  onOpen: (wordId: string) => void
  audio: { playingKey: string | null; onPlay: (key: string, text: string) => void; onStop: () => void }
  compact?: boolean
}

function HighlightedWord({ word, root }: { word: Word; root: Character }) {
  return (
    <span className="word-hanzi" lang="zh-CN">
      {highlightedCharacters(word.hanzi, root.hanzi).map(({ character, isRoot }, index) => <span className={isRoot ? 'root-char' : undefined} key={`${character}-${index}`}>{character}</span>)}
    </span>
  )
}

export function WordNode({ word, root, onOpen, audio, compact = false }: WordNodeProps) {
  return (
    <article className={`word-node${compact ? ' word-node--compact' : ''}`}>
      <button className="word-node__main" type="button" onClick={() => onOpen(word.id)} aria-label={`Open ${word.hanzi}, ${word.gloss}`}>
        <span className="word-node__hanzi"><HighlightedWord word={word} root={root} /></span>
        {!compact && <span className="word-node__details"><span className="word-node__pinyin">{word.pinyin}</span><span className="word-node__gloss">{word.gloss}</span></span>}
      </button>
      {compact ? <><span className="word-node__compact-copy"><span className="word-node__pinyin">{word.pinyin}</span><span className="word-node__gloss">{word.gloss}</span><span className="word-node__compact-status"><StatusBadge label={word.hskLevel} /></span></span><AudioButton audioKey={word.audioKey} text={word.hanzi} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} compact label={`Play audio for ${word.hanzi}, ${word.gloss}`} /></> : <span className="word-node__meta"><StatusBadge label={word.hskLevel} /><AudioButton audioKey={word.audioKey} text={word.hanzi} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} compact label={`Play audio for ${word.hanzi}, ${word.gloss}`} /></span>}
    </article>
  )
}
