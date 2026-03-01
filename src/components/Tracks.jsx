import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { tracks } from '../data/tracks'
import newYorkClassicSvg from '../assets/landscape/spiderverse_new_york_classic.svg'

gsap.registerPlugin(ScrollTrigger)

// ─── Universe Card ────────────────────────────────────────────────────────────

function UniverseCard({ track, index }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const isTBA   = track.problemStatement === 'TBA'

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
    if (glowRef.current) {
      glowRef.current.style.background =
        `radial-gradient(circle 200px at ${x}px ${y}px, ${track.primaryColor}14, transparent 70%)`
    }
  }, [track.primaryColor])

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.background = 'transparent'
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className="universe-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02,
        y: -6,
        boxShadow: '10px 10px 0 #000',
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#111',
        border: '3px solid #000',
        boxShadow: '6px 6px 0 #000',
        minHeight: '320px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Layer 1 — color wash */}
      <div
        className="card-wash"
        style={{
          position: 'absolute', inset: 0,
          background: track.primaryColor,
          opacity: 0.07,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Layer 2 — diagonal corner accent */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '120px', height: '120px',
        clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        background: track.primaryColor,
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Layer 4 — cursor glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'background 0.1s',
        }}
      />

      {/* Watermark number */}
      <div style={{
        position: 'absolute',
        bottom: '-1rem',
        right: '1rem',
        fontFamily: "'Bangers', cursive",
        fontSize: '8rem',
        color: '#ffffff',
        opacity: 0.03,
        pointerEvents: 'none',
        zIndex: 1,
        lineHeight: 1,
        userSelect: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Layer 3 — card content */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}>

        {/* Universe label */}
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          color: track.primaryColor,
          opacity: 0.8,
          textTransform: 'uppercase',
        }}>
          {track.universeLabel}
        </div>

        {/* Divider */}
        <hr style={{
          border: 'none',
          borderTop: `1px solid ${track.primaryColor}`,
          opacity: 0.2,
          margin: '0.5rem 0',
        }} />

        {/* Track name */}
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: '#F5F5F5',
          lineHeight: 1,
          marginTop: '0.5rem',
          letterSpacing: '0.03em',
        }}>
          {track.name}
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.85rem',
          color: '#888',
          marginTop: '0.5rem',
          fontStyle: 'italic',
        }}>
          {track.tagline}
        </div>

        {/* Problem statement */}
        <div style={{
          background: '#1A1A1A',
          border: '1px solid #333',
          padding: '0.4rem 0.8rem',
          marginTop: '1.5rem',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.8rem',
          color: isTBA ? '#FF2D55' : '#AAAAAA',
          opacity: isTBA ? 0.6 : 1,
          letterSpacing: isTBA ? '0.05em' : 0,
        }}>
          {isTBA ? '▓▓▓▓▓▓▓▓▓▓▓ CLASSIFIED ▓▓▓▓▓▓▓▓▓▓▓' : track.problemStatement}
        </div>

        {/* Spacer */}
        <div style={{ flexGrow: 1 }} />

        {/* Bottom row or transmission strip */}
        {isTBA ? (
          <div style={{
            marginTop: '1.5rem',
            marginLeft: '-2rem',
            marginRight: '-2rem',
            marginBottom: '-2rem',
            background: `${track.primaryColor}1a`,
            borderTop: `1px solid ${track.primaryColor}4d`,
            color: track.primaryColor,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textAlign: 'center',
            padding: '0.4rem',
          }}>
            ◈ TRANSMISSION INCOMING ◈
          </div>
        ) : (
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #222',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.75rem',
              color: '#555',
            }}>
              PRIZE: {track.prizes === 'TBA' ? '████████' : track.prizes}
            </span>
            <EnterButton color={track.primaryColor} />
          </div>
        )}
      </div>

      {/* Hover wash intensifier (CSS handles via sibling + group hover) */}
      <style>{`
        .universe-card:hover .card-wash { opacity: 0.15 !important; }
        @media (hover: none) {
          .universe-card:hover { transform: none !important; }
        }
        @media (max-width: 1023px) {
          .universe-card { min-height: 280px !important; }
        }
      `}</style>
    </motion.div>
  )
}

function EnterButton({ color }) {
  return (
    <button
      onMouseEnter={e => {
        e.currentTarget.style.background = color
        e.currentTarget.style.color = '#0A0A0A'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = color
      }}
      style={{
        background: 'transparent',
        border: `2px solid ${color}`,
        color: color,
        fontFamily: "'Bangers', cursive",
        fontSize: '0.9rem',
        letterSpacing: '0.1em',
        padding: '0.4rem 1rem',
        borderRadius: 0,
        cursor: 'pointer',
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      ENTER UNIVERSE →
    </button>
  )
}

// ─── Tracks ───────────────────────────────────────────────────────────────────

export default function Tracks() {
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const gridRef    = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {

      gsap.from(labelRef.current, {
        y: 30, opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })

      const cards = gridRef.current.querySelectorAll('.universe-card')
      gsap.from(cards, {
        y: 80, opacity: 0,
        rotation: (i) => (i % 2 === 0 ? 2 : -2),
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 70%' },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="tracks"
      ref={sectionRef}
      style={{
        background: '#0D0D0D',
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.01) 10px, rgba(255,255,255,0.01) 11px)',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* NYC Classic landscape background */}
      <img
        src={newYorkClassicSvg}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          minHeight: '55%',
          objectFit: 'cover',
          objectPosition: 'bottom center',
          opacity: 0.09,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none',
        }}
      />

      {/* Content — sits above landscape bg */}
      <div style={{ position: 'relative', zIndex: 1 }}>

      {/* Section label */}
      <div ref={labelRef} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          color: '#FF2D55',
          textTransform: 'uppercase',
          fontWeight: 700,
          borderBottom: '2px solid #FF2D55',
          display: 'inline-block',
          paddingBottom: '0.2rem',
          marginBottom: '0.4rem',
        }}>
          ISSUE #02
        </div>
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '1rem',
          color: '#444',
          letterSpacing: '0.2em',
        }}>
          THE MULTIVERSE
        </div>
      </div>

      {/* Intro text */}
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '1rem',
        color: '#888',
        lineHeight: 1.8,
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto 4rem',
      }}>
        Every hacker comes from a different dimension. Different skills. Different universes. Pick yours.
      </p>

      {/* Grid */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
        }}
        className="tracks-grid"
      >
        {tracks.map((track, i) => (
          <UniverseCard key={track.id} track={track} index={i} />
        ))}
      </div>

      </div>{/* end content wrapper */}

      <style>{`
        @media (max-width: 1023px) {
          .tracks-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
