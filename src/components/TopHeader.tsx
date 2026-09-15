"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bell, Moon, Crown, X } from "lucide-react";
import { useToast } from "@/components/Toast";

interface TopHeaderProps {
  search: string;
  onSearch: (value: string) => void;
}

const notifications: { id: number; text: string; time: string }[] = [
  { id: 1, text: "🔥 You kept your streak alive!", time: "2m" },
  { id: 2, text: "New lesson unlocked in Personal Finance 101", time: "1h" },
  { id: 3, text: "Sarah liked your progress update", time: "3h" },
];

export default function TopHeader({ search, onSearch }: TopHeaderProps) {
  const notify = useToast();
  const [bellOpen, setBellOpen] = useState(false);
  const [unread, setUnread] = useState(true);
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
    <header className="relative h-[68px] min-h-[68px] flex items-center gap-4 px-6 bg-brand-surface border-b border-brand-border">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
          strokeWidth={2}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search courses, skills, or anything..."
          className="w-full bg-brand-bg border border-brand-border rounded-full pl-10 pr-5 py-2.5 text-sm text-neutral-300 placeholder:text-neutral-600 focus:outline-none focus:border-brand-teal/40 focus:ring-1 focus:ring-brand-teal/20 transition-all duration-150"
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Bell */}
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => {
              setBellOpen(!bellOpen);
              if (bellOpen) setUnread(false);
            }}
            className={`flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-colors duration-150 ${
              bellOpen ? "bg-brand-rust text-white" : "bg-brand-card hover:bg-brand-border text-neutral-400"
            }`}
          >
            <Bell className="w-4 h-4" strokeWidth={2} />
            {/* Notification dot */}
            {unread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-brand-surface" />
            )}
          </button>

          {/* Bell dropdown */}
          {bellOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-72 rounded-2xl bg-brand-card border border-brand-border shadow-2xl shadow-black/50 z-50">
              <div className="flex items-center justify-between px-3.5 py-2.5">
                <p className="text-white font-bold text-sm">Notifications</p>
                <button
                  onClick={() => setUnread(false)}
                  className="text-xs text-brand-teal font-medium hover:text-brand-teal/80"
                >
                  Mark all read
                </button>
              </div>
              <div className="border-t border-brand-border" />
              <div className="flex flex-col gap-1.5 py-2.5">
                {notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => notify(n.text, "info")}
                    className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-left hover:bg-white/5 text-xs transition-colors"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${unread ? "bg-brand-teal" : "bg-transparent border border-brand-border"}`} />
                    <span className="text-neutral-300 flex-1 leading-snug">{n.text}</span>
                    <span className="text-neutral-600 text-[10px]">{n.time}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Moon */}
        <button
          onClick={() => notify("Dark mode is always on — embrace the night 🌙", "info")}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-card hover:bg-brand-border transition-colors duration-150 cursor-pointer"
        >
          <Moon className="w-4 h-4 text-neutral-400" strokeWidth={2} />
        </button>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-brand-border" />

        {/* Level Badge */}
        <div className="flex items-center gap-1.5 bg-brand-card border border-brand-border rounded-full px-3 py-1.5">
          <Crown className="w-3.5 h-3.5 text-brand-gold" strokeWidth={2.5} fill="#F4B942" />
          <span className="text-sm font-semibold text-white">Level 4</span>
        </div>

        {/* Avatar */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&auto=format"
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-rust/40"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-brand-surface" />
        </div>
      </div>
    </header>
  );
}
