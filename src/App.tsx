import './index.css'
import Nav  from './components/Nav'
import Hero from './sections/Hero'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme } = useTheme()

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', transition: 'background 0.3s ease' }}>
      <Nav />
      <Hero />

      {/* Placeholder body — will be replaced by sections */}
      <div style={{
        height: '200vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '80px',
        transition: 'background 0.3s ease',
      }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontFamily: 'Poppins, sans-serif' }}>
          Tema activo: <strong style={{ color: 'var(--text-heading)' }}>{theme}</strong>
        </span>
      </div>
    </main>
  )
}
