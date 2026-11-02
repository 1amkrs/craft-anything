import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Screen,
  Mode,
  ThemeKind,
  ProjectManifest,
  ProjectStep,
  FeedItem,
  EvidenceRecord,
  UnknownRecord,
  FunctionItem,
  StringItem,
  ImportItem,
  SectionItem,
  ToolSpec,
  BackgroundJob,
  LogLine,
  SettingsState,
  RailKind,
  CenterTab,
  RightTab,
  BottomTab
} from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_STEPS,
  INITIAL_FEEDS,
  MOCK_EVIDENCE,
  MOCK_UNKNOWNS,
  MOCK_FUNCTIONS,
  MOCK_STRINGS,
  MOCK_IMPORTS,
  MOCK_SECTIONS,
  ENGINE_TOOLS_CATALOG,
  INITIAL_JOBS,
  INITIAL_LOGS
} from '../mock/engineData';

export interface ToastItem {
  id: string;
  text: string;
  isError: boolean;
}

interface CraftContextType {
  // Navigation & Modes
  screen: Screen;
  setScreen: (screen: Screen) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  theme: ThemeKind;
  setTheme: (theme: ThemeKind) => void;
  deepMode: boolean;
  setDeepMode: (deep: boolean) => void;
  sidebarFolded: boolean;
  setSidebarFolded: (folded: boolean | ((f: boolean) => boolean)) => void;

  // Projects
  projects: ProjectManifest[];
  activeProject: ProjectManifest | null;
  selectProject: (id: string) => void;
  createProject: (params: {
    name: string;
    request: string;
    targetKind: string;
    targetValue: string;
    stack?: string;
    builder?: string;
    generateAssets?: boolean;
    pictures?: string[];
  }) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  renameProject: (id: string, newName: string) => void;
  projectSteps: ProjectStep[];
  projectFeed: FeedItem[];
  addFeedMessage: (text: string, isJustAsk?: boolean) => void;
  answerQuestion: (feedId: string, option: string) => void;
  grantConsent: (feedId: string, choice: 'Once' | 'Always' | 'Deny') => void;

  // Workbench State
  railKind: RailKind;
  setRailKind: (k: RailKind) => void;
  centerTab: CenterTab;
  setCenterTab: (t: CenterTab) => void;
  rightTab: RightTab;
  setRightTab: (t: RightTab) => void;
  bottomTab: BottomTab;
  setBottomTab: (t: BottomTab) => void;
  bottomOpen: boolean;
  setBottomOpen: (open: boolean) => void;
  
  // Workbench Data
  functions: FunctionItem[];
  selectedFunction: FunctionItem | null;
  setSelectedFunction: (f: FunctionItem | null) => void;
  strings: StringItem[];
  imports: ImportItem[];
  sections: SectionItem[];
  evidence: EvidenceRecord[];
  unknowns: UnknownRecord[];
  jobs: BackgroundJob[];
  logs: LogLine[];
  addLog: (level: 'info' | 'warn' | 'error', text: string) => void;

  // Tools & Command Palette
  tools: ToolSpec[];
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  runTool: (toolId: string) => void;

  // Triage Mode (Ask / Just Look Inside)
  triageTarget: { name: string; size: number; sha256: string; kind: string } | null;
  setTriageTarget: (t: { name: string; size: number; sha256: string; kind: string } | null) => void;

  // Modals & Toasts
  activeModal: string | null;
  openModal: (modalName: string) => void;
  closeModal: () => void;
  toasts: ToastItem[];
  showToast: (text: string, isError?: boolean) => void;
  dismissToast: (id: string) => void;

  // Settings
  settings: SettingsState;
  updateSettings: (partial: Partial<SettingsState>) => void;

  // Pinned builds
  pinnedProjectIds: string[];
  togglePinProject: (id: string) => void;
}

const CraftContext = createContext<CraftContextType | null>(null);

