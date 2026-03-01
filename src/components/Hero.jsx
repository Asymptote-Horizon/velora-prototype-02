import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Countdown ────────────────────────────────────────────────────────────────

const TARGET = new Date('2026-03-28T09:00:00').getTime()

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days:  Math.floor(diff / 86400000),
    hrs:   Math.floor((diff % 86400000) / 3600000),
    mins:  Math.floor((diff % 3600000)  / 60000),
    secs:  Math.floor((diff % 60000)    / 1000),
  }
}

// Single flip digit box
function FlipDigit({ value, label }) {
  const display = String(value).padStart(2, '0')

  return (
    <div style={{
      border: '2px solid #000',
      background: '#0A0A0A',
      boxShadow: '4px 4px 0 #FF2D55',
      padding: '0.8rem 1.2rem',
      minWidth: '80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'relative', height: '3rem' }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={display}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: '2.5rem',
              color: '#FFE600',
              lineHeight: '3rem',
              position: 'absolute',
              inset: 0,
            }}
          >
            {display}
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#888',
        marginTop: '0.25rem',
      }}>
        {label}
      </div>
    </div>
  )
}

function Countdown() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const sep = (
    <span style={{
      fontFamily: "'Bangers', cursive",
      fontSize: '2rem',
      color: '#FF2D55',
      alignSelf: 'center',
      marginBottom: '1.5rem',
      lineHeight: 1,
    }}>:</span>
  )

  return (
    <div className="hero-countdown" style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch' }}>
      <FlipDigit value={time.days} label="DAYS" />
      {sep}
      <FlipDigit value={time.hrs}  label="HRS"  />
      {sep}
      <FlipDigit value={time.mins} label="MINS" />
      {sep}
      <FlipDigit value={time.secs} label="SECS" />
    </div>
  )
}

// ─── City Skyline (Spider-Verse NYC aesthetic) ─────────────────────────────────

