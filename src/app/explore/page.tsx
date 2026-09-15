"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Star,
  BookOpen,
  Clock,
  Play,
  ArrowLeft,
  ArrowRight,
  Compass,
  Wallet,
  Briefcase,
  Heart,
  HeartPulse,
  Palette,
  Code,
  MessageCircle,
  Languages,
  type LucideIcon,
} from "lucide-react";

import { exploreCourses, filterCourses } from "@/data/courses";
import type { ExploreCourse } from "@/data/courses";
import { exploreBanners, exploreCategories } from "@/data/explore";
import type { ExploreBanner, ExploreCategory } from "@/data/explore";

import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import MobileShell from "@/components/MobileShell";
import SmoothScroll from "@/components/SmoothScroll";
import { useRightSidebar } from "@/context/SidebarContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useToast } from "@/components/Toast";

/* ------------------------------------------------------------------ */
/* Category icons — mapped by the `iconKey` stored in the data file.   */
/* Listed as literal identifiers so the JSX is statically analyzable. */
/* ------------------------------------------------------------------ */
const ICON_MAP: Record<string, LucideIcon> = {
  Wallet,
  Briefcase,
  Heart,
  HeartPulse,
  Palette,
  Code,
  MessageCircle,
  Clock,
  Languages,
};

/** Per-category gradient tint (literal strings live in a scanned file so the
   Tailwind JIT compiler emits the utilities). Keys mirror `ExploreCategory.tint`. */
const CATEGORY_GRADIENT: Record<string, string> = {
  teal: "from-brand-teal/60 via-brand-teal/15 to-transparent",
  rust: "from-brand-rust/60 via-brand-rust/15 to-transparent",
  gold: "from-brand-gold/60 via-brand-gold/15 to-transparent",
  emerald: "from-emerald-400/60 via-emerald-400/15 to-transparent",
  purple: "from-purple-400/60 via-purple-400/15 to-transparent",
  indigo: "from-indigo-400/60 via-indigo-400/15 to-transparent",
  pink: "from-pink-400/60 via-pink-400/15 to-transparent",
  amber: "from-amber-400/60 via-amber-400/15 to-transparent",
    blue: "from-blue-400/60 via-blue-400/15 to-transparent",
};

