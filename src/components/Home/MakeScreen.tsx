import React, { useState } from 'react';
import { useCraft } from '../../context/CraftContext';
import {
  Globe,
  AppWindow,
  Gamepad2,
  Sparkles,
  Image as ImageIcon,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  FolderOpen,
  Info,
  Layers,
  CheckCircle2,
  UploadCloud,
  FileCode,
  Play
} from 'lucide-react';

export const MakeScreen: React.FC = () => {
  const {
    createProject,
    selectProject,
    projects,
    deepMode,
    setDeepMode,
    setScreen,
    setTriageTarget,
    theme,
    openModal
  } = useCraft();

  const isLight = theme === 'StudioLight';

  const [activeTab, setActiveTab] = useState<'make' | 'look'>('make');
  const [targetType, setTargetType] = useState<'website' | 'app' | 'game' | 'fresh'>('website');
  const [urlInput, setUrlInput] = useState<string>('https://example-bakery.artcraft.app');
  const [pickedFile, setPickedFile] = useState<string | null>(null);
  const [requestText, setRequestText] = useState<string>('');
  const [builderAI, setBuilderAI] = useState<string>('Claude Code');
  const [gameEngine, setGameEngine] = useState<string>('Godot 4.3 (Rust)');
  const [generateAssets, setGenerateAssets] = useState<boolean>(false);
  const [pictures, setPictures] = useState<string[]>([]);

  // Suggestion chips
  const getSuggestions = () => {
    switch (targetType) {
      case 'website':
        return [
          'Recreate this website with modern responsive cards and smooth transitions',
          'Recreate this page with darker colours and an instant search filter',
          'Make a clean portfolio inspired by this design'
        ];
      case 'app':
        return [
          'Make my own version of this app with a modern single-window UI',
          'Recreate just its main feature in pure Rust',
          'Build an open-source clone with local JSON data export'
        ];
      case 'game':
        return [
          'Make a game that plays like this with retro CRT green scanlines',
          'Recreate the core movement mechanics in Godot',
          'A simple clone of this game with high scores'
        ];
      default:
        return [
          'A personal task and notes manager with keyboard shortcuts',
          'A retro arcade snake game in Rust',
          'A showcase landing page for an artisan coffee roaster'
        ];
    }
  };

  const handleStart = () => {
    if (!requestText.trim()) return;

    let targetVal = 'Start fresh';
    let targetKind = 'None';

    if (targetType === 'website') {
      targetVal = urlInput.trim() || 'https://example.com';
      targetKind = 'Website';
    } else if (targetType === 'app') {
      targetVal = pickedFile || 'desktop-app.exe';
      targetKind = 'Native';
    } else if (targetType === 'game') {
      targetVal = pickedFile || 'game-archive.pck';
      targetKind = 'Game';
    }

    const suggestedName =
      requestText.slice(0, 32).trim() + (requestText.length > 32 ? '…' : '');

    createProject({
      name: suggestedName,
      request: requestText.trim(),
      targetKind,
      targetValue: targetVal,
      stack: targetType === 'game' ? gameEngine : 'React + Tailwind CSS + Vite',
      builder: builderAI,
      generateAssets: targetType === 'game' && generateAssets,
      pictures
    });
  };

  const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setPickedFile(file.name);
      if (activeTab === 'look') {
        setTriageTarget({
          name: file.name,
          size: file.size,
          sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          kind: file.name.endsWith('.exe') ? 'Windows PE32+ Binary' : 'Application Package'
        });
        setScreen('Ask');
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center select-text">
      <div className="w-full max-w-3xl space-y-7">
        {/* Top Mode Segmented Switch: Make vs Just Look Inside */}
        <div className="flex justify-center">
          <div
            className={`inline-flex p-1 rounded-xl border text-sm font-medium ${
              isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436]'
            }`}
          >
            <button
              onClick={() => setActiveTab('make')}
              className={`px-5 py-2 rounded-lg transition-all ${
                activeTab === 'make'
                  ? 'bg-[#1659c4] text-white shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Make my own version
            </button>
            <button
              onClick={() => {
                setActiveTab('look');
                setScreen('Ask');
              }}
              className={`px-5 py-2 rounded-lg transition-all ${
                activeTab === 'look'
                  ? 'bg-[#1659c4] text-white shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Just look inside
            </button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">What do you want to make?</h1>
          <p className="text-sm text-neutral-400 max-w-lg mx-auto">
            Choose what to recreate, say what you want, then press Start. Real inspection tools
            study the original with evidence, and a coding agent builds your own version.
          </p>
        </div>

        {/* Main Card */}
        <div
          className={`p-6 rounded-2xl border space-y-6 shadow-sm ${
            isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436]'
          }`}
        >
          {/* STEP 1: What do you want to recreate? */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <span className="w-5 h-5 rounded-full bg-[#1659c4] text-white flex items-center justify-center text-[11px]">
                1
              </span>
              <span>What do you want to recreate?</span>
            </div>

            {/* Target Selection Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => setTargetType('website')}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  targetType === 'website'
                    ? 'border-[#1659c4] bg-[#1659c4]/10 ring-1 ring-[#1659c4]'
                    : isLight
                    ? 'border-neutral-200 hover:border-neutral-300 bg-neutral-50'
                    : 'border-neutral-800 hover:border-neutral-700 bg-[#121316]'
                }`}
              >
                <Globe className={`w-5 h-5 mb-2 ${targetType === 'website' ? 'text-[#74aaff]' : 'text-neutral-400'}`} />
                <div>
                  <div className="font-semibold text-xs">A website</div>
                  <div className="text-[11px] text-neutral-500">Live web address</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTargetType('app')}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  targetType === 'app'
                    ? 'border-[#1659c4] bg-[#1659c4]/10 ring-1 ring-[#1659c4]'
                    : isLight
                    ? 'border-neutral-200 hover:border-neutral-300 bg-neutral-50'
                    : 'border-neutral-800 hover:border-neutral-700 bg-[#121316]'
                }`}
              >
                <AppWindow className={`w-5 h-5 mb-2 ${targetType === 'app' ? 'text-[#74aaff]' : 'text-neutral-400'}`} />
                <div>
                  <div className="font-semibold text-xs">An app</div>
                  <div className="text-[11px] text-neutral-500">Program or file</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTargetType('game')}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  targetType === 'game'
                    ? 'border-[#1659c4] bg-[#1659c4]/10 ring-1 ring-[#1659c4]'
                    : isLight
                    ? 'border-neutral-200 hover:border-neutral-300 bg-neutral-50'
                    : 'border-neutral-800 hover:border-neutral-700 bg-[#121316]'
                }`}
              >
                <Gamepad2 className={`w-5 h-5 mb-2 ${targetType === 'game' ? 'text-[#74aaff]' : 'text-neutral-400'}`} />
                <div>
                  <div className="font-semibold text-xs">A game</div>
                  <div className="text-[11px] text-neutral-500">Game folder or pak</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTargetType('fresh')}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  targetType === 'fresh'
                    ? 'border-[#1659c4] bg-[#1659c4]/10 ring-1 ring-[#1659c4]'
                    : isLight
                    ? 'border-neutral-200 hover:border-neutral-300 bg-neutral-50'
                    : 'border-neutral-800 hover:border-neutral-700 bg-[#121316]'
                }`}
              >
                <Sparkles className={`w-5 h-5 mb-2 ${targetType === 'fresh' ? 'text-[#74aaff]' : 'text-neutral-400'}`} />
                <div>
                  <div className="font-semibold text-xs">Nothing</div>
                  <div className="text-[11px] text-neutral-500">Start fresh from prompt</div>
                </div>
              </button>
            </div>

            {/* Target Input Field based on type */}
            {targetType === 'website' && (
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-400">Website address</label>
                <div className="relative">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com"
                    className={`w-full px-3.5 py-2 pl-9 rounded-xl border text-xs outline-none focus:border-[#1659c4] ${
                      isLight ? 'bg-neutral-50 border-neutral-300' : 'bg-[#121316] border-[#343436] text-white'
                    }`}
                  />
                  <Globe className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                </div>
              </div>
            )}

            {(targetType === 'app' || targetType === 'game') && (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropFile}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
                  pickedFile
                    ? 'border-emerald-500/60 bg-emerald-500/5'
                    : isLight
                    ? 'border-neutral-300 hover:border-neutral-400 bg-neutral-50'
                    : 'border-[#343436] hover:border-neutral-600 bg-[#121316]'
                }`}
                onClick={() => {
                  const simulated = targetType === 'game' ? 'snake-retro.pck' : 'calculator.exe';
                  setPickedFile(simulated);
                }}
              >
                <UploadCloud className="w-6 h-6 mx-auto mb-2 text-neutral-400" />
                {pickedFile ? (
                  <div className="text-xs">
                    <span className="font-semibold text-emerald-400">{pickedFile}</span> selected
                    <div className="text-[11px] text-neutral-500 mt-0.5">Click or drop another file to change</div>
                  </div>
                ) : (
                  <div className="text-xs text-neutral-400">
                    <span className="font-medium text-[#74aaff]">Choose {targetType === 'game' ? 'game package (.pck, .pak, .assets)' : 'executable (.exe, .dmg, .apk, .jar)'}</span> or drop it here
                  </div>
                )}
              </div>
            )}

            {/* Clean room vs Deep mode explanation banner */}
            <div
              className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                !deepMode
                  ? isLight
                    ? 'bg-blue-50/70 border-blue-200 text-blue-900'
                    : 'bg-blue-950/30 border-blue-900/60 text-blue-200'
                  : isLight
                  ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                  : 'bg-amber-950/30 border-amber-900/60 text-amber-200'
              }`}
            >
              {!deepMode ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-semibold">Clean room inspection</span>
                    <p className="text-[11px] opacity-85">
                      Nothing inside the original is read (no code, files or source). We inspect what a visitor sees, with clean-room evidence.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-semibold">Deep mode inspection active</span>
                    <p className="text-[11px] opacity-85">
                      The engine reads internal files, decompiles functions, and analyzes byte routines for your private study.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="h-px bg-inherit" />

          {/* STEP 2: Say what you want */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <span className="w-5 h-5 rounded-full bg-[#1659c4] text-white flex items-center justify-center text-[11px]">
                2
              </span>
              <span>Say what you want</span>
            </div>

            <div className="relative">
              <textarea
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                placeholder="For example: recreate this website with modern responsive cards and animations…"
                rows={3}
                className={`w-full p-3.5 rounded-xl border text-xs outline-none focus:border-[#1659c4] resize-none ${
                  isLight ? 'bg-neutral-50 border-neutral-300' : 'bg-[#121316] border-[#343436] text-white'
                }`}
              />
            </div>

            {/* Suggestions Chips */}
            {requestText.trim().length === 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {getSuggestions().map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setRequestText(s)}
                    className={`px-2.5 py-1 rounded-full text-[11px] border transition-colors ${
                      isLight
                        ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-700'
                        : 'bg-[#121316] hover:bg-[#1e2025] border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    + {s}
                  </button>
                ))}
              </div>
            )}

            {/* Game Engine & Assets Controls if Game */}
            {targetType === 'game' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Build with game engine</label>
                  <select
                    value={gameEngine}
                    onChange={(e) => setGameEngine(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                      isLight ? 'bg-neutral-50 border-neutral-300' : 'bg-[#121316] border-[#343436] text-white'
                    }`}
                  >
                    <option value="Godot 4.3 (Rust)">Godot 4.3 (Pure Rust / GDNative)</option>
                    <option value="Unity 6 (C#)">Unity 6 (C#)</option>
                    <option value="Unreal Engine 5 (C++)">Unreal Engine 5 (C++)</option>
                    <option value="Pure Rust (wgpu / macroquad)">Pure Rust (wgpu 2D)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-700/50 bg-[#121316]">
                  <div>
                    <div className="text-xs font-medium">Generate 2D/3D Assets</div>
                    <div className="text-[10px] text-neutral-500">Opt-in generated textures via fal.ai</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={generateAssets}
                    onChange={(e) => setGenerateAssets(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1659c4] focus:ring-0"
                  />
                </div>
              </div>
            )}

            {/* Builder Selector & Start Button */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-inherit">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-400">Built by:</span>
                <select
                  value={builderAI}
                  onChange={(e) => setBuilderAI(e.target.value)}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs outline-none font-medium ${
                    isLight ? 'bg-neutral-50 border-neutral-300' : 'bg-[#121316] border-[#343436] text-white'
                  }`}
                >
                  <option value="Claude Code">Claude Code (your local claude)</option>
                  <option value="OpenAI Codex">OpenAI Codex</option>
                  <option value="Anthropic Claude 3.7">Anthropic Claude 3.7</option>
                  <option value="OpenRouter">OpenRouter</option>
                  <option value="Local Ollama">Local Ollama / LM Studio</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleStart}
                disabled={!requestText.trim()}
                className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-xs shadow-md transition-all ${
                  requestText.trim()
                    ? 'bg-[#1659c4] hover:bg-[#2d81ff] text-white cursor-pointer active:scale-[0.98]'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Start</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Projects Quick-Access */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight">Recent Projects</h2>
            <span className="text-xs text-neutral-500">{projects.length} saved</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => selectProject(proj.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all hover:scale-[1.01] ${
                  isLight
                    ? 'bg-white border-neutral-300 hover:border-neutral-400'
                    : 'bg-[#1b1c1f] border-[#343436] hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-[#74aaff]">
                    {proj.target.kind}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium">
                    {proj.likeness_score}% alike
                  </span>
                </div>
                <div className="font-semibold text-xs truncate mb-1">{proj.name}</div>
                <div className="text-[11px] text-neutral-400 line-clamp-2 mb-2 leading-relaxed">
                  {proj.request}
                </div>
                <div className="text-[10px] text-neutral-500 flex items-center justify-between border-t border-inherit pt-2">
                  <span>{proj.stack.split(' ')[0]}</span>
                  <span className="text-[#74aaff] flex items-center gap-1 font-medium">
                    Open <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
