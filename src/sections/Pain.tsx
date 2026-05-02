import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHIPS = [
  'Excel manual',
  'Sin IA',
  'Datos caóticos',
  'Sin tiempo',
  'Procesos lentos',
  'Resistencia digital',
  'Sin resultados',
  'Capacitación genérica',
  'Herramientas sin uso',
  'Reuniones infinitas',
]

/* Highlight colors that cycle with each active chip */
const COLORS = [
  { bg: '#0BB3A4', text: '#000050', glow: 'rgba(11,179,164,0.45)' },
  { bg: '#FFA07A', text: '#2A0A00', glow: 'rgba(255,160,122,0.45)' },
  { bg: '#75C1E7', text: '#000050', glow: 'rgba(117,193,231,0.45)' },
  { bg: '#B39DDB', text: '#1A0038', glow: 'rgba(179,157,219,0.45)' },
  { bg: '#6BCB77', text: '#002010', glow: 'rgba(107,203,119,0.45)' },
]

export default function Pain() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const chipsRef   = useRef<HTMLDivElement>(null)

  const [activeIdx, setActiveIdx] = useState(0)
  const [colorIdx,  setColorIdx]  = useState(0)

  /* Cycle active chip + color */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx(i => (i + 1) % CHIPS.length)
      setColorIdx(c => (c + 1) % COLORS.length)
    }, 1800)
    return () => clearInterval(id)
  }, [])

  /* Entry animations */
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
    })

    tl.fromTo(leftRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }
    ).fromTo(rightRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
      '-=0.55'
    )

    if (chipsRef.current) {
      gsap.fromTo(
        chipsRef.current.querySelectorAll<HTMLElement>('[data-chip]'),
        { y: 14, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.055, duration: 0.3, ease: 'power2.out',
          scrollTrigger: { trigger: chipsRef.current, start: 'top 75%' },
          delay: 0.25,
        }
      )
    }

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  const activeColor = COLORS[colorIdx]

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--bg)', padding: '120px 0', transition: 'background 0.3s ease' }}
    >
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 48px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'center',
      }}>

        {/* ── Left ── */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#0BB3A4', marginBottom: '24px',
          }}>
            Reconocemos el problema
          </p>

          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
            lineHeight: 1.1, letterSpacing: '-0.02em',
            color: 'var(--text-heading)', marginBottom: '28px',
          }}>
            Mucho trabajo.<br />
            Pocas herramientas.
          </h2>

          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '15px', fontWeight: 400,
            lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: '420px',
          }}>
            Las PyMEs de Latam tienen equipos con talento, pero sin las herramientas
            ni el conocimiento para aprovechar la tecnología disponible. No es falta
            de voluntad. Es falta de acompañamiento.
          </p>
        </div>

        {/* ── Right card ── */}
        <div ref={rightRef} style={{ opacity: 0 }}>
          <div style={{
            background: '#06071A',
            borderRadius: '20px',
            padding: '28px 32px 32px',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
          }}>
            <p style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px', fontWeight: 500,
              color: 'rgba(255,255,255,0.7)', marginBottom: '20px', lineHeight: 1.4,
            }}>
              Lo que escuchamos de equipos como el tuyo:
            </p>

            <div ref={chipsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
              {CHIPS.map((label, idx) => {
                const isActive = idx === activeIdx
                return (
                  <span
                    key={label}
                    data-chip
                    style={{
                      display: 'inline-block',
                      padding: '7px 15px',
                      borderRadius: '9999px',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '12px', fontWeight: 500,
                      cursor: 'default',
                      transition: 'background 0.45s ease, border-color 0.45s ease, color 0.45s ease, box-shadow 0.45s ease',
                      background:   isActive ? activeColor.bg        : 'transparent',
                      color:        isActive ? activeColor.text      : 'rgba(255,255,255,0.65)',
                      border:      `1.5px solid ${isActive ? activeColor.bg : 'rgba(255,255,255,0.14)'}`,
                      boxShadow:    isActive ? `0 0 18px ${activeColor.glow}` : 'none',
                    }}
                  >
                    {label}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
