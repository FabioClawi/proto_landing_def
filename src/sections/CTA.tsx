import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/* ─── Animation sequence ─── */
const STEPS = [
  { id: 'cmd1',  ms: 500  },
  { id: 'sec1',  ms: 650  },
  { id: 'bar1',  ms: 300  },
  { id: 'st1',   ms: 380  },
  { id: 'sec2',  ms: 650  },
  { id: 'bar2',  ms: 300  },
  { id: 'st2',   ms: 380  },
  { id: 'sec3',  ms: 650  },
  { id: 'bar3',  ms: 300  },
  { id: 'st3',   ms: 380  },
  { id: 'div',   ms: 550  },
  { id: 'res1',  ms: 350  },
  { id: 'res2',  ms: 300  },
  { id: 'cta',   ms: 650  },
  { id: '__end', ms: 2800 },
]

const MODULES = [
  { sec: 'sec1', bar: 'bar1', st: 'st1', title: 'Módulo 1 — Excel & Datos',           pct: 62, barColor: '#FFA07A', statusText: '⚠  Subutilizado',           statusColor: '#FFA07A' },
  { sec: 'sec2', bar: 'bar2', st: 'st2', title: 'Módulo 2 — Inteligencia Artificial',  pct: 28, barColor: '#FF7B7B', statusText: '✕  Sin adopción detectada',  statusColor: '#FF7B7B' },
  { sec: 'sec3', bar: 'bar3', st: 'st3', title: 'Módulo 3 — Herramientas Digitales',   pct: 51, barColor: '#FFA07A', statusText: '⚠  Uso parcial',              statusColor: '#FFA07A' },
]

/* ─── Sub-components ─── */
function Row({ show, children, mt = 0, mb = 3 }: {
  show: boolean; children: React.ReactNode; mt?: number; mb?: number
}) {
  return (
    <div style={{
      opacity:    show ? 1 : 0,
      transform:  show ? 'translateY(0)' : 'translateY(5px)',
      transition: 'opacity 0.22s ease, transform 0.22s ease',
      marginTop:  mt, marginBottom: mb,
      fontSize: 13, lineHeight: 1.65,
      fontFamily: 'ui-monospace, "Cascadia Code", "Fira Code", monospace',
    }}>
      {children}
    </div>
  )
}

function ModuleBlock({ mod, show, showBar, showSt }: {
  mod: typeof MODULES[0]; show: boolean; showBar: boolean; showSt: boolean
}) {
  return (
    <>
      <Row show={show} mt={14} mb={6}>
        <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{mod.title}</span>
      </Row>

      {/* Bar row */}
      <div style={{
        opacity: showBar ? 1 : 0,
        transition: 'opacity 0.2s ease',
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 11, color: 'rgba(255,255,255,0.35)',
        fontFamily: 'ui-monospace, monospace',
        marginBottom: 4,
      }}>
        <span style={{ flexShrink: 0 }}>Nivel</span>
        <div style={{
          flex: 1, height: 4,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 9999, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            background: mod.barColor,
            borderRadius: 9999,
            width: showBar ? `${mod.pct}%` : '0%',
            transition: 'width 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: `0 0 8px ${mod.barColor}88`,
          }} />
        </div>
        <span style={{ color: mod.barColor, fontWeight: 700, minWidth: 32, textAlign: 'right' }}>
          {mod.pct}%
        </span>
      </div>

      <Row show={showSt} mb={0}>
        <span style={{ color: mod.statusColor, fontSize: 12 }}>{mod.statusText}</span>
      </Row>
    </>
  )
}

