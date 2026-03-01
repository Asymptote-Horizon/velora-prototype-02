import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Static copy ──────────────────────────────────────────────────────────────

const PANELS = [
  {
    num:     '01',
    accent:  '#FF2D55',
    icon:    { text: 'V', size: '4rem', color: '#FF2D55', shadow: '2px 2px 0 #00D4FF, -1px -1px 0 #FFE600' },
    heading: 'WHAT IS VELORA?',
    body:    'Velora is a 24-hour hackathon where students from across India collide in one dimension to build, break, and create. One day. One shot. Infinite possibilities.',
    action:  { word: 'POW!', bg: '#FF2D55', color: '#F5F5F5', rotate: '-8deg' },
  },
  {
    num:     '02',
    accent:  '#00D4FF',
    icon:    { text: '{ }', size: '3.5rem', color: '#00D4FF', shadow: 'none' },
    heading: 'WHAT IS CIPHER?',
    body:    'Cipher is the IT Students Executive Council of MIT Academy of Engineering, Alandi. We are the ones who build the stage — and Velora is our first act.',
    action:  { word: 'ZAP!', bg: '#00D4FF', color: '#0A0A0A', rotate: '6deg' },
  },
  {
    num:     '03',
    accent:  '#FFE600',
    icon:    { text: '1.0', size: '3.5rem', color: '#FFE600', shadow: 'none' },
    heading: 'VELORA 1.0',
    body:    'Every legend has a first chapter. This is ours. Velora 1.0: Dare to Compete is the beginning of an annual tradition — and the moment Cipher steps into the arena.',
    action:  { word: 'BOOM!', bg: '#FFE600', color: '#0A0A0A', rotate: '-5deg' },
  },
]

// ─── Starburst ────────────────────────────────────────────────────────────────

function Starburst({ word, bg, color, rotate }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '1rem',
      right: '1rem',
      width: '60px',
      height: '60px',
      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: `rotate(${rotate})`,
    }}>
      <span style={{
        fontFamily: "'Bangers', cursive",
        fontSize: '0.75rem',
        color,
        letterSpacing: '0.05em',
        transform: `rotate(${rotate === '-8deg' ? '8deg' : rotate === '6deg' ? '-6deg' : '5deg'})`,
      }}>
        {word}
      </span>
    </div>
  )
}

// ─── Comic Panel ──────────────────────────────────────────────────────────────

function ComicPanel({ panel, className }) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -6,
        boxShadow: '10px 10px 0px #000000',
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      style={{
        background: '#111111',
        border: '3px solid #000000',
        boxShadow: '6px 6px 0px #000000',
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Colored top accent */}
      <div style={{ height: '4px', background: panel.accent, flexShrink: 0 }} />

      {/* Panel number tag */}
      <div style={{
        position: 'absolute',
        top: '4px',
        left: 0,
        background: '#FFE600',
        color: '#0A0A0A',
        fontFamily: "'Bangers', cursive",
        fontSize: '0.8rem',
        letterSpacing: '0.05em',
        padding: '0.1rem 0.4rem',
        lineHeight: 1.4,
      }}>
        {panel.num}
      </div>

      {/* Inner content */}
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>

        {/* Icon */}
        <div style={{ textAlign: 'center', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{
            fontFamily: "'Bangers', cursive",
            fontSize: panel.icon.size,
            color: panel.icon.color,
            textShadow: panel.icon.shadow,
            lineHeight: 1,
          }}>
            {panel.icon.text}
          </span>
        </div>

        {/* Heading */}
        <h3 style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '1.6rem',
          color: '#F5F5F5',
          letterSpacing: '0.05em',
          marginTop: '0.5rem',
          marginBottom: '0.75rem',
        }}>
          {panel.heading}
        </h3>

        {/* Body */}
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.9rem',
          lineHeight: 1.7,
          color: '#AAAAAA',
          flexGrow: 1,
          marginBottom: '3rem', // room for starburst
        }}>
          {panel.body}
        </p>

        {/* Starburst */}
        <Starburst {...panel.action} />
      </div>
    </motion.div>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

export default function About() {
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const panelsRef  = useRef(null)
  const stripRef   = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {

      // Section label
      gsap.from(labelRef.current, {
        y: 30, opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      // Panels stagger
      const panels = panelsRef.current.querySelectorAll('.about-panel')
      gsap.from(panels, {
        y: 60, opacity: 0, rotation: -3, duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: panelsRef.current, start: 'top 75%' },
      })

      // Caption strip
      gsap.from(stripRef.current, {
        y: 40, opacity: 0, duration: 0.6, delay: 0.5,
        scrollTrigger: { trigger: stripRef.current, start: 'top 90%' },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: '#0A0A0A',
        position: 'relative',
        overflow: 'hidden',
      }}
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

      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)' }}>

        {/* Section label */}
        <div ref={labelRef} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
            ISSUE #01
          </div>
          <div style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '1rem',
            color: '#444',
            letterSpacing: '0.2em',
          }}>
            ORIGIN STORY
          </div>
        </div>

        {/* Panels */}
        <div
          ref={panelsRef}
          style={{
            display: 'flex',
            gap: 0,
            alignItems: 'stretch',
          }}
          className="about-panels-container"
        >
          {PANELS.map((panel, i) => (
            <div key={panel.num} style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
              <ComicPanel panel={panel} className="about-panel" />
              {/* Vertical divider between panels */}
              {i < PANELS.length - 1 && (
                <div style={{ width: '1px', background: '#222', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>

        {/* Caption strip */}
        <div
          ref={stripRef}
          className="about-caption-strip"
          style={{
            marginTop: '3rem',
            background: '#FFE600',
            color: '#0A0A0A',
            padding: '0.8rem 1rem',
            borderTop: '3px solid #000',
            borderBottom: '3px solid #000',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 600,
            textAlign: 'center',
            letterSpacing: '0.02em',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.2rem 0',
          }}
        >
          <span className="caption-item">Open to all college students</span>
          <span className="caption-dot" style={{ color: '#FF2D55', fontSize: '1.1rem', margin: '0 0.5rem' }}>·</span>
          <span className="caption-item">Teams of 2–5</span>
          <span className="caption-dot" style={{ color: '#FF2D55', fontSize: '1.1rem', margin: '0 0.5rem' }}>·</span>
          <span className="caption-item">Free to participate</span>
          <span className="caption-dot" style={{ color: '#FF2D55', fontSize: '1.1rem', margin: '0 0.5rem' }}>·</span>
          <span className="caption-item">MITAOE, Alandi</span>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1023px) {
          .about-panels-container {
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .about-panels-container > div {
            flex-direction: column !important;
          }
          .about-panels-container > div > div[style*="width: 1px"] {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .about-caption-strip {
            flex-direction: column !important;
            gap: 0.15rem !important;
            padding: 0.6rem 1rem !important;
            font-size: 0.8rem !important;
          }
          .about-caption-strip .caption-dot {
            display: none;
          }
          .about-caption-strip .caption-item {
            display: block;
          }
        }
      `}</style>
    </section>
  )
}
