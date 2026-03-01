import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { tracks } from '../data/tracks'

gsap.registerPlugin(ScrollTrigger)

// ─── Marquee ──────────────────────────────────────────────────────────────────

function Marquee() {
  const text = 'DARE TO COMPETE · DARE TO COMPETE · DARE TO COMPETE · '
  return (
    <div style={{
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      marginBottom: '3rem',
      pointerEvents: 'none',
      userSelect: 'none',
    }}>
      <div className="prizes-marquee" style={{ display: 'inline-block' }}>
        <span style={{
          fontFamily: "'Bangers', cursive",
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          color: 'transparent',
          WebkitTextStroke: '1px #333',
          letterSpacing: '0.05em',
        }}>{text}</span>
        <span style={{
          fontFamily: "'Bangers', cursive",
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          color: 'transparent',
          WebkitTextStroke: '1px #333',
          letterSpacing: '0.05em',
        }}>{text}</span>
      </div>
    </div>
  )
}

// ─── Stat Box ─────────────────────────────────────────────────────────────────

function StatBox({ num, label }) {
  return (
    <div style={{
      border: '1px solid #333',
      padding: '0.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.15rem',
    }}>
      <span style={{ fontFamily: "'Bangers', cursive", fontSize: '1.5rem', color: '#FFE600', lineHeight: 1 }}>{num}</span>
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
    </div>
  )
}

// ─── Grand Prize Panel ────────────────────────────────────────────────────────

function GrandPrize({ sectionRef }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      animate={inView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.8, opacity: 0, y: 60 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      style={{
        maxWidth: '700px',
        margin: '0 auto 4rem',
        background: '#111',
        border: '4px solid #FFE600',
        boxShadow: '8px 8px 0 #FFE600',
        padding: '3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ribbon badge */}
      <div style={{
        position: 'absolute',
        top: '28px',
        left: '-28px',
        background: '#FF2D55',
        color: '#F5F5F5',
        fontFamily: "'Bangers', cursive",
        fontSize: '0.9rem',
        letterSpacing: '0.1em',
        padding: '0.3rem 2.5rem',
        transform: 'rotate(-45deg)',
        boxShadow: '2px 2px 0 #000',
        zIndex: 2,
        whiteSpace: 'nowrap',
      }}>
        GRAND PRIZE
      </div>

      {/* Trophy icon */}
      <div style={{
        fontFamily: "'Bangers', cursive",
        fontSize: '5rem',
        color: '#FFE600',
        textAlign: 'center',
        lineHeight: 1,
        textShadow: '0 0 30px rgba(255,230,0,0.5)',
        display: 'block',
      }}>◈</div>

      {/* Label */}
      <div style={{
        fontFamily: "'Bangers', cursive",
        fontSize: '0.9rem',
        letterSpacing: '0.3em',
        color: '#FF2D55',
        textAlign: 'center',
        marginTop: '0.5rem',
      }}>
        GRAND PRIZE
      </div>

      {/* Prize value */}
      <div style={{
        fontFamily: "'Bangers', cursive",
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        color: '#F5F5F5',
        textAlign: 'center',
        lineHeight: 1.1,
        marginTop: '0.5rem',
      }}>
        Worth Fighting For
      </div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.8rem',
        color: '#555',
        textAlign: 'center',
        marginTop: '0.5rem',
      }}>
        Cash Prize + Certificate + Goodies · Exact amount dropping soon
      </div>

      {/* Stat boxes */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '2rem',
        flexWrap: 'wrap',
      }}>
        <StatBox num="24" label="HRS" />
        <StatBox num="2–5" label="MEMBERS" />
        <StatBox num="∞" label="IDEAS" />
      </div>
    </motion.div>
  )
}

// ─── Track Prize Card ─────────────────────────────────────────────────────────

function TrackCard({ track }) {
  const borderColor   = `${track.primaryColor}66`
  const shadowColor   = `${track.primaryColor}4d`

  return (
    <div
      className="prize-track-card"
      style={{
        background: '#111',
        border: `2px solid ${borderColor}`,
        boxShadow: `4px 4px 0 ${shadowColor}`,
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Universe label */}
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        color: track.primaryColor,
        textTransform: 'uppercase',
      }}>
        {track.universeLabel}
      </div>

      {/* Track name */}
      <div style={{
        fontFamily: "'Bangers', cursive",
        fontSize: '1.3rem',
        color: '#F5F5F5',
        marginTop: '0.25rem',
        letterSpacing: '0.03em',
      }}>
        {track.name}
      </div>

      {/* Prize description */}
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.85rem',
        color: '#888',
        marginTop: '0.75rem',
      }}>
        Cash Prize + Certificate + Goodies
      </div>

      {/* Divider */}
      <div style={{
        margin: '1rem 0',
        position: 'relative',
        borderTop: '1px solid #222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          position: 'absolute',
          background: '#111',
          padding: '0 0.5rem',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          color: '#333',
          textTransform: 'uppercase',
        }}>
          TRACK PRIZE
        </span>
      </div>

      {/* Runner up */}
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.75rem',
        color: '#555',
        marginTop: '0.5rem',
      }}>
        Runner Up: <span style={{ color: '#888' }}>Merch + Certificate</span>
      </div>

      {/* Bottom accent bar */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '3px',
        background: track.primaryColor,
      }} />
    </div>
  )
}

