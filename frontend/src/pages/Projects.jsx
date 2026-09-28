import { useState } from 'react';
import { projects } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FILTERS = [
  { key:'all',           label:'All Projects' },
  { key:'bioinformatics',label:'🧬 Bioinformatics' },
  { key:'ml',            label:'🤖 AI / ML' },
  { key:'cloud',         label:'☁️ Cloud AI' },
];

const colorAccent = {
  cyan:   { text:'var(--cyan-d)',    bg:'rgba(6,182,212,.1)',   border:'rgba(6,182,212,.25)' },
  emerald:{ text:'var(--emerald-d)', bg:'rgba(16,185,129,.1)',  border:'rgba(16,185,129,.25)' },
  purple: { text:'var(--primary)',   bg:'rgba(124,58,237,.1)',  border:'rgba(124,58,237,.25)' },
  pink:   { text:'var(--secondary-d)',bg:'rgba(236,72,153,.1)',border:'rgba(236,72,153,.25)' },
  amber:  { text:'var(--amber-d)',   bg:'rgba(245,158,11,.1)',  border:'rgba(245,158,11,.25)' },
  orange: { text:'var(--orange-d)',  bg:'rgba(249,115,22,.1)',  border:'rgba(249,115,22,.25)' },
};

function ProjectCard({ p, idx }) {
  const [ref, vis] = useScrollAnimation();
  const ac = colorAccent[p.color] || colorAccent.purple;

  const tilt = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top)  / r.height - .5) * 14;
    const ry = ((e.clientX - r.left) / r.width  - .5) * -14;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
    card.style.transition = 'none';
  };
  const untilt = (e) => {
    e.currentTarget.style.transform = '';
    e.currentTarget.style.transition = 'var(--tr-s)';
  };

  return (
    <div ref={ref} className={`card ${p.cardCls} fade-up${vis ? ' vis' : ''}`}
      style={{
        display:'flex', flexDirection:'column', gap:'1rem',
        transition:`opacity .6s ${idx * 80}ms ease, transform .6s ${idx * 80}ms ease`,
        transformStyle:'preserve-3d', cursor:'default',
      }}
      onMouseMove={tilt} onMouseLeave={untilt}>

      {/* Icon + badges */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div style={{
          width:54, height:54, borderRadius:'var(--r-md)',
          background: ac.bg, border:`1.5px solid ${ac.border}`,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem',
        }}>{p.icon}</div>
        <div style={{ display:'flex', gap:'.4rem', flexWrap:'wrap', justifyContent:'flex-end' }}>
          <span className="tag" style={{ background:ac.bg, color:ac.text, fontSize:'.72rem', fontFamily:'var(--font-c)' }}>
            {p.cat === 'bioinformatics' ? '🧬 Bio' : p.cat === 'ml' ? '🤖 ML' : '☁️ Cloud'}
          </span>
          {p.published && <span className="tag t-emerald" style={{ fontSize:'.72rem' }}>Published</span>}
        </div>
      </div>

      {/* Title */}
      <h3 style={{ font:'700 1.05rem/1.35 var(--font-d)', color:'var(--text-h)' }}>{p.fullTitle}</h3>

      {/* Description */}
      <p style={{ fontSize:'.87rem', color:'var(--text-s)', lineHeight:1.7, flexGrow:1 }}>{p.desc}</p>

      {/* Highlights */}
      <div style={{ display:'flex', flexDirection:'column', gap:'.4rem' }}>
        {p.highlights.map(h => (
          <div key={h} style={{ display:'flex', alignItems:'flex-start', gap:'.5rem' }}>
            <span style={{ color:ac.text, fontWeight:700, marginTop:'.05rem' }}>✦</span>
            <span style={{ fontSize:'.82rem', color:'var(--text-s)', lineHeight:1.55 }}>{h}</span>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div style={{ display:'flex', flexWrap:'wrap', borderTop:'1px solid rgba(124,58,237,.07)', paddingTop:'.85rem' }}>
        {p.tech.map(t => (
          <span key={t} className="tech-pill" style={{ background:ac.bg, color:ac.text, borderColor:ac.border }}>{t}</span>
        ))}
      </div>

      {p.journal && (
        <div style={{ background:ac.bg, borderRadius:'var(--r-sm)', padding:'.5rem .8rem', fontSize:'.78rem', color:ac.text, fontWeight:600, fontFamily:'var(--font-c)' }}>
          📄 {p.journal}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [hRef, hVis] = useScrollAnimation();

  const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);

  return (
    <div className="page-wrapper">
      {/* Header */}
      <section style={{ background:'linear-gradient(135deg,#E0F9FF 0%,#F3F0FF 50%,#FFF0F6 100%)', padding:'4rem 0 3rem', position:'relative', overflow:'hidden' }}>
        <div className="orb orb-c" style={{ width:380, height:380, top:'-15%', right:'2%', opacity:.25 }} />
        <div className="orb orb-pk" style={{ width:300, height:300, bottom:'-15%', left:'5%', opacity:.2 }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div ref={hRef} className={`ph-wrap fade-up${hVis ? ' vis' : ''}`}>
            <div className="ph-badge">Portfolio</div>
            <h1 className="ph-title">My <span className="g-text-c">Projects</span></h1>
            <p className="ph-sub">6 projects spanning computational biology, AI/ML research, and autonomous cloud systems — each solving a real-world challenge.</p>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section">
        <div className="container">
          {/* Stats row */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem', marginBottom:'2.5rem', justifyContent:'center' }}>
            {[
              { label:'Total Projects', val:'6', color:'purple' },
              { label:'Bioinformatics', val:'3', color:'cyan' },
              { label:'AI / ML',        val:'2', color:'emerald' },
              { label:'Cloud AI',       val:'1', color:'orange' },
            ].map(s => (
              <div key={s.label} style={{
                padding:'.7rem 1.4rem', borderRadius:'var(--r-md)',
                background:'var(--bg-card)', boxShadow:'var(--sh-card)',
                display:'flex', alignItems:'center', gap:'.6rem',
                border:'1px solid rgba(124,58,237,.08)',
              }}>
                <span style={{
                  font:`700 1.3rem/1 var(--font-d)`,
                  color:`var(--${s.color === 'purple' ? 'primary' : s.color})`,
                }}>{s.val}</span>
                <span style={{ fontSize:'.82rem', color:'var(--text-s)' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Filter bar */}
          <div className="filter-bar" style={{ justifyContent:'center' }}>
            {FILTERS.map(f => (
              <button key={f.key} className={`filter-btn${filter === f.key ? ' active' : ''}`}
                onClick={() => setFilter(f.key)}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="g3">
            {filtered.map((p, i) => <ProjectCard key={p.id} p={p} idx={i} />)}
          </div>
        </div>
      </section>

      {/* GitHub CTA */}
      <section className="section-sm bg-lav">
        <div className="container" style={{ textAlign:'center' }}>
          <div style={{
            display:'inline-flex', flexDirection:'column', alignItems:'center', gap:'1rem',
            padding:'2.5rem 3rem', background:'var(--bg-card)', borderRadius:'var(--r-xl)',
            boxShadow:'var(--sh-card)', border:'1px solid rgba(124,58,237,.1)',
          }}>
            <span style={{ fontSize:'2.5rem' }}>🐙</span>
            <h3 style={{ font:'700 1.3rem/1 var(--font-d)', color:'var(--text-h)' }}>More on GitHub</h3>
            <p style={{ fontSize:'.9rem', color:'var(--text-s)', maxWidth:380 }}>
              Explore source code, notebooks, and experiments from my projects and research work.
            </p>
            <a href="https://github.com/Umaa-6183" target="_blank" rel="noopener noreferrer"
              className="btn btn-primary">
              Visit GitHub Profile
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
