import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline } from '../data/timeline'

gsap.registerPlugin(ScrollTrigger)

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_COLOR = {
  completed: '#00D4FF',
  active:    '#FF2D55',
  upcoming:  '#444444',
}

function statusPhaseColor(status) { return STATUS_COLOR[status] }

// ─── Starburst ────────────────────────────────────────────────────────────────

function Starburst({ word, status }) {
  const bg    = status === 'completed' ? '#00D4FF'
              : status === 'active'    ? '#FF2D55'
              : '#2A2A2A'
  const color = status === 'upcoming' ? '#555' : status === 'active' ? '#fff' : '#0A0A0A'

  return (
    <div
      className="tl-starburst"
      style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        width: '55px',
        height: '55px',
        clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{
        fontFamily: "'Bangers', cursive",
        fontSize: '0.65rem',
        color,
        letterSpacing: '0.02em',
        textAlign: 'center',
        lineHeight: 1.1,
        padding: '0 4px',
      }}>
        {word}
      </span>
    </div>
  )
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  if (status === 'completed') return (
    <span style={{
      display: 'inline-block',
      background: '#00D4FF',
      color: '#0A0A0A',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '0.65rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      padding: '0.15rem 0.5rem',
      marginTop: '0.75rem',
    }}>✓ COMPLETED</span>
  )
  if (status === 'active') return (
    <span style={{
      display: 'inline-block',
      background: '#FF2D55',
      color: '#F5F5F5',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '0.65rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      padding: '0.15rem 0.5rem',
      marginTop: '0.75rem',
    }}>
      <span className="live-dot">●</span> LIVE NOW
    </span>
  )
  return (
    <span style={{
      display: 'inline-block',
      border: '1px solid #444',
      color: '#444',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '0.65rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      padding: '0.15rem 0.5rem',
      marginTop: '0.75rem',
    }}>○ UPCOMING</span>
  )
}

// ─── Phase Panel ──────────────────────────────────────────────────────────────

function PhasePanel({ phase }) {
  const { status } = phase
  const phaseColor  = statusPhaseColor(status)
  const borderColor = status === 'completed' ? '#00D4FF'
                    : status === 'active'    ? '#FF2D55'
                    : '#333'
  const boxShadow   = status === 'completed' ? '5px 5px 0 #00D4FF'
                    : status === 'active'    ? '5px 5px 0 #FF2D55'
                    : '5px 5px 0 #222'
  const opacity     = status === 'upcoming' ? 0.7 : 1

  return (
    <div
      className={`tl-panel tl-panel--${status}`}
      style={{
        width: 'var(--tl-panel-width, 280px)',
        flexShrink: 0,
        background: '#111',
        border: `3px solid ${borderColor}`,
        boxShadow,
        padding: '1.5rem',
        position: 'relative',
        opacity,
      }}
    >
      {/* Active: NOW badge */}
      {status === 'active' && (
        <div style={{
          position: 'absolute',
          top: '0.6rem',
          right: '0.6rem',
          background: '#FF2D55',
          color: '#F5F5F5',
          fontFamily: "'Bangers', cursive",
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          padding: '0.2rem 0.5rem',
        }}>
          NOW
        </div>
      )}

      {/* Completed: DONE stamp */}
      {status === 'completed' && (
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%) rotate(-20deg)',
          border: '3px solid #00D4FF',
          color: '#00D4FF',
          fontFamily: "'Bangers', cursive",
          fontSize: '1.8rem',
          letterSpacing: '0.2em',
          padding: '0.3rem 0.8rem',
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: 5,
          whiteSpace: 'nowrap',
        }}>
          DONE
        </div>
      )}

      {/* Phase number */}
      <div style={{ fontFamily: "'Bangers', cursive", fontSize: '3rem', color: phaseColor, lineHeight: 1 }}>
        {phase.phase}
      </div>

      {/* Title */}
      <div style={{
        fontFamily: "'Bangers', cursive",
        fontSize: '1.2rem',
        color: '#F5F5F5',
        marginTop: '0.3rem',
        letterSpacing: '0.03em',
        lineHeight: 1.2,
        paddingRight: status === 'active' ? '2.5rem' : 0,
      }}>
        {phase.title}
      </div>

      {/* Date */}
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.75rem',
        color: phase.date === 'TBA' ? '#444' : '#555',
        marginTop: '0.2rem',
      }}>
        {phase.date === 'TBA' ? 'DATE TBA' : phase.date}
      </div>

      {/* Description */}
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.8rem',
        color: '#888',
        lineHeight: 1.6,
        marginTop: '0.8rem',
        paddingBottom: '2.5rem',
      }}>
        {phase.description}
      </div>

      <StatusBadge status={status} />
      <Starburst word={phase.actionWord} status={status} />
    </div>
  )
}

// ─── Connector (always horizontal) ────────────────────────────────────────────