// ─── Prizes ───────────────────────────────────────────────────────────────────

export default function Prizes() {
  const sectionRef  = useRef(null)
  const labelRef    = useRef(null)
  const cardsRef    = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Background color shift
      gsap.to(sectionRef.current, {
        backgroundColor: '#FFE600',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'center 40%',
          scrub: true,
        },
      })
      gsap.to(sectionRef.current, {
        backgroundColor: '#0A0A0A',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center 40%',
          end: 'bottom 60%',
          scrub: true,
        },
      })

      // Label color shift
      const labelEls = labelRef.current?.querySelectorAll('.prizes-label-text')
      if (labelEls) {
        gsap.to(labelEls, {
          color: '#0A0A0A',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'center 40%',
            scrub: true,
          },
        })
        gsap.to(labelEls, {
          color: '#F5F5F5',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'center 40%',
            end: 'bottom 60%',
            scrub: true,
          },
        })
      }

      // Track cards stagger
      const cards = cardsRef.current?.querySelectorAll('.prize-track-card')
      if (cards) {
        gsap.from(cards, {
          y: 60, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="prizes"
      ref={sectionRef}
      style={{
        background: '#0A0A0A',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
      }}
    >
      {/* Corner decorations */}
      <div style={{
        position: 'absolute', top: '-2rem', right: '-1rem',
        fontFamily: "'Bangers', cursive", fontSize: '15rem',
        color: '#FFE600', opacity: 0.03,
        pointerEvents: 'none', lineHeight: 1,
        animation: 'prizes-q-rotate 8s ease-in-out infinite alternate',
      }}>?</div>
      <div style={{
        position: 'absolute', bottom: '-2rem', left: '-1rem',
        fontFamily: "'Bangers', cursive", fontSize: '15rem',
        color: '#FFE600', opacity: 0.03,
        pointerEvents: 'none', lineHeight: 1,
        animation: 'prizes-bang-rotate 8s ease-in-out infinite alternate',
      }}>!</div>

      {/* Section label */}
      <div ref={labelRef} style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div className="prizes-label-text" style={{
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
        <div className="prizes-label-text" style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '1rem',
          color: '#444',
          letterSpacing: '0.2em',
        }}>
          WHAT'S AT STAKE
        </div>
      </div>

      {/* Marquee */}
      <Marquee />

      {/* Grand prize */}
      <GrandPrize sectionRef={sectionRef} />

      {/* Track prize cards */}
      <div
        ref={cardsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
        className="prizes-grid"
      >
        {tracks.map(track => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>

      {/* Participation tier strip */}
      <div style={{
        background: '#111',
        borderTop: '2px solid #222',
        borderBottom: '2px solid #222',
        padding: '1.2rem 2rem',
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontFamily: "'Bangers', cursive", fontSize: '1rem', color: '#F5F5F5', letterSpacing: '0.05em' }}>
            ALL ROUND 2 PARTICIPANTS
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.8rem', color: '#888', marginTop: '0.2rem' }}>
            Merch + Certificate of Participation
          </div>
        </div>
        <div style={{ width: '1px', background: '#333', alignSelf: 'stretch' }} />
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontFamily: "'Bangers', cursive", fontSize: '1rem', color: '#F5F5F5', letterSpacing: '0.05em' }}>
            ALL ROUND 1 PARTICIPANTS
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.8rem', color: '#888', marginTop: '0.2rem' }}>
            Certificate of Participation
          </div>
        </div>
      </div>

      <style>{`
        @keyframes prizes-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .prizes-marquee {
          animation: prizes-marquee 20s linear infinite;
          white-space: nowrap;
        }
        @keyframes prizes-q-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(10deg); }
        }
        @keyframes prizes-bang-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-10deg); }
        }
        @media (max-width: 1023px) {
          .prizes-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .prizes-participation { flex-direction: column !important; }
        }
      `}</style>
    </section>
  )
}
