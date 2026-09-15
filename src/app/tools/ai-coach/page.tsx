"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bot, Send, Sparkles, User } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useRightSidebar } from "@/context/SidebarContext";

interface ChatMessage {
  id: string;
  role: "user" | "coach";
  text: string;
}

const GREETING: ChatMessage = {
  id: "greeting",
  role: "coach",
  text: "Hey, I'm your AI Coach 👋\n\nAsk me about money, career or learning — I'll keep it short and practical.",
};

const STARTERS = [
  "Help me build a weekly budget",
  "Improve my resume",
  "Plan my study week",
];

/**
 * Prototype "AI": keyword-matched canned replies, generated on-device.
 * Swap `coachReply` for a real API call later — the UI stays identical.
 */
function coachReply(input: string): string {
  const q = input.toLowerCase();
  if (/(budget|money|save|spend|expense|income|salary)/.test(q)) {
    return "Here's a simple start:\n\n1. Write down your monthly income.\n2. Split it 50/30/20 — needs, wants, savings.\n3. Track every expense for 7 days. Awareness alone trims ~10%.\n\nThe Budget Planner already has the categories set up for you — try it next!";
  }
  if (/(resume|cv|job|interview|career|hiring|work)/.test(q)) {
    return "Quick resume wins:\n\n• Lead every bullet with an action verb + a number — \"Cut onboarding time 30%\".\n• One page. Recruiters skim for 7 seconds.\n• Mirror the exact keywords from the job posting.\n\nOpen the Resume Builder and polish it section by section.";
  }
  if (/(study|learn|course|lesson|streak|plan|focus)/.test(q)) {
    return "Let's plan your week:\n\n• Pick 2 courses max — focus beats variety.\n• 25 focused minutes a day keeps the streak alive.\n• Sunday: 15-minute review of what you learned.\n\nSmall daily reps compound fast 🔥";
  }
  if (/^(hi|hello|hey|yo|hola)\b/.test(q)) {
    return "Hey there! 👋 What should we work on today — money, career or learning?";
  }
  return "Good question! While I'm a prototype, here's the honest best answer:\n\n• Break the goal into the smallest next step.\n• Schedule it for tomorrow at a specific time.\n• Tell someone — accountability doubles follow-through.\n\nFor deeper dives, ask me about budgeting, resumes or study plans!";
}

export default function AiCoachPage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();

  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the conversation pinned to the latest message.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || isTyping) return;
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: "user", text }]);
    setDraft("");
    setIsTyping(true);
    const reply = coachReply(text);
    // Simulated "thinking" delay for a natural chat feel.
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: `c-${Date.now()}`, role: "coach", text: reply }]);
      setIsTyping(false);
    }, 900 + Math.random() * 700);
  };

  const chatCard = (
    <div className="rounded-2xl bg-brand-surface border border-brand-border overflow-hidden flex flex-col h-[58vh] min-h-[380px] lg:h-[600px]">
      {/* Messages — data-lenis-prevent so the wheel scrolls the chat, not the page */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        className="flex-1 min-h-0 overflow-y-auto smooth-scroll px-4 py-4 flex flex-col gap-3"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-end gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                m.role === "user"
                  ? "bg-white/5 text-neutral-400"
                  : "bg-brand-teal/10 text-brand-teal"
              }`}
            >
              {m.role === "user" ? (
                <User className="w-3.5 h-3.5" strokeWidth={2} />
              ) : (
                <Bot className="w-3.5 h-3.5" strokeWidth={2} />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                m.role === "user"
                  ? "bg-brand-teal text-black rounded-br-md"
                  : "bg-brand-card border border-brand-border text-neutral-200 rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line">{m.text}</p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end gap-2.5">
            <div className="w-7 h-7 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5" strokeWidth={2} />
            </div>
            <div className="bg-brand-card border border-brand-border rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Starter prompts — only before the first real exchange */}
      {messages.length <= 1 && !isTyping && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {STARTERS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-[11px] font-medium text-brand-teal border border-brand-teal/30 hover:bg-brand-teal/10 rounded-full px-3 py-1.5 transition-colors cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="border-t border-brand-border p-3 flex items-center gap-2"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask your coach anything..."
          aria-label="Message the AI coach"
          className="flex-1 bg-brand-bg border border-brand-border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-teal/60 transition-colors"
        />
        <button
          type="submit"
          disabled={!draft.trim() || isTyping}
          aria-label="Send message"
          className="w-10 h-10 shrink-0 rounded-xl bg-brand-teal disabled:opacity-40 disabled:cursor-not-allowed text-black flex items-center justify-center hover:bg-brand-teal/90 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </form>
    </div>
  );

  const banner = (
    <div className="rounded-2xl bg-gradient-to-b from-[#1a2a2a] to-[#0f1f1f] border border-brand-teal/20 p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-brand-teal/15 flex items-center justify-center shrink-0">
        <Sparkles className="w-5 h-5 text-brand-teal" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-white font-bold">Your personal life coach</p>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 bg-white/5 px-2 py-0.5 rounded-full">
            Prototype
          </span>
        </div>
        <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">
          Ask about money, career or learning. Replies are simulated on-device —
          no account, no data leaves your browser.
        </p>
      </div>
    </div>
  );

  /* ---- Mobile ---- */
  if (isMobile) {
    return (
      <MobileShell>
        <div className="px-4 pt-1 pb-8">
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => router.push("/tools")}
              aria-label="Back to tools"
              className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">AI Coach</h1>
              <p className="text-[#9CA3AF] text-xs">Guidance in seconds</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {banner}
            {chatCard}
          </div>
        </div>
      </MobileShell>
    );
  }

  /* ---- Desktop ---- */
  return (
    <div className="flex h-screen bg-brand-bg text-white overflow-hidden">
      <LeftSidebar />

      <div className="flex-1 min-w-0 h-screen overflow-y-auto smooth-scroll bg-brand-bg">
        <div className="sticky top-0 z-20 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 lg:py-4 flex items-center gap-3">
            <button
              onClick={() => router.push("/tools")}
              aria-label="Back to tools"
              className="text-neutral-400 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg lg:text-xl font-bold">AI Coach</h1>
              <p className="text-neutral-500 text-xs">Guidance in seconds</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
          {banner}
          {chatCard}
        </div>
      </div>

      <RightSidebar isOpen={isRightSidebarOpen} onToggle={toggleRightSidebar} />
    </div>
  );
}