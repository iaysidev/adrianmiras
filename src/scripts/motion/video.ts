import { motion } from './state';

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

/**
 * Muted previews: `data-video="auto"` plays while visible; `data-video="hover"` plays while its
 * `[data-video-host]` is hovered (or while visible on touch screens). Nothing plays when motion is off.
 */
export function initVideos(signal: AbortSignal) {
  const videos = [...document.querySelectorAll<HTMLVideoElement>('video[data-video]')];
  if (!videos.length) return;
  const visible = new Set<HTMLVideoElement>();
  const hovered = new Set<HTMLVideoElement>();

  const sync = () => videos.forEach(video => {
    const wanted = motion.canAnimate() && visible.has(video)
      && (video.dataset.video === 'auto' || hovered.has(video) || !finePointer.matches);
    if (wanted && video.paused) video.play().catch(() => { /* autoplay refused; the poster remains */ });
    if (!wanted && !video.paused) video.pause();
    video.closest('[data-video-host]')?.toggleAttribute('data-playing', wanted);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) visible.add(video); else visible.delete(video);
    });
    sync();
  }, { threshold: 0.2 });

  videos.forEach(video => {
    observer.observe(video);
    const host = video.closest<HTMLElement>('[data-video-host]');
    if (video.dataset.video !== 'hover' || !host) return;
    host.addEventListener('pointerenter', () => { hovered.add(video); sync(); }, { signal });
    host.addEventListener('pointerleave', () => { hovered.delete(video); sync(); }, { signal });
  });
  const unsubscribe = motion.subscribe(sync);

  return () => {
    observer.disconnect();
    unsubscribe();
    videos.forEach(video => video.pause());
  };
}
