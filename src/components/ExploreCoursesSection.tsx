"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ChevronDown } from "lucide-react";
import { useToast } from "@/components/Toast";
import { exploreCourses, filterCourses, ExploreCourse } from "@/data/courses";

interface ExploreCoursesSectionProps {
  search: string;
}

const filters: { label: string; value: string | null; extra?: boolean }[] = [
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

// Categories hidden behind the "More" pill
const extraCategories = ["Communication", "Productivity", "Languages"];

function ExploreCourseCard({
  course,
  userRating,
  onRate,
  onOpen,
}: {
  course: ExploreCourse;
  userRating: number;
  onRate: (id: string, rating: number) => void;
  onOpen: (course: ExploreCourse) => void;
}) {
  const [hover, setHover] = useState(0);
  const displayed =
    hover > 0 ? hover : userRating > 0 ? userRating : Math.round(course.rating);

  return (
    <div className="flex flex-col rounded-2xl bg-brand-surface border border-brand-border overflow-hidden hover:border-brand-rust/30 hover:shadow-lg hover:shadow-brand-rust/5 transition-all duration-200 group cursor-pointer">
      {/* Thumbnail */}
      <div onClick={() => onOpen(course)} className="relative h-[130px] overflow-hidden cursor-pointer">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Category badge — bottom-left on image */}
        <span className="absolute bottom-2.5 left-2.5 border border-white/30 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
          {course.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3.5">
        <p className="text-white font-semibold text-sm leading-tight mb-1.5 line-clamp-2 cursor-pointer">
          {course.title}
        </p>
        <p className="text-neutral-500 text-[11px] mb-3">
          {course.lessons} lessons • {course.duration}
        </p>

        {/* Interactive rating */}
        <div className="mt-auto flex items-center gap-1.5" role="group" aria-label={`Rate ${course.title}`}>
          <span className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRate(course.id, star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                aria-label={`Rate ${star} out of 5 stars`}
                className="p-0 cursor-pointer transition-transform duration-100 hover:scale-125 active:scale-90 focus:outline-none"
              >
                <Star
                  className={`w-3.5 h-3.5 ${
                    star <= displayed ? "text-brand-gold" : "text-neutral-600"
                  }`}
                  fill={star <= displayed ? "#F4B942" : "none"}
                  strokeWidth={star <= displayed ? 0 : 1.5}
                />
              </button>
            ))}
          </span>
          <span
            className="text-brand-gold text-xs font-semibold"
            title={userRating > 0 ? "Your rating" : "Average rating"}
          >
            {userRating > 0 ? userRating : course.rating}
          </span>
          <span className="text-neutral-600 text-xs">({course.reviews})</span>
          {userRating > 0 && (
            <span className="text-[10px] text-brand-teal ml-auto">you</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExploreCoursesSection({ search }: ExploreCoursesSectionProps) {
  const router = useRouter();
  const notify = useToast();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});

  // Apply category filter, then search
  let list = activeFilter
    ? exploreCourses.filter((c) => c.category === activeFilter)
    : exploreCourses;
  list = filterCourses(list, search);

  // The "More" pill reveals the extra category filters
  const visibleFilters = showMore ? filters : filters.filter((f) => !f.extra);

  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-lg tracking-tight">Explore Courses</h2>
        <span className="text-neutral-500 text-xs font-medium">{list.length} courses</span>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
        {visibleFilters.map(({ label, value }) => {
          const active = value === "__more__" ? showMore : activeFilter === value;
          return (
            <button
              key={label}
              onClick={() => {
                if (value === "__more__") {
                  const next = !showMore;
                  setShowMore(next);
                  // Collapsing "More" resets a revealed category filter
                  if (
                    !next &&
                    activeFilter &&
                    extraCategories.includes(activeFilter)
                  ) {
                    setActiveFilter(null);
                  }
                  return;
                }
                setActiveFilter(activeFilter === value ? null : value);
              }}
              className={`flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-150 cursor-pointer ${
                active
                  ? "bg-brand-rust border-brand-rust text-white shadow-md shadow-brand-rust/20"
                  : "bg-transparent border-brand-border text-neutral-400 hover:text-white hover:border-neutral-500"
              }`}
            >
              {label}
              {value === "__more__" && (
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${showMore ? "rotate-180" : ""}`}
                  strokeWidth={2.5}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand-border bg-brand-surface/50 py-10 text-center">
          <p className="text-white font-semibold text-sm">
            {search ? (
              <>
                No courses match &quot;{search}&quot;
              </>
            ) : (
              "No courses in this category yet"
            )}
          </p>
          <p className="text-neutral-500 text-xs mt-1">Try another filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {list.map((course) => (
            <ExploreCourseCard
              key={course.id}
              course={course}
              userRating={ratings[course.id] ?? 0}
              onRate={(id, rating) => {
                // Clicking the same star again clears the rating
                const next = ratings[id] === rating ? 0 : rating;
                setRatings({ ...ratings, [id]: next });
                notify(
                  next > 0
                    ? `You rated "${exploreCourses.find((c) => c.id === id)!.title}" ${next}★`
                    : "Rating cleared",
                  "success"
                );
              }}
              onOpen={(c) => router.push(`/course/${c.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
