import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Countdown (days + hrs only) ──────────────────────────────────────────────

const TARGET = new Date('2026-03-28T09:00:00').getTime()

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hrs:  Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000)  / 60000),
    secs: Math.floor((diff % 60000)    / 1000),
  }
}

function MiniFlip({ value, label }) {
  const display = String(value).padStart(2, '0')
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.2rem',
    }}>
      <div style={{
        border: '2px solid #222',
        background: '#0D0D0D',
        boxShadow: '3px 3px 0 #FF2D55',
        padding: '0.4rem 0.8rem',
        minWidth: '54px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', height: '1.8rem' }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={display}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              style={{
                fontFamily: "'Bangers', cursive",
                fontSize: '1.5rem',
                color: '#FFE600',
                lineHeight: '1.8rem',
                position: 'absolute',
                inset: 0,
              }}
            >
              {display}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.55rem',
        letterSpacing: '0.1em',
        color: '#555',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  )
}

const miniSep = (
  <span style={{
    fontFamily: "'Bangers', cursive",
    fontSize: '1.4rem',
    color: '#FF2D55',
    lineHeight: 1,
    marginTop: '0.3rem',
    alignSelf: 'flex-start',
  }}>:</span>
)

function MiniCountdown() {
  const [time, setTime] = useState(getTimeLeft)
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      <MiniFlip value={time.days} label="Days" />
      {miniSep}
      <MiniFlip value={time.hrs}  label="Hrs"  />
      {miniSep}
      <MiniFlip value={time.mins} label="Mins" />
      {miniSep}
      <MiniFlip value={time.secs} label="Secs" />
    </div>
  )
}

// ─── Subtext ────────────────────────────────────────────────────────────────────────

function Subtext() {
  return (
    <p style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '0.95rem',
      color: '#888',
      lineHeight: 2,
      marginTop: '1.5rem',
    }}>
      <span style={{ display: 'block' }}>
        Open to all college students<span style={{ color: '#FF2D55' }}> · </span>Teams of 2–5
      </span>
      <span style={{ display: 'block' }}>
        Free to participate<span style={{ color: '#FF2D55' }}> · </span>MITAOE, Alandi
      </span>
    </p>
  )
}

// ─── Floating Particles ───────────────────────────────────────────────────────

const PARTICLE_COLORS = ['#FF2D55', '#00D4FF', '#FFE600']

function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: PARTICLE_COLORS[i % 3],
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }))
  , [])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: p.color,
            opacity: 0,
          }}
          animate={{ y: [-20, -60], opacity: [0, 0.6, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// ─── Register ─────────────────────────────────────────────────────────────────

const PILLS = [
  { icon: '🗓', text: 'Late March 2026' },
  { icon: '📍', text: 'MITAOE, Alandi' },
  { icon: '⚡', text: '24 Hours' },
]

export default function Register() {
  const sectionRef    = useRef(null)
  const contentRef    = useRef(null)
  const leftPanelRef  = useRef(null)
  const rightPanelRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Side panels slide in
      gsap.from(leftPanelRef.current, {
        x: -80, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      })
      gsap.from(rightPanelRef.current, {
        x: 80, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      })

      // Main content — single reliable GSAP fade-in
      const items = contentRef.current?.querySelectorAll('.reg-anim')
      if (items?.length) {
        gsap.set(items, { opacity: 0, y: 30 })
        gsap.to(items, {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="register"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1.5rem',
      }}
    >
      {/* Layer 1 — Radial gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, #1A1A2E 0%, #0D0D1A 40%, #0A0A0A 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Layer 2 — Halftone overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.04,
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Layer 3 — Floating particles */}
      <Particles />

      {/* Layer 4 — Watermark */}
      <div style={{
        position: 'absolute',
        bottom: '-2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'Bangers', cursive",
        fontSize: 'clamp(4rem, 10vw, 8rem)',
        color: '#ffffff',
        opacity: 0.02,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        letterSpacing: '0.1em',
        zIndex: 1,
      }}>
        DARE TO COMPETE
      </div>

      {/* Decorative side panels */}
      <div
        ref={leftPanelRef}
        style={{
          position: 'absolute',
          left: '-40px',
          top: '50%',
          transform: 'translateY(-50%) rotate(-8deg)',
          width: '120px',
          height: '180px',
          border: '3px solid #1A1A1A',
          background: '#0D0D0D',
          opacity: 0.5,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <div
        ref={rightPanelRef}
        style={{
          position: 'absolute',
          right: '-40px',
          top: '50%',
          transform: 'translateY(-50%) rotate(8deg)',
          width: '120px',
          height: '180px',
          border: '3px solid #1A1A1A',
          background: '#0D0D0D',
          opacity: 0.5,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Main content — all children use .reg-anim for GSAP stagger */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '700px',
          width: '100%',
        }}
      >

        {/* a) Caption box */}
        <div className="reg-anim" style={{
          display: 'inline-block',
          background: '#00D4FF',
          color: '#0A0A0A',
          border: '2px solid #00D4FF',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          padding: '0.3rem 1rem',
          marginBottom: '1.5rem',
        }}>
          FINAL TRANSMISSION
        </div>

        {/* b) Heading */}
        <div className="reg-anim">
          <span style={{
            fontFamily: "'Bangers', cursive",
            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
            color: '#F5F5F5',
            display: 'block',
            lineHeight: 1,
          }}>
            Your Universe
          </span>
          <span style={{
            fontFamily: "'Bangers', cursive",
            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
            color: '#FF2D55',
            display: 'block',
            lineHeight: 1,
          }}>
            Needs You.
          </span>
        </div>

        {/* c) Subtext */}
        <div className="reg-anim">
          <Subtext />
        </div>

        {/* d) Info pills */}
        <div className="reg-anim" style={{
          display: 'flex',
          gap: '0.8rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '2rem',
        }}>
          {PILLS.map((pill, i) => (
            <div
              key={i}
              style={{
                border: '1px solid #333',
                background: '#111',
                padding: '0.4rem 1rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.75rem',
                color: '#888',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>{pill.icon}</span>
              <span>{pill.text}</span>
            </div>
          ))}
        </div>

        {/* e) CTA button */}
        <div className="reg-anim" style={{ marginTop: '2.5rem' }}>
          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.preventDefault()}
            whileHover={{ y: -3, boxShadow: '9px 9px 0 #000', backgroundColor: '#FFF000' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FFE600',
              color: '#0A0A0A',
              fontFamily: "'Bangers', cursive",
              fontSize: '1.4rem',
              letterSpacing: '0.15em',
              border: '3px solid #000',
              boxShadow: '6px 6px 0 #000',
              padding: '1rem 3rem',
              borderRadius: 0,
              textDecoration: 'none',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            REGISTER ON UNSTOP →
          </motion.a>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.75rem',
            color: '#555',
            marginTop: '0.8rem',
          }}>
            Free to register · No experience required
          </p>
        </div>

        {/* f) Countdown reminder */}
        <div className="reg-anim" style={{
          marginTop: '2.5rem',
          border: '2px solid #333',
          background: '#111',
          padding: '1rem 2rem',
          display: 'inline-block',
        }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: '#555',
            display: 'block',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
          }}>
            REGISTRATIONS CLOSING IN
          </span>
          <MiniCountdown />
        </div>

      </div>
    </section>
  )
}
