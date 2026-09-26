import Reveal from './Reveal'
import { Section, SectionHeading } from './Section'

export default function OffensiveSecurity() {
  const pillars = [
    {
      tag: 'web_exploitation',
      title: 'Web Exploitation',
      body: 'Mencari dan membuktikan celah pada aplikasi web: broken access control, injeksi, XSS, SSRF, sampai business logic yang bocor. Fokusnya bukan sekadar memindai, tapi membuktikan dampak lewat pasangan request dan response nyata.',
    },
    {
      tag: 'reconnaissance',
      title: 'Reconnaissance',
      body: 'Memetakan attack surface sebelum pengujian dimulai: enumerasi subdomain, fingerprint teknologi, analisis bundel JavaScript, dan menggali URL lama dari arsip. Recon yang rapi menentukan kualitas temuan yang muncul setelahnya.',
    },
    {
      tag: 'osint',
      title: 'OSINT',
      body: 'Open Source Intelligence: merangkai informasi dari sumber publik seperti DNS, sertifikat TLS, repositori kode, dan jejak digital lain. Banyak temuan besar berawal dari data yang sebenarnya sudah terbuka.',
    },
  ]

  return (
    <Section id="offsec">
        <SectionHeading index="03" sub="Field" title="Apa itu Offensive Security?" />

        <Reveal variant="left" className="max-w-3xl">
          <p className="text-[15px] leading-relaxed text-dim">
            Offensive security adalah praktik menyerang sistem secara legal dan terkontrol untuk
            menemukan celah sebelum pihak yang berniat jahat menemukannya. Tujuannya bukan merusak,
            melainkan membuktikan risiko lalu menutupnya. Tiga area yang aku dalami:
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          <Reveal variant="up" className="bg-panel p-7">
            <div className="font-mono text-[11px] tracking-[0.25em] text-mint uppercase">
              // {pillars[0].tag}
            </div>
            <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{pillars[0].title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-dim">{pillars[0].body}</p>
          </Reveal>

          <Reveal variant="up" delay={0.1} className="bg-panel p-7">
            <div className="font-mono text-[11px] tracking-[0.25em] text-mint uppercase">
              // {pillars[1].tag}
            </div>
            <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{pillars[1].title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-dim">{pillars[1].body}</p>
          </Reveal>

          <Reveal variant="up" delay={0.2} className="bg-panel p-7">
            <div className="font-mono text-[11px] tracking-[0.25em] text-mint uppercase">
              // {pillars[2].tag}
            </div>
            <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{pillars[2].title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-dim">{pillars[2].body}</p>
          </Reveal>
        </div>
    </Section>
  )
}
