import Lenis from 'lenis'

let instance: Lenis | null = null

export function initLenis(_rtl = false) {
  if (instance) { instance.destroy(); instance = null }
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    // RTL page layout doesn't affect vertical scroll direction
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  instance = lenis
  return lenis
}

export function destroyLenis() {
  instance?.destroy()
  instance = null
}

export function getLenis() { return instance }
