import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import logoMark from '../assets/logo-mark-teal.svg'

/* ─── Ray colors ─── */
const COLORS = ['#0BB3A4', '#75C1E7', '#4dd9cc', '#ffffff', '#0BB3A4', '#0BB3A4']

function hexAlpha(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${Math.max(0, a).toFixed(3)})`
}

interface Ray {
  angle:     number
  phase:     number
  phaseSpeed:number
  length:    number
  width:     number
  opacity:   number
  colorIdx:  number
}

function makeRay(): Ray {
  return {
    angle:      Math.random() * Math.PI * 2,
    phase:      Math.random(),
    phaseSpeed: 0.004 + Math.random() * 0.008,
    length:     0.08 + Math.random() * 0.18,
    width:      0.4 + Math.random() * 1.1,
    opacity:    0.5 + Math.random() * 0.5,
    colorIdx:   Math.floor(Math.random() * COLORS.length),
  }
}

/* ─── Outward ray canvas ─── */
function IntroCanvas({ intensityRef }: { intensityRef: React.MutableRefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const raysRef   = useRef<Ray[]>(Array.from({ length: 180 }, makeRay))

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const W    = canvas.width
      const H    = canvas.height
      const CX   = W / 2
      const CY   = H / 2
      const diag = Math.sqrt(W * W + H * H) * 0.62
      const k    = intensityRef.current

      /* Soft clear — trail effect */
      ctx.fillStyle = `rgba(0, 0, 40, ${0.25 - k * 0.1})`
      ctx.fillRect(0, 0, W, H)

      /* Central glow — grows with intensity */
      if (k > 0.05) {
        const glow = ctx.createRadialGradient(CX, CY, 0, CX, CY, diag * 0.45 * k)
        glow.addColorStop(0,   `rgba(11,179,164,${(0.18 * k).toFixed(3)})`)
        glow.addColorStop(0.5, `rgba(11,179,164,${(0.06 * k).toFixed(3)})`)
        glow.addColorStop(1,   'transparent')
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, W, H)
      }

      /* Rays */
      for (const ray of raysRef.current) {
        ray.phase += ray.phaseSpeed
        if (ray.phase > 1.15) {
          ray.phase      = 0
          ray.angle      = Math.random() * Math.PI * 2
          ray.colorIdx   = Math.floor(Math.random() * COLORS.length)
          ray.phaseSpeed = 0.004 + Math.random() * 0.008
        }

        if (k < 0.02) continue

        /* Fade: max brightness in mid-journey, zero at edges */
        const peakFade = Math.sin(ray.phase * Math.PI)
        const alpha    = peakFade * ray.opacity * k

        const innerDist = ray.phase * diag
        const outerDist = Math.min((ray.phase + ray.length) * diag, diag * 1.1)

        const x1 = CX + innerDist * Math.cos(ray.angle)
        const y1 = CY + innerDist * Math.sin(ray.angle)
        const x2 = CX + outerDist * Math.cos(ray.angle)
        const y2 = CY + outerDist * Math.sin(ray.angle)

        const grad = ctx.createLinearGradient(x1, y1, x2, y2)
        grad.addColorStop(0, hexAlpha(COLORS[ray.colorIdx], alpha))
        grad.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = grad
        ctx.lineWidth   = ray.width
        ctx.stroke()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [intensityRef])

  return (
    <canvas
      ref={canvasRef}
      data-no-transition
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}

/* ─── Main overlay ─── */
export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const overlayRef    = useRef<HTMLDivElement>(null)
  const markRef       = useRef<HTMLImageElement>(null)
  const wordmarkRef   = useRef<HTMLDivElement>(null)
  const lettersRef    = useRef<(HTMLSpanElement | null)[]>([])
  const intensityRef  = useRef(0)

  const LETTERS = ['S','I','N','C','E','R','0']

  useEffect(() => {
    /* Prevent replay on HMR in dev */
    if (import.meta.env.DEV && sessionStorage.getItem('sincero-intro')) {
      onComplete(); return
    }

    const tl = gsap.timeline()

    /* Phase 1: overlay visible, all content invisible */
    tl
      /* Phase 2: S-mark fades in + scales */
      .fromTo(markRef.current,
        { opacity: 0, scale: 0.55 },
        { opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out' },
        0.25
      )
      /* Canvas rays ramp up */
      .to(intensityRef, { current: 1, duration: 1.0, ease: 'power2.in' }, 0.4)

      /* Letters stagger in */
      .fromTo(
        lettersRef.current.filter(Boolean),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.3, ease: 'power3.out' },
        0.75
      )

      /* Hold at peak */
      .to({}, { duration: 0.35 }, 1.4)

      /* Curtain lift — clip from bottom to top with curved edge */
      .to(overlayRef.current, {
        clipPath: 'inset(0% 0% 100% 0% round 0% 0% 60% 60%)',
        duration: 0.85,
        ease: 'power2.inOut',
        onComplete: () => {
          if (import.meta.env.DEV) sessionStorage.setItem('sincero-intro', '1')
          onComplete()
        },
      }, 1.75)

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000028',
        clipPath: 'inset(0% 0% 0% 0%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        pointerEvents: 'none',
      }}
    >
      {/* Outward ray canvas */}
      <IntroCanvas intensityRef={intensityRef} />

      {/* S mark */}
      <img
        ref={markRef}
        src={logoMark}
        alt=""
        style={{
          width: '72px',
          height: '72px',
          position: 'relative',
          zIndex: 10,
          opacity: 0,
          filter: 'drop-shadow(0 0 18px rgba(11,179,164,0.6))',
        }}
      />

      {/* SINCER0 wordmark — split by letter */}
      <div
        ref={wordmarkRef}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: '26px',
          letterSpacing: '0.22em',
          color: '#0BB3A4',
          filter: 'drop-shadow(0 0 10px rgba(11,179,164,0.4))',
        }}
      >
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            ref={el => { lettersRef.current[i] = el }}
            style={{
              opacity: 0,
              display: 'inline-block',
              position: letter === '0' ? 'relative' : undefined,
            }}
          >
            {letter === '0' ? (
              <>
                0
                <span style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-18deg)',
                  width: '52%', height: '1.5px',
                  background: '#0BB3A4',
                  display: 'block',
                  borderRadius: '1px',
                  pointerEvents: 'none',
                }} />
              </>
            ) : letter}
          </span>
        ))}
      </div>
    </div>
  )
}
