import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from './state';
import type { Horizon, HorizonMode } from '../three/horizon';

const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl');
  } catch { return false; }
};

const constrained = () => {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  return !!nav.connection?.saveData || (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2;
};

/**
 * Every `[data-horizon="arc|planet"]` section gets its own glowing orange horizon. The shader module
 * loads only when a section approaches the viewport; otherwise (or with reduced motion) its CSS glow stays.
 */
export function bindHorizon() {
  const sections = [...document.querySelectorAll<HTMLElement>('[data-horizon]')];
  if (!sections.length || motion.reduced || constrained() || !supportsWebGL()) return () => {};
  const cleanups = sections.map(bindSection);
  return () => cleanups.forEach(cleanup => cleanup());
}

function bindSection(section: HTMLElement) {
  const canvas = section.querySelector<HTMLCanvasElement>('canvas[data-horizon-canvas]');
  if (!canvas) return () => {};
  const mode: HorizonMode = section.dataset.horizon === 'arc' ? 'arc' : 'planet';
  let disposed = false;
  let visible = false;
  let rise = 0;
  let horizon: Horizon | null = null;
  const sync = () => {
    if (!horizon) return;
    if (visible && motion.canAnimate()) horizon.start(); else horizon.stop();
  };
  const unsubscribe = motion.subscribe(sync);
  const context = gsap.context(() => {
    ScrollTrigger.create({
      trigger: section,
      start: mode === 'arc' ? 'top top' : 'top bottom',
      end: mode === 'arc' ? 'bottom top' : 'center center',
      onUpdate: self => { rise = self.progress; horizon?.setRise(rise); },
    });
  });

  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    if (visible && !horizon) {
      import('../three/horizon').then(({ createHorizon }) => {
        if (disposed || horizon) return;
        horizon = createHorizon(canvas, mode);
        if (!horizon) return;
        section.setAttribute('data-horizon-live', '');
        horizon.setRise(rise);
        sync();
      });
    }
    sync();
  }, { rootMargin: '300px 0px' });
  observer.observe(section);

  return () => {
    disposed = true;
    observer.disconnect();
    unsubscribe();
    context.revert();
    horizon?.destroy();
    horizon = null;
    section.removeAttribute('data-horizon-live');
  };
}
