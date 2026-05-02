const LINKS = [
  {
    heading: 'Servicios',
    items: [
      'Excel Empresarial',
      'IA para Negocios',
      'Herramientas Digitales',
      'Consultoría',
    ],
  },
  {
    heading: 'Empresa',
    items: [
      'Quiénes Somos',
      'Proceso',
      'Casos de Éxito',
      'Blog',
    ],
  },
  {
    heading: 'Contacto',
    items: [
      'Agendar llamada',
      'hola@sincero.io',
      'LinkedIn',
      'Instagram',
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#000050' }}>
      {/* Gradient separator */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(11,179,164,0.3), transparent)',
      }} />

      {/* Main content */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto', padding: '72px 48px 48px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '64px',
        }}>

          {/* ── Brand col ── */}
          <div>
            {/* Wordmark */}
            <a href="#" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '16px' }}>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 600,
                fontSize: '22px', color: '#0BB3A4',
                letterSpacing: '0.18em', userSelect: 'none',
                display: 'inline-flex', alignItems: 'center',
              }}>
                SINCER
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  0
                  <span style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%) rotate(-18deg)',
                    width: '52%', height: '1.5px',
                    background: '#0BB3A4', display: 'block',
                    borderRadius: '1px', pointerEvents: 'none',
                  }} />
                </span>
              </span>
            </a>

            <p style={{
              fontFamily: 'Poppins, sans-serif', fontSize: '13px',
              fontWeight: 400, color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7, maxWidth: '240px', marginBottom: '28px',
            }}>
              Tu aliado tecnológico para PyMEs en Latam. Capacitación en Excel, IA y herramientas digitales.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {['in', 'ig', 'x'].map(s => (
                <a
                  key={s}
                  href="#"
                  style={{
                    width: '34px', height: '34px', borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 600,
                    color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                    transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = 'rgba(11,179,164,0.4)'
                    el.style.color = '#0BB3A4'
                    el.style.background = 'rgba(11,179,164,0.06)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = 'rgba(255,255,255,0.1)'
                    el.style.color = 'rgba(255,255,255,0.4)'
                    el.style.background = 'transparent'
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          {LINKS.map(col => (
            <div key={col.heading}>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)', marginBottom: '20px',
              }}>
                {col.heading}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 400,
                        color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0BB3A4' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)' }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          paddingTop: '28px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <span style={{
            fontFamily: 'Poppins, sans-serif', fontSize: '12px',
            color: 'rgba(255,255,255,0.25)',
          }}>
            © {new Date().getFullYear()} Sincero. Todos los derechos reservados.
          </span>

          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacidad', 'Términos de uso', 'Cookies'].map(link => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: '12px',
                  color: 'rgba(255,255,255,0.25)', textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.25)' }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
