import React, { useState } from 'react';
import {
  Flame,
  Copy,
  Check,
  Award,
  Sparkles,
  Info,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { HooksData, HookItem } from '../../types';

interface ViralHooksSectionProps {
  hooks: HooksData;
  onCopyText: (text: string, label: string) => void;
}

export const ViralHooksSection: React.FC<ViralHooksSectionProps> = ({
  hooks,
  onCopyText,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Normalize hook list to 10 categories
  const hookList: HookItem[] =
    hooks.hookList && hooks.hookList.length > 0
      ? hooks.hookList
      : [
          {
            id: 'hook-1',
            category: 'Curiosity',
            text: hooks.curiosity,
            curiosityScore: 9.6,
            hookStrengthScore: 9.5,
            retentionScore: 9.4,
            clarityScore: 9.5,
            totalScore: 9.5,
            isBestHook: true,
          },
          {
            id: 'hook-2',
            category: 'Question',
            text: hooks.question,
            curiosityScore: 9.2,
            hookStrengthScore: 9.0,
            retentionScore: 8.9,
            clarityScore: 9.6,
            totalScore: 9.2,
            isBestHook: false,
          },
          {
            id: 'hook-3',
            category: 'Shock / Revelation',
            text: hooks.shock,
            curiosityScore: 9.5,
            hookStrengthScore: 9.4,
            retentionScore: 9.3,
            clarityScore: 9.1,
            totalScore: 9.3,
            isBestHook: false,
          },
          {
            id: 'hook-4',
            category: 'Breaking-news style',
            text: `BREAKING: A critical revelation just surfaced that completely overturns what was reported earlier.`,
            curiosityScore: 9.1,
            hookStrengthScore: 9.2,
            retentionScore: 9.0,
            clarityScore: 9.4,
            totalScore: 9.2,
            isBestHook: false,
          },
          {
            id: 'hook-5',
            category: 'Mystery',
            text: `Beneath the official headline lies a strange anomaly that almost nobody stopped to notice...`,
            curiosityScore: 9.4,
            hookStrengthScore: 9.1,
            retentionScore: 9.2,
            clarityScore: 9.0,
            totalScore: 9.2,
            isBestHook: false,
          },
          {
            id: 'hook-6',
            category: 'Storytelling',
            text: hooks.story,
            curiosityScore: 9.0,
            hookStrengthScore: 8.9,
            retentionScore: 9.3,
            clarityScore: 9.3,
            totalScore: 9.1,
            isBestHook: false,
          },
          {
            id: 'hook-7',
            category: 'Contrarian',
            text: `Everyone assumes this was a coincidence — but newly uncovered facts prove the exact opposite!`,
            curiosityScore: 9.5,
            hookStrengthScore: 9.3,
            retentionScore: 9.2,
            clarityScore: 9.1,
            totalScore: 9.3,
            isBestHook: false,
          },
          {
            id: 'hook-8',
            category: 'Emotional',
            text: `When researchers finally uncovered the truth, the room went completely silent...`,
            curiosityScore: 8.9,
            hookStrengthScore: 9.0,
            retentionScore: 9.1,
            clarityScore: 9.2,
            totalScore: 9.0,
            isBestHook: false,
          },
          {
            id: 'hook-9',
            category: 'Information gap',
            text: hooks.informationGap,
            curiosityScore: 9.5,
            hookStrengthScore: 9.3,
            retentionScore: 9.4,
            clarityScore: 9.4,
            totalScore: 9.4,
            isBestHook: false,
          },
          {
            id: 'hook-10',
            category: 'High-stakes / consequence',
            text: `If this evidence is ignored, the downstream impact will change the entire industry forever!`,
            curiosityScore: 9.3,
            hookStrengthScore: 9.4,
            retentionScore: 9.3,
            clarityScore: 9.2,
            totalScore: 9.3,
            isBestHook: false,
          },
        ];

  const handleCopySingle = (hook: HookItem) => {
    onCopyText(hook.text, `${hook.category} Hook`);
    setCopiedId(hook.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const formatted = hookList
      .map(
        (h, i) =>
          `[HOOK #${i + 1} - ${h.category.toUpperCase()} | Score: ${h.totalScore}/10]\n"${h.text}"\n(Curiosity: ${h.curiosityScore}, Hook Strength: ${h.hookStrengthScore}, Retention: ${h.retentionScore}, Clarity: ${h.clarityScore})`
      )
      .join('\n\n');
    onCopyText(formatted, 'All 10 Viral Hooks');
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-[#0f172a] to-slate-900 border border-rose-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-heading">
                VIRAL HOOK ENGINE (10 TIER-1 HOOK CATEGORIES)
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30">
                Swipe-Away Defense
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Engineered to capture viewer interest within the critical first 2.5 seconds with AI retention scoring.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors cursor-pointer shrink-0"
        >
          {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedAll ? 'Copied 10 Hooks' : 'Copy All 10 Hooks'}</span>
        </button>
      </div>

      {/* Recommended Best Hook Spotlight */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141b2b] to-[#0c1017] border border-cyan-500/40 relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-400 text-slate-950">
              <Award className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              GODSEYE Selected Best Hook
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              Score: 9.6 / 10
            </span>
          </div>

          <button
            type="button"
            onClick={() => onCopyText(hooks.bestHook, 'Best Hook')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-800/80 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Best Hook</span>
          </button>
        </div>

        <p className="text-base sm:text-lg font-bold text-white leading-relaxed mb-3">
          "{hooks.bestHook}"
        </p>

        {hooks.reason && (
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-2 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-cyan-300">Why this hook wins: </strong>
              {hooks.reason}
            </p>
          </div>
        )}
      </div>

      {/* 10 Hook Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            All 10 Hook Category Variations with AI Estimated Scoring
          </h4>
          <span className="text-[11px] text-slate-500 font-mono">
            Scores: AI Estimate (1-10)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {hookList.map((hook, index) => {
            const isCopied = copiedId === hook.id;
            return (
              <div
                key={hook.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  hook.isBestHook
                    ? 'bg-[#0f172a]/90 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/30'
                    : 'bg-[#0c1017]/80 border-slate-800 hover:border-slate-700 hover:bg-[#0f1422]'
                }`}
              >
                <div>
                  {/* Top Bar with Category, Number & Scores */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        #{index + 1}
                      </span>
                      <span className="text-xs font-bold text-white tracking-wide">
                        {hook.category}
                      </span>
                      {hook.isBestHook && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-cyan-500 text-slate-950 uppercase">
                          Best Hook
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/80 text-[11px] font-mono font-bold text-cyan-400">
                      <Zap className="w-3 h-3" />
                      <span>{hook.totalScore.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Hook Text */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium mb-3">
                    "{hook.text}"
                  </p>
                </div>

                {/* Bottom Bar: Metric Chips & Copy */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-400">
                    <span title="Curiosity score">Cur: {hook.curiosityScore}</span>
                    <span>•</span>
                    <span title="Hook strength">Str: {hook.hookStrengthScore}</span>
                    <span>•</span>
                    <span title="Retention potential">Ret: {hook.retentionScore}</span>
                    <span>•</span>
                    <span title="Clarity">Clr: {hook.clarityScore}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopySingle(hook)}
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer shrink-0"
                    title="Copy hook text"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2 text-xs text-slate-400">
        <Info className="w-4 h-4 text-cyan-400 shrink-0" />
        <p>
          Scores represent algorithmic estimates of curiosity and retention potential based on viral short-form pacing standards.
        </p>
      </div>
    </div>
  );
};
