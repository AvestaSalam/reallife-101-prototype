"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  AlarmClock,
  Bell,
  Check,
  ChevronRight,
  Crown,
  Flame,
  HelpCircle,
  Info,
  Lock,
  LogOut,
  Mail,
  Pencil,
  PlayCircle,
  Shield,
  Star,
  Trash2,
  User,
  WifiOff,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useToast } from "@/components/Toast";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import type { SubscriptionPlan } from "@/context/SubscriptionContext";
import { useChallenges } from "@/context/ChallengesContext";
import { useRightSidebar } from "@/context/SidebarContext";
import { LOCALES, localeTag } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/translations";

/* ================================================================== */
/* Constants                                                           */
/* ================================================================== */

const PROFILE_KEY = "reallife101.profile";
const SETTINGS_KEY = "reallife101.settings";

/** Same avatar as the mobile header, at a higher resolution. */
const AVATAR_URL =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&auto=format";

const MEMBER_SINCE = "2025-03-14";

/** Level / XP shown in the hero (mirrors the desktop ProfileWidget). */
const LEVEL = 4;
const NEXT_LEVEL = 5;
const XP_CURRENT = 120;
const XP_TOTAL = 200;

const MONTHLY_PRICE = "$9.99";
const YEARLY_PRICE = "$59.99";

interface UserProfile {
  name: string;
  email: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "Maya Chen",
  email: "maya.chen@example.com",
};

interface LearningSettings {
  autoplay: boolean;
  notifications: boolean;
  offline: boolean;
  reminder: boolean;
}

const DEFAULT_SETTINGS: LearningSettings = {
  autoplay: true,
  notifications: true,
  offline: false,
  reminder: true,
};

function persistJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* no-op */
  }
}

/* ================================================================== */
/* Small UI primitives                                                 */
/* ================================================================== */

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${
        on ? "bg-brand-teal" : "bg-brand-border"
      }`}
    >
      <span
        className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
          on ? "left-[21px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-brand-surface border border-brand-border overflow-hidden">
      <p className="px-4 pt-4 pb-2 text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
        {title}
      </p>
      <div className="flex flex-col">{children}</div>
    </section>
  );
}

function SettingRow({
  icon: Icon,
  iconBg,
  title,
  desc,
  onClick,
  right,
  danger = false,
}: {
  icon: LucideIcon;
  iconBg: string;
  title: string;
  desc?: string;
  onClick?: () => void;
  right?: React.ReactNode;
  danger?: boolean;
}) {
  const inner = (
    <>
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
      >
        <Icon
          className={`w-[18px] h-[18px] ${danger ? "text-brand-rust" : "text-brand-teal"}`}
          strokeWidth={2}
        />
      </div>
      <span className="flex-1 min-w-0">
        <span
          className={`block text-sm font-semibold ${danger ? "text-brand-rust" : "text-white"}`}
        >
          {title}
        </span>
        {desc && (
          <span className="block text-xs text-neutral-500 mt-0.5">{desc}</span>
        )}
      </span>
      {right ?? null}
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-white/5 transition-colors cursor-pointer border-t border-brand-border"
      >
        {inner}
      </button>
    );
  }
  return (
    <div className="w-full flex items-center gap-3 px-4 py-3.5 border-t border-brand-border">
      {inner}
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  iconText,
  iconBg,
}: {
  icon: LucideIcon;
  value: number;
  label: string;
  iconText: string;
  iconBg: string;
}) {
  return (
    <div className="rounded-2xl bg-brand-surface border border-brand-border p-3.5 text-center">
      <div
        className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center mx-auto mb-1.5`}
      >
        <Icon className={`w-4 h-4 ${iconText}`} strokeWidth={2} />
      </div>
      <p className="text-white font-bold text-base leading-none">{value}</p>
      <p className="text-[10px] text-neutral-500 mt-1">{label}</p>
    </div>
  );
}

