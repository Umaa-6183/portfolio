import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Rocket, Award, GraduationCap, Bot, Dna,
  Microscope, Cloud, BarChart, Hospital,
  ArrowRight, Download, Mail, Github, Linkedin,
  Code2, Brain, Server, Globe, Activity, Shield, Sparkles
} from 'lucide-react';
import { personal, projects, research, skills } from '../data/portfolioData';
import { useParallax, use3DTilt, useScrollReveal } from '../hooks/useParallax';

// Icon mapping for dynamic rendering
const iconMap = {
  FileText, Rocket, Award, GraduationCap, Bot, Dna,
  Microscope, Cloud, BarChart, Hospital, Code2,
  Brain, Server, Globe, Activity, Shield
};

function useTypewriter(words) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = words[idx];
    const speed = del ? 45 : 100;
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, text.length + 1));
        if (text.length === cur.length) setTimeout(() => setDel(true), 1800);
      } else {
        setText(cur.slice(0, text.length - 1));
        if (text.length === 0) { setDel(false); setIdx(i => (i + 1) % words.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, idx, words]);

  return text;
}

// 3D Stat Card with Parallax
function StatCard({ value, label, icon, color, delay = 0, index }) {
  const Icon = iconMap[icon];
  const tiltRef = use3DTilt(10);

  const colorMap = {
    purple: 'var(--primary)',
    cyan: 'var(--accent)',
    amber: 'var(--warning)',
    emerald: 'var(--success)'
  };

  return (
    <div
      ref={tiltRef}
      className={`card card-3d scroll-reveal stagger-${index + 1}`}
      style={{
        textAlign: 'center',
        cursor: 'pointer',
        willChange: 'transform'
      }}
    >
      <div className="icon-3d float-animation" style={{ margin: '0 auto var(--space-4)' }}>
        {Icon && <Icon size={32} style={{ color: colorMap[color] }} />}
      </div>
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: colorMap[color],
          marginBottom: 'var(--space-2)',
          fontFamily: 'var(--font-primary)'
        }}
      >
        {value}
      </div>
      <div style={{
        fontSize: '0.875rem',
        color: 'var(--text-tertiary)',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {label}
      </div>
    </div>
  );
}

