import { useEffect, useRef, useState } from 'react'
import {
  AdditiveBlending,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  QuadraticBezierCurve3,
  Raycaster,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import LAND from '../data/land-dots.json'

/**
 * HeroGlobe, globe dot-matrix 3D sebagai latar hero.
 *
 * Alasan desain (R-31):
 * - Globe ini peta perjalanan dampak, bukan hiasan. Titik tujuan berasal dari
 *   institusi yang benar-benar memberi pengakuan (sinkron dengan Certificates.jsx),
 *   jadi visualnya membawa makna. Ada tooltip nama institusi saat marker disentuh.
 * - Warna bertugas: mint (#00e5a0) = asal/identitas, volt (#3d5afe) = koneksi/dampak.
 *   Dua aksen PRD, dengan peran yang jelas.
 * - Glow hanya hidup di elemen ini (focal point hero); sisanya tetap matte (dose cap R-13).
 * - Graticule mengikuti logika globe sungguhan (lintang/bujur), bukan tekstur grid dekoratif.
 *
 * Reduced-motion: satu frame statis, tanpa rotasi maupun pulse (R-19).
 */

const DEG = Math.PI / 180

// Institusi yang benar-benar memberi pengakuan, sinkron dengan Certificates.jsx.
// Koordinat pada level kota/HQ: cukup untuk titik di globe, bukan klaim alamat presisi.
// `short` dipakai roster di hero: bentuk pendek yang tetap jelas tanpa hover.
export const SITES = [
  { name: 'SMAN 1 Pinrang', short: 'Pinrang', sub: 'Titik awal', lat: -3.79, lon: 119.67, home: true },
  { name: 'NASA', short: 'NASA', sub: 'Letter of Recognition', lat: 38.883, lon: -77.016 },
  { name: 'Drexel University', short: 'Drexel', sub: 'Letter of Recognition', lat: 39.957, lon: -75.19 },
  { name: 'University of San Diego', short: 'San Diego', sub: 'Letter of Recognition', lat: 32.771, lon: -117.187 },
  { name: 'University of Oslo', short: 'UiO', sub: 'UiO-CERT Recognition', lat: 59.94, lon: 10.72 },
  { name: 'TU Dresden', short: 'TU Dresden', sub: 'Letter of Appreciation', lat: 51.028, lon: 13.727 },
  { name: 'Avans Hogeschool', short: 'Avans', sub: 'Letter of Appreciation', lat: 51.585, lon: 4.775 },
  { name: 'CERT-EU', short: 'CERT-EU', sub: 'Hall of Fame', lat: 50.85, lon: 4.35 },
  { name: 'Institut Teknologi Bandung', short: 'ITB', sub: 'Bug Hunter Bronze', lat: -6.891, lon: 107.611 },
  { name: 'KOMDIGI-CSIRT', short: 'KOMDIGI', sub: 'Top 10 Bug Hunter 2026', lat: -6.209, lon: 106.846 },
  { name: 'Motorola Solutions', short: 'Motorola', sub: 'Hall of Fame', lat: 41.878, lon: -87.63 },
]

function latLonToVec3(lat, lon, r = 1) {
  const phi = (90 - lat) * DEG
  const theta = (lon + 180) * DEG
  return new Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  )
}

function dotTexture() {
  const s = 64
  const c = document.createElement('canvas')
  c.width = c.height = s
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.45, 'rgba(255,255,255,0.92)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, s, s)
  const t = new CanvasTexture(c)
  t.colorSpace = SRGBColorSpace
  return t
}

// garis lintang/bujur: memberi kesan bola tanpa tekstur dekoratif tambahan (R-07)
function graticule() {
  const group = new Group()
  const mat = new LineBasicMaterial({
    color: 0x00e5a0,
    transparent: true,
    opacity: 0.1,
  })
  const R = 1.001
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts = []
    for (let lon = -180; lon <= 180; lon += 4) pts.push(latLonToVec3(lat, lon, R))
    group.add(new Line(new BufferGeometry().setFromPoints(pts), mat))
  }
  for (let lon = -180; lon < 180; lon += 30) {
    const pts = []
    for (let lat = -90; lat <= 90; lat += 4) pts.push(latLonToVec3(lat, lon, R))
    group.add(new Line(new BufferGeometry().setFromPoints(pts), mat))
  }
  return group
}

