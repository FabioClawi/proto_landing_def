import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Planets — each area of the business orbits at its own speed ─── */
const PLANETS = [
  { label: 'Excel & Datos',   color: '#0BB3A4', r: 54,  angSpeed: 68,  startAngle: 0,   size: 6.5 },
  { label: 'IA Aplicada',     color: '#75C1E7', r: 86,  angSpeed: 47,  startAngle: 110, size: 5.5 },
  { label: 'Procesos',        color: '#B39DDB', r: 116, angSpeed: 30,  startAngle: 220, size: 6   },
  { label: 'Herramientas',    color: '#FFA07A', r: 148, angSpeed: 18,  startAngle: 310, size: 5   },
  { label: 'Automatización',  color: '#6BCB77', r: 178, angSpeed: 11,  startAngle: 60,  size: 5.5 },
]

/* ─── Solar system canvas ─── */
function SolarSystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const startRef  = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    const W = canvas.width
    const H = canvas.height
    const CX = W / 2
    const CY = H / 2
    const BG_R = PLANETS[4].r + 30

    function draw(ts: number) {
      if (!startRef.current) startRef.current = ts
      const elapsed = (ts - startRef.current) / 1000

      ctx.clearRect(0, 0, W, H)

      /* Dark circular background */
      ctx.save()
      ctx.beginPath()
      ctx.arc(CX, CY, BG_R, 0, Math.PI * 2)
      ctx.fillStyle = '#06071A'
      ctx.fill()
      ctx.restore()

      /* Orbital rings */
      ctx.setLineDash([3, 9])
      for (const p of PLANETS) {
        ctx.beginPath()
        ctx.arc(CX, CY, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255,255,255,0.07)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.setLineDash([])

      /* Central star */
      const pulse = 0.5 + 0.5 * Math.sin(ts * 0.0022)
      ctx.beginPath()
      ctx.arc(CX, CY, 11 + pulse * 5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(11,179,164,0.1)'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(CX, CY, 7 + pulse * 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(11,179,164,0.2)'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(CX, CY, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#0BB3A4'
      ctx.shadowColor = '#0BB3A4'
      ctx.shadowBlur = 18
      ctx.fill()
      ctx.shadowBlur = 0

      /* Planets */
      for (const p of PLANETS) {
        const rad  = ((p.startAngle + elapsed * p.angSpeed) % 360 - 90) * (Math.PI / 180)
        const px   = CX + p.r * Math.cos(rad)
        const py   = CY + p.r * Math.sin(rad)

        /* Atmosphere glow */
        ctx.beginPath()
        ctx.arc(px, py, p.size + 5, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.13
        ctx.fill()
        ctx.globalAlpha = 1

        /* Planet */
        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.shadowBlur = 0

        /* Label — offset outward from center, always horizontal */
        const dx  = px - CX
        const dy  = py - CY
        const len = Math.sqrt(dx * dx + dy * dy) || 1
        const nx  = dx / len
        const ny  = dy / len
        const lx  = px + nx * (p.size + 11)
        const ly  = py + ny * (p.size + 11)

        ctx.font         = '500 10.5px Poppins, sans-serif'
        ctx.fillStyle    = p.color
        ctx.globalAlpha  = 0.88
        ctx.textAlign    = lx > CX + 6 ? 'left' : lx < CX - 6 ? 'right' : 'center'
        ctx.textBaseline = ly > CY + 6 ? 'top'  : ly < CY - 6 ? 'bottom' : 'middle'
        ctx.shadowColor  = p.color
        ctx.shadowBlur   = 5
        ctx.fillText(p.label, lx, ly)
        ctx.shadowBlur   = 0
        ctx.globalAlpha  = 1
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={460}
      height={460}
      data-no-transition
      style={{ width: '100%', maxWidth: '500px', display: 'block', margin: '0 auto' }}
    />
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
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' }, delay: 0.12 }
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
      }}
    >
      <div style={{
        maxWidth: '1100px', margin: '0 auto', padding: '0 48px',
        display: 'grid', gridTemplateColumns: '55fr 45fr',
        gap: '72px', alignItems: 'center',
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
            <em style={{ fontStyle: 'italic', color: '#0BB3A4', fontWeight: 600 }}>
              frenando
            </em>
            {' '}a tu equipo — en 30 minutos.
          </h2>

          <p style={{
            fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 400,
            lineHeight: 1.7, color: 'var(--text-muted)',
            maxWidth: '440px', marginBottom: '44px',
          }}>
            Sin teatro de consultoría. Te mostramos qué herramientas
            generan el mayor impacto en tu operación y cómo
            implementarlas la semana siguiente.
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
                el.style.background = '#0D15B2'
                el.style.transform  = 'translateY(-2px)'
                el.style.boxShadow  = '0 8px 28px rgba(0,0,80,0.3)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#000050'
                el.style.transform  = 'translateY(0)'
                el.style.boxShadow  = '0 4px 20px rgba(0,0,80,0.2)'
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

        {/* ── Right: solar system ── */}
        <div ref={rightRef} style={{ opacity: 0 }}>
          <SolarSystemCanvas />
        </div>

      </div>
    </section>
  )
}
