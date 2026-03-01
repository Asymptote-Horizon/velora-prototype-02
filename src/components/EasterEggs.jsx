import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playBackgroundMusic, stopBackgroundMusic, subscribeToAudioState } from '../utils/audioManager'

// ─── Constants ────────────────────────────────────────────────────────────────

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
]

const ACTION_WORDS = ['POW!', 'ZAP!', 'BOOM!', 'CRASH!', 'WHAM!']
const PANEL_COLORS = ['#FF2D55', '#00D4FF', '#FFE600']

// ─── Utility ──────────────────────────────────────────────────────────────────

function rand(min, max) { return Math.random() * (max - min) + min }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// ─── Flying panels data (generated once) ──────────────────────────────────────

const FLYING_PANELS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  word: pick(ACTION_WORDS),
  color: pick(PANEL_COLORS),
  borderColor: pick(PANEL_COLORS),
  startX: rand(-200, -100),
  startY: rand(5, 85),
  endX: rand(110, 130),
  midY: rand(5, 85),
  delay: i * 0.12,
  duration: rand(1.2, 2),
}))

// ─── Easter Egg 1 — Konami Overlay ───────────────────────────────────────────

function KonamiOverlay({ onDismiss }) {
  useEffect(() => {
    function handler(e) { onDismiss() }
    const t = setTimeout(onDismiss, 4000)
    window.addEventListener('keydown', handler)
    window.addEventListener('click', handler)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', handler)
      window.removeEventListener('click', handler)
    }
  }, [onDismiss])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed', inset: 0,
        zIndex: 9999,
        background: '#0A0A0A',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Flying comic panels */}
      {FLYING_PANELS.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.startX}vw`, y: `${p.startY}vh`, opacity: 0 }}
          animate={{ x: `${p.endX}vw`, y: `${p.midY}vh`, opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '120px',
            height: '80px',
            border: `3px solid ${p.borderColor}`,
            background: '#111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '1.4rem',
            color: p.color,
            letterSpacing: '0.05em',
          }}>{p.word}</span>
        </motion.div>
      ))}

      {/* Secret message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4, ease: 'backOut' }}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          color: '#FFE600',
          textShadow: '3px 3px 0 #FF2D55, -2px -2px 0 #00D4FF',
          letterSpacing: '0.05em',
          textAlign: 'center',
        }}>
          YOU FOUND THE VOID
        </div>
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.9rem',
          color: '#555',
          letterSpacing: '0.1em',
        }}>
          Universe-000 — The Hidden Dimension
        </div>
        <div style={{
          border: '2px solid #FF2D55',
          background: '#111',
          padding: '0.5rem 1.5rem',
          marginTop: '0.5rem',
        }}>
          <span style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '1.2rem',
            color: '#FF2D55',
            letterSpacing: '0.15em',
          }}>
            SECRET CODE: CIPHER2026
          </span>
        </div>
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.65rem',
          color: '#333',
          letterSpacing: '0.2em',
          marginTop: '0.5rem',
        }}>
          CLICK OR PRESS ANY KEY TO CLOSE
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Easter Egg 2 — Idle Speech Bubble ───────────────────────────────────────

function IdleBubble({ onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000)
    function handler() { onDismiss() }
    window.addEventListener('click', handler)
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('keydown', handler)
    window.addEventListener('mousemove', handler)
    return () => {
      clearTimeout(t)
      window.removeEventListener('click', handler)
      window.removeEventListener('scroll', handler)
      window.removeEventListener('keydown', handler)
      window.removeEventListener('mousemove', handler)
    }
  }, [onDismiss])

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        background: '#111',
        border: '2px solid #FF2D55',
        padding: '1rem 1.5rem',
        maxWidth: '220px',
        pointerEvents: 'none',
      }}
    >
      {/* Bubble tail — bottom-right triangle */}
      <div style={{
        position: 'absolute',
        bottom: '-10px',
        right: '1.2rem',
        width: 0,
        height: 0,
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderTop: '10px solid #FF2D55',
      }} />
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.85rem',
        color: '#F5F5F5',
        lineHeight: 1.5,
        margin: 0,
      }}>
        Hey. The multiverse won't save itself.
      </p>
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.7rem',
        color: '#555',
        fontStyle: 'italic',
        margin: '0.5rem 0 0',
      }}>
        — Miles, probably
      </p>
    </motion.div>
  )
}

// ─── Easter Egg 3 — Origin Story Panel ───────────────────────────────────────

const ORIGIN_PANELS = [
  {
    num: '01',
    title: 'THE COUNCIL',
    body: 'Cipher was born from a simple idea: IT students deserve their own stage.',
  },
  {
    num: '02',
    title: 'THE MISSION',
    body: 'We build communities, run events, and push the boundaries of what student tech can look like.',
  },
  {
    num: '03',
    title: 'THE FIRST ACT',
    body: 'Velora 1.0 is our opening move. This is just the beginning.',
  },
]

function OriginStoryPanel({ onClose }) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        zIndex: 2000,
        background: '#111',
        borderTop: '3px solid #FFE600',
        maxHeight: '60vh',
        overflowY: 'auto',
        padding: '2rem',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1rem', right: '1rem',
          background: 'none',
          border: 'none',
          fontFamily: "'Bangers', cursive",
          fontSize: '1.5rem',
          color: '#FF2D55',
          cursor: 'pointer',
          lineHeight: 1,
          padding: '0.2rem 0.5rem',
        }}
      >×</button>

      {/* Header */}
      <div style={{
        fontFamily: "'Bangers', cursive",
        fontSize: '2rem',
        color: '#FFE600',
        borderBottom: '2px solid #222',
        paddingBottom: '1rem',
        marginBottom: '1.5rem',
        letterSpacing: '0.05em',
      }}>
        ORIGIN STORY
      </div>

      {/* Three comic panels */}
      <div className="origin-panels-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        {ORIGIN_PANELS.map(p => (
          <div key={p.num} style={{
            background: '#0D0D0D',
            border: '2px solid #222',
            padding: '1.2rem',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '0.5rem', left: '0.5rem',
              fontFamily: "'Bangers', cursive",
              fontSize: '0.7rem',
              color: '#FFE600',
              background: '#0D0D0D',
              padding: '0 0.3rem',
              border: '1px solid #222',
            }}>{p.num}</div>
            <div style={{
              fontFamily: "'Bangers', cursive",
              fontSize: '1rem',
              color: '#F5F5F5',
              marginTop: '1.2rem',
              marginBottom: '0.6rem',
              letterSpacing: '0.05em',
            }}>{p.title}</div>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.8rem',
              color: '#888',
              lineHeight: 1.6,
            }}>{p.body}</div>
          </div>
        ))}
      </div>

      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.8rem',
        color: '#555',
        textAlign: 'center',
      }}>
        — Cipher, MIT Academy of Engineering, Alandi
      </div>

      <style>{`
        @media (max-width: 639px) {
          .origin-panels-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  )
}

