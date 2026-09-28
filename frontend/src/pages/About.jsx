import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { personal, education, skills } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function SkillBar({ name, level, color, delay }) {
  const [ref, vis] = useScrollAnimation();
  const colorMap = {
    purple:'var(--g-main)', emerald:'var(--g-forest)',
    cyan:'var(--g-cyan)', amber:'linear-gradient(135deg,#F59E0B,#F97316)',
  };
  return (
    <div ref={ref} style={{ marginBottom:'1rem', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-20px)', transition:`opacity .5s ${delay}ms ease, transform .5s ${delay}ms ease` }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'.35rem' }}>
        <span style={{ font:'500 .88rem/1 var(--font-b)', color:'var(--text-h)' }}>{name}</span>
        <span style={{ font:'600 .82rem/1 var(--font-c)', color:'var(--primary)' }}>{level}%</span>
      </div>
      <div className="prog-track">
        <div className="prog-fill" style={{
          width: vis ? `${level}%` : '0%',
          background: colorMap[color] || colorMap.purple,
          transition: vis ? `width 1.4s ${delay + 100}ms cubic-bezier(.4,0,.2,1)` : 'none',
        }} />
      </div>
    </div>
  );
}

function EduCard({ item, delay }) {
  const [ref, vis] = useScrollAnimation();
  return (
    <div ref={ref} className={`tl-item fade-up${vis ? ' vis' : ''}`}
      style={{ transition:`opacity .6s ${delay}ms ease, transform .6s ${delay}ms ease` }}>
      <div className="tl-dot" />
      <div className="card" style={{ border: item.highlight ? '1.5px solid rgba(124,58,237,.25)' : '1px solid rgba(124,58,237,.08)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'.5rem', marginBottom:'.6rem' }}>
          <span className={item.highlight ? 'tag t-purple' : 'tag t-cyan'} style={{ fontSize:'.75rem' }}>{item.period}</span>
          <span style={{
            padding:'.25rem .7rem', borderRadius:'var(--r-pill)',
            background: item.highlight ? 'var(--g-main)' : 'var(--g-cyan)',
            color:'#fff', font:'700 .78rem/1 var(--font-d)',
          }}>CGPA {item.cgpa}</span>
        </div>
        <h3 style={{ font:'700 1.05rem/1.3 var(--font-d)', color:'var(--text-h)', marginBottom:'.3rem' }}>{item.degree}</h3>
        <p style={{ font:'500 .92rem/1 var(--font-b)', color:'var(--primary)', marginBottom:'.3rem' }}>{item.institution}</p>
        <p style={{ fontSize:'.83rem', color:'var(--text-s)', marginBottom:'.4rem' }}>📍 {item.location}</p>
        <p style={{ fontSize:'.85rem', color:'var(--text-s)', lineHeight:1.6 }}>{item.desc}</p>
      </div>
    </div>
  );
}

export default function About() {
  const [heroRef, heroVis] = useScrollAnimation();
  const [bioRef, bioVis] = useScrollAnimation();
  const [eduRef, eduVis] = useScrollAnimation();
  const [valRef, valVis] = useScrollAnimation();

  return (
    <div className="page-wrapper">
      {/* ── HEADER ── */}
      <section style={{ background:'var(--g-hero)', padding:'4rem 0 3rem', position:'relative', overflow:'hidden' }}>
        <div className="orb orb-p" style={{ width:400, height:400, top:'-20%', right:'5%', opacity:.25 }} />
        <div className="orb orb-c" style={{ width:300, height:300, bottom:'-20%', left:'10%', opacity:.2 }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div ref={heroRef} className={`ph-wrap fade-up${heroVis ? ' vis' : ''}`}>
            <div className="ph-badge">About Me</div>
            <h1 className="ph-title">Passionate About <span className="g-text">AI & Biology</span></h1>
            <p className="ph-sub">{personal.summary.slice(0, 180)}…</p>
          </div>
        </div>
      </section>

      {/* ── BIO + QUICK FACTS ── */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'start' }} className="about-grid">
            <div ref={bioRef} className={`fade-up${bioVis ? ' vis' : ''}`}>
              <span className="ph-badge" style={{ marginBottom:'1rem' }}>My Story</span>
              <h2 style={{ font:'700 1.8rem/1.2 var(--font-d)', color:'var(--text-h)', marginBottom:'1.2rem' }}>
                Where <span className="g-text">AI Meets Biology</span>
              </h2>
              <p style={{ fontSize:'.95rem', color:'var(--text-s)', lineHeight:1.8, marginBottom:'1.2rem' }}>
                {personal.summary}
              </p>
              <p style={{ fontSize:'.95rem', color:'var(--text-s)', lineHeight:1.8, marginBottom:'1.8rem' }}>
                My work spans from building Graph Neural Networks to model gene regulatory interactions, to developing autonomous cloud AIOps platforms with Causal GNNs and Reinforcement Learning. I believe AI's greatest potential lies in its ability to unlock biological insights and automate complex operational tasks.
              </p>
              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                <Link to="/projects" className="btn btn-primary">View My Work</Link>
                <a href={`mailto:${personal.email}`} className="btn btn-outline">Get In Touch</a>
              </div>
            </div>

            {/* Quick facts */}
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {[
                { icon:'📍', label:'Location', value:personal.location, color:'purple' },
                { icon:'🎓', label:'Education', value:'M.Tech CSE · CGPA 9.25/10', color:'cyan' },
                { icon:'💼', label:'Experience', value:'R&D Analyst Intern · JM Analytics', color:'emerald' },
                { icon:'📄', label:'Publications', value:'2 Peer-Reviewed Journal Articles', color:'amber' },
                { icon:'📧', label:'Email', value:personal.email, color:'pink' },
                { icon:'🔗', label:'LinkedIn', value:'umaa-maheshwary-sv', color:'purple' },
              ].map((item, i) => {
                const [ref, vis] = useScrollAnimation();
                const bgMap = { purple:'rgba(124,58,237,.1)', cyan:'rgba(6,182,212,.1)', emerald:'rgba(16,185,129,.1)', amber:'rgba(245,158,11,.1)', pink:'rgba(236,72,153,.1)' };
                const cMap = { purple:'var(--primary)', cyan:'var(--cyan-d)', emerald:'var(--emerald-d)', amber:'var(--amber-d)', pink:'var(--secondary-d)' };
                return (
                  <div key={item.label} ref={ref}
                    className={`info-item fade-in${vis ? ' vis' : ''}`}
                    style={{ borderBottom:'1px solid rgba(124,58,237,.07)', paddingBottom:'.75rem', transition:`opacity .5s ${i * 80}ms ease` }}>
                    <div className="info-icon-wrap" style={{ background: bgMap[item.color] }}>
                      <span style={{ fontSize:'1.1rem' }}>{item.icon}</span>
                    </div>
                    <div>
                      <div className="info-label">{item.label}</div>
                      <div className="info-value" style={{ color: cMap[item.color] }}>{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="section bg-lav">
        <div className="container">
          <div className="ph-wrap">
            <div className="ph-badge">Technical Skills</div>
            <h2 className="ph-title">My <span className="g-text">Toolkit</span></h2>
            <p className="ph-sub">Deep expertise across ML, computational biology, data science, and cloud engineering.</p>
          </div>
          <div className="g2">
            {skills.map((cat, ci) => {
              const [ref, vis] = useScrollAnimation();
              const colorMap = { purple:'ic-p', emerald:'ic-e', cyan:'ic-c', amber:'ic-a' };
              return (
                <div key={cat.category} ref={ref} className={`card fade-up${vis ? ' vis' : ''}`}
                  style={{ transition:`opacity .6s ${ci * 120}ms ease, transform .6s ${ci * 120}ms ease` }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'.8rem', marginBottom:'1.4rem' }}>
                    <div className={`icon-circle ${colorMap[cat.color] || 'ic-p'}`} style={{ fontSize:'1.3rem' }}>{cat.icon}</div>
                    <h3 style={{ font:'700 1rem/1 var(--font-d)', color:'var(--text-h)' }}>{cat.category}</h3>
                  </div>
                  {cat.items.map((skill, si) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} color={cat.color} delay={ci * 80 + si * 60} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EDUCATION TIMELINE ── */}
      <section className="section">
        <div className="container">
          <div ref={eduRef} className={`ph-wrap fade-up${eduVis ? ' vis' : ''}`}>
            <div className="ph-badge">Education</div>
            <h2 className="ph-title">Academic <span className="g-text-c">Background</span></h2>
          </div>
          <div style={{ maxWidth:700, margin:'0 auto' }}>
            <div className="tl">
              {education.map((edu, i) => <EduCard key={edu.degree} item={edu} delay={i * 150} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section bg-rose">
        <div className="container">
          <div ref={valRef} className={`ph-wrap fade-up${valVis ? ' vis' : ''}`}>
            <div className="ph-badge">Core Values</div>
            <h2 className="ph-title">What Drives <span className="g-text-s">Me</span></h2>
          </div>
          <div className="g4">
            {[
              { icon:'🔬', title:'Research-First', desc:'Every solution is grounded in scientific rigour and peer-reviewed methodology.', color:'purple' },
              { icon:'🌍', title:'Real-World Impact', desc:'Building AI that solves meaningful problems in health, biology, and operations.', color:'cyan' },
              { icon:'📖', title:'Continuous Learning', desc:'Always exploring new domains — from multi-omics to autonomous cloud systems.', color:'emerald' },
              { icon:'🤝', title:'Collaboration', desc:'Great AI is built with diverse teams, diverse data, and diverse perspectives.', color:'amber' },
            ].map((v, i) => {
              const [ref, vis] = useScrollAnimation();
              return (
                <div key={v.title} ref={ref} className={`card scale-in${vis ? ' vis' : ''} text-center`}
                  style={{ textAlign:'center', transition:`opacity .5s ${i * 100}ms ease, transform .5s ${i * 100}ms ease` }}>
                  <div style={{ fontSize:'2.2rem', marginBottom:'.8rem' }}>{v.icon}</div>
                  <h3 style={{ font:'700 .98rem/1 var(--font-d)', color:'var(--text-h)', marginBottom:'.5rem' }}>{v.title}</h3>
                  <p style={{ fontSize:'.85rem', color:'var(--text-s)', lineHeight:1.65 }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }
      `}</style>
    </div>
  );
}
