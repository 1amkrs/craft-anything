import React from 'react';
import { useCraft } from '../context/CraftContext';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

export const Toasts: React.FC = () => {
  const { toasts, dismissToast } = useCraft();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-3 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3 rounded-xl border shadow-xl flex items-center justify-between gap-3 text-xs animate-in slide-in-from-bottom-2 duration-150 ${
            toast.isError
              ? 'bg-[#2a1315] border-red-700 text-red-200'
              : 'bg-[#1b1c1f] border-neutral-700 text-neutral-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {toast.isError ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span className="leading-tight">{toast.text}</span>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
