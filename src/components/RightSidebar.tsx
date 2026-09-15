"use client";

import { useState } from "react";
import {
  Crown,
  Flame,
  CalendarDays,
  Check,
  Trophy,
  Settings,
  ChevronRight,
  Medal,
  Target,
  Activity,
} from "lucide-react";
import { useToast } from "@/components/Toast";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

/* ================= Widget Container ================= */

function WidgetCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-2xl bg-brand-surface border border-brand-border p-4">
      {children}
    </div>
  );
}

/* ================= Daily Streak Widget ================= */

const streakDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function DailyStreakWidget() {
  const notify = useToast();
  // Mon–Fri done, Sat active (today), Sun pending
  const [done, setDone] = useState<boolean[]>([true, true, true, true, true, false, false]);
  const completed = done.filter(Boolean).length;

  return (
    <WidgetCard>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-brand-rust" fill="#C05640" strokeWidth={2} />
          <h3 className="text-white font-bold text-sm">Daily Streak</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-brand-teal cursor-pointer">
          <CalendarDays className="w-3.5 h-3.5" strokeWidth={2} />
          {completed} day{completed === 1 ? "" : "s"}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        {streakDays.map((day, i) => {
          const isDone = done[i];
          const isToday = i === 5;
          return (
            <button
              key={day}
              onClick={() => {
                if (i === 5) {
                  notify("Today is already part of your streak — keep it going! 🔥", "info");
                  return;
                }
                const next = [...done];
                next[i] = !next[i];
                setDone(next);
                notify(
                  next[i]
                    ? `${day} marked complete ✅`
                    : `${day} unmarked — streak at ${completed - 1} days`,
                  next[i] ? "success" : "info"
                );
              }}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              {/* Node */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-all duration-200 group-hover:scale-110 ${
                  isDone
                    ? "bg-brand-teal shadow-md shadow-brand-teal/30"
                    : isToday
                    ? "bg-brand-rust shadow-md shadow-brand-rust/30"
                    : "bg-brand-bg border-2 border-brand-border group-hover:border-brand-teal/40"
                }`}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                ) : isToday ? (
                  <Flame className="w-3.5 h-3.5" fill="#C05640" strokeWidth={2} />
                ) : null}
              </div>
              <span className={`text-[9px] font-medium ${isDone ? "text-brand-teal" : isToday ? "text-brand-rust" : "text-neutral-600"}`}>
                {day}
              </span>
            </button>
          );
        })}
      </div>
    </WidgetCard>
  );
}
/* ================= Profile Widget ================= */

export function ProfileWidget() {
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <WidgetCard>
      <img
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&auto=format"
        alt="User avatar"
        className="w-16 h-16 rounded-full object-cover ring-2 ring-brand-rust/40 mx-auto"
      />
      <div className="flex items-center justify-center gap-2 mt-2.5">
        <Crown className="w-4 h-4 text-brand-gold" fill="#F4B942" strokeWidth={2} />
        <p className="text-white font-bold text-lg leading-none">
          {t("profile.level", { level: 4 })}
        </p>
      </div>
      <p className="text-neutral-500 text-xs text-center mt-1">{t("profile.rank")}</p>

      <div className="mt-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-neutral-400">
            {t("profile.xpProgress", { level: 5 })}
          </span>
          <span className="text-[11px] text-brand-teal font-semibold">
            {t("profile.xp", { current: 120, total: 200 })}
          </span>
        </div>
        <div className="w-full h-2 bg-brand-border rounded-full overflow-hidden">
          <div className="h-full bg-brand-teal rounded-full" style={{ width: "60%" }} />
        </div>
      </div>

      {/* Dedicated profile page with settings, language & subscription */}
      <button
        onClick={() => router.push("/profile")}
        className="mt-3.5 w-full flex items-center justify-center rounded-xl border border-brand-border bg-brand-bg hover:border-brand-teal/40 text-[12px] font-semibold text-brand-teal py-2 transition-colors cursor-pointer"
      >
        {t("profile.viewProfile")}
      </button>
    </WidgetCard>
  );
}

/* ================= Achievements Widget ================= */

const achievements = [
  {
    icon: Medal,
    title: "First Course",
    desc: "Completed your first lesson",
    iconColor: "text-brand-rust",
    bg: "bg-brand-rust/10",
  },
  {
    icon: Target,
    title: "Goal Getter",
    desc: "Hit a 7-day streak",
    iconColor: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
  {
    icon: Activity,
    title: "Active Learner",
    desc: "30+ minutes of learning",
    iconColor: "text-brand-gold",
    bg: "bg-brand-gold/10",
  },
];

export function AchievementsWidget() {
  return (
    <WidgetCard>
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold text-sm">Achievements</h3>
        <button className="text-brand-teal text-xs font-medium hover:text-brand-teal/80 transition-colors">
          View all →
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        {achievements.map(({ icon: Icon, title, desc, iconColor, bg }) => (
          <div key={title} className="flex flex-col items-center gap-2 flex-1 text-center">
            <div className={`hex-clip w-12 h-12 flex items-center justify-center ${bg}`}>
              <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={2} />
            </div>
            <p className="text-white text-[10px] font-semibold leading-none">{title}</p>
            <p className="text-neutral-500 text-[8px] leading-tight text-center line-clamp-2">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}

/* ================= Learning Settings Widget ================= */

export function LearningSettingsWidget() {
  const notify = useToast();
  const [autoPlay, setAutoPlay] = useState(true);
  const [offline, setOffline] = useState(false);

  return (
    <WidgetCard>
      <div className="flex items-center gap-2">
        <Settings className="w-4 h-4 text-neutral-400" strokeWidth={2} />
        <h3 className="text-white font-bold text-sm">Learning Settings</h3>
      </div>

      <div className="flex flex-col gap-2.5 mt-3">
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-neutral-300 font-medium">Daily Reminders</span>
          <button
            onClick={() => notify("Daily reminder set to 8:00 PM (static in prototype)", "info")}
            className="text-xs text-neutral-500 hover:text-brand-teal cursor-pointer"
          >
            8:00 PM ›
          </button>
        </div>

        {/* Auto Play toggle */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-300 font-medium">Auto Play</span>
          <button
            onClick={() => {
              setAutoPlay(!autoPlay);
              notify(autoPlay ? "Auto Play turned off" : "Auto Play turned on", autoPlay ? "info" : "success");
            }}
            role="switch"
            aria-checked={autoPlay}
            className={`w-7 h-[18px] rounded-full relative transition-colors duration-200 cursor-pointer ${
              autoPlay ? "bg-brand-teal" : "bg-brand-border"
            }`}
          >
            <span
              className={`absolute top-[3px] w-3 h-3 rounded-full transition-all duration-200 ${
                autoPlay ? "left-[14px] bg-white" : "left-[4px] bg-neutral-500"
              }`}
            />
          </button>
        </div>

        {/* Offline Mode toggle */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-300 font-medium">Offline Mode</span>
          <button
            onClick={() => {
              setOffline(!offline);
              notify(
                offline ? "Offline Mode turned off — back online" : "Offline Mode turned on — download courses to learn anywhere",
                offline ? "info" : "success"
              );
            }}
            role="switch"
            aria-checked={offline}
            className={`w-7 h-[18px] rounded-full relative transition-colors duration-200 cursor-pointer ${
              offline ? "bg-brand-teal" : "bg-brand-border"
            }`}
          >
            <span
              className={`absolute top-[3px] w-3 h-3 rounded-full transition-all duration-200 ${
                offline ? "left-[14px] bg-white" : "left-[4px] bg-neutral-500"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-300 font-medium">Notifications</span>
          <button
            onClick={() => notify("Notification preferences — opens a settings page (prototype)", "info")}
            className="text-neutral-500 hover:text-brand-teal cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </WidgetCard>
  );
}

/* ================= Challenge Widget ================= */

export function ChallengeWidget() {
  const notify = useToast();
  const [progress, setProgress] = useState(1);

  return (
    <WidgetCard>
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-brand-gold" fill="#F4B942" strokeWidth={2} />
        <h3 className="text-white font-bold text-sm">Challenge of the Week</h3>
      </div>

      <p className="text-neutral-300 text-sm font-semibold mt-2">Build a Morning Routine</p>
      <p className="text-neutral-500 text-[11px] mt-1 leading-relaxed">
        Complete 3 lessons + track your habit.
      </p>

      <div className="mt-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-brand-gold font-semibold">{progress} / 3</span>
          <span className="text-[11px] text-neutral-500">{Math.round((progress / 3) * 100)}%</span>
        </div>
        <div className="w-full h-1.5 bg-brand-border rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-gold rounded-full transition-all duration-300"
            style={{ width: `${(progress / 3) * 100}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => {
          if (progress >= 3) {
            setProgress(0);
            notify("Challenge reset — ready for a fresh week! 🏆", "info");
          } else {
            setProgress(progress + 1);
            notify(
              progress + 1 >= 3
                ? "🏆 Challenge complete! You build habits that stick."
                : `Lesson marked off — ${progress + 1}/3 complete`,
              "success"
            );
          }
        }}
        className="w-full mt-3 border border-brand-gold/40 text-brand-gold text-xs font-semibold py-2 rounded-xl hover:bg-brand-gold/10 transition-colors duration-150 cursor-pointer"
      >
        {progress >= 3 ? "Reset challenge ↺" : "Mark a lesson done ✓"}
      </button>
    </WidgetCard>
  );
}

/* ================= Right Sidebar Layout ================= */

interface RightSidebarProps {
  /** Panel open state (ignored when `collapsible` is false). */
  isOpen: boolean;
  /** Toggle callback (ignored when `collapsible` is false). */
  onToggle: () => void;
  /** Set to false to render the panel permanently open with no toggle handle. */
  collapsible?: boolean;
}

export default function RightSidebar({
  isOpen,
  onToggle,
  collapsible = true,
}: RightSidebarProps) {
  // A permanently-open panel (e.g. pinned to the courses page) never renders
  // the fixed toggle handle and always takes its full width.
  if (!collapsible) {
    return (
      <aside
        id="right-sidebar-panel"
        aria-hidden={false}
        className="w-[300px] min-w-[300px] h-screen flex flex-col gap-6 overflow-y-auto px-4 bg-transparent py-6 smooth-scroll"
      >
        <ProfileWidget />
        <DailyStreakWidget />
        <AchievementsWidget />
        <LearningSettingsWidget />
        <ChallengeWidget />
      </aside>
    );
  }

  return (
    <>
      {/* Collapse handle — fixed to the viewport, vertically centered.
          It lives OUTSIDE the collapsing container so it never slides away
          with the panel, and z-50 keeps it above the main content. */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="right-sidebar-panel"
        aria-label={isOpen ? "Hide panel" : "Show panel"}
        title={isOpen ? "Hide panel" : "Show panel"}
        className={`group fixed top-1/2 -translate-y-1/2 z-50 flex h-12 w-5 items-center justify-center cursor-pointer
          rounded-l-lg border border-r-0 bg-brand-surface/90 backdrop-blur-sm
          border-brand-border text-neutral-500 shadow-lg shadow-black/30
          transition-all duration-300 ease-in-out
          hover:bg-brand-surface hover:text-brand-teal hover:border-brand-teal/40
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60
          ${isOpen ? "right-[300px]" : "right-0"}`}
      >
        <ChevronRight
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            isOpen ? "" : "rotate-180"
          }`}
          strokeWidth={2.5}
        />
        {/* Hover tooltip */}
        <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap rounded-lg border border-brand-border bg-brand-surface px-2.5 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
          {isOpen ? "Hide panel" : "Show panel"}
        </span>
      </button>

      {/* Collapsing container — width animates to 0 so the main content
          reflows to fill the freed space. */}
      <div
        id="right-sidebar-panel"
        className={`relative h-screen transition-all duration-300 ease-in-out ${
          isOpen ? "w-[300px]" : "w-0"
        }`}
      >
        {/* Sidebar Content — fixed width, slides in/out.
            transform + opacity slide immediately; visibility flips to
            "hidden" only AFTER the slide finishes (delay on close) so the
            panel stays out of the a11y tree + tab order when collapsed. */}
        <aside
          aria-hidden={!isOpen}
          className={`absolute top-0 right-0 w-[300px] h-screen flex flex-col gap-6 overflow-y-auto px-4 bg-transparent py-6 smooth-scroll ease-in-out ${
            isOpen
              ? "visible translate-x-0 opacity-100"
              : "invisible translate-x-full opacity-0 pointer-events-none"
          }`}
          style={{
            transition: isOpen
              ? "transform 300ms ease-in-out, opacity 300ms ease-in-out, visibility 0ms linear"
              : "transform 300ms ease-in-out, opacity 300ms ease-in-out, visibility 0ms linear 300ms",
          }}
        >
          <ProfileWidget />
          <DailyStreakWidget />
          <AchievementsWidget />
          <LearningSettingsWidget />
          <ChallengeWidget />
        </aside>
      </div>
    </>
  );
}