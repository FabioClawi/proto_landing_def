import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const ITEMS = [
  {
    title: 'Tu equipo. Evaluado.',
    desc:  'Mapeamos el nivel actual de cada persona y detectamos las oportunidades de mejora con mayor impacto para tu negocio — antes de capacitar a nadie.',
  },
  {
    title: 'Un programa a tu medida.',
    desc:  'No cursos genéricos. Diseñamos un plan enfocado en las herramientas que realmente usa tu equipo: Excel, IA, automatización y más.',
  },
  {
    title: 'Capacitación que se aplica.',
    desc:  'Talleres en vivo, e-learning y sesiones in-company con ejercicios basados en casos reales de tu empresa. El aprendizaje se siente el mismo día.',
  },
  {
    title: 'Resultados que se miden.',
    desc:  'Hacemos seguimiento del progreso, certificamos el aprendizaje y ajustamos el programa para garantizar un impacto tangible y sostenido.',
  },
]

/* ─── Visual 1: Diagnóstico — team skill map ─── */
const TEAM = [
  { init: 'MR', excel: 30, ia: 10, tools: 20 },
  { init: 'LP', excel: 70, ia: 25, tools: 55 },
  { init: 'CA', excel: 45, ia: 15, tools: 30 },
  { init: 'JT', excel: 80, ia: 40, tools: 65 },
  { init: 'SV', excel: 20, ia: 5,  tools: 15 },
  { init: 'DP', excel: 60, ia: 30, tools: 45 },
]
function Visual1() {
  return (
    <VisualCard title="Diagnóstico del equipo" subtitle="Nivel por herramienta · 6 personas evaluadas">
      <style>{`
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        @keyframes barGrow { from { width:0 } to { width:var(--w) } }
      `}</style>

      {/* Team avatar grid */}
      <div style={{ display:'flex', gap:'10px', marginBottom:'24px', flexWrap:'wrap' }}>
        {TEAM.map((p,i) => (
          <div key={p.init} style={{
            animation: `fadeSlideUp 0.3s ${i*0.07}s ease both`,
            width:'40px', height:'40px', borderRadius:'50%',
            background: p.excel > 60 ? 'rgba(11,179,164,0.2)' : 'rgba(255,255,255,0.06)',
            border: `1.5px solid ${p.excel > 60 ? '#0BB3A4' : 'rgba(255,255,255,0.12)'}`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:'Poppins,sans-serif', fontSize:'11px', fontWeight:600,
            color: p.excel > 60 ? '#0BB3A4' : 'rgba(255,255,255,0.5)',
          }}>{p.init}</div>
        ))}
      </div>

      {/* Skill bars */}
      {[
        { label:'Excel & Datos', color:'#0BB3A4', avg: Math.round(TEAM.reduce((a,p)=>a+p.excel,0)/TEAM.length) },
        { label:'IA Aplicada',   color:'#75C1E7', avg: Math.round(TEAM.reduce((a,p)=>a+p.ia,0)/TEAM.length) },
        { label:'Herramientas',  color:'#B39DDB', avg: Math.round(TEAM.reduce((a,p)=>a+p.tools,0)/TEAM.length) },
      ].map((s,i) => (
        <div key={s.label} style={{ marginBottom:'14px', animation:`fadeSlideUp 0.3s ${0.4+i*0.1}s ease both`, opacity:0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
            <span style={{ fontFamily:'Poppins,sans-serif', fontSize:'12px', fontWeight:500, color:'rgba(255,255,255,0.6)' }}>{s.label}</span>
            <span style={{ fontFamily:'Poppins,sans-serif', fontSize:'12px', fontWeight:600, color:s.color }}>{s.avg}%</span>
          </div>
          <div style={{ height:'4px', borderRadius:'9999px', background:'rgba(255,255,255,0.07)', overflow:'hidden' }}>
            <div style={{
              height:'100%', borderRadius:'9999px', background:s.color,
              '--w':`${s.avg}%`, animation:`barGrow 0.8s ${0.5+i*0.1}s ease both`,
            } as React.CSSProperties} />
          </div>
        </div>
      ))}

      <div style={{
        marginTop:'20px', padding:'12px 16px', borderRadius:'10px',
        background:'rgba(255,160,122,0.08)', border:'1px solid rgba(255,160,122,0.2)',
        fontFamily:'Poppins,sans-serif', fontSize:'12px', color:'#FFA07A',
        animation:'fadeSlideUp 0.3s 0.8s ease both', opacity:0,
      }}>
        ⚠ Nivel promedio del equipo: <strong>Básico — Oportunidad alta</strong>
      </div>
    </VisualCard>
  )
}

/* ─── Visual 2: Programa — roadmap de módulos ─── */
const MODULES_V2 = [
  { week:'Sem 1–2', label:'Excel Fundamental',    status:'done'    },
  { week:'Sem 3–4', label:'Excel Avanzado + BI',  status:'active'  },
  { week:'Sem 5–6', label:'IA para tu negocio',   status:'pending' },
  { week:'Sem 7–8', label:'Automatización real',  status:'pending' },
]
function Visual2() {
  return (
    <VisualCard title="Tu programa personalizado" subtitle="Ruta de 8 semanas — adaptada a tu equipo">
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateX(-12px) } to { opacity:1; transform:translateX(0) } }`}</style>
      <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
        {MODULES_V2.map((m,i) => (
          <div key={m.label} style={{
            display:'flex', alignItems:'center', gap:'14px',
            padding:'12px 16px', borderRadius:'12px',
            background: m.status==='done'   ? 'rgba(11,179,164,0.08)' :
                        m.status==='active' ? 'rgba(117,193,231,0.08)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${m.status==='done' ? 'rgba(11,179,164,0.25)' : m.status==='active' ? 'rgba(117,193,231,0.2)' : 'rgba(255,255,255,0.07)'}`,
            animation:`slideIn 0.3s ${i*0.1}s ease both`, opacity:0,
          }}>
            <div style={{
              width:'28px', height:'28px', borderRadius:'50%', flexShrink:0,
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px',
              background: m.status==='done' ? '#0BB3A4' : m.status==='active' ? 'rgba(117,193,231,0.2)' : 'rgba(255,255,255,0.05)',
            }}>
              {m.status==='done' ? '✓' : m.status==='active' ? '●' : '○'}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'Poppins,sans-serif', fontSize:'13px', fontWeight:500,
                color: m.status==='done' ? '#0BB3A4' : m.status==='active' ? '#75C1E7' : 'rgba(255,255,255,0.35)' }}>
                {m.label}
              </div>
              <div style={{ fontFamily:'Poppins,sans-serif', fontSize:'10px',
                color:'rgba(255,255,255,0.3)', marginTop:'2px' }}>{m.week}</div>
            </div>
            {m.status==='active' && (
              <span style={{ fontFamily:'Poppins,sans-serif', fontSize:'10px', fontWeight:500,
                color:'#75C1E7', padding:'3px 8px', borderRadius:'9999px',
                background:'rgba(117,193,231,0.12)', border:'1px solid rgba(117,193,231,0.2)' }}>
                En curso
              </span>
            )}
          </div>
        ))}
      </div>
    </VisualCard>
  )
}

