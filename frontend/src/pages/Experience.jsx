import { Link } from 'react-router-dom';
import { experience, skills } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Experience() {
  const [hRef, hVis] = useScrollAnimation();
  const [expRef, expVis] = useScrollAnimation();
  const [skillRef, skillVis] = useScrollAnimation();

  const allTechSkills = skills.flatMap(s => s.items.map(i => i.name));

  return (
    <div className="page-wrapper">
      {/* Header */}
      <section style={{ background:'var(--g-hero)', padding:'4rem 0 3rem', position:'relative', overflow:'hidden' }}>
        <div className="orb orb-c" style={{ width:380, height:380, top:'-15%', right:'5%', opacity:.25 }} />
        <div className="orb orb-e" style={{ width:280, height:280, bottom:'-15%', left:'8%', opacity:.2 }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div ref={hRef} className={`ph-wrap fade-up${hVis ? ' vis' : ''}`}>
            <div className="ph-badge">Career</div>
            <h1 className="ph-title">Professional <span className="g-text-c">Experience</span></h1>
            <p className="ph-sub">Hands-on R&D experience building multi-agent AI systems and deploying ML pipelines on cloud infrastructure.</p>
          </div>
        </div>
      </section>

      {/* Experience Cards */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth:860, margin:'0 auto' }}>
            {experience.map((exp, i) => {
              const [ref, vis] = useScrollAnimation();
              return (
                <div key={exp.title} ref={ref} className={`fade-up${vis ? ' vis' : ''}`}
                  style={{ transition:`opacity .6s ${i * 150}ms ease, transform .6s ${i * 150}ms ease`, marginBottom:'2rem' }}>
                  <div className="card" style={{ padding:'2rem', border:'1.5px solid rgba(124,58,237,.15)' }}>
                    {/* Header row */}
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem', marginBottom:'1.4rem' }}>
                      <div>
                        <div style={{ display:'flex', alignItems:'center', gap:'.7rem', marginBottom:'.5rem' }}>
                          <div style={{
                            width:46, height:46, borderRadius:12,
                            background:'var(--g-main)', display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:'1.4rem', boxShadow:'var(--sh-purple)',
                          }}>{exp.icon}</div>
                          <div>
                            <h2 style={{ font:'700 1.2rem/1 var(--font-d)', color:'var(--text-h)' }}>{exp.title}</h2>
                            <p style={{ font:'600 .95rem/1 var(--font-b)', color:'var(--primary)', marginTop:'.25rem' }}>{exp.company}</p>
                          </div>
                        </div>
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'.4rem' }}>
                        <span className="tag t-purple">{exp.period}</span>
                        <span className="tag t-cyan">{exp.type}</span>
                      </div>
                    </div>

                    <div className="divider" />

                    {/* Key Responsibilities */}
                    <h3 style={{ font:'600 .95rem/1 var(--font-d)', color:'var(--text-h)', margin:'1.2rem 0 1rem' }}>Key Responsibilities & Achievements</h3>
                    <div style={{ display:'flex', flexDirection:'column', gap:'.85rem' }}>
                      {exp.points.map((pt, pi) => (
                        <div key={pi} style={{ display:'flex', gap:'1rem', alignItems:'flex-start' }}>
                          <div style={{
                            width:28, height:28, borderRadius:50, flexShrink:0,
                            background: pi % 4 === 0 ? 'var(--g-main)' : pi % 4 === 1 ? 'var(--g-cyan)' : pi % 4 === 2 ? 'var(--g-forest)' : 'var(--g-sun)',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            color:'#fff', font:'700 .75rem/1 var(--font-d)',
                          }}>{pi + 1}</div>
                          <p style={{ fontSize:'.93rem', color:'var(--text-s)', lineHeight:1.7, paddingTop:'.2rem' }}>{pt}</p>
                        </div>
                      ))}
                    </div>

                    {/* Skills used */}
                    <h3 style={{ font:'600 .95rem/1 var(--font-d)', color:'var(--text-h)', margin:'1.4rem 0 .8rem' }}>Technologies Used</h3>
                    <div style={{ display:'flex', flexWrap:'wrap' }}>
                      {exp.skills.map(s => <span key={s} className="tech-pill">{s}</span>)}
                    </div>

                    {/* Impact metrics */}
                    {exp.metrics && exp.metrics.length > 0 && (
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:'1rem', marginTop:'1.5rem' }}>
                      {exp.metrics.map(m => (
                        <div key={m.val} style={{
                          padding:'.9rem', borderRadius:'var(--r-md)', textAlign:'center',
                          background:`rgba(${m.color === 'purple' ? '124,58,237' : m.color === 'orange' ? '249,115,22' : m.color === 'cyan' ? '6,182,212' : '16,185,129'},.08)`,
                          border:`1px solid rgba(${m.color === 'purple' ? '124,58,237' : m.color === 'orange' ? '249,115,22' : m.color === 'cyan' ? '6,182,212' : '16,185,129'},.15)`,
                        }}>
                          <div style={{ font:`700 .95rem/1 var(--font-d)`, color:`var(--${m.color === 'purple' ? 'primary' : m.color})`, marginBottom:'.3rem' }}>{m.val}</div>
                          <div style={{ fontSize:'.75rem', color:'var(--text-s)' }}>{m.sub}</div>
                        </div>
                      ))}
                    </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Looking for Opportunities */}
            <div className="card card-cyan" style={{ padding:'2rem', marginTop:'2rem', background:'var(--bg-sky)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
                <span style={{ fontSize:'2rem' }}>🚀</span>
                <h3 style={{ font:'700 1.1rem/1 var(--font-d)', color:'var(--text-h)' }}>Open to New Opportunities</h3>
              </div>
              <p style={{ fontSize:'.93rem', color:'var(--text-s)', lineHeight:1.75, marginBottom:'1.2rem' }}>
                I'm actively looking for full-time roles in AI/ML engineering, computational biology, and AI research. My background spans deep learning, GNNs, bioinformatics, and autonomous systems — I thrive at the intersection of research and real-world deployment.
              </p>
              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                <Link to="/contact" className="btn btn-cyan">Contact Me</Link>
                <a href={`mailto:${experience[0]?.company}`} className="btn btn-outline">Download CV</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Skills */}
      <section ref={skillRef} className={`section bg-lav fade-up${skillVis ? ' vis' : ''}`}>
        <div className="container">
          <div className="ph-wrap">
            <div className="ph-badge">Technical Proficiency</div>
            <h2 className="ph-title">Full <span className="g-text">Tech Stack</span></h2>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem', justifyContent:'center' }}>
            {allTechSkills.map((s, i) => {
              const colors = ['t-purple','t-cyan','t-emerald','t-amber','t-pink','t-orange','t-rose'];
              return (
                <span key={s} className={`tag ${colors[i % colors.length]}`}
                  style={{ padding:'.4rem 1rem', fontSize:'.83rem', fontFamily:'var(--font-c)' }}>
                  {s}
                </span>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
