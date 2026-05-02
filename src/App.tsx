import './index.css'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle, isDark } = useTheme()

  return (
    <main>
      {/* Temporary theme preview — will be replaced by sections */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        height: '100vh',
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: 'var(--bg)',
        transition: 'background-color 0.3s ease',
      }}>
        <span style={{ color: '#0BB3A4', fontSize: '2rem', letterSpacing: '0.3em', fontWeight: 600 }}>
          SINCERO
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Tema actual: <strong style={{ color: 'var(--text-heading)' }}>{theme}</strong>
        </span>
        <button
          onClick={toggle}
          style={{
            padding: '10px 24px',
            borderRadius: '10px',
            border: '1.5px solid #0BB3A4',
            background: 'transparent',
            color: '#0BB3A4',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.8rem',
            fontWeight: 500,
            cursor: 'pointer',
            letterSpacing: '0.05em',
          }}
        >
          {isDark ? '☀ Modo claro' : '☾ Modo oscuro'}
        </button>
      </div>
    </main>
  )
}
