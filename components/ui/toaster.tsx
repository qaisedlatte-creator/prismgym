"use client";

import { useState, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle } from "lucide-react";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "error";
}

interface ToastContextType {
  toast: (opts: Omit<Toast, "id">) => void;
  toasts: Toast[];
  remove: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
  toasts: [],
  remove: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

// Wraps the entire app — must be an ancestor of any component calling useToast()
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((opts: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...opts, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, toasts, remove }}>
      {children}
    </ToastContext.Provider>
  );
}

// Renders the toast UI — place once in layout, inside ToastProvider
export function Toaster() {
  const { toasts, remove } = useContext(ToastContext);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 16,
        left: 16,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.25, 0, 0, 1] }}
            style={{
              background: "#1a1a1a",
              border: "1px solid #2e2e2e",
              padding: "14px 16px",
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
              maxWidth: 420,
              marginLeft: "auto",
              pointerEvents: "all",
            }}
          >
            {t.variant === "success" && (
              <CheckCircle size={16} style={{ color: "#4ade80", flexShrink: 0, marginTop: 2 }} />
            )}
            {t.variant === "error" && (
              <AlertCircle size={16} style={{ color: "#f87171", flexShrink: 0, marginTop: 2 }} />
            )}
            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: "#fff",
                  fontSize: "0.875rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                }}
              >
                {t.title}
              </p>
              {t.description && (
                <p
                  style={{
                    color: "#888",
                    fontSize: "0.75rem",
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: 4,
                  }}
                >
                  {t.description}
                </p>
              )}
            </div>
            <button
              onClick={() => remove(t.id)}
              style={{
                color: "#666",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
