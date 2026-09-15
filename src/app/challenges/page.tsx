"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Zap,
  Trophy,
  Flame,
  Check,
  Star,
  ArrowLeft,
  Award,
  TrendingUp,
  Wallet,
  Briefcase,
  ChefHat,
  Moon,
  Code,
  Calendar,
  Target as TargetIcon,
  Flame as FlameIcon,
  BookOpen,
  GraduationCap,
  Star as StarIcon,
  Trophy as TrophyIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { challenges, badges } from "@/data/challenges";
import { useChallenges } from "@/context/ChallengesContext";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import MobileShell from "@/components/MobileShell";
import { useRightSidebar } from "@/context/SidebarContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useToast } from "@/components/Toast";

const iconMap: Record<string, LucideIcon> = {
  "trending-up": TrendingUp,
  wallet: Wallet,
  briefcase: Briefcase,
  "chef-hat": ChefHat,
  moon: Moon,
  code: Code,
  calendar: Calendar,
  target: TargetIcon,
  flame: FlameIcon,
  "book-open": BookOpen,
  "graduation-cap": GraduationCap,
  star: StarIcon,
  trophy: TrophyIcon,
};


function StatsHeader({ compact = false }: { compact?: boolean }) {
  const { stats } = useChallenges();
  if (compact) {
    return (
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#161A1E] border border-[#2E2E2E] rounded-xl p-3 text-center">
          <Star className="w-4 h-4 text-[#F4B942] mx-auto mb-1" />
          <p className="text-white font-bold text-sm">{stats.totalPoints}</p>
          <p className="text-[10px] text-[#9CA3AF]">Points</p>
        </div>
        <div className="bg-[#161A1E] border border-[#2E2E2E] rounded-xl p-3 text-center">
          <Flame className="w-4 h-4 text-[#F97316] mx-auto mb-1" />
          <p className="text-white font-bold text-sm">{stats.streak}</p>
          <p className="text-[10px] text-[#9CA3AF]">Streak</p>
        </div>
        <div className="bg-[#161A1E] border border-[#2E2E2E] rounded-xl p-3 text-center">
          <Check className="w-4 h-4 text-[#7CE1D4] mx-auto mb-1" />
          <p className="text-white font-bold text-sm">{stats.completedCourses.length}</p>
          <p className="text-[10px] text-[#9CA3AF]">Done</p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 text-center">
        <div className="w-10 h-10 rounded-full bg-[#F4B942]/10 flex items-center justify-center mx-auto mb-2">
          <Star className="w-5 h-5 text-[#F4B942]" />
        </div>
        <p className="text-white font-bold text-2xl">{stats.totalPoints}</p>
        <p className="text-[#9CA3AF] text-sm">Total Points</p>
      </div>
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 text-center">
        <div className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center mx-auto mb-2">
          <Flame className="w-5 h-5 text-[#F97316]" />
        </div>
        <p className="text-white font-bold text-2xl">{stats.streak}</p>
        <p className="text-[#9CA3AF] text-sm">Day Streak</p>
      </div>
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 text-center">
        <div className="w-10 h-10 rounded-full bg-[#7CE1D4]/10 flex items-center justify-center mx-auto mb-2">
          <Trophy className="w-5 h-5 text-[#7CE1D4]" />
        </div>
        <p className="text-white font-bold text-2xl">{stats.completedCourses.length}</p>
        <p className="text-[#9CA3AF] text-sm">Completed</p>
      </div>
    </div>
  );
}

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Zap;
}


function ChallengeCard({ challenge }: { challenge: (typeof challenges)[0] }) {
  const { getChallengeProgress, isChallengeCompleted, canClaimReward, completeChallenge } = useChallenges();
  const notify = useToast();
  const progress = getChallengeProgress(challenge.id);
  const completed = isChallengeCompleted(challenge.id);
  const canClaim = canClaimReward(challenge.id);
  const Icon = getIcon(challenge.icon);
  const pct = progress ? Math.min(Math.round((progress.current / challenge.target) * 100), 100) : 0;

  const handleClaim = () => {
    if (canClaim) {
      completeChallenge(challenge.id);
      notify(`🎉 Claimed ${challenge.points} points!`, "success");
    }
  };

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${completed ? "bg-[#7CE1D4]/5 border-[#7CE1D4]/30" : "bg-brand-surface border-brand-border hover:border-brand-teal/20"}`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${completed ? "bg-[#7CE1D4] text-black" : "bg-[#1E232A] text-[#7CE1D4]"}`}>
            {completed ? <Check className="w-5 h-5" strokeWidth={3} /> : <Icon className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className={`font-semibold text-sm ${completed ? "text-[#7CE1D4]" : "text-white"}`}>{challenge.title}</h3>
              <span className="text-[10px] bg-[#F4B942]/10 text-[#F4B942] px-1.5 py-0.5 rounded-full font-medium">+{challenge.points} pts</span>
            </div>
            <p className="text-xs text-[#9CA3AF] line-clamp-1">{challenge.description}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-[#9CA3AF]">{progress?.current ?? 0}/{challenge.target}</span>
            <span className="text-[11px] text-[#9CA3AF]">{pct}%</span>
          </div>
          <ProgressBar current={progress?.current ?? 0} total={challenge.target} />
        </div>
        {canClaim && (
          <button onClick={handleClaim} className="w-full mt-3 py-2 rounded-lg bg-[#7CE1D4] text-black text-xs font-semibold hover:bg-[#7CE1D4]/90 transition-colors">
            Claim Reward
          </button>
        )}
        {completed && (
          <div className="flex items-center justify-center gap-1 mt-3 text-[11px] text-[#7CE1D4]">
            <Check className="w-3 h-3" /> Completed
          </div>
        )}
      </div>
    </div>
  );
}