function CityScape() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '65%',
      zIndex: 2,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      {/* Far layer — distant tiny buildings */}
      <motion.svg
        viewBox="0 0 1440 300"
        preserveAspectRatio="xMidYMax meet"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', opacity: 0.14 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          fill="#1A1A4E"
          d="M0,300 L0,240 L40,240 L40,220 L70,220 L70,200 L90,200 L90,190 L110,190 L110,205 L140,205
             L140,185 L165,185 L165,170 L185,170 L185,165 L205,165 L205,175 L235,175 L235,195 L270,195
             L270,170 L295,170 L295,155 L315,155 L315,148 L335,148 L335,158 L360,158 L360,175 L400,175
             L400,155 L425,155 L425,140 L445,140 L445,133 L465,133 L465,143 L490,143 L490,165 L525,165
             L525,140 L550,140 L550,125 L570,125 L570,116 L590,116 L590,126 L615,126 L615,148 L650,148
             L650,125 L675,125 L675,108 L695,108 L695,100 L715,100 L715,110 L742,110 L742,130 L775,130
             L775,108 L800,108 L800,92 L820,92 L820,83 L840,83 L840,95 L868,95 L868,118 L900,118
             L900,95 L928,95 L928,78 L948,78 L948,68 L968,68 L968,80 L995,80 L995,105 L1030,105
             L1030,80 L1057,80 L1057,65 L1077,65 L1077,57 L1097,57 L1097,68 L1122,68 L1122,90 L1155,90
             L1155,68 L1178,68 L1178,85 L1208,85 L1208,110 L1245,110 L1245,90 L1270,90 L1270,108 L1305,108
             L1305,130 L1340,130 L1340,155 L1380,155 L1380,180 L1440,180 L1440,300 Z"
        />
      </motion.svg>

      {/* Mid layer — medium buildings */}
      <motion.svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax meet"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', opacity: 0.22 }}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <linearGradient id="mid-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D0D2E" />
            <stop offset="100%" stopColor="#080818" />
          </linearGradient>
        </defs>
        <path
          fill="url(#mid-grad)"
          d="M0,320 L0,260 L50,260 L50,220 L75,220 L75,185 L100,185 L100,155 L120,155 L120,130 L145,130
             L145,105 L165,105 L165,85 L185,85 L185,105 L215,105 L215,135 L255,135 L255,105 L280,105
             L280,75 L305,75 L305,50 L330,50 L330,30 L355,30 L355,50 L380,50 L380,85 L415,85 L415,120
             L455,120 L455,85 L480,85 L480,55 L505,55 L505,30 L530,30 L530,10 L555,10 L555,30 L580,30
             L580,65 L615,65 L615,100 L655,100 L655,65 L680,65 L680,35 L705,35 L705,15 L725,15 L725,35
             L752,35 L752,70 L790,70 L790,108 L830,108 L830,70 L858,70 L858,42 L883,42 L883,22 L903,22
             L903,42 L928,42 L928,80 L965,80 L965,42 L993,42 L993,18 L1015,18 L1015,0 L1038,0 L1038,18
             L1060,18 L1060,55 L1095,55 L1095,25 L1120,25 L1120,45 L1150,45 L1150,80 L1185,80 L1185,115
             L1225,115 L1225,85 L1252,85 L1252,105 L1285,105 L1285,140 L1325,140 L1325,175 L1365,175
             L1365,210 L1440,210 L1440,320 Z"
        />
        {/* Window lights */}
        {[
          [330,38],[345,38],[360,38],[330,22],[345,22],
          [530,17],[542,17],[530,3],
          [705,22],[715,22],[705,8],
          [883,28],[895,28],
          [1015,6],[1025,6],
          [1120,32],[1132,32],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width={5} height={7} fill="#FFE600" opacity={0.45} />
        ))}
        {[
          [165,90],[175,90],[165,104],
          [280,80],[292,80],
          [655,70],[667,70],
          [965,48],[977,48],
          [1225,92],[1237,92],
        ].map(([x, y], i) => (
          <rect key={`c${i}`} x={x} y={y} width={5} height={7} fill="#00D4FF" opacity={0.35} />
        ))}
      </motion.svg>

      {/* Near layer — foreground, darkest, largest */}
      <motion.svg
        viewBox="0 0 1440 340"
        preserveAspectRatio="xMidYMax meet"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', opacity: 0.48 }}
        animate={{ y: [0, -11, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          fill="#060612"
          d="M0,340 L0,255 L55,255 L55,210 L85,210 L85,170 L115,170 L115,125 L138,125 L138,90 L162,90
             L162,60 L188,60 L188,40 L208,40 L208,28 L228,28 L228,40 L248,40 L248,70 L285,70 L285,110
             L325,110 L325,70 L355,70 L355,35 L380,35 L380,12 L408,12 L408,0 L428,0 L428,12 L450,12
             L450,50 L488,50 L488,90 L525,90 L525,50 L555,50 L555,18 L580,18 L580,0 L602,0 L602,18
             L628,18 L628,55 L665,55 L665,95 L705,95 L705,55 L732,55 L732,25 L758,25 L758,8 L778,8
             L778,25 L802,25 L802,65 L840,65 L840,105 L878,105 L878,65 L908,65 L908,32 L935,32 L935,12
             L958,12 L958,0 L980,0 L980,18 L1005,18 L1005,58 L1042,58 L1042,22 L1068,22 L1068,0 L1090,0
             L1090,22 L1115,22 L1115,62 L1152,62 L1152,98 L1192,98 L1192,138 L1235,138 L1235,105 L1262,105
             L1262,128 L1300,128 L1300,168 L1342,168 L1342,205 L1385,205 L1385,238 L1440,238 L1440,340 Z"
        />
        {/* Water towers */}
        <ellipse cx="628" cy="52" rx="14" ry="9" fill="#0A0A1E" stroke="#1A1A3E" strokeWidth="1.5" />
        <rect x="621" y="52" width="14" height="18" fill="#0A0A1E" />
        <ellipse cx="980" cy="16" rx="16" ry="10" fill="#0A0A1E" stroke="#1A1A3E" strokeWidth="1.5" />
        <rect x="972" y="16" width="16" height="20" fill="#0A0A1E" />
        {/* Antenna masts */}
        <line x1="408" y1="0" x2="408" y2="-18" stroke="#1A1A3E" strokeWidth="2" />
        <line x1="408" y1="-18" x2="412" y2="-28" stroke="#1A1A3E" strokeWidth="1.5" />
        <line x1="1090" y1="0" x2="1090" y2="-15" stroke="#1A1A3E" strokeWidth="2" />
        {/* Window lights - cyan */}
        {[
          [162,65],[172,65],[162,80],[172,80],
          [188,45],[198,45],
          [408,15],[418,15],
          [580,5],[592,5],
          [758,12],[768,12],
          [958,5],[970,5],
          [1068,5],[1078,5],
        ].map(([x, y], i) => (
          <rect key={`cn${i}`} x={x} y={y} width={6} height={8} fill="#00D4FF" opacity={0.5} />
        ))}
        {/* Window lights - warm yellow */}
        {[
          [208,32],[218,32],[228,44],
          [450,18],[462,18],
          [732,30],[742,30],
          [935,18],[947,18],
          [1115,28],[1127,28],
          [1235,110],[1247,110],
        ].map(([x, y], i) => (
          <rect key={`yn${i}`} x={x} y={y} width={6} height={8} fill="#FFE600" opacity={0.45} />
        ))}
        {/* Red accent lights */}
        {[
          [162,95],[355,40],[602,5],[1090,5],
        ].map(([x, y], i) => (
          <circle key={`r${i}`} cx={x} cy={y} r={2} fill="#FF2D55" opacity={0.7} />
        ))}
      </motion.svg>
    </div>
  )
}

// ─── Web SVG lines ─────────────────────────────────────────────────────────────

const WEB_LINES = [
  { x2: 400, y2: 0   },
  { x2: 350, y2: 50  },
  { x2: 280, y2: 10  },
  { x2: 400, y2: 150 },
  { x2: 200, y2: 0   },
  { x2: 400, y2: 280 },
]

function WebLines() {
  return (
    <svg
      width="400" height="400"
      style={{ position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none', opacity: 0.3 }}
    >
      <style>{`
        @keyframes web-draw {
          from { stroke-dashoffset: 600; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
      {WEB_LINES.map((l, i) => {
        const len = Math.hypot(l.x2, l.y2 - 400)
        return (
          <line
            key={i}
            x1={0} y1={400}
            x2={l.x2} y2={l.y2}
            stroke="#FF2D55"
            strokeWidth={0.5}
            strokeDasharray={len}
            strokeDashoffset={len}
            style={{
              animation: `web-draw 0.8s ease forwards`,
              animationDelay: `${0.2 + i * 0.2}s`,
            }}
          />
        )
      })}
    </svg>
  )
}

// ─── Floating particles ────────────────────────────────────────────────────────

const PARTICLE_COLORS = ['#FF2D55', '#00D4FF', '#FFE600']

function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top:      `${5 + Math.random() * 90}%`,
      left:     `${5 + Math.random() * 90}%`,
      size:     2 + Math.random() * 2,
      color:    PARTICLE_COLORS[i % 3],
      opacity:  0.3 + Math.random() * 0.4,
      floatY:   -(30 + Math.random() * 30),
      duration: 3 + Math.random() * 5,
      delay:    Math.random() * 3,
    })), []
  )

  return (
    <>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            opacity: p.opacity,
            zIndex: 1,
            pointerEvents: 'none',
          }}
          animate={{ y: [0, p.floatY, 0], opacity: [p.opacity, 0, p.opacity] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}

// ─── Scroll indicator ──────────────────────────────────────────────────────────

function ScrollIndicator() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY < 100) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF2D55' }} />
        <div style={{ width: 2, height: 40, background: '#FF2D55', marginTop: 2 }} />
      </motion.div>
      <span style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.6rem',
        letterSpacing: '0.3em',
        color: '#888',
        textTransform: 'uppercase',
      }}>
        SCROLL
      </span>
    </motion.div>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

const fadeUp   = (delay) => ({ initial: { opacity: 0, y: 20 },  animate: { opacity: 1, y: 0  }, transition: { duration: 0.6, delay } })
const fadeLeft = (delay) => ({ initial: { opacity: 0, x: 20 },  animate: { opacity: 1, x: 0  }, transition: { duration: 0.6, delay } })
const fadeScale = (delay) => ({ initial: { opacity: 0, y: 30, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.7, delay } })

export default function Hero() {
  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'visible' }}>

      {/* Clipping container for decorative background layers */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>

      {/* LAYER 1 — Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at center, #1A1A2E 0%, #1A1A2E 30%, #0D0D1A 60%, #0A0A0A 100%)`,
        zIndex: 0,
      }} />

      {/* LAYER 2 — Halftone overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
        backgroundSize: '6px 6px',
        opacity: 0.04,
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* LAYER 3 — SVG web lines */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        <WebLines />
      </div>

      {/* Floating particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <Particles />
      </div>

      {/* City Skyline */}
      <CityScape />

      {/* LAYER 5 — Glitch overlay */}
      <div
        className="glitch-overlay"
        style={{
          position: 'absolute', inset: 0,
          opacity: 0.03,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />

      </div>{/* end clipping container */}

      {/* LAYER 4 — Main content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '10vh',
        paddingBottom: '4rem',
        textAlign: 'center',
      }}>

        {/* a) CIPHER PRESENTS caption */}
        <motion.div {...fadeUp(0.2)}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 700,
            fontVariant: 'small-caps',
            letterSpacing: '0.15em',
            border: '2px solid #FFE600',
            background: '#FFE600',
            color: '#0A0A0A',
            padding: '0.2rem 0.8rem',
            display: 'inline-block',
          }}>
            CIPHER PRESENTS
          </span>
        </motion.div>

        {/* b) VELORA */}
        <motion.div {...fadeScale(0.4)} style={{ position: 'relative', marginTop: '0.5rem' }}>
          <span
            className="velora-hero-title"
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: 'clamp(5rem, 12vw, 11rem)',
              color: '#FF2D55',
              lineHeight: 0.9,
              display: 'block',
              textShadow: '3px 3px 0 #00D4FF, -2px -2px 0 #FFE600, 6px 6px 0 rgba(0,0,0,0.5)',
            }}
          >
            VELORA
          </span>
        </motion.div>

        {/* c) 1.0 */}
        <motion.span {...fadeLeft(0.6)} style={{
          fontFamily: "'Bangers', cursive",
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          color: '#00D4FF',
          display: 'block',
          marginTop: '-1rem',
          letterSpacing: '0.3em',
          alignSelf: 'center',
          paddingLeft: '2rem',
        }}>
          1.0
        </motion.span>

        {/* d) DARE TO COMPETE */}
        <motion.span {...fadeUp(0.7)} style={{
          fontFamily: "'Bangers', cursive",
          fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
          color: '#F5F5F5',
          letterSpacing: '0.2em',
          marginTop: '0.5rem',
          display: 'block',
        }}>
          DARE TO COMPETE
        </motion.span>

        {/* e) Event info */}
        <motion.div {...fadeUp(0.9)} style={{
          border: '2px solid #444',
          background: 'rgba(255,255,255,0.05)',
          color: '#F5F5F5',
          padding: '0.4rem 1.2rem',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.85rem',
          marginTop: '1.5rem',
          letterSpacing: '0.03em',
        }}>
          24-Hour Hackathon &nbsp;·&nbsp; MITAOE, Alandi &nbsp;·&nbsp; Late March 2026
        </motion.div>

        {/* f) Countdown */}
        <motion.div {...fadeUp(1.0)} style={{ marginTop: '1.5rem' }}>
          <Countdown />
        </motion.div>

        {/* g) CTA */}
        <motion.button
          {...fadeUp(1.2)}
          whileHover={{ y: -2, boxShadow: '7px 7px 0 #000', backgroundColor: '#FF0040' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.lenis?.scrollTo('#about', { duration: 1.5 })}
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: '1.3rem',
            letterSpacing: '0.15em',
            background: '#FF2D55',
            color: '#F5F5F5',
            border: '3px solid #000',
            boxShadow: '5px 5px 0 #000',
            padding: '0.8rem 2.5rem',
            borderRadius: 0,
            cursor: 'pointer',
            marginTop: '2rem',
            transition: 'background-color 0.15s',
          }}
        >
          ENTER THE VERSE →
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Hero-specific styles */}
      <style>{`
        @keyframes hero-velora-idle-glitch {
          0%, 92%  { transform: translate(0,0);      text-shadow: 3px 3px 0 #00D4FF, -2px -2px 0 #FFE600, 6px 6px 0 rgba(0,0,0,0.5); }
          93%      { transform: translate(-3px, 1px); text-shadow: 5px 3px 0 #00D4FF, -4px -2px 0 #FFE600, 6px 6px 0 rgba(0,0,0,0.5); clip-path: inset(10% 0 80% 0); }
          94%      { transform: translate(3px, -1px); text-shadow: 1px 3px 0 #FF2D55, -2px -4px 0 #FFE600, 6px 6px 0 rgba(0,0,0,0.5); clip-path: inset(60% 0 20% 0); }
          95%      { transform: translate(-2px, 2px); text-shadow: 3px 5px 0 #00D4FF, -2px  0   0 #FF2D55, 6px 6px 0 rgba(0,0,0,0.5); clip-path: inset(30% 0 50% 0); }
          96%      { transform: translate(0,0);       text-shadow: 3px 3px 0 #00D4FF, -2px -2px 0 #FFE600, 6px 6px 0 rgba(0,0,0,0.5); clip-path: none; }
          100%     { transform: translate(0,0);       text-shadow: 3px 3px 0 #00D4FF, -2px -2px 0 #FFE600, 6px 6px 0 rgba(0,0,0,0.5); }
        }
        .velora-hero-title {
          animation: hero-velora-idle-glitch 6s steps(1, end) infinite;
        }
      `}</style>
    </section>
  )
}