/* ================================================================== */
/* Hero banner: wide image, headline, subtitle + CTA (search lives in */
/* the sticky desktop header / mobile shell).                         */
/* ================================================================== */
function HeroBanner({
  banner,
  isMobile,
  search,
  onSearch,
  onCta,
}: {
  banner: ExploreBanner;
  isMobile: boolean;
  search: string;
  onSearch: (value: string) => void;
  onCta: () => void;
}) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden h-[250px] sm:h-[290px] flex items-end">
      {/* Background */}
      <img
        src={banner.imageUrl}
        alt={banner.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

      {banner.badge && (
        <span className="absolute top-3.5 left-3.5 bg-brand-rust/95 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
          {banner.badge}
        </span>
      )}

      <div className="relative z-10 w-full p-6 sm:p-7">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
          {banner.title}
        </h1>
        <p className="text-neutral-300 text-sm mt-2 max-w-md">
          {banner.subtitle}
        </p>

        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Prominent search — desktop only; mobile uses the shell header. */}
          {!isMobile && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search finance, design, coding..."
                className="w-full bg-brand-surface/80 border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/20 transition-all"
              />
              {search && (
                <button
                  onClick={() => onSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
              )}
            </div>
          )}

          <button
            onClick={onCta}
            className="inline-flex items-center justify-center gap-2 bg-brand-rust hover:bg-brand-rust-hover text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-150 cursor-pointer shadow-lg shadow-brand-rust/25"
          >
            <Play
              className="w-4 h-4 -ml-0.5"
              fill="currentColor"
              strokeWidth={0}
            />
                        {banner.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Secondary promo banners. Desktop: 2-up grid. Mobile: horizontal     */
/* carousel (matches the Continue-Learning carousel pattern).        */
/* ================================================================== */
function PromoCard({
  banner,
  onClick,
}: {
  banner: ExploreBanner;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden h-48 cursor-pointer border border-brand-border bg-brand-surface"
    >
      <img
        src={banner.imageUrl}
        alt={banner.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      {banner.badge && (
        <span className="absolute top-3 left-3 bg-brand-gold/95 text-black text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
          {banner.badge}
        </span>
      )}
      <div className="absolute bottom-0 w-full p-4">
        <h3 className="text-white font-bold text-lg">{banner.title}</h3>
        <p className="text-neutral-300 text-xs mt-1 line-clamp-2">
          {banner.subtitle}
        </p>
      </div>
      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}

function PromoBannerRow({
  banners,
  isMobile,
  onClick,
}: {
  banners: ExploreBanner[];
  isMobile: boolean;
  onClick: () => void;
}) {
  if (isMobile) {
    return (
      <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-1 scrollbar-hide">
        {banners.map((b) => (
          <div key={b.id} className="flex-[0_0_75%] min-w-0">
            <PromoCard banner={b} onClick={onClick} />
          </div>
        ))}
      </div>
    );
  }

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {banners.map((b) => (
        <PromoCard key={b.id} banner={b} onClick={onClick} />
      ))}
    </div>
  );
}

/* ================================================================== */
/* Category showcase cards.                                            */
/* ================================================================== */
function CategoryCard({
  category,
  onClick,
}: {
  category: ExploreCategory;
  onClick: () => void;
}) {
  const Icon = ICON_MAP[category.iconKey] ?? Compass;
  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden border border-brand-border bg-brand-surface hover:border-brand-teal/30 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
    >
      <div className="relative h-28 overflow-hidden">
        <img
          src={category.imageUrl}
          alt={category.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div
          className={
            "absolute inset-0 bg-gradient-to-t " + CATEGORY_GRADIENT[category.tint]
          }
        />
        <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/45 backdrop-blur-sm flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-white" strokeWidth={2.25} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-base">{category.title}</h3>
        <p className="text-neutral-400 text-xs mt-1 line-clamp-2">
          {category.description}
        </p>
        <div className="flex items-center justify-between mt-3.5">
          <span className="text-neutral-500 text-xs">
            {category.courseCount} course
            {category.courseCount === 1 ? "" : "s"}
          </span>
          <ArrowRight className="w-4 h-4 text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
}

function CategorySection({
  categories,
  isMobile,
  onClick,
}: {
  categories: ExploreCategory[];
  isMobile: boolean;
  onClick: (category: ExploreCategory) => void;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-lg tracking-tight">
          Browse by category
        </h2>
        <button
          onClick={() => onClick(categories[0])}
          className="text-brand-teal text-xs font-medium hover:text-brand-teal/80 transition-colors cursor-pointer"
        >
          View all →
        </button>
      </div>
      <div
        className={
          isMobile
            ? "grid grid-cols-2 gap-3"
            : "grid grid-cols-2 lg:grid-cols-3 gap-4"
        }
      >
                {categories.map((c) => (
          <CategoryCard
            key={c.id}
            category={c}
            onClick={() => onClick(c)}
          />
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/* Course showcase card (shared by the Trending / New sections).       */
/* ================================================================== */
function CourseShowcaseCard({
  course,
  onClick,
}: {
  course: ExploreCourse;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div
      onMouseEnter={() => setHover(1)}
      onMouseLeave={() => setHover(0)}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden bg-brand-surface border border-brand-border cursor-pointer hover:border-brand-teal/30 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${hover ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          {course.category}
        </span>
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
          <Star className="w-3 h-3 text-brand-gold fill-brand-gold" />
          {course.rating}
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${hover ? "opacity-100" : "opacity-0"}`}
        >
          <div className="w-11 h-11 rounded-full bg-brand-teal/90 flex items-center justify-center shadow-lg shadow-brand-teal/30">
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" strokeWidth={0} />
          </div>
        </div>
      </div>
      <div className="p-3.5">
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
          <span className="text-[11px] text-neutral-500">{course.reviews} reviews</span>
          <span
            className={`text-[11px] font-medium text-brand-teal transition-opacity duration-200 ${hover ? "opacity-100" : "opacity-0"}`}
          >
            Start learning →
          </span>
        </div>
      </div>
    </div>
  );
}

function CourseSection({
  title,
  subtitle,
  courses,
  isMobile,
  onCourseClick,
}: {
  title: string;
  subtitle?: string;
  courses: ExploreCourse[];
  isMobile: boolean;
  onCourseClick: (course: ExploreCourse) => void;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-white font-bold text-lg tracking-tight">{title}</h2>
          {subtitle && (
            <p className="text-neutral-500 text-xs mt-0.5">{subtitle}</p>
          )}
        </div>
        <button
          onClick={() => onCourseClick(courses[0])}
          className="text-brand-teal text-xs font-medium hover:text-brand-teal/80 transition-colors cursor-pointer"
        >
          View all →
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand-border bg-brand-surface/50 py-10 text-center">
          <p className="text-white font-semibold text-sm">No courses found</p>
          <p className="text-neutral-500 text-xs mt-1">Try a different search.</p>
        </div>
      ) : (
        <div
          className={
            isMobile
              ? "grid grid-cols-2 gap-3"
              : "grid grid-cols-2 lg:grid-cols-4 gap-4"
          }
        >
          {courses.map((c) => (
            <CourseShowcaseCard
              key={c.id}
              course={c}
              onClick={() => onCourseClick(c)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* ================================================================== */
/* Page component.                                                     */
/* ================================================================== */
export default function ExplorePage() {
  const router = useRouter();
  const notify = useToast();
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");

  /* Filtered + sorted course lists (search-aware, like the courses page). */
  const { trending, newest } = useMemo(() => {
    const base = filterCourses(exploreCourses, search);
    const byRating = [...base].sort((a, b) => b.rating - a.rating);
    const byNewest = [...base].reverse();
    return { trending: byRating, newest: byNewest };
  }, [search]);

  const onCourseClick = (course: ExploreCourse) =>
    router.push(`/course/${course.id}`);
  const onCategoryClick = (category: ExploreCategory) =>
    router.push(category.href);
  const onBannerCta = () => router.push("/courses");

  /* Shared section content rendered by both shells. */
  const sections = (
    <>
      <HeroBanner
        banner={exploreBanners[0]}
        isMobile={isMobile}
        search={search}
        onSearch={setSearch}
        onCta={onBannerCta}
      />
      <PromoBannerRow
        banners={exploreBanners.slice(1)}
        isMobile={isMobile}
        onClick={onBannerCta}
      />
      <CategorySection
        categories={exploreCategories}
        isMobile={isMobile}
        onClick={onCategoryClick}
      />
      <CourseSection
        title="Trending Now"
        subtitle="Highest rated by learners"
        courses={trending}
        isMobile={isMobile}
        onCourseClick={onCourseClick}
      />
      <CourseSection
        title="Newly Added"
        subtitle="Fresh releases to try"
        courses={newest}
        isMobile={isMobile}
        onCourseClick={onCourseClick}
      />
    </>
  );

  /* ---- Mobile ---- */
  if (isMobile) {
    return (
      <MobileShell search={search} onSearch={setSearch}>
        <div className="px-4 pt-1 pb-6 space-y-6">{sections}</div>
      </MobileShell>
    );
  }

  /* ---- Desktop ---- */
  return (
    <div className="flex h-screen bg-brand-bg text-white overflow-hidden">
      <LeftSidebar />

      <div className="flex-1 min-w-0 h-screen overflow-y-auto smooth-scroll bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
          {sections}
        </div>
      </div>

      <RightSidebar
        isOpen={isRightSidebarOpen}
        onToggle={toggleRightSidebar}
      />
    </div>
  );
}
