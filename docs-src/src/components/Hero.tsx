import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const examples = [
  { cmd: 'cat file.txt | grep pattern | wc -l', decision: 'allow' as const },
  { cmd: 'npm run build && rm -rf /', decision: 'deny' as const },
  { cmd: 'git status && git push origin main', decision: 'ask' as const },
  { cmd: 'pnpm test && pnpx vitest', decision: 'allow' as const },
  { cmd: 'NODE_ENV=prod npm start && sudo reboot', decision: 'deny' as const },
]

const decisionColors = {
  allow: 'var(--color-allow)',
  deny: 'var(--color-deny)',
  ask: 'var(--color-ask)',
}

export function Hero() {
  const [exampleIdx, setExampleIdx] = useState(0)
  const [displayedChars, setDisplayedChars] = useState(0)
  const [showDecision, setShowDecision] = useState(false)
  const [copied, setCopied] = useState(false)

  const example = examples[exampleIdx]

  useEffect(() => {
    setDisplayedChars(0)
    setShowDecision(false)
    const cmd = examples[exampleIdx].cmd
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayedChars(i)
      if (i >= cmd.length) {
        clearInterval(interval)
        setTimeout(() => setShowDecision(true), 300)
      }
    }, 35)
    return () => clearInterval(interval)
  }, [exampleIdx])

  useEffect(() => {
    if (!showDecision) return
    const timer = setTimeout(() => {
      setExampleIdx((i) => (i + 1) % examples.length)
    }, 2200)
    return () => clearTimeout(timer)
  }, [showDecision])

  const copyInstall = useCallback(() => {
    navigator.clipboard.writeText('/plugin marketplace add banyudu/claude-warden\n/plugin install warden@claude-warden')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Gradient background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(96,165,250,0.15), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 40% at 70% 80%, rgba(167,139,250,0.08), transparent)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: 800 }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          borderRadius: 20,
          background: 'rgba(96,165,250,0.1)',
          border: '1px solid rgba(96,165,250,0.2)',
          fontSize: 13,
          color: 'var(--accent-blue)',
          fontWeight: 500,
          marginBottom: 24,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-allow)', display: 'inline-block' }} />
          Claude Code Plugin
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: 20,
          background: 'linear-gradient(135deg, #fff 0%, var(--accent-blue) 50%, var(--accent-purple) 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 6s ease infinite',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Claude Warden
        </h1>

        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
          color: 'var(--text-secondary)',
          maxWidth: 560,
          margin: '0 auto 48px',
          lineHeight: 1.6,
        }}>
          Smart command safety filter — auto-approves safe commands,
          blocks dangerous ones, asks about the rest.
        </p>

        {/* Terminal demo */}
        <div className="terminal" style={{ maxWidth: 640, margin: '0 auto 36px', textAlign: 'left' }}>
          <div className="terminal-header">
            <div className="terminal-dot red" />
            <div className="terminal-dot yellow" />
            <div className="terminal-dot green" />
            <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--text-muted)' }}>warden</span>
          </div>
          <div className="terminal-body" style={{ minHeight: 80 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--accent-cyan)', userSelect: 'none' }}>$</span>
              <span style={{ fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>
                {example.cmd.slice(0, displayedChars)}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                  style={{ display: 'inline-block', width: 8, height: 18, background: 'var(--text-primary)', verticalAlign: 'text-bottom', marginLeft: 2 }}
                />
              </span>
            </div>
            <AnimatePresence mode="wait">
              {showDecision && (
                <motion.div
                  key={`decision-${exampleIdx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginTop: 12 }}
                >
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 14px',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: decisionColors[example.decision],
                    background: `${decisionColors[example.decision]}15`,
                    border: `1px solid ${decisionColors[example.decision]}40`,
                  }}>
                    {example.decision}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Install */}
        <motion.button
          onClick={copyInstall}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 28px',
            borderRadius: 10,
            border: '1px solid var(--border-glow)',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}
        >
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
            <span><span style={{ color: 'var(--text-muted)' }}>&gt;</span> /plugin marketplace add banyudu/claude-warden</span>
            <span><span style={{ color: 'var(--text-muted)' }}>&gt;</span> /plugin install warden@claude-warden</span>
          </span>
          <span style={{ color: copied ? 'var(--color-allow)' : 'var(--text-muted)', fontSize: 12, minWidth: 40, alignSelf: 'center' }}>
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </motion.button>

        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 24, fontSize: 14 }}>
          <a href="https://github.com/banyudu/claude-warden" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)' }}>
            GitHub
          </a>
          <a href="https://www.npmjs.com/package/claude-warden" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)' }}>
            npm
          </a>
        </div>
      </motion.div>
    </section>
  )
}
