import React from 'react';
import { useCraft } from '../../context/CraftContext';
import { ShieldAlert, X } from 'lucide-react';

export const DeepModeModal: React.FC = () => {
  const { activeModal, closeModal, setDeepMode, showToast, theme } = useCraft();
  const isLight = theme === 'StudioLight';

  if (activeModal !== 'DeepMode') return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-text"
      onClick={closeModal}
    >
      <div
        className={`w-full max-w-md rounded-2xl border p-6 space-y-4 shadow-2xl ${
          isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>Switch to Deep Mode?</span>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg hover:bg-neutral-500/15 text-neutral-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          Clean room mode refuses to read inside the original program, files, or binary code.
          Deep Mode enables full internal analysis, decompiler passes, function disassembly, and Ghidra integration.
        </p>

        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-[11px] text-amber-200">
          Only inspect software you own or are legally authorized to examine.
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={closeModal}
            className="px-3.5 py-2 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-xs text-neutral-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setDeepMode(true);
              closeModal();
              showToast('Deep mode activated.');
            }}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow"
          >
            Turn on Deep Mode
          </button>
        </div>
      </div>
    </div>
  );
};
