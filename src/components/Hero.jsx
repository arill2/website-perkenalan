import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HeroGlobe, { SITES } from './HeroGlobe'
import Terminal from './Terminal'
import useWelcomeGate from './useWelcomeGate'

export default function Hero() {
  const root = useRef(null)
  const nameRef = useRef(null)
  const subRef = useRef(null)
  const termRef = useRef(null)
  const metaRef = useRef(null)
  const globeRef = useRef(null)
  const ready = useWelcomeGate()

  useEffect(() => {
    // hormati preferensi reduced-motion: biarkan konten tampil apa adanya
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // tahan animasi intro selama splash apresiasi Amartha masih tampil
    if (!ready) return

    const ctx = gsap.context(() => {
      // intro timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(
        globeRef.current,
        { autoAlpha: 0, scale: 0.9, duration: 1.4, ease: 'power2.out' },
        0,
      )
        .from(metaRef.current, { autoAlpha: 0, y: -16, duration: 0.7 }, 0.2)
        .from(
          '.hero-avatar',
          { autoAlpha: 0, scale: 0.7, duration: 1, ease: 'back.out(1.6)' },
          0.35,
        )
        .from(
          nameRef.current.querySelectorAll('.word'),
          {
            autoAlpha: 0,
            y: 60,
            rotateX: -50,
            duration: 0.9,
            stagger: 0.12,
          },
          0.5,
        )
        .from(subRef.current, { autoAlpha: 0, y: 24, duration: 0.7 }, 1.0)
        .from(
          termRef.current,
          { autoAlpha: 0, y: 30, duration: 0.9 },
          1.15,
        )

      // parallax scroll pada konten hero
      gsap.to('.hero-parallax', {
        yPercent: 26,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [ready])

  return (
    <section
      id="top"
      ref={root}
      className="scanlines relative flex min-h-[100svh] flex-col overflow-hidden pt-24 pb-16 lg:flex-row lg:items-center"
    >
      {/*
        Globe.
        Mobile: blok persegi di alur dokumen (paling atas hero, sebagai
        "efek visual pembuka" sesuai PRD). Konsekuensinya globe tidak pernah
        terpotong dan tidak butuh scrim, karena tidak ada teks di atasnya.
        Desktop: kembali menjadi latar absolute di sisi kanan, di bawah scrim.
      */}
      <div
        ref={globeRef}
        className="relative mx-auto mb-6 aspect-square w-full max-w-[400px] lg:absolute lg:inset-0 lg:left-[26%] lg:mx-0 lg:mb-0 lg:aspect-auto lg:max-w-none"
      >
        <HeroGlobe ready={ready} />
      </div>

      {/* scrim: hanya desktop (di mobile globe tidak di belakang teks) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block lg:bg-gradient-to-r lg:from-abyss lg:via-abyss/55 lg:to-abyss/25"
      />

      <div className="hero-parallax relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr]">
        {/* kiri */}
        <div className="min-w-0">
          {/*
            Foto profil (mobile/tablet): setelah globe, sebelum identitas,
            supaya wajah langsung terlihat tanpa scroll jauh (situs perkenalan).
            Versi desktop ada di kolom kanan, jadi tidak dobel tampil.
          */}
          <div className="hero-avatar mb-7 lg:hidden">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-mint/40 bg-panel sm:h-36 sm:w-36">
              <img
                src="/profil.jpg"
                alt="Muh Syahrir Hamdani"
                width="480"
                height="480"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div
            ref={metaRef}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-mint/30 bg-abyss px-4 py-1.5 font-mono text-[11px] tracking-widest text-mint uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            Amartha Foundation Awardee
          </div>

          <h1
            ref={nameRef}
            className="font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-[64px]"
          >
            <span className="word inline-block">Muh</span>{' '}
            <span className="word inline-block">Syahrir</span>{' '}
            <br className="hidden sm:block" />
            <span className="word inline-block bg-gradient-to-r from-mint to-volt bg-clip-text text-transparent">
              Hamdani
            </span>
          </h1>

          <p
            ref={subRef}
            className="mt-6 max-w-lg text-base leading-relaxed text-dim sm:text-lg"
          >
            <span className="text-ice">Cybersecurity Researcher</span> dan{' '}
            <span className="text-ice">AI Engineer</span>. Ngejar celah sebelum
            orang lain menemukannya, dan membangun sistem yang belajar dari
            data. Dari Pinrang, untuk dampak yang lebih luas.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#tentang"
              className="group inline-flex min-h-11 items-center gap-2 rounded border border-mint bg-mint px-5 py-3 font-mono text-xs font-medium tracking-wider text-abyss uppercase transition hover:bg-transparent hover:text-mint"
            >
              Kenalan lebih jauh
              <span className="transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              href="#kontak"
              className="inline-flex min-h-11 items-center gap-2 rounded border border-line bg-panel px-5 py-3 font-mono text-xs tracking-wider text-ice uppercase transition hover:border-mint/50 hover:text-mint"
            >
              Terhubung
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] tracking-wider text-dim uppercase">
            <span>
              <span className="text-mint">01</span> Offensive Security
            </span>
            <span>
              <span className="text-mint">02</span> Web Exploitation
            </span>
            <span>
              <span className="text-mint">03</span> OSINT
            </span>
            <span>
              <span className="text-mint">04</span> Bug Bounty
            </span>
            <span>
              <span className="text-volt-2">05</span> AI Engineering
            </span>
          </div>

          {/*
            Roster institusi: teks alternatif dari globe, supaya pencapaian tetap
            terbaca tanpa hover presisi (R-26) dan tanpa mengandalkan visual saja.
            Warna dot mengikuti marker di globe: mint = titik asal, volt = koneksi.
          */}
          <div className="mt-10 border-t border-line pt-6">
            <div className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase">
              titik pengakuan di globe
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {SITES.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center gap-2 font-mono text-[11px] text-ice"
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      s.home ? 'bg-mint' : 'bg-volt'
                    }`}
                  />
                  {s.short}
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[10px] text-dim">
              Masing-masing terhubung ke pencapaian di seksi Sertifikat.
            </p>
          </div>
        </div>

        {/* kanan (desktop): foto + terminal. Di mobile foto tampil di kolom kiri. */}
        <div className="flex min-w-0 flex-col items-center gap-8 lg:items-end">
          <div className="hero-avatar relative hidden h-40 w-40 shrink-0 sm:h-48 sm:w-48 lg:block">
            <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-mint/40 bg-panel">
              <img
                src="/profil.jpg"
                alt="Muh Syahrir Hamdani"
                width="480"
                height="480"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div ref={termRef} className="w-full">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  )
}
