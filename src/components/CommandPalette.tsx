import React, { useState, useEffect } from 'react';
import { useCraft } from '../context/CraftContext';
import { Search, Terminal, ArrowRight, ShieldCheck, ShieldAlert, Sparkles, Microscope, Gamepad2, FileSearch } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    paletteOpen,
    setPaletteOpen,
    tools,
    runTool,
    setScreen,
    deepMode,
    setDeepMode,
    theme,
    showToast
  } = useCraft();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isLight = theme === 'StudioLight';

  if (!paletteOpen) return null;

  const quickNav = [
    { id: 'nav-home', title: 'Go to Home / New project', category: 'Navigation', action: () => setScreen('Home') },
    { id: 'nav-workbench', title: 'Open Workbench (Advanced)', category: 'Navigation', action: () => setScreen('Workbench') },
    { id: 'nav-triage', title: 'Just look inside (Target Triage)', category: 'Navigation', action: () => setScreen('Ask') },
    { id: 'nav-game', title: 'Inspect Game files', category: 'Navigation', action: () => setScreen('GameFiles') },
    {
      id: 'nav-clean',
      title: deepMode ? 'Switch to Clean room mode' : 'Switch to Deep mode',
      category: 'Mode',
      action: () => {
        setDeepMode(!deepMode);
        showToast(!deepMode ? 'Deep mode active' : 'Clean room mode active');
      }
    }
  ];

  const matchedTools = tools
    .filter(
      (t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.id.toLowerCase().includes(query.toLowerCase()) ||
        t.summary.toLowerCase().includes(query.toLowerCase())
    )
    .map((t) => ({
      id: t.id,
      title: t.title,
      category: `Tool: ${t.toolset}`,
      deepOnly: t.deepOnly,
      action: () => runTool(t.id)
    }));

  const matchedNav = quickNav.filter((n) =>
    n.title.toLowerCase().includes(query.toLowerCase())
  );

  const allItems = [...matchedNav, ...matchedTools];

  const handleSelect = (idx: number) => {
    if (allItems[idx]) {
      allItems[idx].action();
      setPaletteOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-sm select-text"
      onClick={() => setPaletteOpen(false)}
    >
      <div
        className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col ${
          isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3 border-b border-inherit flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or tool name (e.g. 'decompile', 'strings', 'clean room')…"
            autoFocus
            className={`w-full text-sm outline-none bg-transparent ${
              isLight ? 'text-neutral-900 placeholder-neutral-400' : 'text-white placeholder-neutral-500'
            }`}
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-neutral-500/20 text-neutral-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 text-xs">
          {allItems.length === 0 ? (
            <div className="p-6 text-center text-neutral-500">No matching commands or tools</div>
          ) : (
            allItems.slice(0, 30).map((item, idx) => {
              const active = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-3 py-2 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                    active
                      ? 'bg-[#1659c4] text-white'
                      : isLight
                      ? 'hover:bg-neutral-100 text-neutral-800'
                      : 'hover:bg-[#25262a] text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Terminal className="w-4 h-4 shrink-0 text-[#74aaff]" />
                    <span className="font-medium truncate">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        active
                          ? 'bg-blue-400/20 text-blue-100'
                          : 'bg-neutral-500/10 text-neutral-500'
                      }`}
                    >
                      {item.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-3 py-2 border-t border-inherit text-[11px] text-neutral-500 flex justify-between">
          <span>Navigate with arrows, select with Enter</span>
          <span>Craft Anything Registry: 314 tools</span>
        </div>
      </div>
    </div>
  );
};
