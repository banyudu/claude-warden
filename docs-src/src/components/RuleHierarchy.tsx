import { useState } from 'react'
import { motion } from 'framer-motion'

const levels = [
  {
    name: 'Global Deny Patterns',
    desc: 'Structural patterns always blocked (subshells, dangerous redirects)',
    examples: ['$(rm -rf /)', '> /etc/passwd'],
    color: 'var(--color-deny)',
  },
  {
    name: 'Always Deny',
    desc: 'Commands that are never safe to auto-approve',
    examples: ['sudo', 'shutdown', 'mkfs', 'rm -rf /'],
    color: 'var(--color-deny)',
  },
  {
    name: 'Always Allow',
    desc: 'Read-only and safe commands approved automatically',
    examples: ['cat', 'ls', 'grep', 'echo', 'wc'],
    color: 'var(--color-allow)',
  },
  {
    name: 'Conditional Rules',
    desc: 'Command + argument pattern matching for nuanced decisions. User rules extend defaults by default.',
    examples: ['git status → allow', 'git push → ask', 'npm run * → allow'],
    color: 'var(--color-ask)',
  },
  {
    name: 'Default Decision',
    desc: 'Fallback for unrecognized commands (configurable, defaults to "ask")',
    examples: ['unknown-tool', 'custom-script'],
    color: 'var(--text-muted)',
  },
]

export function RuleHierarchy() {
  const [activeIdx, setActiveIdx] = useState(-1)

  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Rule Hierarchy</h2>
        <p className="section-subtitle">
          Rules are evaluated top-to-bottom across config layers (project &gt; user &gt; defaults). First match wins.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 700 }}>
        {levels.map((level, i) => (
          <motion.div
            key={level.name}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.1, type: 'spring', stiffness: 200 }}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(-1)}
            style={{
              padding: 20,
              borderRadius: 10,
              border: `1px solid ${activeIdx === i ? level.color : 'var(--border)'}`,
              background: activeIdx === i ? `${level.color}08` : 'var(--bg-card)',
              cursor: 'default',
              transition: 'border-color 0.2s, background 0.2s',
              position: 'relative',
            }}
          >
            {/* Priority number */}
            <div style={{
              position: 'absolute',
              top: 20,
              left: -12,
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'var(--bg-primary)',
              border: `2px solid ${level.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: level.color,
            }}>
              {i + 1}
            </div>

            {/* Connecting line */}
            {i < levels.length - 1 && (
              <div style={{
                position: 'absolute',
                bottom: -13,
                left: -1,
                width: 2,
                height: 13,
                background: 'var(--border)',
              }} />
            )}

            <div style={{ marginLeft: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: level.color }}>
                  {level.name}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  {level.desc}
                </div>
              </div>

              {/* Example commands */}
              <motion.div
                initial={false}
                animate={{ opacity: activeIdx === i ? 1 : 0.5, y: activeIdx === i ? 0 : 4 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}
              >
                {level.examples.map((ex) => (
                  <span
                    key={ex}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 4,
                      background: 'var(--bg-terminal)',
                      border: '1px solid var(--border)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ex}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
