"use client"

import { useEffect, useState } from "react"
import "./ripple-hero.css"

/**
 * eSIMval's light adaptation of Commercify's PrintifyRippleHero.
 * Interactive squares, staggered ripple on click, no photos or extra libraries.
 */
const ROWS = 8
const COLS = 22

export function EsimRippleHero() {
  const [origin, setOrigin] = useState<{ row: number; col: number } | null>(null)

  useEffect(() => {
    if (!origin) return
    const timeout = window.setTimeout(() => setOrigin(null), 1200)
    return () => window.clearTimeout(timeout)
  }, [origin])

  return (
    <div className="esim-ripple-hero absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="esim-ripple-hero-grid absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: ROWS * COLS }, (_, i) => {
          const row = Math.floor(i / COLS)
          const col = i % COLS
          const distance = origin ? Math.hypot(row - origin.row, col - origin.col) : Infinity
          return (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="esim-ripple-cell"
              onClick={() => setOrigin({ row, col })}
              style={{
                backgroundColor: distance < 6
                  ? `rgba(74, 111, 104, ${Math.max(0.025, 0.13 - distance * 0.018)})`
                  : undefined,
                transitionDelay: origin ? `${Math.round(distance * 42)}ms` : "0ms",
              }}
            />
          )
        })}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_10%,#eef1ee66_98%)]" />
    </div>
  )
}
