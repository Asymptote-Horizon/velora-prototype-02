import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { faqs } from '../data/faqs'
import mumbaiSvg from '../assets/landscape/spiderverse_mumbai.svg'

gsap.registerPlugin(ScrollTrigger)

// ─── Answer Text ──────────────────────────────────────────────────────────────
// Renders answer string; wraps "TBA" occurrences in redacted styling

function AnswerText({ text }) {
  // Split on TBA (standalone word), preserve surrounding text
  const parts = text.split(/(TBA)/g)
  return (
    <p style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '0.9rem',
      color: '#AAAAAA',
      lineHeight: 1.8,
      margin: 0,
    }}>
      {parts.map((part, i) =>
        part === 'TBA' ? (
          <span key={i} style={{
            background: '#1A1A1A',
            color: '#444',
            padding: '0 0.3rem',
            borderRadius: '2px',
            fontStyle: 'italic',
          }}>TBA</span>
        ) : part
      )}
    </p>
  )
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FAQItem({ faq, index, isOpen, onToggle }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <div style={{ position: 'relative', marginBottom: '0.75rem' }}>

      {/* Question row */}
      <motion.button
        layout
        onClick={onToggle}
        className="faq-question-btn"
        style={{
          width: '100%',
          background: isOpen ? '#161616' : '#111',
          border: `2px solid ${isOpen ? '#FF2D55' : '#222'}`,
          borderBottom: isOpen ? '2px solid #FF2D55' : '2px solid #222',
          padding: '1.2rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          borderRadius: 0,
          minHeight: '48px',
          textAlign: 'left',
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
      >
        {/* Left: bullet + number + question */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 1, minWidth: 0 }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#FF2D55',
            flexShrink: 0,
            marginRight: '1rem',
          }} />
          <span style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '0.85rem',
            color: '#FF2D55',
            marginRight: '0.8rem',
            letterSpacing: '0.05em',
            flexShrink: 0,
          }}>
            Q{num}
          </span>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.95rem',
            color: '#F5F5F5',
            fontWeight: 500,
            lineHeight: 1.4,
          }}>
            {faq.question}
          </span>
        </div>

        {/* Right: toggle icon */}
        <span style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '1.5rem',
          color: '#FF2D55',
          flexShrink: 0,
          marginLeft: '1rem',
          lineHeight: 1,
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>
          +
        </span>
      </motion.button>

      {/* Answer area */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              background: '#161616',
              border: '2px solid #FF2D55',
              borderTop: 'none',
              padding: '1.2rem 1.5rem 1.2rem 3.5rem',
              position: 'relative',
            }}>
              {/* Speech bubble tail — upward triangle */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '2rem',
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '8px solid #FF2D55',
              }} />

              <AnswerText text={faq.answer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .faq-question-btn:hover {
          border-color: #FF2D55 !important;
          background: #161616 !important;
        }
      `}</style>
    </div>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export default function FAQ() {
  const [activeId, setActiveId] = useState(null)

  const sectionRef  = useRef(null)
  const labelRef    = useRef(null)
  const listRef     = useRef(null)
  const contactRef  = useRef(null)

  function handleToggle(id) {
    setActiveId(prev => (prev === id ? null : id))
  }

  useGSAP(() => {
    const ctx = gsap.context(() => {

      gsap.from(labelRef.current, {
        y: 30, opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      gsap.from(listRef.current, {
        y: 40, opacity: 0, duration: 0.6, delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      gsap.from(contactRef.current, {
        y: 30, opacity: 0, duration: 0.6, delay: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{
        background: '#0A0A0A',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(5rem, 8vw, 10rem) clamp(1.5rem, 4vw, 4rem)',
      }}
    >
      {/* Spider-Verse Mumbai landscape background */}
      <img
        src={mumbaiSvg}
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
          opacity: 0.10,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none',
        }}
      />

      {/* Halftone overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
        backgroundSize: '6px 6px',
        opacity: 0.03,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

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
            ISSUE #06
          </div>
          <div style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '1rem',
            color: '#444',
            letterSpacing: '0.2em',
          }}>
            NEED ANSWERS?
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
          Every dimension has questions. We have answers.
        </p>

        {/* FAQ list — comic panel frame */}
        <div
          ref={listRef}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative',
            border: '2px solid #1A1A1A',
            boxShadow: '8px 8px 0 #111',
            padding: '2rem',
          }}
        >
          {/* Panel label top-left */}
          <div style={{
            position: 'absolute',
            top: '-0.6rem',
            left: '1rem',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: '#333',
            background: '#0A0A0A',
            padding: '0 0.5rem',
            textTransform: 'uppercase',
          }}>
            FAQ TRANSMISSION
          </div>

          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              index={i}
              isOpen={activeId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>

        {/* Contact strip */}
        <div ref={contactRef} style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.85rem',
            color: '#555',
            marginBottom: '0.8rem',
          }}>
            Still have questions?
          </p>
          <a
            href="mailto:cipherit.mitaoe@gmail.com"
            className="faq-contact-btn"
            style={{
              display: 'inline-block',
              border: '2px solid #333',
              color: '#555',
              background: 'transparent',
              fontFamily: "'Bangers', cursive",
              fontSize: '1rem',
              letterSpacing: '0.1em',
              padding: '0.5rem 1.5rem',
              borderRadius: 0,
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, color 0.2s ease',
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
            CONTACT CIPHER →
          </a>
        </div>

      </div>
    </section>
  )
}