/* ─── Visual 3: Capacitación — sesión en vivo ─── */
const TASKS = [
  { label:'Tabla dinámica básica',  done:true  },
  { label:'Filtros avanzados',      done:true  },
  { label:'VLOOKUP aplicado',       done:false },
  { label:'Gráfico de tendencias',  done:false },
]
function Visual3() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setPct(72), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <VisualCard title="Sesión en vivo" subtitle="Excel Avanzado — Módulo 3 de 6">
      <style>{`@keyframes checkIn { from { opacity:0; transform:scale(0.7) } to { opacity:1; transform:scale(1) } }`}</style>

      {/* Progress */}
      <div style={{ marginBottom:'24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
          <span style={{ fontFamily:'Poppins,sans-serif', fontSize:'12px', color:'rgba(255,255,255,0.5)' }}>Progreso del módulo</span>
          <span style={{ fontFamily:'Poppins,sans-serif', fontSize:'12px', fontWeight:600, color:'#0BB3A4' }}>{pct}%</span>
        </div>
        <div style={{ height:'6px', borderRadius:'9999px', background:'rgba(255,255,255,0.07)', overflow:'hidden' }}>
          <div style={{
            height:'100%', borderRadius:'9999px',
            background:'linear-gradient(90deg, #0BB3A4, #75C1E7)',
            width:`${pct}%`, transition:'width 1s ease',
            boxShadow:'0 0 10px rgba(11,179,164,0.5)',
          }} />
        </div>
      </div>

      {/* Ejercicios */}
      <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'11px', fontWeight:500,
        letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)',
        marginBottom:'12px' }}>Ejercicios de hoy</p>

      <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
        {TASKS.map((t,i) => (
          <div key={t.label} style={{
            display:'flex', alignItems:'center', gap:'12px',
            padding:'10px 14px', borderRadius:'10px',
            background: t.done ? 'rgba(11,179,164,0.06)' : 'rgba(255,255,255,0.03)',
            border:`1px solid ${t.done ? 'rgba(11,179,164,0.2)' : 'rgba(255,255,255,0.07)'}`,
          }}>
            <div style={{
              width:'18px', height:'18px', borderRadius:'5px', flexShrink:0,
              background: t.done ? '#0BB3A4' : 'transparent',
              border: `1.5px solid ${t.done ? '#0BB3A4' : 'rgba(255,255,255,0.15)'}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'10px', color:'#000050',
              animation: t.done ? `checkIn 0.3s ${0.4+i*0.12}s ease both` : 'none',
              opacity: t.done ? undefined : 1,
            }}>
              {t.done ? '✓' : ''}
            </div>
            <span style={{ fontFamily:'Poppins,sans-serif', fontSize:'12px', fontWeight:500,
              color: t.done ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
              textDecoration: t.done ? 'line-through' : 'none' }}>
              {t.label}
            </span>
          </div>
        ))}
      </div>
    </VisualCard>
  )
}

/* ─── Visual 4: Resultados — métricas antes/después ─── */
const METRICS = [
  { label:'Productividad',   before:38, after:92, color:'#0BB3A4' },
  { label:'Adopción de IA',  before:12, after:74, color:'#75C1E7' },
  { label:'Errores manuales',before:80, after:18, color:'#FFA07A', reverse:true },
]
function Visual4() {
  const [animated, setAnimated] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <VisualCard title="Resultados medibles" subtitle="Impacto promedio a 60 días de implementación">
      <style>{`@keyframes countUp { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }`}</style>

      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px', marginBottom:'28px' }}>
        {[
          { val:'+3.2×', label:'Productividad', color:'#0BB3A4' },
          { val:'87%',   label:'Adopción real', color:'#75C1E7' },
          { val:'−68%',  label:'Errores',       color:'#FFA07A' },
        ].map((k,i) => (
          <div key={k.label} style={{
            textAlign:'center', padding:'14px 8px', borderRadius:'12px',
            background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)',
            animation:`countUp 0.4s ${i*0.12}s ease both`, opacity:0,
          }}>
            <div style={{ fontFamily:'Poppins,sans-serif', fontSize:'22px', fontWeight:600, color:k.color }}>{k.val}</div>
            <div style={{ fontFamily:'Poppins,sans-serif', fontSize:'10px', fontWeight:500,
              color:'rgba(255,255,255,0.35)', letterSpacing:'0.06em', textTransform:'uppercase', marginTop:'4px' }}>
              {k.label}
            </div>
          </div>
        ))}
      </div>

      {/* Before/after bars */}
      {METRICS.map((m,i) => (
        <div key={m.label} style={{ marginBottom:'14px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
            <span style={{ fontFamily:'Poppins,sans-serif', fontSize:'11px', color:'rgba(255,255,255,0.45)' }}>{m.label}</span>
            <span style={{ fontFamily:'Poppins,sans-serif', fontSize:'11px', fontWeight:600, color:m.color }}>
              {m.reverse ? `${m.before}% → ${m.after}%` : `${m.before}% → ${m.after}%`}
            </span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
            {[
              { label:'Antes', w:m.before, dim:true },
              { label:'Ahora', w:m.after,  dim:false },
            ].map(bar => (
              <div key={bar.label} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                <span style={{ fontFamily:'Poppins,sans-serif', fontSize:'9px',
                  color:'rgba(255,255,255,0.25)', width:'28px', flexShrink:0 }}>{bar.label}</span>
                <div style={{ flex:1, height:'4px', borderRadius:'9999px', background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
                  <div style={{
                    height:'100%', borderRadius:'9999px',
                    background: bar.dim ? 'rgba(255,255,255,0.15)' : m.color,
                    width: animated ? `${bar.w}%` : '0%',
                    transition:`width 0.9s ${0.3+i*0.15}s ease`,
                    boxShadow: !bar.dim ? `0 0 6px ${m.color}88` : 'none',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </VisualCard>
  )
}

/* ─── Shared card wrapper ─── */
function VisualCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{
      background:'rgba(11,179,164,0.04)',
      border:'1px solid rgba(11,179,164,0.12)',
      borderRadius:'20px', padding:'32px',
      position:'relative', overflow:'hidden',
      minHeight:'320px',
    }}>
      <div style={{
        position:'absolute', top:'-40px', left:'50%', transform:'translateX(-50%)',
        width:'180px', height:'90px',
        background:'radial-gradient(ellipse, rgba(11,179,164,0.2) 0%, transparent 70%)',
        pointerEvents:'none',
      }} />
      <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'11px', fontWeight:600,
        letterSpacing:'0.1em', textTransform:'uppercase', color:'#0BB3A4', marginBottom:'4px' }}>
        {title}
      </p>
      <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'11px', color:'rgba(255,255,255,0.3)',
        marginBottom:'22px', lineHeight:1.4 }}>
        {subtitle}
      </p>
      {children}
    </div>
  )
}

const VISUALS = [Visual1, Visual2, Visual3, Visual4]

/* ─── Main component ─── */
export default function Solution() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const leftRef     = useRef<HTMLDivElement>(null)
  const visualRef   = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  const [openIdx, setOpenIdx] = useState(0)
  const prevIdx = useRef(0)

  /* Accordion height animation */
  useEffect(() => {
    const prev = contentRefs.current[prevIdx.current]
    const next = contentRefs.current[openIdx]
    if (prev && prevIdx.current !== openIdx)
      gsap.to(prev, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
    if (next)
      gsap.fromTo(next, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' })
    prevIdx.current = openIdx
  }, [openIdx])

  /* Visual crossfade on accordion change */
  useEffect(() => {
    if (!visualRef.current) return
    gsap.fromTo(visualRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [openIdx])

  /* Entry animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 72%' } }
      )
      gsap.fromTo(leftRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 72%' } }
      )
      gsap.fromTo(visualRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: visualRef.current, start: 'top 72%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const ActiveVisual = VISUALS[openIdx]

  return (
    <section ref={sectionRef} style={{ background: '#04050F', padding: '120px 0 140px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

        {/* Centered header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '80px', opacity: 0 }}>
          <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'11px', fontWeight:500,
            letterSpacing:'0.14em', textTransform:'uppercase', color:'#0BB3A4', marginBottom:'20px' }}>
            Nuestra propuesta de valor
          </p>
          <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:600,
            fontSize:'clamp(2rem, 3.8vw, 3.2rem)', lineHeight:1.1,
            letterSpacing:'-0.02em', color:'#ffffff', marginBottom:'20px' }}>
            Capacitación que <span style={{ color:'#0BB3A4' }}>transforma</span> equipos.
          </h2>
          <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'16px', fontWeight:400,
            color:'rgba(255,255,255,0.45)', lineHeight:1.6,
            maxWidth:'500px', margin:'0 auto 36px' }}>
            No teoría genérica. Programas prácticos, a medida, con acompañamiento real de principio a fin.
          </p>
          <a href="#contacto" style={{
            display:'inline-flex', alignItems:'center', gap:'8px',
            padding:'12px 28px', borderRadius:'10px', background:'transparent',
            border:'1.5px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.8)',
            fontFamily:'Poppins,sans-serif', fontSize:'13px', fontWeight:500,
            textDecoration:'none',
            transition:'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor='#0BB3A4'; el.style.color='#0BB3A4'; el.style.background='rgba(11,179,164,0.06)' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor='rgba(255,255,255,0.2)'; el.style.color='rgba(255,255,255,0.8)'; el.style.background='transparent' }}
          >
            Agendar demo →
          </a>
        </div>

        {/* Two columns */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'start' }}>

          {/* Left: accordion */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            {ITEMS.map((item, idx) => {
              const isOpen = idx === openIdx
              return (
                <div key={idx}>
                  <div style={{ height:'1px', background:'rgba(255,255,255,0.08)' }} />
                  <button onClick={() => setOpenIdx(idx)} style={{
                    width:'100%', background:'none', border:'none', cursor:'pointer',
                    padding:'22px 0', display:'flex', alignItems:'flex-start', gap:'18px', textAlign:'left',
                  }}>
                    <span style={{ fontFamily:'Poppins,sans-serif', fontSize:'13px', fontWeight:500,
                      color:'#0BB3A4', flexShrink:0, lineHeight:1.4, paddingTop:'2px', letterSpacing:'0.02em' }}>
                      0{idx + 1}/
                    </span>
                    <span style={{ fontFamily:'Poppins,sans-serif',
                      fontSize:'clamp(1rem, 1.5vw, 1.2rem)', fontWeight:600, lineHeight:1.3,
                      color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.5)', flex:1,
                      transition:'color 0.25s ease' }}>
                      {item.title}
                    </span>
                    <span style={{ fontFamily:'monospace', fontSize:'18px',
                      color: isOpen ? '#0BB3A4' : 'rgba(255,255,255,0.3)', flexShrink:0, lineHeight:1.4,
                      transition:'color 0.25s ease' }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div ref={el => { contentRefs.current[idx] = el }}
                    style={{ height: idx === 0 ? 'auto' : 0, overflow:'hidden', opacity: idx === 0 ? 1 : 0 }}>
                    <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'14px', fontWeight:400,
                      color:'rgba(255,255,255,0.45)', lineHeight:1.75,
                      paddingLeft:'31px', paddingBottom:'22px', maxWidth:'380px' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
            <div style={{ height:'1px', background:'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Right: contextual visual */}
          <div ref={visualRef} style={{ opacity: 0 }}>
            <ActiveVisual />
          </div>

        </div>
      </div>
    </section>
  )
}
