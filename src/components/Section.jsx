import Reveal from './Reveal'

/**
 * Judul section: nomor indeks + label monospace + judul display.
 * Dipakai oleh seluruh section bernomor di situs.
 */
export function SectionHeading({ index, title, sub }) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] text-mint uppercase">
        <span>{index}</span>
        <span className="h-px w-16 bg-mint/40" />
        <span className="text-dim">{sub}</span>
      </div>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
    </Reveal>
  )
}

/**
 * Kerangka section standar: border atas, padding responsif, container max-w-6xl.
 * Alasan: pola ini dipakai 10 section; satu definisi mencegah drift saat
 * padding atau lebar container diubah (sebelumnya mengubahnya berarti edit 10 file).
 */
export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative border-t border-line py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-5">{children}</div>
    </section>
  )
}

export default SectionHeading
