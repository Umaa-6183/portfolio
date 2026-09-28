import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { to: '/',              label: 'Home' },
  { to: '/about',         label: 'About' },
  { to: '/experience',    label: 'Experience' },
  { to: '/projects',      label: 'Projects' },
  { to: '/research',      label: 'Research' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/blog',          label: 'Blog' },
  { to: '/contact',       label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    background: scrolled
      ? 'rgba(255, 255, 255, 0.95)'
      : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: scrolled
      ? '1px solid var(--border-light)'
      : '1px solid transparent',
    boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
  };

  return (
    <>
      <nav style={navStyle} aria-label="Main Navigation">
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)'
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-3d)',
                transition: 'transform var(--transition-base)'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05) rotate(-3deg)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
            >
              <span style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '1.125rem',
                fontWeight: 800,
                color: '#fff'
              }}>
                U
              </span>
            </div>
            <span style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em'
            }}>
              Umaa <span className="gradient-text">SV</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-1)',
              alignItems: 'center'
            }}
            className="nav-desktop"
          >
            {NAV_LINKS.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-primary)',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: active ? '#fff' : 'var(--text-secondary)',
                    background: active
                      ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))'
                      : 'transparent',
                    boxShadow: active ? 'var(--shadow-md)' : 'none',
                    transition: 'var(--transition-base)',
                    textDecoration: 'none',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'rgba(99, 102, 241, 0.08)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="btn btn-primary btn-sm"
              style={{
                marginLeft: 'var(--space-3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)'
              }}
            >
              <Sparkles size={16} />
              Hire Me
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="nav-hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              background: menuOpen ? 'var(--primary)' : 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              transition: 'var(--transition-base)',
              color: menuOpen ? '#fff' : 'var(--text-primary)'
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-6)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
        }}
        className="nav-mobile-overlay"
      >
        {NAV_LINKS.map(({ to, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: active ? 'var(--primary)' : 'var(--text-primary)',
                borderBottom: active ? '3px solid var(--primary)' : '3px solid transparent',
                paddingBottom: 'var(--space-2)',
                textDecoration: 'none',
                transition: 'var(--transition-base)',
              }}
            >
              {label}
            </Link>
          );
        })}
        <Link
          to="/contact"
          className="btn btn-primary"
          style={{ marginTop: 'var(--space-4)' }}
        >
          Get In Touch
        </Link>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
