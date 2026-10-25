import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerLoop } from './state';
import { initCarousel } from './carousel';

const one = (selector: string, root: ParentNode = document) => root.querySelector<HTMLElement>(selector);
const all = (selector: string, root: ParentNode = document) => [...root.querySelectorAll<HTMLElement>(selector)];

/**
 * Scroll-driven section choreography. Runs inside `gsap.matchMedia()`, so everything here is
 * reverted when the breakpoint or the reduced-motion preference changes.
 */
export function buildSections({ desktop }: { desktop: boolean }) {
  const cleanups: (() => void)[] = [initCarousel(desktop)];
  hero();
  statement();
  stackedWork(desktop);
  orbit(desktop);
  marquee(cleanups);
  spotlight();
  caseStudy();
  footer();
  return () => cleanups.forEach(cleanup => cleanup());
}

/** The headline block eases up and fades as the carousel takes over the viewport. */
function hero() {
  const section = one('.hero');
  const copy = section && one('.hero-copy', section);
  if (!section || !copy) return;
  gsap.to(copy, { y: -80, opacity: 0, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: '70% top', scrub: true } });
}

/** The optional showreel frame grows as it scrolls into view. */
function statement() {
  const reel = one('.statement-reel');
  if (reel) gsap.fromTo(reel, { scale: 0.78 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: reel, start: 'top bottom', end: 'center center', scrub: true } });
}

/** Sticky project cards: each one shrinks and dims as the next slides over it. */
function stackedWork(desktop: boolean) {
  const cards = all('.stack-card');
  cards.forEach((card, index) => {
    const next = cards[index + 1];
    const inner = one('.stack-inner', card);
    const dim = one('.stack-dim', card);
    if (!inner) return;
    if (!next) return;
    const scrollTrigger = { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true };
    gsap.to(inner, { scale: desktop ? 0.92 : 0.95, ease: 'none', scrollTrigger });
    if (dim) gsap.to(dim, { opacity: 1, ease: 'none', scrollTrigger: { ...scrollTrigger } });
  });
}

/** Floating tiles around the expertise heading drift at their own parallax speeds. */
function orbit(desktop: boolean) {
  const section = one('.orbit');
  if (!section) return;
  // On phones the tiles sit at the section edges, so they drift less to stay clear of the copy.
  const reach = desktop ? 110 : 36;
  all('[data-speed]', section).forEach(tile => {
    const speed = Number(tile.dataset.speed) || 1;
    gsap.fromTo(tile, { y: speed * reach }, {
      y: -speed * reach, ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

/** Logo marquees loop forever; scrolling briefly speeds them up. */
function marquee(cleanups: (() => void)[]) {
  const tracks = all('.marquee-track');
  if (!tracks.length) return;
  const loops = tracks.map((track, index) => {
    const reverse = index % 2 === 1;
    return gsap.fromTo(track, { xPercent: reverse ? -50 : 0 }, { xPercent: reverse ? 0 : -50, duration: 40, ease: 'none', repeat: -1 });
  });
  loops.forEach(loop => cleanups.push(registerLoop(loop)));
  ScrollTrigger.create({
    trigger: tracks[0],
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: self => {
      const speed = 1 + Math.min(Math.abs(self.getVelocity()) / 260, 6);
      loops.forEach(loop => gsap.to(loop, {
        timeScale: speed, duration: 0.2, overwrite: true,
        onComplete: () => { gsap.to(loop, { timeScale: 1, duration: 1.2 }); },
      }));
    },
  });
}

/** The Experience section's CSS horizon rises with the scroll (the WebGL horizon replaces it when live). */
function spotlight() {
  const section = one('[data-horizon="planet"]');
  const glow = section && one('.horizon-css', section);
  if (!section || !glow) return;
  gsap.fromTo(glow, { yPercent: 35, scale: 0.85 }, {
    yPercent: 0, scale: 1, ease: 'none',
    scrollTrigger: { trigger: section, start: 'top bottom', end: 'center center', scrub: true },
  });
}

/** Case studies: the cover grows to full-bleed; gallery media drifts within its frame. */
function caseStudy() {
  const cover = one('.case-cover');
  if (cover) {
    const scrollTrigger = { trigger: cover, start: 'top bottom', end: 'top 15%', scrub: true };
    gsap.fromTo(one('.case-cover-inner', cover), { clipPath: 'inset(6% 7% 6% 7% round 36px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger });
    const media = one('.visual', cover);
    if (media) gsap.fromTo(media, { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { ...scrollTrigger } });
  }
  all('[data-parallax]').forEach(frame => {
    const media = one('img, video', frame);
    if (media) gsap.fromTo(media, { yPercent: -7 }, {
      yPercent: 7, ease: 'none',
      scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

/** The oversized footer wordmark rises into place as the page ends. */
function footer() {
  const mark = one('.footer-wordmark-inner');
  if (!mark) return;
  gsap.fromTo(mark, { yPercent: 100 }, {
    yPercent: 0, ease: 'none',
    scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true },
  });
}
