import './index.css'
import Nav from './components/Nav'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme } = useTheme()

  return (
    <main style={{ background: 'var(--bg)', minHeight: '300vh', transition: 'background 0.3s ease' }}>
      <Nav />

      {/* Placeholder hero — dark section so nav reads correctly over it */}
      <div style={{
        height: '100vh',
        background: '#000050',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <span style={{ color: '#0BB3A4', fontSize: '3rem', fontWeight: 600, letterSpacing: '0.2em' }}>
          SINCERO
        </span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
          Hero section — próximamente
        </span>
      </div>

      {/* Placeholder body — shows theme switching on light/dark */}
      <div style={{
        height: '200vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '80px',
        transition: 'background 0.3s ease',
      }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Tema activo: <strong style={{ color: 'var(--text-heading)' }}>{theme}</strong> — scroll para ver la nav compactarse
        </span>
      </div>
    </main>
  )
}
