"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const STORAGE_KEY = "right-sidebar-open";

interface SidebarContextValue {
  isRightSidebarOpen: boolean;
  toggleRightSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  isRightSidebarOpen: true,
  toggleRightSidebar: () => {},
});

/**
 * Shared right-sidebar collapse state. Persisted to localStorage so the
 * sidebar stays open/closed consistently across every page (dashboard,
 * courses, course detail) and across sessions.
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  // Hydrate from localStorage once on first mount (client-only).
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) setIsOpen(stored === "1");
    } catch {
      /* localStorage unavailable — keep default */
    }
  }, []);

  // Persist every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, isOpen ? "1" : "0");
    } catch {
      /* no-op */
    }
  }, [isOpen]);

  return (
    <SidebarContext.Provider
      value={{
        isRightSidebarOpen: isOpen,
        toggleRightSidebar: () => setIsOpen(!isOpen),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useRightSidebar() {
  return useContext(SidebarContext);
}