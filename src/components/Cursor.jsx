import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let raf = 0

    const move = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
      cursor.style.left = `${mouseX}px`
      cursor.style.top = `${mouseY}px`
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.11
      ringY += (mouseY - ringY) * 0.11
      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      raf = requestAnimationFrame(tick)
    }

    const makeBig = () => ring.classList.add('big')
    const makeNormal = () => ring.classList.remove('big')
    const bindHover = () => {
      document.querySelectorAll('a,button,.card').forEach((el) => {
        el.addEventListener('mouseenter', makeBig)
        el.addEventListener('mouseleave', makeNormal)
      })
    }

    document.addEventListener('mousemove', move)
    bindHover()
    tick()

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      document.querySelectorAll('a,button,.card').forEach((el) => {
        el.removeEventListener('mouseenter', makeBig)
        el.removeEventListener('mouseleave', makeNormal)
      })
    }
  }, [])

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