export default function HeroGlobe({ ready = true }) {
  const wrapRef = useRef(null)
  const tipRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  // scene dibangun sekali; start/stop dikendalikan lewat ref supaya tidak rebuild
  const ctrlRef = useRef(null)
  const readyRef = useRef(ready)
  useEffect(() => {
    readyRef.current = ready
    if (ready) ctrlRef.current?.sync()
  }, [ready])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // perangkat sentuh: tidak ada hover, jadi loop hover tidak boleh me-reset pilihan tap
    const noHover = window.matchMedia('(hover: none)').matches

    // ---------- renderer / scene ----------
    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.75 : 2),
    )
    renderer.setClearColor(0x000000, 0)
    wrap.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'

    const scene = new Scene()
    const camera = new PerspectiveCamera(38, 1, 0.1, 100)

    const globe = new Group()
    globe.rotation.x = 0.18
    scene.add(globe)

    // ---------- badan globe (occluder) ----------
    // bola gelap tepat di bawah permukaan titik; ini yang menyembunyikan sisi belakang
    const body = new Mesh(
      new SphereGeometry(0.994, 64, 48),
      new MeshBasicMaterial({ color: 0x070b12 }),
    )
    globe.add(body)

    // ---------- daratan ----------
    const dotTex = dotTexture()
    const landGeo = new BufferGeometry()
    const lp = new Float32Array(LAND.length * 3)
    for (let i = 0; i < LAND.length; i++) {
      const v = latLonToVec3(LAND[i][1], LAND[i][0], 1)
      lp[i * 3] = v.x
      lp[i * 3 + 1] = v.y
      lp[i * 3 + 2] = v.z
    }
    landGeo.setAttribute('position', new BufferAttribute(lp, 3))
    globe.add(
      new Points(
        landGeo,
        new PointsMaterial({
          color: 0x00e5a0,
          size: 0.0135,
          map: dotTex,
          transparent: true,
          opacity: 0.72,
          depthWrite: false,
          sizeAttenuation: true,
        }),
      ),
    )

    // ---------- atmosfer ----------
    scene.add(
      new Mesh(
        new SphereGeometry(1.16, 48, 32),
        new ShaderMaterial({
          vertexShader: `
            varying vec3 vN;
            void main(){
              vN = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }`,
          fragmentShader: `
            varying vec3 vN;
            void main(){
              float i = pow(0.62 - dot(vN, vec3(0.0, 0.0, 1.0)), 3.0);
              gl_FragColor = vec4(0.0, 0.9, 0.63, 1.0) * clamp(i, 0.0, 1.0);
            }`,
          blending: AdditiveBlending,
          side: BackSide,
          transparent: true,
          depthWrite: false,
        }),
      ),
    )

    globe.add(graticule())

    // ---------- situs ----------
    const home = SITES[0]
    const homeV = latLonToVec3(home.lat, home.lon, 1)

    const markerGeo = new SphereGeometry(0.013, 10, 10)
    const homeGeo = new SphereGeometry(0.02, 12, 12)
    const markerMat = new MeshBasicMaterial({ color: 0x3d5afe })
    const homeMat = new MeshBasicMaterial({ color: 0x00e5a0 })

    // markers[i] selalu milik SITES[i] supaya indeks hover tidak pernah meleset
    const markers = SITES.map((site) => {
      const m = new Mesh(
        site.home ? homeGeo : markerGeo,
        site.home ? homeMat : markerMat,
      )
      m.position.copy(latLonToVec3(site.lat, site.lon, 1.004))
      m.userData.site = site
      globe.add(m)
      return m
    })

    // proxy tak terlihat untuk raycast: marker visualnya kecil (~3px), jadi
    // area tangkap/sentuh diperbesar tanpa mengubah tampilan (target tap nyaman).
    const proxyGeo = new SphereGeometry(0.055, 8, 8)
    const proxyMat = new MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
    const proxies = markers.map((m) => {
      const p = new Mesh(proxyGeo, proxyMat)
      p.position.copy(m.position)
      globe.add(p)
      return p
    })

    const arcMat = new LineBasicMaterial({
      color: 0x3d5afe,
      transparent: true,
      opacity: 0.5,
      blending: AdditiveBlending,
      depthWrite: false,
    })

    const arcs = SITES.filter((s) => !s.home).map((site, i) => {
      const end = latLonToVec3(site.lat, site.lon, 1)
      const mid = homeV.clone().add(end).multiplyScalar(0.5)
      const d = homeV.distanceTo(end)
      mid.normalize().multiplyScalar(1 + Math.min(d * 0.42, 0.5))
      const pts = new QuadraticBezierCurve3(homeV, mid, end).getPoints(72)

      const line = new Line(new BufferGeometry().setFromPoints(pts), arcMat)
      line.geometry.setDrawRange(0, reduced ? pts.length : 0)
      globe.add(line)

      // pulse berjalan di sepanjang arc; hanya sebagian terlihat sekaligus supaya tidak noise
      const sprMat = new SpriteMaterial({
        map: dotTex,
        color: 0x9dfff0,
        transparent: true,
        opacity: 0,
        blending: AdditiveBlending,
        depthWrite: false,
      })
      const spr = new Sprite(sprMat)
      spr.scale.setScalar(0.026)
      globe.add(spr)

      return {
        pts,
        line,
        spr,
        sprMat,
        phase: i / (SITES.length - 1),
        reveal: reduced ? 1 : 0,
      }
    })

    // Orientasi awal: Pinrang di depan tapi digeser ke kiri-bawah panggung, supaya
    // arc ke Eropa/AS menyebar ke area kanan yang kosong (komposisi, bukan default).
    const az = Math.atan2(homeV.x, homeV.z)
    const baseY = -az + 0.5
    const baseX = globe.rotation.x
    globe.rotation.y = baseY

    // ---------- interaksi ----------
    const raycaster = new Raycaster()
    const ndc = new Vector2()
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    const tipV = new Vector3()
    let hoverIdx = null
    let tiltX = 0

    // placeTip: posisikan tooltip di proyeksi marker, lalu jepit ke dalam
    // area globe supaya tidak menembus tepi viewport di layar sempit (R-03).
    // Dipakai loop, hover reduced-motion, dan tap.
    const tipEl = tipRef.current
    const placeTip = () => {
      if (!tipEl || hoverIdx === null) return
      tipV.copy(markers[hoverIdx].position)
      markers[hoverIdx].parent.localToWorld(tipV)
      tipV.project(camera)
      const r = wrap.getBoundingClientRect()
      const half = (tipEl.offsetWidth || 140) / 2 + 6
      const x = Math.max(half, Math.min(r.width - half, (tipV.x * 0.5 + 0.5) * r.width))
      const y = Math.max(52, (-tipV.y * 0.5 + 0.5) * r.height)
      tipEl.style.left = `${x}px`
      tipEl.style.top = `${y}px`
    }

    // pickSite: cari marker terdekat yang tidak terhalang badan globe.
    // Satu implementasi untuk hover, reduced-motion, dan tap supaya konsisten.
    const pickSite = () => {
      raycaster.setFromCamera(ndc, camera)
      const wall = raycaster.intersectObject(body, false)[0]
      const hits = raycaster.intersectObjects(proxies, false)
      for (const hit of hits) {
        if (!wall || hit.distance < wall.distance) return proxies.indexOf(hit.object)
      }
      return null
    }

    const setPick = (idx) => {
      if (idx === hoverIdx) return
      hoverIdx = idx
      setHovered(idx)
    }

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect()
      pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 2
      ndc.x = pointer.tx
      ndc.y = -pointer.ty
      // reduced-motion tidak punya loop frame, jadi raycast hover dilakukan
      // langsung di sini supaya tooltip tetap bisa dipakai (R-19 + R-26)
      if (reduced) {
        setPick(pickSite())
        renderer.render(scene, camera)
        placeTip()
      }
    }
    const onLeave = () => {
      pointer.tx = 0
      pointer.ty = 0
      if (hoverIdx !== null) {
        hoverIdx = null
        setHovered(null)
      }
    }
    window.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)

    // tap di mobile: pilih marker terdekat di ruang layar (radius 48px) yang
    // menghadap kamera. Lebih dapat diprediksi daripada raycast-tepat, karena
    // jari tidak punya presisi piksel dan beberapa marker Eropa bertumpuk.
    const onTap = (e) => {
      const r = wrap.getBoundingClientRect()
      const t = e.touches?.[0] ?? e
      if (t.clientX === undefined) return
      const px = t.clientX - r.left
      const py = t.clientY - r.top
      const v = new Vector3()
      let best = null
      let bestD = 48
      for (let i = 0; i < proxies.length; i++) {
        v.copy(proxies[i].position)
        proxies[i].parent.localToWorld(v)
        if (v.dot(camera.position) <= 0) continue // sisi belakang globe
        v.project(camera)
        const sx = (v.x * 0.5 + 0.5) * r.width
        const sy = (-v.y * 0.5 + 0.5) * r.height
        const d = Math.hypot(sx - px, sy - py)
        if (d < bestD) {
          bestD = d
          best = i
        }
      }
      setPick(best)
      // render + posisi segera; penting saat reduced-motion (loop tidak berjalan)
      renderer.render(scene, camera)
      placeTip()
    }
    wrap.addEventListener('touchstart', onTap, { passive: true })

    // ---------- ukuran ----------
    // Mobile: globe adalah blok kotak (lebar <= 480), kamera mundur cukup
    // supaya bola + atmosphere + busur masuk seluruhnya tanpa terpotong.
    // Desktop: globe latar absolute, komposisi dipertahankan; canvas yang
    // mendekati persegi (layar lg sempit) diberi jarak sedikit lebih.
    const resize = () => {
      const w = wrap.clientWidth || 1
      const h = wrap.clientHeight || 1
      renderer.setSize(w, h, false)
      const aspect = w / h
      if (w <= 480) {
        camera.fov = 38
        camera.position.set(0, -0.02, 4.3)
      } else if (aspect < 1.15) {
        camera.fov = 38
        camera.position.set(-0.16, -0.05, 3.8)
      } else {
        camera.fov = 38
        camera.position.set(-0.16, -0.05, 3.45)
      }
      camera.aspect = aspect
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    // ---------- loop ----------
    const easeOut = (x) => 1 - Math.pow(1 - x, 3)
    let raf = 0
    let last = performance.now()
    let t = 0
    let running = false
    let visible = true

    const frame = (now) => {
      // dt dijepit ke rentang positif: rAF bisa fire dengan timestamp lebih awal
      // dari performance.now() saat start(), dan dt negatif merusak indeks arc
      const dt = Math.max(0, Math.min((now - last) / 1000, 0.05))
      last = now
      t += dt

      pointer.x += (pointer.tx - pointer.x) * 0.05
      pointer.y += (pointer.ty - pointer.y) * 0.05

      if (!reduced) {
        // rotasi dijeda saat marker sedang di-hover/di-tap, supaya tooltip
        // tidak "kabur" dari kursor saat globe berputar (UX, bukan dekorasi)
        const speed = hoverIdx === null ? 0.05 : 0
        globe.rotation.y += dt * speed
        tiltX += (pointer.y * -0.16 - tiltX) * 0.05
        globe.rotation.x = baseX + tiltX
        globe.rotation.z = pointer.x * 0.02
      }

      // reveal arc bertahap, lalu pulse berjalan di sepanjang arc
      for (const a of arcs) {
        if (a.reveal < 1) {
          a.reveal = Math.min(1, a.reveal + dt * 0.5)
          a.line.geometry.setDrawRange(
            0,
            Math.max(2, Math.floor(easeOut(a.reveal) * a.pts.length)),
          )
        }
        if (reduced) continue
        const p = (t * 0.11 + a.phase) % 1
        // clamp penuh: p dijamin di [0,1) karena t dijepit positif dan phase < 1
        const i = Math.max(0, Math.min(a.pts.length - 1, Math.floor(p * (a.pts.length - 1))))
        a.spr.position.copy(a.pts[i])
        a.sprMat.opacity = Math.sin(p * Math.PI) * 0.9 * a.reveal
      }

      // hover: raycast ke proxy, lalu buang marker yang terhalang badan globe.
      // Di perangkat sentuh dilewati: tidak ada kursor, dan raycast dengan NDC
      // basi akan menghapus pilihan yang baru saja dibuat lewat tap.
      if (!reduced && !noHover) {
        setPick(pickSite())
      }

      // tooltip mengikuti marker tanpa memicu re-render React
      placeTip()

      renderer.render(scene, camera)

      if (running && visible) raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running || reduced) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }
    // sync(): dipanggil saat gate splash terbuka, supaya animasi tidak jalan di balik layar
    const sync = () => {
      if (readyRef.current && visible) start()
      else stop()
    }
    ctrlRef.current = { sync }

    renderer.render(scene, camera) // frame statis pertama (reduced-motion / splash)

    // hentikan loop ketika hero keluar viewport (hemat baterai)
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        if (visible) sync()
        else stop()
      },
      { threshold: 0.02 },
    )
    io.observe(wrap)
    sync()

    return () => {
      stop()
      ctrlRef.current = null
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
      wrap.removeEventListener('touchstart', onTap)
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose()
        if (o.material) {
          if (o.material.map) o.material.map.dispose()
          o.material.dispose()
        }
      })
      dotTex.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === wrap) wrap.removeChild(renderer.domElement)
    }
  }, [])

  const site = hovered === null ? null : SITES[hovered]

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {/* tooltip: satu-satunya teks di lapisan globe, selebihnya aria-hidden */}
      <div
        ref={tipRef}
        aria-hidden="true"
        className={`pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[135%] transition-opacity duration-200 ${
          site ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="whitespace-nowrap rounded border border-mint/40 bg-abyss/95 px-3 py-2 text-center font-mono">
          <div className="text-[11px] tracking-wide text-ice">{site?.name ?? ''}</div>
          <div className="mt-0.5 text-[10px] tracking-widest text-mint uppercase">
            {site?.sub ?? ''}
          </div>
        </div>
      </div>
    </div>
  )
}