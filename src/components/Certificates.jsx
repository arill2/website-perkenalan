import { useCallback, useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { Section, SectionHeading } from './Section'

const CATEGORIES = ['Semua', 'Sertifikasi', 'Bug Bounty', 'Letter of Recognition']

// Data asli. Gambar: public/certs/<slug>.png (thumb: public/certs/thumb/<slug>.png)
// Sumber file asli ada di img/ (di luar build).
const CERTS = [
  {
    slug: 'hackviser-certified-cybersecurity-foundations',
    name: 'Certified Cybersecurity Foundations',
    org: 'Hackviser',
    year: '2026',
    cat: 'Sertifikasi',
    note: 'Sertifikasi Cybersecurity Foundations yang terverifikasi oleh Hackviser.',
  },
  {
    slug: 'sibercat-junior-pentester',
    name: 'SiberCat Junior Pentester',
    org: 'SiberCat',
    year: '2026',
    cat: 'Sertifikasi',
    note: 'Sertifikasi junior penetration tester dari SiberCat.',
  },
  {
    slug: 'itb-bug-hunter-bronze',
    name: 'Bug Hunter Bronze',
    org: 'Institut Teknologi Bandung',
    year: '2026',
    cat: 'Bug Bounty',
    note: 'Penghargaan atas laporan kerentanan sistem dan teknologi informasi ITB (tier Bronze).',
  },
  {
    slug: 'komdigi-top10-bug-hunter',
    name: 'Top 10 Bug Hunter 2026, Peringkat 7',
    org: 'KOMDIGI-CSIRT',
    year: '2026',
    cat: 'Bug Bounty',
    note: 'Peringkat 7 dalam Top 10 Bug Hunter 2026 KOMDIGI-CSIRT atas responsible disclosure.',
  },
  {
    slug: 'motorola-hall-of-fame',
    name: 'Hall of Fame: Responsible Vulnerability Disclosure',
    org: 'Motorola Solutions',
    year: '2026',
    cat: 'Bug Bounty',
    note: 'Terdaftar di Hall of Fame program Responsible Vulnerability Disclosure Motorola Solutions.',
  },
  {
    slug: 'cert-eu-hall-of-fame',
    name: 'Hall of Fame CERT-EU',
    org: 'CERT-EU',
    year: '2026',
    cat: 'Bug Bounty',
    note: 'Terdaftar di Hall of Fame CERT-EU sebagai security researcher.',
  },
  {
    slug: 'avans-letter-of-appreciation',
    name: 'Letter of Appreciation',
    org: 'Avans Hogeschool',
    year: '2026',
    cat: 'Letter of Recognition',
    note: 'Pengakuan atas laporan kerentanan dan responsible disclosure pada lingkungan digital Avans Hogeschool.',
  },
  {
    slug: 'drexel-letter-of-recognition',
    name: 'Letter of Recognition',
    org: 'Drexel University',
    year: '2026',
    cat: 'Letter of Recognition',
    note: 'Ucapan terima kasih atas kontribusi pada Bug Bounty Program Drexel University.',
  },
  {
    slug: 'nasa-letter-of-recognition',
    name: 'Letter of Recognition',
    org: 'NASA',
    year: '2026',
    cat: 'Letter of Recognition',
    note: 'Pengakuan NASA VDP atas temuan kerentanan yang dilaporkan secara bertanggung jawab.',
  },
  {
    slug: 'tu-dresden-letter-of-appreciation',
    name: 'Letter of Appreciation',
    org: 'TU Dresden',
    year: '2026',
    cat: 'Letter of Recognition',
    note: 'Pengakuan atas temuan kerentanan XSS pada infrastruktur IT TU Dresden.',
  },
  {
    slug: 'uio-letter-of-recognition',
    name: 'Recognition for Security Vulnerability Disclosure',
    org: 'University of Oslo (UiO-CERT)',
    year: '2026',
    cat: 'Letter of Recognition',
    note: 'Penghargaan UiO-CERT atas pelaporan kerentanan pada layanan dan situs University of Oslo.',
  },
  {
    slug: 'usd-letter-of-recognition',
    name: 'Letter of Recognition',
    org: 'University of San Diego',
    year: '2026',
    cat: 'Letter of Recognition',
    note: 'Pengakuan atas laporan kerentanan yang menyeluruh, termasuk verifikasi setelah perbaikan.',
  },
]

export default function Certificates() {
  const [filter, setFilter] = useState('Semua')
  const [active, setActive] = useState(null)
  const closeRef = useRef(null)
  const cardRefs = useRef([])

  const list = filter === 'Semua' ? CERTS : CERTS.filter((c) => c.cat === filter)

  const close = useCallback(() => {
    const trigger = cardRefs.current[active]
    setActive(null)
    trigger?.focus()
  }, [active])

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % list.length)
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + list.length) % list.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close, list.length])

  const current = active === null ? null : list[active]

  return (
    <Section id="sertifikat">
        <SectionHeading
          index="08"
          sub="Achievements"
          title="Sertifikat & Pencapaian"
        />

        <Reveal className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-y border-line py-3.5">
            <p className="font-mono text-[11px] tracking-wider text-dim uppercase">
              <span className="text-mint">70++</span> Sertifikat + Penghargaan
            </p>
            <a
              href="https://www.linkedin.com/in/muhsyahrirhamdani/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-mono text-[11px] tracking-wider text-mint transition hover:text-ice"
            >
              Lihat koleksi lengkapnya di LinkedIn
              <span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </Reveal>

        <Reveal className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setFilter(c)
                setActive(null)
              }}
              aria-pressed={filter === c}
              className={`min-h-11 rounded border px-4 py-2 font-mono text-[11px] tracking-wider uppercase transition lg:min-h-0 ${
                filter === c
                  ? 'border-mint bg-mint text-abyss'
                  : 'border-line bg-panel/60 text-dim hover:border-mint/40 hover:text-mint'
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06}>
              <article className="group relative overflow-hidden rounded-lg border border-line bg-panel/60 transition hover:-translate-y-1 hover:border-mint/40">
                <div className="relative flex h-44 items-center justify-center border-b border-line bg-abyss/50 p-2">
                  <span className="absolute inset-0 grid place-items-center font-mono text-[10px] tracking-widest text-dim uppercase">
                    gambar tidak tersedia
                  </span>
                  <img
                    src={`/certs/thumb/${c.slug}.png`}
                    alt={`Sertifikat ${c.name}, ${c.org}`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.visibility = 'hidden'
                    }}
                    className="relative z-10 h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-3 top-3 z-20 rounded border border-line bg-abyss/70 px-2 py-0.5 font-mono text-[10px] tracking-widest text-dim uppercase">
                    {c.cat}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold text-ice">
                    {c.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-mono text-[11px] text-dim">
                    <span>{c.org}</span>
                    <span className="text-mint">{c.year}</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-dim">
                    {c.note}
                  </p>
                </div>
                <button
                  type="button"
                  ref={(el) => {
                    cardRefs.current[i] = el
                  }}
                  onClick={() => setActive(i)}
                  aria-label={`Lihat sertifikat ${c.name} dari ${c.org}`}
                  className="absolute inset-0 rounded-lg"
                />
              </article>
            </Reveal>
          ))}
        </div>

        {list.length === 0 && (
          <p className="font-mono text-sm text-dim">
            Tidak ada item di kategori ini.
          </p>
        )}

        <Reveal delay={0.2} className="mt-8">
          <p className="font-mono text-[11px] tracking-wider text-dim">
            Klik kartu untuk melihat sertifikat ukuran penuh.
          </p>
        </Reveal>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.name}, ${current.org}`}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-abyss/95 p-4 sm:p-8"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Tutup"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded border border-line bg-panel font-mono text-sm text-ice transition hover:border-mint/60 hover:text-mint"
          >
            ✕
          </button>

          {list.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setActive((active - 1 + list.length) % list.length)
                }}
                aria-label="Sertifikat sebelumnya"
                className="absolute left-2 grid h-11 w-11 place-items-center rounded border border-line bg-panel font-mono text-lg text-ice transition hover:border-mint/60 hover:text-mint sm:left-4"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setActive((active + 1) % list.length)
                }}
                aria-label="Sertifikat berikutnya"
                className="absolute right-2 grid h-11 w-11 place-items-center rounded border border-line bg-panel font-mono text-lg text-ice transition hover:border-mint/60 hover:text-mint sm:right-4"
              >
                ›
              </button>
            </>
          )}

          <figure
            className="flex max-h-full w-full max-w-4xl flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/certs/${current.slug}.png`}
              alt={`Sertifikat ${current.name}, ${current.org}`}
              className="max-h-[72vh] w-auto max-w-full rounded border border-line bg-panel object-contain"
            />
            <figcaption className="text-center font-mono text-[11px] tracking-wide text-dim">
              <span className="text-ice">{current.name}</span> · {current.org} ·{' '}
              <span className="text-mint">{current.year}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </Section>
  )
}
