import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote: 'En menos de 3 meses, nuestro equipo pasó de usar Excel básico a automatizar reportes que antes tomaban días enteros. Sincero transformó nuestra forma de trabajar.',
    name:  'María González',
    role:  'Gerente de Operaciones',
    company: 'RetailCo',
    initials: 'MG',
    color:  '#0BB3A4',
  },
  {
    quote: 'Lo que más valoramos fue que el programa fue 100% a medida. No teoría genérica — ejercicios reales con nuestros datos y los procesos del día a día.',
    name:  'Carlos Méndez',
    role:  'CEO',
    company: 'Andes Corp',
    initials: 'CM',
    color:  '#75C1E7',
  },
  {
    quote: 'El equipo adoptó las herramientas de IA mucho más rápido de lo que esperábamos. El acompañamiento post-capacitación fue lo que marcó la diferencia.',
    name:  'Laura Torres',
    role:  'Directora de RRHH',
    company: 'IndusMX',
    initials: 'LT',
    color:  '#B39DDB',
  },
  {
    quote: 'Teníamos resistencia interna al cambio. El enfoque práctico de Sincero convirtió a los más escépticos en los mejores embajadores de las herramientas digitales.',
    name:  'Andrés Palacios',
    role:  'Director Comercial',
    company: 'GrupoNorte',
    initials: 'AP',
    color:  '#FFA07A',
  },
]

const CLIENTS = [
  'RetailCo', 'Andes Corp', 'IndusMX', 'TechPyME', 'GrupoNorte', 'DataSur',
]

export default function SocialProof() {
  const sectionRef  = useRef<HTMLElement>(null)
  const cardRef     = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const isAnimating = useRef(false)

  /* Entry animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* Auto-advance every 5s */
  useEffect(() => {
    const id = setInterval(() => advance(1), 5000)
    return () => clearInterval(id)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  const advance = useCallback((dir: 1 | -1) => {
    if (isAnimating.current) return
    isAnimating.current = true
    const el = contentRef.current
    if (!el) { isAnimating.current = false; return }

    gsap.to(el, {
      opacity: 0, x: dir * -24, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        setActive(prev => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length)
        gsap.fromTo(el,
          { opacity: 0, x: dir * 24 },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out',
            onComplete: () => { isAnimating.current = false } }
        )
      },
    })
  }, [])

  const goTo = useCallback((idx: number) => {
    if (idx === active || isAnimating.current) return
    const dir = idx > active ? 1 : -1
    isAnimating.current = true
    const el = contentRef.current
    if (!el) { isAnimating.current = false; return }

    gsap.to(el, {
      opacity: 0, x: dir * -24, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        setActive(idx)
        gsap.fromTo(el,
          { opacity: 0, x: dir * 24 },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out',
            onComplete: () => { isAnimating.current = false } }
        )
      },
    })
  }, [active])

  const t = TESTIMONIALS[active]

  return (
    <section
      ref={sectionRef}
      style={{ background: '#04050F', padding: '120px 0 140px' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

        {/* ── Testimonial card ── */}
        <div
          ref={cardRef}
          style={{
            background: '#0A0C1E',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '24px',
            padding: '48px 52px 44px',
            marginBottom: '20px',
            opacity: 0,
            position: 'relative',
          }}
        >
          {/* Arrows — top right */}
          <div style={{
            position: 'absolute', top: '32px', right: '48px',
            display: 'flex', gap: '8px',
          }}>
            <button
              onClick={() => advance(-1)}
              style={{
                width: '36px', height: '36px', borderRadius: '9999px',
                background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '14px',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = 'rgba(255,255,255,0.35)'
                el.style.color = '#ffffff'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = 'rgba(255,255,255,0.15)'
                el.style.color = 'rgba(255,255,255,0.5)'
              }}
            >
              ←
            </button>
            <button
              onClick={() => advance(1)}
              style={{
                width: '36px', height: '36px', borderRadius: '9999px',
                background: '#0BB3A4',
                border: '1.5px solid #0BB3A4',
                color: '#000050',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '14px', fontWeight: 600,
                transition: 'background 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 0 12px rgba(11,179,164,0.35)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.background = '#0dcfc0'
                el.style.boxShadow = '0 0 20px rgba(11,179,164,0.55)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.background = '#0BB3A4'
                el.style.boxShadow = '0 0 12px rgba(11,179,164,0.35)'
              }}
            >
              →
            </button>
          </div>

          {/* Content (animated on change) */}
          <div
            ref={contentRef}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '60px',
              alignItems: 'center',
              paddingTop: '16px',
            }}
          >
            {/* Quote */}
            <blockquote style={{ margin: 0 }}>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                fontWeight: 500, lineHeight: 1.55,
                color: '#ffffff', letterSpacing: '-0.01em',
              }}>
                "{t.quote}"
              </p>
            </blockquote>

            {/* Person */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '12px',
              minWidth: '140px', textAlign: 'center',
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: `${t.color}22`,
                border: `2px solid ${t.color}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Poppins, sans-serif', fontSize: '16px',
                fontWeight: 600, color: t.color,
              }}>
                {t.initials}
              </div>
              <div>
                <div style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: '13px',
                  fontWeight: 600, color: '#ffffff', marginBottom: '2px',
                }}>
                  {t.name}
                </div>
                <div style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: '11px',
                  color: 'rgba(255,255,255,0.4)', lineHeight: 1.4,
                }}>
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Client logos strip ── */}
        <div style={{
          display: 'flex', gap: '8px',
          flexWrap: 'wrap', alignItems: 'center',
        }}>
          {CLIENTS.map((name) => {
            const isActive = TESTIMONIALS[active]?.company === name
            return (
              <button
                key={name}
                onClick={() => { const idx = TESTIMONIALS.findIndex(t => t.company === name); if (idx >= 0) goTo(idx) }}
                style={{
                  background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
                  borderRadius: '9999px',
                  padding: '8px 18px',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '7px',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.07)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent'
                  }
                }}
              >
                {isActive && (
                  <span style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: '#0BB3A4', display: 'inline-block', flexShrink: 0,
                  }} />
                )}
                <span style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 500,
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.25)',
                  transition: 'color 0.2s ease',
                  whiteSpace: 'nowrap',
                }}>
                  {name}
                </span>
              </button>
            )
          })}
        </div>

      </div>
    </section>
  )
}
