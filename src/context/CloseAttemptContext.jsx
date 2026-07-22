'use client'

import { createContext, useCallback, useContext, useRef } from 'react'

// Escalation tiers for the fake close-button refusal, keyed by max attempt
// count in that tier. The last tier (Infinity) is the permanent ceiling.
const TIERS = [
  { max: 1, message: 'bash: close: permission denied — agent status: ACTIVE' },
  { max: 3, message: 'NICE TRY. THIS TERMINAL DOES NOT DISCONNECT.' },
  { max: 6, message: 'INCIDENT LOGGED. STOP CLICKING THAT.' },
  { max: Infinity, message: 'AGENT DISPATCHED. (still not closing.)' },
]

function messageForAttempt(count) {
  return TIERS.find((tier) => count <= tier.max).message
}

const CloseAttemptContext = createContext(null)

// Attempt count lives in a ref (not state) so a click on any pane advances
// one shared counter without re-rendering every other pane on the page.
export function CloseAttemptProvider({ children }) {
  const countRef = useRef(0)

  const registerCloseAttempt = useCallback(() => {
    countRef.current += 1
    return messageForAttempt(countRef.current)
  }, [])

  return (
    <CloseAttemptContext.Provider value={registerCloseAttempt}>
      {children}
    </CloseAttemptContext.Provider>
  )
}

export function useCloseAttempt() {
  const registerCloseAttempt = useContext(CloseAttemptContext)
  if (!registerCloseAttempt) {
    throw new Error('useCloseAttempt must be used within a CloseAttemptProvider')
  }
  return registerCloseAttempt
}
