import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import HeroCanvas from '../components/HeroCanvas'

const HEADLINE = ['Tu empresa,', 'potenciada', 'con IA.']
const SUBTEXT   = 'Capacitamos a tu equipo en Excel, inteligencia artificial y herramientas digitales para que trabajen mejor, más rápido y con mayor impacto.'

export default function Hero() {
  const eyebrowRef  = useRef<HTMLDivElement>(null)
  const linesRef    = useRef<HTMLDivElement[]>([])
  const subRef      = useRef<HTMLParagraphElement>(null)
  const ctasRef     = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(eyebrowRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo(linesRef.current.filter(Boolean),
      { y: 48, opacity: 0, skewY: 2 },
      { y: 0, opacity: 1, skewY: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.35'
    )
    .fromTo(ctasRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.1'
    )
  }, [])

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      minHeight: '700px',
      overflow: 'hidden',
      background: '#000028',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Animated background */}
      <HeroCanvas />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '900px',
        width: '100%',
      }}>

        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{
            opacity: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '32px',
            padding: '7px 18px',
            borderRadius: '9999px',
            border: '1px solid rgba(11,179,164,0.3)',
            background: 'rgba(11,179,164,0.08)',
          }}
        >
          <span style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: '#0BB3A4',
            display: 'inline-block',
            boxShadow: '0 0 8px #0BB3A4',
          }} />
          <span style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            color: '#0BB3A4',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Aliado tecnológico para PyMEs en Latam
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          lineHeight: 1.05,
          margin: '0 0 28px',
          letterSpacing: '-0.02em',
          overflow: 'hidden',
        }}>
          {HEADLINE.map((line, i) => (
            <div
              key={i}
              ref={el => { if (el) linesRef.current[i] = el }}
              style={{
                opacity: 0,
                display: 'block',
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                color: i === 2 ? '#0BB3A4' : '#ffffff',
              }}
            >
              {line}
            </div>
          ))}
        </h1>

        {/* Subtext */}
        <p
          ref={subRef}
          style={{
            opacity: 0,
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            maxWidth: '580px',
            margin: '0 auto 44px',
          }}
        >
          {SUBTEXT}
        </p>

        {/* CTAs */}
        <div
          ref={ctasRef}
          style={{
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <PrimaryBtn>Agendar demo →</PrimaryBtn>
          <GhostBtn>Ver cómo funciona</GhostBtn>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollRef}
        style={{
          opacity: 0,
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
        }}
      >
        <span style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '10px',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          Scroll
        </span>
        <ScrollPill />
      </div>
    </section>
  )
}

/* ── Inline sub-components ── */

function PrimaryBtn({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#contacto"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 32px',
        borderRadius: '10px',
        background: '#0BB3A4',
        color: '#000050',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        fontWeight: 600,
        textDecoration: 'none',
        letterSpacing: '0.01em',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
        boxShadow: '0 0 24px rgba(11,179,164,0.35)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 0 36px rgba(11,179,164,0.55)'
        el.style.background = '#0dcfc0'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 0 24px rgba(11,179,164,0.35)'
        el.style.background = '#0BB3A4'
      }}
    >
      {children}
    </a>
  )
}

function GhostBtn({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#proceso"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '14px 32px',
        borderRadius: '10px',
        border: '1.5px solid rgba(255,255,255,0.2)',
        background: 'transparent',
        color: 'rgba(255,255,255,0.7)',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        textDecoration: 'none',
        transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.borderColor = 'rgba(11,179,164,0.5)'
        el.style.color = '#ffffff'
        el.style.background = 'rgba(11,179,164,0.06)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.borderColor = 'rgba(255,255,255,0.2)'
        el.style.color = 'rgba(255,255,255,0.7)'
        el.style.background = 'transparent'
      }}
    >
      {children}
    </a>
  )
}

function ScrollPill() {
  return (
    <div style={{
      width: '22px',
      height: '36px',
      borderRadius: '11px',
      border: '1.5px solid rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '5px',
    }}>
      <div style={{
        width: '3px',
        height: '8px',
        borderRadius: '2px',
        background: 'rgba(255,255,255,0.4)',
        animation: 'scrollDot 1.8s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0);    opacity: 1; }
          60%  { transform: translateY(12px); opacity: 0; }
          61%  { transform: translateY(0);    opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
