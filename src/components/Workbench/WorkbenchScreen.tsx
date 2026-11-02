import React, { useState } from 'react';
import { useCraft } from '../../context/CraftContext';
import {
  Braces,
  FileCode,
  Link,
  ListTree,
  Boxes,
  Package,
  FolderOpen,
  Code2,
  Cpu,
  Binary,
  Workflow,
  Network,
  ClipboardList,
  Search,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ShieldAlert,
  Play,
  RotateCw,
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { RailKind, CenterTab, RightTab, BottomTab } from '../../types';

export const WorkbenchScreen: React.FC = () => {
  const {
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
    deepMode,
    openModal,
    theme
  } = useCraft();

  const isLight = theme === 'StudioLight';
  const [filterQuery, setFilterQuery] = useState<string>('');

  const railTabs: { id: RailKind; label: string; icon: any }[] = [
    { id: 'Functions', label: 'Functions', icon: Braces },
    { id: 'Strings', label: 'Strings', icon: FileCode },
    { id: 'Imports', label: 'Imports', icon: Link },
    { id: 'Sections', label: 'Sections', icon: ListTree },
    { id: 'Classes', label: 'Classes', icon: Boxes },
    { id: 'Modules', label: 'Modules', icon: Package },
    { id: 'Resources', label: 'Resources', icon: FolderOpen }
  ];

  const centerTabs: { id: CenterTab; label: string; icon: any }[] = [
    { id: 'PseudoC', label: 'Pseudo-C', icon: Code2 },
    { id: 'Disassembly', label: 'Disassembly', icon: Cpu },
    { id: 'Hex', label: 'Hex View', icon: Binary },
    { id: 'Graph', label: 'Call Graph', icon: Workflow },
    { id: 'Source', label: 'Source JS', icon: FileCode },
    { id: 'Network', label: 'Network', icon: Network },
    { id: 'Result', label: 'Evidence JSON', icon: ClipboardList }
  ];

  const filteredFunctions = functions.filter(
    (f) =>
      f.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      f.address.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const filteredStrings = strings.filter((s) =>
    s.value.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case 'Observed':
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-medium">Seen it</span>;
      case 'Derived':
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 font-medium">Worked out</span>;
      case 'Inferred':
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400 font-medium">Best guess</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-neutral-700 text-neutral-300">Unknown</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden select-text">
      {/* Workbench Workspace (Middle: Left Rail, Center Tab, Right Inspector) */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Rail Icons Bar */}
        <div
          className={`w-12 border-r flex flex-col items-center py-2 space-y-1.5 shrink-0 ${
            isLight ? 'bg-[#f1f1ef] border-[#e2e2df]' : 'bg-[#101014] border-[#242527]'
          }`}
        >
          {railTabs.map((tab) => {
            const Icon = tab.icon;
            const active = railKind === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setRailKind(tab.id)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  active
                    ? 'bg-[#1659c4] text-white shadow-sm'
                    : isLight
                    ? 'text-neutral-600 hover:bg-neutral-200 hover:text-black'
                    : 'text-neutral-400 hover:bg-[#1b1c1f] hover:text-white'
                }`}
                title={tab.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        {/* Left Rail Items List Panel */}
        <div
          className={`w-64 border-r flex flex-col overflow-hidden shrink-0 ${
            isLight ? 'bg-neutral-50 border-[#e2e2df]' : 'bg-[#121316] border-[#242527]'
          }`}
        >
          {/* Header & Filter */}
          <div className="p-2 border-b border-inherit space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold px-1">
              <span>{railKind}</span>
              <span className="text-[10px] font-mono text-neutral-500">
                {railKind === 'Functions'
                  ? filteredFunctions.length
                  : railKind === 'Strings'
                  ? filteredStrings.length
                  : railKind === 'Sections'
                  ? sections.length
                  : imports.length}
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder={`Filter ${railKind.toLowerCase()}…`}
                className={`w-full px-2.5 py-1 pl-7 rounded-lg border text-xs outline-none ${
                  isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436] text-white'
                }`}
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2 top-1.8" />
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-1 space-y-0.5 text-xs font-mono">
            {railKind === 'Functions' &&
              filteredFunctions.map((func) => (
                <div
                  key={func.address}
                  onClick={() => setSelectedFunction(func)}
                  className={`px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                    selectedFunction?.address === func.address
                      ? 'bg-[#1659c4] text-white'
                      : isLight
                      ? 'hover:bg-neutral-200/70 text-neutral-800'
                      : 'hover:bg-[#1b1c1f] text-neutral-300'
                  }`}
                >
                  <div className="truncate font-semibold text-[11px]">{func.name}</div>
                  <div
                    className={`text-[10px] truncate ${
                      selectedFunction?.address === func.address ? 'text-blue-100' : 'text-neutral-500'
                    }`}
                  >
                    {func.address} • {func.size} bytes
                  </div>
                </div>
              ))}

            {railKind === 'Strings' &&
              filteredStrings.map((s, idx) => (
                <div
                  key={idx}
                  className={`px-2 py-1.5 rounded-lg text-xs truncate ${
                    isLight ? 'hover:bg-neutral-200 text-neutral-800' : 'hover:bg-[#1b1c1f] text-neutral-300'
                  }`}
                  title={`${s.offset}: ${s.value}`}
                >
                  <div className="text-[10px] text-neutral-500">{s.offset}</div>
                  <div className="truncate text-emerald-400">"{s.value}"</div>
                </div>
              ))}

            {railKind === 'Sections' &&
              sections.map((sec, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-xs ${
                    isLight ? 'hover:bg-neutral-200 text-neutral-800' : 'hover:bg-[#1b1c1f] text-neutral-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#74aaff]">{sec.name}</span>
                    <span className="text-[10px] text-neutral-500">{sec.permissions}</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">
                    {sec.virtualAddress} ({sec.rawSize})
                  </div>
                </div>
              ))}

            {railKind === 'Imports' &&
              imports.map((imp, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-xs truncate ${
                    isLight ? 'hover:bg-neutral-200 text-neutral-800' : 'hover:bg-[#1b1c1f] text-neutral-300'
                  }`}
                >
                  <div className="truncate font-semibold">{imp.symbol}</div>
                  <div className="text-[10px] text-neutral-500 truncate">
                    {imp.library} • {imp.address}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Center Panel (Tab Bar & Code/Hex/Graph/Network View) */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-neutral-950 text-neutral-200">
          {/* Tab Navigation */}
          <div className="h-9 px-2 bg-[#101014] border-b border-[#242527] flex items-center gap-1 shrink-0 overflow-x-auto">
            {centerTabs.map((tab) => {
              const Icon = tab.icon;
              const active = centerTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCenterTab(tab.id)}
                  className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#1b1c1f] text-white border border-[#343436]'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#74aaff]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab View Content */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed">
            {/* Pseudo-C View */}
            {centerTab === 'PseudoC' && (
              <div className="space-y-3">
                <div className="text-neutral-500 text-[11px] pb-2 border-b border-neutral-800 flex justify-between items-center">
                  <span>
                    // Function: <span className="text-[#74aaff] font-bold">{selectedFunction?.name || 'none'}</span> at {selectedFunction?.address}
                  </span>
                  <span>Clean room decompiler output</span>
                </div>
                <pre className="text-emerald-300 whitespace-pre font-mono text-xs">
                  {selectedFunction?.pseudocode || '// Select a function from the left rail'}
                </pre>
              </div>
            )}

            {/* Disassembly View */}
            {centerTab === 'Disassembly' && (
              <div className="space-y-2">
                <div className="text-neutral-500 text-[11px] pb-2 border-b border-neutral-800">
                  // Instructions for {selectedFunction?.name} ({selectedFunction?.instructions.length || 0} opcodes)
                </div>
                <div className="space-y-1">
                  {selectedFunction?.instructions.map((inst, idx) => (
                    <div key={idx} className="flex gap-4 hover:bg-neutral-900 px-2 py-0.5 rounded">
                      <span className="text-neutral-500 w-28 shrink-0">{inst.address}</span>
                      <span className="text-neutral-400 w-36 shrink-0">{inst.bytes}</span>
                      <span className="text-yellow-400 font-semibold w-16 shrink-0">{inst.mnemonic}</span>
                      <span className="text-neutral-200">{inst.operands}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hex Dump View */}
            {centerTab === 'Hex' && (
              <div className="space-y-1 text-xs">
                <div className="text-neutral-500 text-[11px] pb-2 border-b border-neutral-800">
                  OFFSET   00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F   ASCII
                </div>
                <div className="text-neutral-300 space-y-0.5">
                  <div>00000000: 4d 5a 90 00 03 00 00 00  04 00 00 00 ff ff 00 00  MZ..............</div>
                  <div>00000010: b8 00 00 00 00 00 00 00  40 00 00 00 00 00 00 00  ........@.......</div>
                  <div>00000020: 00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................</div>
                  <div>00000030: 00 00 00 00 00 00 00 00  00 00 00 00 80 00 00 00  ................</div>
                  <div>00000040: 0e 1f ba 0e 00 b4 09 cd  21 b8 01 4c cd 21 54 68  ........!..L.!Th</div>
                  <div>00000050: 69 73 20 70 72 6f 67 72  61 6d 20 63 61 6e 6e 6f  is program canno</div>
                  <div>00000060: 74 20 62 65 20 72 75 6e  20 69 6e 20 44 4f 53 20  t be run in DOS </div>
                  <div>00000070: 6d 6f 64 65 2e 0d 0d 0a  24 00 00 00 00 00 00 00  mode....$.......</div>
                  <div>00000080: 50 45 00 00 64 86 06 00  d1 49 c2 67 00 00 00 00  PE..d....I.g....</div>
                </div>
              </div>
            )}

            {/* Interactive Call Graph */}
            {centerTab === 'Graph' && (
              <div className="flex flex-col items-center justify-center p-6 space-y-6">
                <div className="text-neutral-400 text-xs">Call graph for {selectedFunction?.name}</div>
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 rounded-lg border border-neutral-700 bg-neutral-900 text-center w-48 shadow">
                    <div className="text-[10px] text-neutral-500">Caller (0x140001000)</div>
                    <div className="font-bold text-white">main</div>
                  </div>
                  <div className="w-0.5 h-6 bg-blue-500" />
                  <div className="p-3 rounded-lg border border-blue-500 bg-blue-950/40 text-center w-56 shadow-lg">
                    <div className="text-[10px] text-blue-300">Selected (0x140001f30)</div>
                    <div className="font-bold text-[#74aaff]">{selectedFunction?.name}</div>
                  </div>
                  <div className="w-0.5 h-6 bg-blue-500" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-2.5 rounded-lg border border-neutral-700 bg-neutral-900 text-center w-40">
                      <div className="text-[10px] text-neutral-500">Callee</div>
                      <div className="font-semibold text-neutral-300">log_arithmetic</div>
                    </div>
                    <div className="p-2.5 rounded-lg border border-neutral-700 bg-neutral-900 text-center w-40">
                      <div className="text-[10px] text-neutral-500">Callee</div>
                      <div className="font-semibold text-neutral-300">divsd / mulsd</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Network HAR View */}
            {centerTab === 'Network' && (
              <div className="space-y-2">
                <div className="text-neutral-500 text-[11px] pb-2 border-b border-neutral-800">
                  HTTP & WebSocket captured sessions
                </div>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-neutral-500 border-b border-neutral-800">
                      <th className="py-1">Method</th>
                      <th>URL</th>
                      <th>Status</th>
                      <th>Type</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900">
                    <tr>
                      <td className="text-emerald-400 font-bold py-1.5">GET</td>
                      <td className="text-neutral-300">https://example-bakery.artcraft.app/</td>
                      <td className="text-emerald-400">200 OK</td>
                      <td className="text-neutral-400">document</td>
                      <td className="text-neutral-500">42ms</td>
                    </tr>
                    <tr>
                      <td className="text-emerald-400 font-bold py-1.5">GET</td>
                      <td className="text-neutral-300">/assets/index-b4f128c.js</td>
                      <td className="text-emerald-400">200 OK</td>
                      <td className="text-neutral-400">script</td>
                      <td className="text-neutral-500">18ms</td>
                    </tr>
                    <tr>
                      <td className="text-blue-400 font-bold py-1.5">POST</td>
                      <td className="text-neutral-300">/api/v1/checkout</td>
                      <td className="text-emerald-400">200 OK</td>
                      <td className="text-neutral-400">json</td>
                      <td className="text-neutral-500">110ms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Evidence JSON View */}
            {centerTab === 'Result' && (
              <pre className="text-neutral-300 whitespace-pre-wrap">
                {JSON.stringify(evidence, null, 2)}
              </pre>
            )}

            {/* Source JS View */}
            {centerTab === 'Source' && (
              <pre className="text-blue-300 whitespace-pre-wrap">
                {`// Reconstructed Webpack bundle: main.js
(function() {
  const BakeryApp = {
    state: { items: [], cartTotal: 0 },
    init() {
      console.log("Bakery client initialized.");
      document.querySelector("#order-btn").addEventListener("click", () => this.checkout());
    },
    checkout() {
      fetch("/api/v1/checkout", { method: "POST", body: JSON.stringify(this.state) });
    }
  };
  BakeryApp.init();
})();`}
              </pre>
            )}
          </div>
        </div>

        {/* Right Inspector & Evidence Pane */}
        <div
          className={`w-72 border-l flex flex-col shrink-0 ${
            isLight ? 'bg-neutral-50 border-[#e2e2df]' : 'bg-[#121316] border-[#242527]'
          }`}
        >
          {/* Tabs for Right Pane */}
          <div className="h-9 px-2 border-b border-inherit flex items-center justify-around text-xs shrink-0">
            {(['Inspector', 'Evidence', 'Unknowns'] as RightTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setRightTab(tab)}
                className={`py-1 px-2 font-medium transition-colors border-b-2 ${
                  rightTab === tab
                    ? 'border-[#1659c4] text-[#74aaff]'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Tab Content */}
          <div className="flex-1 overflow-y-auto p-3 text-xs space-y-3">
            {rightTab === 'Inspector' && selectedFunction && (
              <div className="space-y-3">
                <div className="font-bold text-sm text-neutral-200">{selectedFunction.name}</div>
                <div className="space-y-1.5 text-neutral-400">
                  <div className="flex justify-between">
                    <span>Address:</span>
                    <span className="font-mono text-neutral-200">{selectedFunction.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-mono text-neutral-200">{selectedFunction.size} bytes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Callers:</span>
                    <span className="font-mono text-neutral-200">{selectedFunction.callers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Callees:</span>
                    <span className="font-mono text-neutral-200">{selectedFunction.callees}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-inherit space-y-1">
                  <span className="font-semibold text-neutral-300">Signature</span>
                  <div className="p-2 rounded bg-neutral-900 font-mono text-[11px] text-blue-300 break-all">
                    {selectedFunction.signature}
                  </div>
                </div>
              </div>
            )}

            {rightTab === 'Evidence' && (
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-neutral-400">
                  <span>Ledger records</span>
                  <span className="font-mono">{evidence.length}</span>
                </div>
                {evidence.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-2.5 rounded-lg border border-neutral-700/60 bg-[#1b1c1f] space-y-1.5"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-[11px] text-[#74aaff]">{ev.tool}</span>
                      {getConfidenceBadge(ev.confidence)}
                    </div>
                    <p className="text-[11px] text-neutral-300">{ev.summary}</p>
                    <div className="text-[10px] text-neutral-500 font-mono truncate">
                      {ev.locations.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {rightTab === 'Unknowns' && (
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-neutral-400">
                  <span>Open Hypotheses</span>
                  <span className="font-mono">{unknowns.length}</span>
                </div>
                {unknowns.map((unk) => (
                  <div
                    key={unk.id}
                    className="p-2.5 rounded-lg border border-neutral-700/60 bg-[#1b1c1f] space-y-1.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-neutral-400">{unk.id}</span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          unk.status === 'resolved'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {unk.status}
                      </span>
                    </div>
                    <p className="font-medium text-[11px] text-neutral-200">{unk.question}</p>
                    {unk.resolvedAnswer && (
                      <p className="text-[10px] text-emerald-300 bg-emerald-950/30 p-1.5 rounded">
                        ✓ {unk.resolvedAnswer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Collapsible Pane (Agent, Jobs, System Logs) */}
      <div
        className={`border-t flex flex-col shrink-0 transition-all ${
          bottomOpen ? 'h-48' : 'h-8'
        } ${isLight ? 'bg-neutral-50 border-[#e2e2df]' : 'bg-[#101014] border-[#242527]'}`}
      >
        {/* Bottom Bar Header */}
        <div className="h-8 px-3 flex items-center justify-between border-b border-inherit text-xs shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBottomOpen(!bottomOpen)}
              className="text-neutral-400 hover:text-neutral-200"
              title={bottomOpen ? 'Collapse bottom pane' : 'Expand bottom pane'}
            >
              {bottomOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-1">
              {(['Agent', 'Jobs', 'Log'] as BottomTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setBottomTab(tab);
                    setBottomOpen(true);
                  }}
                  className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors ${
                    bottomTab === tab && bottomOpen
                      ? 'bg-[#1b1c1f] text-white font-semibold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <span className="text-[11px] text-neutral-500 font-mono">
            {jobs.filter((j) => j.status === 'running').length} active jobs
          </span>
        </div>

        {/* Bottom Content Area */}
        {bottomOpen && (
          <div className="flex-1 overflow-y-auto p-2.5 font-mono text-xs text-neutral-300">
            {bottomTab === 'Agent' && (
              <div className="space-y-1">
                <div className="text-neutral-500">// Real-time agent console</div>
                <div className="text-emerald-400">[agent] Attached to workspace "Example Bakery Website"</div>
                <div className="text-neutral-300">[agent] Clean room constraints active: skipping binary disasm</div>
                <div className="text-blue-300">[agent] Ready for follow-up prompt</div>
              </div>
            )}

            {bottomTab === 'Jobs' && (
              <div className="space-y-2">
                {jobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-2 rounded bg-[#1b1c1f]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold">{job.name}</span>
                    </div>
                    <span className="text-[11px] text-neutral-400">{job.status}</span>
                  </div>
                ))}
              </div>
            )}

            {bottomTab === 'Log' && (
              <div className="space-y-1">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3">
                    <span className="text-neutral-500 w-16 shrink-0">{log.time}</span>
                    <span
                      className={`font-semibold uppercase w-12 shrink-0 ${
                        log.level === 'error'
                          ? 'text-red-400'
                          : log.level === 'warn'
                          ? 'text-amber-400'
                          : 'text-neutral-400'
                      }`}
                    >
                      [{log.level}]
                    </span>
                    <span className="text-neutral-300">{log.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
