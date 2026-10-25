import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { registerLoop } from './state';

/**
 * Turns the hero's card row into a concave 3D arc. Cards are positioned every frame from one
 * continuous `offset`, which auto-advances, follows drags (with inertia), steps with the
 * prev/next buttons, and drifts with the page scroll. Without this script the row simply scrolls.
 */
export function initCarousel(desktop: boolean) {
  const root = document.querySelector<HTMLElement>('[data-carousel]');
  const stage = root?.querySelector<HTMLElement>('[data-carousel-stage]');
  const cards = root ? [...root.querySelectorAll<HTMLElement>('[data-carousel-card]')] : [];
  if (!root || !stage || cards.length < 3) return () => {};

  root.setAttribute('data-3d', '');
  const count = cards.length;
  const step = (desktop ? 15 : 22) * (Math.PI / 180);
  const spacing = desktop ? 290 : 200;
  const radius = spacing / step;
  const limit = Math.PI * 0.42;
  const state = { offset: 0, scroll: 0, lift: 0 };
  let auto = true;
  let resumeTimer = 0;

  const wrap = (value: number) => ((value % count) + count + count / 2) % count - count / 2;
  const render = () => {
    const base = state.offset + state.scroll;
    const flatten = 1 - state.lift * 0.35;
    cards.forEach((card, index) => {
      const slot = wrap(index - base);
      const angle = slot * step;
      const visible = Math.abs(angle) < limit;
      gsap.set(card, {
        x: Math.sin(angle) * radius,
        z: (1 - Math.cos(angle)) * radius * 0.55 * flatten,
        y: -state.lift * 40 + Math.abs(slot) * 6,
        rotationY: -angle * (180 / Math.PI) * flatten,
        opacity: visible ? 1 - Math.max(0, Math.abs(angle) / limit - 0.75) * 4 : 0,
        zIndex: Math.round(100 - Math.abs(slot) * 10),
        visibility: visible ? 'visible' : 'hidden',
      });
      card.toggleAttribute('data-front', Math.abs(slot) < 0.5);
    });
  };

  const drift = (_time: number, delta: number) => {
    if (auto) state.offset += delta / 1000 * 0.12;
    render();
  };
  // The per-frame loop only runs while the carousel is on screen.
  let ticking = false;
  const setTicking = (on: boolean) => {
    if (on === ticking) return;
    ticking = on;
    if (on) gsap.ticker.add(drift); else gsap.ticker.remove(drift);
  };
  const visibility = new IntersectionObserver(entries => setTicking(entries.some(entry => entry.isIntersecting)), { rootMargin: '100px 0px' });
  visibility.observe(root);
  setTicking(true);
  const loop = { play: () => { auto = true; }, pause: () => { auto = false; } };
  const unregister = registerLoop(loop);
  const holdAuto = () => {
    auto = false;
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => { auto = true; }, 3500);
  };
  const goTo = (target: number) => {
    holdAuto();
    gsap.to(state, { offset: target, duration: 0.9, ease: 'expo.out', overwrite: true });
  };

  // Dragging moves a proxy; its x is mapped onto the card offset.
  const proxy = document.createElement('div');
  let startOffset = 0;
  const [drag] = Draggable.create(proxy, {
    type: 'x',
    trigger: stage,
    inertia: true,
    minimumMovement: 6,
    dragClickables: true,
    onPress() { holdAuto(); gsap.killTweensOf(state); startOffset = state.offset; gsap.set(proxy, { x: 0 }); this.update(); },
    onDrag() { state.offset = startOffset - this.x / spacing; },
    onThrowUpdate() { state.offset = startOffset - this.x / spacing; },
    snap: value => Math.round(value / spacing) * spacing,
  });

  const signal = new AbortController();
  root.querySelector('[data-carousel-prev]')?.addEventListener('click', () => goTo(Math.round(state.offset) - 1), { signal: signal.signal });
  root.querySelector('[data-carousel-next]')?.addEventListener('click', () => goTo(Math.round(state.offset) + 1), { signal: signal.signal });
  cards.forEach((card, index) => card.addEventListener('focusin', () => {
    goTo(state.offset + wrap(index - state.offset - state.scroll));
  }, { signal: signal.signal }));

  // Scrolling past the hero turns the ring and lifts it slightly.
  const hero = root.closest('section') ?? root;
  gsap.to(state, {
    scroll: 2.5,
    lift: 1,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
  });
  render();

  return () => {
    visibility.disconnect();
    setTicking(false);
    unregister();
    window.clearTimeout(resumeTimer);
    drag?.kill();
    signal.abort();
    root.removeAttribute('data-3d');
    cards.forEach(card => { card.removeAttribute('data-front'); gsap.set(card, { clearProps: 'all' }); });
  };
}
