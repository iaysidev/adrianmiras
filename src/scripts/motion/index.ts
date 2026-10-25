import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { onPage } from '../lifecycle';
import { motion, syncRoot } from './state';
import { startSmoothScroll, stopSmoothScroll } from './smooth-scroll';
import { heroIntro, textReveals } from './text';
import { buildSections } from './sections';
import { initCursor } from './cursor';
import { initVideos } from './video';
import { initFloatingMedia } from './float';
import { runLoader } from './loader';
import { bindHorizon } from './scene-bridge';

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin);

/**
 * Progressive enhancement: every page is complete without this module. It adds smooth scrolling,
 * scroll choreography, the 3D scene, the cursor, and video previews, and respects both the
 * system reduced-motion setting and the on-page pause button.
 */
export function initializeMotion() {
  onPage(signal => {
    const root = document.documentElement;
    if (!document.body.hasAttribute('data-motion-page')) { root.removeAttribute('data-hero-pending'); return; }
    syncRoot();

    const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]')];
    const syncButtons = () => buttons.forEach(button => {
      button.hidden = false;
      button.disabled = motion.reduced;
      button.setAttribute('aria-pressed', String(motion.paused || motion.reduced));
      button.title = motion.reduced ? 'Your device’s reduced-motion setting is on.' : 'Pause or play decorative motion';
      const label = button.querySelector('[data-motion-label]');
      if (label) label.textContent = motion.reduced ? 'Motion reduced' : motion.paused ? 'Play motion' : 'Pause motion';
    });
    const syncSmoothScroll = () => (!motion.reduced && !motion.paused ? startSmoothScroll() : stopSmoothScroll());
    buttons.forEach(button => button.addEventListener('click', () => motion.setPaused(!motion.paused), { signal }));
    const unsubscribe = motion.subscribe(() => { syncButtons(); syncSmoothScroll(); });
    syncButtons();
    syncSmoothScroll();

    const ready = runLoader();
    const media = gsap.matchMedia();
    media.add({ desktop: '(min-width: 900px)', motionOK: '(prefers-reduced-motion: no-preference)' }, context => {
      const { desktop, motionOK } = context.conditions as { desktop: boolean; motionOK: boolean };
      if (!motionOK) { root.removeAttribute('data-hero-pending'); return; }
      if (motion.paused) root.removeAttribute('data-hero-pending'); else heroIntro(ready);
      textReveals();
      return buildSections({ desktop });
    });
    const unbindScene = bindHorizon();
    const cleanups = [initCursor(signal), initVideos(signal), initFloatingMedia(signal)];

    // Keyboard focus finishes any pending entrance, so focus never lands on invisible content.
    document.addEventListener('focusin', event => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      ScrollTrigger.getAll().forEach(trigger => {
        if (!trigger.vars.scrub && trigger.trigger instanceof Element && trigger.trigger.contains(target)) trigger.animation?.progress(1);
      });
      const block = target.closest('[data-reveal]');
      if (block) gsap.to(block, { opacity: 1, y: 0, duration: 0.2, overwrite: true });
    }, { signal });

    document.addEventListener('portfolio:projects-filtered', event => {
      const cards = (event as CustomEvent<{ cards: HTMLElement[] }>).detail?.cards ?? [];
      ScrollTrigger.refresh();
      if (motion.reduced) { gsap.set(cards, { opacity: 1, y: 0 }); return; }
      gsap.fromTo(cards, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: 'expo.out', overwrite: true });
    }, { signal });

    document.fonts?.ready.then(() => { if (!signal.aborted) ScrollTrigger.refresh(); });
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true, signal });

    return () => {
      unsubscribe();
      media.revert();
      unbindScene();
      cleanups.forEach(cleanup => cleanup?.());
      stopSmoothScroll();
    };
  });
}
