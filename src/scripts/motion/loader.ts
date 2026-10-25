import { gsap } from 'gsap';

/**
 * The first-visit intro counter. The inline head script decides whether it shows
 * (`html[data-loader]`); CSS hides it after a few seconds if this never runs.
 */
export function runLoader(): Promise<void> {
  const root = document.documentElement;
  const loader = document.querySelector<HTMLElement>('[data-loader-root]');
  if (!loader || !root.hasAttribute('data-loader')) return Promise.resolve();
  const count = loader.querySelector<HTMLElement>('[data-loader-count]');
  const bar = loader.querySelector<HTMLElement>('[data-loader-bar]');
  const progress = { value: 0 };
  return new Promise(resolve => {
    gsap.timeline({ onComplete: () => { root.removeAttribute('data-loader'); resolve(); } })
      .to(progress, {
        value: 100,
        duration: 1.15,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (count) count.textContent = String(Math.round(progress.value)).padStart(3, '0');
          if (bar) bar.style.transform = `scaleX(${progress.value / 100})`;
        },
      })
      .to(loader, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '+=0.1');
  });
}
