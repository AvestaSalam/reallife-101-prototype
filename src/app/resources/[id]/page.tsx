"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, Bookmark, Share2, ExternalLink, Check, ChevronRight, Sparkles } from "lucide-react";
import { resources } from "@/data/resources";
import { resourceDetails } from "@/data/resourceDetails";
import { useSavedCourses } from "@/context/SavedCoursesContext";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import MobileShell from "@/components/MobileShell";
import { useRightSidebar } from "@/context/SidebarContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useToast } from "@/components/Toast";

const typeColors = {
  article: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  guide: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  template: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  tool: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  video: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export default function ResourceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const resourceId = params.id as string;
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();
  const isMobile = useIsMobile();
  const { toggleSaved } = useSavedCourses();
  const notify = useToast();
  const resource = resources.find((r) => r.id === resourceId);
  const detail = resourceDetails[resourceId];

  if (!resource) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-xl font-bold mb-2">Resource not found</h1>
          <button onClick={() => router.back()} className="text-brand-teal hover:underline cursor-pointer">Go back</button>
        </div>
      </div>
    );
  }

  const handleSave = () => { toggleSaved(resourceId); notify("Resource saved!", "success"); };
  const handleShare = () => { notify("Share link copied!", "success"); };

  if (isMobile) {
    return (
      <MobileShell>
        <div className="px-4 pt-1 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => router.push("/resources")} className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-white font-bold text-lg truncate">{resource.title}</h1>
              <p className="text-[#9CA3AF] text-xs capitalize">{resource.category}</p>
            </div>
            <button onClick={handleSave} className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-white">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
          {detail?.sections.map((s, i) => (
            <div key={i} className="mb-5">
              <h2 className="text-white font-semibold mb-2">{s.heading}</h2>
              <p className="text-[#9CA3AF] text-sm mb-2">{s.content}</p>
              {s.list && (
                <ul className="space-y-1.5">
                  {s.list.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm text-[#9CA3AF]">
                      <ChevronRight className="w-4 h-4 text-[#7CE1D4] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {detail?.keyTakeaways.length > 0 && (
            <div className="bg-[#7CE1D4]/5 border border-[#7CE1D4]/20 rounded-xl p-4 mb-4">
              <h3 className="text-[#7CE1D4] font-semibold mb-2">Key Takeaways</h3>
              <ul className="space-y-1.5">
                {detail.keyTakeaways.map((t, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[#9CA3AF]">
                    <Check className="w-4 h-4 text-[#7CE1D4] flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <span key={tag} className="text-xs text-[#9CA3AF] bg-[#1E232A] px-2.5 py-1 rounded-full">#{tag}</span>
            ))}
          </div>
        </div>
      </MobileShell>
    );
  }

  return (
    <div className="flex h-screen bg-brand-bg text-white overflow-hidden">
      <LeftSidebar />
      <div className="flex-1 min-w-0 h-screen overflow-y-auto smooth-scroll bg-brand-bg">
        <div className="sticky top-0 z-20 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => router.push("/resources")} className="text-neutral-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></button>
              <h1 className="text-xl font-bold">Resources</h1>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E232A] border border-brand-border text-sm text-neutral-300 hover:text-white"><Bookmark className="w-4 h-4" /> Save</button>
              <button onClick={handleShare} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E232A] border border-brand-border text-sm text-neutral-300 hover:text-white"><Share2 className="w-4 h-4" /> Share</button>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs px-2.5 py-1 rounded-full border ${typeColors[resource.type]}`}>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
              {resource.readTime && <span className="flex items-center gap-1 text-xs text-[#9CA3AF]"><Clock className="w-3 h-3" />{resource.readTime}</span>}
              {resource.isNew && <span className="bg-[#7CE1D4] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>}
              {resource.isPremium && <span className="bg-[#F4B942]/90 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Sparkles className="w-3 h-3" />PRO</span>}
            </div>
            <h1 className="text-3xl font-bold mb-3">{resource.title}</h1>
            <p className="text-[#9CA3AF]">{resource.description}</p>
          </div>
          {detail?.sections.map((s, i) => (
            <div key={i} className="mb-8">
              <h2 className="text-lg font-semibold mb-3">{s.heading}</h2>
              <p className="text-[#9CA3AF] text-sm mb-3">{s.content}</p>
              {s.list && (
                <ul className="space-y-2">
                  {s.list.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm text-[#9CA3AF]">
                      <ChevronRight className="w-4 h-4 text-[#7CE1D4] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {detail?.keyTakeaways.length > 0 && (
            <div className="bg-[#7CE1D4]/5 border border-[#7CE1D4]/20 rounded-2xl p-6 mb-8">
              <h3 className="text-[#7CE1D4] font-semibold mb-3">Key Takeaways</h3>
              <ul className="space-y-2">
                {detail.keyTakeaways.map((t, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#9CA3AF]">
                    <Check className="w-4 h-4 text-[#7CE1D4] flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-8">
            {resource.tags.map((tag) => (
              <span key={tag} className="text-xs text-[#9CA3AF] bg-brand-surface border border-brand-border px-3 py-1.5 rounded-full">#{tag}</span>
            ))}
          </div>
          {detail?.relatedResources.length > 0 && (
            <div className="border-t border-brand-border pt-8">
              <h3 className="font-semibold text-lg mb-4">Related Resources</h3>
              <div className="grid grid-cols-2 gap-3">
                {detail.relatedResources.map((relId) => {
                  const rel = resources.find((r) => r.id === relId);
                  if (!rel) return null;
                  return (
                    <button key={relId} onClick={() => router.push(`/resources/${relId}`)} className="flex items-center gap-3 p-3 rounded-xl bg-brand-surface border border-brand-border hover:border-brand-teal/30 text-left">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{rel.title}</h4>
                        <p className="text-xs text-[#9CA3AF] truncate">{rel.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[#9CA3AF]" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <RightSidebar isOpen={isRightSidebarOpen} onToggle={toggleRightSidebar} />
    </div>
  );
}
