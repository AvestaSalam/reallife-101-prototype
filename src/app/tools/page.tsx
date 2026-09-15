"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Calculator,
  FileText,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useRightSidebar } from "@/context/SidebarContext";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";

/* Tools showcased in this prototype (Templates was removed by design). */
const tools: {
  titleKey: TranslationKey;
  descKey: TranslationKey;
  icon: LucideIcon;
  iconText: string;
  iconBg: string;
  href: string;
}[] = [
  {
    titleKey: "tools.budget",
    descKey: "tools.budget.desc",
    icon: Calculator,
    iconText: "text-brand-teal",
    iconBg: "bg-brand-teal/10",
    href: "/tools/budget-planner",
  },
  {
    titleKey: "tools.resume",
    descKey: "tools.resume.desc",
    icon: FileText,
    iconText: "text-brand-gold",
    iconBg: "bg-brand-gold/10",
    href: "/tools/resume-builder",
  },
  {
    titleKey: "tools.aiCoach",
    descKey: "tools.aiCoach.desc",
    icon: Bot,
    iconText: "text-brand-rust",
    iconBg: "bg-brand-rust/10",
    href: "/tools/ai-coach",
  },
];

function ToolCard({
  title,
  desc,
  icon: Icon,
  iconText,
  iconBg,
  onOpen,
  openLabel,
  prototypeLabel,
}: {
  title: string;
  desc: string;
  icon: LucideIcon;
  iconText: string;
  iconBg: string;
  onOpen: () => void;
  openLabel: string;
  prototypeLabel: string;
}) {
  return (
    <button
      onClick={onOpen}
      className="group text-left rounded-2xl bg-brand-surface border border-brand-border p-5 hover:border-brand-teal/30 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col"
    >
      <div
        className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-4`}
      >
        <Icon className={`w-5 h-5 ${iconText}`} strokeWidth={2} />
      </div>
      <h3 className="text-white font-bold text-[15px] mb-1">{title}</h3>
      <p className="text-neutral-400 text-xs leading-relaxed flex-1">{desc}</p>
      <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600 bg-white/5 px-2 py-0.5 rounded-full">
          {prototypeLabel}
        </span>
        <span className="flex items-center gap-1 text-brand-teal text-xs font-semibold">
          {openLabel}
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );
}

export default function ToolsPage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();

  const grid = (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
      {tools.map((tool) => (
        <ToolCard
          key={tool.href}
          title={t(tool.titleKey)}
          desc={t(tool.descKey)}
          icon={tool.icon}
          iconText={tool.iconText}
          iconBg={tool.iconBg}
          onOpen={() => router.push(tool.href)}
          openLabel={t("tools.hub.open")}
          prototypeLabel={t("tools.prototype")}
        />
      ))}
    </div>
  );

  /* ---- Mobile ---- */
  if (isMobile) {
    return (
      <MobileShell>
        <div className="px-4 pt-1 pb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              aria-label="Back to home"
              className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight flex items-center gap-2">
                <Wrench className="w-4 h-4 text-brand-teal" strokeWidth={2.5} />
                {t("nav.tools")}
              </h1>
              <p className="text-[#9CA3AF] text-xs">{t("tools.hub.subtitle")}</p>
            </div>
          </div>

          <div className="mt-5">{grid}</div>

          <p className="mt-6 text-center text-[11px] text-neutral-600">
            Prototype tools — everything runs on this device.
          </p>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 lg:py-4 flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              aria-label="Back to home"
              className="text-neutral-400 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg lg:text-xl font-bold flex items-center gap-2">
                <Wrench className="w-4 h-4 text-brand-teal" strokeWidth={2.5} />
                {t("nav.tools")}
              </h1>
              <p className="text-neutral-500 text-xs">{t("tools.hub.subtitle")}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">{grid}</div>
      </div>

      <RightSidebar isOpen={isRightSidebarOpen} onToggle={toggleRightSidebar} />
    </div>
  );
}