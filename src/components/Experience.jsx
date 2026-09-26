import Reveal from './Reveal'
import { Section, SectionHeading } from './Section'

const ROLES = [
  {
    logo: '/logos/doran.png',
    logoAlt: 'Logo PT. Doran Sukses Indonesia',
    logoClass: 'max-h-5 w-auto',
    title: 'Freelance Cyber Security Researcher',
    company: 'PT. Doran Sukses Indonesia',
    type: 'Paruh Waktu',
    period: 'Agu 2026 – Saat ini',
    duration: '2 bln',
    location: 'Jakarta Raya, Indonesia · Jarak jauh',
    desc: 'Mengidentifikasi kerentanan dengan fokus pada keamanan website.',
    skills: ['Keamanan siber', 'Penetration Testing'],
    current: true,
  },
  {
    logo: '/logos/ruangguru.svg',
    logoAlt: 'Logo Ruangguru',
    logoClass: 'max-h-6 w-auto',
    title: 'Freelance Bug Hunter',
    company: 'Ruangguru',
    type: 'Pekerja Lepas',
    period: 'Agu 2026 – Saat ini',
    duration: '2 bln',
    location: 'Jakarta Raya, Indonesia · Jarak jauh',
    desc: 'Mengidentifikasi kerentanan pada domain atau subdomain ruangguru.com.',
    skills: ['Cybersecurity', 'Penetration Testing'],
    current: true,
  },
]

export default function Experience() {
  return (
    <Section id="pengalaman">
        <SectionHeading index="07" sub="Experience" title="Pengalaman" />

        <Reveal variant="right" className="max-w-3xl">
          <p className="text-[15px] leading-relaxed text-dim">
            Dua peran yang sedang aktif aku jalani saat ini.
          </p>
        </Reveal>

        <div className="relative mt-14 pl-7 sm:pl-10">
          {/* rail timeline vertikal */}
          <div className="absolute top-2 bottom-2 left-[9px] w-px bg-gradient-to-b from-mint via-volt to-transparent" />

          <div className="space-y-8">
            {ROLES.map((r, i) => (
              <Reveal
                key={r.company}
                variant={i % 2 === 0 ? 'left' : 'right'}
                delay={i * 0.12}
                className="relative"
              >
                {/* titik penanda */}
                <span className="absolute top-8 -left-7 grid h-[18px] w-[18px] place-items-center rounded-full border border-mint/50 bg-abyss sm:-left-10">
                  <span className="h-2 w-2 rounded-full bg-mint" />
                </span>

                <article className="rounded-lg border border-line bg-panel/60 p-5 transition hover:border-mint/30 hover:bg-panel sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded border border-line bg-abyss px-2 py-1.5">
                      <img
                        src={r.logo}
                        alt={r.logoAlt}
                        loading="lazy"
                        decoding="async"
                        className={r.logoClass}
                      />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <h3 className="font-display text-lg font-bold tracking-tight text-ice sm:text-xl">
                          {r.title}
                        </h3>
                        {r.current && (
                          <span className="rounded-full border border-mint/40 px-2 py-0.5 font-mono text-[10px] tracking-widest text-mint uppercase">
                            saat ini
                          </span>
                        )}
                      </div>

                      <p className="mt-1.5 text-sm text-ice/90">{r.company}</p>

                      <p className="mt-2.5 font-mono text-[11px] text-dim">
                        {r.type} · {r.period} · {r.duration}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-dim/70">
                        {r.location}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-dim">
                    {r.desc}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded border border-line bg-abyss/60 px-2.5 py-1 font-mono text-[10px] text-ice"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
    </Section>
  )
}
