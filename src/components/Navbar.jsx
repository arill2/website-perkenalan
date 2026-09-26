import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'tentang', label: 'Tentang' },
  { id: 'offsec', label: 'OffSec' },
  { id: 'ai', label: 'AI' },
  { id: 'universitas', label: 'Universitas' },
  { id: 'karier', label: 'Karier' },
  { id: 'pengalaman', label: 'Pengalaman' },
  { id: 'sertifikat', label: 'Sertifikat' },
  { id: 'media', label: 'Media' },
  { id: 'kontak', label: 'Kontak' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-line bg-abyss/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 lg:py-4">
        <a
          href="#top"
          className="group flex min-h-11 items-center gap-3 font-mono text-sm tracking-tight lg:min-h-8"
        >
          <span className="grid h-8 w-8 place-items-center rounded border border-mint/40 bg-panel font-mono text-[11px] text-mint transition group-hover:bg-mint group-hover:text-abyss">
            &gt;_
          </span>
          <span className="text-ice">
            msh<span className="text-mint">.</span>sec
          </span>
        </a>

        <ul className="hidden items-center gap-6 font-mono text-[13px] lg:flex xl:gap-8">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="text-dim transition hover:text-mint"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="grid h-11 w-11 place-items-center rounded border border-line text-mint lg:hidden"
        >
          <span className="font-mono text-sm">{open ? '✕' : '≡'}</span>
        </button>
      </nav>

      {open && (
        <div className="max-h-[calc(100svh-4.25rem)] overflow-y-auto border-t border-line bg-abyss px-5 pb-5 lg:hidden">
          <ul className="flex flex-col gap-4 pt-4 font-mono text-sm">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center text-dim transition hover:text-mint"
                >
                  <span className="text-mint">/</span> {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
