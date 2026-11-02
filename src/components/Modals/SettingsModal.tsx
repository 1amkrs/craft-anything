import React, { useState } from 'react';
import { useCraft } from '../../context/CraftContext';
import {
  X,
  Settings as SettingsIcon,
  Cpu,
  Bot,
  Hammer,
  Puzzle,
  ShieldCheck,
  Check,
  Sparkles,
  Terminal,
  FolderOpen
} from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { activeModal, closeModal, settings, updateSettings, theme, showToast } = useCraft();
  const [activeTab, setActiveTab] = useState<'General' | 'Engines' | 'AI' | 'Builds' | 'Plugins' | 'Safety'>('AI');

  const isLight = theme === 'StudioLight';

  if (activeModal !== 'Settings') return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-text"
      onClick={closeModal}
    >
      <div
        className={`w-full max-w-3xl h-[80vh] rounded-2xl border shadow-2xl overflow-hidden flex flex-col ${
          isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="h-12 px-5 border-b border-inherit flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 font-bold text-sm">
            <SettingsIcon className="w-4 h-4 text-[#74aaff]" />
            <span>Settings</span>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg hover:bg-neutral-500/15 text-neutral-400 hover:text-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Sidebar Tabs + Content */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Tabs Sidebar */}
          <div
            className={`w-44 border-r p-2 space-y-0.5 shrink-0 text-xs font-medium ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#101014] border-[#242527]'
            }`}
          >
            {[
              { id: 'General', label: 'General', icon: SettingsIcon },
              { id: 'AI', label: 'AI & Coding Agents', icon: Bot },
              { id: 'Engines', label: 'Engines & Ghidra', icon: Cpu },
              { id: 'Builds', label: 'Builds & Runs', icon: Hammer },
              { id: 'Plugins', label: 'Plugins & MCP', icon: Puzzle },
              { id: 'Safety', label: 'Safety & Clean Room', icon: ShieldCheck }
            ].map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                    active
                      ? 'bg-[#1659c4] text-white shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Pane */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-neutral-300">
            {/* AI & CODING AGENTS TAB */}
            {activeTab === 'AI' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">AI & Coding Agents</h3>
                  <p className="text-neutral-400">
                    Configure which coding agents build your projects and study targets.
                  </p>
                </div>

                {/* Primary Builder Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-200">
                    Primary Coding Builder
                  </label>
                  <select
                    value={settings.builderAI}
                    onChange={(e) => updateSettings({ builderAI: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                      isLight ? 'bg-white border-neutral-300' : 'bg-[#121316] border-[#343436] text-white'
                    }`}
                  >
                    <option value="Antigravity CLI">Antigravity CLI (agy)</option>
                    <option value="Claude Code">Claude Code (claude)</option>
                    <option value="OpenAI Codex">OpenAI Codex</option>
                    <option value="OpenCode">OpenCode</option>
                    <option value="Local Ollama">Local Ollama (OpenAI-compatible)</option>
                  </select>
                </div>

                {/* Antigravity CLI Integration Box */}
                <div
                  className={`p-4 rounded-xl border space-y-3 ${
                    isLight ? 'bg-blue-50/50 border-blue-200' : 'bg-blue-950/20 border-blue-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#74aaff]" />
                      <span className="font-bold text-white text-xs">Antigravity CLI (`agy`) Integration</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-mono">
                      Integrated
                    </span>
                  </div>

                  <p className="text-neutral-300 text-xs leading-relaxed">
                    Craft Anything drives your local <code className="text-[#74aaff] font-mono bg-black/30 px-1 py-0.5 rounded">agy</code> executable using stream-json protocol. In builder mode, <code className="text-neutral-400 font-mono">--dangerously-skip-permissions</code> and <code className="text-neutral-400 font-mono">--output-format stream-json</code> allow non-interactive tool dispatches to Craft Anything's MCP server.
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1 font-mono">
                    <div className="p-2 rounded bg-black/30">
                      <div className="text-[10px] text-neutral-500 font-sans">Command</div>
                      <div className="text-white">agy</div>
                    </div>
                    <div className="p-2 rounded bg-black/30">
                      <div className="text-[10px] text-neutral-500 font-sans">Stream Mode</div>
                      <div className="text-emerald-400">stream-json (Active)</div>
                    </div>
                  </div>
                </div>

                {/* Claude Code & Other CLI Options */}
                <div className="space-y-3 pt-2 border-t border-inherit">
                  <h4 className="font-semibold text-white">Other CLI Agents</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-700/50 bg-[#121316]">
                      <div>
                        <div className="font-medium text-white">Claude Code</div>
                        <div className="text-[11px] text-neutral-500">Unmodified `claude` executable via MCP</div>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-mono">Installed</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-700/50 bg-[#121316]">
                      <div>
                        <div className="font-medium text-white">OpenCode</div>
                        <div className="text-[11px] text-neutral-500">Open-source agent terminal adapter</div>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-mono">Available</span>
                    </div>
                  </div>
                </div>

                {/* fal.ai Key for 2D/3D Generated Assets */}
                <div className="space-y-1.5 pt-2 border-t border-inherit">
                  <label className="text-xs font-semibold text-neutral-200">
                    fal.ai API Key (for generated game textures & 3D models)
                  </label>
                  <input
                    type="password"
                    value={settings.falAiApiKey || ''}
                    onChange={(e) => updateSettings({ falAiApiKey: e.target.value })}
                    placeholder="fal-..."
                    className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                      isLight ? 'bg-white border-neutral-300' : 'bg-[#121316] border-[#343436] text-white'
                    }`}
                  />
                  <p className="text-[11px] text-neutral-500">
                    Your key is kept safe and never shared. Only used when "Generate assets" is toggled for game builds.
                  </p>
                </div>
              </div>
            )}

            {/* GENERAL TAB */}
            {activeTab === 'General' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">General Preferences</h3>
                  <p className="text-neutral-400">Application language, theme, and workspace storage.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-200">Projects Directory</label>
                  <input
                    type="text"
                    value={settings.projectsDir}
                    onChange={(e) => updateSettings({ projectsDir: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                      isLight ? 'bg-white border-neutral-300' : 'bg-[#121316] border-[#343436] text-white'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-200">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => updateSettings({ language: e.target.value as any })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                      isLight ? 'bg-white border-neutral-300' : 'bg-[#121316] border-[#343436] text-white'
                    }`}
                  >
                    <option value="en">English</option>
                    <option value="ja">日本語 (Japanese)</option>
                    <option value="zh-hans">简体中文 (Simplified Chinese)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-200">Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => updateSettings({ theme: e.target.value as any })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                      isLight ? 'bg-white border-neutral-300' : 'bg-[#121316] border-[#343436] text-white'
                    }`}
                  >
                    <option value="Studio">Studio (Dark)</option>
                    <option value="StudioLight">Studio Light</option>
                  </select>
                </div>
              </div>
            )}

            {/* ENGINES TAB */}
            {activeTab === 'Engines' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Engines & Reverse Engineering Tools</h3>
                  <p className="text-neutral-400">Ghidra decompiler bridge, Java runtime, and Game engines.</p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-700/60 bg-[#121316] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Ghidra Bridge (Deep mode)</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400 font-mono">
                      Optional
                    </span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">
                    Craft Anything has its own native disassembler and decompiler for clean-room use. Ghidra adds supplementary decompilation in Deep Mode.
                  </p>
                  <input
                    type="text"
                    value={settings.ghidraPath}
                    onChange={(e) => updateSettings({ ghidraPath: e.target.value })}
                    placeholder="/opt/ghidra"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-700 bg-neutral-900 text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* BUILDS TAB */}
            {activeTab === 'Builds' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Build & Verification Rules</h3>
                  <p className="text-neutral-400">Settings for automated checks and refine loops.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-200">
                    Likeness Score Threshold (Good enough: {settings.goodEnoughScore}%)
                  </label>
                  <input
                    type="range"
                    min="80"
                    max="99"
                    value={settings.goodEnoughScore}
                    onChange={(e) => updateSettings({ goodEnoughScore: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-200">
                    Max Refinement Rounds ({settings.maxRounds} rounds)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={settings.maxRounds}
                    onChange={(e) => updateSettings({ maxRounds: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-700 bg-[#121316] text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* PLUGINS TAB */}
            {activeTab === 'Plugins' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">MCP Servers & WASM Plugins</h3>
                  <p className="text-neutral-400">
                    Connect additional MCP toolsets or WebAssembly plugin components.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-neutral-700/60 bg-[#121316] flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">craft-anything MCP Server</div>
                    <div className="text-[11px] text-neutral-500">Exposes 314 inspection & analysis tools</div>
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold">Active</span>
                </div>
              </div>
            )}

            {/* SAFETY TAB */}
            {activeTab === 'Safety' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Safety & Responsible Use</h3>
                  <p className="text-neutral-400">
                    Craft Anything is designed for software you own or have permission to inspect.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-neutral-200">Stated Purpose</label>
                  <select
                    value={settings.purpose}
                    onChange={(e) => updateSettings({ purpose: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-700 bg-[#121316] text-xs text-white"
                  >
                    <option value="OwnOrAuthorized">It's mine, or I'm allowed to look</option>
                    <option value="Education">I'm learning how things work</option>
                    <option value="Interoperability">I want to make things work together</option>
                    <option value="Security">I'm checking whether it's safe</option>
                    <option value="Preservation">I'm keeping old software alive</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