// 3D Project Card with Tilt
function ProjectPreviewCard({ p, index }) {
  const Icon = iconMap[p.icon];
  const tiltRef = use3DTilt(12);

  return (
    <div
      ref={tiltRef}
      className={`card card-glass scroll-reveal-scale stagger-${index + 1}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
        height: '100%',
        cursor: 'pointer',
        willChange: 'transform'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="icon-3d icon-3d-sm scale-breath">
          {Icon && <Icon size={24} />}
        </div>
        {p.published && (
          <span className="tag tag-success" style={{ fontSize: '0.75rem' }}>
            Published
          </span>
        )}
      </div>

      <div style={{ flexGrow: 1 }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-3)',
          lineHeight: 1.3
        }}>
          {p.title}
        </h3>
        <p style={{
          fontSize: '0.9375rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7
        }}>
          {p.desc.slice(0, 140)}...
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {p.tech.slice(0, 3).map(t => (
          <span key={t} className="tag" style={{ fontSize: '0.75rem' }}>
            {t}
          </span>
        ))}
      </div>

      <Link
        to="/projects"
        className="btn btn-ghost btn-sm"
        style={{ alignSelf: 'flex-start' }}
      >
        View Details <ArrowRight size={16} />
      </Link>
    </div>
  );
}

// Animated Light Gradient Blob
function AnimatedBlob({ size, top, left, color, delay, animationDuration }) {
  return (
    <div
      className="float-slow"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        top,
        left,
        borderRadius: '50%',
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
        opacity: 0.4,
        pointerEvents: 'none',
        animationDelay: `${delay}s`,
        animationDuration: `${animationDuration}s`,
        willChange: 'transform',
        mixBlendMode: 'multiply'
      }}
    />
  );
}

// Mesh Gradient Background Component
function MeshGradientBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 25%, #FCE7F3 50%, #FEF3C7 75%, #DBEAFE 100%)',
        zIndex: 0
      }}
    >
      {/* Animated gradient mesh */}
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.5
        }}
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#A7F3D0', stopOpacity: 0.5 }}>
              <animate attributeName="stop-color" values="#A7F3D0; #FDE68A; #BFDBFE; #A7F3D0" dur="10s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" style={{ stopColor: '#BFDBFE', stopOpacity: 0.5 }}>
              <animate attributeName="stop-color" values="#BFDBFE; #FBCFE8; #FDE68A; #BFDBFE" dur="10s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)" />
      </svg>
    </div>
  );
}

export default function Home() {
  const role = useTypewriter(personal.roles);
  const [introVis, setIntroVis] = useState(false);

  // Parallax refs for different layers
  const heroContentRef = useParallax(0.5);
  const blob1Ref = useParallax(-0.2);
  const blob2Ref = useParallax(0.3);
  const blob3Ref = useParallax(-0.4);

  useEffect(() => {
    setTimeout(() => setIntroVis(true), 100);

    // Add scroll reveal class to elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const allSkills = skills.flatMap(s => s.items.map(i => i.name));

  const expertiseAreas = [
    {
      icon: Bot,
      title: 'Deep Learning & AI',
      desc: 'Building CNN, RNN, Transformer, and GNN architectures for complex prediction, classification, and generation tasks.',
    },
    {
      icon: Dna,
      title: 'Computational Biology',
      desc: 'Gene expression analysis, scRNA-seq, network modeling, and ML-driven insights into biological systems.',
    },
    {
      icon: Microscope,
      title: 'AI Research',
      desc: 'Published researcher working on multi-modal emotion recognition and autonomous cloud AIOps systems.',
    },
    {
      icon: Cloud,
      title: 'Cloud AI Deployment',
      desc: 'Deploying scalable ML pipelines on AWS with multi-agent systems and autonomous infrastructure management.',
    },
    {
      icon: BarChart,
      title: 'Data Science',
      desc: 'Statistical analysis, data preprocessing, hypothesis testing, and rich visualization for actionable insights.',
    },
    {
      icon: Hospital,
      title: 'Healthcare AI',
      desc: 'Building explainable, privacy-first AI systems for clinical decision support and medical data analysis.',
    },
  ];

  return (
    <div className="page-wrapper">
      {/* HERO SECTION WITH LIGHT 3D PARALLAX BACKGROUND */}
      <section
        className="parallax-section"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Animated Mesh Gradient Background */}
        <MeshGradientBackground />

        {/* Parallax Animated Blobs */}
        <div ref={blob1Ref}>
          <AnimatedBlob
            size={600}
            top="-15%"
            left="60%"
            color="rgba(167, 243, 208, 0.6)"
            delay={0}
            animationDuration={8}
          />
        </div>

        <div ref={blob2Ref}>
          <AnimatedBlob
            size={500}
            top="50%"
            left="-10%"
            color="rgba(191, 219, 254, 0.6)"
            delay={2}
            animationDuration={10}
          />
        </div>

        <div ref={blob3Ref}>
          <AnimatedBlob
            size={450}
            top="70%"
            left="70%"
            color="rgba(253, 230, 138, 0.5)"
            delay={4}
            animationDuration={12}
          />
        </div>

        <AnimatedBlob
          size={400}
          top="20%"
          left="20%"
          color="rgba(251, 207, 232, 0.5)"
          delay={1}
          animationDuration={9}
        />

        <AnimatedBlob
          size={350}
          top="40%"
          left="80%"
          color="rgba(196, 181, 253, 0.5)"
          delay={3}
          animationDuration={11}
        />

        {/* Decorative Shapes */}
        <div
          className="rotate-slow"
          style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: 200,
            height: 200,
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            background: 'linear-gradient(135deg, rgba(165, 243, 252, 0.3), rgba(186, 230, 253, 0.3))',
            filter: 'blur(40px)',
            animation: 'rotate 20s linear infinite, float 5s ease-in-out infinite',
            zIndex: 1
          }}
        />

        <div
          className="rotate-slow"
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '15%',
            width: 150,
            height: 150,
            borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
            background: 'linear-gradient(135deg, rgba(254, 202, 202, 0.3), rgba(252, 231, 243, 0.3))',
            filter: 'blur(40px)',
            animation: 'rotate 25s linear infinite reverse, floatSlow 6s ease-in-out infinite',
            animationDelay: '2s',
            zIndex: 1
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '5rem 1.5rem' }}>
          <div ref={heroContentRef} style={{ maxWidth: 900 }}>
            {/* Badge */}
            <div className="fade-in-down" style={{
              opacity: introVis ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}>
              <span
                className="section-badge"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: 'var(--primary)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 20px rgba(99, 102, 241, 0.15)'
                }}
              >
                <Sparkles size={16} /> AI/ML Engineer • Researcher • Computational Biologist
              </span>
            </div>

            {/* Name with 3D effect */}
            <h1 className="fade-in-up" style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginTop: 'var(--space-6)',
              marginBottom: 'var(--space-4)',
              color: 'var(--text-primary)',
              opacity: introVis ? 1 : 0,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 20px rgba(99, 102, 241, 0.1)'
            }}>
              Hi, I'm <span className="gradient-text" style={{
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Umaa Maheshwary SV</span>
            </h1>

            {/* Typewriter */}
            <div className="fade-in-up stagger-1" style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-6)',
              minHeight: '2.5rem',
              opacity: introVis ? 1 : 0,
            }}>
              {role}
              <span
                className="tw-cursor pulse-animation"
                style={{
                  display: 'inline-block',
                  width: 3,
                  height: '1.2em',
                  background: 'var(--primary)',
                  marginLeft: '0.15rem',
                  verticalAlign: 'middle'
                }}
              />
            </div>

            {/* Summary */}
            <p className="fade-in-up stagger-2" style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: 700,
              marginBottom: 'var(--space-10)',
              opacity: introVis ? 1 : 0,
            }}>
              Building intelligent systems at the intersection of{' '}
              <strong style={{ color: 'var(--primary)', fontWeight: 600 }}>deep learning</strong>,{' '}
              <strong style={{ color: 'var(--success)', fontWeight: 600 }}>computational biology</strong>, and{' '}
              <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>cloud AI</strong>.{' '}
              Published researcher with 2 peer-reviewed papers in AI and autonomous systems.
            </p>

            {/* CTAs with Hover 3D */}
            <div className="fade-in-up stagger-3" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-12)',
              opacity: introVis ? 1 : 0,
            }}>
              <Link to="/projects" className="btn btn-primary btn-lg">
                <Rocket size={20} /> View Projects
              </Link>
              <Link to="/research" className="btn btn-secondary btn-lg">
                <FileText size={20} /> Research Papers
              </Link>
              <a
                href={`mailto:${personal.email}`}
                className="btn btn-outline btn-lg"
              >
                <Mail size={20} /> Contact Me
              </a>
            </div>

            {/* Skill pills with stagger */}
            <div className="fade-in-up stagger-4" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-2)',
              opacity: introVis ? 1 : 0,
            }}>
              {allSkills.slice(0, 12).map((s, i) => (
                <span
                  key={s}
                  className="tag"
                  style={{
                    cursor: 'default',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 2px 10px rgba(99, 102, 241, 0.1)'
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="float-animation" style={{
          position: 'absolute',
          bottom: 'var(--space-8)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-2)',
          color: 'var(--text-tertiary)',
          zIndex: 10
        }}>
          <span style={{
            fontSize: '0.75rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>Scroll</span>
          <div style={{
            width: 2,
            height: 32,
            background: 'linear-gradient(180deg, var(--primary), transparent)',
            borderRadius: 2
          }} />
        </div>
      </section>

      {/* STATS SECTION WITH 3D CARDS */}
      <section className="section-sm bg-gray parallax-section">
        <div className="container">
          <div className="grid grid-4">
            {personal.stats.map((s, i) => (
              <StatCard key={s.label} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE SECTION WITH SCROLL REVEALS */}
      <section className="section bg-white parallax-section">
        <div className="container">
          <div className="section-header scroll-reveal">
            <div className="section-badge">
              <Shield size={16} /> Core Expertise
            </div>
            <h2 className="section-title">What I Do</h2>
            <p className="section-subtitle">
              Applying cutting-edge AI to solve problems in biology, healthcare, and autonomous systems.
            </p>
          </div>

          <div className="grid grid-3">
            {expertiseAreas.map((item, i) => {
              const Icon = item.icon;
              const tiltRef = use3DTilt(8);

              return (
                <div
                  key={item.title}
                  ref={tiltRef}
                  className={`card card-3d scroll-reveal stagger-${i + 1}`}
                  style={{
                    cursor: 'pointer',
                    willChange: 'transform'
                  }}
                >
                  <div className="icon-3d pulse-animation" style={{ marginBottom: 'var(--space-6)' }}>
                    <Icon size={32} />
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-3)'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7
                  }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS WITH 3D TILT */}
      <section className="section bg-gray parallax-section">
        <div className="container">
          <div className="section-header scroll-reveal">
            <div className="section-badge">
              <Code2 size={16} /> Portfolio
            </div>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              From gene regulatory networks to autonomous cloud systems — here are some highlights.
            </p>
          </div>

          <div className="grid grid-3">
            {projects.slice(0, 3).map((p, i) => (
              <ProjectPreviewCard key={p.id} p={p} index={i} />
            ))}
          </div>

          <div className="scroll-reveal-scale" style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <Link to="/projects" className="btn btn-primary">
              View All Projects <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* RESEARCH SECTION */}
      <section className="section bg-white parallax-section">
        <div className="container">
          <div className="section-header scroll-reveal">
            <div className="section-badge">
              <FileText size={16} /> Research
            </div>
            <h2 className="section-title">Published Research</h2>
            <p className="section-subtitle">
              Peer-reviewed publications in AI, deep learning, and autonomous systems.
            </p>
          </div>

          <div className="grid grid-2">
            {research.map((r, i) => {
              const Icon = iconMap[r.icon];
              const tiltRef = use3DTilt(10);

              return (
                <div
                  key={r.id}
                  ref={tiltRef}
                  className={`card card-glass scroll-reveal-${i % 2 === 0 ? 'left' : 'right'}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-4)',
                    cursor: 'pointer',
                    willChange: 'transform'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="icon-3d float-animation">
                      {Icon && <Icon size={28} />}
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                      <span className="tag tag-success">{r.status}</span>
                      <span className="tag">{r.date}</span>
                    </div>
                  </div>

                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.4
                  }}>
                    {r.title}
                  </h3>

                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-tertiary)',
                    fontStyle: 'italic'
                  }}>
                    {r.journal} • {r.volume}
                  </p>

                  <p style={{
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    flexGrow: 1
                  }}>
                    {r.abstract.slice(0, 180)}...
                  </p>

                  <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                    {r.metrics.slice(0, 2).map(m => (
                      <div
                        key={m.label}
                        style={{
                          padding: 'var(--space-3) var(--space-4)',
                          borderRadius: 'var(--radius-lg)',
                          background: 'rgba(99, 102, 241, 0.08)',
                          border: '1px solid rgba(99, 102, 241, 0.15)'
                        }}
                      >
                        <div style={{
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: 'var(--primary)',
                          marginBottom: 'var(--space-1)'
                        }}>
                          {m.value}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-tertiary)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/research"
                    className="btn btn-ghost btn-sm"
                    style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
                  >
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION WITH LIGHT GRADIENT */}
      <section
        className="section-sm parallax-section"
        style={{
          background: 'linear-gradient(135deg, #E0E7FF 0%, #E0F2FE 50%, #DBEAFE 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <AnimatedBlob
          size={500}
          top="-20%"
          left="70%"
          color="rgba(167, 243, 208, 0.4)"
          delay={0}
          animationDuration={8}
        />

        <AnimatedBlob
          size={400}
          top="60%"
          left="-10%"
          color="rgba(251, 207, 232, 0.4)"
          delay={2}
          animationDuration={10}
        />

        <div className="container scroll-reveal-scale" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            marginBottom: 'var(--space-4)',
            color: 'var(--text-primary)'
          }}>
            Let's Build Something Amazing Together
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-10)',
            maxWidth: 600,
            margin: '0 auto var(--space-10)'
          }}>
            Open to AI/ML research roles, computational biology projects, and exciting collaborations.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-4)',
            flexWrap: 'wrap'
          }}>
            <a
              href={`mailto:${personal.email}`}
              className="btn btn-primary btn-lg"
            >
              <Mail size={20} /> Email Me
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              <Linkedin size={20} /> Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
