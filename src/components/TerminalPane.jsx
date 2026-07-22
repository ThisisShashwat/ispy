'use client'

import { useEffect, useRef, useState } from 'react'
import { useCloseAttempt } from '../context/CloseAttemptContext'

// Wraps a section in terminal-emulator chrome: a title bar with a
// user@host:path$ identity and fake [-][□][x] window controls. Minimize and
// maximize are purely decorative. Close never closes the pane — it registers
// a page-wide attempt against the shared escalation counter and shows
// whatever tier message comes back.
export default function TerminalPane({
  id,
  host = 'agent@ispy',
  path,
  idle = false,
  className = '',
  children,
}) {
  const registerCloseAttempt = useCloseAttempt()
  const [refusal, setRefusal] = useState(null)
  const [shaking, setShaking] = useState(false)
  const clearTimer = useRef(null)
  const shakeTimer = useRef(null)

  useEffect(
    () => () => {
      clearTimeout(clearTimer.current)
      clearTimeout(shakeTimer.current)
    },
    [],
  )

  const handleClose = () => {
    const message = registerCloseAttempt()
    setRefusal(message)
    setShaking(true)

    clearTimeout(clearTimer.current)
    clearTimer.current = setTimeout(() => setRefusal(null), 3000)

    clearTimeout(shakeTimer.current)
    shakeTimer.current = setTimeout(() => setShaking(false), 800)
  }

  return (
    <section
      id={id}
      className={`border border-outline ${shaking ? 'animate-shake-once' : ''} ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-outline-variant bg-surface-container px-3 py-2">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            aria-label="minimize"
            className="w-3 h-3 border border-outline-variant"
          />
          <button
            type="button"
            aria-label="maximize"
            className="w-3 h-3 border border-outline-variant"
          />
          <button
            type="button"
            aria-label="close"
            onClick={handleClose}
            className="w-3 h-3 border border-secondary-container hover:bg-secondary-container transition-colors"
          />
        </div>
        <p className="font-mono text-[11px] sm:text-xs tracking-widest text-on-surface-variant truncate">
          {idle ? (
            <>
              {host}:~$ awaiting command...{' '}
              <span className="inline-block w-1.5 h-3 bg-primary-container align-middle animate-blink" />
            </>
          ) : (
            `${host}:~$ ${path}`
          )}
        </p>
      </div>

      {refusal && (
        <div className="border-b border-outline-variant bg-surface-container-low px-3 py-1.5">
          <p className="font-mono text-[11px] text-secondary-container tracking-wide">
            {refusal}
          </p>
        </div>
      )}

      {children}
    </section>
  )
}
