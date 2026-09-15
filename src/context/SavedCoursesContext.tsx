"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const STORAGE_KEY = "saved-courses";

/** Course IDs that are saved by default on first visit. */
const DEFAULT_SAVED = ["investing", "dream-job", "mindful"];

interface SavedCoursesContextValue {
  savedIds: Set<string>;
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  savedCount: number;
}

const SavedCoursesContext = createContext<SavedCoursesContextValue>({
  savedIds: new Set(),
  isSaved: () => false,
  toggleSaved: () => {},
  savedCount: 0,
});

export function SavedCoursesProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set(DEFAULT_SAVED));

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        if (Array.isArray(parsed)) {
          setSavedIds(new Set(parsed));
        }
      }
    } catch {
      /* localStorage unavailable — keep defaults */
    }
  }, []);

  // Persist every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(savedIds)));
    } catch {
      /* no-op */
    }
  }, [savedIds]);

  const isSaved = (id: string) => savedIds.has(id);

  const toggleSaved = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <SavedCoursesContext.Provider
      value={{ savedIds, isSaved, toggleSaved, savedCount: savedIds.size }}
    >
      {children}
    </SavedCoursesContext.Provider>
  );
}

export function useSavedCourses() {
  return useContext(SavedCoursesContext);
}