"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { CheckCircle2, Info, Sparkles } from "lucide-react";

type ToastType = "info" | "success" | "premium";
type NotifyFn = (msg: string, type?: ToastType) => void;

const ToastContext = createContext<NotifyFn>(() => {});

interface ToastItem {
  id: number;
  msg: string;
  type: ToastType;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const notify: NotifyFn = useCallback((msg, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2600);
  }, []);

  return (
    <ToastContext.Provider value={notify}>
      {children}

      {/* Toast stack */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-border shadow-2xl shadow-black/50 animate-[toastIn_0.2s_ease-out]"
          >
            {t.type === "success" && (
              <CheckCircle2 className="w-4 h-4 text-brand-teal" strokeWidth={2.5} />
            )}
            {t.type === "premium" && (
              <Sparkles className="w-4 h-4 text-brand-gold" strokeWidth={2.5} />
            )}
            {t.type === "info" && (
              <Info className="w-4 h-4 text-brand-rust" strokeWidth={2.5} />
            )}
            <span className="text-sm text-white font-medium">{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
