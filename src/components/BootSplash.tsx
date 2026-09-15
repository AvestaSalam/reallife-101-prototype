"use client";

import { useEffect, useState } from "react";

/**
 * Branded splash screen shown while the app boots. It is server-rendered into
 * the initial HTML, so the very first paint is already branded instead of a
 * blank screen (or a flash of the desktop-baseline layout on phones). Once
 * React has hydrated and the real layout is committed underneath, the splash
 * fades out and is removed from the DOM.
 *
 * Lives in the root layout, so it only mounts once per full page load —
 * client-side navigation never re-triggers it.
 */
export default function BootSplash() {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Hold the splash long enough for the route warmer to prefetch every page
    // behind it (see RouteWarmer), then fade out and drop it from the DOM.
    const fadeId = setTimeout(() => setFading(true), 1000);
    const removeId = setTimeout(() => setRemoved(true), 1700);
    return () => {
      clearTimeout(fadeId);
      clearTimeout(removeId);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5 bg-[#0B0E11] transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <h1 className="text-2xl font-bold tracking-tight">
        <span className="text-white">Reallife</span>
        <span className="text-[#7CE1D4]">101</span>
      </h1>
      <div className="w-8 h-8 rounded-full border-2 border-[#2E2E2E] border-t-[#7CE1D4] animate-spin motion-reduce:animate-none" />
    </div>
  );
}