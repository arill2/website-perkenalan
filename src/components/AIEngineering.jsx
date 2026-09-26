import { useEffect, useRef } from 'react'
import Reveal from './Reveal'
import { Section, SectionHeading } from './Section'

/**
 * Section AI Engineering.
 *
 * Prinsip yang dipegang (antislop):
 * - Semua data di sini diambil dari README repo aslinya (diakses 25 Sep 2026),
 *   tidak ada angka atau klaim fabrikasi (R-17, R-18, R-36, R-38).
 * - Dua project sengaja diberi perlakuan visual berbeda (R-14): project visi
 *   memakai grid metode deteksi, project klasifikasi memakai diagram pipeline.
 *   Variasinya mengikuti bentuk datanya, bukan template kartu yang diseragamkan.
 * - Aksen: mint untuk project visi, volt untuk project klasifikasi. Tugasnya
 *   memisahkan dua bidang, bukan hiasan (R-01, R-29).
 * - Ikon arrow pada link keluar menandai navigasi eksternal (semantik, bukan dekorasi).
 */

const CHIP =
  'rounded border border-line bg-abyss/60 px-2.5 py-1 font-mono text-[10px] text-ice'

const STACKS = {
  vision: ['Python', 'OpenCV', 'MediaPipe', 'Real-time'],
  ml: ['Python', 'TensorFlow', 'MobileNetV2', 'Transfer Learning'],
}

// Skema deteksi acne scanner: 4 metode paralel yang digabung (dari README repo).
const METHODS = [
  { k: 'Redness HSV', v: 'Deteksi kemerahan pada ruang warna HSV' },
  { k: 'Tekstur Laplacian', v: 'Analisis tekstur permukaan kulit' },
  { k: 'Dark spots', v: 'Deteksi bintik gelap dan hiperpigmentasi' },
  { k: 'LAB a-channel', v: 'Anomali warna pada ruang warna LAB' },
]

const ZONES = ['Dahi', 'Pipi Kiri', 'Pipi Kanan', 'Hidung', 'Dagu', 'Rahang']

// Pipeline model plant disease: dua tahap latihan (dari README repo).
const STAGES = [
  { k: 'Input', v: '224 × 224 × 3' },
  { k: 'MobileNetV2', v: 'pretrained ImageNet, backbone beku di tahap 1' },
  { k: 'GlobalAveragePooling2D', v: 'meringkas peta fitur' },
  { k: 'BatchNormalization', v: 'menstabilkan distribusi aktivasi' },
  { k: 'Dense 512 + Dropout 0.4', v: '' },
  { k: 'Dense 256 + Dropout 0.3', v: '' },
  { k: 'Dense 10 softmax', v: '10 kelas penyakit daun tomat' },
]

