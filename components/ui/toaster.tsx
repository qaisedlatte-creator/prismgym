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
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((opts: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...opts, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const remove = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm p-4 flex items-start gap-3 shadow-xl"
            >
              {t.variant === "success" ? (
                <CheckCircle size={16} className="text-white flex-shrink-0 mt-0.5" />
              ) : t.variant === "error" ? (
                <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
              ) : null}
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{t.title}</p>
                {t.description && <p className="text-[#888888] text-xs mt-1">{t.description}</p>}
              </div>
              <button onClick={() => remove(t.id)} className="text-[#888888] hover:text-white transition-colors">
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
