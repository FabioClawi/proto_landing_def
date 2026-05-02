import { useCallback, useState } from 'react'
import './index.css'
import IntroAnimation from './components/IntroAnimation'
import Nav            from './components/Nav'
import Hero           from './sections/Hero'
import Pain           from './sections/Pain'
import Solution       from './sections/Solution'
import CTA            from './sections/CTA'
import SocialProof    from './sections/SocialProof'
import Footer         from './sections/Footer'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true)
  }, [])

  return (
    <>
      {!introDone && <IntroAnimation onComplete={handleIntroComplete} />}

      <main style={{ background: 'var(--bg)', minHeight: '100vh', transition: 'background 0.3s ease' }}>
        <Nav />
        <Hero />
        <Pain />
        <Solution />
        <CTA />
        <SocialProof />
        <Footer />
      </main>
    </>
  )
}
