"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bell, X } from "lucide-react";
import { useToast } from "@/components/Toast";
import { useLanguage } from "@/context/LanguageContext";

interface MobileHeaderProps {
  search: string;
  onSearch: (value: string) => void;
  /** Called when the user taps their avatar (navigates to the profile page). */
  onProfile?: () => void;
}

const notifications: { id: number; text: string; time: string }[] = [
  { id: 1, text: "🔥 You kept your streak alive!", time: "2m" },
  { id: 2, text: "New lesson unlocked in Personal Finance 101", time: "1h" },
  { id: 3, text: "Sarah liked your progress update", time: "3h" },
];

export default function MobileHeader({
  search,
  onSearch,
  onProfile,
}: MobileHeaderProps) {
  const notify = useToast();
  const { t } = useLanguage();
  const [bellOpen, setBellOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  // Close the notification popup when clicking anywhere outside it.
  useEffect(() => {
    if (!bellOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [bellOpen]);

  return (
    <div className="sticky top-0 z-40 bg-[#0B0E11]">
      {/* App bar — pt-4 keeps clear space below the device's real status bar */}
      <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-4">
        {searchOpen ? (
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
                strokeWidth={2}
              />
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder={t("header.search")}
                className="w-full bg-[#1E232A] border border-[#2E2E2E] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#7CE1D4]/50 transition-colors"
              />
            </div>
            <button
              onClick={() => {
                setSearchOpen(false);
                onSearch("");
              }}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-white">Reallife</span>
              <span className="text-[#7CE1D4]">101</span>
            </h1>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 rounded-xl bg-[#1E232A] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={2} />
              </button>

              <div ref={bellRef} className="relative">
                <button
                  onClick={() => {
                    setBellOpen(!bellOpen);
                    if (bellOpen) setUnread(false);
                  }}
                  className="relative w-10 h-10 rounded-xl bg-[#1E232A] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" strokeWidth={2} />
                  {unread && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full" />
                  )}
                </button>

                {/* Notification dropdown */}
                {bellOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-72 rounded-2xl bg-[#1E232A] border border-[#2E2E2E] shadow-2xl shadow-black/60 z-50">
                    <div className="flex items-center justify-between px-3.5 py-2.5">
                      <p className="text-white font-bold text-sm">{t("header.notifications")}</p>
                      <button
                        onClick={() => setUnread(false)}
                        className="text-xs text-[#7CE1D4] font-medium hover:opacity-80"
                      >
                        {t("header.markAllRead")}
                      </button>
                    </div>
                    <div className="border-t border-[#2E2E2E]" />
                    <div className="flex flex-col gap-0.5 py-1">
                      {notifications.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => notify(n.text, "info")}
                          className="flex items-center gap-2.5 w-full px-3 py-2 text-left hover:bg-white/5 text-xs transition-colors"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              unread ? "bg-[#7CE1D4]" : "border border-[#2E2E2E]"
                            }`}
                          />
                          <span className="text-neutral-300 flex-1 leading-snug">{n.text}</span>
                          <span className="text-neutral-600 text-[10px]">{n.time}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => onProfile?.()}
                className="relative w-10 h-10 rounded-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CE1D4]/60"
                aria-label={t("header.openProfile")}
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&auto=format"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#7CE1D4]/30"
                />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
