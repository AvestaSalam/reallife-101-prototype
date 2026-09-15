"use client";

import { useRouter } from "next/navigation";
import { Play, MoreVertical } from "lucide-react";
import {
  inProgressCourses,
  filterCourses,
  InProgressCourse,
} from "@/data/courses";

interface MobileContinueLearningProps {
  search: string;
}

function ContinueCard({
  course,
  onResume,
}: {
  course: InProgressCourse;
  onResume: (course: InProgressCourse) => void;
}) {
  return (
    <div
      onClick={() => onResume(course)}
      className="flex-shrink-0 w-[220px] flex flex-col rounded-2xl bg-[#1E232A] border border-[#2E2E2E] overflow-hidden cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative h-[130px] overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

        {/* Category badge — top left */}
        <span className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
          {course.category}
        </span>

        {/* Play button — centered */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-5 h-5 text-white" fill="white" strokeWidth={0} />
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-2 p-3">
        <p className="text-white font-semibold text-sm leading-tight line-clamp-2">
          {course.title}
        </p>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-[#2E2E2E] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#7CE1D4] rounded-full transition-all duration-300"
            style={{ width: `${course.progress}%` }}
          />
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#9CA3AF]">
            {course.progress}% complete
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-neutral-500 hover:text-white transition-colors"
            aria-label="More options"
          >
            <MoreVertical className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MobileContinueLearning({
  search,
}: MobileContinueLearningProps) {
  const router = useRouter();
  const matched = filterCourses(inProgressCourses, search);

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-bold text-[18px] tracking-tight">
          Continue Learning
        </h2>
        <button className="text-[#7CE1D4] text-[13px] font-medium hover:opacity-80 transition-opacity">
          View all &gt;
        </button>
      </div>

      {/* Horizontal scroll carousel */}
      {matched.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#2E2E2E] bg-[#1E232A]/50 py-8 text-center">
          <p className="text-white font-semibold text-sm">
            No courses match &quot;{search}&quot;
          </p>
          <p className="text-[#9CA3AF] text-xs mt-1">Try a different keyword.</p>
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {matched.map((course) => (
            <ContinueCard
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
