import { motion } from 'framer-motion'

const configLines = [
  { text: '# ~/.claude/warden.yaml', color: 'var(--text-muted)' },
  { text: '', color: '' },
  { text: 'defaultDecision: ask', color: 'var(--text-primary)', key: 'var(--accent-purple)' },
  { text: 'notifyOnAsk: true', color: 'var(--text-primary)' },
  { text: 'notifyOnDeny: true', color: 'var(--text-primary)' },
  { text: '', color: '' },
  { text: 'alwaysAllow:', color: 'var(--accent-purple)' },
  { text: '  - terraform', color: 'var(--color-allow)' },
  { text: '', color: '' },
  { text: 'rules:', color: 'var(--accent-purple)' },
  { text: '  - command: npx', color: 'var(--accent-cyan)' },
  { text: '    default: allow', color: 'var(--color-allow)' },
  { text: '  - command: docker', color: 'var(--accent-cyan)' },
  { text: '    default: ask', color: 'var(--text-primary)' },
  { text: '    argPatterns:', color: 'var(--text-primary)' },
  { text: '      - match:', color: 'var(--text-secondary)' },
  { text: '          anyArgMatches: ["^(ps|images|logs)$"]', color: 'var(--color-allow)' },
  { text: '        decision: allow', color: 'var(--color-allow)' },
  { text: '', color: '' },
  { text: 'trustedSSHHosts:', color: 'var(--accent-purple)' },
  { text: '  - dev-server.local', color: 'var(--text-secondary)' },
  { text: '  - name: prod-bastion', color: 'var(--text-secondary)' },
  { text: '    overrides:', color: 'var(--text-secondary)' },
  { text: '      alwaysAllow: [systemctl]', color: 'var(--text-secondary)' },
  { text: '', color: '' },
  { text: 'trustedSprites:', color: 'var(--accent-purple)' },
  { text: '  - name: my-sprite', color: 'var(--text-secondary)' },
  { text: '    allowAll: true', color: 'var(--text-secondary)' },
]

export function Config() {
  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Fully Configurable</h2>
        <p className="section-subtitle">
          Override defaults with YAML config. Per-user or per-project.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        {/* Config file */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--text-muted)' }}>warden.yaml</span>
            </div>
            <div className="terminal-body" style={{ padding: '16px 20px' }}>
              {configLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    lineHeight: 1.7,
                    color: line.color || 'transparent',
                    minHeight: line.text ? undefined : 12,
                    whiteSpace: 'pre',
                  }}
                >
                  {line.text}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Config features */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 16 }}
        >
          {[
            {
              title: 'Layered Config',
              path: 'project > user > built-in defaults',
              desc: 'Rules are layered: project overrides user, user extends built-in defaults. Your rules add to defaults rather than replacing them.',
            },
            {
              title: 'User & Project Config',
              path: '~/.claude/warden.yaml · .claude/warden.yaml',
              desc: 'Global rules across all projects or project-specific rules checked into your repo.',
            },
            {
              title: 'Trusted Contexts',
              path: 'SSH hosts, Docker, kubectl, Sprites',
              desc: 'Auto-allow commands for trusted SSH hosts, Docker containers, kubectl contexts, and Sprites sandboxes. Per-target overrides supported.',
            },
            {
              title: 'Notifications',
              path: 'notifyOnAsk · notifyOnDeny',
              desc: 'Get OS notifications when warden prompts for permission or blocks a command.',
            },
            {
              title: 'YOLO Mode',
              path: '/claude-warden:yolo 5m',
              desc: 'Temporarily auto-allow all commands for a set duration or the full session. Always-deny commands stay blocked for safety.',
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{
                padding: 16,
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{feature.title}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-cyan)', marginBottom: 6 }}>
                {feature.path}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {feature.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Responsive override for mobile */}
      <style>{`
        @media (max-width: 768px) {
          .section > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
