import React, { useState } from 'react';
import { useCraft } from '../../context/CraftContext';
import {
  CheckCircle2,
  Clock,
  Play,
  FolderOpen,
  Pin,
  ExternalLink,
  Send,
  HelpCircle,
  ShieldAlert,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  RefreshCw,
  Code2,
  Terminal,
  Paperclip
} from 'lucide-react';
import { ProjectStep, FeedItem } from '../../types';

export const ProjectScreen: React.FC = () => {
  const {
    activeProject,
    projectSteps,
    projectFeed,
    addFeedMessage,
    answerQuestion,
    grantConsent,
    togglePinProject,
    pinnedProjectIds,
    theme,
    showToast
  } = useCraft();

  const [inputMessage, setInputMessage] = useState<string>('');
  const [justAskMode, setJustAskMode] = useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [selectedViewport, setSelectedViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const isLight = theme === 'StudioLight';

  if (!activeProject) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-neutral-500 text-sm">
        No project selected.
      </div>
    );
  }

  const isPinned = pinnedProjectIds.includes(activeProject.id);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    addFeedMessage(inputMessage.trim(), justAskMode);
    setInputMessage('');
  };

  const renderStepIcon = (state: ProjectStep['state']) => {
    switch (state) {
      case 'done':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'active':
        return <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin shrink-0" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />;
      default:
        return <div className="w-4 h-4 rounded-full border border-neutral-600 shrink-0" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden select-text">
      {/* Left Column: Project Overview, 4-step pipeline, checks & actions */}
      <div
        className={`w-full md:w-80 lg:w-96 flex flex-col border-b md:border-b-0 md:border-r overflow-y-auto p-4 space-y-4 shrink-0 ${
          isLight ? 'bg-neutral-50/70 border-neutral-200' : 'bg-[#121316] border-[#242527]'
        }`}
      >
        {/* Project Header Info */}
        <div
          className={`p-4 rounded-xl border space-y-2 ${
            isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-[#74aaff] font-medium">
              {activeProject.target.kind}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  activeProject.status === 'Ready'
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'bg-blue-500/15 text-blue-400'
                }`}
              >
                {activeProject.status}
              </span>
            </div>
          </div>

          <h2 className="font-bold text-sm tracking-tight">{activeProject.name}</h2>
          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {activeProject.request}
          </p>

          <div className="text-[11px] text-neutral-400 pt-2 border-t border-inherit space-y-1">
            <div className="flex justify-between">
              <span className="text-neutral-500">Target:</span>
              <span className="truncate max-w-[180px] font-mono">{activeProject.target.url || activeProject.target.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Stack:</span>
              <span>{activeProject.stack}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Builder:</span>
              <span>{activeProject.builder}</span>
            </div>
          </div>
        </div>

        {/* 4-Step Progress Section */}
        <div
          className={`p-4 rounded-xl border space-y-3 ${
            isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436]'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Rebuild Pipeline
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              {activeProject.likeness_score}% alike
            </span>
          </div>

          <div className="space-y-2.5">
            {projectSteps.map((step) => (
              <div key={step.id} className="flex items-start gap-2.5 text-xs">
                {renderStepIcon(step.state)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${
                        step.state === 'active'
                          ? 'text-[#74aaff] font-semibold'
                          : step.state === 'done'
                          ? 'text-neutral-200'
                          : 'text-neutral-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-normal mt-0.5">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Checks (3 Viewports) */}
        <div
          className={`p-4 rounded-xl border space-y-3 ${
            isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f] border-[#343436]'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Likeness Checks
            </h3>
            <span className="text-[11px] text-neutral-500">3 viewports</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div
              className={`p-2 rounded-lg border text-center transition-colors ${
                selectedViewport === 'mobile'
                  ? 'border-[#1659c4] bg-[#1659c4]/10'
                  : 'border-inherit bg-neutral-500/5'
              }`}
              onClick={() => setSelectedViewport('mobile')}
            >
              <Smartphone className="w-4 h-4 mx-auto mb-1 text-neutral-400" />
              <div className="text-[10px] text-neutral-400">Mobile (375)</div>
              <div className="text-xs font-bold text-emerald-400">98%</div>
            </div>

            <div
              className={`p-2 rounded-lg border text-center transition-colors ${
                selectedViewport === 'tablet'
                  ? 'border-[#1659c4] bg-[#1659c4]/10'
                  : 'border-inherit bg-neutral-500/5'
              }`}
              onClick={() => setSelectedViewport('tablet')}
            >
              <Tablet className="w-4 h-4 mx-auto mb-1 text-neutral-400" />
              <div className="text-[10px] text-neutral-400">Tablet (768)</div>
              <div className="text-xs font-bold text-emerald-400">95%</div>
            </div>

            <div
              className={`p-2 rounded-lg border text-center transition-colors ${
                selectedViewport === 'desktop'
                  ? 'border-[#1659c4] bg-[#1659c4]/10'
                  : 'border-inherit bg-neutral-500/5'
              }`}
              onClick={() => setSelectedViewport('desktop')}
            >
              <Monitor className="w-4 h-4 mx-auto mb-1 text-neutral-400" />
              <div className="text-[10px] text-neutral-400">Desktop (1280)</div>
              <div className="text-xs font-bold text-emerald-400">96%</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => setPreviewOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1659c4] hover:bg-[#2d81ff] text-white font-medium text-xs shadow flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Play / Open Preview</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => showToast(`Folder: ~/Documents/Craft Anything/${activeProject.name}`)}
              className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                isLight ? 'bg-white border-neutral-300 hover:bg-neutral-100' : 'bg-[#1b1c1f] border-[#343436] hover:bg-[#25262a]'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5 text-neutral-400" />
              <span>Open folder</span>
            </button>

            <button
              onClick={() => togglePinProject(activeProject.id)}
              className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                isPinned ? 'border-[#1659c4] text-[#74aaff] bg-blue-500/10' : isLight ? 'bg-white border-neutral-300 hover:bg-neutral-100' : 'bg-[#1b1c1f] border-[#343436] hover:bg-[#25262a]'
              }`}
            >
              <Pin className="w-3.5 h-3.5" />
              <span>{isPinned ? 'Pinned' : 'Pin build'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Activity Feed & Chat / Prompt Box */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent">
        {/* Activity Feed Header */}
        <div
          className={`h-10 px-4 flex items-center justify-between border-b text-xs ${
            isLight ? 'border-neutral-200 text-neutral-600' : 'border-[#242527] text-neutral-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#74aaff]" />
            <span className="font-semibold text-neutral-300">Activity & Verification Feed</span>
          </div>
          <span className="text-[11px] text-neutral-500 font-mono">
            {projectFeed.length} events recorded
          </span>
        </div>

        {/* Scrollable Feed List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {projectFeed.map((item) => {
            if (item.type === 'user') {
              return (
                <div key={item.id} className="flex justify-end">
                  <div className="max-w-xl p-3.5 rounded-2xl bg-[#1659c4] text-white text-xs leading-relaxed shadow-sm">
                    {item.text}
                  </div>
                </div>
              );
            }

            if (item.type === 'status') {
              return (
                <div key={item.id} className="flex items-center justify-center">
                  <div className="text-[11px] text-neutral-500 bg-neutral-500/10 px-3 py-1 rounded-full flex items-center gap-1.5 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{item.text}</span>
                  </div>
                </div>
              );
            }

            if (item.type === 'tool') {
              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border text-xs max-w-xl space-y-1 ${
                    isLight ? 'bg-white border-neutral-300' : 'bg-[#1b1c1f]/80 border-[#343436]'
                  }`}
                >
                  <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                    <span className="font-mono flex items-center gap-1 text-[#74aaff]">
                      <Terminal className="w-3 h-3" />
                      {item.toolName}
                    </span>
                    <span>Proof recorded</span>
                  </div>
                  <p className="text-neutral-300 text-xs">{item.toolSummary}</p>
                </div>
              );
            }

            if (item.type === 'check') {
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border text-xs max-w-xl space-y-2.5 ${
                    isLight ? 'bg-white border-emerald-300' : 'bg-emerald-950/20 border-emerald-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Visual Comparison Completed
                    </span>
                    <span className="font-mono text-sm">{item.checkResult?.overallLikeness}% match</span>
                  </div>
                  <div className="space-y-1.5 pt-1 text-[11px] text-neutral-300">
                    {item.checkResult?.viewports.map((v, i) => (
                      <div key={i} className="flex justify-between items-center bg-black/20 p-2 rounded">
                        <span className="font-medium">{v.name}:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-400">{v.differences.join(', ')}</span>
                          <span className="font-bold text-emerald-400 font-mono">{v.likeness}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (item.type === 'consent' && item.consent) {
              const c = item.consent;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border text-xs max-w-xl space-y-3 ${
                    isLight ? 'bg-amber-50 border-amber-300' : 'bg-amber-950/20 border-amber-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2 text-amber-400 font-semibold">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>Approval Needed: {c.title}</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">{c.description}</p>
                  {c.answered ? (
                    <div className="text-xs text-neutral-400 font-medium">
                      Answered: <span className="font-semibold text-white">{c.answered}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => grantConsent(item.id, 'Once')}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs transition-colors"
                      >
                        Allow once
                      </button>
                      <button
                        onClick={() => grantConsent(item.id, 'Always')}
                        className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs transition-colors"
                      >
                        Always for this project
                      </button>
                      <button
                        onClick={() => grantConsent(item.id, 'Deny')}
                        className="px-3 py-1.5 rounded-lg border border-neutral-700 hover:bg-red-500/20 text-red-400 font-medium text-xs transition-colors"
                      >
                        Deny
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            if (item.type === 'question' && item.question) {
              const q = item.question;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border text-xs max-w-xl space-y-3 ${
                    isLight ? 'bg-blue-50 border-blue-300' : 'bg-blue-950/20 border-blue-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2 text-[#74aaff] font-semibold">
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    <span>Decision for you</span>
                  </div>
                  <p className="text-neutral-200 leading-relaxed">{q.prompt}</p>
                  <div className="space-y-1.5 pt-1">
                    {q.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => !q.selected && answerQuestion(item.id, opt)}
                        disabled={!!q.selected}
                        className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                          q.selected === opt
                            ? 'border-[#1659c4] bg-[#1659c4] text-white font-semibold'
                            : q.selected
                            ? 'opacity-40 border-neutral-800'
                            : 'border-neutral-700/60 hover:border-[#1659c4] hover:bg-blue-500/10 text-neutral-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }

            // Default Assistant Message
            return (
              <div key={item.id} className="flex justify-start">
                <div
                  className={`max-w-xl p-3.5 rounded-2xl border text-xs leading-relaxed ${
                    isLight
                      ? 'bg-white border-neutral-300 text-neutral-800'
                      : 'bg-[#1b1c1f] border-[#343436] text-[#f2f1ee]'
                  }`}
                >
                  {item.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Prompt / Follow-up Input Box */}
        <div
          className={`p-3 border-t shrink-0 ${
            isLight ? 'bg-white border-neutral-200' : 'bg-[#101014] border-[#242527]'
          }`}
        >
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={justAskMode}
                  onChange={(e) => setJustAskMode(e.target.checked)}
                  className="rounded text-[#1659c4] focus:ring-0"
                />
                <span className={justAskMode ? 'font-semibold text-[#74aaff]' : 'text-neutral-400'}>
                  Just ask
                </span>
              </label>
              <span className="text-[11px] text-neutral-500">
                {justAskMode
                  ? '(Ask questions without modifying code)'
                  : '(Ask for tweaks, improvements or new features)'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                justAskMode
                  ? 'Ask how something works in this build…'
                  : 'Say what to change or refine (e.g. "make the buttons larger", "add keyboard navigation")…'
              }
              className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#1659c4] ${
                isLight ? 'bg-neutral-50 border-neutral-300' : 'bg-[#1b1c1f] border-[#343436] text-white'
              }`}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className={`px-4 py-2.5 rounded-xl font-medium text-xs shadow flex items-center gap-1.5 transition-all ${
                inputMessage.trim()
                  ? 'bg-[#1659c4] hover:bg-[#2d81ff] text-white cursor-pointer'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Interactive In-App Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div
            className={`w-full max-w-4xl h-[82vh] rounded-2xl border flex flex-col shadow-2xl overflow-hidden ${
              isLight ? 'bg-white border-neutral-300' : 'bg-[#121316] border-[#343436]'
            }`}
          >
            {/* Preview Browser Chrome */}
            <div className="h-10 px-4 bg-[#1b1c1f] border-b border-[#343436] flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-[11px] text-neutral-400">
                  http://localhost:3000 (Built by Craft Anything)
                </span>
              </div>
              <button
                onClick={() => setPreviewOpen(false)}
                className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              >
                Close preview
              </button>
            </div>

            {/* Preview Content Frame */}
            <div className="flex-1 bg-neutral-900 overflow-y-auto p-6 flex flex-col items-center">
              <div className="w-full max-w-2xl bg-white text-neutral-900 rounded-xl shadow-lg p-6 space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🥐</span>
                    <span className="font-bold text-lg text-amber-950">{activeProject.name}</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    Live React Build (96% Match)
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-neutral-800">Fresh Artisan Breads & Pastries</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Baked fresh every morning with organic heritage flour, wild fermented sourdough starter, and pure cream butter.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg bg-amber-50/50 space-y-1">
                    <div className="font-semibold text-xs">Sourdough Country Loaf</div>
                    <div className="text-[11px] text-neutral-500">$8.50 • 24hr Slow Ferment</div>
                    <button className="mt-2 w-full py-1 rounded bg-amber-900 text-white text-[11px] font-medium">Add to Cart</button>
                  </div>
                  <div className="p-3 border rounded-lg bg-amber-50/50 space-y-1">
                    <div className="font-semibold text-xs">Cardamom Morning Bun</div>
                    <div className="text-[11px] text-neutral-500">$4.75 • Spiced & Glazed</div>
                    <button className="mt-2 w-full py-1 rounded bg-amber-900 text-white text-[11px] font-medium">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
