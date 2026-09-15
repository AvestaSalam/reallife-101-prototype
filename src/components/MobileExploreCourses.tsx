"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Briefcase } from "lucide-react";
import { exploreCourses, filterCourses, ExploreCourse } from "@/data/courses";

interface MobileExploreCoursesProps {
  search: string;
}

const baseFilters: { label: string; value: string | null; extra?: boolean }[] = [
  { label: "All", value: null },
  { label: "Finance", value: "Finance" },
  { label: "Career", value: "Career" },
  { label: "Life Skills", value: "Life Skills" },
  { label: "Health", value: "Health" },
  { label: "Creative Skills", value: "Creative Skills" },
  { label: "Tech", value: "Tech" },
  // Revealed when the "More" pill is expanded
  { label: "Communication", value: "Communication", extra: true },
  { label: "Productivity", value: "Productivity", extra: true },
  { label: "Languages", value: "Languages", extra: true },
  { label: "More", value: "__more__" },
];

const extraCategoryValues = ["Communication", "Productivity", "Languages"];

export default function MobileExploreCourses({
  search,
}: MobileExploreCoursesProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const visibleFilters = showMore
    ? baseFilters
    : baseFilters.filter((f) => !f.extra);

  let list: ExploreCourse[] = activeFilter
    ? exploreCourses.filter((c) => c.category === activeFilter)
    : exploreCourses;
  list = filterCourses(list, search);

  return (
    <section>
      {/* Section title */}
      <h2 className="text-white font-bold text-[18px] tracking-tight mb-3">
        Explore Courses
      </h2>

      {/* Filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide -mx-5 px-5">
        {visibleFilters.map(({ label, value }) => {
          const isMore = value === "__more__";
          const active = isMore ? showMore : activeFilter === value;
          return (
            <button
              key={label}
              onClick={() => {
                if (isMore) {
                  const next = !showMore;
                  setShowMore(next);
                  if (!next && activeFilter && extraCategoryValues.includes(activeFilter)) {
                    setActiveFilter(null);
                  }
                  return;
                }
                setActiveFilter(activeFilter === value ? null : value);
              }}
              className={`flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-150 cursor-pointer ${
                active
                  ? "bg-[#7CE1D4] border-[#7CE1D4] text-black"
                  : "bg-transparent border-[#2E2E2E] text-neutral-300 hover:text-white hover:border-neutral-500"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Course list — vertical stack */}
      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#2E2E2E] bg-[#1E232A]/50 py-10 text-center">
          <p className="text-white font-semibold text-sm">
            {search ? (
              <>No courses match &quot;{search}&quot;</>
            ) : (
              "No courses in this category yet"
            )}
          </p>
          <p className="text-[#9CA3AF] text-xs mt-1">Try another filter.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((course) => (
            <div
              key={course.id}
              onClick={() => router.push(`/course/${course.id}`)}
              className="flex items-center gap-3 rounded-xl bg-[#161A1E] border border-[#2E2E2E] p-3 cursor-pointer hover:border-[#7CE1D4]/30 transition-colors"
            >
              {/* Thumbnail */}
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-[90px] h-[70px] rounded-lg object-cover flex-shrink-0"
              />

              {/* Middle stack */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <span className="self-start text-[10px] font-semibold tracking-wide uppercase text-[#9CA3AF] bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
                  {course.category}
                </span>
                <p className="text-white font-semibold text-sm leading-tight truncate">
                  {course.title}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-[#9CA3AF]">
                  <Briefcase className="w-3 h-3" />
                  <span>{course.lessons} lessons</span>
                  <span className="opacity-60">• Beginner</span>
                </div>
              </div>

              {/* Chevron */}
              <ChevronRight className="w-4 h-4 text-[#9CA3AF] flex-shrink-0" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
