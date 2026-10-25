import { gsap } from 'gsap';

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

/** Hovering a `[data-float-item]` reveals its `[data-float-media]` and lets it trail the pointer. */
export function initFloatingMedia(signal: AbortSignal) {
  if (!finePointer.matches) return;
  document.querySelectorAll<HTMLElement>('[data-float-item]').forEach(item => {
    const media = item.querySelector<HTMLElement>('[data-float-media]');
    if (!media) return;
    const enabled = () => !item.closest('.is-grid');
    gsap.set(media, { xPercent: -50, yPercent: -50 });
    const moveX = gsap.quickTo(media, 'x', { duration: 0.6, ease: 'power3' });
    const moveY = gsap.quickTo(media, 'y', { duration: 0.6, ease: 'power3' });
    const follow = (event: PointerEvent, instant = false) => {
      const bounds = item.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      if (instant) gsap.set(media, { x, y }); else { moveX(x); moveY(y); }
    };
    item.addEventListener('pointerenter', event => {
      if (!enabled()) return;
      follow(event, true);
      item.setAttribute('data-floating', '');
      gsap.to(media, { opacity: 1, scale: 1, rotate: gsap.utils.random(-5, 5), duration: 0.45, ease: 'expo.out', overwrite: 'auto' });
    }, { signal });
    item.addEventListener('pointermove', event => { if (enabled()) follow(event); }, { signal });
    item.addEventListener('pointerleave', () => {
      item.removeAttribute('data-floating');
      gsap.to(media, { opacity: 0, scale: 0.85, rotate: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    }, { signal });
  });
}