function MobileChallengeCard({ challenge }: { challenge: (typeof challenges)[0] }) {
  const { getChallengeProgress, isChallengeCompleted, canClaimReward, completeChallenge } = useChallenges();
  const notify = useToast();
  const progress = getChallengeProgress(challenge.id);
  const completed = isChallengeCompleted(challenge.id);
  const canClaim = canClaimReward(challenge.id);
  const Icon = getIcon(challenge.icon);
  const pct = progress ? Math.min(Math.round((progress.current / challenge.target) * 100), 100) : 0;

  const handleClaim = () => {
    if (canClaim) {
      completeChallenge(challenge.id);
      notify(`🎉 Claimed ${challenge.points} points!`, "success");
    }
  };

  return (
    <div className={`rounded-xl border p-3 transition-all ${completed ? "bg-[#7CE1D4]/5 border-[#7CE1D4]/30" : "bg-[#161A1E] border-[#2E2E2E]"}`}>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${completed ? "bg-[#7CE1D4] text-black" : "bg-[#0B0E11] text-[#7CE1D4]"}`}>
          {completed ? <Check className="w-4 h-4" strokeWidth={3} /> : <Icon className="w-4 h-4" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold text-sm truncate ${completed ? "text-[#7CE1D4]" : "text-white"}`}>{challenge.title}</h3>
            <span className="text-[10px] bg-[#F4B942]/10 text-[#F4B942] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">+{challenge.points}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1.5 bg-[#2E2E2E] rounded-full overflow-hidden">
              <div className="h-full bg-[#7CE1D4] rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[10px] text-[#9CA3AF] flex-shrink-0">{pct}%</span>
          </div>
        </div>
        {canClaim && (
          <button onClick={handleClaim} className="px-3 py-1.5 rounded-lg bg-[#7CE1D4] text-black text-[11px] font-semibold flex-shrink-0">Claim</button>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total === 0 ? 0 : Math.min(Math.round((current / total) * 100), 100);
  return (
    <div className="w-full h-2 bg-[#2E2E2E] rounded-full overflow-hidden">
      <div className="h-full bg-[#7CE1D4] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
    </div>
  );
}

function BadgesSection({ compact = false }: { compact?: boolean }) {
  const { stats } = useChallenges();
  const earned: typeof badges = [];
  const locked: typeof badges = [];
  badges.forEach((b) => {
    let e = false;
    if (b.id === "first-course" && stats.completedCourses.length >= 1) e = true;
    if (b.id === "streak-7" && stats.streak >= 7) e = true;
    if (b.id === "points-500" && stats.totalPoints >= 500) e = true;
    if (b.id === "points-1000" && stats.totalPoints >= 1000) e = true;
    if (b.id === "courses-5" && stats.completedCourses.length >= 5) e = true;
    e ? earned.push(b) : locked.push(b);
  });

  const all = [...earned, ...locked];

  if (compact) {
    return (
      <div className="bg-[#161A1E] border border-[#2E2E2E] rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-4 h-4 text-[#F4B942]" />
          <span className="text-white font-semibold text-sm">Badges</span>
          <span className="text-[10px] text-[#9CA3AF]">{earned.length}/{badges.length}</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {all.map((b) => <BadgeDot key={b.id} badge={b} earned={earned.includes(b)} />)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-[#F4B942]" />
        <h2 className="text-white font-bold text-lg">Badges</h2>
        <span className="text-sm text-[#9CA3AF]">{earned.length}/{badges.length} earned</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {all.map((b) => <BadgeCard key={b.id} badge={b} earned={earned.includes(b)} />)}
      </div>
    </div>
  );
}

function BadgeDot({ badge, earned }: { badge: (typeof badges)[0]; earned: boolean }) {
  const Icon = getIcon(badge.icon);
  return (
    <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${earned ? "bg-[#F4B942]/10 text-[#F4B942]" : "bg-[#0B0E11] text-[#2E2E2E]"}`} title={badge.title}>
      <Icon className="w-4 h-4" />
    </div>
  );
}

function BadgeCard({ badge, earned }: { badge: (typeof badges)[0]; earned: boolean }) {
  const Icon = getIcon(badge.icon);
  return (
    <div className={`rounded-xl border p-4 text-center transition-all ${earned ? "bg-[#F4B942]/5 border-[#F4B942]/30" : "bg-brand-surface border-brand-border opacity-50"}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${earned ? "bg-[#F4B942]/10 text-[#F4B942]" : "bg-[#1E232A] text-[#2E2E2E]"}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className={`font-semibold text-sm ${earned ? "text-white" : "text-[#9CA3AF]"}`}>{badge.title}</h3>
      <p className="text-[11px] text-[#9CA3AF] mt-0.5">{badge.requirement}</p>
    </div>
  );
}

export default function ChallengesPage() {
  const router = useRouter();
  const notify = useToast();
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();
  const isMobile = useIsMobile();
  const { stats } = useChallenges();
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  const activeChallenges = challenges.filter((c) => !stats.completedCourses.includes(c.linkedCourseId || ""));
  const completedChallenges = challenges.filter((c) => stats.completedCourses.includes(c.linkedCourseId || ""));
  const displayChallenges = activeTab === "active" ? activeChallenges : completedChallenges;

  if (isMobile) {
    return (
      <MobileShell>
        <div className="px-4 pt-1 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => router.push("/")} className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-white transition-colors" aria-label="Back to home">
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Challenges</h1>
              <p className="text-[#9CA3AF] text-xs">Earn points & badges</p>
            </div>
          </div>
          <StatsHeader compact />
          <div className="mt-3"><BadgesSection compact /></div>
          <div className="flex gap-1 mt-4 mb-3 bg-[#161A1E] rounded-lg p-1">
            <button onClick={() => setActiveTab("active")} className={`flex-1 py-2 rounded-md text-xs font-medium transition-colors ${activeTab === "active" ? "bg-[#7CE1D4] text-black" : "text-[#9CA3AF] hover:text-white"}`}>Active ({activeChallenges.length})</button>
            <button onClick={() => setActiveTab("completed")} className={`flex-1 py-2 rounded-md text-xs font-medium transition-colors ${activeTab === "completed" ? "bg-[#7CE1D4] text-black" : "text-[#9CA3AF] hover:text-white"}`}>Completed ({completedChallenges.length})</button>
          </div>
          <div className="flex flex-col gap-2">
            {displayChallenges.map((c) => <MobileChallengeCard key={c.id} challenge={c} />)}
          </div>
        </div>
      </MobileShell>
    );
  }

  return (
    <div className="flex h-screen bg-brand-bg text-white overflow-hidden">
      <LeftSidebar />
      <div className="flex-1 min-w-0 h-screen overflow-y-auto smooth-scroll bg-brand-bg">
        <div className="sticky top-0 z-20 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3.5 lg:py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => router.push("/")} className="text-neutral-400 hover:text-white cursor-pointer"><ArrowLeft className="w-5 h-5" /></button>
              <h1 className="text-lg lg:text-xl font-bold">Challenges</h1>
            </div>
            <div className="flex items-center gap-2 bg-[#1E232A] rounded-lg px-3 py-1.5">
              <Star className="w-4 h-4 text-[#F4B942]" />
              <span className="text-white font-semibold text-sm">{stats.totalPoints}</span>
              <span className="text-[#9CA3AF] text-xs">points</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <StatsHeader />
          <BadgesSection />
          <div className="flex gap-1 bg-brand-surface rounded-xl p-1 w-fit">
            <button onClick={() => setActiveTab("active")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "active" ? "bg-[#7CE1D4] text-black" : "text-[#9CA3AF] hover:text-white"}`}>Active ({activeChallenges.length})</button>
            <button onClick={() => setActiveTab("completed")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "completed" ? "bg-[#7CE1D4] text-black" : "text-[#9CA3AF] hover:text-white"}`}>Completed ({completedChallenges.length})</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {displayChallenges.map((c) => <ChallengeCard key={c.id} challenge={c} />)}
          </div>
        </div>
      </div>
      <RightSidebar isOpen={isRightSidebarOpen} onToggle={toggleRightSidebar} />
    </div>
  );
}

