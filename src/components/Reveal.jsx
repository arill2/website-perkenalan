import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Wrapper reveal saat masuk viewport.
 * variant: 'up' (default) | 'left' | 'right' | 'scale'
 * Dipakai bergantian per section supaya ritme tidak seragam.
 */
const VARIANTS = {
  up: (y) => ({ y }),
  left: () => ({ x: -48 }),
  right: () => ({ x: 48 }),
  scale: () => ({ scale: 0.92 }),
}

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  variant = 'up',
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // hormati preferensi reduced-motion: tampilkan tanpa animasi
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { autoAlpha: 1 })
      return
    }
    // geser horizontal hanya kalau ada ruang; di layar sempit pakai naik vertikal
    const wide = window.matchMedia('(min-width: 1024px)').matches
    const from = wide ? (VARIANTS[variant]?.(y) ?? VARIANTS.up(y)) : VARIANTS.up(y)
    const anim = gsap.fromTo(
      el,
      { autoAlpha: 0, ...from },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      },
    )
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [delay, y, variant])

  return (
    <Tag ref={ref} className={className} style={{ visibility: 'hidden' }}>
      {children}
    </Tag>
  )
}
