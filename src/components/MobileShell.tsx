"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import MobileHeader from "@/components/MobileHeader";
import MobileBottomNav from "@/components/MobileBottomNav";
import SmoothScroll from "@/components/SmoothScroll";

interface MobileShellProps {
  search?: string;
  onSearch?: (value: string) => void;
  children: React.ReactNode;
}

/**
 * Standard mobile app chrome used by every mobile page (home, courses,
 * course detail): sticky header on top, scrollable content in the middle,
 * and pinned bottom nav. Wraps `children` as the page.
 *
 * The avatar (header) and Profile tab (bottom nav) navigate to the dedicated
 * /profile page instead of opening a slide-in drawer.
 */
export default function MobileShell({
  search = "",
  onSearch,
  children,
}: MobileShellProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const goToProfile = () => router.push("/profile");

  return (
    // h-screen + h-dvh: 100vh overreports on mobile browsers (the URL bar
    // overlaps the page), which pushed the bottom nav behind the browser UI.
    // 100dvh tracks the *visible* viewport; h-screen is the fallback.
    <div className="relative flex flex-col h-screen supports-[height:100dvh]:h-dvh bg-[#0B0E11] text-white">
      {/* Scrollable content — flex-1 fills the space above the nav.
          scrollbar-hide: the styled 4px ::-webkit-scrollbar forces a real
          (non-overlay) gutter on Android Chrome, which shows up as phantom
          padding on the right edge of the screen. */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto smooth-scroll scrollbar-hide"
      >
        <SmoothScroll containerRef={scrollRef}>
          {/* Content wrapper — Lenis controls this container's scroll */}
          <div>
            <MobileHeader
              search={search}
              onSearch={onSearch ?? (() => {})}
              onProfile={goToProfile}
            />
            {children}
          </div>
        </SmoothScroll>
      </div>

      {/* Bottom nav — a flex sibling OUTSIDE the scroll container & transform
          stack, so it is always pinned to the bottom of the screen. */}
      <MobileBottomNav />
    </div>
  );
}