const STORAGE_KEY = 'am-motion-paused';
const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const listeners = new Set<() => void>();

const readPaused = () => {
  try { return sessionStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
};
let paused = readPaused();

/** Mirrors the motion state onto <html> so CSS can stop decorative loops. */
export function syncRoot() {
  const root = document.documentElement;
  root.toggleAttribute('data-motion-paused', paused || reducedQuery.matches);
  root.toggleAttribute('data-motion-hidden', document.hidden);
}

function emit() {
  syncRoot();
  listeners.forEach(listener => listener());
}

export const motion = {
  /** The visitor's system setting; disables pinning, smoothing, 3D and loops. */
  get reduced() { return reducedQuery.matches; },
  /** The on-page pause button; stops autonomous motion but keeps scroll-linked layout. */
  get paused() { return paused; },
  /** Whether autonomous, decorative motion may run right now. */
  canAnimate() { return !reducedQuery.matches && !paused && !document.hidden; },
  setPaused(value: boolean) {
    paused = value;
    try { sessionStorage.setItem(STORAGE_KEY, value ? '1' : '0'); } catch { /* storage unavailable */ }
    emit();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  },
};

reducedQuery.addEventListener('change', emit);
document.addEventListener('visibilitychange', emit);

/** Infinite timelines (marquees, rotators) that follow the pause state. */
const loops = new Set<{ play: () => unknown; pause: () => unknown }>();
export function registerLoop(loop: { play: () => unknown; pause: () => unknown }) {
  loops.add(loop);
  if (!motion.canAnimate()) loop.pause();
  return () => { loops.delete(loop); };
}
motion.subscribe(() => loops.forEach(loop => (motion.canAnimate() ? loop.play() : loop.pause())));
