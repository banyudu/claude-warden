import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Decision = 'allow' | 'deny' | 'ask'

interface CommandPart {
  cmd: string
  decision: Decision
  rule: string
}

interface Example {
  raw: string
  parts: CommandPart[]
  operators: string[]
  finalDecision: Decision
  finalRule: string
}

const examples: Example[] = [
  {
    raw: 'cat file.txt | grep pattern | wc -l',
    parts: [
      { cmd: 'cat file.txt', decision: 'allow', rule: 'built-in safe' },
      { cmd: 'grep pattern', decision: 'allow', rule: 'built-in safe' },
      { cmd: 'wc -l', decision: 'allow', rule: 'built-in safe' },
    ],
    operators: ['|', '|'],
    finalDecision: 'allow',
    finalRule: 'all allow → ALLOW',
  },
  {
    raw: 'npm run build && rm -rf /',
    parts: [
      { cmd: 'npm run build', decision: 'allow', rule: 'npm run *' },
      { cmd: 'rm -rf /', decision: 'deny', rule: 'destructive path' },
    ],
    operators: ['&&'],
    finalDecision: 'deny',
    finalRule: 'any deny → DENY',
  },
  {
    raw: 'git status && git push origin main',
    parts: [
      { cmd: 'git status', decision: 'allow', rule: 'git read-only' },
      { cmd: 'git push origin main', decision: 'ask', rule: 'git push' },
    ],
    operators: ['&&'],
    finalDecision: 'ask',
    finalRule: 'any ask → ASK',
  },
  {
    raw: 'pnpm test && pnpx vitest; echo done',
    parts: [
      { cmd: 'pnpm test', decision: 'allow', rule: 'pnpm safe cmd' },
      { cmd: 'pnpx vitest', decision: 'allow', rule: 'pnpx dev tool' },
      { cmd: 'echo done', decision: 'allow', rule: 'built-in safe' },
    ],
    operators: ['&&', ';'],
    finalDecision: 'allow',
    finalRule: 'all allow → ALLOW',
  },
  {
    raw: 'NODE_ENV=prod npm start && sudo reboot',
    parts: [
      { cmd: 'npm start', decision: 'allow', rule: 'npm start' },
      { cmd: 'sudo reboot', decision: 'deny', rule: 'always deny' },
    ],
    operators: ['&&'],
    finalDecision: 'deny',
    finalRule: 'any deny → DENY',
  },
]

const decisionColors: Record<Decision, string> = {
  allow: 'var(--color-allow)',
  deny: 'var(--color-deny)',
  ask: 'var(--color-ask)',
}

const decisionBg: Record<Decision, string> = {
  allow: 'rgba(52,211,153,0.1)',
  deny: 'rgba(248,113,113,0.1)',
  ask: 'rgba(251,191,36,0.1)',
}

type Phase = 'typing' | 'splitting' | 'evaluating' | 'combining'

