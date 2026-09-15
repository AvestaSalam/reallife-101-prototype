"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CarFront,
  Clapperboard,
  HeartPulse,
  Home,
  Lightbulb,
  PiggyBank,
  Plug,
  RotateCcw,
  ShoppingBag,
  TrendingDown,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useToast } from "@/components/Toast";
import { useRightSidebar } from "@/context/SidebarContext";

const STORAGE_KEY = "reallife101.budget";
const DEFAULT_INCOME = 3200;

interface Category {
  key: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

const CATEGORIES: Category[] = [
  { key: "housing", label: "Housing", icon: Home, color: "#469E99" },
  { key: "food", label: "Food", icon: UtensilsCrossed, color: "#F97316" },
  { key: "transport", label: "Transport", icon: CarFront, color: "#60A5FA" },
  { key: "utilities", label: "Utilities", icon: Plug, color: "#F4B942" },
  { key: "health", label: "Health", icon: HeartPulse, color: "#F87171" },
  { key: "entertainment", label: "Fun", icon: Clapperboard, color: "#C084FC" },
  { key: "shopping", label: "Shopping", icon: ShoppingBag, color: "#FB7185" },
  { key: "savings", label: "Savings", icon: PiggyBank, color: "#34D399" },
];

const DEFAULT_EXPENSES: Record<string, number> = {
  housing: 1100,
  food: 450,
  transport: 220,
  utilities: 160,
  health: 120,
  entertainment: 150,
  shopping: 200,
  savings: 500,
};

/** 50/30/20 rule groups: needs / wants (savings is its own category). */
const NEEDS_KEYS = ["housing", "food", "transport", "utilities", "health"];
const WANTS_KEYS = ["entertainment", "shopping"];

function fmt(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function clampPct(n: number): number {
  return Math.max(0, Math.min(100, n));
}

/* ================================================================== */
/* Budget Planner page                                                 */
/* ================================================================== */

function StatMini({
  icon: Icon,
  value,
  label,
  iconText,
  iconBg,
}: {
  icon: LucideIcon;
  value: string;
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
      <p className="text-white font-bold text-sm leading-none">{value}</p>
      <p className="text-[10px] text-neutral-500 mt-1">{label}</p>
    </div>
  );
}

export default function BudgetPlannerPage() {
  const router = useRouter();
  const notify = useToast();
  const isMobile = useIsMobile();
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();

  const [income, setIncome] = useState(DEFAULT_INCOME);
  const [expenses, setExpenses] = useState<Record<string, number>>(DEFAULT_EXPENSES);

  // Hydrate the saved budget once on mount.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as {
          income?: number;
          expenses?: Record<string, number>;
        };
        if (typeof parsed.income === "number") setIncome(parsed.income);
        if (parsed.expenses && typeof parsed.expenses === "object") {
          setExpenses({ ...DEFAULT_EXPENSES, ...parsed.expenses });
        }
      }
    } catch {
      /* localStorage unavailable — keep sample numbers */
    }
  }, []);

  // Persist every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ income, expenses }));
    } catch {
      /* no-op */
    }
  }, [income, expenses]);

  /* ---- Derived numbers ---- */
  const totalSpent = CATEGORIES.reduce((a, c) => a + (expenses[c.key] || 0), 0);
  const left = income - totalSpent;
  const pctSpent = income > 0 ? Math.round((totalSpent / income) * 100) : 0;
  const sumGroup = (keys: string[]) =>
    keys.reduce((a, k) => a + (expenses[k] || 0), 0);
  const needs = sumGroup(NEEDS_KEYS);
  const wants = sumGroup(WANTS_KEYS);
  const savings = expenses.savings || 0;
  const pctOfIncome = (v: number) => (income > 0 ? (v / income) * 100 : 0);

  // Donut segments (conic-gradient stops) built from the category colors.
  let acc = 0;
  const stops = CATEGORIES.map((c) => ({ color: c.color, value: expenses[c.key] || 0 }))
    .filter((s) => s.value > 0)
    .map((s) => {
      const start = (acc / totalSpent) * 100;
      acc += s.value;
      const end = (acc / totalSpent) * 100;
      return `${s.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
    });
  const donutCss =
    totalSpent > 0
      ? `conic-gradient(${stops.join(", ")})`
      : "conic-gradient(#2E2E2E 0% 100%)";

  /* ---- Handlers ---- */
  const setExpense = (key: string, value: number) =>
    setExpenses((prev) => ({ ...prev, [key]: Math.max(0, value) }));

  const reset = () => {
    setIncome(DEFAULT_INCOME);
    setExpenses(DEFAULT_EXPENSES);
    notify("Budget reset to sample numbers", "info");
  };

  /* ---- Coach tip (rule-based) ---- */
  let tip = {
    icon: "text-brand-teal",
    bg: "bg-brand-teal/10",
    border: "border-brand-teal/25",
    text: "Looking healthy! Your split matches the 50/30/20 guidelines. Keep it rolling.",
  };
  if (left < 0) {
    tip = {
      icon: "text-brand-rust",
      bg: "bg-brand-rust/10",
      border: "border-brand-rust/25",
      text: `You're overspending by ${fmt(-left)}. Trim one or two categories to get back in the green.`,
    };
  } else if (pctOfIncome(needs) > 55) {
    tip = {
      icon: "text-brand-gold",
      bg: "bg-brand-gold/10",
      border: "border-brand-gold/25",
      text: `Needs take ${Math.round(pctOfIncome(needs))}% of income — the 50/30/20 rule suggests keeping them around 50%.`,
    };
  } else if (pctOfIncome(savings) < 20) {
    tip = {
      icon: "text-brand-gold",
      bg: "bg-brand-gold/10",
      border: "border-brand-gold/25",
      text: `You're saving ${Math.round(pctOfIncome(savings))}% of income — aim for 20%+ to build a cushion.`,
    };
  }

  const summaryCards = (
    <div className="grid grid-cols-3 gap-3">
      <StatMini
        icon={Wallet}
        value={fmt(income)}
        label="Income"
        iconText="text-brand-teal"
        iconBg="bg-brand-teal/10"
      />
      <StatMini
        icon={TrendingDown}
        value={fmt(totalSpent)}
        label="Spent"
        iconText="text-brand-gold"
        iconBg="bg-brand-gold/10"
      />
      <StatMini
        icon={PiggyBank}
        value={fmt(left)}
        label="Left"
        iconText={left < 0 ? "text-brand-rust" : "text-emerald-400"}
        iconBg={left < 0 ? "bg-brand-rust/10" : "bg-emerald-400/10"}
      />
    </div>
  );

  const donutCard = (
    <section className="rounded-2xl bg-brand-surface border border-brand-border p-4">
      <h2 className="text-white font-bold text-sm mb-4">Where it goes</h2>
      <div
        className="relative w-36 h-36 mx-auto rounded-full"
        style={{ background: donutCss }}
      >
        <div className="absolute inset-[14px] rounded-full bg-brand-surface flex flex-col items-center justify-center">
          <p className="text-white font-bold text-xl leading-none">{pctSpent}%</p>
          <p className="text-[10px] text-neutral-500 mt-1 text-center leading-tight px-6">
            of income spent
          </p>
        </div>
      </div>
      <p className="text-center text-[11px] text-neutral-500 mt-3">
        {fmt(totalSpent)} across {CATEGORIES.length} categories
      </p>
    </section>
  );

  const ruleCard = (
    <section className="rounded-2xl bg-brand-surface border border-brand-border p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-bold text-sm">50 / 30 / 20 rule</h2>
        <span className="text-[10px] text-neutral-500">needs · wants · savings</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden flex bg-brand-bg border border-brand-border">
        <div
          className="h-full bg-brand-teal shrink-0"
          style={{ width: `${clampPct(pctOfIncome(needs))}%` }}
        />
        <div
          className="h-full bg-brand-gold shrink-0"
          style={{ width: `${clampPct(pctOfIncome(wants))}%` }}
        />
        <div
          className="h-full bg-emerald-400 shrink-0"
          style={{ width: `${clampPct(pctOfIncome(savings))}%` }}
        />
      </div>
      <div className="mt-3 flex flex-col gap-1.5 text-xs">
        {[
          { label: "Needs", value: needs, target: 50, dot: "bg-brand-teal" },
          { label: "Wants", value: wants, target: 30, dot: "bg-brand-gold" },
          { label: "Savings", value: savings, target: 20, dot: "bg-emerald-400" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${l.dot}`} />
            <span className="text-neutral-300 flex-1">{l.label}</span>
            <span className="text-white font-semibold">
              {Math.round(pctOfIncome(l.value))}%
            </span>
            <span className="text-neutral-600">/ {l.target}% target</span>
          </div>
        ))}
      </div>
    </section>
  );

  const tipBanner = (
    <div
      className={`rounded-2xl border ${tip.border} ${tip.bg} p-4 flex items-start gap-3`}
    >
      <div className="w-8 h-8 rounded-full bg-brand-bg/60 flex items-center justify-center shrink-0">
        <Lightbulb className={`w-4 h-4 ${tip.icon}`} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-white font-bold text-xs mb-0.5">Coach tip</p>
        <p className="text-[11px] text-neutral-300 leading-relaxed">{tip.text}</p>
      </div>
    </div>
  );

  const categoriesCard = (
    <section className="rounded-2xl bg-brand-surface border border-brand-border overflow-hidden">
      <div className="px-4 pt-4 pb-3">
        <h2 className="text-white font-bold text-sm">Monthly categories</h2>
        <p className="text-[11px] text-neutral-500 mt-0.5">
          Drag the slider or type an amount
        </p>
      </div>

      {/* Income */}
      <div className="px-4 py-3.5 flex items-center gap-3 border-t border-brand-border">
        <div className="w-8 h-8 rounded-lg bg-brand-teal/10 flex items-center justify-center shrink-0">
          <Wallet className="w-4 h-4 text-brand-teal" strokeWidth={2} />
        </div>
        <span className="text-sm font-semibold text-white flex-1">Monthly income</span>
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500">
            $
          </span>
          <input
            type="number"
            min={0}
            step={50}
            value={income}
            onChange={(e) => setIncome(Math.max(0, Number(e.target.value) || 0))}
            aria-label="Monthly income"
            className="w-24 bg-brand-bg border border-brand-border rounded-lg pl-6 pr-2 py-1.5 text-sm text-white text-right focus:outline-none focus:border-brand-teal/60"
          />
        </div>
      </div>

      {/* Categories */}
      {CATEGORIES.map((c) => {
        const Icon = c.icon;
        const value = expenses[c.key] || 0;
        return (
          <div key={c.key} className="px-4 py-3 border-t border-brand-border">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${c.color}1A` }}
              >
                <Icon className="w-4 h-4" style={{ color: c.color }} strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-white flex-1">{c.label}</span>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={value}
                  onChange={(e) => setExpense(c.key, Number(e.target.value) || 0)}
                  aria-label={`${c.label} budget`}
                  className="w-24 bg-brand-bg border border-brand-border rounded-lg pl-6 pr-2 py-1.5 text-sm text-white text-right focus:outline-none focus:border-brand-teal/60"
                />
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={1500}
              step={10}
              value={value}
              onChange={(e) => setExpense(c.key, Number(e.target.value))}
              aria-label={`${c.label} slider`}
              className="w-full mt-2.5 accent-[#7CE1D4] cursor-pointer"
            />
          </div>
        );
      })}
    </section>
  );

  /* ---- Mobile ---- */
  if (isMobile) {
    return (
      <MobileShell>
        <div className="px-4 pt-1 pb-8">
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => router.push("/tools")}
              aria-label="Back to tools"
              className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <div className="flex-1">
              <h1 className="text-white font-bold text-lg leading-tight">Budget Planner</h1>
              <p className="text-[#9CA3AF] text-xs">Make every dollar count</p>
            </div>
            <button
              onClick={reset}
              aria-label="Reset budget"
              className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-brand-rust transition-colors"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {summaryCards}
            {donutCard}
            {ruleCard}
            {tipBanner}
            {categoriesCard}
          </div>

          <p className="mt-5 text-center text-[11px] text-neutral-600">
            Prototype — numbers are saved on this device.
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 lg:py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/tools")}
                aria-label="Back to tools"
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg lg:text-xl font-bold">Budget Planner</h1>
                <p className="text-neutral-500 text-xs hidden sm:block">
                  Make every dollar count
                </p>
              </div>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 bg-[#1E232A] border border-brand-border hover:border-brand-rust/40 text-neutral-300 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-[1fr_330px] gap-5 items-start">
          {categoriesCard}
          <div className="flex flex-col gap-4">
            {summaryCards}
            {donutCard}
            {ruleCard}
            {tipBanner}
          </div>
        </div>
      </div>

      <RightSidebar isOpen={isRightSidebarOpen} onToggle={toggleRightSidebar} />
    </div>
  );
}