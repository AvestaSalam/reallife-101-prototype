"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  BarChart2,
  Home,
  BookOpen,
  Map,
  Zap,
  Compass,
  Bookmark,
  Library,
  Calculator,
  FileText,
  Bot,
  Diamond,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useToast } from "@/components/Toast";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import type { TranslationKey } from "@/lib/i18n/translations";

const mainNav = [
  { label: "Home", icon: Home },
  { label: "Courses", icon: BookOpen },
  { label: "Roadmap", icon: Map },
  { label: "Challenges", icon: Zap },
  { label: "Explore", icon: Compass },
  { label: "Saved", icon: Bookmark },
  { label: "Resources", icon: Library },
  { label: "Profile", icon: User },
];

/** English label → translation key (logic keeps comparing English labels). */
const navLabelKeys: Record<string, TranslationKey> = {
  Home: "nav.home",
  Courses: "nav.courses",
  Roadmap: "nav.roadmap",
  Challenges: "nav.challenges",
  Explore: "nav.explore",
  Saved: "nav.saved",
  Resources: "nav.resources",
  Profile: "nav.profile",
  "Budget Planner": "tools.budget",
  "Resume Builder": "tools.resume",
  "AI Coach": "tools.aiCoach",
};

const toolsNav: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "Budget Planner", icon: Calculator, href: "/tools/budget-planner" },
  { label: "Resume Builder", icon: FileText, href: "/tools/resume-builder" },
  { label: "AI Coach", icon: Bot, href: "/tools/ai-coach" },
];

export default function LeftSidebar() {
  const notify = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { t, locale } = useLanguage();
  const { isPremium, subscription } = useSubscription();

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "zh" ? "zh-CN" : locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Derive the active item from the real URL so the highlight always matches
  // where the user actually is — never local state that can drift out of sync.
  const isActive = (label: string) => {
    if (pathname === "/") return label === "Home";
    if (pathname.startsWith("/courses") || pathname.startsWith("/course/")) {
      return label === "Courses";
    }
    if (pathname.startsWith("/roadmap")) return label === "Roadmap";
    if (pathname.startsWith("/challenges")) return label === "Challenges";
    if (pathname.startsWith("/explore")) return label === "Explore";
    if (pathname.startsWith("/saved")) return label === "Saved";
    if (pathname.startsWith("/resources")) return label === "Resources";
    if (pathname.startsWith("/profile")) return label === "Profile";
    return false;
  };

  const goTo = (label: string) => {
    // No-op when already on the target route (prevents re-push glitch).
    if (label === "Home") {
      if (pathname !== "/") router.push("/");
      return;
    }
    if (label === "Courses") {
      if (pathname !== "/courses") router.push("/courses");
      return;
    }
    if (label === "Roadmap") {
      if (pathname !== "/roadmap") router.push("/roadmap");
      return;
    }
    if (label === "Challenges") {
      if (pathname !== "/challenges") router.push("/challenges");
      return;
    }
    if (label === "Explore") {
      if (pathname !== "/explore") router.push("/explore");
      return;
    }
    if (label === "Saved") {
      if (pathname !== "/saved") router.push("/saved");
      return;
    }
    if (label === "Resources") {
      if (pathname !== "/resources") router.push("/resources");
      return;
    }
    if (label === "Profile") {
      if (pathname !== "/profile") router.push("/profile");
      return;
    }
    notify(`Navigating to ${label} — coming soon in this prototype`, "info");
  };

  return (
    <aside className="w-[250px] min-w-[250px] h-screen flex flex-col bg-brand-surface border-r border-brand-border overflow-y-auto smooth-scroll">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-brand-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-rust/20">
          <BarChart2 className="w-5 h-5 text-brand-rust" strokeWidth={2.5} />
        </div>
        <span className="text-white font-bold text-[17px] tracking-tight leading-tight">
          Reallife <span className="text-brand-rust">101</span>
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-1 px-3 pt-5 pb-4">
        {mainNav.map(({ label, icon: Icon }) => {
          const active = isActive(label);
          return (
            <button
              key={label}
              onClick={() => goTo(label)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left ${
                active
                  ? "bg-brand-rust text-white shadow-lg shadow-brand-rust/20"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon
                className={`w-[18px] h-[18px] flex-shrink-0 ${active ? "text-white" : "text-neutral-500"}`}
                strokeWidth={active ? 2.5 : 2}
              />
              {t(navLabelKeys[label])}
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-5 border-t border-brand-border" />

      {/* Tools Section */}
      <div className="px-3 pt-4 pb-4">
        <p className="text-[10px] font-semibold text-neutral-500 tracking-widest uppercase px-3 mb-2">
          Tools
        </p>
        <nav className="flex flex-col gap-1">
          {toolsNav.map(({ label, icon: Icon, href }) => {
            const active = pathname.startsWith(href);
            return (
              <button
                key={label}
                onClick={() => {
                  if (pathname !== href) router.push(href);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left ${
                  active
                    ? "bg-brand-rust text-white shadow-lg shadow-brand-rust/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] flex-shrink-0 ${active ? "text-white" : "text-neutral-500"}`}
                  strokeWidth={active ? 2.5 : 2}
                />
                {t(navLabelKeys[label])}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Upsell / Premium card — routes to the profile subscription section */}
      <div className="mx-3 mb-4 rounded-2xl bg-gradient-to-b from-[#1a2a2a] to-[#0f1f1f] border border-brand-teal/20 p-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-teal/15 mb-3">
          <Diamond className="w-5 h-5 text-brand-teal" strokeWidth={2} />
        </div>
        {isPremium && subscription ? (
          <>
            <p className="text-white font-bold text-[15px] mb-1">
              {t("premium.member")}
            </p>
            <p className="text-neutral-400 text-xs leading-relaxed mb-4">
              {subscription.trial
                ? t("premium.trialEnds", { date: fmtDate(subscription.renewsAt) })
                : t("premium.renews", { date: fmtDate(subscription.renewsAt) })}
            </p>
            <button
              onClick={() => router.push("/profile")}
              className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-150 cursor-pointer"
            >
              {t("premium.manage")}
            </button>
          </>
        ) : (
          <>
            <p className="text-white font-bold text-[15px] mb-1">
              {t("premium.free.title")}
            </p>
            <p className="text-neutral-400 text-xs leading-relaxed mb-4">
              {t("premium.free.subtitle")}
            </p>
            <button
              onClick={() => router.push("/profile")}
              className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-150 cursor-pointer"
            >
              {t("premium.free.cta")}
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
