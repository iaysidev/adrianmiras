import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

const EASE = 'expo.out';

/** Headings rise line by line from a mask; long copy brightens word by word while scrolling. */
export function textReveals(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-split]:not([data-split="hero"])').forEach(element => {
    SplitText.create(element, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: self => gsap.from(self.lines, {
        yPercent: 110,
        duration: 1.1,
        ease: EASE,
        stagger: 0.08,
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      }),
    });
  });

  root.querySelectorAll<HTMLElement>('[data-scrub-text]').forEach(element => {
    SplitText.create(element, {
      type: 'words',
      autoSplit: true,
      onSplit: self => gsap.fromTo(self.words, { opacity: 0.16 }, {
        opacity: 1,
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: { trigger: element, start: 'top 82%', end: 'bottom 55%', scrub: true },
      }),
    });
  });

  // Opacity-only reveals keep content focusable before it scrolls into view.
  const blocks = gsap.utils.toArray<HTMLElement>('[data-reveal]', root as Element);
  if (blocks.length) {
    gsap.set(blocks, { opacity: 0, y: 40 });
    ScrollTrigger.batch(blocks, {
      start: 'top 90%',
      once: true,
      // clearProps hands transforms back to CSS so hover effects keep working afterwards.
      onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: EASE, stagger: 0.08, overwrite: true, clearProps: 'transform' }),
    });
  }
}

/** The homepage headline rises line by line, then the buttons and the carousel follow. */
export function heroIntro(ready: Promise<void>) {
  const headline = document.querySelector<HTMLElement>('[data-split="hero"]');
  const root = document.documentElement;
  if (!headline) { root.removeAttribute('data-hero-pending'); return; }
  const split = SplitText.create(headline, { type: 'lines', mask: 'lines' });
  const timeline = gsap.timeline({ paused: true })
    .from(split.lines, { yPercent: 110, duration: 1.2, ease: EASE, stagger: 0.1 })
    .from('[data-hero-in]', { opacity: 0, y: 36, duration: 1.1, ease: EASE, stagger: 0.1, clearProps: 'transform' }, '-=0.9');
  // The initial frame of the timeline is now applied, so the CSS guard can be lifted.
  root.removeAttribute('data-hero-pending');
  ready.then(() => timeline.play());
  return timeline;
}
