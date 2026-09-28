import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Linkedin, Github, ExternalLink, FileText } from 'lucide-react';
import { personal } from '../data/portfolioData';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/research', label: 'Research' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
        borderTop: '1px solid var(--border-light)',
        padding: 'var(--space-20) 0 var(--space-8)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-12)',
            marginBottom: 'var(--space-12)'
          }}
        >
          {/* Brand */}
          <div>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-5)',
                textDecoration: 'none'
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-xl)',
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-3d)'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#fff'
                  }}
                >
                  U
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)'
                }}
              >
                Umaa <span className="gradient-text">Maheshwary SV</span>
              </span>
            </Link>

            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: 'var(--space-6)'
              }}
            >
              AI/ML Engineer specializing in Deep Learning, Computational Biology, and Autonomous Systems.
              Published researcher building intelligent solutions.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, #0A66C2, #004182)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'var(--transition-base)',
                  boxShadow: 'var(--shadow-md)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
              >
                <Linkedin size={20} />
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'var(--transition-base)',
                  boxShadow: 'var(--shadow-md)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
              >
                <Github size={20} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, var(--secondary), #9333EA)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'var(--transition-base)',
                  boxShadow: 'var(--shadow-md)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-5)'
              }}
            >
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {LINKS.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'var(--transition-base)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    width: 'fit-content'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.paddingLeft = 'var(--space-2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.paddingLeft = '0';
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Research Publications */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-5)'
              }}
            >
              Publications
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <a
                href="https://www.doi.org/10.56726/IRJMETS82067"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                  <FileText size={16} style={{ color: 'var(--primary)', marginTop: '2px' }} />
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--primary)',
                      fontWeight: 600,
                      transition: 'var(--transition-base)'
                    }}
                  >
                    Multi-Modal Emotion Recognition
                  </p>
                  <ExternalLink size={14} style={{ color: 'var(--primary)', marginTop: '2px' }} />
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', paddingLeft: '24px' }}>
                  IRJMETS • Aug 2025 • IF 8.187
                </p>
              </a>

              <div style={{ display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                  <FileText size={16} style={{ color: 'var(--accent)', marginTop: '2px' }} />
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--accent)',
                      fontWeight: 600
                    }}
                  >
                    CCDT: Cognitive Digital Twin
                  </p>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', paddingLeft: '24px' }}>
                  IJRAR • May 2026 • Peer-Reviewed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-5)'
              }}
            >
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div className="icon-3d icon-3d-sm" style={{ flexShrink: 0 }}>
                  <Mail size={16} />
                </div>
                <a
                  href={`mailto:${personal.email}`}
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'var(--transition-base)',
                    wordBreak: 'break-all'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {personal.email}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div className="icon-3d icon-3d-sm" style={{ flexShrink: 0 }}>
                  <Phone size={16} />
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {personal.phone}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div className="icon-3d icon-3d-sm" style={{ flexShrink: 0 }}>
                  <MapPin size={16} />
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {personal.location}
                </span>
              </div>

              <Link
                to="/contact"
                className="btn btn-primary btn-sm"
                style={{ alignSelf: 'flex-start', marginTop: 'var(--space-2)' }}
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: 'var(--space-6)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--space-4)'
          }}
        >
          <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
            © {year} Umaa Maheshwary SV. All rights reserved.
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
            Built with <span style={{ color: 'var(--danger)' }}>❤</span> using React & Modern Web Technologies
          </p>
        </div>
      </div>
    </footer>
  );
}
