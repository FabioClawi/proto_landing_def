import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '../hooks/useTheme'

/* ─── Types ─── */
type Column = {
  title: string
  icon: string
  items: { name: string; desc: string }[]
}
type NavLink = {
  label: string
  columns: Column[]
  footerLabel: string
}

/* ─── Dropdown content ─── */
const NAV_LINKS: NavLink[] = [
  {
    label: 'Servicios',
    footerLabel: 'Ver todos los servicios →',
    columns: [
      {
        title: 'Capacitación', icon: '⚡',
        items: [
          { name: 'Excel Empresarial',      desc: 'Desde básico hasta Power BI' },
          { name: 'IA para Negocios',       desc: 'ChatGPT, Copilot y automatización' },
          { name: 'Herramientas Digitales', desc: 'Notion, Drive, Sheets y más' },
        ],
      },
      {
        title: 'Consultoría', icon: '◎',
        items: [
          { name: 'Diagnóstico Digital', desc: 'Evaluamos el estado de tu empresa' },
          { name: 'Hoja de Ruta',        desc: 'Plan de transformación a tu medida' },
          { name: 'Acompañamiento',      desc: 'Soporte continuo post-capacitación' },
        ],
      },
      {
        title: 'Formatos', icon: '▣',
        items: [
          { name: 'Talleres en Vivo', desc: 'Sesiones grupales interactivas' },
          { name: 'E-learning',       desc: 'Aprende a tu propio ritmo' },
          { name: 'In-company',       desc: 'Capacitación dentro de tu empresa' },
        ],
      },
      {
        title: 'Recursos', icon: '✦',
        items: [
          { name: 'Blog',               desc: 'Artículos y guías prácticas' },
          { name: 'Casos de Éxito',     desc: 'Resultados de nuestros clientes' },
          { name: 'Webinars Gratuitos', desc: 'Eventos en vivo cada mes' },
        ],
      },
    ],
  },
  {
    label: 'Proceso',
    footerLabel: 'Conocer el proceso completo →',
    columns: [
      {
        title: 'Cómo Trabajamos', icon: '◈',
        items: [
          { name: 'Diagnóstico Inicial', desc: 'Mapeamos las habilidades del equipo' },
          { name: 'Plan Personalizado',  desc: 'Programa diseñado para tu empresa' },
          { name: 'Implementación',      desc: 'Capacitación práctica y enfocada' },
        ],
      },
      {
        title: 'Resultados', icon: '↗',
        items: [
          { name: 'Seguimiento',     desc: 'Medimos el progreso en tiempo real' },
          { name: 'Certificación',   desc: 'Evidencia del aprendizaje logrado' },
          { name: 'Optimización',    desc: 'Ajustes continuos según resultados' },
        ],
      },
    ],
  },
  {
    label: 'Clientes',
    footerLabel: 'Ver todos los casos de éxito →',
    columns: [
      {
        title: 'Sectores', icon: '◉',
        items: [
          { name: 'Retail y Comercio',       desc: 'PyMEs con equipos de ventas y ops' },
          { name: 'Servicios Profesionales', desc: 'Consultoras, agencias, estudios' },
          { name: 'Manufactura',             desc: 'Equipos operativos y de gestión' },
        ],
      },
      {
        title: 'Resultados', icon: '★',
        items: [
          { name: 'Casos de Éxito',    desc: 'Historias reales de transformación' },
          { name: 'Testimonios',       desc: 'Lo que dicen nuestros clientes' },
          { name: 'Impacto en Números', desc: 'Métricas de nuestros programas' },
        ],
      },
    ],
  },
  {
    label: 'Nosotros',
    footerLabel: 'Conocer más sobre Sincero →',
    columns: [
      {
        title: 'Quiénes Somos', icon: '◐',
        items: [
          { name: 'Nuestra Misión', desc: 'Por qué existe Sincero' },
          { name: 'El Equipo',      desc: 'Las personas detrás del proyecto' },
          { name: 'Metodología',    desc: 'Cómo enseñamos diferente' },
        ],
      },
      {
        title: 'Conecta', icon: '→',
        items: [
          { name: 'Blog',                  desc: 'Artículos y guías prácticas' },
          { name: 'Contacto',              desc: 'Hablemos de tu empresa' },
          { name: 'Trabaja con Nosotros',  desc: 'Únete al equipo Sincero' },
        ],
      },
    ],
  },
]

