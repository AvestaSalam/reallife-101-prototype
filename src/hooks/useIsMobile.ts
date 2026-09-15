"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Cache MediaQueryList objects so repeated snapshot reads don't allocate.
 */
const mqlCache = new Map<string, MediaQueryList>();

function getMql(query: string): MediaQueryList {
  let mql = mqlCache.get(query);
  if (!mql) {
    mql = window.matchMedia(query);
    mqlCache.set(query, mql);
  }
  return mql;
}

/**
 * Returns true when the viewport is at or below the given breakpoint.
 *
 * Uses `useSyncExternalStore` + `matchMedia` instead of useState/useEffect so
 * the viewport is read SYNCHRONOUSLY on the client:
 *
 * - During client-side navigation the very first render of a new page already
 *   reflects the real device (no flash of the desktop layout on phones).
 * - During SSR/hydration React uses the server snapshot (`false`, desktop
 *   baseline) to stay in sync with the server-rendered HTML, then immediately
 *   re-renders with the real value — React's officially supported pattern for
 *   media queries, with no hydration mismatch warnings.
 */
export function useIsMobile(breakpoint = 1023): boolean {
  const query = `(max-width: ${breakpoint}px)`;

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = getMql(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  // Client snapshot: the live viewport, read synchronously during render.
  const getSnapshot = useCallback(() => getMql(query).matches, [query]);

  // Server snapshot: desktop baseline (matches the SSR output).
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
