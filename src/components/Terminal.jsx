import { useEffect, useRef, useState } from 'react'
import useWelcomeGate from './useWelcomeGate'

const BOOT = [
  { text: '$ whoami', delay: 300, type: 'cmd' },
  { text: 'muh_syahrir_hamdani', delay: 250, type: 'out' },
  { text: '$ ./init_profile', delay: 350, type: 'cmd' },
  { text: '[OK] amartha foundation awardee', delay: 220, type: 'ok' },
  { text: '[OK] cybersecurity researcher, offensive security track', delay: 220, type: 'ok' },
  { text: '[OK] ai engineering, computer vision & deep learning', delay: 220, type: 'ok' },
  { text: '$ status --verbose', delay: 350, type: 'cmd' },
  { text: 'fokus: web security · fundamental', delay: 200, type: 'out' },
  { text: 'proyek: acne scanner · plant disease ai', delay: 200, type: 'out' },
  { text: 'status: belajar dan membangun portofolio', delay: 200, type: 'out' },
]

const SECTIONS = [
  ['tentang', 'Tentang'],
  ['penting', 'Penting'],
  ['offsec', 'OffSec'],
  ['ai', 'AI'],
  ['universitas', 'Universitas'],
  ['karier', 'Karier'],
  ['pengalaman', 'Pengalaman'],
  ['sertifikat', 'Sertifikat'],
  ['media', 'Media'],
  ['kontak', 'Kontak'],
]

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Terminal hero.
 * Fase boot: baris diketik satu per satu (dilewati bila reduced-motion).
 * Fase interaktif: prompt bisa diketik: help, ls, goto <section>, kontak, clear.
 */
export default function Terminal({ onDone }) {
  const [boot, setBoot] = useState([])
  const [current, setCurrent] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [finished, setFinished] = useState(false)
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [recall, setRecall] = useState([])
  const [reduced] = useState(prefersReduced)
  const ready = useWelcomeGate()

  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  // fase boot
  useEffect(() => {
    // tahan boot sequence selama splash apresiasi Amartha masih tampil
    if (!ready) return
    if (reduced) {
      setBoot(BOOT)
      setFinished(true)
      onDoneRef.current?.()
      return
    }
    if (lineIdx >= BOOT.length) {
      setFinished(true)
      onDoneRef.current?.()
      return
    }
    const line = BOOT[lineIdx]
    let char = 0
    const startTimer = setTimeout(() => {
      const typer = setInterval(() => {
        char++
        setCurrent(line.text.slice(0, char))
        if (char >= line.text.length) {
          clearInterval(typer)
          setTimeout(() => {
            setBoot((b) => [...b, line])
            setCurrent('')
            setLineIdx((i) => i + 1)
          }, line.delay)
        }
      }, line.type === 'cmd' ? 34 : 12)
    }, lineIdx === 0 ? 500 : 80)
    return () => clearTimeout(startTimer)
  }, [lineIdx, reduced, ready])

  // jaga output tetap di bawah
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [boot, history, current])

  const goTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return false
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    return true
  }

  const exec = (raw) => {
    const parts = raw.trim().split(/\s+/)
    const key = (parts[0] || '').toLowerCase()
    const arg = (parts[1] || '').toLowerCase()
    const out = []

    switch (key) {
      case 'help':
        out.push({
          text: 'perintah: whoami · ls · goto <section> · kontak · clear',
          type: 'out',
        })
        break
      case 'whoami':
        out.push({ text: 'muh_syahrir_hamdani', type: 'out' })
        out.push({
          text: 'cybersecurity researcher · offensive security track',
          type: 'out',
        })
        break
      case 'ls':
      case 'sections':
        SECTIONS.forEach(([id, label]) =>
          out.push({ text: `${id.padEnd(12, ' ')} ${label}`, type: 'out' }),
        )
        break
      case 'goto':
      case 'cd':
        if (!arg) {
          out.push({
            text: 'pakai: goto <section> (daftar dengan ls)',
            type: 'out',
          })
        } else if (goTo(arg)) {
          out.push({ text: `→ ${arg}`, type: 'ok' })
        } else {
          out.push({ text: `section tidak ditemukan: ${arg}`, type: 'out' })
        }
        break
      case 'kontak':
      case 'contact':
        goTo('kontak')
        out.push({ text: '→ kontak', type: 'ok' })
        break
      case '':
        return
      case 'clear':
        setHistory([])
        return
      default:
        out.push({ text: `command not found: ${key} (coba 'help')`, type: 'out' })
    }

    setHistory((h) => [
      ...h,
      { text: `$ ${raw.trim()}`, type: 'cmd' },
      ...out,
    ])
  }

  const submit = (e) => {
    e.preventDefault()
    const raw = input
    if (!raw.trim()) return
    exec(raw)
    setRecall((r) => [...r, raw])
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (recall.length) setInput(recall[recall.length - 1])
    } else if (e.key === 'Escape') {
      inputRef.current?.blur()
    }
  }

  const color = (type) =>
    type === 'cmd' ? 'text-ice' : type === 'ok' ? 'text-mint' : 'text-dim'

  return (
    <div className="panel-glow w-full max-w-xl rounded-lg border border-line bg-panel/80 font-mono text-xs backdrop-blur sm:text-sm">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint" />
        <span className="ml-3 text-[10px] tracking-widest text-dim uppercase">
          syahrir@secops: ~/profile
        </span>
      </div>

      <div
        ref={scrollRef}
        className="max-h-[320px] min-h-[180px] overflow-y-auto px-4 py-3 leading-relaxed sm:min-h-[200px]"
      >
        {boot.map((l, i) => (
          <p key={i} className={color(l.type)}>
            {l.text}
          </p>
        ))}

        {!finished ? (
          <p className={color(BOOT[lineIdx]?.type)}>
            {current}
            <span className="blink text-mint">▊</span>
          </p>
        ) : (
          <>
            {history.map((l, i) => (
              <p key={i} className={color(l.type)}>
                {l.text}
              </p>
            ))}
            <form onSubmit={submit} className="flex items-center gap-1.5">
              <span aria-hidden="true" className="text-mint">
                $
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="off"
                aria-label="terminal interaktif"
                placeholder="help"
                /* 16px di mobile: iOS Safari auto-zoom kalau input < 16px (R-03) */
                className="min-h-11 w-full bg-transparent text-[16px] text-ice caret-mint outline-none placeholder:text-dim/50 sm:text-sm lg:min-h-0"
              />
            </form>
          </>
        )}
      </div>
    </div>
  )
}
