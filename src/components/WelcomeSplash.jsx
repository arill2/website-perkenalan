import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const WELCOME_KEY = 'msh-welcome-seen'
export const WELCOME_EVENT = 'msh:welcome-done'

/**
 * Cek apakah splash apresiasi belum ditampilkan di sesi ini.
 * Dipakai juga oleh Hero & Terminal supaya animasinya mulai
 * setelah splash ditutup, bukan di balik layar.
 */
export const welcomePending = () => {
  try {
    return !sessionStorage.getItem(WELCOME_KEY)
  } catch {
    return true
  }
}

const markSeen = () => {
  try {
    sessionStorage.setItem(WELCOME_KEY, '1')
  } catch {
    /* mode privasi: biarkan, splash tetap tampil sekali per muat */
  }
}

/**
 * Splash sekali per sesi: kartu apresiasi Beasiswa Amartha Foundation.
 * Alasan desain: logo Amartha (ungu/pink) jadi satu-satunya warna hangat
 * di halaman gelap, jadi fokusnya jatuh tepat ke penghargaan itu.
 */
export default function WelcomeSplash() {
  const [open, setOpen] = useState(welcomePending)
  const rootRef = useRef(null)
  const panelRef = useRef(null)
  const btnRef = useRef(null)
  const timerRef = useRef(null)
  const closingRef = useRef(false)

  const dismiss = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    markSeen()
    window.dispatchEvent(new Event(WELCOME_EVENT))
    clearTimeout(timerRef.current)

    const el = rootRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpen(false)
      return
    }
    gsap.to(el, {
      autoAlpha: 0,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => setOpen(false),
    })
  }, [])

  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let ctx = null
    if (!reduced) {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(rootRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 })
          .fromTo(
            panelRef.current,
            { autoAlpha: 0, y: 18, scale: 0.985 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 },
            0.12,
          )
          .fromTo(
            '.welcome-stagger',
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.11 },
            0.45,
          )
      }, rootRef)
    } else {
      gsap.set(rootRef.current, { autoAlpha: 1 })
    }

    // fokus ke tombol setelah animasi stagger selesai.
    // GSAP menahan elemen ber-autoAlpha 0 pada visibility:hidden,
    // jadi focus() sebelum ~1.8s akan gagal diam-diam.
    const focusTimer = setTimeout(
      () => btnRef.current?.focus(),
      reduced ? 0 : 1900,
    )
    timerRef.current = setTimeout(dismiss, 8000)

    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault()
        dismiss()
        return
      }
      // tahan fokus di dalam dialog selama splash tampil
      if (e.key === 'Tab') {
        const focusables = [btnRef.current].filter(Boolean)
        if (focusables.length < 2) {
          e.preventDefault()
          btnRef.current?.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      clearTimeout(timerRef.current)
      clearTimeout(focusTimer)
      document.body.style.overflow = ''
      ctx?.revert()
    }
  }, [open, dismiss])

  if (!open) return null

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Apresiasi Beasiswa Amartha Foundation"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-abyss px-5"
      style={{ visibility: 'hidden' }}
    >
      {/* scanline halus, konsisten dengan tema HUD situs */}
      <div className="scanlines pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* cahaya ambient mengikuti warna logo Amartha (ungu), bukan palet situs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 46%, rgba(124,81,160,0.16), transparent 70%)',
        }}
      />

      <div ref={panelRef} className="relative w-full max-w-md">
        {/* sudut bingkai gaya HUD */}
        <span aria-hidden="true" className="absolute -top-2.5 -left-2.5 h-5 w-5 border-t border-l border-mint/50" />
        <span aria-hidden="true" className="absolute -top-2.5 -right-2.5 h-5 w-5 border-t border-r border-mint/50" />
        <span aria-hidden="true" className="absolute -bottom-2.5 -left-2.5 h-5 w-5 border-b border-l border-mint/50" />
        <span aria-hidden="true" className="absolute -bottom-2.5 -right-2.5 h-5 w-5 border-b border-r border-mint/50" />

        <div className="border border-line bg-panel/85 px-6 py-9 text-center sm:px-8 sm:py-11">
          <p className="welcome-stagger font-mono text-[10px] tracking-[0.3em] text-mint uppercase">
            // apresiasi
          </p>

          <div className="welcome-stagger mx-auto mt-7 w-full max-w-[240px]">
            <img
              src="/logo-amartha.png"
              alt="Logo Amartha Foundation"
              width="1024"
              height="168"
              className="h-auto w-full"
            />
          </div>

          <div className="welcome-stagger mt-7 border-t border-line" />

          <p className="welcome-stagger mt-7 font-display text-lg font-bold text-ice sm:text-xl">
            Beasiswa Amartha Foundation
          </p>
          <p className="welcome-stagger mt-1.5 font-mono text-[11px] tracking-widest text-mint uppercase">
            Awardee 2026
          </p>
          <p className="welcome-stagger mx-auto mt-5 max-w-xs text-sm leading-relaxed text-dim">
            Terima kasih sudah percaya lebih dulu. Situs ini ada karena
            dukungan itu.
          </p>

          <button
            ref={btnRef}
            type="button"
            onClick={dismiss}
            className="welcome-stagger mt-8 inline-flex min-h-11 items-center gap-2 rounded border border-mint bg-mint px-6 py-3 font-mono text-xs font-medium tracking-wider text-abyss uppercase transition hover:bg-transparent hover:text-mint"
          >
            Masuk
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
