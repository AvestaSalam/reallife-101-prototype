"use client";

import { Play } from "lucide-react";
import { useToast } from "@/components/Toast";

export default function MobileHero() {
  const notify = useToast();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden h-[200px] group cursor-pointer">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=400&fit=crop&auto=format&q=80"
        alt="Hiker on mountain peak with red flag"
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Floating badge */}
      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1 text-[10px] font-medium text-neutral-300">
        🔥 Trending
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-5">
        <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#7CE1D4] mb-1.5">
          Welcome Back
        </p>
        <h2 className="text-[22px] font-extrabold text-white leading-tight tracking-tight mb-1.5">
          Level up your real life.
        </h2>
        <p className="text-[12px] text-neutral-300 font-medium mb-4">
          Practical skills. Real progress. You&apos;ve got this.
        </p>
        <button
          onClick={() =>
            notify("Resuming Personal Finance 101 — 68% complete", "success")
          }
          className="inline-flex items-center justify-center gap-2 self-start bg-[#7CE1D4] hover:bg-[#61D5C7] text-black text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer"
        >
          <Play className="w-4 h-4" fill="black" strokeWidth={0} />
          Continue Learning ▶
        </button>
      </div>
    </div>
  );
}
