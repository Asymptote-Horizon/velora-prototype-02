import { useState } from 'react'

// ─── Nav sections for footer links ────────────────────────────────────────────

const NAV_SECTIONS = [
  { label: 'About',    id: 'about' },
  { label: 'Tracks',   id: 'tracks' },
  { label: 'Timeline', id: 'timeline' },
  { label: 'Prizes',   id: 'prizes' },
  { label: 'Judges',   id: 'judges' },
  { label: 'Sponsors', id: 'sponsors' },
  { label: 'FAQ',      id: 'faq' },
]

const SOCIALS = [
  { label: '↗ Instagram', href: '#' },
  { label: '↗ LinkedIn',  href: '#' },
  { label: '↗ Twitter',   href: '#' },
]

// ─── Footer Link (hover state handled inline) ─────────────────────────────────

function FooterLink({ children, onClick, href }) {
  const [hovered, setHovered] = useState(false)
  const style = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.8rem',
    color: hovered ? '#FF2D55' : '#555',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    textAlign: 'left',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    display: 'block',
    marginBottom: '0.5rem',
  }

  if (href) {
    return (
      <a
        href={href}
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const [isGlitching, setIsGlitching] = useState(false)

  function handleWordmarkClick() {
    if (isGlitching) return
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 400)
  }

  return (
    <footer
      style={{
        background: '#050505',
        borderTop: '3px solid #111',
        padding: '4rem 2rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark "V" */}
      <div style={{
        position: 'absolute',
        bottom: '-2rem',
        right: '-1rem',
        fontFamily: "'Bangers', cursive",
        fontSize: '20rem',
        color: '#ffffff',
        opacity: 0.015,
        pointerEvents: 'none',
        lineHeight: 1,
        userSelect: 'none',
      }}>
        V
      </div>

      {/* Top row */}
      <div
        className="footer-top-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '3rem',
          marginBottom: '3rem',
        }}
      >
        {/* Left block — wordmark + attribution */}
        <div className="footer-left-block">
          <div
            onClick={handleWordmarkClick}
            className={isGlitching ? 'footer-velora-glitch' : ''}
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: '3rem',
              color: '#FF2D55',
              textShadow: '2px 2px 0 #00D4FF, -1px -1px 0 #FFE600',
              lineHeight: 1,
              cursor: 'pointer',
              display: 'inline-block',
              userSelect: 'none',
            }}
          >
            VELORA
          </div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.75rem',
            color: '#444',
            letterSpacing: '0.15em',
            marginTop: '0.2rem',
          }}>
            1.0 — DARE TO COMPETE
          </div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.8rem',
            color: '#555',
            marginTop: '0.5rem',
          }}>
            An annual hackathon by Cipher
          </div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.75rem',
            color: '#444',
            marginTop: '0.2rem',
          }}>
            MIT Academy of Engineering, Alandi
          </div>
        </div>

        {/* Center block — nav links (hidden mobile) */}
        <div className="footer-center-block">
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            NAVIGATE
          </div>
          {NAV_SECTIONS.map(({ label, id }) => (
            <FooterLink
              key={id}
              onClick={() => window.lenis?.scrollTo(`#${id}`, { duration: 1.2 })}
            >
              {label}
            </FooterLink>
          ))}
        </div>

        {/* Right block — socials + contact */}
        <div className="footer-right-block">
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            CONNECT
          </div>
          {SOCIALS.map(({ label, href }) => (
            <FooterLink key={label} href={href}>
              {label}
            </FooterLink>
          ))}
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.75rem',
              color: '#444',
              marginBottom: '0.3rem',
            }}>
              Questions?
            </div>
            <FooterLink href="mailto:cipherit.mitaoe@gmail.com">
              cipherit.mitaoe@gmail.com
            </FooterLink>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #111', margin: '2rem 0' }} />

      {/* Bottom row */}
      <div
        className="footer-bottom-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.75rem',
          color: '#333',
        }}>
          © 2026 Cipher — MIT Academy of Engineering
        </div>

        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '0.9rem',
          color: '#222',
          letterSpacing: '0.15em',
        }}>
          VELORA 2.0 — THE VERSE EXPANDS · 2027
        </div>

        <FooterLink href="#">
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.75rem',
            color: '#333',
          }}>
            Code of Conduct
          </span>
        </FooterLink>
      </div>

      <style>{`
        .footer-velora-glitch {
          animation: footer-glitch-burst 0.4s steps(1, end);
        }
        @keyframes footer-glitch-burst {
          0%   { text-shadow: 2px 2px 0 #00D4FF, -1px -1px 0 #FFE600; transform: translate(0, 0); }
          10%  { text-shadow: -4px 2px 0 #00D4FF, 3px -2px 0 #FFE600; transform: translate(3px, -2px); }
          20%  { text-shadow: 4px -2px 0 #FF2D55, -3px 3px 0 #00D4FF; transform: translate(-3px, 1px); }
          30%  { text-shadow: -2px 4px 0 #FFE600, 4px -3px 0 #FF2D55; transform: translate(2px, 3px); }
          40%  { text-shadow: 3px -3px 0 #00D4FF, -4px 2px 0 #FFE600; transform: translate(-2px, -3px); }
          50%  { text-shadow: -3px 3px 0 #FF2D55, 2px -4px 0 #00D4FF; transform: translate(4px, 2px); }
          60%  { text-shadow: 4px 2px 0 #FFE600, -2px -3px 0 #FF2D55; transform: translate(-1px, -2px); }
          70%  { text-shadow: -4px -2px 0 #00D4FF, 3px 4px 0 #FFE600; transform: translate(3px, 1px); }
          80%  { text-shadow: 2px -4px 0 #FF2D55, -3px 2px 0 #00D4FF; transform: translate(-3px, -1px); }
          90%  { text-shadow: -2px 3px 0 #FFE600, 4px -2px 0 #FF2D55; transform: translate(1px, 3px); }
          100% { text-shadow: 2px 2px 0 #00D4FF, -1px -1px 0 #FFE600; transform: translate(0, 0); }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .footer-top-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .footer-left-block { display: flex; flex-direction: column; align-items: center; }
          .footer-center-block { display: none !important; }
          .footer-right-block { display: flex; flex-direction: column; align-items: center; }
          .footer-bottom-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  )
}
