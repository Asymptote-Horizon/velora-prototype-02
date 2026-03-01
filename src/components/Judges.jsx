import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { judges } from '../data/judges'

gsap.registerPlugin(ScrollTrigger)

// ─── Trading Card ─────────────────────────────────────────────────────────────

function JudgeCard({ judge, index }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      className="judge-card"
      whileHover={{
        y: -8,
        boxShadow: judge.isClassified
          ? '10px 10px 0 #000, 0 0 20px rgba(255,45,85,0.08)'
          : '10px 10px 0 #000',
        borderColor: '#FF2D55',
        transition: { type: 'spring', stiffness: 250, damping: 18 },
      }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#111',
        border: '3px solid #222',
        boxShadow: judge.isClassified
          ? '6px 6px 0 #000, 0 0 20px rgba(255,45,85,0.05)'
          : '6px 6px 0 #000',
        minHeight: '380px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Layer 1 — Top color band */}
      <div style={{
        height: '8px',
        flexShrink: 0,
        background: 'linear-gradient(to right, #FF2D55, #00D4FF)',
      }} />

      {/* Layer 3 — Card number diamond badge */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '16px',
        width: '32px',
        height: '32px',
        background: '#FF2D55',
        transform: 'rotate(45deg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
      }}>
        <span style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '0.75rem',
          color: '#F5F5F5',
          transform: 'rotate(-45deg)',
          lineHeight: 1,
        }}>
          {num}
        </span>
      </div>

      {/* Layer 2 — Photo area */}
      <div style={{
        position: 'relative',
        height: '170px',
        flexShrink: 0,
        background: judge.isClassified
          ? 'repeating-linear-gradient(45deg, #1A1A1A 0px, #1A1A1A 10px, #141414 10px, #141414 20px)'
          : '#1A1A1A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '0.4rem',
        overflow: 'hidden',
      }}>
        {judge.photo && !judge.isClassified ? (
          <img
            src={judge.photo}
            alt={judge.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'contrast(1.2) saturate(0.7)',
              transition: 'transform 0.4s ease',
            }}
            className="judge-photo"
          />
        ) : (
          <>
            <span style={{
              fontFamily: "'Bangers', cursive",
              fontSize: '5rem',
              color: '#333',
              lineHeight: 1,
            }}>?</span>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: '#333',
              textTransform: 'uppercase',
            }}>
              IDENTITY CLASSIFIED
            </span>
          </>
        )}

        {/* Classified stamp overlay on photo */}
        {judge.isClassified && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(15deg)',
            border: '2px solid #FF2D55',
            color: '#FF2D55',
            fontFamily: "'Bangers', cursive",
            fontSize: '1.2rem',
            letterSpacing: '0.2em',
            padding: '0.2rem 0.6rem',
            opacity: 0.25,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 3,
          }}>
            CLASSIFIED
          </div>
        )}

        {/* Fade to card bg at bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '40px',
          background: 'linear-gradient(to bottom, transparent, #111)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />
      </div>

      {/* Layer 4 — Content */}
      <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>

        {/* Name */}
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '1.4rem',
          color: '#F5F5F5',
          lineHeight: 1.1,
          letterSpacing: '0.03em',
        }}>
          {judge.isClassified ? `AGENT ${num}` : judge.name}
        </div>

        {/* Title + Institution */}
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.75rem',
          color: '#666',
          marginTop: '0.2rem',
          lineHeight: 1.4,
        }}>
          {judge.isClassified
            ? 'CLEARANCE: LEVEL ?'
            : `${judge.title}${judge.institution ? ` · ${judge.institution}` : ''}`}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #222', margin: '0.8rem 0' }} />

        {/* Superpower badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: '#1A1A1A',
          border: `1px solid ${judge.isClassified ? '#333' : 'rgba(255,45,85,0.4)'}`,
          padding: '0.3rem 0.8rem',
          alignSelf: 'flex-start',
        }}>
          <div style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: judge.isClassified ? '#444' : '#FF2D55',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.7rem',
            color: judge.isClassified ? '#444' : '#FF2D55',
            letterSpacing: '0.05em',
          }}>
            {judge.isClassified ? 'SUPERPOWER: REDACTED' : judge.superpower}
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flexGrow: 1 }} />

        {/* Card footer */}
        <div style={{
          background: '#0D0D0D',
          padding: '0.6rem 1.2rem',
          margin: '1rem -1.2rem -1.2rem',
          borderTop: '1px solid #1A1A1A',
          boxShadow: 'inset 4px 0 0 #1A1A1A, inset 8px 0 0 #111, inset 12px 0 0 #1A1A1A',
        }}>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: '#333',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}>
            VELORA 1.0 · JUDGE
          </div>
        </div>
      </div>

      <style>{`
        .judge-card:hover .judge-photo { transform: scale(1.05); }
      `}</style>
    </motion.div>
  )
}

// ─── Judges ───────────────────────────────────────────────────────────────────

export default function Judges() {
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const gridRef    = useRef(null)
  const ctaRef     = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {

      gsap.from(labelRef.current, {
        y: 30, opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })

      const cards = gridRef.current.querySelectorAll('.judge-card')
      gsap.from(cards, {
        y: 50, opacity: 0,
        rotation: (i) => (i % 2 === 0 ? 2 : -2),
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 70%' },
      })

      gsap.from(ctaRef.current, {
        y: 30, opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="judges"
      ref={sectionRef}
      style={{
        background: '#0D0D0D',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
      }}
    >
      {/* Section label */}
      <div ref={labelRef} style={{ textAlign: 'center', marginBottom: '1rem' }}>
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
          ISSUE #05
        </div>
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '1rem',
          color: '#444',
          letterSpacing: '0.2em',
        }}>
          THE COUNCIL
        </div>
      </div>

      {/* Subtitle */}
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.9rem',
        color: '#555',
        textAlign: 'center',
        marginBottom: '4rem',
      }}>
        The minds that will decide your fate.
      </p>

      {/* Grid */}
      <div
        ref={gridRef}
        className="judges-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          marginBottom: '3rem',
        }}
      >
        {judges.map((judge, i) => (
          <JudgeCard key={judge.id} judge={judge} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div ref={ctaRef} style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.85rem',
          color: '#555',
          marginBottom: '0.8rem',
        }}>
          Are you an industry expert? Join the council.
        </p>
        <button
          className="judge-cta-btn"
          style={{
            border: '2px solid #333',
            color: '#555',
            background: 'transparent',
            fontFamily: "'Bangers', cursive",
            fontSize: '1rem',
            letterSpacing: '0.1em',
            padding: '0.5rem 1.5rem',
            borderRadius: 0,
            cursor: 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#FF2D55'
            e.currentTarget.style.color = '#FF2D55'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#333'
            e.currentTarget.style.color = '#555'
          }}
        >
          Become a Judge →
        </button>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .judges-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 639px) {
          .judges-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