/* ─── Terminal card ─── */
function DiagnosisTerminal() {
  const [visible, setVisible] = useState<Set<string>>(new Set())

  useEffect(() => {
    let idx = 0
    let timer: ReturnType<typeof setTimeout>

    const next = () => {
      if (idx >= STEPS.length) return
      const { id, ms } = STEPS[idx]
      idx++

      if (id === '__end') {
        timer = setTimeout(() => {
          setVisible(new Set())
          idx = 0
          timer = setTimeout(next, 500)
        }, ms)
        return
      }

      setVisible(prev => new Set([...prev, id]))
      timer = setTimeout(next, ms)
    }

    timer = setTimeout(next, 300)
    return () => clearTimeout(timer)
  }, [])

  const v = (id: string) => visible.has(id)

  return (
    <div style={{
      background: '#07091C',
      border: '1px solid rgba(11,179,164,0.2)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(11,179,164,0.06)',
    }}>

      {/* Window chrome */}
      <div style={{
        padding: '11px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', gap: '7px',
        background: 'rgba(255,255,255,0.02)',
      }}>
        {['#FF5F57','#FEBC2E','#28C840'].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.85 }} />
        ))}
        <span style={{
          marginLeft: 8, fontSize: 11,
          fontFamily: 'ui-monospace, monospace',
          color: 'rgba(255,255,255,0.25)',
        }}>
          diagnostico_sincero.sh
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '22px 26px 26px', minHeight: '370px' }}>
        <style>{`
          @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        `}</style>

        {/* Command line */}
        <Row show={v('cmd1')} mb={8}>
          <span style={{ color: '#0BB3A4' }}>›&nbsp;</span>
          <span style={{ color: '#0BB3A4' }}>Iniciando diagnóstico del equipo...</span>
        </Row>

        {/* Modules */}
        {MODULES.map(mod => (
          <ModuleBlock
            key={mod.sec}
            mod={mod}
            show={v(mod.sec)}
            showBar={v(mod.bar)}
            showSt={v(mod.st)}
          />
        ))}

        {/* Divider */}
        <div style={{
          opacity: v('div') ? 1 : 0,
          transition: 'opacity 0.3s ease',
          height: 1,
          background: 'rgba(255,255,255,0.08)',
          margin: '16px 0',
        }} />

        {/* Results */}
        <Row show={v('res1')} mb={4}>
          <span style={{ color: '#ffffff', fontWeight: 700 }}>
            ✓&nbsp; 3 oportunidades de alto impacto detectadas
          </span>
        </Row>
        <Row show={v('res2')} mb={0}>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>
            Tiempo estimado al impacto:&nbsp;
          </span>
          <span style={{ color: '#0BB3A4', fontWeight: 600 }}>{'< 60 días'}</span>
        </Row>

        {/* CTA line */}
        <Row show={v('cta')} mt={18} mb={0}>
          <span style={{ color: '#0BB3A4' }}>›&nbsp;</span>
          <span style={{ color: '#0BB3A4', fontWeight: 700 }}>Agendar diagnóstico gratuito</span>
          <span style={{
            display: 'inline-block',
            width: 8, height: 14,
            background: '#0BB3A4',
            marginLeft: 3,
            verticalAlign: 'middle',
            borderRadius: 1,
            animation: v('cta') ? 'blink 1s step-end infinite' : 'none',
          }} />
        </Row>
      </div>
    </div>
  )
}

/* ─── CTA Section ─── */
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
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' }, delay: 0.15 }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--bg-secondary)', padding: '130px 0', transition: 'background 0.3s ease' }}
    >
      <div style={{
        maxWidth: '1100px', margin: '0 auto', padding: '0 48px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '64px', alignItems: 'center',
      }}>

        {/* ── Left ── */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <p style={{
            fontFamily: 'Poppins, sans-serif', fontSize: '10px', fontWeight: 500,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: '28px',
          }}>
            Agenda el diagnóstico
          </p>

          <h2 style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 600,
            fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
            lineHeight: 1.1, letterSpacing: '-0.025em',
            color: 'var(--text-heading)', marginBottom: '28px',
          }}>
            Ve exactamente qué está{' '}
            <em style={{ fontStyle: 'italic', color: '#0BB3A4', fontWeight: 600 }}>frenando</em>
            {' '}a tu equipo — en 30 minutos.
          </h2>

          <p style={{
            fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 400,
            lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '440px', marginBottom: '44px',
          }}>
            Sin teatro de consultoría. Te mostramos qué herramientas generan el mayor
            impacto en tu operación y cómo implementarlas la semana siguiente.
          </p>

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
                el.style.background = '#0D15B2'; el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 8px 28px rgba(0,0,80,0.3)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#000050'; el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 4px 20px rgba(0,0,80,0.2)'
              }}
            >
              Agendar diagnóstico gratuito →
            </a>

            <a
              href="#clientes"
              style={{
                fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 500,
                color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0BB3A4' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)' }}
            >
              Ver casos de éxito
            </a>
          </div>
        </div>

        {/* ── Right: diagnosis terminal ── */}
        <div ref={rightRef} style={{ opacity: 0 }}>
          <DiagnosisTerminal />
        </div>

      </div>
    </section>
  )
}
