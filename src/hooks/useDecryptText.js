'use client'

import { useEffect, useRef, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________'
const DURATION_MS = 700
const FRAME_MS = 30

export function useDecryptText(finalText) {
  const [text, setText] = useState(finalText)
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (prefersReducedMotion.current) {
      setText(finalText)
      return
    }

    const totalFrames = Math.ceil(DURATION_MS / FRAME_MS)
    let frame = 0
    const length = finalText.length

    const interval = setInterval(() => {
      frame += 1
      const revealCount = Math.floor((frame / totalFrames) * length)

      setText(
        finalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < revealCount) return char
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join(''),
      )

      if (frame >= totalFrames) {
        setText(finalText)
        clearInterval(interval)
      }
    }, FRAME_MS)

    return () => clearInterval(interval)
  }, [finalText])

  return text
}
