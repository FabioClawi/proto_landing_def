import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Radar dot positions: [angle_deg, ring 0-2, label] */
const DOTS: { angle: number; ring: number; label?: string; accent?: boolean }[] = [
  { angle: 0,   ring: 2, label: 'Excel'         },
  { angle: 72,  ring: 1, label: 'IA'             },
  { angle: 144, ring: 2, label: 'Procesos'       },
  { angle: 216, ring: 1, label: 'Herramientas'   },
  { angle: 288, ring: 2, label: 'Automatización' },
  { angle: 36,  ring: 0, accent: true            },
  { angle: 180, ring: 0                          },
  { angle: 108, ring: 2                          },
  { angle: 252, ring: 1                          },
  { angle: 324, ring: 0                          },
]

const CX = 150
const CY = 150
const RINGS = [48, 88, 128]

function toXY(angle: number, r: number) {
  const rad = (angle - 90) * (Math.PI / 180)
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

function RadarVisual() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg
        width="300" height="300"
        viewBox="0 0 300 300"
        style={{ overflow: 'visible' }}
      >
        {/* Axis lines */}
        {[0, 45, 90, 135].map(a => {
          const r = RINGS[2] + 12
          const p1 = toXY(a, r)
          const p2 = toXY(a + 180, r)
          return (
            <line key={a}
              x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.12"
            />
          )
        })}

        {/* Concentric rings */}
        {RINGS.map((r, i) => (
          <circle key={r}
            cx={CX} cy={CY} r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={i === 2 ? 1 : 0.75}
            strokeOpacity={i === 2 ? 0.15 : 0.09}
            strokeDasharray={i < 2 ? '3 5' : undefined}
          />
        ))}

        {/* Center pulse */}
        <circle cx={CX} cy={CY} r={6} fill="#0BB3A4" opacity="0.9">
          <animate attributeName="r" values="6;10;6" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx={CX} cy={CY} r={3} fill="#0BB3A4" />

        {/* Dots */}
        {DOTS.map((d, i) => {
          const pos = toXY(d.angle, RINGS[d.ring])
          return (
            <g key={i}>
              {d.accent && (
                <circle cx={pos.x} cy={pos.y} r={8}
                  fill="#0BB3A4" opacity="0.12">
                  <animate attributeName="r" values="8;13;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.12;0.04;0.12" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={pos.x} cy={pos.y} r={d.accent ? 4 : 3}
                fill={d.accent ? '#0BB3A4' : 'currentColor'}
                opacity={d.accent ? 1 : 0.4}
              />
              {d.label && (
                <text
                  x={pos.x + (pos.x > CX ? 10 : -10)}
                  y={pos.y + (pos.y > CY ? 4 : -4)}
                  textAnchor={pos.x > CX ? 'start' : 'end'}
                  fill="currentColor"
                  fontSize="9"
                  opacity="0.35"
                  fontFamily="Poppins, sans-serif"
                  fontWeight="500"
                >
                  {d.label}
                </text>
              )}
            </g>
          )
        })}

        {/* Outer tick marks */}
        {Array.from({ length: 12 }, (_, i) => {
          const a   = i * 30
          const p1  = toXY(a, RINGS[2] + 6)
          const p2  = toXY(a, RINGS[2] + 12)
          return (
            <line key={a}
              x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke="currentColor" strokeWidth="1" strokeOpacity="0.18"
            />
          )
        })}
      </svg>
    </div>
  )
}

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' } }
      )
      gsap.fromTo(rightRef.current,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' }, delay: 0.15 }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-secondary)',
        padding: '130px 0',
        transition: 'background 0.3s ease',
        color: 'var(--text-heading)',
      }}
    >
      <div style={{
        maxWidth: '1100px', margin: '0 auto', padding: '0 48px',
        display: 'grid', gridTemplateColumns: '55fr 45fr',
        gap: '80px', alignItems: 'center',
      }}>

        {/* ── Left ── */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          {/* Eyebrow */}
          <p style={{
            fontFamily: 'Poppins, sans-serif', fontSize: '10px', fontWeight: 500,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: '28px',
          }}>
            Agenda el diagnóstico
          </p>

          {/* Headline */}
          <h2 style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 600,
            fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
            lineHeight: 1.1, letterSpacing: '-0.025em',
            color: 'var(--text-heading)', marginBottom: '28px',
          }}>
            Ve exactamente qué está{' '}
            <em style={{
              fontStyle: 'italic', color: '#0BB3A4',
              fontWeight: 600,
            }}>
              frenando
            </em>
            {' '}a tu equipo — en 30 minutos.
          </h2>

          {/* Subtext */}
          <p style={{
            fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 400,
            lineHeight: 1.7, color: 'var(--text-muted)',
            maxWidth: '440px', marginBottom: '44px',
          }}>
            Sin teatro de consultoría. Te mostramos qué herramientas generan
            el mayor impacto en tu operación y cómo implementarlas
            la semana siguiente.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <a
              href="#contacto"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '10px',
                background: '#000050', color: '#ffffff',
                fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 4px 20px rgba(0,0,80,0.2)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#0D15B2'
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 8px 28px rgba(0,0,80,0.3)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#000050'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 4px 20px rgba(0,0,80,0.2)'
              }}
            >
              Agendar diagnóstico gratuito →
            </a>

            <a
              href="#clientes"
              style={{
                fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 500,
                color: 'var(--text-muted)', textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0BB3A4' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)' }}
            >
              Ver casos de éxito
            </a>
          </div>
        </div>

        {/* ── Right: radar ── */}
        <div
          ref={rightRef}
          style={{ opacity: 0, color: 'var(--text-heading)' }}
        >
          <RadarVisual />
        </div>

      </div>
    </section>
  )
}
