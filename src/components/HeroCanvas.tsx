import { useEffect, useRef } from 'react'

interface Ray {
  angle: number
  phase: number
  phaseSpeed: number
  distMin: number
  distRange: number
  len: number
  width: number
  opacity: number
  colorIdx: number
}

const COLORS = [
  '#0BB3A4', // teal primary
  '#75C1E7', // sky blue
  '#0D15B2', // accent blue
  '#ffffff',  // white
  '#0BB3A4',  // teal (weighted double)
  '#4dd9cc',  // teal light
]

function makeRay(): Ray {
  return {
    angle: Math.random() * Math.PI * 2,
    phase: Math.random(),
    phaseSpeed: 0.0015 + Math.random() * 0.0035,
    distMin: 0.02 + Math.random() * 0.08,
    distRange: 0.25 + Math.random() * 0.55,
    len: 0.06 + Math.random() * 0.22,
    width: 0.4 + Math.random() * 1.2,
    opacity: 0.4 + Math.random() * 0.6,
    colorIdx: Math.floor(Math.random() * COLORS.length),
  }
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: 0.5, y: 0.45 })
  const focalRef  = useRef({ x: 0.5, y: 0.45 })
  const raysRef   = useRef<Ray[]>(Array.from({ length: 160 }, makeRay))
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', onMouse)

    const draw = () => {
      const W = canvas.width
      const H = canvas.height

      /* Lerp focal toward mouse */
      const f = focalRef.current
      const m = mouseRef.current
      f.x += (m.x - f.x) * 0.04
      f.y += (m.y - f.y) * 0.04
      const cx = f.x * W
      const cy = f.y * H
      const diag = Math.sqrt(W * W + H * H)

      /* Trail fade */
      ctx.fillStyle = 'rgba(0, 0, 40, 0.18)'
      ctx.fillRect(0, 0, W, H)

      /* Central radial glow */
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, diag * 0.32)
      glow.addColorStop(0,   'rgba(11,179,164, 0.12)')
      glow.addColorStop(0.4, 'rgba(11,179,164, 0.03)')
      glow.addColorStop(1,   'transparent')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)

      /* Rays */
      for (const ray of raysRef.current) {
        ray.phase = (ray.phase + ray.phaseSpeed) % 1

        /* Eased alpha: smooth pulse */
        const t = ray.phase
        const pulse = t < 0.5 ? t * 2 : (1 - t) * 2
        const alpha = Math.pow(pulse, 1.6) * ray.opacity

        const dist = (ray.distMin + ray.phase * ray.distRange) * diag
        const len  = ray.len * diag

        const x1 = cx + Math.cos(ray.angle) * dist
        const y1 = cy + Math.sin(ray.angle) * dist
        const x2 = cx + Math.cos(ray.angle) * (dist + len)
        const y2 = cy + Math.sin(ray.angle) * (dist + len)

        const color = COLORS[ray.colorIdx]

        /* Gradient: bright at inner end, transparent at outer */
        const grad = ctx.createLinearGradient(x1, y1, x2, y2)
        grad.addColorStop(0, hexAlpha(color, alpha))
        grad.addColorStop(0.6, hexAlpha(color, alpha * 0.3))
        grad.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = grad
        ctx.lineWidth   = ray.width
        ctx.stroke()
      }

      /* Edge vignette */
      const vig = ctx.createRadialGradient(W / 2, H / 2, diag * 0.3, W / 2, H / 2, diag * 0.75)
      vig.addColorStop(0, 'transparent')
      vig.addColorStop(1, 'rgba(0,0,30, 0.7)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      data-no-transition
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  )
}

/* hex color + alpha 0-1 → rgba string */
function hexAlpha(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a.toFixed(3)})`
}
