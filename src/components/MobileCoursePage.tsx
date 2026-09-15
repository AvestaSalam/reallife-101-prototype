"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, FileText, HelpCircle, Lock, Check, Clock, Bookmark } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import { CourseDetail } from "@/data/courseDetails";
import { useSavedCourses } from "@/context/SavedCoursesContext";
import { useToast } from "@/components/Toast";

const VIDEO_ID = "kx-TvlMB1QA";
const VIDEO_TITLE = "Course Introduction";

interface MobileCoursePageProps {
  course: CourseDetail;
  courseTitle: string;
  courseDuration: string;
  courseId: string;
}

export default function MobileCoursePage({
  course,
  courseTitle,
  courseDuration,
  courseId,
}: MobileCoursePageProps) {
  const router = useRouter();
  const { isSaved, toggleSaved } = useSavedCourses();
  const notify = useToast();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const saved = isSaved(courseId);

  const handleToggleSave = () => {
    toggleSaved(courseId);
    notify(
      saved ? `Removed "${courseTitle}" from saved` : `Saved "${courseTitle}"`,
      saved ? "info" : "success"
    );
  };

  const totalLessons = course.curriculum.length;
  const completedLessons = course.curriculum.filter((l) => l.isCompleted).length;
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <MobileShell>
      {/* In-page header: back + course title (shell header stays on top) */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-1">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
        </button>
        <h1 className="flex-1 text-white font-bold text-base truncate">
          {courseTitle}
        </h1>
        <button
          onClick={handleToggleSave}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
            saved
              ? "bg-[#7CE1D4]/20 text-[#7CE1D4]"
              : "bg-[#1E232A] border border-[#2E2E2E] text-neutral-300 hover:text-white"
          }`}
          aria-label={saved ? "Remove from saved" : "Save for later"}
        >
          <Bookmark className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-col gap-5 px-4 pt-3 pb-6">
            {/* Video player */}
            <div className="rounded-2xl overflow-hidden bg-[#1E232A] border border-[#2E2E2E]">
              {videoPlaying ? (
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                    title={VIDEO_TITLE}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div
                  className="relative w-full cursor-pointer active:scale-[0.99]"
                  style={{ paddingBottom: "56.25%" }}
                  onClick={() => setVideoPlaying(true)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                    alt={VIDEO_TITLE}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#7CE1D4]/90 flex items-center justify-center shadow-lg shadow-[#7CE1D4]/30">
                      <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-black/70 text-white text-[11px] font-medium px-2 py-0.5 rounded">
                    {courseDuration}
                  </div>
                </div>
              )}
            </div>

            {/* Meta + description + CTA */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#7CE1D4]/15 text-[#7CE1D4]">
                  {course.level}
                </span>
                <span className="text-[11px] text-[#9CA3AF]">
                  Updated {course.lastUpdated}
                </span>
              </div>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                {course.description}
              </p>
              <button
                onClick={() => setVideoPlaying(true)}
                className="mt-3 w-full bg-[#7CE1D4] hover:bg-[#61D5C7] text-black text-sm font-semibold py-3 rounded-full transition-colors"
              >
                ▶ Start Lesson
              </button>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#161A1E] border border-[#2E2E2E]">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">
                  {course.instructor.name}
                </p>
                <p className="text-[#9CA3AF] text-[11px]">
                  {course.instructor.role}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="p-4 rounded-xl bg-[#161A1E] border border-[#2E2E2E]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">Your progress</span>
                <span className="text-sm font-bold text-[#7CE1D4]">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-[#2E2E2E] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7CE1D4] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-[#9CA3AF] mt-2">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </div>

            {/* What you'll learn */}
            <div>
              <h2 className="text-white font-bold text-lg mb-3">What you&apos;ll learn</h2>
              <div className="space-y-2.5">
                {course.whatYouLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#7CE1D4] mt-0.5 flex-shrink-0" />
                    <span className="text-[#9CA3AF] text-sm leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="text-white font-bold text-lg mb-3">Course curriculum</h2>
              <div className="space-y-2">
                {course.curriculum.map((lesson, i) => (
                  <MobileLessonRow
                    key={lesson.id}
                    lesson={lesson}
                    index={i + 1}
                    isLocked={lesson.isLocked && !lesson.isCompleted}
                  />
                ))}
              </div>
            </div>
          </div>
    </MobileShell>
  );
}

function MobileLessonRow({
  lesson,
  index,
  isLocked,
}: {
  lesson: {
    id: string;
    title: string;
    duration: string;
    type: "video" | "article" | "quiz";
    isCompleted: boolean;
    isLocked: boolean;
  };
  index: number;
  isLocked: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const TypeIcon = {
    video: Play,
    article: FileText,
    quiz: HelpCircle,
  }[lesson.type];

  return (
    <div
      onClick={() => {
        if (!isLocked && !lesson.isCompleted) setIsPlaying(true);
      }}
      className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 active:scale-[0.99] ${
        isLocked
          ? "bg-[#161A1E]/50 border-[#2E2E2E]/50 opacity-60"
          : lesson.isCompleted
          ? "bg-[#7CE1D4]/5 border-[#7CE1D4]/30"
          : "bg-[#161A1E] border-[#2E2E2E]"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          lesson.isCompleted
            ? "bg-[#7CE1D4] text-black"
            : isLocked
            ? "bg-[#2E2E2E] text-neutral-500"
            : "bg-[#7CE1D4]/15 text-[#7CE1D4]"
        }`}
      >
        {lesson.isCompleted ? (
          <Check className="w-4 h-4" />
        ) : isLocked ? (
          <Lock className="w-3.5 h-3.5" />
        ) : (
          <span className="text-xs font-bold">{index}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${
            lesson.isCompleted ? "text-[#7CE1D4]" : "text-white"
          }`}
        >
          {lesson.title}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-[11px] text-[#9CA3AF]">
            <TypeIcon className="w-3 h-3" />
            {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#9CA3AF]">
            <Clock className="w-3 h-3" />
            {lesson.duration}
          </span>
        </div>
      </div>

      {!isLocked && !lesson.isCompleted && (
        <div className="w-8 h-8 rounded-full bg-[#7CE1D4]/15 flex items-center justify-center flex-shrink-0">
          {isPlaying ? (
            <Check className="w-4 h-4 text-[#7CE1D4]" />
          ) : (
            <Play className="w-3.5 h-3.5 text-[#7CE1D4]" />
          )}
        </div>
      )}
    </div>
  );
}