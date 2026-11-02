import React from 'react';
import { useCraft } from '../../context/CraftContext';
import { X, ExternalLink, Heart } from 'lucide-react';

export const AboutModal: React.FC = () => {
  const { activeModal, closeModal, theme } = useCraft();
  const isLight = theme === 'StudioLight';

  if (activeModal !== 'About') return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-text"
      onClick={closeModal}
    >
      <div
        className={`w-full max-w-md rounded-2xl border p-6 space-y-5 shadow-2xl ${
          isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/app-icon/hicolor/64x64/apps/ai.storyteller.craft-anything.png"
              alt="Craft Anything"
              className="w-8 h-8 rounded-lg"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <h3 className="font-bold text-base text-white">Craft Anything</h3>
              <p className="text-xs text-neutral-400">Version 0.1.0-alpha</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg hover:bg-neutral-500/15 text-neutral-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          See how any website, app, or game works, then have AI build your own version with an
          open-source, clean-room reverse-engineering engine.
        </p>

        <div className="p-3 rounded-xl bg-black/20 text-xs text-neutral-400 space-y-1 font-mono">
          <div>Display: Craft Anything</div>
          <div>Bundle: ai.storyteller.craft-anything</div>
          <div>License: MIT OR Apache-2.0</div>
          <div>Engine Tools: 314 registered MCP tools</div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-xl bg-[#1659c4] hover:bg-[#2d81ff] text-white text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
