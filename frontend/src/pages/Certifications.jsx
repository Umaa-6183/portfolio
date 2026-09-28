import { certifications } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function CertCard({ c, completed, idx }) {
  const [ref, vis] = useScrollAnimation();
  return (
    <div ref={ref} className={`card cert-card fade-up${vis ? ' vis' : ''}`}
      style={{
        padding:'1.8rem 1.4rem',
        transition:`opacity .5s ${idx * 80}ms ease, transform .5s ${idx * 80}ms ease`,
        border: completed ? '1.5px solid rgba(124,58,237,.15)' : '1.5px dashed rgba(124,58,237,.2)',
        background: completed ? 'var(--bg-card)' : 'rgba(243,240,255,.4)',
        position:'relative', overflow:'hidden',
      }}>
      {completed && (
        <div style={{
          position:'absolute', top:12, right:12,
          width:28, height:28, borderRadius:50, background:'var(--g-forest)',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', fontSize:'.85rem',
          boxShadow:'0 2px 8px rgba(16,185,129,.3)',
        }}>✓</div>
      )}
      {!completed && (
        <div style={{
          position:'absolute', top:12, right:12,
          padding:'.18rem .55rem', borderRadius:'var(--r-pill)',
          background:'rgba(124,58,237,.1)', color:'var(--primary)',
          font:'600 .7rem/1 var(--font-c)',
        }}>In Progress</div>
      )}

      {/* Badge */}
      <div className={`cert-badge-wrap ${c.color}`}
        style={{ animationDelay: `${idx * 0.3}s` }}>
        {c.badge}
      </div>

      <div className="cert-title">{c.title}</div>
      <div className="cert-issuer">by {c.issuer}</div>
      {c.year && <div style={{ font:'600 .78rem/1 var(--font-c)', color:'var(--emerald-d)', marginTop:'.4rem' }}>✓ Completed {c.year}</div>}
      <p style={{ fontSize:'.8rem', color:'var(--text-s)', lineHeight:1.6, marginTop:'.6rem' }}>{c.desc}</p>
    </div>
  );
}

