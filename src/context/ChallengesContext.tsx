"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { challenges } from "@/data/challenges";

const STORAGE_KEY = "challenges-progress";

interface ChallengeProgress {
  challengeId: string;
  current: number;
  completed: boolean;
  completedAt?: string;
}

interface UserStats {
  totalPoints: number;
  streak: number;
  lastLogin: string;
  completedCourses: string[];
  weeklyLessons: number;
  weeklyResetAt: string;
}

interface ChallengesContextValue {
  stats: UserStats;
  challengeProgress: Map<string, ChallengeProgress>;
  completeChallenge: (challengeId: string) => void;
  addPoints: (points: number) => void;
  recordCourseComplete: (courseId: string) => void;
  recordLessonComplete: () => void;
  recordLogin: () => void;
  getChallengeProgress: (challengeId: string) => ChallengeProgress | undefined;
  isChallengeCompleted: (challengeId: string) => boolean;
  canClaimReward: (challengeId: string) => boolean;
}

function getWeekResetTime(): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + daysUntilMonday);
  nextMonday.setHours(0, 0, 0, 0);
  return nextMonday.toISOString();
}

const defaultStats: UserStats = {
  totalPoints: 230,
  streak: 3,
  lastLogin: new Date().toISOString(),
  completedCourses: ["driving-basics", "cooking-basics", "computer-basics"],
  weeklyLessons: 1,
  weeklyResetAt: getWeekResetTime(),
};

function getDefaultProgress(): Map<string, ChallengeProgress> {
  const map = new Map<string, ChallengeProgress>();
  challenges.forEach((c) => {
    const isCompleted = defaultStats.completedCourses.includes(c.linkedCourseId || "");
    map.set(c.id, {
      challengeId: c.id,
      current: isCompleted ? c.target : Math.floor(Math.random() * (c.target * 0.6)),
      completed: isCompleted,
      completedAt: isCompleted ? new Date().toISOString() : undefined,
    });
  });
  return map;
}

const ChallengesContext = createContext<ChallengesContextValue>({
  stats: defaultStats,
  challengeProgress: getDefaultProgress(),
  completeChallenge: () => {},
  addPoints: () => {},
  recordCourseComplete: () => {},
  recordLessonComplete: () => {},
  recordLogin: () => {},
  getChallengeProgress: () => undefined,
  isChallengeCompleted: () => false,
  canClaimReward: () => false,
});

export function ChallengesProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [challengeProgress, setChallengeProgress] = useState<Map<string, ChallengeProgress>>(getDefaultProgress);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.stats) setStats({ ...defaultStats, ...parsed.stats });
        if (parsed.progress) {
          const map = new Map<string, ChallengeProgress>(Object.entries(parsed.progress));
          setChallengeProgress(map);
        }
      }
    } catch { /* use defaults */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ stats, progress: Object.fromEntries(challengeProgress) }));
    } catch { /* no-op */ }
  }, [stats, challengeProgress]);

  const getChallengeProgress = (id: string) => challengeProgress.get(id);
  const isChallengeCompleted = (id: string) => challengeProgress.get(id)?.completed ?? false;
  const canClaimReward = (id: string) => {
    const p = challengeProgress.get(id);
    const c = challenges.find((x) => x.id === id);
    return p && c ? p.current >= c.target && !p.completed : false;
  };

  const addPoints = (pts: number) => setStats((s) => ({ ...s, totalPoints: s.totalPoints + pts }));

  const completeChallenge = (id: string) => {
    setChallengeProgress((prev) => {
      const next = new Map(prev);
      const p = next.get(id);
      const c = challenges.find((x) => x.id === id);
      if (p && c && !p.completed) next.set(id, { ...p, current: c.target, completed: true, completedAt: new Date().toISOString() });
      return next;
    });
    const c = challenges.find((x) => x.id === id);
    if (c) addPoints(c.points);
  };

  const recordCourseComplete = (courseId: string) => {
    setStats((s) => s.completedCourses.includes(courseId) ? s : { ...s, completedCourses: [...s.completedCourses, courseId] });
    challenges.forEach((c) => { if (c.linkedCourseId === courseId) completeChallenge(c.id); });
  };

  const recordLessonComplete = () => {
    setStats((s) => ({ ...s, weeklyLessons: s.weeklyLessons + 1 }));
    setChallengeProgress((prev) => {
      const next = new Map(prev);
      const w = next.get("weekly-3-courses");
      if (w && !w.completed) {
        const n = Math.min(w.current + 1, 3);
        next.set("weekly-3-courses", { ...w, current: n, completed: n >= 3, completedAt: n >= 3 ? new Date().toISOString() : undefined });
        if (n >= 3) addPoints(50);
      }
      return next;
    });
  };

  const recordLogin = () => {
    const now = new Date();
    const last = new Date(stats.lastLogin);
    const hrs = (now.getTime() - last.getTime()) / (1000 * 60 * 60);
    if (hrs > 24) {
      const ok = hrs < 48;
      setStats((s) => ({ ...s, streak: ok ? s.streak + 1 : 1, lastLogin: now.toISOString() }));
      setChallengeProgress((prev) => {
        const next = new Map(prev);
        const st = next.get("streak-challenge");
        if (st && !st.completed) {
          const n = Math.min((ok ? st.current + 1 : 1), 7);
          next.set("streak-challenge", { ...st, current: n, completed: n >= 7, completedAt: n >= 7 ? new Date().toISOString() : undefined });
          if (n >= 7) addPoints(75);
        }
        return next;
      });
    }
  };

  return (
    <ChallengesContext.Provider value={{ stats, challengeProgress, completeChallenge, addPoints, recordCourseComplete, recordLessonComplete, recordLogin, getChallengeProgress, isChallengeCompleted, canClaimReward }}>
      {children}
    </ChallengesContext.Provider>
  );
}

export function useChallenges() {
  return useContext(ChallengesContext);
}
