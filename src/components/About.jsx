import Reveal from './Reveal'
import { Section, SectionHeading } from './Section'

export default function About() {
  const facts = [
    { k: 'OS Favorit', v: 'Kali Linux' },
    { k: 'Tools Harian', v: 'Nmap, Sqlmap, dirbuster, hydra' },
    { k: 'Sedang Belajar', v: 'Penetration Testing lebih dalam' },
    {
      k: 'Motto',
      v: 'Kemajuan yang tidak dibarengi dengan keamanan akan menjadi sebuah kesia-siaan.',
      real: true,
    },
  ]

  return (
    <Section id="tentang">
        <SectionHeading index="01" sub="About" title="Tentang Aku" />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal variant="left" delay={0.1} className="min-w-0 space-y-5 text-[15px] leading-relaxed text-dim">
            <p>
              Halo, aku <span className="text-ice">Muh Syahrir Hamdani</span>.
              Siswa <span className="text-ice">SMAN 1 Pinrang</span>, 17 tahun,
              dan sedang membangun jalurku sendiri di dunia keamanan siber:
              dari sekolah, dari laptop sendiri, dan dari kebiasaan mencoba
              hal baru setiap hari.
            </p>
            <p>
              Perjalananku di dunia teknologi dimulai dari rasa penasaran soal
              gimana sebuah sistem bisa dibobol, dan gimana cara nutup celahnya
              sebelum ada yang nyampe duluan.
            </p>
            <p>
              Ketertarikan itu membawa aku ke dunia{' '}
              <span className="text-ice">cybersecurity</span>, khususnya
              offensive security: web exploitation, reconnaissance, dan OSINT.
              Aku suka tantangan nyata, bukan sekadar teori, dan setiap bug yang
              ketemu adalah bukti belajar yang paling jujur.
            </p>
            <p>
              Aku ikut <span className="text-ice">Beasiswa Amartha Foundation</span>{' '}
              karena melihat ruang ini sebagai tempat bertumbuh bareng orang-orang
              yang punya visi besar. Nilai yang aku pegang: konsisten, jujur soal
              proses, dan selalu berbagi apa yang sudah dipelajari.
            </p>
            <p>
              Umur 17 tahun dan masih di bangku SMA bukan batasan. Justru dari
              situ aku belajar bahwa yang menentukan seberapa jauh seseorang
              bukan fasilitas, tapi seberapa konsisten dia mau belajar dan
              berani mencoba.
            </p>

            <div className="grid gap-3 pt-4 sm:grid-cols-2">
              {facts.map((f) => (
                <div
                  key={f.k}
                  className="rounded border border-line bg-panel/60 p-4 transition hover:border-mint/40"
                >
                  <div className="font-mono text-[10px] tracking-widest text-mint uppercase">
                    {f.k}
                  </div>
                  <div className="mt-1.5 text-sm">
                    {f.real ? (
                      f.v
                    ) : (
                      <span className="placeholder">{f.v}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* panel terminal-ish */}
          <Reveal variant="right" delay={0.25} className="min-w-0">
            <div className="relative overflow-hidden rounded-lg border border-line bg-panel/70 p-6">
              <div className="absolute right-4 top-4 font-mono text-[10px] tracking-widest text-dim">
                profile.json
              </div>
              <pre className="overflow-x-auto font-mono text-[12.5px] leading-relaxed text-dim">
{`{
  "nama": "Muh Syahrir Hamdani",
  "umur": 17,
  "sekolah": "SMAN 1 Pinrang",
  "role": "Cybersecurity Researcher",
  "status": "Amartha Foundation Awardee",
  "fokus": ["web exploitation", "osint", "recon"],
  "mindset": "curious · persistent",
  "next": "kuliah + sertifikasi + CTF"
}`}
              </pre>
              <div className="mt-6 border-t border-line pt-5">
                <div className="font-mono text-[10px] tracking-widest text-mint uppercase">
                  nilai yang dipegang
                </div>
                <ul className="mt-3 space-y-2 font-mono text-xs text-ice">
                  <li>
                    <span className="text-mint">›</span> belajar tiap hari, sekecil
                    apapun
                  </li>
                  <li>
                    <span className="text-mint">›</span> etika sebelum teknis
                  </li>
                  <li>
                    <span className="text-mint">›</span> kolaborasi &gt; kompetisi
                    kosong
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
    </Section>
  )
}
