"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  BookOpen,
  FileText,
  Download,
  Sparkles,
  Lock,
  ArrowLeft,
  Clock,
  Grid3X3,
  List,
  ExternalLink,
  TrendingUp,
  Wallet,
  Briefcase,
  Zap,
  Heart,
  Code,
  Home,
  Calendar,
  Brain,
  CheckSquare,
  Shield,
  CreditCard,
  Mic,
  Users,
  Moon,
  Bot,
  Lock as LockIcon,
  ChefHat,
  HeartPulse,
  Utensils,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { resources, resourceCategories, type Resource } from "@/data/resources";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import MobileShell from "@/components/MobileShell";
import { useRightSidebar } from "@/context/SidebarContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useToast } from "@/components/Toast";

const iconMap: Record<string, LucideIcon> = {
  grid: Grid3X3,
  wallet: Wallet,
  briefcase: Briefcase,
  zap: Zap,
  heart: Heart,
  code: Code,
  home: Home,
  spreadsheet: FileText,
  "trending-up": TrendingUp,
  shield: Shield,
  "credit-card": CreditCard,
  "file-text": FileText,
  mic: Mic,
  users: Users,
  calendar: Calendar,
  brain: Brain,
  "check-square": CheckSquare,
  moon: Moon,
  bot: Bot,
  lock: LockIcon,
  "chef-hat": ChefHat,
  "heart-pulse": HeartPulse,
  utensils: Utensils,
};

function getIcon(name: string): LucideIcon {
  return iconMap[name] || BookOpen;
}

const typeColors: Record<string, string> = {
  article: "bg-blue-500/10 text-blue-400",
  guide: "bg-emerald-500/10 text-emerald-400",
  template: "bg-amber-500/10 text-amber-400",
  tool: "bg-violet-500/10 text-violet-400",
  video: "bg-rose-500/10 text-rose-400",
};

function ResourceCard({ resource, onClick }: { resource: Resource; onClick: () => void }) {
  const Icon = getIcon(resource.icon);
  return (
    <div onClick={onClick} className="group rounded-2xl bg-brand-surface border border-brand-border overflow-hidden cursor-pointer hover:border-brand-teal/30 transition-all duration-200 hover:-translate-y-1">
      <div className={`relative h-32 bg-gradient-to-br ${resource.color} flex items-center justify-center`}>
        <Icon className="w-10 h-10 text-white/80" />
        {resource.isNew && (
          <span className="absolute top-3 left-3 bg-[#7CE1D4] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
        )}
        {resource.isPremium && (
          <span className="absolute top-3 right-3 bg-[#F4B942]/90 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> PRO
          </span>
        )}
        <span className={`absolute bottom-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeColors[resource.type]}`}>
          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm leading-tight mb-1.5 line-clamp-2">{resource.title}</h3>
        <p className="text-[#9CA3AF] text-xs leading-relaxed line-clamp-2 mb-3">{resource.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {resource.readTime && (
              <span className="flex items-center gap-1 text-[11px] text-[#9CA3AF]">
                <Clock className="w-3 h-3" /> {resource.readTime}
              </span>
            )}
          </div>
          <span className="text-[11px] text-brand-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            View <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

function MobileResourceCard({ resource, onClick }: { resource: Resource; onClick: () => void }) {
  const Icon = getIcon(resource.icon);
  return (
    <div onClick={onClick} className="group flex items-center gap-3 rounded-xl bg-[#161A1E] border border-[#2E2E2E] p-3 cursor-pointer active:scale-[0.98] transition-all">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${resource.color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5 text-white/80" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-white font-semibold text-sm truncate">{resource.title}</h3>
          {resource.isNew && <span className="bg-[#7CE1D4] text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">NEW</span>}
          {resource.isPremium && <Lock className="w-3 h-3 text-[#F4B942] flex-shrink-0" />}
        </div>
        <p className="text-[#9CA3AF] text-xs truncate">{resource.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${typeColors[resource.type]}`}>{resource.type}</span>
          {resource.readTime && <span className="flex items-center gap-1 text-[10px] text-[#9CA3AF]"><Clock className="w-3 h-3" />{resource.readTime}</span>}
        </div>
      </div>
    </div>
  );
}




export default function ResourcesPage() {
  const router = useRouter();
  const notify = useToast();
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    let result = [...resources];
    if (activeCategory !== "all") {
      result = result.filter((r) => r.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [search, activeCategory]);

  const handleOpen = (resource: Resource) => {
    router.push(`/resources/${resource.id}`);
  };

  if (isMobile) {
    return (
      <MobileShell>
        <div className="px-4 pt-1 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => router.push("/")} className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-white transition-colors" aria-label="Back to home">
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Resources</h1>
              <p className="text-[#9CA3AF] text-xs">Guides, templates & tools</p>
            </div>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search resources..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161A1E] border border-[#2E2E2E] text-white text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#7CE1D4]/50 transition-colors" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-4">
            {resourceCategories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeCategory === cat.id ? "bg-[#7CE1D4] border-[#7CE1D4] text-black" : "border-[#2E2E2E] text-[#9CA3AF] hover:text-white"}`}>
                {cat.title} ({cat.count})
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {filtered.map((r) => <MobileResourceCard key={r.id} resource={r} onClick={() => handleOpen(r)} />)}
          </div>
          {filtered.length === 0 && <div className="text-center py-12"><p className="text-[#9CA3AF] text-sm">No resources found</p></div>}
        </div>
      </MobileShell>
    );
  }

  return (
    <div className="flex h-screen bg-brand-bg text-white overflow-hidden">
      <LeftSidebar />
      <div className="flex-1 min-w-0 h-screen overflow-y-auto smooth-scroll bg-brand-bg">
        <div className="sticky top-0 z-20 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3.5 lg:py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => router.push("/")} className="text-neutral-400 hover:text-white cursor-pointer"><ArrowLeft className="w-5 h-5" /></button>
              <h1 className="text-lg lg:text-xl font-bold">Resources</h1>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search resources..." className="w-64 pl-10 pr-4 py-2 rounded-xl bg-[#1E232A] border border-brand-border text-white text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#7CE1D4]/50 transition-colors" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-6">
            {resourceCategories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${activeCategory === cat.id ? "bg-brand-teal border-brand-teal text-black" : "border-brand-border text-neutral-400 hover:text-white"}`}>
                {cat.title} ({cat.count})
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-neutral-500 text-sm"><span className="text-white font-medium">{filtered.length}</span> {filtered.length === 1 ? "resource" : "resources"}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((r) => <ResourceCard key={r.id} resource={r} onClick={() => handleOpen(r)} />)}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <h2 className="text-white font-bold text-lg mb-1">No resources found</h2>
              <p className="text-neutral-500 text-sm">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </div>
      <RightSidebar isOpen={isRightSidebarOpen} onToggle={toggleRightSidebar} />
    </div>
  );
}