function Connector({ prevStatus }) {
  const color = prevStatus === 'completed' ? '#00D4FF'
              : prevStatus === 'active'    ? '#FF2D55'
              : '#333'
  return (
    <div style={{
      width: '60px',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      height: '3px',
    }}>
      <div style={{ width: '100%', borderTop: `2px dashed ${color}` }} />
      <span style={{
        position: 'absolute',
        right: '-4px',
        color,
        fontFamily: 'monospace',
        fontSize: '1rem',
        lineHeight: 1,
        marginTop: '-1px',
      }}>›</span>
    </div>
  )
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

export default function Timeline() {
  const sectionRef  = useRef(null)
  const stripRef    = useRef(null)
  const labelRef    = useRef(null)
  const progressRef = useRef(null)
  const [hintVisible, setHintVisible] = useState(true)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Label fade-in (always)
      gsap.from(labelRef.current, {
        y: 30, opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      const strip   = stripRef.current
      const section = sectionRef.current
      const isMobile = window.innerWidth < 1024
      const scrubVal = isMobile ? 1.5 : 1

      function buildScrollTrigger() {
        // Kill existing horizontal ST if present
        const existing = ScrollTrigger.getById('tl-horizontal')
        if (existing) existing.kill()

        const travelDist = strip.scrollWidth - window.innerWidth

        const tween = gsap.to(strip, {
          x: -travelDist,
          ease: 'none',
          scrollTrigger: {
            id: 'tl-horizontal',
            trigger: section,
            start: 'top 10%',
            end: `+=${travelDist}`,
            scrub: scrubVal,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.width = `${self.progress * 100}%`
              }
              if (self.progress > 0.1) setHintVisible(false)
            },
          },
        })

        // Panel + starburst entrance animations
        const panels = strip.querySelectorAll('.tl-panel')
        panels.forEach((panel) => {
          gsap.from(panel, {
            opacity: 0, y: 20, duration: 0.5,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left 90%',
              toggleActions: 'play none none none',
            },
          })
          const star = panel.querySelector('.tl-starburst')
          if (star) {
            gsap.from(star, {
              scale: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'left 80%',
                toggleActions: 'play none none none',
              },
            })
          }
        })
      }

      // Delay measurement until after paint so scrollWidth is accurate
      const timer = setTimeout(buildScrollTrigger, 300)

      function onResize() {
        ScrollTrigger.refresh()
        clearTimeout(timer)
        setTimeout(buildScrollTrigger, 300)
      }
      window.addEventListener('resize', onResize)

      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', onResize)
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{ background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}
    >
      {/* Halftone overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
        backgroundSize: '6px 6px',
        opacity: 0.03,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem) clamp(3rem, 5vw, 5rem)',
      }}>

        {/* Section label */}
        <div ref={labelRef} style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
            ISSUE #03
          </div>
          <div style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '1rem',
            color: '#444',
            letterSpacing: '0.2em',
          }}>
            THE MISSION BRIEFING
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{ background: '#1A1A1A', height: '3px', marginBottom: '2.5rem', position: 'relative' }}
        >
          <div
            ref={progressRef}
            style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: '0%',
              background: '#FF2D55',
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {/* Strip */}
        <div
          ref={stripRef}
          className="tl-strip"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'visible',
            willChange: 'transform',
            paddingRight: '15vw',
          }}
        >
          {timeline.map((phase, i) => (
            <div key={phase.phase} style={{ display: 'flex', alignItems: 'center' }}>
              <PhasePanel phase={phase} />
              {i < timeline.length - 1 && <Connector prevStatus={phase.status} />}
            </div>
          ))}
        </div>

        {/* Hint — visible on mobile, hidden on desktop */}
        <div
          className="tl-hint"
          style={{
            textAlign: 'center',
            marginTop: '1rem',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: '#555',
            opacity: hintVisible ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          ↓ SCROLL TO PROGRESS →
        </div>
      </div>

      <style>{`
        @keyframes live-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .live-dot { animation: live-pulse 1s ease-in-out infinite; }

        @keyframes active-glow {
          0%   { box-shadow: 5px 5px 0 #FF2D55, 0 0 0 0 rgba(255,45,85,0.4); }
          70%  { box-shadow: 5px 5px 0 #FF2D55, 0 0 0 12px rgba(255,45,85,0); }
          100% { box-shadow: 5px 5px 0 #FF2D55, 0 0 0 0 rgba(255,45,85,0); }
        }
        .tl-panel--active { animation: active-glow 1.5s ease-out infinite; }

        /* Mobile: wider panels, show hint */
        @media (max-width: 1023px) {
          :root { --tl-panel-width: 85vw; }
          .tl-hint { display: block; }
        }

        /* Desktop: fixed-width panels, hide hint */
        @media (min-width: 1024px) {
          :root { --tl-panel-width: 280px; }
          .tl-hint { display: none !important; }
        }
      `}</style>
    </section>
  )
}
