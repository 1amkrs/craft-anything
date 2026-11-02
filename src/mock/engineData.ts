import {
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
  LogLine
} from '../types';

export const INITIAL_PROJECTS: ProjectManifest[] = [
  {
    id: 'proj-example-web',
    name: 'Example Bakery Website',
    request: 'Recreate this bakery website with modern animations and an online order cart',
    target: {
      kind: 'Website',
      url: 'https://example-bakery.artcraft.app',
      name: 'example-bakery.artcraft.app'
    },
    stack: 'React + Tailwind CSS + Vite',
    builder: 'Claude Code',
    status: 'Ready',
    created_ms: Date.now() - 3600000 * 24,
    updated_ms: Date.now() - 1000 * 60 * 15,
    rounds: 2,
    max_rounds: 3,
    likeness_score: 96,
    asset_budget_usd: 5.0,
    generate_assets: false
  },
  {
    id: 'proj-snake-game',
    name: 'Classic Snake Game in Rust',
    request: 'Make a snake game with smooth controls, retro CRT green glow, and persistent high scores',
    target: {
      kind: 'Game',
      name: 'snake-retro.pck',
      size: 14580224,
      sha256: '9a8d7e6f5c4b3a210987fedcba0987654321fedcba0987654321abcdef012345'
    },
    stack: 'Godot 4.3 (Rust / GDNative)',
    builder: 'Claude Code',
    status: 'Ready',
    created_ms: Date.now() - 3600000 * 48,
    updated_ms: Date.now() - 3600000 * 3,
    rounds: 3,
    max_rounds: 4,
    likeness_score: 98,
    asset_budget_usd: 10.0,
    generate_assets: true
  },
  {
    id: 'proj-calc-native',
    name: 'Native Percentage Calculator',
    request: 'Recreate this calculator app with exact floating-point tax and percent logic in pure Rust',
    target: {
      kind: 'Native',
      path: 'calc.exe',
      name: 'calc.exe',
      size: 262144,
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    stack: 'Rust (eframe/egui)',
    builder: 'Claude Code',
    status: 'Needs you',
    created_ms: Date.now() - 3600000 * 2,
    updated_ms: Date.now() - 1000 * 60 * 5,
    rounds: 1,
    max_rounds: 3,
    likeness_score: 89,
    asset_budget_usd: 0,
    generate_assets: false
  }
];

export const INITIAL_STEPS: Record<string, ProjectStep[]> = {
  'proj-example-web': [
    { id: 'study', label: '1. Study', state: 'done', detail: 'Analyzed DOM layout, 3 viewport widths, 4 fonts, 18 color tokens' },
    { id: 'build', label: '2. Build', state: 'done', detail: 'Generated full React single-page app and responsive navbar' },
    { id: 'check', label: '3. Check', state: 'done', detail: 'Compared at 375px, 768px, 1280px widths — 96% pixel & structure match' },
    { id: 'ready', label: '4. Ready', state: 'done', detail: 'Preview active on port 3000. Ready to play, test or refine' }
  ],
  'proj-snake-game': [
    { id: 'study', label: '1. Study', state: 'done', detail: 'Extracted game loop timing (60fps tick), grid collision bounds' },
    { id: 'build', label: '2. Build', state: 'done', detail: 'Generated Rust game logic, snake state machine, audio triggers' },
    { id: 'check', label: '3. Check', state: 'done', detail: 'Game self-test passed: 50 automated moves without collision fault' },
    { id: 'ready', label: '4. Ready', state: 'done', detail: 'Game executable built. Click Play to test' }
  ],
  'proj-calc-native': [
    { id: 'study', label: '1. Study', state: 'done', detail: 'Decompiled percent calculation routine at 0x140001f30' },
    { id: 'build', label: '2. Build', state: 'active', detail: 'Agent is wiring egui number buttons and display register' },
    { id: 'check', label: '3. Check', state: 'pending', detail: 'Waiting for arithmetic unit tests and button layout match' },
    { id: 'ready', label: '4. Ready', state: 'pending', detail: 'Not ready yet' }
  ]
};

export const INITIAL_FEEDS: Record<string, FeedItem[]> = {
  'proj-example-web': [
    {
      id: 'f-1',
      type: 'user',
      timestamp: Date.now() - 3600000 * 24,
      text: 'Recreate this bakery website with modern animations and an online order cart'
    },
    {
      id: 'f-2',
      type: 'status',
      timestamp: Date.now() - 3600000 * 24 + 1000,
      text: 'Starting clean-room inspection of https://example-bakery.artcraft.app'
    },
    {
      id: 'f-3',
      type: 'tool',
      timestamp: Date.now() - 3600000 * 24 + 4000,
      toolName: 'web_page_inspect',
      toolSummary: 'Inspected navigation, hero banners, menu grid and customer testimonials',
      evidenceId: 'ev-web-inspect'
    },
    {
      id: 'f-4',
      type: 'assistant',
      timestamp: Date.now() - 3600000 * 24 + 8000,
      text: 'I examined the bakery website. It features warm earthy colors (#b7410e, #fdf6ec), serif headings, 8 pastry cards with ingredient badges, and a checkout drawer. I will build this using React and Tailwind CSS.'
    },
    {
      id: 'f-5',
      type: 'tool',
      timestamp: Date.now() - 3600000 * 24 + 12000,
      toolName: 'code_builder_execute',
      toolSummary: 'Scaffolded components: Header, Hero, ProductGrid, CartDrawer, Footer'
    },
    {
      id: 'f-6',
      type: 'check',
      timestamp: Date.now() - 3600000 * 24 + 20000,
      checkResult: {
        overallLikeness: 96,
        viewports: [
          {
            width: 375,
            name: 'Mobile (375px)',
            likeness: 98,
            differences: ['Cart icon 2px higher', 'Hamburger drawer animation smooth']
          },
          {
            width: 768,
            name: 'Tablet (768px)',
            likeness: 95,
            differences: ['2-column layout matched', 'Minor padding difference on promo banner']
          },
          {
            width: 1280,
            name: 'Desktop (1280px)',
            likeness: 96,
            differences: ['4-column layout identical', 'Custom bakery serif font aligned']
          }
        ]
      }
    },
    {
      id: 'f-7',
      type: 'assistant',
      timestamp: Date.now() - 1000 * 60 * 15,
      text: 'All 3 viewport checks meet our >95% likeness threshold. The build is ready to preview!'
    }
  ],
  'proj-calc-native': [
    {
      id: 'f-c1',
      type: 'user',
      timestamp: Date.now() - 3600000 * 2,
      text: 'Recreate this calculator app with exact floating-point tax and percent logic in pure Rust'
    },
    {
      id: 'f-c2',
      type: 'status',
      timestamp: Date.now() - 3600000 * 2 + 1000,
      text: 'Running deep inspection on calc.exe (Clean room disabled by user)'
    },
    {
      id: 'f-c3',
      type: 'tool',
      timestamp: Date.now() - 3600000 * 2 + 3000,
      toolName: 'native_function_study',
      toolSummary: 'Identified calculate_percentage at 0x140001f30 (18 instructions)',
      evidenceId: 'ev-calc-func'
    },
    {
      id: 'f-c4',
      type: 'consent',
      timestamp: Date.now() - 1000 * 60 * 10,
      consent: {
        id: 'c-run-check',
        action: 'EXECUTES_FOREIGN_CODE',
        title: 'Allow cargo check and native test execution?',
        description: 'The coding agent wants to verify math precision by running `cargo test --bin calc` in a sandboxed process.'
      }
    },
    {
      id: 'f-c5',
      type: 'question',
      timestamp: Date.now() - 1000 * 60 * 5,
      question: {
        id: 'q-calc-theme',
        prompt: 'Should the rebuilt calculator use the native OS window frame or egui dark Studio theme?',
        options: ['Studio Dark (egui native)', 'Windows Fluent style', 'Minimal borderless']
      }
    }
  ]
};

export const MOCK_EVIDENCE: EvidenceRecord[] = [
  {
    id: 'ev-web-inspect',
    tool: 'web_page_inspect',
    summary: 'Visual layout and DOM structure of example bakery',
    confidence: 'Observed',
    coverage: '100% of landing page and checkout dialog',
    limitations: ['Did not submit live credit card transaction'],
    locations: ['https://example-bakery.artcraft.app', 'index.html'],
    data: {
      domNodes: 412,
      stylesheets: 3,
      scriptBundles: 2,
      viewportBreakpoints: [375, 768, 1280]
    },
    timestamp: Date.now() - 3600000 * 24
  },
  {
    id: 'ev-calc-func',
    tool: 'native_function_pseudocode',
    summary: 'Decompiled calculate_percentage routine',
    confidence: 'Derived',
    coverage: 'Target function 0x140001f30 (entry to ret)',
    limitations: ['Compiler register optimization obscured temporary variable names'],
    locations: ['calc.exe::.text:0x140001f30'],
    data: {
      address: '0x140001f30',
      size: 48,
      callingConvention: '__fastcall',
      parameters: ['double value', 'double rate']
    },
    timestamp: Date.now() - 3600000 * 2
  },
  {
    id: 'ev-entropy-check',
    tool: 'core_target_triage',
    summary: 'Binary entropy and section classification',
    confidence: 'Observed',
    coverage: 'Entire binary image (262,144 bytes)',
    limitations: ['Standard PE format, no custom cryptor detected'],
    locations: ['calc.exe'],
    data: {
      entropyScore: 6.18,
      packed: false,
      format: 'PE32+ (64-bit AMD x86-64)'
    },
    timestamp: Date.now() - 3600000 * 2
  }
];

export const MOCK_UNKNOWNS: UnknownRecord[] = [
  {
    id: 'unk-1',
    question: 'Does the calculator clear the memory register on double-tap of "C"?',
    hypothesis: 'Looking at keypad dispatch at 0x1400021b0, a tick timer checks elapsed ms < 300',
    status: 'investigating'
  },
  {
    id: 'unk-2',
    question: 'Which API endpoint processes order submissions on the bakery site?',
    hypothesis: 'POST /api/v1/orders with payload { items, deliveryAddress, token }',
    status: 'resolved',
    resolvedAnswer: 'Verified in network HAR: https://example-bakery.artcraft.app/api/checkout'
  }
];

export const MOCK_FUNCTIONS: FunctionItem[] = [
  {
    address: '0x140001000',
    name: 'main',
    signature: 'int main(int argc, char** argv)',
    size: 96,
    callers: 1,
    callees: 4,
    pseudocode: `int main(int argc, char** argv) {
    AppConfig config = {0};
    init_graphics_context(&config);
    window_create("Calculator", 400, 600);
    
    // Main UI Event Loop
    while (!window_should_close()) {
        poll_input_events();
        calc_state_render();
        swap_buffers();
    }
    
    cleanup_engine();
    return 0;
}`,
    instructions: [
      { address: '0x140001000', bytes: '48 83 ec 38', mnemonic: 'sub', operands: 'rsp, 0x38' },
      { address: '0x140001004', bytes: '48 8d 4c 24 20', mnemonic: 'lea', operands: 'rcx, [rsp+0x20]' },
      { address: '0x140001009', bytes: 'e8 52 04 00 00', mnemonic: 'call', operands: '0x140001460 <init_graphics_context>' },
      { address: '0x14000100e', bytes: 'ba 90 01 00 00', mnemonic: 'mov', operands: 'edx, 0x190' },
      { address: '0x140001013', bytes: '41 b8 58 02 00 00', mnemonic: 'mov', operands: 'r8d, 0x258' },
      { address: '0x140001019', bytes: 'e8 92 08 00 00', mnemonic: 'call', operands: '0x1400018b0 <window_create>' },
      { address: '0x14000101e', bytes: '48 83 c4 38', mnemonic: 'add', operands: 'rsp, 0x38' },
      { address: '0x140001022', bytes: 'c3', mnemonic: 'ret', operands: '' }
    ]
  },
  {
    address: '0x140001f30',
    name: 'calculate_percentage',
    signature: 'double calculate_percentage(double base_value, double rate)',
    size: 48,
    callers: 3,
    callees: 1,
    pseudocode: `double calculate_percentage(double base_value, double rate) {
    if (rate == 0.0) {
        return 0.0;
    }
    // Rate is passed as integer percent (e.g. 15.0 for 15%)
    double factor = rate / 100.0;
    double result = base_value * factor;
    
    // Log computation to ledger if audit is active
    if (g_audit_enabled) {
        log_arithmetic_event(OP_PERCENT, base_value, rate, result);
    }
    
    return result;
}`,
    instructions: [
      { address: '0x140001f30', bytes: 'f2 0f 10 05 c8 30 00 00', mnemonic: 'movsd', operands: 'xmm0, [base_value]' },
      { address: '0x140001f38', bytes: 'f2 0f 5e 0d 20 22 00 00', mnemonic: 'divsd', operands: 'xmm1, [0x140004160]' },
      { address: '0x140001f40', bytes: 'f2 0f 59 c1', mnemonic: 'mulsd', operands: 'xmm0, xmm1' },
      { address: '0x140001f44', bytes: 'c3', mnemonic: 'ret', operands: '' }
    ]
  },
  {
    address: '0x1400021b0',
    name: 'on_keypad_press',
    signature: 'void on_keypad_press(int keycode, CalcState* state)',
    size: 142,
    callers: 2,
    callees: 5,
    pseudocode: `void on_keypad_press(int keycode, CalcState* state) {
    switch (keycode) {
        case KEY_CLEAR:
            if (get_time_ms() - state->last_clear_time < 300) {
                // Double tap detected: reset memory registers
                memset(&state->memory, 0, sizeof(state->memory));
            }
            state->current_display = 0.0;
            state->last_clear_time = get_time_ms();
            break;
        case KEY_PERCENT:
            state->current_display = calculate_percentage(state->accumulated, state->current_display);
            break;
        case KEY_EQUALS:
            state_compute_result(state);
            break;
    }
}`,
    instructions: [
      { address: '0x1400021b0', bytes: '83 f9 1b', mnemonic: 'cmp', operands: 'ecx, 0x1b' },
      { address: '0x1400021b3', bytes: '74 12', mnemonic: 'jz', operands: '0x1400021c7' },
      { address: '0x1400021b5', bytes: '83 f9 25', mnemonic: 'cmp', operands: 'ecx, 0x25' },
      { address: '0x1400021b8', bytes: '74 38', mnemonic: 'jz', operands: '0x1400021f2' },
      { address: '0x1400021ba', bytes: 'c3', mnemonic: 'ret', operands: '' }
    ]
  }
];

export const MOCK_STRINGS: StringItem[] = [
  { offset: '0x00003040', value: 'Calculator 2.4.0 (x86_64-pc-windows-msvc)', length: 41, encoding: 'ASCII', section: '.rdata' },
  { offset: '0x00003080', value: 'Division by zero is undefined', length: 29, encoding: 'ASCII', section: '.rdata' },
  { offset: '0x000030b0', value: 'https://api.artcraft.app/v1/telemetry', length: 37, encoding: 'ASCII', section: '.rdata' },
  { offset: '0x000030f0', value: 'Memory register overflow in accumulator', length: 39, encoding: 'ASCII', section: '.rdata' },
  { offset: '0x00003130', value: 'Roboto-Bold.ttf', length: 15, encoding: 'ASCII', section: '.rdata' },
  { offset: '0x00003150', value: 'USER32.DLL', length: 10, encoding: 'ASCII', section: '.idata' },
  { offset: '0x00003160', value: 'KERNEL32.DLL', length: 12, encoding: 'ASCII', section: '.idata' }
];

export const MOCK_IMPORTS: ImportItem[] = [
  { address: '0x140005000', symbol: 'CreateWindowExW', library: 'USER32.DLL' },
  { address: '0x140005008', symbol: 'DefWindowProcW', library: 'USER32.DLL' },
  { address: '0x140005010', symbol: 'ShowWindow', library: 'USER32.DLL' },
  { address: '0x140005018', symbol: 'VirtualAlloc', library: 'KERNEL32.DLL' },
  { address: '0x140005020', symbol: 'GetSystemTimeAsFileTime', library: 'KERNEL32.DLL' },
  { address: '0x140005028', symbol: 'QueryPerformanceCounter', library: 'KERNEL32.DLL' },
  { address: '0x140005030', symbol: 'sin', library: 'MSVCRT.DLL' },
  { address: '0x140005038', symbol: 'cos', library: 'MSVCRT.DLL' }
];

export const MOCK_SECTIONS: SectionItem[] = [
  { name: '.text', virtualAddress: '0x140001000', virtualSize: '0x00003a00', rawSize: '0x00003c00', permissions: 'r-x', entropy: 6.42 },
  { name: '.rdata', virtualAddress: '0x140005000', virtualSize: '0x00001f00', rawSize: '0x00002000', permissions: 'r--', entropy: 5.12 },
  { name: '.data', virtualAddress: '0x140007000', virtualSize: '0x00000800', rawSize: '0x00000400', permissions: 'rw-', entropy: 2.34 },
  { name: '.pdata', virtualAddress: '0x140008000', virtualSize: '0x00000600', rawSize: '0x00000600', permissions: 'r--', entropy: 4.89 }
];

export const ENGINE_TOOLS_CATALOG: ToolSpec[] = [
  { id: 'core_target_triage', toolset: 'core', title: 'What is this?', summary: 'Identifies file format, arch, and dependencies safely', deepOnly: false, dangerous: false },
  { id: 'core_evidence_show', toolset: 'core', title: 'Evidence so far', summary: 'Lists evidence collected with confidence ratings', deepOnly: false, dangerous: false },
  { id: 'core_unknowns_show', toolset: 'core', title: 'Open questions', summary: 'Lists hypotheses and unresolved questions', deepOnly: false, dangerous: false },
  { id: 'web_site_open', toolset: 'web', title: 'Inspect website', summary: 'Studies visible layout, typography, colors and styles', deepOnly: false, dangerous: false },
  { id: 'web_page_watch', toolset: 'web', title: 'Watch network traffic', summary: 'Captures HTTP/WebSocket requests during usage', deepOnly: false, dangerous: false },
  { id: 'native_functions_list', toolset: 'native', title: 'List functions', summary: 'Enumerates all decoded function entrypoints', deepOnly: true, dangerous: false },
  { id: 'native_function_pseudocode', toolset: 'native', title: 'Decompile function', summary: 'Generates clean pseudo-C from machine instructions', deepOnly: true, dangerous: false },
  { id: 'native_function_disassemble', toolset: 'native', title: 'Disassemble function', summary: 'Lists assembly opcodes and registers', deepOnly: true, dangerous: false },
  { id: 'native_strings_browse', toolset: 'native', title: 'Browse strings', summary: 'Extracts printable ASCII and UTF-8 strings', deepOnly: true, dangerous: false },
  { id: 'native_sections_list', toolset: 'native', title: 'List sections', summary: 'Displays PE/ELF headers, permissions and entropy', deepOnly: true, dangerous: false },
  { id: 'native_call_graph_show', toolset: 'native', title: 'Call graph', summary: 'Visualizes function call hierarchy and execution flow', deepOnly: true, dangerous: false },
  { id: 'game_archives_list', toolset: 'game', title: 'List game archives', summary: 'Finds .pak, Unity .assets, Godot .pck packages', deepOnly: true, dangerous: false },
  { id: 'game_unreal_texture_export', toolset: 'game', title: 'Export textures', summary: 'Extracts sprite and texture assets to PNG', deepOnly: true, dangerous: false },
  { id: 'rebuild_project_create', toolset: 'ai', title: 'Create project', summary: 'Initializes new rebuild workspace with manifest', deepOnly: false, dangerous: false },
  { id: 'rebuild_step_run', toolset: 'ai', title: 'Run rebuild step', summary: 'Executes coding agent study, build or check round', deepOnly: false, dangerous: true },
  { id: 'assets_image_generate', toolset: 'assets', title: 'Generate picture', summary: 'Creates 2D game asset via fal.ai model', deepOnly: false, dangerous: false },
  { id: 'plugins_refresh', toolset: 'plugins', title: 'Refresh MCP tools', summary: 'Reloads tools from connected MCP servers', deepOnly: false, dangerous: false }
];

export const INITIAL_JOBS: BackgroundJob[] = [
  {
    id: 'job-1',
    name: 'Analyzing call graph of calc.exe',
    progress: 100,
    cancellable: true,
    status: 'completed',
    startedAt: Date.now() - 60000
  }
];

export const INITIAL_LOGS: LogLine[] = [
  { id: 'l1', time: '14:20:01', level: 'info', text: 'Craft Anything engine initialized. Clean room mode ACTIVE.' },
  { id: 'l2', time: '14:20:02', level: 'info', text: 'Loaded 298 engine tools, 16 rebuild tools, 0 warnings.' },
  { id: 'l3', time: '14:22:15', level: 'info', text: 'Target "example-bakery.artcraft.app" inspected. Visual checks passed: 96% likeness.' },
  { id: 'l4', time: '14:30:10', level: 'info', text: 'User selected target calc.exe. Switched to Deep Mode for disassembly.' }
];
