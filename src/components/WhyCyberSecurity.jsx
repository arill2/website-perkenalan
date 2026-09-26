import Reveal from './Reveal'
import { Section, SectionHeading } from './Section'

export default function WhyCyberSecurity() {
  const reasons = [
    {
      k: 'Hidup kita sudah pindah ke sistem digital',
      v: 'Identitas, keuangan, komunikasi, dan data kesehatan kini disimpan di layanan daring. Begitu satu sistem bocor, dampaknya langsung terasa ke orang, bukan cuma ke mesin.',
    },
    {
      k: 'Serangan berjalan otomatis dan murah',
      v: 'Pemindai celah dan bot dapat menyisir jutaan alamat dalam hitungan jam. Penyerang tidak perlu menargetkan siapa pun secara khusus untuk menemukan sistem yang belum ditambal.',
    },
    {
      k: 'Kerugiannya mahal dan sering tak terlihat',
      v: 'Selain biaya pemulihan dan downtime, kepercayaan yang hilang jauh lebih sulit dibangun ulang. Kebocoran data pribadi bisa dipakai untuk penipuan bertahun-tahun setelahnya.',
    },
    {
      k: 'Sudah ada aturan yang mewajibkannya',
      v: 'Lewat UU Perlindungan Data Pribadi, organisasi di Indonesia wajib menjaga data yang mereka kelola. Kepatuhan ini butuh orang yang paham cara sistem diserang dan cara menutupnya.',
    },
  ]

  return (
    <Section id="penting">
        <SectionHeading index="02" sub="Why it matters" title="Kenapa Cyber Security Penting?" />

        <Reveal variant="right" className="max-w-3xl">
          <p className="text-[15px] leading-relaxed text-dim">
            Keamanan siber bukan urusan perusahaan besar saja. Setiap layanan yang kita pakai
            sehari-hari menaruh datanya di suatu tempat, dan tempat itu perlu dijaga.
          </p>
        </Reveal>

        <div className="mt-14 border-t border-line">
          {reasons.map((r, i) => (
            <Reveal
              key={r.k}
              variant={i % 2 === 0 ? 'left' : 'right'}
              delay={i * 0.08}
              className="grid gap-3 border-b border-line py-7 sm:grid-cols-[3rem_1fr] sm:gap-6"
            >
              <span className="font-mono text-[11px] tracking-[0.25em] text-mint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl">{r.k}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-dim">{r.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
    </Section>
  )
}
