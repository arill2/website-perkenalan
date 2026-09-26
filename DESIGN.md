# DESIGN.md — website_perkenalan

> Arah desain situs perkenalan Muh Syahrir Hamdani.
> Dibaca bersama `antislop.md` (filter) dan `skills/antislop-ui/SKILL.md`.

## Identitas

**Subjek:** personal showcase, dua identitas: cybersecurity researcher (offensive
security, bug bounty) dan AI engineer (computer vision, deep learning).

**Kesan yang dituju:** "ohh Muh Syahrir Hamdani kaya begini toh" (dari PRD).
Operator yang serius tapi membumi, bukan CV kaku, bukan korporat dingin.

**Audience:** sesama awardee Amartha Foundation, tim Amartha, jaringan akademik
dan komunitas cybersecurity.

## Nada visual

Terminal/HUD yang sudah ditinggalkan gaya "matrix hijau": abyss gelap sebagai
kanvas, satu aksen mint untuk identitas, satu aksen volt untuk koneksi/dampak.
Dua aksen punya tugas, bukan sekadar warna.

Bukan: dark mode "karena keren". Alasannya subjek hidup di terminal dan tools
security; tema gelap adalah bahasa kerjaannya, dan itu dinyatakan di PRD.

## Dial

```
Dial: ENERGY 3 / RHYTHM 2 / MOTION 2
```

| Dial | Nilai | Alasan |
|---|---|---|
| ENERGY | 3 | Personal showcase; hero harus langsung bicara. Globe 3D + terminal interaktif adalah dua pernyataan kuat. |
| RHYTHM | 2 | 10 section; variasinya nyata (timeline, split asimetris, grid metode, list press) tapi tetap satu keluarga. Bukan asimetris agresif, karena isinya informasional. |
| MOTION | 2 | Tiga momen berkesan (globe, terminal boot, arc pulse) lalu berhenti. Reveal per section halus. Bukan parallax-pin-choreography, karena kontennya yang harus dibaca, bukan animasinya. |

Dial ini mengikat. Kalau ada section yang gerakannya melebihi MOTION 2, itu bug
desain, bukan fitur.

## Palet

| Peran | Nilai | Dipakai untuk |
|---|---|---|
| Kanvas | `#05070a` (abyss) | latar seluruh halaman |
| Panel | `#0d1117`, `#11161d` | kartu, terminal, panel |
| Identitas | `#00e5a0` (mint) | aksen utama: titik asal, CTA primer, status aktif |
| Koneksi | `#3d5afe` (volt) | aksen kedua: arc globe, marker tujuan, fase karier berikutnya. Non-teks (border, dot, marker): rasio bebas |
| Koneksi teks | `#7b8cff` (volt-2) | teks berwarna volt. Volt asli hanya 3.9:1 di abyss (gagal WCAG AA); volt-2 mencapai 6.3:1 di panel |
| Teks utama | `#e8fff7` (ice) | judul dan isi utama |
| Teks sekunder | `#7a9aa3` (dim) | meta, label, deskripsi. 6.3:1 di panel (WCAG AA) |
| Garis | `rgba(0,229,160,0.14)` | border halus, pemisah section |

Palet aktif: 2 aksen (mint, volt) + netral. Di dalam batas R-29.

Warna hangat hanya di satu tempat: logo Amartha di splash apresiasi. Itu
disengaja, supaya fokus jatuh tepat ke penghargaan, bukan tersebar di halaman.

## Tipografi

| Peran | Font | Alasan |
|---|---|---|
| Display | Space Grotesk | Geometris dengan karakter teknis; dipilih di PRD untuk headline |
| Mono | JetBrains Mono | Bahasa visual terminal: label, data, kode, navigasi |

Dua font, dua tugas. Mono dipakai untuk yang berperan sebagai "data", bukan
sebagai hiasan.

## Gerak (MOTION 2)

Tiga momen yang punya izin bergerak:
1. **Globe hero**: rotasi lambat + arc reveal + pulse berjalan. Berhenti saat hover (biar tooltip tidak kabur), berhenti saat keluar viewport.
2. **Terminal boot**: diketik sekali, lalu jadi prompt interaktif sungguhan.
3. **Scan-line ilustrasi AI**: bergerak hanya saat ilustrasi terlihat.

Aturan lain: reveal per section halus, satu kali, tidak berulang. Tidak ada loop
abadi. `prefers-reduced-motion` mematikan semua gerak dan menyajikan frame
statis yang tetap lengkap.

## Motif identitas

**Titik dan arc.** Titik = tempat/institusi, arc = hubungan antara titik asal
(Pinrang) dan titik pengakuan. Motif ini muncul di tiga skala: globe di hero,
roster institusi di bawah hero, dan rail timeline di section karier/pengalaman.
Ini yang membuat desain "milik" subjek: peta perjalanan, bukan template.

## Batasan yang dipegang

- Tidak ada angka, testimoni, atau klaim tanpa sumber. Pencapaian di situs semuanya merujuk sertifikat/penghargaan nyata.
- Placeholder (foto profil, kontak) ditandai terlihat sebagai placeholder sampai data asli tersedia.
- Satu file HTML self-contained tidak lagi jadi target; situs berjalan sebagai build React + Vite.
