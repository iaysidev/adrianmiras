type Cleanup = void | (() => void);

/**
 * Runs `init` on every page view, including client-side navigations, and tears it down
 * before the next page is swapped in. Listeners registered with `signal` are removed automatically.
 */
export function onPage(init: (signal: AbortSignal) => Cleanup) {
  let controller: AbortController | undefined;
  let cleanup: Cleanup;
  const teardown = () => {
    controller?.abort();
    if (typeof cleanup === 'function') cleanup();
    controller = undefined;
    cleanup = undefined;
  };
  document.addEventListener('astro:page-load', () => {
    teardown();
    controller = new AbortController();
    cleanup = init(controller.signal);
  });
  document.addEventListener('astro:before-swap', teardown);
}
