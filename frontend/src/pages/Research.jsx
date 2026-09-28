import { research } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function MetricBox({ m }) {
  const colorVars = { purple:'124,58,237', cyan:'6,182,212', emerald:'16,185,129', amber:'245,158,11' };
  const rgb = colorVars[m.color] || colorVars.purple;
  return (
    <div style={{
      padding:'1rem', borderRadius:'var(--r-md)', textAlign:'center',
      background:`rgba(${rgb},.09)`,
      border:`1px solid rgba(${rgb},.2)`,
    }}>
      <div style={{ font:`700 1.5rem/1 var(--font-d)`, color:`rgba(${rgb},1)`, marginBottom:'.3rem' }}>{m.value}</div>
      <div style={{ fontSize:'.75rem', color:'var(--text-s)', lineHeight:1.4 }}>{m.label}</div>
    </div>
  );
}

function PaperCard({ r, idx }) {
  const [ref, vis] = useScrollAnimation();
  const accentMap = {
    purple: { grad:'var(--g-main)', bg:'var(--bg-lav)', orb:'orb-p' },
    cyan:   { grad:'var(--g-cyan)', bg:'var(--bg-sky)', orb:'orb-c' },
  };
  const ac = accentMap[r.color] || accentMap.purple;

  return (
    <div ref={ref} className={`fade-up${vis ? ' vis' : ''}`}
      style={{ marginBottom:'3rem', transition:`opacity .7s ${idx * 150}ms ease, transform .7s ${idx * 150}ms ease` }}>
      <div className={`card ${r.cardCls}`} style={{ padding:'2.2rem', position:'relative', overflow:'hidden' }}>
        <div className={`orb ${ac.orb}`} style={{ width:280, height:280, top:'-30%', right:'-8%', opacity:.2, zIndex:0 }} />
        <div style={{ position:'relative', zIndex:1 }}>

          {/* Paper header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem', marginBottom:'1.4rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
              <div style={{ fontSize:'2.8rem' }}>{r.icon}</div>
              <div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem', marginBottom:'.5rem' }}>
                  <span className="paper-badge pb-published">{r.status}</span>
                  <span className="paper-badge pb-journal">{r.type}</span>
                  {r.impact !== 'Peer-Reviewed' && (
                    <span className="paper-badge pb-impact">IF {r.impact}</span>
                  )}
                </div>
                <span className="tag t-violet" style={{ fontSize:'.75rem' }}>{r.date}</span>
              </div>
            </div>
            {r.doi && r.doi.startsWith('http') && (
              <a href={r.doi} target="_blank" rel="noopener noreferrer"
                className="btn btn-outline btn-sm" style={{ whiteSpace:'nowrap' }}>
                🔗 View DOI
              </a>
            )}
          </div>

          {/* Title */}
          <h2 style={{ font:'700 1.25rem/1.4 var(--font-d)', color:'var(--text-h)', marginBottom:'.6rem' }}>{r.title}</h2>

          {/* Authors */}
          <p style={{ fontSize:'.88rem', color:'var(--primary)', fontWeight:600, marginBottom:'.3rem' }}>
            {r.authors.join(', ')}
          </p>

          {/* Journal */}
          <p style={{ fontSize:'.85rem', color:'var(--text-s)', fontStyle:'italic', marginBottom:'.3rem' }}>
            {r.journal}
          </p>
          <p style={{ fontSize:'.82rem', color:'var(--text-s)', marginBottom:'1.4rem' }}>
            {r.volume} · DOI: <code style={{ fontFamily:'var(--font-c)', color:'var(--primary)' }}>{r.doiText}</code>
          </p>

          <div className="divider" />

          {/* Abstract */}
          <div style={{ marginTop:'1.4rem', marginBottom:'1.4rem' }}>
            <h3 style={{ font:'600 1rem/1 var(--font-d)', color:'var(--text-h)', marginBottom:'.8rem' }}>Abstract</h3>
            <p style={{ fontSize:'.9rem', color:'var(--text-s)', lineHeight:1.8 }}>{r.abstract}</p>
          </div>

          {/* Metrics */}
          <div style={{ marginBottom:'1.4rem' }}>
            <h3 style={{ font:'600 1rem/1 var(--font-d)', color:'var(--text-h)', marginBottom:'.8rem' }}>Key Performance Metrics</h3>
            <div className="g4" style={{ gap:'.85rem' }}>
              {r.metrics.map(m => <MetricBox key={m.label} m={m} />)}
            </div>
          </div>

          {/* Contributions */}
          <div style={{ marginBottom:'1.4rem' }}>
            <h3 style={{ font:'600 1rem/1 var(--font-d)', color:'var(--text-h)', marginBottom:'.8rem' }}>Key Contributions</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'.7rem' }}>
              {r.contributions.map((c, ci) => (
                <div key={ci} style={{ display:'flex', alignItems:'flex-start', gap:'.8rem' }}>
                  <div style={{
                    width:26, height:26, borderRadius:50, flexShrink:0,
                    background: ci % 4 === 0 ? 'var(--g-main)' : ci % 4 === 1 ? 'var(--g-cyan)' : ci % 4 === 2 ? 'var(--g-forest)' : 'var(--g-sun)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'#fff', font:'700 .75rem/1 var(--font-d)', marginTop:'.1rem',
                  }}>{ci + 1}</div>
                  <p style={{ fontSize:'.9rem', color:'var(--text-s)', lineHeight:1.7 }}>{c}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <h3 style={{ font:'600 1rem/1 var(--font-d)', color:'var(--text-h)', marginBottom:'.7rem' }}>Technologies & Methods</h3>
            <div style={{ display:'flex', flexWrap:'wrap' }}>
              {r.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Research() {
  const [hRef, hVis] = useScrollAnimation();
  const [ctaRef, ctaVis] = useScrollAnimation();

  return (
    <div className="page-wrapper">
      {/* Header */}
      <section style={{ background:'linear-gradient(135deg,#F3F0FF 0%,#E0F9FF 50%,#ECFDF5 100%)', padding:'4rem 0 3rem', position:'relative', overflow:'hidden' }}>
        <div className="orb orb-p"  style={{ width:360, height:360, top:'-10%', right:'5%', opacity:.25 }} />
        <div className="orb orb-e"  style={{ width:280, height:280, bottom:'-15%', left:'8%', opacity:.2 }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div ref={hRef} className={`ph-wrap fade-up${hVis ? ' vis' : ''}`}>
            <div className="ph-badge">Research</div>
            <h1 className="ph-title">Published <span className="g-text">Research</span></h1>
            <p className="ph-sub">Peer-reviewed publications in multi-modal AI, computational emotion recognition, and autonomous cloud intelligence.</p>
            <div style={{ display:'flex', justifyContent:'center', gap:'1.5rem', flexWrap:'wrap', marginTop:'1.5rem' }}>
              {[
                { label:'Publications', val:'2', color:'purple' },
                { label:'Impact Factor', val:'8.187', color:'amber' },
                { label:'Journals',     val:'2',   color:'cyan' },
                { label:'Co-Authors',   val:'2',   color:'emerald' },
              ].map(s => (
                <div key={s.label} style={{
                  padding:'.7rem 1.3rem', borderRadius:'var(--r-md)',
                  background:'rgba(255,255,255,.75)', backdropFilter:'blur(8px)',
                  boxShadow:'var(--sh-card)', textAlign:'center',
                }}>
                  <div style={{ font:`700 1.4rem/1 var(--font-d)`, color:`var(--${s.color === 'purple' ? 'primary' : s.color})` }}>{s.val}</div>
                  <div style={{ fontSize:'.78rem', color:'var(--text-s)', marginTop:'.2rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Papers */}
      <section className="section">
        <div className="container" style={{ maxWidth:900, margin:'0 auto' }}>
          {research.map((r, i) => <PaperCard key={r.id} r={r} idx={i} />)}
        </div>
      </section>

      {/* Research Areas */}
      <section className="section bg-lav">
        <div className="container">
          <div className="ph-wrap">
            <div className="ph-badge">Research Interests</div>
            <h2 className="ph-title">Areas of <span className="g-text">Focus</span></h2>
          </div>
          <div className="g3">
            {[
              { icon:'😊', title:'Affective Computing',    desc:'Multi-modal emotion recognition combining facial, audio, and text streams with cross-cultural adaptation.', color:'purple' },
              { icon:'🧬', title:'Computational Biology',  desc:'Graph neural networks for gene regulatory networks, scRNA-seq clustering, and omics data analysis.', color:'emerald' },
              { icon:'🤖', title:'Autonomous AIOps',       desc:'Self-healing cloud infrastructure using Causal GNNs, RL agents, and LLM explainability for zero-downtime operations.', color:'cyan' },
              { icon:'🔍', title:'Explainable AI',         desc:'Interpretable models for high-stakes applications in healthcare, biology, and cloud security.', color:'amber' },
              { icon:'🌍', title:'Culturally-Aware AI',    desc:'Building AI systems that are equitable and accurate across diverse cultural and demographic groups.', color:'pink' },
              { icon:'☁️', title:'Cloud Intelligence',     desc:'Combining RL, GNNs, and LLMs for fully autonomous cloud operations and security management.', color:'orange' },
            ].map((area, i) => {
              const [ref, vis] = useScrollAnimation();
              const bgMap = { purple:'rgba(124,58,237,.07)', emerald:'rgba(16,185,129,.07)', cyan:'rgba(6,182,212,.07)', amber:'rgba(245,158,11,.07)', pink:'rgba(236,72,153,.07)', orange:'rgba(249,115,22,.07)' };
              const cMap  = { purple:'var(--primary)', emerald:'var(--emerald-d)', cyan:'var(--cyan-d)', amber:'var(--amber-d)', pink:'var(--secondary-d)', orange:'var(--orange-d)' };
              return (
                <div key={area.title} ref={ref} className={`card scale-in${vis ? ' vis' : ''}`}
                  style={{ textAlign:'center', background:bgMap[area.color], transition:`opacity .5s ${i * 90}ms ease, transform .5s ${i * 90}ms ease` }}>
                  <div style={{ fontSize:'2rem', marginBottom:'.7rem' }}>{area.icon}</div>
                  <h3 style={{ font:'700 1rem/1 var(--font-d)', color:cMap[area.color], marginBottom:'.5rem' }}>{area.title}</h3>
                  <p style={{ fontSize:'.86rem', color:'var(--text-s)', lineHeight:1.65 }}>{area.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="section-sm">
        <div ref={ctaRef} className="container" style={{ textAlign:'center' }}>
          <div className={`fade-up${ctaVis ? ' vis' : ''}`} style={{
            padding:'2.5rem', borderRadius:'var(--r-xl)',
            background:'var(--g-main)', boxShadow:'var(--sh-purple)',
            maxWidth:680, margin:'0 auto',
          }}>
            <h2 style={{ font:'700 1.6rem/1.2 var(--font-d)', color:'#fff', marginBottom:'.8rem' }}>Interested in Collaboration?</h2>
            <p style={{ color:'rgba(255,255,255,.88)', fontSize:'.95rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              I'm open to research collaborations, co-authorship, and joint projects in AI, computational biology, and autonomous systems.
            </p>
            <a href="mailto:umaamaheshwarysv@gmail.com" className="btn"
              style={{ background:'#fff', color:'var(--primary)', fontWeight:700 }}>
              📬 Reach Out for Research
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
