import { useEffect, useRef, useState } from 'react'
import HanziWriter from 'hanzi-writer'
import type { Character } from '../content/types'

interface StrokeOrderSheetProps {
  character: Character
  onClose: () => void
}

type SheetStatus = 'loading' | 'ready' | 'error'

export function StrokeOrderSheet({ character, onClose }: StrokeOrderSheetProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const writerRef = useRef<ReturnType<typeof HanziWriter.create> | null>(null)
  const [status, setStatus] = useState<SheetStatus>('loading')
  const [isPracticing, setIsPracticing] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    let isMounted = true
    const mountNode = document.createElement('div')
    mountNode.className = 'stroke-order-writer'
    canvasRef.current.appendChild(mountNode)
    const writer = HanziWriter.create(mountNode, character.hanzi, {
      width: 230,
      height: 230,
      padding: 20,
      showOutline: false,
      showCharacter: false,
      strokeColor: '#536fe8',
      radicalColor: '#3554c6',
      highlightColor: '#536fe8',
      outlineColor: '#d8e1ea',
      drawingColor: '#3554c6',
      strokeAnimationSpeed: 1.1,
      delayBetweenStrokes: 340,
      onLoadCharDataSuccess: () => { if (isMounted) setStatus('ready') },
      onLoadCharDataError: () => { if (isMounted) setStatus('error') },
    })
    writerRef.current = writer
    void writer.animateCharacter()

    return () => {
      isMounted = false
      writer.cancelQuiz()
      void writer.pauseAnimation()
      mountNode.remove()
      writerRef.current = null
    }
  }, [character.hanzi])

  const replay = () => {
    setIsPracticing(false)
    writerRef.current?.cancelQuiz()
    void writerRef.current?.animateCharacter()
  }

  const practice = () => {
    if (!writerRef.current) return
    setIsPracticing(true)
    void writerRef.current.quiz({
      showHintAfterMisses: 2,
      highlightOnComplete: true,
      onComplete: () => setIsPracticing(false),
    })
  }

  return (
    <div className="stroke-order-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="stroke-order-sheet" role="dialog" aria-modal="true" aria-labelledby="stroke-order-title">
        <div className="stroke-order-sheet__topline"><span className="eyebrow">Writing practice</span><button className="icon-button" type="button" onClick={onClose} aria-label="Close writing practice">×</button></div>
        <div className="stroke-order-sheet__heading">
          <div className="stroke-order-sheet__character" lang="zh-CN">{character.hanzi}</div>
          <div><h2 id="stroke-order-title">{character.hanzi}</h2><p>{character.pinyin} · {character.gloss}</p></div>
        </div>
        <div className="stroke-order-stage" aria-label={`Stroke order animation for ${character.hanzi}`}>
          <div className="stroke-order-canvas" ref={canvasRef} />
          {status === 'loading' && <p className="stroke-order-stage__message">Loading stroke order…</p>}
          {status === 'error' && <p className="stroke-order-stage__message">Stroke order data could not load. Check your connection and try again.</p>}
        </div>
        <p className="stroke-order-sheet__instruction" role="status">{isPracticing ? 'Trace the character one stroke at a time.' : 'Watch the sequence, then try writing it yourself.'}</p>
        <div className="stroke-order-sheet__actions"><button className="button button--secondary" type="button" onClick={replay}>↻ Replay strokes</button><button className="button button--primary" type="button" onClick={practice} disabled={status !== 'ready' || isPracticing}>✎ Try writing it</button></div>
      </section>
    </div>
  )
}
