import { useEffect, type RefObject } from 'react';

const SELECTOR = ['.reveal', '.reveal-wipe', '.reveal-grow'].map((c) => `${c}:not(.is-revealed)`).join(', ');

/**
 * Plays reveal animations once an element's top passes 15% up from the
 * bottom of the screen. Watches the container for content swapped in by
 * page transitions.
 */
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const show = (el: Element) => {
      el.classList.add('is-revealed');
      observer.unobserve(el);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && show(entry.target)),
      { rootMargin: '0px 0px -15% 0px' },
    );

    let queued = false;
    const scan = () => {
      queued = false;
      container.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el));
    };
    const queueScan = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(scan);
    };

    // At the very bottom of the page the 15% line can't be reached
    const onScroll = () => {
      if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 4) return;
      container.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) show(el);
      });
    };

    scan();
    const mutations = new MutationObserver(queueScan);
    mutations.observe(container, { childList: true, subtree: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [containerRef]);
}
