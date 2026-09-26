import Reveal from './Reveal'
import { Section, SectionHeading } from './Section'

const STEPS = [
  'Perkuat fundamental: jaringan, sistem operasi, kriptografi',
  'Latihan praktik: CTF, lab mandiri, platform bug bounty',
  'Ambil sertifikasi relevan (mis. eJPT / OSCP jalur panjang)',
  'Bangun portofolio: writeup, tools, kontribusi komunitas',
]

export default function DreamUniversity() {
  return (
    <Section id="universitas">
        <SectionHeading
          index="05"
          sub="Destination"
          title="Universitas Impian"
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* kartu universitas */}
          <Reveal variant="left" className="order-2 min-w-0 lg:order-1">
            <div className="flex h-full flex-col items-center justify-center rounded-lg border border-line bg-panel/70 p-10 text-center">
              <div className="grid w-full max-w-xs place-items-center rounded-lg border border-line bg-abyss px-6 py-5">
                <img
                  src="/logo-ui.png"
                  alt="Logo Universitas Indonesia"
                  className="w-full"
                  loading="lazy"
                  width="818"
                  height="250"
                />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-ice">
                Universitas Indonesia
              </h3>
              <p className="mt-2 font-mono text-[11px] tracking-widest text-mint uppercase">
                S1 Ilmu Komputer
              </p>
              <div className="mt-6 w-full rounded border border-line bg-abyss/60 p-4 text-left font-mono text-xs">
                <div className="flex justify-between border-b border-line py-2">
                  <span className="text-dim">jurusan</span>
                  <span className="text-ice">Ilmu Komputer</span>
                </div>
                <div className="flex justify-between border-b border-line py-2">
                  <span className="text-dim">jenjang</span>
                  <span className="text-ice">S1</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-dim">target masuk</span>
                  <span className="text-ice">2027</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* alasan + persiapan */}
          <Reveal variant="right" delay={0.15} className="order-1 min-w-0 space-y-8 lg:order-2">
            <div>
              <h3 className="font-mono text-xs tracking-widest text-mint uppercase">
                kenapa universitas ini
              </h3>
              <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-dim">
                <p>
                  Aku ingin masuk Universitas Indonesia karena di sana ada
                  orang-orang terbaik bangsa. Belajar di antara mereka bukan
                  cuma soal nilai, tapi soal cara berpikir, cara kerja, dan
                  standar yang lebih tinggi dari yang aku bisa capai sendiri.
                </p>
                <p>
                  Aku percaya keamanan siber adalah salah satu hal yang bisa
                  memberi dampak nyata untuk negeri ini. Lewat Ilmu Komputer
                  UI, aku ingin membangun fondasi yang kuat: bukan sekadar bisa
                  menemukan celah, tapi juga mampu merancang sistem yang lebih
                  aman sejak awal.
                </p>
                <p>
                  Tujuanku sederhana tapi serius: ikut menciptakan hal-hal yang
                  berdampak untuk Indonesia, bareng orang-orang yang punya
                  misi yang sama.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs tracking-widest text-mint uppercase">
                langkah persiapan
              </h3>
              <ol className="mt-4 space-y-3">
                {STEPS.map((s, i) => (
                  <li
                    key={i}
                    className="group flex items-start gap-4 rounded border border-line bg-panel/50 p-4 transition hover:border-mint/40 hover:bg-panel"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded bg-mint/10 font-mono text-[11px] text-mint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-relaxed text-ice">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
    </Section>
  )
}