export function AnimatedDemo() {
  const [exampleIdx, setExampleIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const [typedChars, setTypedChars] = useState(0)
  const [evaluatedIdx, setEvaluatedIdx] = useState(-1)
  const [showFinal, setShowFinal] = useState(false)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const example = examples[exampleIdx]

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  // Main animation sequence
  useEffect(() => {
    if (paused) return
    clearTimer()

    setPhase('typing')
    setTypedChars(0)
    setEvaluatedIdx(-1)
    setShowFinal(false)

    const cmd = examples[exampleIdx].raw
    let charIdx = 0

    const typeNext = () => {
      if (pausedRef.current) return
      charIdx++
      setTypedChars(charIdx)
      if (charIdx < cmd.length) {
        timerRef.current = setTimeout(typeNext, 30)
      } else {
        timerRef.current = setTimeout(() => {
          if (pausedRef.current) return
          setPhase('splitting')
          timerRef.current = setTimeout(() => startEval(), 800)
        }, 400)
      }
    }

    const startEval = () => {
      if (pausedRef.current) return
      setPhase('evaluating')
      const parts = examples[exampleIdx].parts
      let evalIdx = 0

      const evalNext = () => {
        if (pausedRef.current) return
        setEvaluatedIdx(evalIdx)
        evalIdx++
        if (evalIdx < parts.length) {
          timerRef.current = setTimeout(evalNext, 700)
        } else {
          timerRef.current = setTimeout(() => {
            if (pausedRef.current) return
            setPhase('combining')
            timerRef.current = setTimeout(() => setShowFinal(true), 400)
            // Advance to next example
            timerRef.current = setTimeout(() => {
              if (pausedRef.current) return
              setExampleIdx((i) => (i + 1) % examples.length)
            }, 3000)
          }, 600)
        }
      }
      timerRef.current = setTimeout(evalNext, 300)
    }

    timerRef.current = setTimeout(typeNext, 500)

    return clearTimer
  }, [exampleIdx, paused])

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  const selectExample = useCallback((idx: number) => {
    setPaused(false)
    setExampleIdx(idx)
  }, [])

  // Highlight operators in typed text
  const renderTypedText = () => {
    const text = example.raw.slice(0, typedChars)
    // Highlight operators
    const parts: { text: string; isOp: boolean }[] = []
    let remaining = text
    const opPattern = /(\|\||&&|[|;])/
    while (remaining) {
      const match = remaining.match(opPattern)
      if (match && match.index !== undefined) {
        if (match.index > 0) parts.push({ text: remaining.slice(0, match.index), isOp: false })
        parts.push({ text: match[1], isOp: true })
        remaining = remaining.slice(match.index + match[1].length)
      } else {
        parts.push({ text: remaining, isOp: false })
        break
      }
    }
    return parts.map((p, i) => (
      <span key={i} style={p.isOp ? { color: 'var(--color-operator)', fontWeight: 700 } : undefined}>
        {p.text}
      </span>
    ))
  }

  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">See It In Action</h2>
        <p className="section-subtitle">
          Watch how compound commands are parsed and evaluated in real time.
        </p>
      </motion.div>

      {/* Example selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {examples.map((ex, i) => (
          <button
            key={i}
            onClick={() => selectExample(i)}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: `1px solid ${i === exampleIdx ? 'var(--accent-blue)' : 'var(--border)'}`,
              background: i === exampleIdx ? 'rgba(96,165,250,0.1)' : 'transparent',
              color: i === exampleIdx ? 'var(--accent-blue)' : 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Ex {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPaused(!paused)}
          style={{
            marginLeft: 'auto',
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid var(--border)',
            background: paused ? 'rgba(251,191,36,0.1)' : 'transparent',
            color: paused ? 'var(--color-ask)' : 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            cursor: 'pointer',
          }}
        >
          {paused ? '▶ Play' : '⏸ Pause'}
        </button>
      </div>

      <div className="terminal" style={{ position: 'relative' }}>
        <div className="terminal-header">
          <div className="terminal-dot red" />
          <div className="terminal-dot yellow" />
          <div className="terminal-dot green" />
          <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--text-muted)' }}>
            warden evaluation
          </span>
          <span style={{
            marginLeft: 'auto',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            textTransform: 'capitalize',
          }}>
            {phase}
          </span>
        </div>
        <div className="terminal-body" style={{ padding: 24, minHeight: 320 }}>
          {/* Phase 1: Input command with typing */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Input
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>$</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}>
                {renderTypedText()}
                {phase === 'typing' && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    style={{ display: 'inline-block', width: 8, height: 16, background: 'var(--text-primary)', verticalAlign: 'text-bottom', marginLeft: 2 }}
                  />
                )}
              </span>
            </div>
          </div>

          {/* Phase 2 + 3: Split cards with evaluation */}
          <AnimatePresence>
            {(phase === 'splitting' || phase === 'evaluating' || phase === 'combining') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ marginBottom: 20 }}
              >
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Parsed Commands
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  {example.parts.map((part, i) => {
                    const evaluated = phase !== 'splitting' && i <= evaluatedIdx
                    const isEvaluating = phase === 'evaluating' && i === evaluatedIdx
                    return (
                      <div key={`${exampleIdx}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, x: -20 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            borderColor: evaluated ? decisionColors[part.decision] : 'var(--border)',
                          }}
                          transition={{
                            duration: 0.4,
                            delay: i * 0.12,
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                          }}
                          style={{
                            padding: '10px 14px',
                            borderRadius: 8,
                            border: '1px solid var(--border)',
                            background: evaluated ? decisionBg[part.decision] : 'var(--bg-secondary)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: 13,
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          {/* Scan line effect */}
                          {isEvaluating && (
                            <motion.div
                              initial={{ left: '-100%' }}
                              animate={{ left: '100%' }}
                              transition={{ duration: 0.6, ease: 'easeInOut' }}
                              style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                width: '50%',
                                background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.2), transparent)',
                                pointerEvents: 'none',
                              }}
                            />
                          )}
                          <span>{part.cmd}</span>
                          {/* Decision badge */}
                          <AnimatePresence>
                            {evaluated && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                style={{
                                  display: 'inline-block',
                                  marginLeft: 10,
                                  padding: '2px 8px',
                                  borderRadius: 4,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em',
                                  color: decisionColors[part.decision],
                                  background: `${decisionColors[part.decision]}20`,
                                }}
                              >
                                {part.decision}
                              </motion.span>
                            )}
                          </AnimatePresence>
                          {/* Rule name */}
                          <AnimatePresence>
                            {evaluated && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ delay: 0.15 }}
                                style={{
                                  fontSize: 10,
                                  color: 'var(--text-muted)',
                                  marginTop: 4,
                                }}
                              >
                                {part.rule}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        {/* Operator between cards */}
                        {i < example.operators.length && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.12 + 0.2 }}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 13,
                              fontWeight: 700,
                              color: 'var(--color-operator)',
                            }}
                          >
                            {example.operators[i]}
                          </motion.span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 4: Final decision */}
          <AnimatePresence>
            {phase === 'combining' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Result
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {/* Convergence arrows */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                  }}>
                    {example.parts.map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        →
                      </motion.span>
                    ))}
                  </div>

                  <AnimatePresence>
                    {showFinal && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 8,
                          padding: '16px 32px',
                          borderRadius: 12,
                          border: `2px solid ${decisionColors[example.finalDecision]}`,
                          background: decisionBg[example.finalDecision],
                          position: 'relative',
                        }}
                      >
                        {/* Glow effect */}
                        <motion.div
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{
                            position: 'absolute',
                            inset: -8,
                            borderRadius: 16,
                            background: `${decisionColors[example.finalDecision]}10`,
                            filter: 'blur(8px)',
                            pointerEvents: 'none',
                          }}
                        />
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 24,
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          color: decisionColors[example.finalDecision],
                          position: 'relative',
                        }}>
                          {example.finalDecision}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 12,
                          color: 'var(--text-muted)',
                          position: 'relative',
                        }}>
                          {example.finalRule}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
