import React, { useState } from 'react';
import { useCraft } from '../context/CraftContext';
import {
  Plus,
  Microscope,
  Gamepad2,
  FileSearch,
  Pin,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Trash2,
  Copy,
  Edit2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Play
} from 'lucide-react';
import { ProjectManifest } from '../types';

export const Sidebar: React.FC = () => {
  const {
    screen,
    setScreen,
    projects,
    activeProject,
    selectProject,
    deleteProject,
    duplicateProject,
    renameProject,
    sidebarFolded,
    setSidebarFolded,
    openModal,
    pinnedProjectIds,
    theme,
    mode
  } = useCraft();

  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState<string>('');

  const isLight = theme === 'StudioLight';

  const formatAgo = (timestamp: number) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const getStatusBadge = (status: ProjectManifest['status']) => {
    switch (status) {
      case 'Ready':
        return <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0" title="Ready" />;
      case 'Building':
        return <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block shrink-0" title="Building" />;
      case 'Needs you':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
            {!sidebarFolded && <span>Needs you</span>}
          </span>
        );
      case 'Interrupted':
        return <span className="w-2 h-2 rounded-full bg-red-500 inline-block shrink-0" title="Interrupted" />;
      default:
        return null;
    }
  };

  const pinnedProjects = projects.filter(p => pinnedProjectIds.includes(p.id));

  return (
    <aside
      className={`flex flex-col border-r select-none transition-all duration-200 z-20 shrink-0 relative ${
        sidebarFolded ? 'w-14' : 'w-64'
      } ${
        isLight
          ? 'bg-[#f1f1ef] border-[#e2e2df] text-[#16171a]'
          : 'bg-[#101014] border-[#242527] text-[#f2f1ee]'
      }`}
    >
      {/* Top Header / Collapse Button */}
      <div className="h-10 px-2.5 flex items-center justify-between border-b border-inherit">
        {!sidebarFolded && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            Explorer
          </span>
        )}
        <button
          onClick={() => setSidebarFolded(f => !f)}
          className={`p-1 rounded hover:bg-neutral-500/15 text-neutral-400 hover:text-neutral-200 transition-colors ${
            sidebarFolded ? 'mx-auto' : ''
          }`}
          title={sidebarFolded ? 'Expand sidebar' : 'Fold sidebar'}
        >
          {sidebarFolded ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation Actions */}
      <div className="p-2 space-y-1">
        {/* + New project */}
        <button
          onClick={() => setScreen('Home')}
          className={`w-full flex items-center gap-2.5 px-2.5 py-1.8 rounded-lg text-xs font-medium transition-all ${
            screen === 'Home'
              ? 'bg-[#1659c4] text-white shadow-sm'
              : isLight
              ? 'hover:bg-neutral-200 text-neutral-700'
              : 'hover:bg-[#1b1c1f] text-neutral-300'
          }`}
          title="Create a new rebuild or study project"
        >
          <Plus className="w-4 h-4 shrink-0" />
          {!sidebarFolded && <span>New project</span>}
        </button>

        {/* Workbench (Advanced) */}
        <button
          onClick={() => setScreen('Workbench')}
          className={`w-full flex items-center gap-2.5 px-2.5 py-1.8 rounded-lg text-xs font-medium transition-all ${
            screen === 'Workbench'
              ? 'bg-[#1659c4] text-white shadow-sm'
              : isLight
              ? 'hover:bg-neutral-200 text-neutral-700'
              : 'hover:bg-[#1b1c1f] text-neutral-300'
          }`}
          title="Open advanced reverse-engineering workbench"
        >
          <Microscope className="w-4 h-4 shrink-0" />
          {!sidebarFolded && (
            <span className="flex items-center justify-between flex-1">
              <span>Workbench</span>
              {mode === 'Beginner' && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-neutral-500/20 text-neutral-400">
                  Adv
                </span>
              )}
            </span>
          )}
        </button>

        {/* Target Triage / Just Look Inside */}
        <button
          onClick={() => setScreen('Ask')}
          className={`w-full flex items-center gap-2.5 px-2.5 py-1.8 rounded-lg text-xs font-medium transition-all ${
            screen === 'Ask'
              ? 'bg-[#1659c4] text-white shadow-sm'
              : isLight
              ? 'hover:bg-neutral-200 text-neutral-700'
              : 'hover:bg-[#1b1c1f] text-neutral-300'
          }`}
          title="Triage: inspect files or website without rebuilding"
        >
          <FileSearch className="w-4 h-4 shrink-0" />
          {!sidebarFolded && <span>Just look inside</span>}
        </button>

        {/* Game Files Inspector */}
        <button
          onClick={() => setScreen('GameFiles')}
          className={`w-full flex items-center gap-2.5 px-2.5 py-1.8 rounded-lg text-xs font-medium transition-all ${
            screen === 'GameFiles'
              ? 'bg-[#1659c4] text-white shadow-sm'
              : isLight
              ? 'hover:bg-neutral-200 text-neutral-700'
              : 'hover:bg-[#1b1c1f] text-neutral-300'
          }`}
          title="Game files: pak, unity, unreal archives"
        >
          <Gamepad2 className="w-4 h-4 shrink-0" />
          {!sidebarFolded && <span>Game files</span>}
        </button>
      </div>

      <div className="h-px bg-inherit my-1" />

      {/* Pinned Section */}
      {pinnedProjects.length > 0 && (
        <div className="px-2 py-1">
          {!sidebarFolded && (
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1">
                <Pin className="w-3 h-3 text-[#74aaff]" />
                Pinned builds
              </span>
            </div>
          )}
          <div className="space-y-0.5">
            {pinnedProjects.map(p => (
              <button
                key={`pin-${p.id}`}
                onClick={() => selectProject(p.id)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                  activeProject?.id === p.id && screen === 'Project'
                    ? isLight
                      ? 'bg-neutral-200 text-neutral-900 font-semibold'
                      : 'bg-[#1b1c1f] text-white font-semibold'
                    : isLight
                    ? 'hover:bg-neutral-200/60 text-neutral-700'
                    : 'hover:bg-[#1b1c1f]/60 text-neutral-400'
                }`}
                title={p.name}
              >
                <Play className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {!sidebarFolded && (
                  <span className="truncate flex-1 font-mono text-[11px]">{p.name}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5 min-h-0">
        {!sidebarFolded && (
          <div className="flex items-center justify-between px-2 mb-1 mt-1">
            <span className="text-[11px] font-semibold text-neutral-400">Projects</span>
            <span className="text-[10px] text-neutral-500 font-mono">{projects.length}</span>
          </div>
        )}

        {projects.length === 0 && !sidebarFolded && (
          <div className="px-3 py-6 text-center text-xs text-neutral-500">
            No projects yet. Click "+ New project" to start!
          </div>
        )}

        {projects.map(proj => {
          const isActive = activeProject?.id === proj.id && screen === 'Project';
          return (
            <div key={proj.id} className="relative group">
              {renamingId === proj.id ? (
                <div className="p-1">
                  <input
                    type="text"
                    value={renameValue}
                    onChange={e => setRenameValue(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        if (renameValue.trim()) renameProject(proj.id, renameValue.trim());
                        setRenamingId(null);
                      } else if (e.key === 'Escape') {
                        setRenamingId(null);
                      }
                    }}
                    onBlur={() => {
                      if (renameValue.trim()) renameProject(proj.id, renameValue.trim());
                      setRenamingId(null);
                    }}
                    autoFocus
                    className={`w-full px-2 py-1 text-xs rounded border outline-none ${
                      isLight ? 'bg-white border-blue-500' : 'bg-neutral-900 border-blue-500 text-white'
                    }`}
                  />
                </div>
              ) : (
                <div
                  onClick={() => selectProject(proj.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.8 rounded-lg text-xs cursor-pointer transition-colors ${
                    isActive
                      ? isLight
                        ? 'bg-neutral-200 text-neutral-900 font-semibold'
                        : 'bg-[#1b1c1f] text-white font-semibold'
                      : isLight
                      ? 'hover:bg-neutral-200/60 text-neutral-700'
                      : 'hover:bg-[#1b1c1f]/60 text-neutral-400'
                  }`}
                  title={`${proj.name} — ${proj.request}`}
                >
                  <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                    {getStatusBadge(proj.status)}
                    {!sidebarFolded && (
                      <div className="truncate flex-1 min-w-0">
                        <div className="truncate leading-tight">{proj.name}</div>
                        <div className="text-[10px] text-neutral-500 truncate flex items-center gap-1.5 mt-0.5">
                          <span>{proj.stack.split(' ')[0]}</span>
                          <span>•</span>
                          <span>{formatAgo(proj.updated_ms)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {!sidebarFolded && (
                    <div className="opacity-0 group-hover:opacity-100 flex items-center transition-opacity ml-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenId(menuOpenId === proj.id ? null : proj.id);
                        }}
                        className="p-1 rounded hover:bg-neutral-500/20 text-neutral-400 hover:text-neutral-200"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Context menu for project */}
              {menuOpenId === proj.id && (
                <div
                  className={`absolute right-1 top-8 w-36 rounded-lg shadow-xl border py-1 text-xs z-50 ${
                    isLight ? 'bg-white border-neutral-300 text-neutral-800' : 'bg-[#1b1c1f] border-neutral-700 text-neutral-200'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      setRenameValue(proj.name);
                      setRenamingId(proj.id);
                      setMenuOpenId(null);
                    }}
                    className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-neutral-500/15"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Rename</span>
                  </button>
                  <button
                    onClick={() => {
                      duplicateProject(proj.id);
                      setMenuOpenId(null);
                    }}
                    className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-neutral-500/15"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Duplicate</span>
                  </button>
                  <div className="h-px bg-neutral-500/20 my-1" />
                  <button
                    onClick={() => {
                      deleteProject(proj.id);
                      setMenuOpenId(null);
                    }}
                    className="w-full px-3 py-1.5 text-left flex items-center gap-2 text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Settings Button */}
      <div className="p-2 border-t border-inherit shrink-0">
        <button
          onClick={() => openModal('Settings')}
          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
            isLight ? 'hover:bg-neutral-200 text-neutral-700' : 'hover:bg-[#1b1c1f] text-neutral-300'
          }`}
          title="Open application settings"
        >
          <SettingsIcon className="w-4 h-4 shrink-0" />
          {!sidebarFolded && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
};
