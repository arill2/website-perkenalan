import { useEffect, useState } from 'react'
import { WELCOME_EVENT, welcomePending } from './WelcomeSplash'

/**
 * Gerbang animasi: selama splash apresiasi Amartha tampil, animasi intro
 * hero dan terminal ditahan dulu supaya tidak jalan di balik layar.
 * Begitu splash ditutup (atau tidak perlu tampil), gate terbuka.
 */
export default function useWelcomeGate() {
  const [ready, setReady] = useState(() => !welcomePending())

  useEffect(() => {
    if (ready) return
    const onDone = () => setReady(true)
    window.addEventListener(WELCOME_EVENT, onDone)
    return () => window.removeEventListener(WELCOME_EVENT, onDone)
  }, [ready])

  return ready
}
