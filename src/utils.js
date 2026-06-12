export function smoothScrollTo(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return

  document.documentElement.classList.add('is-clicking')
  window.setTimeout(() => document.documentElement.classList.remove('is-clicking'), 520)

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
