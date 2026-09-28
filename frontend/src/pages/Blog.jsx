import { useState } from 'react';
import { blogPosts, trends } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CAT_COLORS = {
  'Computational Biology': 'cyan',
  'AI Research':    'purple',
  'Cloud AI':       'orange',
  'Bioinformatics': 'emerald',
  'Healthcare AI':  'pink',
  'AI Architecture':'amber',
};

function BlogCard({ post, idx }) {
  const [ref, vis] = useScrollAnimation();
  const color = CAT_COLORS[post.cat] || 'purple';
  const barMap = { cyan:'var(--g-cyan)', purple:'var(--g-main)', orange:'var(--g-hot)', emerald:'var(--g-forest)', pink:'linear-gradient(135deg,#EC4899,#A78BFA)', amber:'linear-gradient(135deg,#F59E0B,#F97316)' };
  const cMap   = { cyan:'var(--cyan-d)', purple:'var(--primary)', orange:'var(--orange-d)', emerald:'var(--emerald-d)', pink:'var(--secondary-d)', amber:'var(--amber-d)' };

  return (
    <div ref={ref} className={`card fade-up${vis ? ' vis' : ''}`}
      style={{
        display:'flex', flexDirection:'column', gap:'.9rem',
        transition:`opacity .6s ${idx * 80}ms ease, transform .6s ${idx * 80}ms ease`,
      }}>
      {/* Color bar */}
      <div style={{ height:5, borderRadius:5, background: barMap[color] || 'var(--g-main)', marginTop:'-1px' }} />

      {/* Category + read time */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ font:'600 .72rem/1 var(--font-c)', color:cMap[color], textTransform:'uppercase', letterSpacing:'1.5px' }}>
          {post.cat}
        </span>
        <span style={{ font:'400 .78rem/1 var(--font-b)', color:'var(--text-s)' }}>
          ⏱ {post.readTime}
        </span>
      </div>

      {/* Icon + Title */}
      <div style={{ display:'flex', gap:'.7rem', alignItems:'flex-start' }}>
        <span style={{ fontSize:'1.6rem', flexShrink:0 }}>{post.icon}</span>
        <h3 style={{ font:'700 1.02rem/1.4 var(--font-d)', color:'var(--text-h)' }}>{post.title}</h3>
      </div>

      {/* Excerpt */}
      <p style={{ fontSize:'.87rem', color:'var(--text-s)', lineHeight:1.7, flexGrow:1 }}>{post.excerpt}</p>

      {/* Tags */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:'.3rem' }}>
        {post.tags.map(t => {
          const cls = { cyan:'t-cyan', purple:'t-purple', orange:'t-orange', emerald:'t-emerald', pink:'t-pink', amber:'t-amber' };
          return <span key={t} className={`tag ${cls[color]}`} style={{ fontSize:'.72rem' }}>#{t}</span>;
        })}
      </div>

      {/* Footer */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid rgba(124,58,237,.07)', paddingTop:'.75rem', marginTop:'auto' }}>
        <span style={{ font:'400 .8rem/1 var(--font-b)', color:'var(--text-s)' }}>📅 {post.date}</span>
        <button style={{
          font:'600 .82rem/1 var(--font-d)', color:cMap[color],
          background:'transparent', border:'none', cursor:'pointer', padding:'.2rem',
          transition:'var(--tr)',
        }}
          onMouseEnter={e => e.currentTarget.style.letterSpacing = '0.5px'}
          onMouseLeave={e => e.currentTarget.style.letterSpacing = 'normal'}
        >Read Article →</button>
      </div>
    </div>
  );
}

function TrendCard({ t, idx }) {
  const [ref, vis] = useScrollAnimation();
  const bgMap  = { cyan:'rgba(6,182,212,.08)', purple:'rgba(124,58,237,.08)', emerald:'rgba(16,185,129,.08)', amber:'rgba(245,158,11,.08)', pink:'rgba(236,72,153,.08)', orange:'rgba(249,115,22,.08)' };
  const cMap   = { cyan:'var(--cyan-d)', purple:'var(--primary)', emerald:'var(--emerald-d)', amber:'var(--amber-d)', pink:'var(--secondary-d)', orange:'var(--orange-d)' };
  const borMap = { cyan:'rgba(6,182,212,.2)', purple:'rgba(124,58,237,.2)', emerald:'rgba(16,185,129,.2)', amber:'rgba(245,158,11,.2)', pink:'rgba(236,72,153,.2)', orange:'rgba(249,115,22,.2)' };

  return (
    <div ref={ref} className={`card scale-in${vis ? ' vis' : ''}`}
      style={{
        background:bgMap[t.color], border:`1px solid ${borMap[t.color]}`,
        transition:`opacity .5s ${idx * 80}ms ease, transform .5s ${idx * 80}ms ease`,
      }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'.7rem' }}>
        <span style={{ fontSize:'1.8rem' }}>{t.icon}</span>
        {t.hot && <span className="hot-badge">🔥 Trending</span>}
      </div>
      <h4 style={{ font:'700 .97rem/1.3 var(--font-d)', color:'var(--text-h)', marginBottom:'.5rem' }}>{t.title}</h4>
      <p style={{ fontSize:'.85rem', color:'var(--text-s)', lineHeight:1.65 }}>{t.desc}</p>
    </div>
  );
}

