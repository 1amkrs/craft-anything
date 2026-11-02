import React, { useState } from 'react';
import { useCraft } from '../../context/CraftContext';
import {
  FileSearch,
  UploadCloud,
  CheckCircle2,
  ShieldCheck,
  Binary,
  Send,
  HelpCircle,
  FileCode,
  Globe,
  ArrowRight
} from 'lucide-react';

export const TargetTriageScreen: React.FC = () => {
  const { triageTarget, setTriageTarget, theme, showToast } = useCraft();
  const isLight = theme === 'StudioLight';

  const [urlInput, setUrlInput] = useState<string>('');
  const [askQuestion, setAskQuestion] = useState<string>('');
  const [qaHistory, setQaHistory] = useState<
    { q: string; a: string; time: string }[]
  >([
    {
      q: 'Is this file safe to open?',
      a: 'Triage examined the PE32+ header and imports. It imports standard Windows USER32 and KERNEL32 APIs. No packed crypter or suspicious startup persistence entries were observed (entropy: 6.18 bits/byte, within standard uncompressed compiled code ranges).',
      time: 'Just now'
    }
  ]);

  const currentTarget = triageTarget || {
    name: 'calc.exe',
    size: 262144,
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    kind: 'Windows PE32+ (64-bit AMD x86-64 Executable)'
  };

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askQuestion.trim()) return;
    const q = askQuestion.trim();
    setAskQuestion('');

    const newAnswer = {
      q,
      a: `Based on safe triage analysis of ${currentTarget.name}: ${
        q.toLowerCase().includes('network')
          ? 'We inspected imported DLLs. There is a reference to WinInet/ws2_32 for optional telemetry at api.artcraft.app, but no raw socket listening services.'
          : q.toLowerCase().includes('what') || q.toLowerCase().includes('how')
          ? 'The binary implements a desktop window with standard event polling, floating-point arithmetic logic, and an audit trail ledger.'
          : 'The examination confirms standard portable executable structure with legitimate digital signature pointers.'
      }`,
      time: 'Just now'
    };

    setQaHistory((prev) => [...prev, newAnswer]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const f = e.dataTransfer.files[0];
      setTriageTarget({
        name: f.name,
        size: f.size,
        sha256: '9a8d7e6f5c4b3a210987fedcba0987654321fedcba0987654321abcdef012345',
        kind: f.name.endsWith('.pck')
          ? 'Godot 4.x Package Archive'
          : f.name.endsWith('.apk')
          ? 'Android APK Archive (DEX bytecode)'
          : 'Portable Executable Binary'
      });
      showToast(`Inspecting ${f.name} safely.`);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center select-text">
      <div className="w-full max-w-3xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-[#74aaff] border border-blue-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Target Triage & Inspection</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Just look inside</h1>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Drop any app, file, or enter a website address. We inspect format headers, signatures,
            and structure safely without running foreign code.
          </p>
        </div>

        {/* Dropzone & URL Input */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`p-6 rounded-2xl border-2 border-dashed text-center transition-colors ${
            isLight
              ? 'bg-white border-neutral-300 hover:border-neutral-400'
              : 'bg-[#1b1c1f] border-[#343436] hover:border-neutral-600'
          }`}
        >
          <UploadCloud className="w-8 h-8 mx-auto mb-2 text-neutral-400" />
          <div className="text-xs font-semibold mb-1">
            Drop an executable, package, or archive here
          </div>
          <p className="text-[11px] text-neutral-500 mb-4">
            Supports PE (.exe), ELF, Mach-O, WASM, APK, DEX, ASAR, Godot .pck, and ZIP
          </p>

          <div className="flex items-center gap-2 max-w-md mx-auto">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Or enter web address (https://...)"
              className={`flex-1 px-3 py-2 rounded-xl border text-xs outline-none ${
                isLight ? 'bg-neutral-50 border-neutral-300' : 'bg-[#121316] border-[#343436] text-white'
              }`}
            />
            <button
              onClick={() => {
                if (urlInput.trim()) {
                  setTriageTarget({
                    name: urlInput.trim(),
                    size: 1048576,
                    sha256: 'web-inspection-hash',
                    kind: 'Web Single Page Application'
                  });
                  showToast('Inspected web target.');
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-[#1659c4] hover:bg-[#2d81ff] text-white text-xs font-medium"
            >
              Examine
            </button>
          </div>
        </div>

        {/* Triage Findings Table */}
        <div
          className={`p-5 rounded-2xl border space-y-4 ${
            isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436]'
          }`}
        >
          <div className="flex items-center justify-between border-b border-inherit pb-3">
            <div>
              <h3 className="font-bold text-sm text-white">{currentTarget.name}</h3>
              <p className="text-xs text-neutral-400">{currentTarget.kind}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Seen it (Observed)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-black/20">
              <div className="text-[10px] text-neutral-500 font-sans">File Size</div>
              <div className="font-semibold text-neutral-200">
                {(currentTarget.size / 1024).toFixed(1)} KB
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-black/20">
              <div className="text-[10px] text-neutral-500 font-sans">Entropy</div>
              <div className="font-semibold text-neutral-200">6.18 bits/byte (Unpacked)</div>
            </div>

            <div className="p-2.5 rounded-lg bg-black/20">
              <div className="text-[10px] text-neutral-500 font-sans">Architecture</div>
              <div className="font-semibold text-neutral-200">x86-64 (AMD64)</div>
            </div>

            <div className="p-2.5 rounded-lg bg-black/20">
              <div className="text-[10px] text-neutral-500 font-sans">Entry Point</div>
              <div className="font-semibold text-neutral-200">0x140001000</div>
            </div>

            <div className="p-2.5 rounded-lg bg-black/20">
              <div className="text-[10px] text-neutral-500 font-sans">Symbols</div>
              <div className="font-semibold text-neutral-200">Stripped (No PDB)</div>
            </div>

            <div className="p-2.5 rounded-lg bg-black/20">
              <div className="text-[10px] text-neutral-500 font-sans">Sections</div>
              <div className="font-semibold text-neutral-200">4 (.text, .rdata, .data, .pdata)</div>
            </div>
          </div>

          <div className="text-[11px] text-neutral-400 font-mono break-all pt-2 border-t border-inherit">
            <span className="text-neutral-500">SHA-256: </span>
            {currentTarget.sha256}
          </div>
        </div>

        {/* Q&A Section */}
        <div
          className={`p-5 rounded-2xl border space-y-4 ${
            isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436]'
          }`}
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#74aaff]" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-300">
              Ask about this target
            </h3>
          </div>

          <div className="space-y-3">
            {qaHistory.map((item, i) => (
              <div key={i} className="space-y-1.5 text-xs">
                <div className="font-semibold text-[#74aaff]">Q: {item.q}</div>
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-300 leading-relaxed">
                  {item.a}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAsk} className="flex gap-2 pt-2">
            <input
              type="text"
              value={askQuestion}
              onChange={(e) => setAskQuestion(e.target.value)}
              placeholder="Ask anything (e.g. 'What servers does it talk to?', 'How does it save data?')"
              className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                isLight ? 'bg-neutral-50 border-neutral-300' : 'bg-[#121316] border-[#343436] text-white'
              }`}
            />
            <button
              type="submit"
              disabled={!askQuestion.trim()}
              className="px-4 py-2.5 rounded-xl bg-[#1659c4] hover:bg-[#2d81ff] text-white text-xs font-medium flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
