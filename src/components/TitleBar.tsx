import React from 'react';
import { useCraft } from '../context/CraftContext';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  Settings as SettingsIcon,
  HelpCircle,
  Sun,
  Moon,
  Layers,
  Sparkles
} from 'lucide-react';

export const TitleBar: React.FC = () => {
  const {
    deepMode,
    setDeepMode,
    mode,
    setMode,
    theme,
    setTheme,
    screen,
    setScreen,
    setPaletteOpen,
    openModal,
    showToast
  } = useCraft();

  const isLight = theme === 'StudioLight';

  return (
    <header
      className={`h-11 px-3 flex items-center justify-between border-b select-none transition-colors duration-150 z-30 shrink-0 ${
        isLight
          ? 'bg-[#f1f1ef] border-[#e2e2df] text-[#16171a]'
          : 'bg-[#101014] border-[#242527] text-[#f2f1ee]'
      }`}
    >
      {/* Left: App Logo & Title */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setScreen('Home')}
          className="flex items-center gap-2 px-1.5 py-1 rounded hover:opacity-85 transition-opacity"
          title="Return to Home"
        >
          <img
            src="/assets/app-icon/hicolor/64x64/apps/ai.storyteller.craft-anything.png"
            alt="Craft Anything"
            className="w-5 h-5 rounded"
            onError={(e) => {
              // fallback if asset path differs
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="font-semibold text-sm tracking-tight flex items-center gap-1.5">
            Craft Anything
            <span
              className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded border ${
                isLight
                  ? 'bg-neutral-200/70 text-neutral-600 border-neutral-300'
                  : 'bg-neutral-800 text-neutral-400 border-neutral-700'
              }`}
            >
              alpha
            </span>
          </span>
        </button>
      </div>

      {/* Middle: Clean Room vs Deep Switcher & Search Bar */}
      <div className="flex items-center gap-3">
        {/* Clean room vs Deep mode pill */}
        <div
          className={`flex items-center p-0.5 rounded-lg border text-xs ${
            isLight
              ? 'bg-[#ffffff] border-[#cbcac6]'
              : 'bg-[#1b1c1f] border-[#343436]'
          }`}
        >
          <button
            onClick={() => {
              if (deepMode) {
                setDeepMode(false);
                showToast('Clean room mode enabled: no original code is read');
              }
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium ${
              !deepMode
                ? 'bg-[#1659c4] text-white shadow-sm'
                : isLight
                ? 'text-neutral-600 hover:text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Clean room: works only from what a visitor or user sees. Never reads original files, binary code or source."
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Clean room</span>
          </button>

          <button
            onClick={() => {
              if (!deepMode) {
                setDeepMode(true);
                showToast('Deep mode enabled: inspects internal code and binaries');
              }
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium ${
              deepMode
                ? 'bg-amber-600 text-white shadow-sm'
                : isLight
                ? 'text-neutral-600 hover:text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Deep mode: reads inside target binaries, scripts, decompiled C/Rust, and game archives."
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Deep mode</span>
          </button>
        </div>

        {/* Command Palette Trigger */}
        <button
          onClick={() => setPaletteOpen(true)}
          className={`flex items-center gap-2 px-2.5 py-1 text-xs rounded-lg border transition-all ${
            isLight
              ? 'bg-[#ffffff] border-[#cbcac6] text-neutral-500 hover:border-neutral-400'
              : 'bg-[#1b1c1f] border-[#343436] text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'
          }`}
          title="Search tools, functions, and symbols (Ctrl+K or ⌘K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search tools & symbols</span>
          <kbd
            className={`px-1 py-0.5 text-[10px] font-mono rounded ${
              isLight ? 'bg-neutral-100 text-neutral-500' : 'bg-neutral-800 text-neutral-400'
            }`}
          >
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Mode Toggle, Theme, Settings, Help */}
      <div className="flex items-center gap-1.5">
        {/* Simple vs Workbench Mode Switch */}
        <div
          className={`flex items-center p-0.5 rounded-lg border text-xs mr-1 ${
            isLight ? 'bg-[#ffffff] border-[#cbcac6]' : 'bg-[#1b1c1f] border-[#343436]'
          }`}
        >
          <button
            onClick={() => {
              setMode('Beginner');
              if (screen === 'Workbench') setScreen('Home');
            }}
            className={`px-2 py-0.8 rounded text-xs font-medium transition-all ${
              mode === 'Beginner'
                ? isLight
                  ? 'bg-neutral-200 text-black font-semibold'
                  : 'bg-neutral-700 text-white font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Simple mode: plain-words questions, step-by-step rebuilds"
          >
            Simple
          </button>
          <button
            onClick={() => {
              setMode('Experienced');
              setScreen('Workbench');
            }}
            className={`px-2 py-0.8 rounded text-xs font-medium transition-all ${
              mode === 'Experienced'
                ? isLight
                  ? 'bg-neutral-200 text-black font-semibold'
                  : 'bg-neutral-700 text-white font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Advanced mode: full reverse-engineering workbench"
          >
            Advanced
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(isLight ? 'Studio' : 'StudioLight')}
          className={`p-1.5 rounded-lg border transition-colors ${
            isLight
              ? 'border-[#cbcac6] text-neutral-600 hover:bg-neutral-200'
              : 'border-[#343436] text-neutral-400 hover:bg-[#1b1c1f] hover:text-neutral-200'
          }`}
          title={`Switch to ${isLight ? 'Studio (Dark)' : 'Studio Light'}`}
        >
          {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </button>

        {/* Settings Button */}
        <button
          onClick={() => openModal('Settings')}
          className={`p-1.5 rounded-lg border transition-colors ${
            isLight
              ? 'border-[#cbcac6] text-neutral-600 hover:bg-neutral-200'
              : 'border-[#343436] text-neutral-400 hover:bg-[#1b1c1f] hover:text-neutral-200'
          }`}
          title="Settings (Engines, AI, Safety, Plugins)"
        >
          <SettingsIcon className="w-3.5 h-3.5" />
        </button>

        {/* Help / About Button */}
        <button
          onClick={() => openModal('About')}
          className={`p-1.5 rounded-lg border transition-colors ${
            isLight
              ? 'border-[#cbcac6] text-neutral-600 hover:bg-neutral-200'
              : 'border-[#343436] text-neutral-400 hover:bg-[#1b1c1f] hover:text-neutral-200'
          }`}
          title="About Craft Anything"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