/** Bottom sheet on mobile, centered dialog on desktop. */
function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full sm:max-w-md bg-brand-surface border-t sm:border border-brand-border rounded-t-2xl sm:rounded-2xl p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pb-5 max-h-[90dvh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg leading-tight pr-3">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-neutral-400 hover:text-white transition-colors shrink-0"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Profile page                                                        */
/* ================================================================== */

export default function ProfilePage() {
  const router = useRouter();
  const notify = useToast();
  const isMobile = useIsMobile();
  const { t, locale, setLocale } = useLanguage();
  const { subscription, isPremium, subscribe, cancel } = useSubscription();
  const { stats } = useChallenges();
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();

  // Account identity (persisted) — hydrated on mount like the other contexts.
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [settings, setSettings] = useState<LearningSettings>(DEFAULT_SETTINGS);

  // Modals
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState(DEFAULT_PROFILE.name);
  const [editEmail, setEditEmail] = useState(DEFAULT_PROFILE.email);
  const [premiumOpen, setPremiumOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>("yearly");

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(PROFILE_KEY);
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile) as Partial<UserProfile>;
        setProfile((prev) => ({ ...prev, ...parsed }));
      }
      const storedSettings = localStorage.getItem(SETTINGS_KEY);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings) as Partial<LearningSettings>;
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      /* localStorage unavailable — keep defaults */
    }
  }, []);

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(localeTag(locale), {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  /* ---- Handlers ---- */

  const openEdit = () => {
    setEditName(profile.name);
    setEditEmail(profile.email);
    setEditOpen(true);
  };

  const handleSaveProfile = () => {
    const next = {
      name: editName.trim() || profile.name,
      email: editEmail.trim() || profile.email,
    };
    setProfile(next);
    persistJSON(PROFILE_KEY, next);
    setEditOpen(false);
    notify(t("edit.saved"), "success");
  };

  const handleLanguageChange = (l: (typeof LOCALES)[number]) => {
    setLocale(l.code as Locale);
    notify(t("language.changed", { language: l.native }), "success");
  };

  const toggleSetting = (key: keyof LearningSettings) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      persistJSON(SETTINGS_KEY, next);
      return next;
    });
  };

  const handleSubscribe = () => {
    subscribe(selectedPlan);
    setPremiumOpen(false);
    notify(t("premium.success"), "premium");
  };

  const handleCancelSubscription = () => {
    cancel();
    setManageOpen(false);
    notify(t("premium.cancelled"), "info");
  };

  const prototypeAction = (title: string) =>
    notify(`${title} — ${t("common.comingSoon")}`, "info");

  /* ---- Shared sections (rendered by both the mobile & desktop layouts) ---- */

  const profileHero = (
    <div className="rounded-2xl bg-brand-surface border border-brand-border p-5">
      <div className="flex items-center gap-4">
        <img
          src={AVATAR_URL}
          alt={profile.name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-brand-teal/40 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-white font-bold text-lg leading-tight truncate">
              {profile.name}
            </p>
            {isPremium && (
              <span className="inline-flex items-center gap-1 bg-brand-gold/15 text-brand-gold text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded-full shrink-0">
                <Crown className="w-2.5 h-2.5" fill="#F4B942" strokeWidth={2} />
                {t("premium.badge")}
              </span>
            )}
          </div>
          <p className="text-neutral-500 text-xs truncate">{profile.email}</p>
          <p className="text-neutral-500 text-xs mt-0.5">
            {t("profile.memberSince", { date: fmtDate(MEMBER_SINCE) })}
          </p>
        </div>
        <button
          onClick={openEdit}
          aria-label={t("profile.editProfile")}
          className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-white transition-colors shrink-0"
        >
          <Pencil className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-brand-border">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="w-4 h-4 text-brand-gold" fill="#F4B942" strokeWidth={2} />
          <p className="text-white font-bold text-sm">
            {t("profile.level", { level: LEVEL })}
          </p>
          <span className="text-neutral-500 text-xs">· {t("profile.rank")}</span>
        </div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-neutral-400">
            {t("profile.xpProgress", { level: NEXT_LEVEL })}
          </span>
          <span className="text-[11px] text-brand-teal font-semibold">
            {t("profile.xp", { current: XP_CURRENT, total: XP_TOTAL })}
          </span>
        </div>
        <div className="w-full h-2 bg-brand-border rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-teal rounded-full"
            style={{ width: `${(XP_CURRENT / XP_TOTAL) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );

  const statsRow = (
    <div className="grid grid-cols-3 gap-3">
      <StatCard
        icon={Star}
        value={stats.totalPoints}
        label={t("profile.stats.points")}
        iconText="text-brand-gold"
        iconBg="bg-brand-gold/10"
      />
      <StatCard
        icon={Flame}
        value={stats.streak}
        label={t("profile.stats.streak")}
        iconText="text-orange-400"
        iconBg="bg-orange-400/10"
      />
      <StatCard
        icon={Check}
        value={stats.completedCourses.length}
        label={t("profile.stats.completed")}
        iconText="text-brand-teal"
        iconBg="bg-brand-teal/10"
      />
    </div>
  );

  const premiumCard = isPremium && subscription ? (
    <div className="rounded-2xl bg-gradient-to-b from-[#2a2410] to-[#1a1608] border border-brand-gold/25 p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0">
          <Crown className="w-5 h-5 text-brand-gold" fill="#F4B942" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-white font-bold">{t("premium.member")}</p>
            <span className="bg-brand-gold/15 text-brand-gold text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded-full">
              {subscription.plan === "monthly"
                ? t("premium.monthly")
                : t("premium.yearly")}
            </span>
          </div>
          <p className="text-neutral-400 text-xs mt-1">
            {subscription.trial
              ? t("premium.trialEnds", { date: fmtDate(subscription.renewsAt) })
              : t("premium.renews", { date: fmtDate(subscription.renewsAt) })}
          </p>
        </div>
      </div>
      <button
        onClick={() => setManageOpen(true)}
        className="mt-4 w-full bg-brand-gold hover:bg-brand-gold/90 text-black text-sm font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
      >
        {t("premium.manage")}
      </button>
    </div>
  ) : (
    <div className="rounded-2xl bg-gradient-to-b from-[#1a2a2a] to-[#0f1f1f] border border-brand-teal/20 p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-teal/15 flex items-center justify-center shrink-0">
          <Crown className="w-5 h-5 text-brand-teal" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold">{t("premium.free.title")}</p>
          <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">
            {t("premium.free.subtitle")}
          </p>
        </div>
      </div>
      <button
        onClick={() => setPremiumOpen(true)}
        className="mt-4 w-full bg-brand-teal hover:bg-brand-teal/90 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
      >
        {t("premium.free.cta")}
      </button>
    </div>
  );

  /* Language — the switch is live app-wide via LanguageContext. */
  const languageSection = (
    <SectionCard title={t("language.title")}>
      <p className="px-4 pb-2.5 -mt-1 text-[11px] text-neutral-500">
        {t("language.hint")}
      </p>
      {LOCALES.map((l) => {
        const active = locale === l.code;
        return (
          <button
            key={l.code}
            onClick={() => handleLanguageChange(l)}
            aria-pressed={active}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer border-t border-brand-border ${
              active ? "bg-brand-teal/5" : "hover:bg-white/5"
            }`}
          >
            <span
              aria-hidden
              className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-lg shrink-0"
            >
              {l.flag}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-semibold text-white">
                {l.native}
              </span>
              <span className="block text-xs text-neutral-500">{l.english}</span>
            </span>
            {active && <Check className="w-4 h-4 text-brand-teal" strokeWidth={3} />}
          </button>
        );
      })}
    </SectionCard>
  );

  const preferencesSection = (
    <SectionCard title={t("section.preferences")}>
      <SettingRow
        icon={PlayCircle}
        iconBg="bg-brand-teal/10"
        title={t("settings.autoplay")}
        desc={t("settings.autoplayDesc")}
        right={
          <Toggle
            on={settings.autoplay}
            onChange={() => toggleSetting("autoplay")}
            label={t("settings.autoplay")}
          />
        }
      />
      <SettingRow
        icon={Bell}
        iconBg="bg-brand-gold/10"
        title={t("settings.notifications")}
        desc={t("settings.notificationsDesc")}
        right={
          <Toggle
            on={settings.notifications}
            onChange={() => toggleSetting("notifications")}
            label={t("settings.notifications")}
          />
        }
      />
      <SettingRow
        icon={WifiOff}
        iconBg="bg-brand-rust/10"
        title={t("settings.offline")}
        desc={t("settings.offlineDesc")}
        right={
          <Toggle
            on={settings.offline}
            onChange={() => toggleSetting("offline")}
            label={t("settings.offline")}
          />
        }
      />
      <SettingRow
        icon={AlarmClock}
        iconBg="bg-brand-teal/10"
        title={t("settings.reminder")}
        desc={t("settings.reminderDesc")}
        right={
          <Toggle
            on={settings.reminder}
            onChange={() => toggleSetting("reminder")}
            label={t("settings.reminder")}
          />
        }
      />
    </SectionCard>
  );

  const accountSection = (
    <SectionCard title={t("section.account")}>
      <SettingRow
        icon={User}
        iconBg="bg-brand-teal/10"
        title={t("settings.editProfile")}
        desc={t("settings.editProfileDesc")}
        onClick={openEdit}
        right={<ChevronRight className="w-4 h-4 text-neutral-600" strokeWidth={2} />}
      />
      <SettingRow
        icon={Lock}
        iconBg="bg-brand-gold/10"
        title={t("settings.password")}
        desc={t("settings.passwordDesc")}
        onClick={() => notify(t("settings.passwordSent"), "success")}
        right={<ChevronRight className="w-4 h-4 text-neutral-600" strokeWidth={2} />}
      />
      <SettingRow
        icon={Shield}
        iconBg="bg-brand-teal/10"
        title={t("settings.privacy")}
        desc={t("settings.privacyDesc")}
        onClick={() => prototypeAction(t("settings.privacy"))}
        right={<ChevronRight className="w-4 h-4 text-neutral-600" strokeWidth={2} />}
      />
      <SettingRow
        icon={LogOut}
        iconBg="bg-brand-rust/10"
        title={t("settings.signOut")}
        danger
        onClick={() => notify(t("settings.signOutMsg"), "success")}
      />
      <SettingRow
        icon={Trash2}
        iconBg="bg-brand-rust/10"
        title={t("settings.delete")}
        desc={t("settings.deleteDesc")}
        danger
        onClick={() => notify(t("settings.deleteMsg"), "info")}
      />
    </SectionCard>
  );

  const supportSection = (
    <SectionCard title={t("section.support")}>
      <SettingRow
        icon={HelpCircle}
        iconBg="bg-brand-teal/10"
        title={t("settings.help")}
        desc={t("settings.helpDesc")}
        onClick={() => prototypeAction(t("settings.help"))}
        right={<ChevronRight className="w-4 h-4 text-neutral-600" strokeWidth={2} />}
      />
      <SettingRow
        icon={Mail}
        iconBg="bg-brand-gold/10"
        title={t("settings.contact")}
        desc={t("settings.contactDesc")}
        onClick={() => prototypeAction(t("settings.contact"))}
        right={<ChevronRight className="w-4 h-4 text-neutral-600" strokeWidth={2} />}
      />
      <SettingRow
        icon={Star}
        iconBg="bg-brand-teal/10"
        title={t("settings.rate")}
        desc={t("settings.rateDesc")}
        onClick={() => prototypeAction(t("settings.rate"))}
        right={<ChevronRight className="w-4 h-4 text-neutral-600" strokeWidth={2} />}
      />
      <SettingRow
        icon={Info}
        iconBg="bg-brand-rust/10"
        title={t("settings.about")}
        desc={t("settings.aboutDesc")}
        onClick={() => notify(t("settings.aboutDesc"), "info")}
        right={<ChevronRight className="w-4 h-4 text-neutral-600" strokeWidth={2} />}
      />
    </SectionCard>
  );

  /* ---- Modals ---- */

  const editModal = editOpen ? (
    <ModalShell title={t("edit.title")} onClose={() => setEditOpen(false)}>
      <label className="block mb-3">
        <span className="text-xs font-medium text-neutral-400">
          {t("edit.name")}
        </span>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="mt-1.5 w-full bg-brand-bg border border-brand-border rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-teal/60 transition-colors"
        />
      </label>
      <label className="block mb-4">
        <span className="text-xs font-medium text-neutral-400">
          {t("edit.email")}
        </span>
        <input
          type="email"
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
          className="mt-1.5 w-full bg-brand-bg border border-brand-border rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-teal/60 transition-colors"
        />
      </label>
      <div className="flex gap-2">
        <button
          onClick={() => setEditOpen(false)}
          className="flex-1 py-2.5 rounded-xl border border-brand-border text-neutral-300 text-sm font-semibold hover:bg-white/5 transition-colors cursor-pointer"
        >
          {t("common.cancel")}
        </button>
        <button
          onClick={handleSaveProfile}
          className="flex-1 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal/90 text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          {t("edit.save")}
        </button>
      </div>
    </ModalShell>
  ) : null;

  const premiumModal = premiumOpen ? (
    <ModalShell
      title={t("premium.modal.title")}
      onClose={() => setPremiumOpen(false)}
    >
      <p className="text-neutral-400 text-sm -mt-2 mb-4">
        {t("premium.modal.subtitle")}
      </p>

      {/* Plan picker */}
      <div className="grid grid-cols-2 gap-3">
        {(["monthly", "yearly"] as SubscriptionPlan[]).map((p) => {
          const selected = selectedPlan === p;
          return (
            <button
              key={p}
              onClick={() => setSelectedPlan(p)}
              aria-pressed={selected}
              className={`relative rounded-xl border p-3 text-left transition-colors cursor-pointer ${
                selected
                  ? "border-brand-teal bg-brand-teal/10"
                  : "border-brand-border bg-brand-bg hover:border-neutral-600"
              }`}
            >
              {p === "yearly" && (
                <span className="absolute -top-2.5 right-2 bg-brand-gold text-black text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  {t("premium.bestValue")}
                </span>
              )}
              <p className="text-xs font-medium text-neutral-400">
                {p === "monthly" ? t("premium.monthly") : t("premium.yearly")}
              </p>
              <p className="mt-1 text-white font-extrabold text-lg">
                {p === "monthly" ? MONTHLY_PRICE : YEARLY_PRICE}
                <span className="text-[11px] font-medium text-neutral-500 ml-1">
                  {p === "monthly" ? t("premium.perMonth") : t("premium.perYear")}
                </span>
              </p>
            </button>
          );
        })}
      </div>

      {/* Feature list */}
      <ul className="mt-5 flex flex-col gap-2.5">
        {(
          [
            "premium.feature1",
            "premium.feature2",
            "premium.feature3",
            "premium.feature4",
            "premium.feature5",
          ] as const
        ).map((key) => (
          <li
            key={key}
            className="flex items-start gap-2.5 text-sm text-neutral-300"
          >
            <Check
              className="w-4 h-4 text-brand-teal shrink-0 mt-0.5"
              strokeWidth={2.5}
            />
            {t(key)}
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        className="mt-5 w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
      >
        {t("premium.cta")}
      </button>
      <p className="mt-2 text-center text-[11px] text-neutral-500">
        {t("premium.ctaNote", {
          price: selectedPlan === "monthly" ? MONTHLY_PRICE : YEARLY_PRICE,
        })}
      </p>
    </ModalShell>
  ) : null;

  const manageModal = manageOpen && subscription ? (
    <ModalShell title={t("premium.manage")} onClose={() => setManageOpen(false)}>
      <div className="rounded-xl bg-brand-bg border border-brand-border p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Crown className="w-4 h-4 text-brand-gold" fill="#F4B942" strokeWidth={2} />
          <p className="text-white font-bold text-sm">
            {t("premium.modal.title")}
            {" · "}
            {subscription.plan === "monthly"
              ? t("premium.monthly")
              : t("premium.yearly")}
          </p>
        </div>
        <p className="text-neutral-400 text-xs mt-1.5">
          {subscription.trial
            ? t("premium.trialEnds", { date: fmtDate(subscription.renewsAt) })
            : t("premium.renews", { date: fmtDate(subscription.renewsAt) })}
        </p>
        <p className="text-neutral-500 text-xs mt-1">
          {t("premium.currentPlan")}
        </p>
      </div>
      <p className="mt-3 text-xs text-neutral-500">{t("premium.cancelNote")}</p>
      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={() => setManageOpen(false)}
          className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          {t("premium.cancelConfirm")}
        </button>
        <button
          onClick={handleCancelSubscription}
          className="w-full border border-brand-rust/40 text-brand-rust hover:bg-brand-rust/10 font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          {t("premium.cancel")}
        </button>
      </div>
    </ModalShell>
  ) : null;

  /* ---- Mobile ---- */
  if (isMobile) {
    return (
      <MobileShell>
        <div className="px-4 pt-1 pb-8">
          {/* Page header */}
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => router.push("/")}
              aria-label={t("profile.backHome")}
              className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">
                {t("profile.title")}
              </h1>
              <p className="text-[#9CA3AF] text-xs">{t("profile.subtitle")}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {profileHero}
            {statsRow}
            {premiumCard}
            {languageSection}
            {preferencesSection}
            {accountSection}
            {supportSection}
          </div>

          <p className="mt-6 text-center text-[11px] text-neutral-600">
            {t("common.version")} 1.0.0
          </p>
        </div>

        {editModal}
        {premiumModal}
        {manageModal}
      </MobileShell>
    );
  }

  /* ---- Desktop ---- */
  return (
    <div className="flex h-screen bg-brand-bg text-white overflow-hidden">
      <LeftSidebar />

      <div className="flex-1 min-w-0 h-screen overflow-y-auto smooth-scroll bg-brand-bg">
        <div className="sticky top-0 z-20 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 lg:py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/")}
                aria-label={t("profile.backHome")}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg lg:text-xl font-bold">
                {t("profile.title")}
              </h1>
            </div>
            <span className="text-neutral-500 text-sm hidden sm:block">
              {t("profile.subtitle")}
            </span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">
          {profileHero}
          {statsRow}
          {premiumCard}
          {languageSection}
          {preferencesSection}
          {accountSection}
          {supportSection}
          <p className="text-center text-[11px] text-neutral-600">
            {t("common.version")} 1.0.0
          </p>
        </div>
      </div>

      <RightSidebar isOpen={isRightSidebarOpen} onToggle={toggleRightSidebar} />

      {editModal}
      {premiumModal}
      {manageModal}
    </div>
  );
}