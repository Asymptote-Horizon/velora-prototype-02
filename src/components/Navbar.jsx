import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playBackgroundMusic } from '../utils/audioManager'

const NAV_LINKS = [
  { label: 'About',    id: 'about' },
  { label: 'Tracks',   id: 'tracks' },
  { label: 'Timeline', id: 'timeline' },
  { label: 'Prizes',   id: 'prizes' },
  { label: 'Judges',   id: 'judges' },
  { label: 'Sponsors', id: 'sponsors' },
  { label: 'FAQ',      id: 'faq' },
]

const GLITCH_CHARS = '!@#$%^&*<>?/|\\~'

// Mobile menu glitch-on-mount link
function MobileGlitchLink({ label, idx, onClick }) {
  const [display, setDisplay] = useState(label)
  const intervalRef = useRef(null)
  const timeoutRef  = useRef(null)

  useEffect(() => {
    // Stagger each link so they resolve one after another
    const startDelay = idx * 90
    timeoutRef.current = setTimeout(() => {
      let elapsed = 0
      intervalRef.current = setInterval(() => {
        elapsed += 40
        if (elapsed >= 180) {
          clearInterval(intervalRef.current)
          let i = 0
          function resolveNext() {
            setDisplay(
              label.slice(0, i + 1) +
              Array.from(label.slice(i + 1)).map(() =>
                GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
              ).join('')
            )
            i++
            if (i < label.length) timeoutRef.current = setTimeout(resolveNext, 35)
            else setDisplay(label)
          }
          resolveNext()
        } else {
          setDisplay(
            Array.from(label).map(() =>
              GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            ).join('')
          )
        }
      }, 40)
    }, startDelay)
    return () => { clearInterval(intervalRef.current); clearTimeout(timeoutRef.current) }
  }, [label, idx])

  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        borderBottom: '1px solid #1E1E1E',
        fontFamily: "'Bangers', cursive",
        fontSize: '2rem',
        letterSpacing: '0.08em',
        color: '#F5F5F5',
        cursor: 'pointer',
        padding: '0.8rem 0',
        textAlign: 'left',
        width: '100%',
        transition: 'color 0.15s',
        display: 'block',
      }}
      onTouchStart={e => (e.currentTarget.style.color = '#FFE600')}
      onTouchEnd={e => (e.currentTarget.style.color = '#F5F5F5')}
      onMouseEnter={e => (e.currentTarget.style.color = '#FFE600')}
      onMouseLeave={e => (e.currentTarget.style.color = '#F5F5F5')}
    >
      {display}
    </button>
  )
}

// Effect 2 — Typewriter glitch hook
function useGlitchText(original) {
  const [display, setDisplay] = useState(original)
  const intervalRef = useRef(null)
  const timeoutRef  = useRef(null)

  function startGlitch() {
    let elapsed = 0
    intervalRef.current = setInterval(() => {
      elapsed += 40
      if (elapsed >= 300) {
        // Resolve character by character
        clearInterval(intervalRef.current)
        let i = 0
        function resolveNext() {
          setDisplay(original.slice(0, i + 1) +
            Array.from(original.slice(i + 1)).map(() =>
              GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            ).join(''))
          i++
          if (i < original.length) timeoutRef.current = setTimeout(resolveNext, 35)
          else setDisplay(original)
        }
        resolveNext()
      } else {
        setDisplay(
          Array.from(original).map(() =>
            GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          ).join('')
        )
      }
    }, 40)
  }

  function stopGlitch() {
    clearInterval(intervalRef.current)
    clearTimeout(timeoutRef.current)
    setDisplay(original)
  }

  useEffect(() => () => { clearInterval(intervalRef.current); clearTimeout(timeoutRef.current) }, [])

  return { display, startGlitch, stopGlitch }
}

// Effect 4 — color frames for Register button dimension shift
const DIM_FRAMES = [
  { bg: '#FFE600', color: '#0A0A0A' },
  { bg: '#ffffff', color: '#000000' },
  { bg: '#00D4FF', color: '#0A0A0A' },
  { bg: '#FF2D55', color: '#ffffff' },
  { bg: '#FFE600', color: '#0A0A0A' },
]

