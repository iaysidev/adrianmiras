import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | undefined;
const raf = (time: number) => lenis?.raf(time * 1000);

/** Smooth wheel scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function startSmoothScroll() {
  if (lenis) return lenis;
  lenis = new Lenis({ lerp: 0.11, anchors: { offset: -72 }, autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function stopSmoothScroll() {
  if (!lenis) return;
  gsap.ticker.remove(raf);
  gsap.ticker.lagSmoothing(500, 33);
  lenis.destroy();
  lenis = undefined;
}

export const getLenis = () => lenis;
