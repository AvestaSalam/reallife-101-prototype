"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock, BookOpen, Star, Grid3X3, List, ChevronDown, Play, ArrowLeft, ArrowRight, Bookmark } from "lucide-react";
import { exploreCourses } from "@/data/courses";
import { useSavedCourses } from "@/context/SavedCoursesContext";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import MobileShell from "@/components/MobileShell";
import { useRightSidebar } from "@/context/SidebarContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useToast } from "@/components/Toast";

type ViewMode = "grid" | "list";
type SortOption = "popular" | "newest" | "rating" | "duration";

const categories = ["All", "Finance", "Career", "Life Skills", "Health", "Creative Skills", "Tech", "Communication", "Productivity", "Languages"];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "duration", label: "Duration" },
];

export default function CoursesPage() {
  const router = useRouter();
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();
  const isMobile = useIsMobile();
  const { toggleSaved, isSaved } = useSavedCourses();
  const notify = useToast();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredCourses = useMemo(() => {
    let result = [...exploreCourses];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
    }
    if (activeCategory !== "All") {
      result = result.filter((c) => c.category === activeCategory);
    }
    switch (sortBy) {
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.reverse(); break;
      case "duration": result.sort((a, b) => a.duration.localeCompare(b.duration)); break;
      default: result.sort((a, b) => parseInt(b.reviews) - parseInt(a.reviews));
    }
    return result;
  }, [search, activeCategory, sortBy]);

  const handleToggleSave = (course: (typeof exploreCourses)[0]) => {
    const wasSaved = isSaved(course.id);
    toggleSaved(course.id);
    notify(
      wasSaved ? `Removed "${course.title}" from saved` : `Saved "${course.title}"`,
      wasSaved ? "info" : "success"
    );
  };

  // Shared catalog content (category pills + sort + grid/list) used by both layouts
  const catalog = (
    <>
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border cursor-pointer transition-colors ${
              activeCategory === cat
                ? isMobile
                  ? "bg-[#7CE1D4] border-[#7CE1D4] text-black"
                  : "bg-brand-teal border-brand-teal text-black"
                : isMobile
                  ? "bg-transparent border-[#2E2E2E] text-neutral-300 hover:text-white"
                  : "border-brand-border text-neutral-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="mb-4 flex items-center justify-between">
        <p className={`${isMobile ? "text-[#9CA3AF]" : "text-neutral-500"} text-sm`}><span className="text-white font-medium">{filteredCourses.length}</span> {filteredCourses.length === 1 ? "course" : "courses"}</p>
        <div className="relative">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className={`appearance-none rounded-lg px-3 py-1.5 pr-8 text-xs text-white cursor-pointer ${isMobile ? "bg-[#1E232A] border border-[#2E2E2E]" : "bg-brand-surface border border-brand-border"}`}>
            {sortOptions.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
          </select>
          <ChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none ${isMobile ? "text-[#9CA3AF]" : "text-neutral-500"}`} />
        </div>
      </div>
      {filteredCourses.length === 0 ? (
        <div className={`rounded-2xl border border-dashed py-20 text-center ${isMobile ? "border-[#2E2E2E] bg-[#1E232A]/50" : "border-brand-border bg-brand-surface/30"}`}>
          <BookOpen className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <h3 className="text-white font-semibold text-lg mb-1">No courses found</h3>
          <p className={`${isMobile ? "text-[#9CA3AF]" : "text-neutral-500"} text-sm mb-4`}>Try adjusting your search or filters</p>
          <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className={`${isMobile ? "text-[#7CE1D4]" : "text-brand-teal"} text-sm font-medium hover:underline cursor-pointer`}>Clear all filters</button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCourses.map((course) =>
            isMobile ? (
              <MobileCourseCard key={course.id} course={course} onClick={() => router.push(`/course/${course.id}`)} />
            ) : (
              <GridCard
                key={course.id}
                course={course}
                onClick={() => router.push(`/course/${course.id}`)}
                isSaved={isSaved(course.id)}
                onToggleSave={() => handleToggleSave(course)}
              />
            )
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredCourses.map((course) =>
            isMobile ? (
              <MobileCourseCard key={course.id} course={course} onClick={() => router.push(`/course/${course.id}`)} />
            ) : (
              <ListCard
                key={course.id}
                course={course}
                onClick={() => router.push(`/course/${course.id}`)}
                isSaved={isSaved(course.id)}
                onToggleSave={() => handleToggleSave(course)}
              />
            )
          )}
        </div>
      )}
    </>
  );

  // Mobile: full app chrome — status bar, app bar with expandable search,
  // pinned bottom "pages" nav, and the profile drawer. Same shell as home.
  if (isMobile) {
    return (
      <MobileShell search={search} onSearch={setSearch}>
        <div className="px-4 pt-1 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => router.push("/")}
              className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">All Courses</h1>
              <p className="text-[#9CA3AF] text-xs">{filteredCourses.length} courses available</p>
            </div>
          </div>
          {catalog}
        </div>
      </MobileShell>
    );
  }

  return (
    <div className="flex h-screen bg-brand-bg text-white overflow-hidden">
      {/* Left navigation sidebar (desktop only) */}
      {!isMobile && <LeftSidebar />}

      <div className="flex-1 min-w-0 h-screen overflow-y-auto smooth-scroll bg-brand-bg">
      <div className="sticky top-0 z-20 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3.5 lg:py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push("/")} className="text-neutral-400 hover:text-white cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg lg:text-xl font-bold">All Courses</h1>
          </div>
          <div className="flex-1 min-w-0 lg:max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-brand-surface border border-brand-border rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-teal/50 transition-all"
            />
          </div>
          <div className="hidden lg:flex items-center gap-1 bg-brand-surface border border-brand-border rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded cursor-pointer ${viewMode === "grid" ? "bg-brand-teal/20 text-brand-teal" : "text-neutral-500 hover:text-white"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded cursor-pointer ${viewMode === "list" ? "bg-brand-teal/20 text-brand-teal" : "text-neutral-500 hover:text-white"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {catalog}
      </div>
      </div>

      {/* Right Sidebar — desktop only, collapsible, shared state */}
      {!isMobile && (
        <RightSidebar
          isOpen={isRightSidebarOpen}
          onToggle={toggleRightSidebar}
        />
      )}
    </div>
  );
}

/**
 * Touch-first catalog card for mobile. Unlike the desktop card it has no
 * hover state to lean on, so the play affordance and the CTA are always
 * visible, the thumbnail fades into the card surface, and tapping gives
 * press feedback. Palette matches the home screen (#161A1E surface,
 * #7CE1D4 accent).
 */
function MobileCourseCard({
  course,
  onClick,
}: {
  course: (typeof exploreCourses)[0];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group rounded-2xl overflow-hidden bg-[#161A1E] border border-[#2E2E2E] shadow-lg shadow-black/20 active:scale-[0.98] transition-all duration-200 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-active:scale-105"
        />
        {/* Fade the photo into the card surface for a seamless look */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161A1E] via-black/10 to-transparent" />

        {/* Category — top left */}
        <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
          {course.category}
        </span>

        {/* Rating — top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full">
          <Star className="w-3 h-3 text-brand-gold fill-brand-gold" />
          {course.rating}
        </div>

        {/* Play — bottom right, always visible (no hover on touch) */}
        <div className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-[#7CE1D4] shadow-lg shadow-[#7CE1D4]/40 flex items-center justify-center">
          <Play className="w-4 h-4 text-[#0B0E11] ml-0.5" fill="#0B0E11" />
        </div>
      </div>

      {/* Body */}
      <div className="p-4 pt-3">
        <h3 className="text-white font-semibold text-[15px] leading-snug line-clamp-2 mb-2">
          {course.title}
        </h3>

        <div className="flex items-center gap-3 text-[11px] text-[#9CA3AF]">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {course.lessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.duration}
          </span>
        </div>

        {/* Footer: reviews + always-visible CTA */}
        <div className="mt-3 pt-3 border-t border-[#2E2E2E] flex items-center justify-between">
          <span className="text-[11px] text-[#9CA3AF]">{course.reviews} reviews</span>
          <span className="flex items-center gap-1.5 bg-[#7CE1D4]/10 text-[#7CE1D4] px-3 py-1.5 rounded-full text-[11px] font-semibold">
            Start learning
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

function GridCard({ course, onClick, isSaved, onToggleSave }: { course: (typeof exploreCourses)[0]; onClick: () => void; isSaved: boolean; onToggleSave: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="group rounded-2xl bg-brand-surface border border-brand-border overflow-hidden cursor-pointer hover:border-brand-teal/30 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-200 hover:-translate-y-1">
      <div className="relative h-40 overflow-hidden">
        <img src={course.imageUrl} alt={course.title} className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"><div className="w-12 h-12 rounded-full bg-brand-teal/90 flex items-center justify-center shadow-lg"><Play className="w-5 h-5 text-white ml-0.5" fill="white" /></div></div>
        <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">{course.category}</span>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full"><Star className="w-3 h-3 text-brand-gold fill-brand-gold" />{course.rating}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          className="absolute bottom-2.5 left-2.5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-brand-teal hover:text-black transition-colors"
          aria-label={isSaved ? "Remove from saved" : "Save for later"}
        >
          <Bookmark className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm leading-tight mb-2 line-clamp-2">{course.title}</h3>
        <div className="flex items-center gap-3 text-[11px] text-neutral-500"><span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.lessons} lessons</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span></div>
        <div className="mt-3 pt-3 border-t border-brand-border flex items-center justify-between"><span className="text-[11px] text-neutral-500">{course.reviews} reviews</span><span className="text-[11px] text-brand-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start learning →</span></div>
      </div>
    </div>
  );
}

function ListCard({ course, onClick, isSaved, onToggleSave }: { course: (typeof exploreCourses)[0]; onClick: () => void; isSaved: boolean; onToggleSave: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="group flex items-center gap-4 rounded-xl bg-brand-surface border border-brand-border p-3 cursor-pointer hover:border-brand-teal/30 transition-all duration-200">
      <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden">
        <img src={course.imageUrl} alt={course.title} className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`} />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-sm truncate">{course.title}</h3>
        <div className="flex items-center gap-3 mt-1 text-[11px] text-neutral-500"><span className="bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-full font-medium">{course.category}</span><span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.lessons}</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span></div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 text-brand-gold fill-brand-gold" /><span className="text-white font-medium">{course.rating}</span></div>
        <span className="text-[11px] text-neutral-500">{course.reviews}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal hover:bg-brand-teal hover:text-black transition-colors"
          aria-label={isSaved ? "Remove from saved" : "Save for later"}
        >
          <Bookmark className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} />
        </button>
        <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Play className="w-3.5 h-3.5 text-brand-teal" /></div>
      </div>
    </div>
  );
}
