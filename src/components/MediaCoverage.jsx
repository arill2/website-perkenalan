import Reveal from './Reveal'
import { Section, SectionHeading } from './Section'

const ARTICLES = [
  {
    outlet: 'detikSulsel',
    date: '28 Apr 2026',
    title: 'Sosok Syahrir Siswa Asal Pinrang Bobol Sistem Keamanan Kampus San Diego AS',
    url: 'https://www.detik.com/sulsel/sulsel-ewako/d-8465417/sosok-syahrir-siswa-asal-pinrang-bobol-sistem-keamanan-kampus-san-diego-as',
  },
  {
    outlet: 'detikSulsel',
    date: '30 Apr 2026',
    title: 'Cerita Syahrir Siswa SMA Pinrang Bobol Sistem Keamanan 3 Kampus Luar Negeri',
    url: 'https://www.detik.com/sulsel/sulsel-ewako/d-8467907/cerita-syahrir-siswa-sma-pinrang-bobol-sistem-keamanan-3-kampus-luar-negeri',
  },
  {
    outlet: 'Tribun Timur',
    date: '7 Jul 2026',
    title: 'Syahrir Hamdani Siswa SMAN 1 Pinrang Bobol Domain NASA Dapat Penghargaan Internasional',
    url: 'https://makassar.tribunnews.com/pinrang/1843504/syahrir-hamdani-siswa-sman-1-pinrang-bobol-domain-nasa-dapat-penghargaan-internasional',
  },
  {
    outlet: 'Global Sultra',
    date: '25 Apr 2026',
    title: 'Syahrir Hamdani SMAN 1 Pinrang Dapat Penghargaan Dari Universitas AS',
    url: 'https://globalsultra.com/2026/04/25/syahrir-hamdani-sman-1-pinrang-dapat-penghargaan-dari-universitas-as/',
  },
]

export default function MediaCoverage() {
  return (
    <Section id="media">
        <SectionHeading index="09" sub="Press" title="Liputan Media" />

        <Reveal variant="left" className="max-w-3xl">
          <p className="text-[15px] leading-relaxed text-dim">
            Beberapa liputan media tentang perjalanan dan temuan yang aku laporkan
            secara bertanggung jawab. Klik tiap baris untuk membaca artikel aslinya.
          </p>
        </Reveal>

        <div className="mt-14 border-t border-line">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.url} delay={i * 0.06}>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-3 border-b border-line py-7 transition hover:border-mint/40 hover:bg-panel/40 sm:grid-cols-[3rem_1fr] sm:gap-6"
              >
                <span className="font-mono text-[11px] tracking-[0.25em] text-mint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 font-mono text-[11px] tracking-wider">
                    <span className="text-mint">{a.outlet}</span>
                    <span aria-hidden="true" className="text-dim">
                      ·
                    </span>
                    <span className="text-dim">{a.date}</span>
                  </div>
                  <h3 className="mt-2 break-words font-display text-lg font-bold tracking-tight text-ice sm:text-xl">
                    {a.title}
                  </h3>
                  <span className="mt-3 inline-block font-mono text-[11px] text-mint transition group-hover:text-ice">
                    Baca artikel
                    <span aria-hidden="true"> ↗</span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
    </Section>
  )
}
