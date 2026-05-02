import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHIPS: { label: string; highlight?: boolean }[] = [
  { label: 'Excel desaprovechado', highlight: true },
  { label: 'Procesos 100% manuales' },
  { label: 'Sin adopción de IA' },
  { label: 'Datos desordenados' },
  { label: 'Resistencia al cambio' },
  { label: 'Capacitaciones que no aplican' },
  { label: 'Sin tiempo para aprender' },
  { label: 'Herramientas sin uso' },
  { label: 'Reuniones interminables' },
]

export default function Pain() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const chipsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 68%',
      },
    })

    tl.fromTo(leftRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }
    )
    .fromTo(rightRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
      '-=0.55'
    )

    if (chipsRef.current) {
      const chips = chipsRef.current.querySelectorAll<HTMLElement>('[data-chip]')
      gsap.fromTo(chips,
        { y: 14, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.06, duration: 0.35, ease: 'power2.out',
          scrollTrigger: { trigger: chipsRef.current, start: 'top 75%' },
          delay: 0.2,
        }
      )
    }

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg)',
        padding: '120px 0',
        transition: 'background 0.3s ease',
      }}
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
          {/* Eyebrow */}
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#0BB3A4',
            marginBottom: '24px',
          }}>
            Reconocemos el problema
          </p>

          {/* Headline */}
          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--text-heading)',
            marginBottom: '28px',
          }}>
            Mucho trabajo.<br />
            Pocas herramientas.
          </h2>

          {/* Body */}
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: 1.75,
            color: 'var(--text-muted)',
            maxWidth: '420px',
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
            padding: '36px',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
          }}>
            {/* Card header */}
            <p style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '15px',
              fontWeight: 500,
              color: '#ffffff',
              marginBottom: '24px',
              lineHeight: 1.4,
            }}>
              Lo que escuchamos de equipos como el tuyo:
            </p>

            {/* Chips */}
            <div
              ref={chipsRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              {CHIPS.map(chip => (
                <span
                  key={chip.label}
                  data-chip
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'default',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    ...(chip.highlight
                      ? {
                          background: '#0BB3A4',
                          color: '#000050',
                          border: '1.5px solid #0BB3A4',
                          boxShadow: '0 0 16px rgba(11,179,164,0.35)',
                        }
                      : {
                          background: 'transparent',
                          color: 'rgba(255,255,255,0.75)',
                          border: '1.5px solid rgba(255,255,255,0.15)',
                        }),
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLSpanElement
                    el.style.transform = 'translateY(-2px)'
                    if (!chip.highlight) el.style.borderColor = 'rgba(11,179,164,0.5)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLSpanElement
                    el.style.transform = 'translateY(0)'
                    if (!chip.highlight) el.style.borderColor = 'rgba(255,255,255,0.15)'
                  }}
                >
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
