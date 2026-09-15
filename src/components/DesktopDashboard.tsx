"use client";

import { useRef } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import TopHeader from "@/components/TopHeader";
import HeroSection from "@/components/HeroSection";
import ContinueLearningSection from "@/components/ContinueLearningSection";
import ExploreCoursesSection from "@/components/ExploreCoursesSection";
import RightSidebar from "@/components/RightSidebar";
import SmoothScroll from "@/components/SmoothScroll";
import { useRightSidebar } from "@/context/SidebarContext";

interface DesktopDashboardProps {
  search: string;
  onSearch: (value: string) => void;
}

/**
 * Existing desktop layout, extracted so the page can swap between this and the
 * mobile dashboard at the breakpoint.
 */
export default function DesktopDashboard({
  search,
  onSearch,
}: DesktopDashboardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();

  return (
    <div className="flex h-screen bg-brand-bg text-white overflow-hidden">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col bg-brand-bg">
        {/* Top Header */}
        <TopHeader search={search} onSearch={onSearch} />

        {/* Scrollable Content — smooth scroll applied here */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto smooth-scroll gpu-accelerated"
        >
          <SmoothScroll containerRef={scrollRef}>
            <div className="flex flex-col gap-6 px-6 py-6">
              <HeroSection />
              <ContinueLearningSection search={search} />
              <ExploreCoursesSection search={search} />
            </div>
          </SmoothScroll>
        </div>
      </main>

      {/* Right Sidebar */}
      <RightSidebar
        isOpen={isRightSidebarOpen}
        onToggle={toggleRightSidebar}
      />
    </div>
  );
}
