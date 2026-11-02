// Types matching Craft Anything engine, UI state, and workflows

export type Mode = 'Beginner' | 'Experienced';
export type ThemeKind = 'Studio' | 'StudioLight';

export type Screen = 'Home' | 'Ask' | 'Project' | 'GameFiles' | 'Workbench';

export type TargetKind =
  | 'Website'
  | 'Native'
  | 'Game'
  | 'Electron'
  | 'Android'
  | 'DotNet'
  | 'Java'
  | 'Firmware'
  | 'Pcap'
  | 'None';

export type Confidence = 'Observed' | 'Derived' | 'Inferred';

export interface TargetRef {
  kind: TargetKind;
  url?: string;
  path?: string;
  name: string;
  size?: number;
  sha256?: string;
}

export interface ProjectManifest {
  id: string;
  name: string;
  request: string;
  target: TargetRef;
  stack: string;
  builder: string;
  status: 'Ready' | 'Building' | 'Needs you' | 'Interrupted';
  created_ms: number;
  updated_ms: number;
  rounds: number;
  max_rounds: number;
  likeness_score: number;
  asset_budget_usd: number;
  generate_assets: boolean;
}

export type StepState = 'pending' | 'active' | 'done' | 'failed';

export interface ProjectStep {
  id: 'study' | 'build' | 'check' | 'ready';
  label: string;
  state: StepState;
  detail: string;
}

export interface CheckViewport {
  width: number;
  name: string;
  likeness: number;
  originalImg?: string;
  rebuiltImg?: string;
  differences: string[];
}

export type FeedItemType =
  | 'user'
  | 'assistant'
  | 'tool'
  | 'status'
  | 'question'
  | 'consent'
  | 'error'
  | 'check';

export interface FeedItem {
  id: string;
  type: FeedItemType;
  timestamp: number;
  text?: string;
  toolName?: string;
  toolSummary?: string;
  evidenceId?: string;
  question?: {
    id: string;
    prompt: string;
    options: string[];
    selected?: string;
  };
  consent?: {
    id: string;
    action: string;
    title: string;
    description: string;
    answered?: 'Once' | 'Always' | 'Deny';
  };
  checkResult?: {
    overallLikeness: number;
    viewports: CheckViewport[];
  };
}

export interface EvidenceRecord {
  id: string;
  tool: string;
  summary: string;
  confidence: Confidence;
  coverage: string;
  limitations: string[];
  locations: string[];
  data: Record<string, any>;
  timestamp: number;
}

export interface UnknownRecord {
  id: string;
  question: string;
  hypothesis?: string;
  status: 'open' | 'investigating' | 'resolved';
  resolvedAnswer?: string;
}

export type RailKind =
  | 'Targets'
  | 'Functions'
  | 'Strings'
  | 'Imports'
  | 'Sections'
  | 'Classes'
  | 'Modules'
  | 'Resources';

export type CenterTab =
  | 'PseudoC'
  | 'Disassembly'
  | 'Hex'
  | 'Graph'
  | 'Source'
  | 'Network'
  | 'Result';

export type RightTab = 'Inspector' | 'Evidence' | 'Unknowns';
export type BottomTab = 'Agent' | 'Jobs' | 'Log';

export interface FunctionItem {
  address: string;
  name: string;
  signature: string;
  size: number;
  callers: number;
  callees: number;
  pseudocode: string;
  instructions: {
    address: string;
    bytes: string;
    mnemonic: string;
    operands: string;
  }[];
}

export interface StringItem {
  offset: string;
  value: string;
  length: number;
  encoding: 'ASCII' | 'UTF-8' | 'UTF-16';
  section: string;
}

export interface ImportItem {
  address: string;
  symbol: string;
  library: string;
  ordinal?: number;
}

export interface SectionItem {
  name: string;
  virtualAddress: string;
  virtualSize: string;
  rawSize: string;
  permissions: 'r-x' | 'rw-' | 'r--' | 'rwx';
  entropy: number;
}

export interface ToolSpec {
  id: string;
  toolset: string;
  title: string;
  summary: string;
  beginnerText?: string;
  deepOnly: boolean;
  dangerous: boolean;
}

export interface BackgroundJob {
  id: string;
  name: string;
  progress: number;
  cancellable: boolean;
  status: 'running' | 'completed' | 'cancelled' | 'failed';
  startedAt: number;
}

export interface LogLine {
  id: string;
  time: string;
  level: 'info' | 'warn' | 'error';
  text: string;
}

export interface SettingsState {
  mode: Mode;
  theme: ThemeKind;
  language: 'en' | 'ja' | 'zh-hans';
  deepMode: boolean;
  projectsDir: string;
  ghidraInstalled: boolean;
  ghidraPath: string;
  builderAI: string;
  anthropicApiKey?: string;
  openaiApiKey?: string;
  falAiApiKey?: string;
  parallelBuilds: number;
  maxRounds: number;
  goodEnoughScore: number;
  purpose: 'OwnOrAuthorized' | 'Education' | 'Interoperability' | 'Security' | 'Preservation';
}