// ─── Easter Egg 4 — Noir Mode Indicator ──────────────────────────────────────

function NoirIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        zIndex: 1000,
        background: '#000',
        color: '#fff',
        border: '1px solid #333',
        padding: '0.3rem 0.8rem',
        fontFamily: "'Bangers', cursive",
        fontSize: '0.75rem',
        letterSpacing: '0.1em',
        pointerEvents: 'none',
      }}
    >
      NOIR MODE
    </motion.div>
  )
}

// ─── Audio Floating Controls ──────────────────────────────────────────────────

function AudioControls() {
  const [isAudioOn, setIsAudioOn] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const unsub = subscribeToAudioState((state) => {
      setIsAudioOn(state)
    })
    return unsub
  }, [])

  function handleMute() {
    stopBackgroundMusic()
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 4500)
  }

  return (
    <>
      <AnimatePresence>
        {isAudioOn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            onClick={handleMute}
            style={{
              position: 'fixed',
              top: '16px',
              left: '10rem',
              zIndex: 9999,
              background: '#FF2D55',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000',
              color: '#FFF',
              fontFamily: "'Bangers', cursive",
              fontSize: '1.2rem',
              padding: '0.4rem 1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            whileHover={{ y: -2, boxShadow: '5px 5px 0 #000' }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
            MUTE SOUND
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && !isAudioOn && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '1rem',
              left: '50%',
              x: '-50%',
              zIndex: 9999,
              background: '#FFE600',
              border: '3px solid #000',
              boxShadow: '4px 4px 0 #000',
              color: '#0A0A0A',
              padding: '0.8rem 1.5rem',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Audio Muted. <br/>
            <span style={{ fontWeight: 400, fontSize: '0.75rem', color: '#333' }}>
              Press <b>N</b> (Noir Mode) or click the <b>VELORA logo</b> to blast it again!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── EasterEggs ───────────────────────────────────────────────────────────────

export default function EasterEggs() {
  const [konamiActive, setKonamiActive]     = useState(false)
  const [idleVisible,  setIdleVisible]      = useState(false)
  const [originVisible, setOriginVisible]   = useState(false)
  const [noirActive,   setNoirActive]       = useState(false)

  const sequenceRef = useRef([])
  const idleTimer   = useRef(null)

  // ── Idle reset helper ──────────────────────────────────────────────────────
  function resetIdleTimer() {
    clearTimeout(idleTimer.current)
    if (!idleVisible) {
      idleTimer.current = setTimeout(() => setIdleVisible(true), 30000)
    }
  }

  // ── Egg 1: Konami + Egg 4: Noir keydown listener ───────────────────────────
  useEffect(() => {
    function onKeyDown(e) {
      // Egg 4 — Noir Mode (N key, not in inputs)
      const tag = document.activeElement?.tagName
      if ((e.key === 'n' || e.key === 'N') && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        playBackgroundMusic()
        setNoirActive(prev => {
          const next = !prev
          if (next) {
            document.documentElement.setAttribute('data-theme', 'noir')
          } else {
            document.documentElement.removeAttribute('data-theme')
          }
          return next
        })
      }

      // Egg 1 — Konami sequence tracking
      sequenceRef.current = [...sequenceRef.current, e.key].slice(-10)
      if (sequenceRef.current.join(',') === KONAMI.join(',')) {
        setKonamiActive(true)
        sequenceRef.current = []
      }

      // Idle reset
      resetIdleTimer()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [idleVisible])

  // ── Egg 2: Idle detection — interaction listeners ──────────────────────────
  useEffect(() => {
    const events = ['scroll', 'click', 'mousemove']
    events.forEach(ev =>
      window.addEventListener(ev, resetIdleTimer, { passive: true })
    )
    // Start the timer on mount
    idleTimer.current = setTimeout(() => setIdleVisible(true), 30000)
    return () => {
      clearTimeout(idleTimer.current)
      events.forEach(ev => window.removeEventListener(ev, resetIdleTimer))
    }
  }, [])

  // ── Egg 3: Origin Story custom event ──────────────────────────────────────
  useEffect(() => {
    function onOriginStory() { setOriginVisible(true) }
    window.addEventListener('velora-origin-story', onOriginStory)
    return () => window.removeEventListener('velora-origin-story', onOriginStory)
  }, [])

  return (
    <AnimatePresence>
      {/* Egg 1 — Konami overlay */}
      {konamiActive && (
        <KonamiOverlay key="konami" onDismiss={() => setKonamiActive(false)} />
      )}

      {/* Egg 2 — Idle bubble */}
      {idleVisible && (
        <IdleBubble key="idle" onDismiss={() => {
          setIdleVisible(false)
          resetIdleTimer()
        }} />
      )}

      {/* Egg 3 — Origin story panel */}
      {originVisible && (
        <OriginStoryPanel key="origin" onClose={() => setOriginVisible(false)} />
      )}

      {/* Egg 4 — Noir indicator */}
      {noirActive && <NoirIndicator key="noir" />}

      {/* Audio Mute Controls */}
      <AudioControls key="audio-controls" />
    </AnimatePresence>
  )
}
