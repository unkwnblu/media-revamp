"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiInformationLine,
  RiCloseLine,
} from "react-icons/ri";

// ─── Types ────────────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const DURATION = 4000;

const STYLES: Record<ToastType, { bar: string; icon: string; Icon: React.ElementType }> = {
  success: { bar: "from-purple-500 to-pink-500", icon: "text-purple-400", Icon: RiCheckboxCircleLine },
  error:   { bar: "from-red-500 to-rose-500",    icon: "text-red-400",    Icon: RiErrorWarningLine   },
  info:    { bar: "from-blue-500 to-cyan-400",   icon: "text-blue-400",   Icon: RiInformationLine    },
};

// ─── Single Toast ─────────────────────────────────────────────────────────────

function Toast({ toast, onRemove }: { toast: ToastItem; onRemove: (id: string) => void }) {
  const [visible, setVisible] = useState(false);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  }, [onRemove, toast.id]);

  useEffect(() => {
    // Small delay so the browser paints the invisible state first, then transitions in
    const showTimer = setTimeout(() => setVisible(true), 16);
    dismissTimer.current = setTimeout(dismiss, DURATION);
    return () => {
      clearTimeout(showTimer);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [dismiss]);

  const { bar, icon, Icon } = STYLES[toast.type];

  return (
    <div
      style={{ transition: "opacity 300ms ease, transform 300ms ease" }}
      className={`relative flex items-start w-80 rounded-xl border border-white/[0.08] bg-[#13131f] shadow-2xl shadow-black/60 overflow-hidden ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
      }`}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${bar}`} />

      {/* Body */}
      <div className="flex items-start gap-3 pl-4 pr-3 py-3.5 w-full">
        <Icon size={18} className={`${icon} shrink-0 mt-0.5`} />
        <p
          className="text-sm text-white/80 leading-snug flex-1"
          style={{ fontFamily: "var(--font-nunito), sans-serif", textTransform: "none" }}
        >
          {toast.message}
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="text-white/30 hover:text-white/70 transition-colors shrink-0 mt-0.5"
        >
          <RiCloseLine size={16} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.04]">
        <div
          className={`h-full bg-gradient-to-r ${bar} opacity-60`}
          style={{ animation: `toast-shrink ${DURATION}ms linear forwards` }}
        />
      </div>
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Toaster is rendered via a portal directly onto document.body —
  // this completely escapes any stacking context from parent elements.
  const toaster = (
    <div
      className="fixed top-5 right-5 flex flex-col gap-2.5 pointer-events-none"
      style={{ zIndex: 99999 }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onRemove={removeToast} />
        </div>
      ))}
    </div>
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted && createPortal(toaster, document.body)}
    </ToastContext.Provider>
  );
}
