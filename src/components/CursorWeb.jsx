import { useEffect, useRef } from 'react'

export default function CursorWeb() {
  const canvasRef    = useRef(null)
  const pointsRef    = useRef([])          // { x, y }
  const rawCursor    = useRef({ x: -200, y: -200 })
  const lastAdded    = useRef({ x: -200, y: -200 })
  const lastMoveTime = useRef(Date.now())
  const pulseRef     = useRef(0)
  const frameCount   = useRef(0)
  const rafRef       = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Mouse / touch ─────────────────────────────────────────────────────────
    function handleMove(x, y) {
      rawCursor.current    = { x, y }
      lastMoveTime.current = Date.now()

      const last = lastAdded.current
      const dx = x - last.x
      const dy = y - last.y
      if (Math.sqrt(dx * dx + dy * dy) < 8) return

      pointsRef.current.push({ x, y })
      if (pointsRef.current.length > 300) pointsRef.current.shift()
      lastAdded.current = { x, y }
    }

    function onMouseMove(e) { handleMove(e.clientX, e.clientY) }
    function onTouchMove(e) {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY)
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    // ── Draw ──────────────────────────────────────────────────────────────────
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frameCount.current++

      const pts      = pointsRef.current
      const idle     = Date.now() - lastMoveTime.current > 1000
      const isMoving = !idle

      // ── Tail consumption ──────────────────────────────────────────────────
      if (pts.length > 0) {
        if (idle) {
          // Fast cleanup: remove 2 points every frame
          pts.splice(0, 2)
        } else if (frameCount.current % 3 === 0) {
          // Slow consumption while moving: 1 point every 3 frames
          pts.shift()
        }
      }

      const total = pts.length

      // ── Gravity droop (older points sag more) ─────────────────────────────
      const keepFresh = 20
      for (let i = 0; i < total - keepFresh; i++) {
        pts[i].y += 0.3 * (1 - i / total)
      }

      // ── Draw Catmull-Rom spline segment by segment ─────────────────────────
      if (total >= 2) {
        for (let i = 0; i < total - 1; i++) {
          const p0 = pts[Math.max(i - 1, 0)]
          const p1 = pts[i]
          const p2 = pts[i + 1]
          const p3 = pts[Math.min(i + 2, total - 1)]

          const cp1x = p1.x + (p2.x - p0.x) / 6
          const cp1y = p1.y + (p2.y - p0.y) / 6
          const cp2x = p2.x - (p3.x - p1.x) / 6
          const cp2y = p2.y - (p3.y - p1.y) / 6

          // Opacity: 0 at tail (index 0), 0.55 at head (index total-1)
          const segOpacity = (i / total) * 0.55

          // Main thread
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y)
          ctx.strokeStyle = `rgba(255,45,85,${segOpacity})`
          ctx.lineWidth   = 1.2
          ctx.lineJoin    = 'round'
          ctx.lineCap     = 'round'
          ctx.stroke()

          // Silk highlight
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y)
          ctx.strokeStyle = `rgba(255,255,255,${segOpacity * 0.4})`
          ctx.lineWidth   = 0.4
          ctx.stroke()
        }
      }

      // ── Cursor dot + pulse ────────────────────────────────────────────────
      pulseRef.current = (pulseRef.current + 0.05) % (Math.PI * 2)
      const pulse = 0.5 + 0.5 * Math.sin(pulseRef.current)
      const { x, y } = rawCursor.current

      if (x > 0) {
        // Outer pulse ring
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,45,85,${0.2 * (1 - pulse * 0.5)})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Inner dot
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,45,85,0.9)'
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 6,
      }}
    />
  )
}