// Nav link with glitch effect
function GlitchNavLink({ label, id, onClick }) {
  const { display, startGlitch, stopGlitch } = useGlitchText(label)
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => { setHovered(true); startGlitch() }}
      onMouseLeave={() => { setHovered(false); stopGlitch() }}
      style={{
        background: 'none',
        border: 'none',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.85rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: hovered ? '#FFE600' : '#F5F5F5',
        cursor: 'pointer',
        padding: '0.25rem 0',
        transition: 'color 0.2s',
        minWidth: `${label.length}ch`,
      }}
    >
      {display}
    </button>
  )
}

function scrollTo(id) {
  if (window.lenis) {
    window.lenis.scrollTo(`#${id}`)
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  // Effect 3 — wordmark glitch
  const [isGlitching, setIsGlitching] = useState(false)
  // Effect 4 — register button dimension shift
  const [dimFrame,    setDimFrame]    = useState(0)
  const dimIntervalRef  = useRef(null)
  // Egg 3 — origin story click streak
  const clickCountRef   = useRef(0)
  const clickTimerRef   = useRef(null)

  // Scroll listener
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Cleanup intervals/timers on unmount
  useEffect(() => {
    return () => {
      clearInterval(dimIntervalRef.current)
      clearTimeout(clickTimerRef.current)
    }
  }, [])

  function handleNavClick(id) {
    setMenuOpen(false)
    setTimeout(() => scrollTo(id), 150)
  }

  // Effect 3 — wordmark glitch trigger + Egg 3 click streak + bg music
  function handleWordmarkClick() {
    scrollTo('top')
    
    // Play background music when logo is clicked
    playBackgroundMusic()

    // Glitch burst
    if (!isGlitching) {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 400)
    }
    // Origin story: 5 clicks within 2 seconds
    clickCountRef.current += 1
    clearTimeout(clickTimerRef.current)
    clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0 }, 2000)
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0
      clearTimeout(clickTimerRef.current)
      window.dispatchEvent(new CustomEvent('velora-origin-story'))
    }
  }

  // Effect 4 — dimension shift handlers
  function startDimShift() {
    let frame = 0
    dimIntervalRef.current = setInterval(() => {
      frame++
      setDimFrame(frame)
      if (frame >= DIM_FRAMES.length - 1) clearInterval(dimIntervalRef.current)
    }, 80)
  }
  function stopDimShift() {
    clearInterval(dimIntervalRef.current)
    setDimFrame(0)
  }

  const btnStyle = DIM_FRAMES[dimFrame]

  return (
    <>
      {/* Effect 1 — Web Swing Entrance */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.8 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          height: '64px',
        }}
      >
        {/* Animated background layer (separate so spring and bg transitions don't conflict) */}
        <motion.div
          aria-hidden
          style={{ position: 'absolute', inset: 0, zIndex: -1 }}
          animate={{
            backgroundColor: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0)',
            backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />

        {/* Left — VELORA wordmark (Effect 3) */}
        <span
          className={isGlitching ? 'velora-glitch' : ''}
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '2rem',
            color: '#FF2D55',
            letterSpacing: '0.05em',
            textShadow: '2px 2px 0 #00D4FF, -1px -1px 0 #FFE600',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={handleWordmarkClick}
        >
          VELORA
        </span>

        {/* Center — desktop nav links (Effect 2) */}
        <ul
          className="nav-links-desktop"
          style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}
        >
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <GlitchNavLink label={label} id={id} onClick={() => handleNavClick(id)} />
            </li>
          ))}
        </ul>

        {/* Right — Register Now CTA (Effect 4) */}
        <button
          className="register-btn-desktop"
          onClick={() => window.lenis?.scrollTo('#register', { duration: 1.5 })}
          onMouseEnter={startDimShift}
          onMouseLeave={stopDimShift}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '0.85rem',
            background: btnStyle.bg,
            color: btnStyle.color,
            border: '2px solid #000',
            boxShadow: '3px 3px 0 #000',
            padding: '0.5rem 1.2rem',
            borderRadius: 0,
            letterSpacing: '0.05em',
            display: 'inline-block',
            transition: 'box-shadow 0.1s, transform 0.1s',
            cursor: 'pointer',
          }}
          onMouseDown={e => {
            e.currentTarget.style.boxShadow = '1px 1px 0 #000'
            e.currentTarget.style.transform = 'translate(2px, 2px)'
          }}
          onMouseUp={e => {
            e.currentTarget.style.boxShadow = '3px 3px 0 #000'
            e.currentTarget.style.transform = 'translate(0, 0)'
          }}
        >
          Register Now
        </button>

        {/* Hamburger — mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#F5F5F5', transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#F5F5F5', transition: 'opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#F5F5F5', transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
        </button>
      </motion.nav>

      {/* Mobile menu — half-screen right panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 998,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(2px)',
              }}
            />

            {/* Panel */}
            <motion.div
              key="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(55vw, 300px)',
                zIndex: 999,
                background: '#0A0A0A',
                borderLeft: '3px solid #FF2D55',
                boxShadow: '-8px 0 32px rgba(255,45,85,0.25)',
                display: 'flex',
                flexDirection: 'column',
                padding: '5rem 1.5rem 2rem',
                overflowY: 'auto',
              }}
            >
              {/* Panel label */}
              <span style={{
                position: 'absolute',
                top: '1rem',
                left: '1.2rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.55rem',
                color: '#333',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>
                NAV / 01
              </span>

              {/* Close X */}
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  color: '#F5F5F5',
                  fontSize: '1.4rem',
                  cursor: 'pointer',
                  lineHeight: 1,
                  padding: '0.25rem',
                }}
              >
                ✕
              </button>

              {/* Nav links with glitch */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {NAV_LINKS.map(({ label, id }, idx) => (
                  <MobileGlitchLink
                    key={id}
                    label={label}
                    idx={idx}
                    onClick={() => handleNavClick(id)}
                  />
                ))}
              </div>

              {/* Register CTA */}
              <button
                onClick={() => {
                  setMenuOpen(false)
                  window.lenis?.scrollTo('#register', { duration: 1.5 })
                }}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  background: '#FFE600',
                  color: '#0A0A0A',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  padding: '0.75rem 1rem',
                  letterSpacing: '0.05em',
                  marginTop: '1.5rem',
                  cursor: 'pointer',
                  borderRadius: 0,
                  width: '100%',
                }}
              >
                Register Now
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .register-btn-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }

        @keyframes velora-glitch-anim {
          0%   { transform: translate(0, 0);     opacity: 1;    text-shadow: 2px 2px 0 #00D4FF, -1px -1px 0 #FFE600; }
          10%  { transform: translate(-4px, 2px); opacity: 0.7;  text-shadow: 4px 0 0 #00D4FF, -4px 0 0 #FF2D55; }
          20%  { transform: translate(4px, -2px); opacity: 1;    text-shadow: -4px 2px 0 #FFE600, 4px -2px 0 #00D4FF; }
          30%  { transform: translate(-2px, 4px); opacity: 0.5;  text-shadow: 6px 0 0 #FF2D55, -6px 0 0 #00D4FF; }
          40%  { transform: translate(4px, -4px); opacity: 0.9;  text-shadow: -2px -2px 0 #FFE600, 2px 2px 0 #FF2D55; }
          50%  { transform: translate(-4px, 2px); opacity: 0.6;  text-shadow: 4px 4px 0 #00D4FF, -4px -4px 0 #FFE600; }
          60%  { transform: translate(2px, -2px); opacity: 1;    text-shadow: 2px 2px 0 #FF2D55, -2px -2px 0 #00D4FF; }
          70%  { transform: translate(-2px, 4px); opacity: 0.7;  text-shadow: -4px 0 0 #FFE600, 4px 0 0 #FF2D55; }
          80%  { transform: translate(4px, -2px); opacity: 0.9;  text-shadow: 2px 2px 0 #00D4FF, -1px -1px 0 #FFE600; }
          90%  { transform: translate(-2px, 2px); opacity: 0.8;  text-shadow: -2px 2px 0 #FF2D55, 2px -2px 0 #FFE600; }
          100% { transform: translate(0, 0);      opacity: 1;    text-shadow: 2px 2px 0 #00D4FF, -1px -1px 0 #FFE600; }
        }

        .velora-glitch {
          animation: velora-glitch-anim 0.4s steps(1, end) forwards;
        }
      `}</style>
    </>
  )
}
