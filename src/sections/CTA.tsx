import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Radar axes ─── */
const AXES = [
  { angle: 0,   label: 'Excel & Datos',   color: '#0BB3A4' },
  { angle: 72,  label: 'IA Aplicada',     color: '#75C1E7' },
  { angle: 144, label: 'Procesos',        color: '#B39DDB' },
  { angle: 216, label: 'Herramientas',    color: '#FFA07A' },
  { angle: 288, label: 'Automatización',  color: '#6BCB77' },
]

const REVOLUTION_MS = 6000   // 1 full rotation in 6 seconds
const TRAIL_DEG     = 60     // degrees of sweep trail

/* ─── Canvas radar ─── */
function RadarCanvas() {
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
    const R  = W * 0.40   // outer radius

    function draw(ts: number) {
      if (!startRef.current) startRef.current = ts
      const sweepDeg = ((ts - startRef.current) / REVOLUTION_MS * 360) % 360
      const sweepRad = (sweepDeg - 90) * Math.PI / 180

      ctx.clearRect(0, 0, W, H)

      /* ── Dark circular background ── */
      ctx.save()
      ctx.beginPath()
      ctx.arc(CX, CY, R + 30, 0, Math.PI * 2)
      ctx.fillStyle = '#06071A'
      ctx.fill()
      ctx.restore()

      /* ── Concentric rings ── */
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath()
        ctx.arc(CX, CY, R * i / 4, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255,255,255,0.08)'
        ctx.setLineDash(i < 4 ? [3, 7] : [])
        ctx.lineWidth = i === 4 ? 1 : 0.75
        ctx.stroke()
      }
      ctx.setLineDash([])

      /* ── Sweep trail: fan of fading lines ── */
      for (let step = 0; step <= TRAIL_DEG; step += 2) {
        const t   = 1 - step / TRAIL_DEG
        const ang = sweepRad - step * Math.PI / 180
        const x0  = CX + R * 0.08 * Math.cos(ang)
        const y0  = CY + R * 0.08 * Math.sin(ang)
        const x1  = CX + R * Math.cos(ang)
        const y1  = CY + R * Math.sin(ang)
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x1, y1)
        ctx.strokeStyle = `rgba(11,179,164,${(t * t * 0.22).toFixed(3)})`
        ctx.lineWidth   = 1.5
        ctx.stroke()
      }

      /* ── Sweep line ── */
      const sxEnd = CX + R * Math.cos(sweepRad)
      const syEnd = CY + R * Math.sin(sweepRad)
      const lineGrad = ctx.createLinearGradient(CX, CY, sxEnd, syEnd)
      lineGrad.addColorStop(0, 'rgba(11,179,164,0.1)')
      lineGrad.addColorStop(1, 'rgba(11,179,164,0.95)')
      ctx.beginPath()
      ctx.moveTo(CX, CY)
      ctx.lineTo(sxEnd, syEnd)
      ctx.strokeStyle = lineGrad
      ctx.lineWidth   = 2
      ctx.shadowColor = '#0BB3A4'
      ctx.shadowBlur  = 10
      ctx.stroke()
      ctx.shadowBlur  = 0

      /* ── Axes + dots + labels ── */
      for (const axis of AXES) {
        const axRad = (axis.angle - 90) * Math.PI / 180

        /* Angular distance behind sweep (0 = just hit, TRAIL_DEG = about to leave) */
        const diff = (sweepDeg - axis.angle + 360) % 360
        const fade = diff < TRAIL_DEG ? 1 - diff / TRAIL_DEG : 0
        const active = fade > 0

        /* Axis line */
        ctx.save()
        const extR = active ? R * (1 + fade * 0.08) : R
        ctx.beginPath()
        ctx.moveTo(CX, CY)
        ctx.lineTo(CX + extR * Math.cos(axRad), CY + extR * Math.sin(axRad))
        ctx.strokeStyle = active ? axis.color : 'rgba(255,255,255,0.06)'
        ctx.globalAlpha = active ? 0.12 + fade * 0.55 : 1
        ctx.lineWidth   = active ? 1.5 : 0.7
        if (active) {
          ctx.shadowColor = axis.color
          ctx.shadowBlur  = 6
        }
        ctx.stroke()
        ctx.shadowBlur  = 0
        ctx.restore()

        /* Dot at 72% radius */
        const dotR = R * 0.72
        const dotX = CX + dotR * Math.cos(axRad)
        const dotY = CY + dotR * Math.sin(axRad)
        const dotSize = active ? 3 + fade * 6 : 3

        /* Glow ring when active */
        if (active) {
          ctx.beginPath()
          ctx.arc(dotX, dotY, dotSize + 5, 0, Math.PI * 2)
          ctx.fillStyle = axis.color
          ctx.globalAlpha = fade * 0.18
          ctx.fill()
          ctx.globalAlpha = 1
        }

        /* Dot */
        ctx.beginPath()
        ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2)
        ctx.fillStyle = active ? axis.color : 'rgba(255,255,255,0.3)'
        if (active) {
          ctx.shadowColor = axis.color
          ctx.shadowBlur  = 14
        }
        ctx.fill()
        ctx.shadowBlur = 0

        /* Small dots along axis at 35% and 55% */
        for (const pct of [0.35, 0.55]) {
          const px = CX + R * pct * Math.cos(axRad)
          const py = CY + R * pct * Math.sin(axRad)
          ctx.beginPath()
          ctx.arc(px, py, active ? 2 + fade * 1.5 : 2, 0, Math.PI * 2)
          ctx.fillStyle = active ? axis.color : 'rgba(255,255,255,0.2)'
          ctx.globalAlpha = active ? 0.4 + fade * 0.5 : 0.4
          ctx.fill()
          ctx.globalAlpha = 1
        }

        /* Label */
        if (active && fade > 0.05) {
          const labelDist = R + 26
          const lx = CX + labelDist * Math.cos(axRad)
          const ly = CY + labelDist * Math.sin(axRad)

          ctx.save()
          ctx.font         = '500 11px Poppins, sans-serif'
          ctx.fillStyle    = axis.color
          ctx.globalAlpha  = Math.min(1, fade * 2.5)
          ctx.textAlign    = lx > CX + 8 ? 'left' : lx < CX - 8 ? 'right' : 'center'
          ctx.textBaseline = ly > CY + 8 ? 'top' : ly < CY - 8 ? 'bottom' : 'middle'
          ctx.shadowColor  = axis.color
          ctx.shadowBlur   = 8
          ctx.fillText(axis.label, lx, ly)
          ctx.restore()
        }
      }

      /* ── Tick marks on outer ring ── */
      for (let i = 0; i < 20; i++) {
        const tickRad = (i * 18 - 90) * Math.PI / 180
        const x1 = CX + (R + 4)  * Math.cos(tickRad)
        const y1 = CY + (R + 4)  * Math.sin(tickRad)
        const x2 = CX + (R + 10) * Math.cos(tickRad)
        const y2 = CY + (R + 10) * Math.sin(tickRad)
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = 'rgba(255,255,255,0.12)'
        ctx.lineWidth   = 1
        ctx.stroke()
      }

      /* ── Center dot ── */
      const pulse = 0.5 + 0.5 * Math.sin(ts * 0.003)
      ctx.beginPath()
      ctx.arc(CX, CY, 5 + pulse * 3, 0, Math.PI * 2)
      ctx.fillStyle   = '#0BB3A4'
      ctx.globalAlpha = 0.15 + pulse * 0.1
      ctx.fill()
      ctx.globalAlpha = 1
      ctx.beginPath()
      ctx.arc(CX, CY, 4, 0, Math.PI * 2)
      ctx.fillStyle   = '#0BB3A4'
      ctx.shadowColor = '#0BB3A4'
      ctx.shadowBlur  = 12
      ctx.fill()
      ctx.shadowBlur  = 0

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={420}
      height={420}
      data-no-transition
      style={{ width: '100%', maxWidth: '460px', display: 'block', margin: '0 auto' }}
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
            {' '}a tu equipo —{' '}
            en 30 minutos.
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

        {/* ── Right: animated radar ── */}
        <div ref={rightRef} style={{ opacity: 0 }}>
          <RadarCanvas />
        </div>

      </div>
    </section>
  )
}