export default function Blog() {
  const [filter, setFilter] = useState('all');
  const [hRef, hVis] = useScrollAnimation();
  const [tRef, tVis] = useScrollAnimation();
  const [nlRef, nlVis] = useScrollAnimation();

  const cats = ['all', ...Array.from(new Set(blogPosts.map(p => p.cat)))];
  const filtered = filter === 'all' ? blogPosts : blogPosts.filter(p => p.cat === filter);

  return (
    <div className="page-wrapper">
      {/* Header */}
      <section style={{ background:'linear-gradient(135deg,#FFF0F6 0%,#F3F0FF 50%,#ECFDF5 100%)', padding:'4rem 0 3rem', position:'relative', overflow:'hidden' }}>
        <div className="orb orb-pk" style={{ width:360, height:360, top:'-10%', right:'5%', opacity:.22 }} />
        <div className="orb orb-e"  style={{ width:280, height:280, bottom:'-15%', left:'5%', opacity:.2 }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div ref={hRef} className={`ph-wrap fade-up${hVis ? ' vis' : ''}`}>
            <div className="ph-badge">Blog & Trends</div>
            <h1 className="ph-title">Insights & <span className="g-text-s">Latest Trends</span></h1>
            <p className="ph-sub">Articles on AI, computational biology, autonomous systems — and what's trending in the AI/ML world right now.</p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom:'2rem' }}>
            <h2 style={{ font:'700 1.6rem/1 var(--font-d)', color:'var(--text-h)', marginBottom:'.5rem' }}>
              ✍️ Articles & <span className="g-text">Write-Ups</span>
            </h2>
            <p style={{ fontSize:'.9rem', color:'var(--text-s)' }}>Deep dives into AI/ML topics, research insights, and technical tutorials.</p>
          </div>

          {/* Category filter */}
          <div className="filter-bar">
            {cats.map(c => (
              <button key={c} className={`filter-btn${filter === c ? ' active' : ''}`}
                onClick={() => setFilter(c)}>
                {c === 'all' ? 'All Articles' : c}
              </button>
            ))}
          </div>

          <div className="g3">
            {filtered.map((post, i) => <BlogCard key={post.id} post={post} idx={i} />)}
          </div>
        </div>
      </section>

      {/* Trending Topics */}
      <section ref={tRef} className={`section bg-lav fade-up${tVis ? ' vis' : ''}`}>
        <div className="container">
          <div style={{ marginBottom:'2rem' }}>
            <div className="ph-badge">What's Hot</div>
            <h2 style={{ font:'700 1.6rem/1 var(--font-d)', color:'var(--text-h)', marginTop:'.6rem', marginBottom:'.5rem' }}>
              🔥 Trending in <span className="g-text">AI & ML</span>
            </h2>
            <p style={{ fontSize:'.9rem', color:'var(--text-s)' }}>Key developments shaping the field right now — from protein AI to autonomous ops.</p>
          </div>
          <div className="g3">
            {trends.map((t, i) => <TrendCard key={t.title} t={t} idx={i} />)}
          </div>
        </div>
      </section>

      {/* Newsletter / Stay Updated */}
      <section ref={nlRef} className={`section-sm fade-up${nlVis ? ' vis' : ''}`}>
        <div className="container" style={{ textAlign:'center' }}>
          <div style={{
            maxWidth:580, margin:'0 auto',
            padding:'2.5rem', borderRadius:'var(--r-xl)',
            background:'var(--g-hero)', boxShadow:'var(--sh-card)',
            border:'1px solid rgba(124,58,237,.1)',
          }}>
            <div style={{ fontSize:'2.5rem', marginBottom:'.8rem' }}>💌</div>
            <h3 style={{ font:'700 1.4rem/1.2 var(--font-d)', color:'var(--text-h)', marginBottom:'.7rem' }}>
              Stay Updated on My Research
            </h3>
            <p style={{ fontSize:'.9rem', color:'var(--text-s)', lineHeight:1.7, marginBottom:'1.5rem' }}>
              Follow my work on LinkedIn and GitHub for new articles, research updates, and project announcements in AI & computational biology.
            </p>
            <div style={{ display:'flex', gap:'.8rem', justifyContent:'center', flexWrap:'wrap' }}>
              <a href="https://in.linkedin.com/in/umaa-maheshwary-sv" target="_blank" rel="noopener noreferrer"
                className="btn btn-primary">LinkedIn</a>
              <a href="https://github.com/Umaa-6183" target="_blank" rel="noopener noreferrer"
                className="btn btn-outline">GitHub</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