export default function Certifications() {
  const [hRef,  hVis]  = useScrollAnimation();
  const [c1Ref, c1Vis] = useScrollAnimation();
  const [c2Ref, c2Vis] = useScrollAnimation();
  const [infoRef, infoVis] = useScrollAnimation();

  return (
    <div className="page-wrapper">
      {/* Header */}
      <section style={{ background:'linear-gradient(135deg,#FFFBEB 0%,#FFF0F6 50%,#F3F0FF 100%)', padding:'4rem 0 3rem', position:'relative', overflow:'hidden' }}>
        <div className="orb orb-a"  style={{ width:360, height:360, top:'-10%', right:'5%', opacity:.25 }} />
        <div className="orb orb-pk" style={{ width:280, height:280, bottom:'-15%', left:'8%', opacity:.2 }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div ref={hRef} className={`ph-wrap fade-up${hVis ? ' vis' : ''}`}>
            <div className="ph-badge">Credentials</div>
            <h1 className="ph-title">Certifications & <span className="g-text-s">Credentials</span></h1>
            <p className="ph-sub">Continuously upgrading skills across ML, cloud AI, bioinformatics, and deep learning through top platforms.</p>
            <div style={{ display:'flex', justifyContent:'center', gap:'1.5rem', flexWrap:'wrap', marginTop:'1.5rem' }}>
              {[
                { label:'Completed', val:'4', color:'emerald' },
                { label:'In Progress', val:'4', color:'purple' },
                { label:'Platforms', val:'6', color:'cyan' },
              ].map(s => (
                <div key={s.label} style={{
                  padding:'.7rem 1.4rem', borderRadius:'var(--r-md)',
                  background:'rgba(255,255,255,.78)', backdropFilter:'blur(8px)',
                  textAlign:'center', boxShadow:'var(--sh-card)',
                }}>
                  <div style={{ font:`700 1.5rem/1 var(--font-d)`, color:`var(--${s.color === 'purple' ? 'primary' : s.color === 'emerald' ? 'emerald' : 'cyan'})` }}>{s.val}</div>
                  <div style={{ fontSize:'.78rem', color:'var(--text-s)', marginTop:'.2rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Completed */}
      <section className="section">
        <div className="container">
          <div ref={c1Ref} className={`fade-up${c1Vis ? ' vis' : ''}`} style={{ marginBottom:'2.5rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'.5rem' }}>
              <div style={{ width:10, height:10, borderRadius:50, background:'var(--g-forest)' }} />
              <h2 style={{ font:'700 1.5rem/1 var(--font-d)', color:'var(--text-h)' }}>
                Completed <span className="g-text-f">Certifications</span>
              </h2>
              <span className="tag t-emerald">4 Earned</span>
            </div>
            <p style={{ fontSize:'.9rem', color:'var(--text-s)', paddingLeft:'1.4rem' }}>
              Validated expertise in TensorFlow, AWS ML, bioinformatics, and software engineering simulation.
            </p>
          </div>
          <div className="g4">
            {certifications.completed.map((c, i) => (
              <CertCard key={c.id} c={c} completed idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* In Progress */}
      <section className="section bg-lav">
        <div className="container">
          <div ref={c2Ref} className={`fade-up${c2Vis ? ' vis' : ''}`} style={{ marginBottom:'2.5rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'.5rem' }}>
              <div style={{ width:10, height:10, borderRadius:50, background:'var(--g-main)', animation:'pulseRing 2s infinite' }} />
              <h2 style={{ font:'700 1.5rem/1 var(--font-d)', color:'var(--text-h)' }}>
                Currently <span className="g-text">In Progress</span>
              </h2>
              <span className="tag t-purple">4 Active</span>
            </div>
            <p style={{ fontSize:'.9rem', color:'var(--text-s)', paddingLeft:'1.4rem' }}>
              Actively pursuing Microsoft Azure, Google ML Engineer, EMBL-EBI Multi-Omics, and Andrew Ng's Deep Learning Specialization.
            </p>
          </div>
          <div className="g4">
            {certifications.inProgress.map((c, i) => (
              <CertCard key={c.id} c={c} completed={false} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Certifications matter */}
      <section ref={infoRef} className={`section fade-up${infoVis ? ' vis' : ''}`}>
        <div className="container">
          <div className="ph-wrap">
            <div className="ph-badge">Philosophy</div>
            <h2 className="ph-title">Committed to <span className="g-text-c">Lifelong Learning</span></h2>
          </div>
          <div className="g3">
            {[
              { icon:'🎯', title:'Industry Validation', desc:"Certifications from Google, AWS, and Microsoft validate skills that go beyond academic knowledge — proving real-world capability.", color:'purple' },
              { icon:'🧬', title:'Interdisciplinary Growth', desc:"From EMBL-EBI's Multi-Omics to Deep Learning Specialization, I bridge biology and AI to stay at the intersection of both fields.", color:'emerald' },
              { icon:'🚀', title:'Always Advancing', desc:"Each certification opens new capability domains — from production cloud AI (Azure) to next-generation ML engineering (Google).", color:'cyan' },
            ].map((item, i) => {
              const [ref, vis] = useScrollAnimation();
              const bgMap = { purple:'rgba(124,58,237,.07)', emerald:'rgba(16,185,129,.07)', cyan:'rgba(6,182,212,.07)' };
              return (
                <div key={item.title} ref={ref} className={`card scale-in${vis ? ' vis' : ''}`}
                  style={{ background:bgMap[item.color], textAlign:'center', transition:`opacity .5s ${i * 100}ms ease, transform .5s ${i * 100}ms ease` }}>
                  <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>{item.icon}</div>
                  <h3 style={{ font:'700 1rem/1 var(--font-d)', color:'var(--text-h)', marginBottom:'.6rem' }}>{item.title}</h3>
                  <p style={{ fontSize:'.88rem', color:'var(--text-s)', lineHeight:1.65 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform logos row */}
      <section className="section-sm bg-amber" style={{ background:'var(--bg-amber)' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <p style={{ font:'600 .82rem/1 var(--font-c)', color:'var(--amber-d)', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'1.5rem' }}>Certified by</p>
          <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'1.2rem', alignItems:'center' }}>
            {['Google','Amazon Web Services','Microsoft','Coursera','deeplearning.ai','Forage','EMBL-EBI'].map(p => (
              <span key={p} style={{
                padding:'.5rem 1.1rem', borderRadius:'var(--r-md)',
                background:'rgba(255,255,255,.8)', backdropFilter:'blur(4px)',
                font:'600 .85rem/1 var(--font-d)', color:'var(--text-h)',
                border:'1px solid rgba(245,158,11,.25)', boxShadow:'var(--sh-card)',
              }}>{p}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
