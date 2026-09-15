"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  Check,
  Lock,
  Play,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Car,
  ChefHat,
  Flower2,
  Wallet,
  Dumbbell,
  Code,
  type LucideIcon,
} from "lucide-react";
import { roadmapCategories, type RoadmapCategory, type RoadmapCourse } from "@/data/roadmap";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import MobileShell from "@/components/MobileShell";
import { useRightSidebar } from "@/context/SidebarContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useToast } from "@/components/Toast";

const iconMap: Record<string, LucideIcon> = {
  car: Car,
  "chef-hat": ChefHat,
  flower: Flower2,
  wallet: Wallet,
  dumbbell: Dumbbell,
  code: Code,
};

function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="w-full h-1.5 bg-[#2E2E2E] rounded-full overflow-hidden">
      <div
        className="h-full bg-[#7CE1D4] rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function CourseRow({ course }: { course: RoadmapCourse }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
        course.isLocked
          ? "bg-[#161A1E]/50 border-[#2E2E2E]/50 opacity-60"
          : course.isCompleted
          ? "bg-[#7CE1D4]/5 border-[#7CE1D4]/30"
          : "bg-[#1E232A] border-[#2E2E2E] hover:border-[#7CE1D4]/30"
      }`}
    >
      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="flex-1 min-w-0">
        <h4
          className={`text-sm font-semibold truncate ${
            course.isCompleted ? "text-[#7CE1D4]" : course.isLocked ? "text-[#9CA3AF]" : "text-white"
          }`}
        >
          {course.title}
        </h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="flex items-center gap-1 text-[11px] text-[#9CA3AF]">
            <Clock className="w-3 h-3" />
            {course.duration}
          </span>
        </div>
      </div>
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
          course.isCompleted
            ? "bg-[#7CE1D4] text-black"
            : course.isLocked
            ? "bg-[#2E2E2E] text-[#9CA3AF]"
            : "bg-[#7CE1D4]/20 text-[#7CE1D4]"
        }`}
      >
        {course.isCompleted ? (
          <Check className="w-3.5 h-3.5" strokeWidth={3} />
        ) : course.isLocked ? (
          <Lock className="w-3 h-3" />
        ) : (
          <Play className="w-3 h-3" fill="#7CE1D4" />
        )}
      </div>
    </div>
  );
}

function CategoryCard({
  category,
  isExpanded,
  onToggle,
}: {
  category: RoadmapCategory;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = iconMap[category.icon] || Car;
  const completedCourses = category.courses.filter((c) => c.isCompleted).length;
  const totalCourses = category.courses.length;

  return (
    <div className="rounded-2xl bg-brand-surface border border-brand-border overflow-hidden transition-all hover:border-brand-teal/20">
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#7CE1D4]/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-[#7CE1D4]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base leading-tight">{category.title}</h3>
            <p className="text-[#9CA3AF] text-xs mt-0.5 line-clamp-1">{category.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#9CA3AF]">
            {completedCourses}/{totalCourses} courses
          </span>
          <span className="text-xs text-[#7CE1D4] font-medium">
            {totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0}% complete
          </span>
        </div>
        <ProgressBar completed={completedCourses} total={totalCourses} />

        <button
          onClick={onToggle}
          className="w-full mt-4 flex items-center justify-center gap-1 text-xs text-[#7CE1D4] font-medium py-2 rounded-lg hover:bg-[#7CE1D4]/5 transition-colors"
        >
          {isExpanded ? (
            <>Hide courses <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>Show courses <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-brand-border pt-4">
          <div className="space-y-2">
            {category.courses.map((course) => (
              <CourseRow key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileCategoryCard({
  category,
  isExpanded,
  onToggle,
}: {
  category: RoadmapCategory;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = iconMap[category.icon] || Car;
  const completedCourses = category.courses.filter((c) => c.isCompleted).length;
  const totalCourses = category.courses.length;

  return (
    <div className="rounded-2xl bg-[#161A1E] border border-[#2E2E2E] overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#7CE1D4]/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-[#7CE1D4]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-sm leading-tight">{category.title}</h3>
            <p className="text-[#9CA3AF] text-[11px] mt-0.5 line-clamp-1">{category.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-[#9CA3AF]">
            {completedCourses}/{totalCourses} courses
          </span>
          <span className="text-[11px] text-[#7CE1D4] font-medium">
            {totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0}%
          </span>
        </div>
        <ProgressBar completed={completedCourses} total={totalCourses} />

        <button
          onClick={onToggle}
          className="w-full mt-3 flex items-center justify-center gap-1 text-[11px] text-[#7CE1D4] font-medium py-1.5 rounded-lg hover:bg-[#7CE1D4]/5 transition-colors"
        >
          {isExpanded ? (
            <>Hide courses <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>Show courses <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-[#2E2E2E] pt-3">
          <div className="space-y-2">
            {category.courses.map((course) => (
              <MobileCourseRow key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileCourseRow({ course }: { course: RoadmapCourse }) {
  return (
    <div
      className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
        course.isLocked
          ? "bg-[#161A1E]/50 border-[#2E2E2E]/50 opacity-60"
          : course.isCompleted
          ? "bg-[#7CE1D4]/5 border-[#7CE1D4]/30"
          : "bg-[#161A1E] border-[#2E2E2E]"
      }`}
    >
      <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="flex-1 min-w-0">
        <h4
          className={`text-xs font-semibold truncate ${
            course.isCompleted ? "text-[#7CE1D4]" : course.isLocked ? "text-[#9CA3AF]" : "text-white"
          }`}
        >
          {course.title}
        </h4>
        <span className="flex items-center gap-1 text-[10px] text-[#9CA3AF] mt-0.5">
          <Clock className="w-2.5 h-2.5" />
          {course.duration}
        </span>
      </div>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
          course.isCompleted
            ? "bg-[#7CE1D4] text-black"
            : course.isLocked
            ? "bg-[#2E2E2E] text-[#9CA3AF]"
            : "bg-[#7CE1D4]/20 text-[#7CE1D4]"
        }`}
      >
        {course.isCompleted ? (
          <Check className="w-3 h-3" strokeWidth={3} />
        ) : course.isLocked ? (
          <Lock className="w-2.5 h-2.5" />
        ) : (
          <Play className="w-2.5 h-2.5" fill="#7CE1D4" />
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Page component.                                                     */
/* ================================================================== */
export default function RoadmapPage() {
  const router = useRouter();
  const notify = useToast();
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();
  const isMobile = useIsMobile();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalCourses = roadmapCategories.reduce((sum, cat) => sum + cat.courses.length, 0);
  const completedCourses = roadmapCategories.reduce(
    (sum, cat) => sum + cat.courses.filter((c) => c.isCompleted).length,
    0
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
              <h1 className="text-white font-bold text-lg leading-tight">Learning Roadmap</h1>
              <p className="text-[#9CA3AF] text-xs">
                {completedCourses}/{totalCourses} courses completed
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {roadmapCategories.map((category) => (
              <MobileCategoryCard
                key={category.id}
                category={category}
                isExpanded={expandedCategories.has(category.id)}
                onToggle={() => toggleCategory(category.id)}
              />
            ))}
          </div>
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
              <h1 className="text-lg lg:text-xl font-bold">Learning Roadmap</h1>
            </div>
            <span className="text-neutral-500 text-sm">
              {completedCourses}/{totalCourses} courses completed
            </span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {roadmapCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isExpanded={expandedCategories.has(category.id)}
                onToggle={() => toggleCategory(category.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <RightSidebar isOpen={isRightSidebarOpen} onToggle={toggleRightSidebar} />
    </div>
  );
}
