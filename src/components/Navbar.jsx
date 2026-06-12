import { useEffect, useState } from 'react'
import { smoothScrollTo } from '../utils'

const links = [
  ['#films', 'Films'],
  ['#workflow', 'Process'],
  ['#about', 'About'],
  ['#contact', 'Contact']
]

export default function Navbar() {
  const [dark, setDark] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setDark(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (href) => {
    setOpen(false)
    smoothScrollTo(href)
  }

  return (
    <>
      <nav id="nav" className={dark ? 'dark' : ''}>
        <button type="button" onClick={() => goTo('#hero')} className="nav-logo">Phan Minh Đức</button>
        <ul className="nav-links">
          {links.map(([href, label]) => (
            <li key={href}>
              <button type="button" onClick={() => goTo(href)} className="nav-link">{label}</button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => goTo('#contact')} className="nav-cta">Work with me</button>
        <button className={`ham ${open ? 'open' : ''}`} onClick={() => setOpen((value) => !value)} aria-label="Open menu" type="button">
          <span className="l1" /><span className="l2" /><span className="l3" />
        </button>
      </nav>
      <div id="mob" className={open ? 'on' : ''}>
        {links.map(([href, label]) => (
          <button key={href} type="button" className="mml" onClick={() => goTo(href)}>{label}</button>
        ))}
      </div>
    </>
  )
}
