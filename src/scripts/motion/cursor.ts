import { gsap } from 'gsap';
import { motion } from './state';

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const INTERACTIVE = 'a, button, summary, label, [data-cursor]';

/** A dot-and-ring cursor with contextual labels, plus magnetic buttons. Fine pointers only. */
export function initCursor(signal: AbortSignal) {
  const root = document.documentElement;
  const cursor = document.querySelector<HTMLElement>('[data-cursor-root]');
  const enabled = finePointer.matches && !motion.reduced && !!cursor;
  root.toggleAttribute('data-cursor-on', enabled);
  if (!enabled || !cursor) return;

  const dot = cursor.querySelector<HTMLElement>('.cursor-dot')!;
  const ring = cursor.querySelector<HTMLElement>('.cursor-ring')!;
  const label = cursor.querySelector<HTMLElement>('.cursor-label')!;
  const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

  window.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    cursor.dataset.visible = '';
    dotX(event.clientX); dotY(event.clientY);
    ringX(event.clientX); ringY(event.clientY);
  }, { passive: true, signal });
  document.addEventListener('pointerover', event => {
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>(INTERACTIVE) : null;
    const text = target?.dataset.cursor ?? '';
    label.textContent = text;
    cursor.dataset.state = target ? (text ? 'label' : 'hover') : '';
  }, { signal });
  document.addEventListener('pointerdown', () => cursor.toggleAttribute('data-pressed', true), { signal });
  document.addEventListener('pointerup', () => cursor.toggleAttribute('data-pressed', false), { signal });
  document.documentElement.addEventListener('pointerleave', () => delete cursor.dataset.visible, { signal });

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(element => {
    const moveX = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.45)' });
    const moveY = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.45)' });
    element.addEventListener('pointermove', event => {
      const bounds = element.getBoundingClientRect();
      moveX((event.clientX - bounds.left - bounds.width / 2) * 0.3);
      moveY((event.clientY - bounds.top - bounds.height / 2) * 0.3);
    }, { signal });
    element.addEventListener('pointerleave', () => { moveX(0); moveY(0); }, { signal });
  });

  return () => {
    root.removeAttribute('data-cursor-on');
    delete cursor.dataset.state;
  };
}
