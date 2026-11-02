import React, { useState } from 'react';
import { useCraft } from '../../context/CraftContext';
import {
  Gamepad2,
  FolderOpen,
  Package,
  FileImage,
  Music,
  Code,
  Download,
  Search,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ArchiveItem {
  id: string;
  name: string;
  path: string;
  kind: 'Texture' | 'Mesh' | 'Audio' | 'Script' | 'Scene';
  size: string;
  format: string;
  extracted?: boolean;
}

export const GameFilesScreen: React.FC = () => {
  const { theme, showToast, deepMode, openModal } = useCraft();
  const isLight = theme === 'StudioLight';

  const [selectedArchive, setSelectedArchive] = useState<string>('snake-retro.pck');
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [items, setItems] = useState<ArchiveItem[]>([
    { id: '1', name: 'snake_head.png', path: 'res://textures/snake_head.png', kind: 'Texture', size: '24 KB', format: 'PNG' },
    { id: '2', name: 'snake_body.png', path: 'res://textures/snake_body.png', kind: 'Texture', size: '18 KB', format: 'PNG' },
    { id: '3', name: 'apple_glow.png', path: 'res://textures/apple_glow.png', kind: 'Texture', size: '32 KB', format: 'PNG' },
    { id: '4', name: 'eat_crunch.wav', path: 'res://audio/sfx/eat_crunch.wav', kind: 'Audio', size: '142 KB', format: 'WAV' },
    { id: '5', name: 'game_over.wav', path: 'res://audio/sfx/game_over.wav', kind: 'Audio', size: '210 KB', format: 'WAV' },
    { id: '6', name: 'snake_game.gd', path: 'res://scripts/snake_game.gd', kind: 'Script', size: '12 KB', format: 'GDScript' },
    { id: '7', name: 'MainScene.tscn', path: 'res://scenes/MainScene.tscn', kind: 'Scene', size: '8 KB', format: 'Godot Scene' }
  ]);

  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(items[0]);

  const filteredItems = items.filter(
    (i) =>
      i.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      i.path.toLowerCase().includes(filterQuery.toLowerCase()) ||
      i.kind.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleExport = (item: ArchiveItem) => {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, extracted: true } : i))
    );
    showToast(`Exported "${item.name}" to project assets folder.`);
  };

  const getKindIcon = (kind: ArchiveItem['kind']) => {
    switch (kind) {
      case 'Texture':
        return <FileImage className="w-4 h-4 text-emerald-400" />;
      case 'Audio':
        return <Music className="w-4 h-4 text-purple-400" />;
      case 'Script':
        return <Code className="w-4 h-4 text-blue-400" />;
      default:
        return <Package className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden select-text">
      {/* Left: Archives List & Filters */}
      <div
        className={`w-full md:w-72 border-r flex flex-col shrink-0 ${
          isLight ? 'bg-neutral-50 border-[#e2e2df]' : 'bg-[#121316] border-[#242527]'
        }`}
      >
        <div className="p-3 border-b border-inherit space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Gamepad2 className="w-4 h-4 text-[#74aaff]" />
            <span>Game Archives</span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter game assets…"
              className={`w-full px-2.5 py-1.5 pl-8 rounded-lg border text-xs outline-none ${
                isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436] text-white'
              }`}
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2" />
          </div>
        </div>

        {/* Archives Selector */}
        <div className="p-2 border-b border-inherit space-y-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 px-1">
            Detected Packages
          </span>
          <button
            onClick={() => setSelectedArchive('snake-retro.pck')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
              selectedArchive === 'snake-retro.pck'
                ? 'bg-[#1659c4] text-white'
                : 'text-neutral-400 hover:bg-neutral-500/10'
            }`}
          >
            <span className="truncate">snake-retro.pck</span>
            <span className="text-[10px] opacity-75">Godot 4</span>
          </button>
          <button
            onClick={() => setSelectedArchive('game_data.pak')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
              selectedArchive === 'game_data.pak'
                ? 'bg-[#1659c4] text-white'
                : 'text-neutral-400 hover:bg-neutral-500/10'
            }`}
          >
            <span className="truncate">game_data.pak</span>
            <span className="text-[10px] opacity-75">Unreal 5</span>
          </button>
        </div>

        {/* Files in Archive */}
        <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5 text-xs">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`px-2.5 py-2 rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                selectedItem?.id === item.id
                  ? isLight
                    ? 'bg-neutral-200 text-neutral-900 font-semibold'
                    : 'bg-[#1b1c1f] text-white font-semibold'
                  : 'text-neutral-400 hover:bg-neutral-500/10'
              }`}
            >
              <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                {getKindIcon(item.kind)}
                <div className="truncate">
                  <div className="truncate text-xs">{item.name}</div>
                  <div className="text-[10px] text-neutral-500 font-mono truncate">{item.size}</div>
                </div>
              </div>
              {item.extracted && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Selected Asset Inspector & Exporter */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto space-y-5">
        {selectedItem ? (
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {getKindIcon(selectedItem.kind)}
                  <span>{selectedItem.name}</span>
                </h2>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">{selectedItem.path}</p>
              </div>

              <button
                onClick={() => handleExport(selectedItem)}
                className="px-4 py-2 rounded-xl bg-[#1659c4] hover:bg-[#2d81ff] text-white text-xs font-medium flex items-center gap-1.5 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Export Asset</span>
              </button>
            </div>

            {/* Asset Preview Box */}
            <div
              className={`p-6 rounded-2xl border flex flex-col items-center justify-center min-h-60 ${
                isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436]'
              }`}
            >
              {selectedItem.kind === 'Texture' ? (
                <div className="space-y-4 text-center">
                  <div className="w-32 h-32 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center p-4 shadow-inner">
                    <span className="text-5xl">🍏</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    32x32 RGBA8 Texture Asset
                  </div>
                </div>
              ) : selectedItem.kind === 'Audio' ? (
                <div className="space-y-3 text-center">
                  <Music className="w-12 h-12 text-purple-400 mx-auto" />
                  <div className="text-xs font-mono text-neutral-300">44.1 kHz 16-bit PCM Audio</div>
                  <button
                    onClick={() => showToast('Playing audio sample…')}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-white"
                  >
                    ▶ Test Audio Playback
                  </button>
                </div>
              ) : (
                <div className="w-full text-left font-mono text-xs text-blue-300 bg-neutral-950 p-4 rounded-xl overflow-x-auto">
                  {`extends Node2D

var snake_speed = 60.0
var score = 0

func _ready():
    print("Snake controller online.")
    connect("body_entered", self, "_on_apple_collision")

func _on_apple_collision():
    score += 10
    $AudioStreamPlayer.play()`}
                </div>
              )}
            </div>

            {/* Metadata Table */}
            <div
              className={`p-4 rounded-xl border space-y-2 text-xs ${
                isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436]'
              }`}
            >
              <div className="font-semibold text-neutral-300 mb-2">Package Extraction Metadata</div>
              <div className="grid grid-cols-2 gap-2 text-neutral-400">
                <div>Format: <span className="font-mono text-white">{selectedItem.format}</span></div>
                <div>Size: <span className="font-mono text-white">{selectedItem.size}</span></div>
                <div>Package: <span className="font-mono text-white">{selectedArchive}</span></div>
                <div>Status: <span className="text-emerald-400 font-medium">{selectedItem.extracted ? 'Exported' : 'Packed inside archive'}</span></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-neutral-500">
            Select an asset from the left to inspect or export.
          </div>
        )}
      </div>
    </div>
  );
};
