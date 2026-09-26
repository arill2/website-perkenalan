import Reveal from './Reveal'
import { Section, SectionHeading } from './Section'

const LINKS = [
  {
    label: 'LinkedIn',
    handle: 'in/muhsyahrirhamdani',
    icon: 'in',
    hint: 'profesional & karier',
    href: 'https://www.linkedin.com/in/muhsyahrirhamdani/',
  },
  {
    label: 'GitHub',
    handle: '@arill2',
    icon: 'gh',
    hint: 'tools & eksperimen',
    href: 'https://github.com/arill2',
  },
  {
    label: 'Instagram',
    handle: '@m.syahrirhmdn',
    icon: 'ig',
    hint: 'daily life & update',
    href: 'https://www.instagram.com/m.syahrirhmdn/',
  },
]

export default function Contact() {
  return (
    <Section id="kontak">
        <SectionHeading index="10" sub="Connect" title="Mari Terhubung" />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal variant="left" className="min-w-0 space-y-6">
            <blockquote className="border-l-2 border-mint pl-6">
              <p className="font-display text-xl leading-relaxed text-ice sm:text-2xl">
                Kemajuan yang tidak dibarengi dengan keamanan akan menjadi
                sebuah kesia-siaan.
              </p>
              <footer className="mt-3 font-mono text-[11px] tracking-widest text-dim uppercase">
                motto pribadi
              </footer>
            </blockquote>
            <p className="text-[15px] leading-relaxed text-dim">
              Terbuka untuk diskusi soal cybersecurity, kolaborasi project,
              atau sekadar ngobrol santai. Jangan ragu untuk menyapa, aku
              selalu senang bertemu orang baru.
            </p>
          </Reveal>

          <Reveal variant="right" delay={0.15} className="min-w-0">
            <div className="grid gap-4 sm:grid-cols-2">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-lg border border-line bg-panel/60 p-5 transition hover:-translate-y-0.5 hover:border-mint/40"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded border border-mint/30 bg-abyss font-mono text-[11px] tracking-tight text-mint">
                    {l.icon}
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] tracking-widest text-dim uppercase">
                      {l.label}
                    </span>
                    <span className="mt-1 block text-sm text-ice">
                      {l.handle}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] text-dim">
                      {l.hint}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
    </Section>
  )
}
