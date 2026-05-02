import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/* ─── Planets ─── */
const PLANETS = [
  { label: 'Excel & Datos',   color: '#0BB3A4', r: 92,  angSpeed: 68,  startAngle: 0,   size: 7   },
  { label: 'IA Aplicada',     color: '#75C1E7', r: 152, angSpeed: 47,  startAngle: 110, size: 6.5 },
  { label: 'Procesos',        color: '#B39DDB', r: 208, angSpeed: 30,  startAngle: 220, size: 6.5 },
  { label: 'Herramientas',    color: '#FFA07A', r: 262, angSpeed: 18,  startAngle: 310, size: 6   },
  { label: 'Automatización',  color: '#6BCB77', r: 316, angSpeed: 11,  startAngle: 60,  size: 6.5 },
]
const TRAIL_LEN = 22

/* ─── Solar system canvas ─── */
function SolarSystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const startRef  = useRef<number>(0)
  const trailsRef = useRef<{x:number,y:number}[][]>(PLANETS.map(() => []))

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    const W = canvas.width
    const H = canvas.height
    const CX = W / 2
    const CY = H / 2
    const BG_R = PLANETS[4].r + 38

    function draw(ts: number) {
      if (!startRef.current) startRef.current = ts
      const elapsed = (ts - startRef.current) / 1000

      ctx.clearRect(0, 0, W, H)

      /* Dark circular bg with subtle radial gradient */
      const bgGrad = ctx.createRadialGradient(CX, CY, 0, CX, CY, BG_R)
      bgGrad.addColorStop(0,   '#0A0C20')
      bgGrad.addColorStop(1,   '#040510')
      ctx.beginPath()
      ctx.arc(CX, CY, BG_R, 0, Math.PI * 2)
      ctx.fillStyle = bgGrad
      ctx.fill()

      /* Subtle crosshair */
      ctx.save()
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(CX - BG_R, CY); ctx.lineTo(CX + BG_R, CY)
      ctx.moveTo(CX, CY - BG_R); ctx.lineTo(CX, CY + BG_R)
      ctx.stroke()
      ctx.restore()

      /* Orbital rings — fine dashes */
      for (const p of PLANETS) {
        ctx.setLineDash([2, 10])
        ctx.beginPath()
        ctx.arc(CX, CY, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255,255,255,0.06)'
        ctx.lineWidth = 0.75
        ctx.stroke()
        ctx.setLineDash([])

        /* Tiny tick marks every 45° on each orbit */
        for (let a = 0; a < 360; a += 45) {
          const tickRad = (a - 90) * Math.PI / 180
          const x1 = CX + (p.r - 3) * Math.cos(tickRad)
          const y1 = CY + (p.r - 3) * Math.sin(tickRad)
          const x2 = CX + (p.r + 3) * Math.cos(tickRad)
          const y2 = CY + (p.r + 3) * Math.sin(tickRad)
          ctx.beginPath()
          ctx.moveTo(x1, y1); ctx.lineTo(x2, y2)
          ctx.strokeStyle = 'rgba(255,255,255,0.08)'
          ctx.lineWidth = 0.75
          ctx.stroke()
        }
      }

      /* Central star — layered pulse */
      const pulse = 0.5 + 0.5 * Math.sin(ts * 0.002)
      for (const [r, a] of [[18 + pulse*6, 0.06], [11 + pulse*3, 0.12], [6, 1]] as [number,number][]) {
        ctx.beginPath()
        ctx.arc(CX, CY, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(11,179,164,${a})`
        if (a === 1) { ctx.shadowColor = '#0BB3A4'; ctx.shadowBlur = 20 }
        ctx.fill()
        ctx.shadowBlur = 0
      }

      /* Planets + trails + labels */
      for (let i = 0; i < PLANETS.length; i++) {
        const p = PLANETS[i]
        const rad = ((p.startAngle + elapsed * p.angSpeed) % 360 - 90) * Math.PI / 180
        const px  = CX + p.r * Math.cos(rad)
        const py  = CY + p.r * Math.sin(rad)

        /* Update trail */
        const trail = trailsRef.current[i]
        trail.unshift({ x: px, y: py })
        if (trail.length > TRAIL_LEN) trail.pop()

        /* Draw trail */
        for (let t = 1; t < trail.length; t++) {
          const alpha = (1 - t / TRAIL_LEN) * 0.35
          const r2    = p.size * (1 - t / TRAIL_LEN) * 0.7
          ctx.beginPath()
          ctx.arc(trail[t].x, trail[t].y, Math.max(r2, 0.5), 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.globalAlpha = alpha
          ctx.fill()
        }
        ctx.globalAlpha = 1

        /* Planet dot — clean, no halo */
        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0

        /* Label — offset outward, larger font */
        const dx = px - CX, dy = py - CY
        const len = Math.sqrt(dx*dx + dy*dy) || 1
        const nx = dx/len, ny = dy/len
        const lx = px + nx * (p.size + 14)
        const ly = py + ny * (p.size + 14)

        ctx.font = '500 13px Poppins, sans-serif'
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.9
        ctx.textAlign    = lx > CX + 8 ? 'left' : lx < CX - 8 ? 'right' : 'center'
        ctx.textBaseline = ly > CY + 8 ? 'top'  : ly < CY - 8 ? 'bottom' : 'middle'
        ctx.shadowColor  = p.color
        ctx.shadowBlur   = 6
        ctx.fillText(p.label, lx, ly)
        ctx.shadowBlur   = 0
        ctx.globalAlpha  = 1

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
      width={760}
      height={760}
      data-no-transition
      style={{ width: '100%', display: 'block' }}
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
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '48px', alignItems: 'center',
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
