"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { inProgressCourses, filterCourses, InProgressCourse } from "@/data/courses";

interface ContinueLearningSectionProps {
  search: string;
}

function CourseProgressCard({
  course,
  onResume,
}: {
  course: InProgressCourse;
  onResume: (course: InProgressCourse) => void;
}) {
  return (
    <div
      onClick={() => onResume(course)}
      className="flex flex-col rounded-2xl bg-brand-surface border border-brand-border overflow-hidden hover:border-brand-teal/30 hover:shadow-lg hover:shadow-brand-teal/5 transition-all duration-200 group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-[130px] overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* In Progress Badge */}
        <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm border border-brand-teal/30 text-brand-teal text-[10px] font-semibold px-2 py-0.5 rounded-md">
          In Progress
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3.5">
        <p className="text-white font-semibold text-sm leading-tight mb-0.5 line-clamp-2">
          {course.title}
        </p>
        <p className="text-neutral-500 text-[11px] mb-3">{course.category}</p>

        {/* Progress bar */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-medium text-brand-teal">{course.progress}%</span>
            <span className="text-[11px] text-neutral-600">Complete</span>
          </div>
          <div className="w-full h-1.5 bg-brand-border rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-teal rounded-full transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContinueLearningSection({
  search,
}: ContinueLearningSectionProps) {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);

  const matched = filterCourses(inProgressCourses, search);
  const visible = showAll ? matched : matched.slice(0, 4);

  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-lg tracking-tight">Continue Learning</h2>
        {matched.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1 text-brand-teal text-sm font-medium hover:text-brand-teal/80 transition-colors cursor-pointer"
          >
            {showAll ? "Show less" : "View all"}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`}
              strokeWidth={2.5}
            />
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand-border bg-brand-surface/50 py-10 text-center">
          <p className="text-white font-semibold text-sm">
            No courses match &quot;{search}&quot;
          </p>
          <p className="text-neutral-500 text-xs mt-1">Try a different keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {visible.map((course) => (
            <CourseProgressCard
              key={course.id}
              course={course}
              onResume={(c) => router.push(`/course/${c.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
