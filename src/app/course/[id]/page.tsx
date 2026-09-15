"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Play,
  FileText,
  HelpCircle,
  Lock,
  Check,
  Clock,
  Bookmark,
} from "lucide-react";
import { courseDetails } from "@/data/courses";
import { exploreCourses, inProgressCourses } from "@/data/courses";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import MobileCoursePage from "@/components/MobileCoursePage";
import { useRightSidebar } from "@/context/SidebarContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSavedCourses } from "@/context/SavedCoursesContext";
import { useToast } from "@/components/Toast";

const VIDEO_ID = "kx-TvlMB1QA";
const VIDEO_TITLE = "Course Introduction";

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const [videoPlaying, setVideoPlaying] = useState(false);
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();
  const isMobile = useIsMobile();
  const { isSaved, toggleSaved } = useSavedCourses();
  const notify = useToast();

  const course = courseDetails[courseId];
  const saved = isSaved(courseId);

  const handleToggleSave = () => {
    toggleSaved(courseId);
    notify(
      saved ? `Removed "${courseTitle}" from saved` : `Saved "${courseTitle}"`,
      saved ? "info" : "success"
    );
  };

  // Get title and duration from course catalog
  const exploreCourse = exploreCourses.find((c) => c.id === courseId);
  const inProgressCourse = inProgressCourses.find((c) => c.id === courseId);
  const courseTitle = exploreCourse?.title || inProgressCourse?.title || "Course";
  const courseDuration = exploreCourse?.duration || "2h 00m";

  if (!course) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-xl font-bold mb-2">Course not found</h1>
          <button
            onClick={() => router.back()}
            className="text-brand-teal hover:underline cursor-pointer"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const totalLessons = course.curriculum.length;
  const completedLessons = course.curriculum.filter((l) => l.isCompleted).length;
  const progress = Math.round((completedLessons / totalLessons) * 100);

  // Mobile gets a dedicated touch-first course page (no sidebars, bottom nav).
  if (isMobile) {
    return (
      <MobileCoursePage
        course={course}
        courseTitle={courseTitle}
        courseDuration={courseDuration}
        courseId={courseId}
      />
    );
  }

  return (
    <div className="flex h-screen bg-brand-bg text-white overflow-hidden">
      {/* Left navigation sidebar (fixed) */}
      <LeftSidebar />

      <div className="flex-1 min-w-0 h-screen overflow-y-auto smooth-scroll bg-brand-bg">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-brand-bg/95 backdrop-blur-sm border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-lg font-bold truncate flex-1">{courseTitle}</h1>
          <button
            onClick={handleToggleSave}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              saved
                ? "bg-brand-teal/20 text-brand-teal"
                : "bg-brand-surface border border-brand-border text-neutral-400 hover:text-white hover:border-brand-teal/30"
            }`}
          >
            <Bookmark className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Video Player */}
        <div className="mb-8 rounded-2xl overflow-hidden bg-brand-surface border border-brand-border">
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
              className="relative w-full cursor-pointer group"
              style={{ paddingBottom: "56.25%" }}
              onClick={() => setVideoPlaying(true)}
            >
              {/* Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt={VIDEO_TITLE}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;
                }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-teal/90 group-hover:bg-brand-teal flex items-center justify-center shadow-lg shadow-brand-teal/30 group-hover:scale-110 transition-all duration-200">
                  <Play className="w-7 h-7 text-white ml-1" fill="white" />
                </div>
              </div>
              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                {courseDuration}
              </div>
            </div>
          )}
        </div>

        {/* Course Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-teal/20 text-brand-teal">
              {course.level}
            </span>
            <span className="text-xs text-neutral-500">
              Updated {course.lastUpdated}
            </span>
          </div>
          <p className="text-neutral-300 text-sm leading-relaxed mb-6">
            {course.description}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-surface border border-brand-border">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-white font-semibold text-sm">
                {course.instructor.name}
              </p>
              <p className="text-neutral-500 text-xs">
                {course.instructor.role}
              </p>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-8">
          <h2 className="text-white font-bold text-lg mb-4">What you&apos;ll learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {course.whatYouLearn.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-brand-teal mt-0.5 flex-shrink-0" />
                <span className="text-neutral-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8 p-4 rounded-xl bg-brand-surface border border-brand-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Your progress</span>
            <span className="text-sm font-bold text-brand-teal">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-brand-border rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-teal rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        {/* Curriculum */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Course curriculum</h2>
          <div className="space-y-2">
            {course.curriculum.map((lesson, i) => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                index={i + 1}
                isLocked={lesson.isLocked && !lesson.isCompleted}
              />
            ))}
          </div>
        </div>
      </div>
      </div>

      {/* Right Sidebar — collapsible, shared state */}
      <RightSidebar
        isOpen={isRightSidebarOpen}
        onToggle={toggleRightSidebar}
      />
    </div>
  );
}

function LessonRow({
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

  const typeIcon = {
    video: Play,
    article: FileText,
    quiz: HelpCircle,
  }[lesson.type];

  const TypeIcon = typeIcon;

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
        isLocked
          ? "bg-brand-surface/50 border-brand-border/50 opacity-60"
          : lesson.isCompleted
          ? "bg-brand-teal/5 border-brand-teal/30"
          : "bg-brand-surface border-brand-border hover:border-brand-teal/30 cursor-pointer"
      }`}
      onClick={() => {
        if (!isLocked && !lesson.isCompleted) {
          setIsPlaying(true);
        }
      }}
    >
      {/* Lesson number / status */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          lesson.isCompleted
            ? "bg-brand-teal text-white"
            : isLocked
            ? "bg-brand-border text-neutral-500"
            : "bg-brand-rust/20 text-brand-rust"
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

      {/* Lesson info */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${
            lesson.isCompleted ? "text-brand-teal" : "text-white"
          }`}
        >
          {lesson.title}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-neutral-500">
            <TypeIcon className="w-3 h-3" />
            {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
          </span>
          <span className="flex items-center gap-1 text-xs text-neutral-500">
            <Clock className="w-3 h-3" />
            {lesson.duration}
          </span>
        </div>
      </div>

      {/* Play button / status */}
      {!isLocked && !lesson.isCompleted && (
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <span className="text-xs text-brand-teal font-medium animate-pulse">
              Playing...
            </span>
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 text-brand-teal" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
