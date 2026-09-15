"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Home,
  BookOpen,
  Compass,
  Map,
  Bookmark,
  Menu,
  Zap,
  Library,
  Wrench,
  User,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useToast } from "@/components/Toast";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";

interface Tab {
  label: string;
  icon: LucideIcon;
  /** Routes with a href use <Link> so Next.js prefetches them (instant nav). */
  href?: string;
}

const tabs: Tab[] = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Courses", icon: BookOpen, href: "/courses" },
  { label: "Explore", icon: Compass, href: "/explore" },
  { label: "Roadmap", icon: Map, href: "/roadmap" },
];

/** Additional nav items shown in the "More" drawer. */
const moreItems: Tab[] = [
  { label: "Saved", icon: Bookmark },
  { label: "Challenges", icon: Zap, href: "/challenges" },
  { label: "Resources", icon: Library, href: "/resources" },
  { label: "Tools", icon: Wrench },
  { label: "Profile", icon: User },
];

/** English label → translation key (logic keeps comparing English labels). */
const navLabelKeys: Record<string, TranslationKey> = {
  Home: "nav.home",
  Courses: "nav.courses",
  Explore: "nav.explore",
  Roadmap: "nav.roadmap",
  More: "nav.more",
  Saved: "nav.saved",
  Challenges: "nav.challenges",
  Resources: "nav.resources",
  Tools: "nav.tools",
  Profile: "nav.profile",
};

/** Map a URL to the tab index that should be highlighted (or -1 for none). */
function activeIndexForPathname(pathname: string | null): number {
  if (!pathname) return -1;
  if (pathname === "/") return 0;
  if (pathname.startsWith("/courses") || pathname.startsWith("/course/")) return 1;
  if (pathname.startsWith("/explore")) return 2;
  if (pathname.startsWith("/roadmap")) return 3;
  return -1;
}

/** Check if the current path matches a more-item (for highlighting). */
function isActiveMoreItem(pathname: string | null, label: string): boolean {
  if (!pathname) return false;
  const map: Record<string, string> = {
    Saved: "/saved",
    Resources: "/resources",
    Challenges: "/challenges",
    Profile: "/profile",
  };
  const prefix = map[label];
  return prefix ? pathname.startsWith(prefix) : false;
}

/** Smooth-scroll the page's scroll container back to the top. */
function scrollToTop() {
  const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, options?: object) => void } }).lenis;
  if (lenis) {
    lenis.scrollTo(0, { duration: 0.6 });
    return;
  }
  document
    .querySelector<HTMLElement>(".smooth-scroll")
    ?.scrollTo({ top: 0, behavior: "smooth" });
}

export default function MobileBottomNav() {
  const notify = useToast();
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeIndex = activeIndexForPathname(pathname);

  const handleMoreItem = (item: Tab) => {
    setDrawerOpen(false);
    if (item.label === "Profile") {
      router.push("/profile");
      return;
    }
    if (item.label === "Saved") {
      router.push("/saved");
      return;
    }
    if (item.label === "Resources") {
      router.push("/resources");
      return;
    }
    if (item.label === "Tools") {
      router.push("/tools");
      return;
    }
    if (item.label === "Challenges") {
      router.push("/challenges");
      return;
    }
    notify(`${item.label} — coming soon`, "info");
  };

  return (
    <>
      <nav className="shrink-0 w-full bg-[#0B0E11] border-t border-[#2E2E2E] pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = index === activeIndex;
            const className =
              "relative flex flex-col items-center justify-center gap-1 flex-1 py-2.5 cursor-pointer transition-colors";
            const content = (
              <>
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#7CE1D4] rounded-full" />
                )}
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-[#7CE1D4]" : "text-[#9CA3AF]"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? "text-[#7CE1D4]" : "text-[#9CA3AF]"
                  }`}
                >
                  {t(navLabelKeys[tab.label])}
                </span>
              </>
            );

            return (
              <Link
                key={tab.label}
                href={tab.href!}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => {
                  if (isActive) {
                    e.preventDefault();
                    scrollToTop();
                  }
                }}
                className={className}
              >
                {content}
              </Link>
            );
          })}

          {/* More tab */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative flex flex-col items-center justify-center gap-1 flex-1 py-2.5 cursor-pointer transition-colors"
            aria-label="More navigation"
          >
            <Menu
              className={`w-5 h-5 transition-colors ${
                drawerOpen ? "text-[#7CE1D4]" : "text-[#9CA3AF]"
              }`}
              strokeWidth={drawerOpen ? 2.5 : 2}
            />
            <span
              className={`text-[10px] font-medium transition-colors ${
                drawerOpen ? "text-[#7CE1D4]" : "text-[#9CA3AF]"
              }`}
            >
              {t("nav.more")}
            </span>
          </button>
        </div>
      </nav>

      {/* More drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* More drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#0B0E11] border-t border-[#2E2E2E] rounded-t-2xl transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2E2E2E]">
          <span className="text-white font-semibold text-sm">{t("nav.menu")}</span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 rounded-full bg-[#1E232A] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {moreItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveMoreItem(pathname, item.label);
            return (
              <button
                key={item.label}
                onClick={() => handleMoreItem(item)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-[#7CE1D4]/10 text-[#7CE1D4]"
                    : "text-neutral-300 hover:bg-[#1E232A] hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-sm font-medium">{t(navLabelKeys[item.label])}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