export const CraftProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<Screen>('Home');
  const [mode, setMode] = useState<Mode>('Beginner');
  const [theme, setTheme] = useState<ThemeKind>('Studio');
  const [deepMode, setDeepMode] = useState<boolean>(false);
  const [sidebarFolded, setSidebarFolded] = useState<boolean>(false);

  const [projects, setProjects] = useState<ProjectManifest[]>(INITIAL_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string>('proj-example-web');
  const [stepsMap, setStepsMap] = useState<Record<string, ProjectStep[]>>(INITIAL_STEPS);
  const [feedsMap, setFeedsMap] = useState<Record<string, FeedItem[]>>(INITIAL_FEEDS);
  const [pinnedProjectIds, setPinnedProjectIds] = useState<string[]>(['proj-example-web']);

  // Workbench State
  const [railKind, setRailKind] = useState<RailKind>('Functions');
  const [centerTab, setCenterTab] = useState<CenterTab>('PseudoC');
  const [rightTab, setRightTab] = useState<RightTab>('Inspector');
  const [bottomTab, setBottomTab] = useState<BottomTab>('Agent');
  const [bottomOpen, setBottomOpen] = useState<boolean>(true);

  const [functions] = useState<FunctionItem[]>(MOCK_FUNCTIONS);
  const [selectedFunction, setSelectedFunction] = useState<FunctionItem | null>(MOCK_FUNCTIONS[1]);
  const [strings] = useState<StringItem[]>(MOCK_STRINGS);
  const [imports] = useState<ImportItem[]>(MOCK_IMPORTS);
  const [sections] = useState<SectionItem[]>(MOCK_SECTIONS);
  const [evidence, setEvidence] = useState<EvidenceRecord[]>(MOCK_EVIDENCE);
  const [unknowns, setUnknowns] = useState<UnknownRecord[]>(MOCK_UNKNOWNS);
  const [jobs, setJobs] = useState<BackgroundJob[]>(INITIAL_JOBS);
  const [logs, setLogs] = useState<LogLine[]>(INITIAL_LOGS);
  const [tools] = useState<ToolSpec[]>(ENGINE_TOOLS_CATALOG);

  const [paletteOpen, setPaletteOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [triageTarget, setTriageTarget] = useState<{ name: string; size: number; sha256: string; kind: string } | null>(null);

  const [settings, setSettings] = useState<SettingsState>({
    mode: 'Beginner',
    theme: 'Studio',
    language: 'en',
    deepMode: false,
    projectsDir: '~/Documents/Craft Anything',
    ghidraInstalled: false,
    ghidraPath: '/opt/ghidra',
    builderAI: 'Claude Code',
    anthropicApiKey: '',
    openaiApiKey: '',
    falAiApiKey: '',
    parallelBuilds: 2,
    maxRounds: 4,
    goodEnoughScore: 95,
    purpose: 'OwnOrAuthorized'
  });

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0] || null;
  const projectSteps = (activeProject && stepsMap[activeProject.id]) || [];
  const projectFeed = (activeProject && feedsMap[activeProject.id]) || [];

  const showToast = (text: string, isError = false) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev.slice(-3), { id, text, isError }]);
    if (!isError) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 4000);
    }
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addLog = (level: 'info' | 'warn' | 'error', text: string) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setLogs(prev => [...prev.slice(-200), { id: `log-${Date.now()}`, time, level, text }]);
  };

  // Keyboard shortcut for command palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape' && paletteOpen) {
        setPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paletteOpen]);

  const selectProject = (id: string) => {
    setActiveProjectId(id);
    setScreen('Project');
    showToast(`Opened project: ${projects.find(p => p.id === id)?.name || id}`);
  };

  const togglePinProject = (id: string) => {
    setPinnedProjectIds(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    showToast(pinnedProjectIds.includes(id) ? 'Pin removed' : 'Build pinned');
  };

  const createProject = (params: {
    name: string;
    request: string;
    targetKind: string;
    targetValue: string;
    stack?: string;
    builder?: string;
    generateAssets?: boolean;
    pictures?: string[];
  }) => {
    const id = `proj-${Date.now()}`;
    const newManifest: ProjectManifest = {
      id,
      name: params.name || 'New Rebuild Project',
      request: params.request,
      target: {
        kind: (params.targetKind as any) || 'Website',
        url: params.targetKind === 'Website' ? params.targetValue : undefined,
        name: params.targetValue || 'Custom Target'
      },
      stack: params.stack || (params.targetKind === 'Game' ? 'Godot 4.3 (Rust)' : 'React + Tailwind CSS + Vite'),
      builder: params.builder || 'Claude Code',
      status: 'Building',
      created_ms: Date.now(),
      updated_ms: Date.now(),
      rounds: 1,
      max_rounds: 3,
      likeness_score: 72,
      asset_budget_usd: params.generateAssets ? 10.0 : 0,
      generate_assets: !!params.generateAssets
    };

    const initialSteps: ProjectStep[] = [
      { id: 'study', label: '1. Study', state: 'active', detail: 'Inspecting target components, color palette and layout' },
      { id: 'build', label: '2. Build', state: 'pending', detail: 'Coding agent scaffolding solution' },
      { id: 'check', label: '3. Check', state: 'pending', detail: 'Multi-viewport likeness check' },
      { id: 'ready', label: '4. Ready', state: 'pending', detail: 'Building binary / web preview' }
    ];

    const initialFeed: FeedItem[] = [
      {
        id: `f-${Date.now()}-1`,
        type: 'user',
        timestamp: Date.now(),
        text: params.request
      },
      {
        id: `f-${Date.now()}-2`,
        type: 'status',
        timestamp: Date.now() + 500,
        text: `Starting clean-room inspection of ${params.targetValue}`
      },
      {
        id: `f-${Date.now()}-3`,
        type: 'tool',
        timestamp: Date.now() + 1500,
        toolName: 'core_target_triage',
        toolSummary: `Verified target ${params.targetValue}. Identified stack: ${newManifest.stack}`
      }
    ];

    setProjects(prev => [newManifest, ...prev]);
    setStepsMap(prev => ({ ...prev, [id]: initialSteps }));
    setFeedsMap(prev => ({ ...prev, [id]: initialFeed }));
    setActiveProjectId(id);
    setScreen('Project');
    showToast(`Project "${newManifest.name}" created. Study started!`);
    addLog('info', `Project ${newManifest.name} (${id}) initiated with builder ${newManifest.builder}`);

    // Simulate agent progression
    setTimeout(() => {
      setStepsMap(prev => {
        const curr = prev[id] || initialSteps;
        return {
          ...prev,
          [id]: [
            { ...curr[0], state: 'done', detail: 'Layout extracted: 14 primary components, typography and color tokens' },
            { ...curr[1], state: 'active', detail: 'Agent generating code in workspace' },
            curr[2],
            curr[3]
          ]
        };
      });

      setFeedsMap(prev => ({
        ...prev,
        [id]: [
          ...(prev[id] || []),
          {
            id: `f-${Date.now()}-4`,
            type: 'assistant',
            timestamp: Date.now(),
            text: `I completed the study of "${params.targetValue}". Next, I am generating the project structure using ${newManifest.stack}.`
          }
        ]
      }));
    }, 2500);

    setTimeout(() => {
      setStepsMap(prev => {
        const curr = prev[id] || initialSteps;
        return {
          ...prev,
          [id]: [
            curr[0],
            { ...curr[1], state: 'done', detail: 'Components and test harness generated' },
            { ...curr[2], state: 'active', detail: 'Running checks at 375px, 768px, 1280px widths' },
            curr[3]
          ]
        };
      });

      setFeedsMap(prev => ({
        ...prev,
        [id]: [
          ...(prev[id] || []),
          {
            id: `f-${Date.now()}-5`,
            type: 'check',
            timestamp: Date.now(),
            checkResult: {
              overallLikeness: 95,
              viewports: [
                { width: 375, name: 'Mobile (375px)', likeness: 96, differences: ['Header layout aligned'] },
                { width: 768, name: 'Tablet (768px)', likeness: 94, differences: ['Card grid responsiveness verified'] },
                { width: 1280, name: 'Desktop (1280px)', likeness: 95, differences: ['Visual likeness matches target'] }
              ]
            }
          }
        ]
      }));
    }, 5500);

    setTimeout(() => {
      setStepsMap(prev => {
        const curr = prev[id] || initialSteps;
        return {
          ...prev,
          [id]: [
            curr[0],
            curr[1],
            { ...curr[2], state: 'done', detail: 'Visual and behavioral checks passed (95% likeness)' },
            { ...curr[3], state: 'done', detail: 'Build ready! Running on local preview port 3000' }
          ]
        };
      });

      setProjects(prev =>
        prev.map(p => (p.id === id ? { ...p, status: 'Ready', likeness_score: 95, updated_ms: Date.now() } : p))
      );

      setFeedsMap(prev => ({
        ...prev,
        [id]: [
          ...(prev[id] || []),
          {
            id: `f-${Date.now()}-6`,
            type: 'assistant',
            timestamp: Date.now(),
            text: 'Your version is ready! You can click "Open Preview" or type below to request tweaks.'
          }
        ]
      }));

      showToast(`Build for "${newManifest.name}" is Ready!`);
    }, 8500);
  };

  const deleteProject = (id: string) => {
    const toDelete = projects.find(p => p.id === id);
    setProjects(prev => prev.filter(p => p.id !== id));
    if (activeProjectId === id) {
      const remaining = projects.filter(p => p.id !== id);
      if (remaining.length > 0) {
        setActiveProjectId(remaining[0].id);
      } else {
        setScreen('Home');
      }
    }
    showToast(`Project "${toDelete?.name || id}" removed.`);
  };

  const duplicateProject = (id: string) => {
    const orig = projects.find(p => p.id === id);
    if (!orig) return;
    const newId = `proj-${Date.now()}`;
    const copy: ProjectManifest = {
      ...orig,
      id: newId,
      name: `${orig.name} (Copy)`,
      created_ms: Date.now(),
      updated_ms: Date.now()
    };
    setProjects(prev => [copy, ...prev]);
    setStepsMap(prev => ({ ...prev, [newId]: stepsMap[id] ? [...stepsMap[id]] : [] }));
    setFeedsMap(prev => ({ ...prev, [newId]: feedsMap[id] ? [...feedsMap[id]] : [] }));
    showToast(`Project duplicated as "${copy.name}".`);
  };

  const renameProject = (id: string, newName: string) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, name: newName } : p)));
    showToast(`Project renamed to "${newName}".`);
  };

  const addFeedMessage = (text: string, isJustAsk = false) => {
    if (!activeProject || !text.trim()) return;
    const projId = activeProject.id;
    const userItem: FeedItem = {
      id: `f-msg-${Date.now()}`,
      type: 'user',
      timestamp: Date.now(),
      text
    };

    setFeedsMap(prev => ({
      ...prev,
      [projId]: [...(prev[projId] || []), userItem]
    }));

    if (isJustAsk) {
      // Just Ask mode: answer without modifying code
      setTimeout(() => {
        const replyItem: FeedItem = {
          id: `f-reply-${Date.now()}`,
          type: 'assistant',
          timestamp: Date.now(),
          text: `[Just Ask Mode]: Based on the study of ${activeProject.name}, ${text.toLowerCase().includes('how') ? 'this logic operates in a separate thread and syncs state via message passing' : 'the architecture isolates business rules from presentation layer, keeping dependencies clean.'}`
        };
        setFeedsMap(prev => ({
          ...prev,
          [projId]: [...(prev[projId] || []), replyItem]
        }));
      }, 900);
    } else {
      // Rebuild modification mode
      setTimeout(() => {
        const toolItem: FeedItem = {
          id: `f-tool-${Date.now()}`,
          type: 'tool',
          timestamp: Date.now(),
          toolName: 'code_builder_refine',
          toolSummary: `Refining build according to prompt: "${text}"`
        };
        const replyItem: FeedItem = {
          id: `f-reply-${Date.now()}`,
          type: 'assistant',
          timestamp: Date.now() + 500,
          text: `I made the requested adjustments to "${activeProject.name}". The changes have been compiled and verified.`
        };
        setFeedsMap(prev => ({
          ...prev,
          [projId]: [...(prev[projId] || []), toolItem, replyItem]
        }));
        showToast('Project updated and re-verified');
      }, 1500);
    }
  };

  const answerQuestion = (feedId: string, option: string) => {
    if (!activeProject) return;
    const projId = activeProject.id;
    setFeedsMap(prev => {
      const items = prev[projId] || [];
      return {
        ...prev,
        [projId]: items.map(item =>
          item.id === feedId && item.question
            ? { ...item, question: { ...item.question, selected: option } }
            : item
        )
      };
    });
    showToast(`Selected answer: "${option}"`);
    setTimeout(() => {
      setFeedsMap(prev => ({
        ...prev,
        [projId]: [
          ...(prev[projId] || []),
          {
            id: `f-ans-reply-${Date.now()}`,
            type: 'assistant',
            timestamp: Date.now(),
            text: `Got it. Applying "${option}" to the project configuration and continuing build.`
          }
        ]
      }));
    }, 800);
  };

  const grantConsent = (feedId: string, choice: 'Once' | 'Always' | 'Deny') => {
    if (!activeProject) return;
    const projId = activeProject.id;
    setFeedsMap(prev => {
      const items = prev[projId] || [];
      return {
        ...prev,
        [projId]: items.map(item =>
          item.id === feedId && item.consent
            ? { ...item, consent: { ...item.consent, answered: choice } }
            : item
        )
      };
    });
    showToast(choice === 'Deny' ? 'Action denied.' : `Consent granted: ${choice}`);
  };

  const runTool = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (!tool) return;
    if (tool.deepOnly && !deepMode) {
      showToast(`Tool "${tool.title}" requires Deep Mode.`, true);
      openModal('DeepMode');
      return;
    }
    showToast(`Running ${tool.title}…`);
    addLog('info', `Executed tool ${tool.id} (${tool.title})`);

    const newJob: BackgroundJob = {
      id: `job-${Date.now()}`,
      name: `Running ${tool.title}`,
      progress: 0,
      cancellable: true,
      status: 'running',
      startedAt: Date.now()
    };
    setJobs(prev => [newJob, ...prev]);

    setTimeout(() => {
      setJobs(prev =>
        prev.map(j => (j.id === newJob.id ? { ...j, progress: 100, status: 'completed' } : j))
      );
      showToast(`Finished ${tool.title}`);
    }, 1200);
  };

  const openModal = (modalName: string) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  const updateSettings = (partial: Partial<SettingsState>) => {
    setSettings(prev => ({ ...prev, ...partial }));
    if (partial.mode !== undefined) setMode(partial.mode);
    if (partial.theme !== undefined) setTheme(partial.theme);
    if (partial.deepMode !== undefined) setDeepMode(partial.deepMode);
    showToast('Settings updated.');
  };

  return (
    <CraftContext.Provider
      value={{
        screen,
        setScreen,
        mode,
        setMode,
        theme,
        setTheme,
        deepMode,
        setDeepMode,
        sidebarFolded,
        setSidebarFolded,

        projects,
        activeProject,
        selectProject,
        createProject,
        deleteProject,
        duplicateProject,
        renameProject,
        projectSteps,
        projectFeed,
        addFeedMessage,
        answerQuestion,
        grantConsent,

        railKind,
        setRailKind,
        centerTab,
        setCenterTab,
        rightTab,
        setRightTab,
        bottomTab,
        setBottomTab,
        bottomOpen,
        setBottomOpen,

        functions,
        selectedFunction,
        setSelectedFunction,
        strings,
        imports,
        sections,
        evidence,
        unknowns,
        jobs,
        logs,
        addLog,

        tools,
        paletteOpen,
        setPaletteOpen,
        runTool,

        triageTarget,
        setTriageTarget,

        activeModal,
        openModal,
        closeModal,
        toasts,
        showToast,
        dismissToast,

        settings,
        updateSettings,

        pinnedProjectIds,
        togglePinProject
      }}
    >
      {children}
    </CraftContext.Provider>
  );
};

export const useCraft = () => {
  const ctx = useContext(CraftContext);
  if (!ctx) throw new Error('useCraft must be used within a CraftProvider');
  return ctx;
};
