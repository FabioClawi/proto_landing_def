import './index.css'
import Nav  from './components/Nav'
import Hero from './sections/Hero'
import Pain     from './sections/Pain'
import Solution from './sections/Solution'
import CTA         from './sections/CTA'
import SocialProof from './sections/SocialProof'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme } = useTheme()

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', transition: 'background 0.3s ease' }}>
      <Nav />
      <Hero />
      <Pain />
      <Solution />
      <CTA />
      <SocialProof />

      {/* Placeholder — remaining sections coming soon */}
      <div style={{
        height: '60vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.3s ease',
      }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontFamily: 'Poppins, sans-serif' }}>
          Tema: <strong style={{ color: 'var(--text-heading)' }}>{theme}</strong>
        </span>
      </div>
    </main>
  )
}
