import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    title: 'Tu equipo. Evaluado.',
    desc:  'Mapeamos el nivel actual de cada persona y detectamos las oportunidades de mejora con mayor impacto para tu negocio — antes de capacitar a nadie.',
  },
  {
    title: 'Un programa a tu medida.',
    desc:  'No cursos genéricos. Diseñamos un plan enfocado en las herramientas que realmente usa tu equipo: Excel, IA, automatización y más.',
  },
  {
    title: 'Capacitación que se aplica.',
    desc:  'Talleres en vivo, e-learning y sesiones in-company con ejercicios basados en casos reales de tu empresa. El aprendizaje se siente el mismo día.',
  },
  {
    title: 'Resultados que se miden.',
    desc:  'Hacemos seguimiento del progreso, certificamos el aprendizaje y ajustamos el programa para garantizar un impacto tangible y sostenido.',
  },
]

const MODULES = [
  { label: 'Excel & Datos',  icon: '⚡', pct: 92 },
  { label: 'IA Aplicada',    icon: '◎', pct: 78 },
  { label: 'Herramientas',   icon: '▣', pct: 85 },
]

export default function Solution() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const leftRef     = useRef<HTMLDivElement>(null)
  const rightRef    = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  const [openIdx, setOpenIdx] = useState(0)
  const prevIdx = useRef(0)

  /* Animate accordion panel height */
  useEffect(() => {
    const prev = contentRefs.current[prevIdx.current]
    const next = contentRefs.current[openIdx]

    if (prev && prevIdx.current !== openIdx) {
      gsap.to(prev, { height: 0, opacity: 0, duration: 0.28, ease: 'power2.in' })
    }
    if (next) {
      gsap.fromTo(next,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
      )
    }
    prevIdx.current = openIdx
  }, [openIdx])

  /* Entry animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 72%' },
        }
      )
      gsap.fromTo(leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 72%' },
        }
      )
      gsap.fromTo(rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 72%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: '#04050F', padding: '120px 0 140px' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

        {/* ── Centered header (Scale style) ── */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '80px', opacity: 0 }}>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#0BB3A4', marginBottom: '20px',
          }}>
            Nuestra propuesta de valor
          </p>

          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
            lineHeight: 1.1, letterSpacing: '-0.02em',
            color: '#ffffff', marginBottom: '20px',
          }}>
            Capacitación que <span style={{ color: '#0BB3A4' }}>transforma</span> equipos.
          </h2>

          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px', fontWeight: 400,
            color: 'rgba(255,255,255,0.45)', lineHeight: 1.6,
            maxWidth: '500px', margin: '0 auto 36px',
          }}>
            No teoría genérica. Programas prácticos, a medida,
            con acompañamiento real de principio a fin.
          </p>

          <a
            href="#contacto"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 28px', borderRadius: '10px',
              background: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 500,
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = '#0BB3A4'
              el.style.color = '#0BB3A4'
              el.style.background = 'rgba(11,179,164,0.06)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(255,255,255,0.2)'
              el.style.color = 'rgba(255,255,255,0.8)'
              el.style.background = 'transparent'
            }}
          >
            Agendar demo →
          </a>
        </div>

        {/* ── Two columns ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
        }}>

          {/* Left: accordion (Lambda style) */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            {ITEMS.map((item, idx) => {
              const isOpen = idx === openIdx
              return (
                <div key={idx}>
                  {/* Separator */}
                  <div style={{
                    height: '1px',
                    background: 'rgba(255,255,255,0.08)',
                    marginBottom: '0',
                  }} />

                  {/* Row */}
                  <button
                    onClick={() => setOpenIdx(idx)}
                    style={{
                      width: '100%', background: 'none', border: 'none',
                      cursor: 'pointer', padding: '22px 0',
                      display: 'flex', alignItems: 'flex-start', gap: '18px',
                      textAlign: 'left',
                    }}
                  >
                    {/* Number */}
                    <span style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '13px', fontWeight: 500,
                      color: '#0BB3A4', flexShrink: 0,
                      lineHeight: 1.4, paddingTop: '2px',
                      letterSpacing: '0.02em',
                    }}>
                      0{idx + 1}/
                    </span>

                    {/* Title */}
                    <span style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                      fontWeight: 600, lineHeight: 1.3,
                      color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.5)',
                      flex: 1,
                      transition: 'color 0.25s ease',
                    }}>
                      {item.title}
                    </span>

                    {/* Toggle icon */}
                    <span style={{
                      fontFamily: 'monospace', fontSize: '18px',
                      color: isOpen ? '#0BB3A4' : 'rgba(255,255,255,0.3)',
                      flexShrink: 0, lineHeight: 1.4,
                      transition: 'color 0.25s ease',
                    }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {/* Expandable content */}
                  <div
                    ref={el => { contentRefs.current[idx] = el }}
                    style={{
                      height: idx === 0 ? 'auto' : 0,
                      overflow: 'hidden',
                      opacity: idx === 0 ? 1 : 0,
                    }}
                  >
                    <p style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '14px', fontWeight: 400,
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: 1.75,
                      paddingLeft: '31px',
                      paddingBottom: '22px',
                      maxWidth: '380px',
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}

            {/* Last separator */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Right: visual card */}
          <div ref={rightRef} style={{ opacity: 0, paddingTop: '8px' }}>
            <ModuleVisual />
          </div>
        </div>

      </div>
    </section>
  )
}

/* ── Module visual ── */
function ModuleVisual() {
  return (
    <div style={{
      background: 'rgba(11,179,164,0.04)',
      border: '1px solid rgba(11,179,164,0.12)',
      borderRadius: '20px',
      padding: '36px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: '-40px', left: '50%',
        transform: 'translateX(-50%)',
        width: '200px', height: '100px',
        background: 'radial-gradient(ellipse, rgba(11,179,164,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <p style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '11px', fontWeight: 500,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: '#0BB3A4', marginBottom: '28px',
      }}>
        Impacto promedio por equipo
      </p>

      {/* Module rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {MODULES.map((mod, i) => (
          <div key={mod.label}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '10px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px', opacity: 0.8 }}>{mod.icon}</span>
                <span style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '13px', fontWeight: 500, color: '#ffffff',
                }}>
                  {mod.label}
                </span>
              </div>
              <span style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px', fontWeight: 600, color: '#0BB3A4',
              }}>
                {mod.pct}%
              </span>
            </div>

            {/* Progress bar */}
            <div style={{
              height: '5px', borderRadius: '9999px',
              background: 'rgba(255,255,255,0.07)', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', borderRadius: '9999px',
                width: `${mod.pct}%`,
                background: `linear-gradient(90deg, #0BB3A4, ${i === 1 ? '#75C1E7' : '#4dd9cc'})`,
                boxShadow: '0 0 8px rgba(11,179,164,0.6)',
                animation: `fillBar${i} 1.2s ${0.3 + i * 0.15}s ease-out both`,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        gap: '12px', marginTop: '36px',
        paddingTop: '28px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        {[
          { val: '+3.2×', label: 'Productividad' },
          { val: '87%',   label: 'Adopción real' },
          { val: '<60d',  label: 'Tiempo al impacto' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '20px', fontWeight: 600, color: '#0BB3A4',
              marginBottom: '4px',
            }}>
              {stat.val}
            </div>
            <div style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '10px', fontWeight: 500,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fillBar0 { from { width: 0 } to { width: 92% } }
        @keyframes fillBar1 { from { width: 0 } to { width: 78% } }
        @keyframes fillBar2 { from { width: 0 } to { width: 85% } }
      `}</style>
    </div>
  )
}
