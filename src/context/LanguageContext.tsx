"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  translate,
  type Locale,
  type TranslationKey,
} from "@/lib/i18n/translations";

const STORAGE_KEY = "reallife101.locale";

const VALID_LOCALES: Locale[] = ["en", "es", "fr", "zh"];

interface LanguageContextValue {
  /** Currently active UI language (defaults to English until hydrated). */
  locale: Locale;
  /** Switch the app language and persist the choice. */
  setLocale: (locale: Locale) => void;
  /** Translate a key in the active language, with optional {var} interpolation. */
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (key, vars) => translate("en", key, vars),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Hydrate the saved language once on mount (matches the pattern used by
  // SavedCoursesContext / ChallengesContext — SSR renders English first).
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && (VALID_LOCALES as string[]).includes(stored)) {
        setLocaleState(stored as Locale);
      }
    } catch {
      /* localStorage unavailable — keep English */
    }
  }, []);

  // Keep the document language attribute in sync (a11y, spellcheck, fonts).
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* no-op */
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) =>
      translate(locale, key, vars),
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
