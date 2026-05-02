import { useRef, useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '../hooks/useTheme'

/* ─── Content config ─── */
const MEGA_COLUMNS = [
  {
    title: 'Capacitación',
    items: [
      { name: 'Excel Empresarial',    desc: 'Desde básico hasta Power BI' },
      { name: 'IA para Negocios',     desc: 'ChatGPT, Copilot y automatización' },
      { name: 'Herramientas Digitales', desc: 'Notion, Drive, Sheets y más' },
    ],
  },
  {
    title: 'Consultoría',
    items: [
      { name: 'Diagnóstico Digital',  desc: 'Evaluamos el estado de tu empresa' },
      { name: 'Hoja de Ruta',         desc: 'Plan de transformación a tu medida' },
      { name: 'Acompañamiento',       desc: 'Soporte continuo post-capacitación' },
    ],
  },
  {
    title: 'Formatos',
    items: [
      { name: 'Talleres en Vivo',     desc: 'Sesiones grupales interactivas' },
      { name: 'E-learning',           desc: 'Aprende a tu propio ritmo' },
      { name: 'In-company',           desc: 'Capacitación dentro de tu empresa' },
    ],
  },
  {
    title: 'Recursos',
    items: [
      { name: 'Blog',                 desc: 'Artículos y guías prácticas' },
      { name: 'Casos de Éxito',       desc: 'Resultados de nuestros clientes' },
      { name: 'Webinars Gratuitos',   desc: 'Eventos en vivo cada mes' },
    ],
  },
]

const NAV_LINKS = ['Servicios', 'Proceso', 'Clientes', 'Nosotros']

/* ─── Component ─── */
export default function Nav() {
  const { toggle, isDark } = useTheme()
  const [scrolled, setScrolled]     = useState(false)
  const [megaOpen, setMegaOpen]     = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)

  const navRef      = useRef<HTMLElement>(null)
  const megaRef     = useRef<HTMLDivElement>(null)
  const itemsRef    = useRef<HTMLDivElement[]>([])
  const tlRef       = useRef<gsap.core.Timeline | null>(null)

  /* Scroll compact */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Build mega-menu timeline (runs once) */
  useEffect(() => {
    if (!megaRef.current) return
    const items = itemsRef.current.filter(Boolean)

    tlRef.current = gsap.timeline({ paused: true })
      .fromTo(megaRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
      )
      .fromTo(items,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, stagger: 0.04, ease: 'power2.out' },
        '-=0.15'
      )
  }, [])

  /* Play/reverse mega on state change */
  useEffect(() => {
    if (!tlRef.current) return
    if (megaOpen) tlRef.current.play()
    else tlRef.current.reverse()
  }, [megaOpen])

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMegaOpen(false)
        setActiveLink(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLinkClick = useCallback((link: string) => {
    if (link === 'Servicios') {
      const opening = !megaOpen
      setMegaOpen(opening)
      setActiveLink(opening ? link : null)
    } else {
      setMegaOpen(false)
      setActiveLink(link)
    }
  }, [megaOpen])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: scrolled ? '12px' : '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'min(1100px, calc(100vw - 48px))',
        background: 'rgba(0, 0, 70, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(11, 179, 164, 0.15)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'top 0.3s ease, box-shadow 0.3s ease',
        boxShadow: scrolled
          ? '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(11,179,164,0.2)'
          : '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      {/* ── Top bar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '10px 24px' : '14px 28px',
        transition: 'padding 0.3s ease',
      }}>

        {/* Wordmark */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: scrolled ? '17px' : '20px',
            color: '#0BB3A4',
            letterSpacing: '0.18em',
            fontVariantNumeric: 'slashed-zero',
            fontFeatureSettings: '"zero" 1',
            transition: 'font-size 0.3s ease',
            userSelect: 'none',
          }}>
            SINCER0
          </span>
        </a>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => handleLinkClick(link)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 14px',
                borderRadius: '8px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: activeLink === link ? '#0BB3A4' : 'rgba(255,255,255,0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'color 0.2s ease, background 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                if (activeLink !== link)
                  (e.currentTarget as HTMLButtonElement).style.color = '#ffffff'
              }}
              onMouseLeave={e => {
                if (activeLink !== link)
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.8)'
              }}
            >
              {link === 'Servicios' && (
                <span style={{
                  width: '6px', height: '6px',
                  borderRadius: '50%',
                  background: '#0BB3A4',
                  display: 'inline-block',
                  flexShrink: 0,
                }} />
              )}
              {link}
              {link === 'Servicios' && (
                <svg
                  width="10" height="6" viewBox="0 0 10 6" fill="none"
                  style={{
                    transform: megaOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Right side: theme toggle + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {/* Theme toggle */}
          <button
            onClick={toggle}
            title={isDark ? 'Modo claro' : 'Modo oscuro'}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              width: '34px', height: '34px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '15px',
              transition: 'background 0.2s ease, color 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(11,179,164,0.15)'
              ;(e.currentTarget as HTMLButtonElement).style.color = '#0BB3A4'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'
              ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)'
            }}
          >
            {isDark ? '☀' : '☾'}
          </button>

          {/* CTA */}
          <a
            href="#contacto"
            style={{
              padding: '9px 20px',
              borderRadius: '10px',
              border: '1.5px solid #0BB3A4',
              background: 'transparent',
              color: '#0BB3A4',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s ease, color 0.2s ease',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#0BB3A4'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#000050'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#0BB3A4'
            }}
          >
            Agendar llamada
          </a>
        </div>
      </div>

      {/* ── Mega menu ── */}
      <div
        ref={megaRef}
        style={{
          height: 0,
          opacity: 0,
          overflow: 'hidden',
          borderTop: '1px solid rgba(11, 179, 164, 0.12)',
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
          padding: '28px 28px 32px',
        }}>
          {MEGA_COLUMNS.map((col, ci) => (
            <div
              key={col.title}
              ref={el => { if (el) itemsRef.current[ci] = el }}
              style={{
                paddingRight: ci < 3 ? '24px' : '0',
                borderRight: ci < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                paddingLeft: ci > 0 ? '24px' : '0',
              }}
            >
              {/* Column header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '0.03em',
                }}>
                  {col.title}
                </span>
                <span style={{ fontSize: '16px', opacity: 0.4 }}>
                  {ci === 0 ? '⚡' : ci === 1 ? '◎' : ci === 2 ? '▣' : '✦'}
                </span>
              </div>

              {/* Items */}
              {col.items.map(item => (
                <a
                  key={item.name}
                  href="#"
                  style={{
                    display: 'block',
                    padding: '10px 0',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    transition: 'padding-left 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '6px'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0px'
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#ffffff', marginBottom: '2px' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>
                    {item.desc}
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Mega footer */}
        <div style={{
          padding: '14px 28px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <a
            href="#servicios"
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#0BB3A4'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)'
            }}
          >
            Ver todos los servicios →
          </a>
        </div>
      </div>
    </nav>
  )
}
