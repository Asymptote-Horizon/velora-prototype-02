import { useEffect, useRef, useState } from 'react'
import { playSwingSound } from '../utils/audioManager'

// ─── Spider-Man silhouette SVG ────────────────────────────────────────────────

function SpiderManSVG({ flip }) {
  return (
    <svg
      viewBox="0 0 60 90"
      width="60"
      height="90"
      style={{
        display: 'block',
        filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))',
        transform: flip ? 'scaleX(-1)' : 'none',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="mm-suitGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
      </defs>

      {/* Legs */}
      <path d="M22,55 L15,85 L8,88" stroke="#121212" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38,55 L45,85 L52,88" stroke="#121212" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Red stripe on legs */}
      <path d="M18,45 Q15,60 12,75" stroke="#BE0000" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M42,45 Q45,60 48,75" stroke="#BE0000" strokeWidth="1.5" fill="none" opacity="0.8" />

      {/* Body / torso */}
      <path d="M18,35 Q30,30 42,35 L40,55 Q30,60 20,55 Z" fill="url(#mm-suitGlow)" />

      {/* Spider symbol */}
      <g transform="translate(30, 42) scale(0.8)">
        <path d="M0,-8 L2,-2 L8,-1 L3,2 L5,8 L0,4 L-5,8 L-3,2 L-8,-1 L-2,-2 Z" fill="#BE0000" />
        <path d="M-2,-2 L-10,-8 M2,-2 L10,-8 M-3,2 L-11,6 M3,2 L11,6" stroke="#BE0000" strokeWidth="1.2" />
      </g>

      {/* Arms */}
      <path d="M18,38 Q5,40 3,25" stroke="#121212" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M42,38 Q55,30 58,10" stroke="#121212" strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* Head — Miles all-black mask */}
      <path d="M30,8 C22,8 17,14 17,23 C17,32 30,38 30,38 C30,38 43,32 43,23 C43,14 38,8 30,8 Z" fill="#0a0a0a" />

      {/* Eye lenses — angular Miles-style */}
      <path d="M20,22 Q24,18 28,24 Q24,28 19,26 Z" fill="white" />
      <path d="M20,22 Q24,18 28,24 Q24,28 19,26 Z" fill="none" stroke="#BE0000" strokeWidth="0.8" />
      <path d="M40,22 Q36,18 32,24 Q36,28 41,26 Z" fill="white" />
      <path d="M40,22 Q36,18 32,24 Q36,28 41,26 Z" fill="none" stroke="#BE0000" strokeWidth="0.8" />

      {/* Web line from shooting hand */}
      <line x1="58" y1="10" x2="65" y2="-10" stroke="#ffffff" strokeWidth="0.8" opacity="0.4" />
    </svg>
  )
}

// ─── Spider-Man ───────────────────────────────────────────────────────────────

export default function SpiderMan() {
  const [active, setActive] = useState(false)
  const [dir, setDir]       = useState('ltr')
  const timerRef  = useRef(null)
  const hideRef   = useRef(null)

  useEffect(() => {
    function run(direction) {
      clearTimeout(hideRef.current)
      setDir(direction)
      setActive(true)
      playSwingSound()
      hideRef.current = setTimeout(() => setActive(false), 4400)
    }

    function schedule() {
      const delay = 18000 + Math.random() * 12000
      timerRef.current = setTimeout(() => {
        run(Math.random() > 0.5 ? 'ltr' : 'rtl')
        schedule()
      }, delay)
    }

    // First appearance after 8 seconds
    timerRef.current = setTimeout(() => {
      run('ltr')
      schedule()
    }, 8000)

    return () => {
      clearTimeout(timerRef.current)
      clearTimeout(hideRef.current)
    }
  }, [])

  if (!active) return null

  return (
    <>
      <div
        key={`${dir}-${Date.now()}`}
        style={{
          position: 'fixed',
          top: '8%',
          left: dir === 'ltr' ? 0 : undefined,
          right: dir === 'rtl' ? 0 : undefined,
          zIndex: 9000,
          pointerEvents: 'none',
          animation: dir === 'ltr'
            ? 'spidey-ltr 4.0s cubic-bezier(0.25,0.46,0.45,0.94) forwards'
            : 'spidey-rtl 4.0s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        }}
      >
        <SpiderManSVG flip={dir === 'rtl'} />
      </div>

      <style>{`
        @keyframes spidey-ltr {
          0%   { transform: translateX(-80px) translateY(0px) rotate(18deg);  opacity: 0; }
          6%   { opacity: 1; }
          30%  { transform: translateX(25vw)  translateY(-18px) rotate(-5deg); }
          50%  { transform: translateX(50vw)  translateY(8px)   rotate(10deg); }
          70%  { transform: translateX(75vw)  translateY(-12px) rotate(-8deg); }
          94%  { opacity: 1; }
          100% { transform: translateX(calc(100vw + 80px)) translateY(0px) rotate(-18deg); opacity: 0; }
        }

        @keyframes spidey-rtl {
          0%   { transform: translateX(80px)  translateY(0px)   rotate(-18deg); opacity: 0; }
          6%   { opacity: 1; }
          30%  { transform: translateX(-25vw) translateY(-18px) rotate(5deg); }
          50%  { transform: translateX(-50vw) translateY(8px)   rotate(-10deg); }
          70%  { transform: translateX(-75vw) translateY(-12px) rotate(8deg); }
          94%  { opacity: 1; }
          100% { transform: translateX(calc(-100vw - 80px)) translateY(0px) rotate(18deg); opacity: 0; }
        }
      `}</style>
    </>
  )
}
