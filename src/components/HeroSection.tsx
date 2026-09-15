"use client";

import { PlayCircle } from "lucide-react";
import { useToast } from "@/components/Toast";

export default function HeroSection() {
  const notify = useToast();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden h-[240px] sm:h-[270px] group cursor-pointer">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=500&fit=crop&auto=format&q=80"
        alt="Hiker on mountain peak with red flag"
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Floating top-right badge */}
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-xs font-medium text-neutral-300">
        🔥 Trending this week
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-7">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-teal mb-2">
          Welcome Back,
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mb-2">
          Level up your real life.
        </h1>
        <p className="text-neutral-300 text-sm font-medium mb-5">
          Practical skills. Real progress. A better you.
        </p>
        <button
          onClick={() => notify("Resuming Personal Finance 101 — 68% complete", "success")}
          className="inline-flex items-center gap-2 self-start bg-brand-rust hover:bg-brand-rust-hover text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-150 shadow-lg shadow-brand-rust/30 cursor-pointer"
        >
          <PlayCircle className="w-4 h-4" strokeWidth={2.5} />
          Continue Learning →
        </button>
      </div>
    </div>
  );
}
