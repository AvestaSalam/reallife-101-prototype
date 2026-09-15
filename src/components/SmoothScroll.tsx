"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: number | string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

interface SmoothScrollProps {
  children: ReactNode;
  /** CSS selector for the scroll container. Defaults to the first `.smooth-scroll` element. */
  containerRef?: React.RefObject<HTMLElement>;
}

export default function SmoothScroll({ children, containerRef }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const container = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Find the scroll container
    const el = containerRef?.current || document.querySelector<HTMLElement>(".smooth-scroll");
    if (!el) return;
    container.current = el;

    // Initialize Lenis on this container
    const lenis = new Lenis({
      wrapper: el,
      content: el.firstElementChild as HTMLElement | undefined,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      // Touch stays NATIVE on phones: intercepting touch events (syncTouch)
      // fights the browser's momentum scrolling and feels glitchy. Lenis only
      // smooths desktop-style wheel input.
      syncTouch: false,
      infinite: false,
    });

    lenisRef.current = lenis;

    // RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Expose globally for components that need it
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, [containerRef]);

  const scrollTo = (
    target: number | string | HTMLElement,
    options?: { offset?: number; duration?: number }
  ) => {
    lenisRef.current?.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
    });
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}