import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section, SectionHeading } from './Section'

gsap.registerPlugin(ScrollTrigger)

const PHASES = [
  {
    tag: 'SEKARANG',
    status: 'active',
    title: 'Pelajar & Cybersecurity Enthusiast',
    desc: 'Membangun fundamental: jaringan, Linux, web security. Aktif latihan CTF, lab mandiri, dan mulai hunting bug bounty.',
    items: ['Fundamental networking & OS', 'Web exploitation basics', 'CTF & lab mandiri'],
  },
  {
    tag: '0–2 TAHUN',
    status: 'next',
    title: 'Security Analyst / Junior Pentester',
    desc: 'Masuk industri sebagai analyst: triage alert, vulnerability assessment, dan pentest aplikasi web untuk klien nyata.',
    items: ['Sertifikasi (eJPT/OSCP path)', 'Pentest report profesional', 'Pengalaman klien nyata'],
  },
  {
    tag: '3–5 TAHUN',
    status: 'next',
    title: 'Penetration Tester / Security Researcher',
    desc: 'Fokus riset: menemukan kerentanan baru, publikasi writeup, kontribusi ke komunitas keamanan, dan pengujian red-team.',
    items: ['Bug bounty track record', 'Riset & publikasi', 'Red team / adversary sim'],
  },
  {
    tag: 'JANGKA PANJANG',
    status: 'future',
    title: 'Impact: Secure the Digital Ecosystem',
    desc: 'Berkontribusi pada keamanan digital Indonesia: membangun kesadaran, melatih talenta baru, dan menciptakan dampak nyata di industri.',
    items: ['Mentoring talenta baru', 'Kontribusi kebijakan/standar', 'Dampak industri'],
  },
]

const STATUS = {
  active: { dot: 'bg-mint', ring: 'border-mint/60', label: 'text-mint' },
  next: { dot: 'bg-volt', ring: 'border-volt/50', label: 'text-volt-2' },
  future: { dot: 'bg-dim', ring: 'border-dim/40', label: 'text-dim' },
}

export default function CareerRoadmap() {
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // tiap fase fade+slide saat masuk viewport
      gsap.utils.toArray('.phase-item').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        )
      })

      // garis vertikal tumbuh mengikuti scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current.parentElement,
            start: 'top 70%',
            end: 'bottom 85%',
            scrub: true,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Section id="karier">
        <SectionHeading
          index="06"
          sub="Roadmap"
          title="Jenjang Karier Masa Depan"
        />

        <div className="relative pl-8 sm:pl-12">
          {/* garis timeline */}
          <div
            ref={lineRef}
            className="absolute top-2 bottom-2 left-[9px] w-px bg-gradient-to-b from-mint via-volt to-transparent sm:left-[17px]"
          />

          <div className="space-y-10">
            {PHASES.map((p, i) => {
              const s = STATUS[p.status]
              return (
                <div
                  key={i}
                  className="phase-item relative"
                  style={{ opacity: 0 }}
                >
                  {/* titik */}
                  <span
                    className={`absolute top-6 -left-8 grid h-[18px] w-[18px] place-items-center rounded-full border ${s.ring} bg-abyss sm:-left-12`}
                  >
                    <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                  </span>

                  <div className="rounded-lg border border-line bg-panel/60 p-6 transition hover:border-mint/30 hover:bg-panel sm:p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`font-mono text-[10px] tracking-[0.25em] uppercase ${s.label}`}
                      >
                        {p.tag}
                      </span>
                      {p.status === 'active' && (
                        <span className="rounded-full border border-mint/40 px-2 py-0.5 font-mono text-[10px] tracking-widest text-mint uppercase">
                          sekarang
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold text-ice sm:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-dim">
                      {p.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.items.map((it) => (
                        <span
                          key={it}
                          className="rounded border border-line bg-abyss/60 px-2.5 py-1 font-mono text-[10px] text-ice"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
    </Section>
  )
}
