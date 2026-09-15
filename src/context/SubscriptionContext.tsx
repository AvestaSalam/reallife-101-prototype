"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "reallife101.subscription";

export type SubscriptionPlan = "monthly" | "yearly";

export interface SubscriptionInfo {
  plan: SubscriptionPlan;
  /** ISO date the subscription started. */
  startedAt: string;
  /** ISO date the free trial ends / the plan renews. */
  renewsAt: string;
  /** True while the 7-day free trial is running. */
  trial: boolean;
}

interface SubscriptionContextValue {
  subscription: SubscriptionInfo | null;
  isPremium: boolean;
  /** "Buy" a plan — starts a 7-day free trial (prototype: no real payment). */
  subscribe: (plan: SubscriptionPlan) => void;
  /** Cancel the current subscription (back to the free plan). */
  cancel: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue>({
  subscription: null,
  isPremium: false,
  subscribe: () => {},
  cancel: () => {},
});

/** Trial length in days (the CTA is "Start 7-day free trial"). */
const TRIAL_DAYS = 7;

function trialEndDate(from: Date): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + TRIAL_DAYS);
  return d;
}

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SubscriptionInfo | null;
        if (
          parsed &&
          (parsed.plan === "monthly" || parsed.plan === "yearly") &&
          typeof parsed.renewsAt === "string"
        ) {
          setSubscription(parsed);
        }
      }
    } catch {
      /* localStorage unavailable — keep free plan */
    }
  }, []);

  // Persist every change.
  useEffect(() => {
    try {
      if (subscription) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* no-op */
    }
  }, [subscription]);

  const subscribe = useCallback((plan: SubscriptionPlan) => {
    const now = new Date();
    setSubscription({
      plan,
      startedAt: now.toISOString(),
      renewsAt: trialEndDate(now).toISOString(),
      trial: true,
    });
  }, []);

  const cancel = useCallback(() => {
    setSubscription(null);
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{ subscription, isPremium: subscription !== null, subscribe, cancel }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
