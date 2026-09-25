import { useMemo, useState } from 'react'
import practiceData from '../content/practice.json'
import type { PracticeLesson, PracticeMode } from '../content/practiceTypes'
import { AudioButton } from '../components/AudioButton'

interface PracticePageProps {
  audio: { playingKey: string | null; onPlay: (key: string, text: string, audioUrl?: string) => void; onStop: () => void }
}

const lesson = practiceData as PracticeLesson

const modeLabels: Array<{ id: PracticeMode; number: string; label: string }> = [
  { id: 'scene', number: '01', label: 'Conversation' },
  { id: 'recall', number: '02', label: 'Recall' },
  { id: 'build', number: '03', label: 'Build a sentence' },
]

export function PracticePage({ audio }: PracticePageProps) {
  const [mode, setMode] = useState<PracticeMode>('scene')
  const [selectedTokens, setSelectedTokens] = useState<string[]>([])
  const [builderChecked, setBuilderChecked] = useState(false)
  const [recallChoice, setRecallChoice] = useState<number | null>(null)
  const isBuilderCorrect = selectedTokens.join('') === lesson.builder.tokens.join('')
  const completedSteps = useMemo(() => [mode !== 'scene', recallChoice !== null && lesson.recall.choices[recallChoice]?.isCorrect, isBuilderCorrect], [isBuilderCorrect, mode, recallChoice])

  const selectMode = (nextMode: PracticeMode) => {
    setMode(nextMode)
    if (nextMode === 'build') setBuilderChecked(false)
  }

  const addToken = (token: string) => {
    if (!selectedTokens.includes(token)) {
      setSelectedTokens((current) => [...current, token])
      setBuilderChecked(false)
    }
  }

  const removeToken = (token: string) => {
    setSelectedTokens((current) => current.filter((item) => item !== token))
    setBuilderChecked(false)
  }

  const chooseRecall = (index: number) => setRecallChoice(index)

  return (
    <div className="page page--practice">
      <header className="page-header page-header--compact practice-header">
        <div>
          <p className="eyebrow">Next layer · {lesson.level}</p>
          <h1>Use the words<br /><em>in motion.</em></h1>
          <p className="page-header__lede">Move from recognizing a family to using it in a small, everyday exchange.</p>
        </div>
        <div className="header-aside"><span className="header-aside__number">03</span><span>connected<br />practice steps</span></div>
      </header>

      <section className="practice-lesson" aria-labelledby="practice-lesson-heading">
        <div className="practice-lesson__intro">
          <div>
            <p className="eyebrow">{lesson.scene}</p>
            <h2 id="practice-lesson-heading">{lesson.title}</h2>
            <p>{lesson.description}</p>
          </div>
          <span className="practice-lesson__level">{lesson.level}</span>
        </div>

        <div className="practice-layout">
          <div className="practice-main">
            <div className="practice-tabs" role="tablist" aria-label="Practice steps">
              {modeLabels.map((item) => <button className={`practice-tab${mode === item.id ? ' is-active' : ''}`} key={item.id} type="button" role="tab" aria-selected={mode === item.id} onClick={() => selectMode(item.id)}>
                <span className="practice-tab__number">{completedSteps[modeLabels.findIndex((step) => step.id === item.id)] ? '✓' : item.number}</span>
                <span>{item.label}</span>
              </button>)}
            </div>

            {mode === 'scene' && <section className="practice-stage" aria-labelledby="conversation-heading">
              <div className="practice-stage__topline"><div><p className="eyebrow">Listen and notice</p><h3 id="conversation-heading">A short exchange</h3></div><span className="practice-stage__count">1 / 3</span></div>
              <div className="practice-dialogue">
                {lesson.dialogue.map((turn) => <article className="practice-turn" key={turn.audioKey}>
                  <span className="practice-turn__speaker" aria-label={`Speaker ${turn.speaker}`}>{turn.speaker}</span>
                  <div className="practice-turn__copy"><p className="practice-turn__hanzi" lang="zh-CN">{turn.hanzi}</p><p className="practice-turn__pinyin">{turn.pinyin}</p><p className="practice-turn__gloss">{turn.gloss}</p></div>
                  <AudioButton audioKey={turn.audioKey} text={turn.hanzi} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} compact label={`Play native recording for ${turn.hanzi}`} />
                </article>)}
              </div>
              <div className="practice-stage__footer"><p>Read the exchange once, then see what you can recall without looking.</p><button className="button button--primary" type="button" onClick={() => selectMode('recall')}>Try recall <span aria-hidden="true">→</span></button></div>
            </section>}

            {mode === 'recall' && <section className="practice-stage" aria-labelledby="recall-heading">
              <div className="practice-stage__topline"><div><p className="eyebrow">Listening recall</p><h3 id="recall-heading">What did you hear?</h3></div><span className="practice-stage__count">2 / 3</span></div>
              <div className="practice-recall__prompt"><p>{lesson.recall.prompt}</p><AudioButton audioKey={lesson.recall.audioKey} text={lesson.recall.audioText} playingKey={audio.playingKey} onPlay={audio.onPlay} onStop={audio.onStop} label="Play the practice sentence" /></div>
              <div className="practice-choices" role="radiogroup" aria-label="Choose the sentence">
                {lesson.recall.choices.map((choice, index) => <button className={`practice-choice${recallChoice === index ? ' is-selected' : ''}${recallChoice === index && choice.isCorrect ? ' is-correct' : ''}${recallChoice === index && !choice.isCorrect ? ' is-wrong' : ''}`} key={choice.hanzi} type="button" role="radio" aria-checked={recallChoice === index} onClick={() => chooseRecall(index)}>
                  <span className="practice-choice__radio" aria-hidden="true">{recallChoice === index ? (choice.isCorrect ? '✓' : '×') : ''}</span><span><strong lang="zh-CN">{choice.hanzi}</strong><small>{choice.pinyin} · {choice.gloss}</small></span>
                </button>)}
              </div>
              {recallChoice !== null && <p className={`practice-feedback${lesson.recall.choices[recallChoice].isCorrect ? ' is-positive' : ' is-retry'}`} role="status">{lesson.recall.choices[recallChoice].isCorrect ? `Nice. ${lesson.recall.answerNote}` : 'Not quite. Listen for 在家, “at home,” before the action.'}</p>}
              <div className="practice-stage__footer"><p>Native recording is shown as pending until a reviewed speaker is added.</p><button className="button button--primary" type="button" onClick={() => selectMode('build')}>Build the sentence <span aria-hidden="true">→</span></button></div>
            </section>}

            {mode === 'build' && <section className="practice-stage" aria-labelledby="builder-heading">
              <div className="practice-stage__topline"><div><p className="eyebrow">Sentence building</p><h3 id="builder-heading">{lesson.builder.prompt}</h3></div><span className="practice-stage__count">3 / 3</span></div>
              <p className="practice-builder__translation">{lesson.builder.translation}</p>
              <div className={`practice-builder__answer${builderChecked && isBuilderCorrect ? ' is-correct' : ''}${builderChecked && !isBuilderCorrect ? ' is-wrong' : ''}`} aria-live="polite">
                {selectedTokens.length === 0 ? <span className="practice-builder__placeholder">Tap the words below in order</span> : selectedTokens.map((token) => <button className="practice-builder__selected" key={token} type="button" onClick={() => removeToken(token)} aria-label={`Remove ${token}`}>{token}</button>)}
              </div>
              <div className="practice-builder__tiles" aria-label="Available words">
                {lesson.builder.tiles.map((token) => <button className={`practice-builder__tile${selectedTokens.includes(token) ? ' is-used' : ''}`} key={token} type="button" onClick={() => addToken(token)} disabled={selectedTokens.includes(token)} aria-pressed={selectedTokens.includes(token)}>{token}</button>)}
              </div>
              <div className="practice-builder__actions"><button className="text-button" type="button" onClick={() => { setSelectedTokens([]); setBuilderChecked(false) }}>Clear</button><button className="button button--primary" type="button" onClick={() => setBuilderChecked(true)} disabled={selectedTokens.length === 0}>Check answer <span aria-hidden="true">→</span></button></div>
              {builderChecked && <p className={`practice-feedback${isBuilderCorrect ? ' is-positive' : ' is-retry'}`} role="status">{isBuilderCorrect ? `That works. ${lesson.builder.note}` : 'The words are close. Tap a selected word to remove it, then try the order again.'}</p>}
              <div className="practice-stage__footer"><p>One small pattern is enough for today. Come back to the family map when you want another example.</p><button className="button button--secondary" type="button" onClick={() => selectMode('scene')}>Review conversation</button></div>
            </section>}
          </div>

          <aside className="practice-grammar" aria-labelledby="grammar-heading">
            <div className="practice-grammar__mark" lang="zh-CN">在</div>
            <p className="eyebrow">{lesson.grammar.label}</p>
            <h3 id="grammar-heading">{lesson.grammar.title}</h3>
            <p className="practice-grammar__pattern" lang="zh-CN">{lesson.grammar.pattern}</p>
            <p>{lesson.grammar.explanation}</p>
            <div className="practice-grammar__examples">
              {lesson.grammar.examples.map((example) => <div key={example.hanzi}><p lang="zh-CN">{example.hanzi}</p><span>{example.pinyin}</span><small>{example.gloss}</small></div>)}
            </div>
          </aside>
        </div>
      </section>

      <p className="practice-note"><span aria-hidden="true">◌</span> This is the first HSK 2–3 practice slice. More scenes will follow: ordering food, making plans, and talking about yesterday.</p>
    </div>
  )
}