// Ilustrasi alur pemindaian wajah: menggambarkan fitur asli (zona + scan line),
// bukan tangkapan layar aplikasi. Diberi label supaya tidak dibaca sebagai screenshot final.
function ScanIllustration() {
  const wrapRef = useRef(null)

  // Scan line bergerak hanya selama ilustrasi terlihat, berhenti saat keluar viewport.
  // Ini bagian dari motion, bukan loop abadi (R-19), dan ikut mati di reduced-motion
  // lewat override durasi animasi di index.css.
  useEffect(() => {
    const el = wrapRef.current?.querySelector('.scan-line')
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.display = 'none'
      return
    }
    let raf = 0
    let t0 = performance.now()
    let visible = true
    const tick = (now) => {
      const p = ((now - t0) / 2600) % 1
      el.setAttribute('transform', `translate(0 ${(p * 240).toFixed(1)})`)
      if (visible) raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        if (visible) {
          t0 = performance.now() - (t0 ? (performance.now() - t0) % 2600 : 0)
          raf = requestAnimationFrame(tick)
        } else {
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.05 },
    )
    io.observe(wrapRef.current)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  return (
    <figure ref={wrapRef} className="overflow-hidden rounded-lg border border-line bg-abyss/60">
      <div className="relative aspect-[4/3]">
        <svg viewBox="0 0 320 240" className="h-full w-full" role="img" aria-label="Ilustrasi pembagian zona wajah dan garis pemindaian">
          {/* oval wajah */}
          <ellipse cx="160" cy="120" rx="62" ry="84" fill="none" stroke="rgba(0,229,160,0.35)" strokeWidth="1.5" />
          {/* pembagian zona */}
          <line x1="98" y1="80" x2="222" y2="80" stroke="rgba(0,229,160,0.22)" strokeWidth="1" />
          <line x1="98" y1="112" x2="222" y2="112" stroke="rgba(0,229,160,0.22)" strokeWidth="1" />
          <line x1="98" y1="148" x2="222" y2="148" stroke="rgba(0,229,160,0.22)" strokeWidth="1" />
          <line x1="160" y1="80" x2="160" y2="148" stroke="rgba(0,229,160,0.22)" strokeWidth="1" />
          {/* marker deteksi (warna mengikuti tingkat keparahan pada aplikasi) */}
          <circle cx="132" cy="96" r="3.5" fill="#00e5a0" />
          <circle cx="188" cy="130" r="3.5" fill="#ffbd2e" />
          <circle cx="140" cy="168" r="3.5" fill="#ff5f56" />
          <circle cx="176" cy="96" r="3.5" fill="#00e5a0" />
          {/* scan line berjalan */}
          <g className="scan-line">
            <rect x="94" y="0" width="132" height="2.5" fill="#00e5a0" opacity="0.85" />
            <rect x="94" y="0" width="132" height="14" fill="url(#scanFade)" opacity="0.5" />
          </g>
          <defs>
            <linearGradient id="scanFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e5a0" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#00e5a0" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute bottom-2 left-2 font-mono text-[10px] tracking-widest text-dim uppercase">
          ilustrasi alur pemindaian
        </span>
      </div>
      <figcaption className="border-t border-line px-4 py-3 font-mono text-[10px] leading-relaxed text-dim">
        Enam zona wajah dianalisis terpisah, hasil deteksi dihaluskan dengan
        rata-rata 15 frame agar stabil.
      </figcaption>
    </figure>
  )
}

export default function AIEngineering() {
  return (
    <Section id="ai">
        <SectionHeading index="04" sub="Machine Learning" title="AI Engineering" />

        <Reveal variant="right" className="max-w-3xl">
          <p className="text-[15px] leading-relaxed text-dim">
            Selain keamanan, aku juga membangun sistem yang belajar dari data.
            Dua project di bawah ini adalah pekerjaan andalanku: keduanya
            open source dan bisa dilihat langsung di GitHub.
          </p>
        </Reveal>

        {/* ---------- Project 1: vision / real-time ---------- */}
        <article className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <Reveal variant="left" className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-display text-2xl font-bold tracking-tight text-ice sm:text-3xl">
                Advanced Skin Acne Scanner
              </h3>
              <span className="font-mono text-xs text-mint">v2.0</span>
            </div>
            <p className="mt-1.5 font-mono text-[11px] tracking-widest text-dim uppercase">
              computer vision · analisis real-time
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-dim">
              Analisis kulit wajah secara real-time lewat kamera. Sistem
              mendeteksi jerawat, mengklasifikasi zona wajah, lalu memberi
              rekomendasi perawatan sesuai tingkat keparahan yang terbaca.
            </p>

            {/* alasan tampilan: 4 metode ini berjalan paralel, jadi bentuknya grid, bukan list */}
            <div className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
              {METHODS.map((m) => (
                <div key={m.k} className="bg-panel/80 p-4">
                  <div className="font-mono text-[10px] tracking-widest text-mint uppercase">
                    {m.k}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-dim">{m.v}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded border border-line bg-panel/50 p-4">
                <div className="font-mono text-[10px] tracking-widest text-mint uppercase">
                  skor kesehatan kulit
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-dim">
                  Skala 0 sampai 100 dari gabungan empat sinyal deteksi, dengan
                  indikator visual per zona.
                </p>
              </div>
              <div className="rounded border border-line bg-panel/50 p-4">
                <div className="font-mono text-[10px] tracking-widest text-mint uppercase">
                  face mesh 468 titik
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-dim">
                  Visualisasi landmark wajah bisa dinyalakan untuk memeriksa
                  akurasi pemetaan zona. Hasil scan dapat disimpan.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {STACKS.vision.map((s) => (
                <span key={s} className={CHIP}>
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-7">
              <a
                href="https://github.com/arill2/acne-detector"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded border border-mint/50 bg-panel px-5 py-3 font-mono text-xs tracking-wider text-mint uppercase transition hover:border-mint hover:bg-mint hover:text-abyss"
              >
                Lihat kode di GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.15} className="min-w-0">
            <ScanIllustration />
            <div className="mt-5 rounded-lg border border-line bg-panel/50 p-5">
              <div className="font-mono text-[10px] tracking-widest text-mint uppercase">
                zona yang dianalisis
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {ZONES.map((z) => (
                  <span
                    key={z}
                    className="rounded border border-line bg-abyss/60 px-2.5 py-1 font-mono text-[10px] text-ice"
                  >
                    {z}
                  </span>
                ))}
              </div>
              <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-dim">
                Marker hasil deteksi dibedakan per tingkat keparahan, dan
                rekomendasi skincare menyesuaikan zona yang bermasalah.
              </p>
            </div>
          </Reveal>
        </article>

        {/* ---------- Project 2: klasifikasi / transfer learning ---------- */}
        <article className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.25fr]">
          <Reveal variant="left" className="order-2 min-w-0 lg:order-1">
            <div className="overflow-hidden rounded-lg border border-line bg-abyss/60">
              <div className="border-b border-line px-4 py-3 font-mono text-[10px] tracking-widest text-volt-2 uppercase">
                arsitektur model
              </div>
              <ol className="px-4 py-4">
                {STAGES.map((s, i) => (
                  <li key={s.k} className="relative flex gap-4 pb-4 last:pb-0">
                    {/* rail pipeline */}
                    {i < STAGES.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute top-6 left-[7px] h-full w-px bg-volt/30"
                      />
                    )}
                    <span className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-sm border border-volt/60 bg-abyss" />
                    <div className="min-w-0">
                      <div className="font-mono text-[12px] text-ice">{s.k}</div>
                      {s.v && (
                        <div className="mt-0.5 text-[11px] leading-relaxed text-dim">
                          {s.v}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              <div className="border-t border-line px-4 py-3 font-mono text-[10px] leading-relaxed text-dim">
                Latihan dua tahap: head beku dulu, lalu fine-tune 30 layer
                terakhir MobileNetV2.
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.15} className="order-1 min-w-0 lg:order-2">
            <h3 className="font-display text-2xl font-bold tracking-tight text-ice sm:text-3xl">
              Plant Disease Detection AI
            </h3>
            <p className="mt-1.5 font-mono text-[11px] tracking-widest text-dim uppercase">
              deep learning · klasifikasi citra
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-dim">
              Sistem deteksi penyakit daun tomat yang mengidentifikasi 10 kelas
              penyakit lewat gambar statis maupun webcam. Dibangun dengan
              transfer learning MobileNetV2, bukan model dari nol.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                'Dua mode analisis: unggah gambar atau tangkap langsung dari webcam.',
                'Menampilkan tiga kandidat prediksi sekaligus dengan bar chart keyakinan.',
                'Setiap kelas dilengkapi tingkat keparahan dan saran penanganannya.',
                'Pengujian bisa dilakukan lewat satu skrip: python predict.py, lalu pilih mode.',
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-dim">
                  <span aria-hidden="true" className="mt-0.5 font-mono text-volt-2">
                    ›
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {STACKS.ml.map((s) => (
                <span key={s} className={CHIP}>
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-7">
              <a
                href="https://github.com/arill2/A.I-plant-desease-detect"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded border border-volt/60 bg-panel px-5 py-3 font-mono text-xs tracking-wider text-volt-2 uppercase transition hover:border-volt hover:bg-volt hover:text-abyss"
              >
                Lihat kode di GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>
        </article>
    </Section>
  )
}
