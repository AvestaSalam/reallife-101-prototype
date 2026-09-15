"use client";

import { useRouter } from "next/navigation";
import {
  Bookmark,
  Clock,
  BookOpen,
  Star,
  Play,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { exploreCourses } from "@/data/courses";
import type { ExploreCourse } from "@/data/courses";
import { useSavedCourses } from "@/context/SavedCoursesContext";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import MobileShell from "@/components/MobileShell";
import { useRightSidebar } from "@/context/SidebarContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useToast } from "@/components/Toast";

/* ================================================================== */
/* Saved course card (desktop).                                        */
/* ================================================================== */
function SavedCard({
  course,
  onOpen,
  onRemove,
}: {
  course: ExploreCourse;
  onOpen: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      onClick={onOpen}
      className="group rounded-2xl bg-brand-surface border border-brand-border overflow-hidden cursor-pointer hover:border-brand-teal/30 transition-all duration-200 hover:-translate-y-1"
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full bg-brand-teal/90 flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          </div>
        </div>
        <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
          {course.category}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-brand-rust hover:bg-brand-rust hover:text-white transition-colors"
          aria-label="Remove from saved"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm leading-tight mb-2 line-clamp-2">
          {course.title}
        </h3>
        <div className="flex items-center gap-3 text-[11px] text-neutral-500">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {course.lessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.duration}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
            <span className="text-white text-xs font-medium">{course.rating}</span>
          </div>
          <span className="text-[11px] text-neutral-500">{course.reviews} reviews</span>
        </div>
      </div>
    </div>
  );
}



/* ================================================================== */
/* Mobile saved card.                                                  */
/* ================================================================== */
function MobileSavedCard({
  course,
  onOpen,
  onRemove,
}: {
  course: ExploreCourse;
  onOpen: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      onClick={onOpen}
      className="group flex items-center gap-3 rounded-xl bg-[#161A1E] border border-[#2E2E2E] p-2.5 cursor-pointer active:scale-[0.98] transition-all"
    >
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-sm truncate">{course.title}</h3>
        <div className="flex items-center gap-2 mt-1 text-[11px] text-[#9CA3AF]">
          <span className="bg-[#7CE1D4]/10 text-[#7CE1D4] px-2 py-0.5 rounded-full font-medium">
            {course.category}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {course.lessons}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#9CA3AF]">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-[#F4B942] fill-[#F4B942]" />
            {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.duration}
          </span>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="w-8 h-8 rounded-full bg-[#2E2E2E] flex items-center justify-center text-[#9CA3AF] hover:text-[#C05640] hover:bg-[#C05640]/10 transition-colors flex-shrink-0"
        aria-label="Remove from saved"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ================================================================== */
/* Page component.                                                     */
/* ================================================================== */
export default function SavedPage() {
  const router = useRouter();
  const notify = useToast();
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();
  const isMobile = useIsMobile();
  const { savedIds, toggleSaved, savedCount } = useSavedCourses();

  const savedCourses = exploreCourses.filter((c) => savedIds.has(c.id));

  const onOpen = (course: ExploreCourse) => router.push(`/course/${course.id}`);
  const onRemove = (course: ExploreCourse) => {
    toggleSaved(course.id);
    notify(`Removed "${course.title}" from saved`, "info");
  };

  const content =
    savedCourses.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Bookmark className="w-12 h-12 text-neutral-600 mb-4" />
        <h2 className="text-white font-bold text-lg mb-1">No saved courses</h2>
        <p className="text-neutral-500 text-sm mb-6 max-w-xs">
          Tap the bookmark icon on any course to save it for later.
        </p>
        <button
          onClick={() => router.push("/courses")}
          className="bg-brand-teal hover:bg-brand-teal/90 text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          Browse courses
        </button>
      </div>
    ) : isMobile ? (
      <div className="flex flex-col gap-3">
        {savedCourses.map((c) => (
          <MobileSavedCard
            key={c.id}
            course={c}
            onOpen={() => onOpen(c)}
            onRemove={() => onRemove(c)}
          />
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {savedCourses.map((c) => (
          <SavedCard
            key={c.id}
            course={c}
            onOpen={() => onOpen(c)}
            onRemove={() => onRemove(c)}
          />
        ))}
      </div>
    );

  /* ---- Mobile ---- */
  if (isMobile) {
    return (
      <MobileShell>
        <div className="px-4 pt-1 pb-6">
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => router.push("/")}
              className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Saved Courses</h1>
              <p className="text-[#9CA3AF] text-xs">
                {savedCount} course{savedCount === 1 ? "" : "s"} saved
              </p>
            </div>
            <button
              onClick={() => router.push("/courses")}
              className="flex items-center gap-1.5 text-[#7CE1D4] text-xs font-medium hover:underline"
            >
              Browse more
              <ArrowLeft className="w-3 h-3 rotate-180" />
            </button>
          </div>
          {content}
        </div>
      </MobileShell>
    );
  }

  /* ---- Desktop ---- */
  return (
    <div className="flex h-screen bg-brand-bg text-white overflow-hidden">
      <LeftSidebar />

      <div className="flex-1 min-w-0 h-screen overflow-y-auto smooth-scroll bg-brand-bg">
        <div className="sticky top-0 z-20 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3.5 lg:py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/")}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg lg:text-xl font-bold">Saved Courses</h1>
            </div>
            <span className="text-neutral-500 text-sm">
              {savedCount} course{savedCount === 1 ? "" : "s"}
            </span>
            <button
              onClick={() => router.push("/courses")}
              className="flex items-center gap-1.5 bg-brand-teal hover:bg-brand-teal/90 text-black text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Browse more courses
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">{content}</div>
      </div>

      <RightSidebar isOpen={isRightSidebarOpen} onToggle={toggleRightSidebar} />
    </div>
  );
}
