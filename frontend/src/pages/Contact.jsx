import { useState } from 'react';
import { personal } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function InputField({ label, type = 'text', name, value, onChange, placeholder, required }) {
  return (
    <div style={{ marginBottom:'1.2rem' }}>
      <label className="form-label" htmlFor={name}>{label}{required && <span style={{ color:'var(--secondary)' }}> *</span>}</label>
      <input
        id={name} type={type} name={name} value={value}
        onChange={onChange} placeholder={placeholder} required={required}
        className="contact-input"
      />
    </div>
  );
}

export default function Contact() {
  const [form, setForm]   = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent]   = useState(false);
  const [busy, setBusy]   = useState(false);
  const [hRef, hVis]  = useScrollAnimation();
  const [fRef, fVis]  = useScrollAnimation();
  const [iRef, iVis]  = useScrollAnimation();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setBusy(true);
    // Build mailto link
    const subject = encodeURIComponent(form.subject || 'Portfolio Contact');
    const body    = encodeURIComponent(`Hi Umaa,\n\nMy name is ${form.name}.\n\n${form.message}\n\nBest,\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setTimeout(() => { setBusy(false); setSent(true); }, 800);
  };

  const INFO = [
    { icon:'📧', label:'Email',       value:personal.email,    href:`mailto:${personal.email}`, color:'purple' },
    { icon:'📱', label:'Phone',       value:personal.phone,    href:`tel:${personal.phone}`,    color:'cyan' },
    { icon:'📍', label:'Location',    value:personal.location, href:null,                       color:'emerald' },
    { icon:'🔗', label:'LinkedIn',    value:'umaa-maheshwary-sv', href:personal.linkedin,        color:'pink' },
    { icon:'🐙', label:'GitHub',      value:'Umaa-6183',        href:personal.github,            color:'amber' },
  ];

  const SOCIAL = [
    { href:personal.linkedin, label:'LinkedIn', bg:'linear-gradient(135deg,#0A66C2,#0077B5)', icon:'in' },
    { href:personal.github,   label:'GitHub',   bg:'var(--g-main)',                            icon:'gh' },
    { href:`mailto:${personal.email}`, label:'Email', bg:'var(--g-sun)',                       icon:'@' },
  ];

  return (
    <div className="page-wrapper">
      {/* Header */}
      <section style={{ background:'linear-gradient(135deg,#FFF0F6 0%,#F3F0FF 50%,#E0F9FF 100%)', padding:'4rem 0 3rem', position:'relative', overflow:'hidden' }}>
        <div className="orb orb-pk" style={{ width:360, height:360, top:'-10%', right:'5%', opacity:.22 }} />
        <div className="orb orb-c"  style={{ width:280, height:280, bottom:'-15%', left:'5%', opacity:.2 }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div ref={hRef} className={`ph-wrap fade-up${hVis ? ' vis' : ''}`}>
            <div className="ph-badge">Contact</div>
            <h1 className="ph-title">Let's <span className="g-text">Connect</span></h1>
            <p className="ph-sub">Open to AI/ML roles, research collaborations, and innovative projects. Let's build something impactful together.</p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:'3rem', alignItems:'start' }} className="contact-grid">

            {/* Left — Info */}
            <div ref={iRef} className={`fade-up${iVis ? ' vis' : ''}`}>
              <h2 style={{ font:'700 1.5rem/1.2 var(--font-d)', color:'var(--text-h)', marginBottom:'.6rem' }}>
                Get In Touch
              </h2>
              <p style={{ fontSize:'.92rem', color:'var(--text-s)', lineHeight:1.75, marginBottom:'1.8rem' }}>
                Whether you have an exciting AI project, a research collaboration idea, or a job opportunity — I'd love to hear from you. I typically respond within 24 hours.
              </p>

              {/* Info items */}
              <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
                {INFO.map((item, i) => {
                  const bgMap = { purple:'rgba(124,58,237,.1)', cyan:'rgba(6,182,212,.1)', emerald:'rgba(16,185,129,.1)', pink:'rgba(236,72,153,.1)', amber:'rgba(245,158,11,.1)' };
                  const cMap  = { purple:'var(--primary)', cyan:'var(--cyan-d)', emerald:'var(--emerald-d)', pink:'var(--secondary-d)', amber:'var(--amber-d)' };
                  const El = item.href ? 'a' : 'div';
                  return (
                    <El key={item.label} href={item.href || undefined} target={item.href && !item.href.startsWith('mailto') && !item.href.startsWith('tel') ? '_blank' : undefined}
                      rel={item.href && !item.href.startsWith('mailto') && !item.href.startsWith('tel') ? 'noopener noreferrer' : undefined}
                      className="info-item"
                      style={{ borderBottom:'1px solid rgba(124,58,237,.07)', paddingBottom:'.75rem', textDecoration:'none', transition:'var(--tr)' }}
                      onMouseEnter={e => { if (item.href) e.currentTarget.style.paddingLeft = '4px'; }}
                      onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; }}
                    >
                      <div className="info-icon-wrap" style={{ background:bgMap[item.color] }}>
                        <span style={{ fontSize:'1.1rem' }}>{item.icon}</span>
                      </div>
                      <div>
                        <div className="info-label">{item.label}</div>
                        <div className="info-value" style={{ color: cMap[item.color] }}>{item.value}</div>
                      </div>
                    </El>
                  );
                })}
              </div>

              {/* Socials */}
              <div style={{ display:'flex', gap:'.7rem', marginTop:'1.5rem' }}>
                {SOCIAL.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    style={{
                      width:46, height:46, borderRadius:'50%', background:s.bg,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'#fff', font:'700 .85rem/1 var(--font-d)',
                      boxShadow:'var(--sh-purple)', textDecoration:'none', transition:'var(--tr)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px) scale(1.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; }}
                  >{s.icon}</a>
                ))}
              </div>

              {/* Availability */}
              <div style={{
                marginTop:'2rem', padding:'1.2rem', borderRadius:'var(--r-lg)',
                background:'rgba(16,185,129,.08)', border:'1px solid rgba(16,185,129,.2)',
                display:'flex', gap:'.8rem', alignItems:'flex-start',
              }}>
                <div style={{ width:10, height:10, borderRadius:50, background:'var(--emerald)', marginTop:'.3rem', animation:'pulseRing 2s infinite', flexShrink:0 }} />
                <div>
                  <div style={{ font:'700 .9rem/1 var(--font-d)', color:'var(--emerald-d)', marginBottom:'.3rem' }}>Available for Opportunities</div>
                  <div style={{ fontSize:'.83rem', color:'var(--text-s)', lineHeight:1.6 }}>
                    Open to full-time roles in AI/ML, research positions, and exciting collaborations in computational biology and autonomous systems.
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div ref={fRef} className={`card fade-up${fVis ? ' vis' : ''}`} style={{ padding:'2.2rem', border:'1.5px solid rgba(124,58,237,.12)' }}>
              {sent ? (
                <div style={{ textAlign:'center', padding:'3rem 1rem' }}>
                  <div style={{ fontSize:'3.5rem', marginBottom:'1rem' }}>🎉</div>
                  <h3 style={{ font:'700 1.4rem/1.2 var(--font-d)', color:'var(--text-h)', marginBottom:'.7rem' }}>Message Sent!</h3>
                  <p style={{ fontSize:'.92rem', color:'var(--text-s)', lineHeight:1.7, marginBottom:'1.5rem' }}>
                    Your email client should have opened. If not, email directly at <a href={`mailto:${personal.email}`} style={{ color:'var(--primary)', fontWeight:600 }}>{personal.email}</a>
                  </p>
                  <button className="btn btn-outline" onClick={() => { setSent(false); setForm({ name:'', email:'', subject:'', message:'' }); }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ font:'700 1.2rem/1 var(--font-d)', color:'var(--text-h)', marginBottom:'1.5rem' }}>
                    Send a Message ✉️
                  </h3>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 1rem' }}>
                    <div>
                      <InputField label="Your Name" name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" required />
                    </div>
                    <div>
                      <InputField label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" required />
                    </div>
                  </div>
                  <InputField label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="AI Research Collaboration" required />
                  <div style={{ marginBottom:'1.5rem' }}>
                    <label className="form-label" htmlFor="message">
                      Message <span style={{ color:'var(--secondary)' }}>*</span>
                    </label>
                    <textarea
                      id="message" name="message" value={form.message}
                      onChange={handleChange} required
                      placeholder="Tell me about your project, opportunity, or research idea..."
                      className="contact-input contact-textarea"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }}
                    disabled={busy}>
                    {busy ? '⏳ Sending…' : '🚀 Send Message'}
                  </button>
                  <p style={{ fontSize:'.78rem', color:'var(--text-s)', textAlign:'center', marginTop:'.8rem' }}>
                    Your message will open in your email client. I respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-lav">
        <div className="container">
          <div className="ph-wrap">
            <div className="ph-badge">FAQ</div>
            <h2 className="ph-title">Common <span className="g-text">Questions</span></h2>
          </div>
          <div className="g2">
            {[
              { q:'What roles are you looking for?', a:"Full-time AI/ML engineering positions, research scientist roles, and computational biology R&D positions — especially where AI meets healthcare or biology.", icon:'💼' },
              { q:'Are you open to remote work?', a:"Yes! I'm open to remote, hybrid, and on-site opportunities, particularly in India (Bangalore) and globally for remote roles.", icon:'🌍' },
              { q:"What's your research focus?", a:"Multi-modal AI, computational biology (GNNs for gene networks), autonomous AIOps systems, and cross-cultural AI fairness.", icon:'🔬' },
              { q:'Do you take freelance projects?', a:"Selectively, yes — particularly AI/ML consulting, bioinformatics pipeline development, or research advisory roles.", icon:'🤝' },
            ].map((item, i) => {
              const [ref, vis] = useScrollAnimation();
              return (
                <div key={item.q} ref={ref} className={`card fade-up${vis ? ' vis' : ''}`}
                  style={{ transition:`opacity .5s ${i * 100}ms ease, transform .5s ${i * 100}ms ease` }}>
                  <div style={{ display:'flex', gap:'.8rem', alignItems:'flex-start' }}>
                    <span style={{ fontSize:'1.5rem', flexShrink:0 }}>{item.icon}</span>
                    <div>
                      <h4 style={{ font:'700 .97rem/1.3 var(--font-d)', color:'var(--text-h)', marginBottom:'.5rem' }}>{item.q}</h4>
                      <p style={{ fontSize:'.88rem', color:'var(--text-s)', lineHeight:1.7 }}>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) { .contact-grid form > div { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