/* ─── Component ─── */
export default function Nav() {
  const { toggle, isDark }       = useTheme()
  const [scrolled, setScrolled]  = useState(false)
  const [openLink, setOpenLink]  = useState<string | null>(null)

  const navRef   = useRef<HTMLElement>(null)
  const megaRef  = useRef<HTMLDivElement>(null)

  /* Scroll compact */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Animate dropdown open/close */
  useEffect(() => {
    if (!megaRef.current) return

    if (openLink) {
      gsap.to(megaRef.current, { height: 'auto', opacity: 1, duration: 0.32, ease: 'power2.out' })
      const items = megaRef.current.querySelectorAll<HTMLElement>('[data-item]')
      gsap.fromTo(items,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.22, stagger: 0.035, ease: 'power2.out', delay: 0.1 }
      )
    } else {
      gsap.to(megaRef.current, { height: 0, opacity: 0, duration: 0.22, ease: 'power2.in' })
    }
  }, [openLink])

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setOpenLink(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const activeData = NAV_LINKS.find(l => l.label === openLink)

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
        background: 'rgba(0, 0, 55, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(11,179,164,0.15)',
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

        {/* Wordmark with CSS slashed zero */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: scrolled ? '17px' : '20px',
            color: '#0BB3A4',
            letterSpacing: '0.18em',
            transition: 'font-size 0.3s ease',
            userSelect: 'none',
            display: 'inline-flex',
            alignItems: 'center',
          }}>
            SINCER
            {/* Slashed zero via CSS overlay */}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              0
              <span style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-18deg)',
                width: '52%',
                height: '1.5px',
                background: '#0BB3A4',
                display: 'block',
                borderRadius: '1px',
                pointerEvents: 'none',
              }} />
            </span>
          </span>
        </a>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {NAV_LINKS.map(link => {
            const isOpen = openLink === link.label
            return (
              <button
                key={link.label}
                onClick={() => setOpenLink(isOpen ? null : link.label)}
                style={{
                  background: isOpen ? 'rgba(11,179,164,0.08)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: isOpen ? '#0BB3A4' : 'rgba(255,255,255,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color 0.2s ease, background 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isOpen) (e.currentTarget as HTMLButtonElement).style.color = '#ffffff'
                }}
                onMouseLeave={e => {
                  if (!isOpen) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.8)'
                }}
              >
                {/* Dot — only when THIS dropdown is open */}
                <span style={{
                  width: '5px', height: '5px',
                  borderRadius: '50%',
                  background: '#0BB3A4',
                  display: 'inline-block',
                  flexShrink: 0,
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'scale(1)' : 'scale(0)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  boxShadow: isOpen ? '0 0 6px #0BB3A4' : 'none',
                }} />
                {link.label}
                <svg
                  width="9" height="5" viewBox="0 0 9 5" fill="none"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    opacity: 0.5,
                  }}
                >
                  <path d="M1 1L4.5 4L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )
          })}
        </div>

        {/* Right: theme toggle + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
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
              fontSize: '14px',
              transition: 'background 0.2s ease, color 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.background = 'rgba(11,179,164,0.15)'
              el.style.color = '#0BB3A4'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.background = 'rgba(255,255,255,0.08)'
              el.style.color = 'rgba(255,255,255,0.7)'
            }}
          >
            {isDark ? '☀' : '☾'}
          </button>

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
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = '#0BB3A4'
              el.style.color = '#000050'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'transparent'
              el.style.color = '#0BB3A4'
            }}
          >
            Agendar llamada
          </a>
        </div>
      </div>

      {/* ── Dropdown panel ── */}
      <div
        ref={megaRef}
        style={{
          height: 0,
          opacity: 0,
          overflow: 'hidden',
          borderTop: openLink ? '1px solid rgba(11,179,164,0.1)' : 'none',
        }}
      >
        {activeData && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${activeData.columns.length}, 1fr)`,
              padding: '28px 28px 24px',
            }}>
              {activeData.columns.map((col, ci) => (
                <div
                  key={col.title}
                  data-item
                  style={{
                    paddingRight: ci < activeData.columns.length - 1 ? '28px' : '0',
                    paddingLeft:  ci > 0 ? '28px' : '0',
                    borderRight:  ci < activeData.columns.length - 1
                      ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  {/* Column header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                    paddingBottom: '10px',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', letterSpacing: '0.04em' }}>
                      {col.title}
                    </span>
                    <span style={{ fontSize: '14px', opacity: 0.35 }}>{col.icon}</span>
                  </div>

                  {/* Items */}
                  {col.items.map(item => (
                    <a
                      key={item.name}
                      href="#"
                      data-item
                      style={{
                        display: 'block',
                        padding: '9px 0',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        transition: 'padding-left 0.18s ease',
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
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>
                        {item.desc}
                      </div>
                    </a>
                  ))}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              padding: '12px 28px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
              <a
                href="#"
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0BB3A4' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)' }}
              >
                {activeData.footerLabel}
              </a>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}
