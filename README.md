# Muh Syahrir Hamdani, Personal Site

Situs perkenalan pribadi: cybersecurity researcher dan AI engineer.
Dibangun sebagai satu halaman dengan hero 3D, terminal interaktif, dan
seksi pencapaian yang datanya nyata.

## Stack

- **React 19** + **Vite 8** (build)
- **Tailwind v4** (styling, via `@tailwindcss/vite`)
- **three.js** (globe 3D di hero)
- **GSAP + ScrollTrigger** (animasi intro dan reveal)
- Font: Space Grotesk (display), JetBrains Mono (data/label)

Tanpa backend. Situs statis, seluruh data ada di source.

## Menjalankan lokal

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output ke dist/
npm run preview  # pratinjau hasil build
```

## Struktur

```
src/
  components/       komponen per seksi + hero, terminal, navbar, footer
  data/             land-dots.json (titik daratan untuk globe)
  index.css         token tema (warna, font) + utilitas kecil
public/             aset statis: profil.jpg, certs/, logos/, favicon
vercel.json         konfigurasi deploy + security headers
DESIGN.md           arah desain: palet, tipografi, dial, alasan keputusan
```

## Fitur utama

**Hero 3D.** Globe dot-matrix dari data daratan Natural Earth (5.200 titik,
di-embed sebagai JSON). 11 institusi yang memberi pengakuan ditandai di globe,
dengan busur dari Pinrang sebagai titik asal. Hover (desktop) atau tap (mobile)
menampilkan nama dan jenis pengakuan.

**Terminal interaktif.** Boot sequence berjalan sekali, lalu jadi prompt yang
bisa dipakai: `help`, `ls`, `goto <seksi>`, `whoami`, `kontak`, `clear`.

**Konten berbasis data nyata.** Semua pencapaian, sertifikat, pengalaman kerja,
liputan media, dan project AI berasal dari data yang dapat diverifikasi. Tidak
ada angka, testimoni, atau klaim yang dibuat-buat.

## Aksesibilitas

- Kontras teks memenuhi WCAG AA (diverifikasi dengan perhitungan rasio).
- Semua kontrol bisa diakses keyboard dengan focus ring yang terlihat.
- `prefers-reduced-motion` mematikan animasi dan menyajikan tampilan statis
  yang tetap lengkap.
- Target sentuh minimum 44px; layout diuji di 320/360/390/414/430px.

## Keamanan

- Tanpa backend, tanpa kredensial, tanpa cookie.
- Security headers diatur di `vercel.json`: CSP, HSTS, nosniff, frame DENY,
  Referrer-Policy, Permissions-Policy.
- Semua tautan eksternal memakai `rel="noopener noreferrer"`.

## Deploy

Repo ini disiapkan untuk Vercel. Framework terdeteksi otomatis (Vite);
build command `npm run build`, output `dist/`.

---

Dibuat oleh Muh Syahrir Hamdani, Amartha Foundation Awardee.
