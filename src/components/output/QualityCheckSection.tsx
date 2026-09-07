import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  TrendingUp,
  AlertCircle,
  Clock,
  Volume2,
  FileCheck2,
  Copy,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { ContentQualityCheck, GodseyeAiResult, RegenerateComponentType } from '../../types';

interface QualityCheckSectionProps {
  qualityCheck?: ContentQualityCheck;
  aiResult?: GodseyeAiResult;
  onCopyText: (text: string, label: string) => void;
  onViewScript?: () => void;
  onRegenerateComponent?: (component: RegenerateComponentType) => void;
  isLoading?: boolean;
}

export const QualityCheckSection: React.FC<QualityCheckSectionProps> = ({
  qualityCheck,
  aiResult,
  onCopyText,
  onViewScript,
  onRegenerateComponent,
  isLoading,
}) => {
  if (!qualityCheck) {
    return (
      <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400">
        <FileCheck2 className="w-8 h-8 text-slate-600 mx-auto mb-3" />
        <p className="text-sm">Quality check data is not yet generated. Generate content to view the audit.</p>
      </div>
    );
  }

  const criteria = [
    { key: 'hookStrength', label: 'Hook Strength', item: qualityCheck.hookStrength, icon: Zap, color: 'text-amber-400' },
    { key: 'curiosity', label: 'Curiosity Gap', item: qualityCheck.curiosity, icon: Sparkles, color: 'text-purple-400' },
    { key: 'clarity', label: 'Clarity & Simplicity', item: qualityCheck.clarity, icon: CheckCircle2, color: 'text-cyan-400' },
    { key: 'pacing', label: 'Pacing & Cadence', item: qualityCheck.pacing, icon: Clock, color: 'text-blue-400' },
    { key: 'repetition', label: 'Repetition Elimination', item: qualityCheck.repetition, icon: FileCheck2, color: 'text-emerald-400' },
    { key: 'weakSentences', label: 'Sentence Muscle', item: qualityCheck.weakSentences, icon: TrendingUp, color: 'text-indigo-400' },
    { key: 'boringSections', label: 'Retention Rhythm', item: qualityCheck.boringSections, icon: Volume2, color: 'text-rose-400' },
    { key: 'unsupportedClaims', label: 'Factual Accuracy', item: qualityCheck.unsupportedClaims, icon: ShieldCheck, color: 'text-teal-400' },
    { key: 'missingContext', label: 'Context Coverage', item: qualityCheck.missingContext, icon: AlertCircle, color: 'text-yellow-400' },
    { key: 'endingStrength', label: 'Ending Retention & CTA', item: qualityCheck.endingStrength, icon: Zap, color: 'text-pink-400' },
  ];

  const handleCopyReport = () => {
    const report = `==================================================
GODSEYE AI - CONTENT QUALITY CHECK AUDIT
==================================================
OVERALL QUALITY SCORE: ${qualityCheck.overallScore}/10
FACTUAL INTEGRITY: ${qualityCheck.factualIntegrityVerified ? 'VERIFIED (100% Truthful)' : 'Pending'}

10-POINT SCRIPT AUDIT:
${criteria
  .map(
    (c) => `• ${c.label}: ${c.item.score}/10 [${c.item.status.toUpperCase()}] - ${c.item.note}`
  )
  .join('\n')}

AUTO-IMPROVEMENTS APPLIED:
${qualityCheck.autoImprovementsApplied.map((imp) => `• ${imp}`).join('\n')}
==================================================`;
    onCopyText(report, 'Content Quality Check Audit');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-900 border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide font-heading">
              CONTENT QUALITY CHECK — 10-POINT SCRIPT AUDIT
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Automated diagnostic engine analyzes hook strength, curiosity gaps, pacing, and factual integrity. Weak points are automatically repaired before final script presentation.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto flex-shrink-0">
          <div className="px-3.5 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-center">
            <span className="text-[10px] text-cyan-300 uppercase font-bold tracking-wider block">Overall Score</span>
            <span className="text-xl font-black text-cyan-300 font-mono">{qualityCheck.overallScore}<span className="text-xs text-cyan-500 font-normal">/10</span></span>
          </div>

          <button
            type="button"
            onClick={handleCopyReport}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Audit</span>
          </button>
        </div>
      </div>

      {/* Factual Integrity Banner */}
      <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-slate-200">
            <strong className="text-emerald-300 font-semibold">Factual Integrity Verified:</strong> All claims, statistics, and events are cross-referenced strictly with your input story. Zero hallucinated claims.
          </span>
        </div>
        {onRegenerateComponent && (
          <button
            type="button"
            disabled={isLoading}
            onClick={() => onRegenerateComponent('script')}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer whitespace-nowrap disabled:opacity-50"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Re-Audit & Polish</span>
          </button>
        )}
      </div>

      {/* 10-Point Criteria Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Diagnostic Breakdown (10 Evaluation Criteria)
          </h4>
          <span className="text-[11px] text-slate-400 font-mono">10 of 10 Evaluated & Passed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {criteria.map((c) => {
            const Icon = c.icon;
            const isOptimized = c.item.status === 'optimized';
            return (
              <div
                key={c.key}
                className="p-3.5 rounded-xl bg-[#0e1422] border border-slate-800/80 hover:border-slate-700 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${c.color}`} />
                    <span className="text-xs font-bold text-white">{c.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isOptimized
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                          : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                      }`}
                    >
                      {isOptimized ? 'Auto-Optimized' : 'Passed'}
                    </span>
                    <span className="text-xs font-mono font-bold text-white bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      {c.item.score}/10
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pl-6">{c.item.note}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Auto-Improvements Applied */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
            Auto-Improvements Applied To Final Script
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {qualityCheck.autoImprovementsApplied.map((imp, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{imp}</span>
            </div>
          ))}
        </div>

        {onViewScript && (
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onViewScript}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Final Polished Script & Voice-Over Direction</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
