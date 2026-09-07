import React, { useState } from 'react';
import {
  Tv,
  Share2,
  Copy,
  Check,
  Sparkles,
  Tag,
  Hash,
  MessageSquare,
  ListOrdered,
  Clock,
  ExternalLink,
  Search,
  CheckCircle2,
} from 'lucide-react';
import {
  MultiPlatformSeoPackage,
  OutputTab,
} from '../../types';

interface SeoPlatformSectionProps {
  platformTab: OutputTab;
  seo?: MultiPlatformSeoPackage;
  onCopyText: (text: string, label: string) => void;
}

export const SeoPlatformSection: React.FC<SeoPlatformSectionProps> = ({
  platformTab,
  seo,
  onCopyText,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, key: string, label: string) => {
    onCopyText(text, label);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!seo) {
    return (
      <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400">
        <p className="text-sm">No SEO data available yet. Generate content to view tailored platform SEO.</p>
      </div>
    );
  }

  // Sub-renderers for each platform
  switch (platformTab) {
    case 'YouTube Shorts': {
      const data = seo.youtubeShorts;
      if (!data) return null;

      const titleOptions = [
        { type: '1. High CTR', value: data.titles?.highCtr },
        { type: '2. Curiosity Driven', value: data.titles?.curiosity },
        { type: '3. Search Optimized', value: data.titles?.searchOptimized },
        { type: '4. Informative', value: data.titles?.informative },
        { type: '5. Dramatic', value: data.titles?.dramatic },
      ];

      return (
        <div className="space-y-6 animate-fadeIn">
          {/* Header */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500/10 via-rose-500/10 to-slate-900 border border-red-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Tv className="w-5 h-5 text-red-400" />
                <h3 className="text-base font-bold text-white font-heading">
                  YOUTUBE SHORTS SEO ENGINE
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                5 algorithmic title variations, searchable description, high-retention hashtags & conversion CTA.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const fullText = `YOUTUBE SHORTS SEO
Titles:
${titleOptions.map((t) => `${t.type}: ${t.value}`).join('\n')}

Description:
${data.description}

Primary Keyword: ${data.primaryKeyword}
Hashtags: ${data.hashtags?.join(' ')}
CTA: ${data.cta}`;
                handleCopy(fullText, 'yt-shorts-all', 'YouTube Shorts Package');
              }}
              className="px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900/80 border border-red-700/60 text-xs font-semibold text-red-200 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              {copiedField === 'yt-shorts-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Shorts SEO</span>
            </button>
          </div>

          {/* 5 Title Options */}
          <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-4">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              5 High-Impact Title Options
            </h4>

            <div className="space-y-2.5">
              {titleOptions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 block mb-0.5">
                      {item.type}
                    </span>
                    <span className="text-sm text-slate-100 font-medium">{item.value}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.value || '', `yt-stitle-${idx}`, `Shorts Title ${idx + 1}`)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors self-end sm:self-auto cursor-pointer"
                    title="Copy title"
                  >
                    {copiedField === `yt-stitle-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description & CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-rose-400" />
                  Shorts Description
                </h4>
                <button
                  type="button"
                  onClick={() => handleCopy(data.description, 'yt-sdesc', 'Shorts Description')}
                  className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  {copiedField === 'yt-sdesc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                {data.description}
              </div>
            </div>

            <div className="space-y-5">
              {/* Call to Action */}
              <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Call To Action (CTA)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(data.cta, 'yt-scta', 'Shorts CTA')}
                    className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                  >
                    {copiedField === 'yt-scta' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs font-semibold text-emerald-300 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                  {data.cta}
                </p>
              </div>

              {/* Hashtags & Keywords */}
              <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-red-400" />
                    Relevant Hashtags
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(data.hashtags?.join(' ') || '', 'yt-shash', 'Shorts Hashtags')}
                    className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg cursor-pointer"
                  >
                    {copiedField === 'yt-shash' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy All</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {data.hashtags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-red-950/40 text-red-300 border border-red-800/40 text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'YouTube': {
      const data = seo.youtubeLong;
      if (!data) return null;

      return (
        <div className="space-y-6 animate-fadeIn">
          {/* Header */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600/10 via-red-500/10 to-slate-900 border border-red-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Tv className="w-5 h-5 text-red-500" />
                <h3 className="text-base font-bold text-white font-heading">
                  YOUTUBE LONG-FORM VIDEO SEO ENGINE
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Ranked title variations, searchable description, chapter timestamps & keyword tags.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const fullText = `YOUTUBE LONG VIDEO SEO
Titles:
${data.titles?.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Description:
${data.description}

Chapters:
${data.chapters?.map((c) => `${c.time} - ${c.title}`).join('\n')}

Keywords:
Primary: ${data.primaryKeyword}
Secondary: ${data.secondaryKeywords?.join(', ')}

Hashtags: ${data.hashtags?.join(' ')}
CTA: ${data.cta}`;
                handleCopy(fullText, 'yt-long-all', 'YouTube Long SEO Package');
              }}
              className="px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900/80 border border-red-700/60 text-xs font-semibold text-red-200 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              {copiedField === 'yt-long-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Full YouTube SEO</span>
            </button>
          </div>

          {/* 5 Title Options */}
          <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-4">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              5 Recommended YouTube Video Titles
            </h4>

            <div className="space-y-2.5">
              {data.titles?.map((title, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-red-950 text-red-300 font-mono text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-slate-100 font-medium">{title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(title, `yt-ltitle-${idx}`, `YouTube Title ${idx + 1}`)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedField === `yt-ltitle-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description & Chapters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Full SEO Video Description
                </h4>
                <button
                  type="button"
                  onClick={() => handleCopy(data.description, 'yt-ldesc', 'YouTube Description')}
                  className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg cursor-pointer"
                >
                  {copiedField === 'yt-ldesc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto">
                {data.description}
              </div>
            </div>

            <div className="space-y-5">
              {/* Chapters Suggestion */}
              {data.chapters && data.chapters.length > 0 && (
                <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Suggested Video Chapters
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const chapterStr = data.chapters?.map((c) => `${c.time} - ${c.title}`).join('\n') || '';
                        handleCopy(chapterStr, 'yt-chapters', 'YouTube Chapters');
                      }}
                      className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                    >
                      {copiedField === 'yt-chapters' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {data.chapters.map((ch, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/60 text-xs">
                        <span className="font-mono text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded">
                          {ch.time}
                        </span>
                        <span className="text-slate-200">{ch.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hashtags & CTA */}
              <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Hashtags & CTA
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(data.hashtags?.join(' ') || '', 'yt-lhash', 'YouTube Hashtags')}
                    className="text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg cursor-pointer"
                  >
                    {copiedField === 'yt-lhash' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {data.hashtags?.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-red-950/40 text-red-300 border border-red-800/40 text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic pt-2 border-t border-slate-800">
                  CTA: <strong className="text-emerald-300 not-italic">{data.cta}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'Instagram': {
      const data = seo.instagram;
      if (!data) return null;

      return (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-slate-900 border border-pink-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-pink-400" />
                <h3 className="text-base font-bold text-white font-heading">
                  INSTAGRAM REELS SEO & CAPTION ENGINE
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Scroll-stopping first line hook, readable caption with line breaks, search keywords & reach tags.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const fullText = `${data.firstLineHook}\n\n${data.caption}\n\n${data.cta}\n\n${data.hashtags?.join(' ')}`;
                handleCopy(fullText, 'ig-all', 'Instagram Package');
              }}
              className="px-3 py-1.5 rounded-xl bg-pink-950/80 hover:bg-pink-900/80 border border-pink-700/60 text-xs font-semibold text-pink-200 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              {copiedField === 'ig-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Instagram Package</span>
            </button>
          </div>

          {/* First Line Hook Highlight */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/60 via-purple-950/40 to-slate-900 border border-pink-500/40 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-pink-300 tracking-wider block">
                Scroll-Stopping First-Line Hook
              </span>
              <p className="text-sm font-semibold text-white mt-0.5">"{data.firstLineHook}"</p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(data.firstLineHook, 'ig-hook', 'Instagram Hook')}
              className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white cursor-pointer"
            >
              {copiedField === 'ig-hook' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Caption & Metadata */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Full Instagram Caption
                </h4>
                <button
                  type="button"
                  onClick={() => handleCopy(data.caption, 'ig-caption', 'Instagram Caption')}
                  className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg cursor-pointer"
                >
                  {copiedField === 'ig-caption' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto">
                {data.caption}
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Reel Call-To-Action
                </span>
                <p className="text-xs font-semibold text-emerald-300 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                  {data.cta}
                </p>
              </div>

              <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-pink-400" />
                    Hashtags ({data.hashtags?.length || 0})
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(data.hashtags?.join(' ') || '', 'ig-hash', 'Instagram Hashtags')}
                    className="text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg cursor-pointer"
                  >
                    {copiedField === 'ig-hash' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {data.hashtags?.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-pink-950/40 text-pink-300 border border-pink-800/40 text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'Facebook': {
      const reels = seo.facebookReels;
      const video = seo.facebookVideo;

      return (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-slate-900 border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white font-heading">
                  FACEBOOK SEO & FEED ENGAGEMENT (REELS & VIDEO)
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Optimized for discussion in Facebook feed algorithms, comment velocity & community sharing.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const fullText = `FACEBOOK REELS:
${reels?.caption}
CTA: ${reels?.cta}
Tags: ${reels?.hashtags?.join(' ')}

FACEBOOK VIDEO:
Title: ${video?.title}
${video?.description}
CTA: ${video?.cta}
Tags: ${video?.hashtags?.join(' ')}`;
                handleCopy(fullText, 'fb-all', 'Facebook Package');
              }}
              className="px-3 py-1.5 rounded-xl bg-blue-950/80 hover:bg-blue-900/80 border border-blue-700/60 text-xs font-semibold text-blue-200 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              {copiedField === 'fb-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy All Facebook SEO</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Facebook Reels Box */}
            {reels && (
              <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    Facebook Reels Optimization
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleCopy(`${reels.caption}\n\n${reels.hashtags?.join(' ')}`, 'fb-reel-copy', 'FB Reel')}
                    className="text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg cursor-pointer"
                  >
                    {copiedField === 'fb-reel-copy' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">Caption:</span>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto">
                    {reels.caption}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">Reels CTA:</span>
                  <p className="text-xs text-emerald-300 font-medium bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/40">
                    {reels.cta}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Hashtags:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {reels.hashtags?.map((t, idx) => (
                      <span key={idx} className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-800/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Facebook Video Box */}
            {video && (
              <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    Facebook Video Post
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleCopy(`${video.title}\n\n${video.description}\n\n${video.hashtags?.join(' ')}`, 'fb-video-copy', 'FB Video')}
                    className="text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg cursor-pointer"
                  >
                    {copiedField === 'fb-video-copy' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">Video Headline / Title:</span>
                  <p className="text-sm font-bold text-white bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    {video.title}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">Post Description:</span>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line max-h-36 overflow-y-auto">
                    {video.description}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">Feed Discussion CTA:</span>
                  <p className="text-xs text-emerald-300 font-medium bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/40">
                    {video.cta}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'TikTok': {
      const data = seo.tiktok;
      if (!data) return null;

      return (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-pink-500/10 to-slate-900 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                TIKTOK SEARCH & CREATOR CAPTION ENGINE
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Natural, conversational creator tone (not an SEO essay) with native TikTok search intent phrases.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const fullText = `${data.caption}\n\n${data.cta}\n\n${data.hashtags?.join(' ')}`;
                handleCopy(fullText, 'tt-all', 'TikTok Package');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-cyan-200 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              {copiedField === 'tt-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy TikTok Caption</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Conversational TikTok Caption
                </h4>
                <button
                  type="button"
                  onClick={() => handleCopy(data.caption, 'tt-cap', 'TikTok Caption')}
                  className="text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg cursor-pointer"
                >
                  {copiedField === 'tt-cap' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                {data.caption}
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300">
                <strong>CTA:</strong> {data.cta}
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-cyan-400" />
                  TikTok Search Keywords
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.searchKeywords?.map((kw, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-cyan-950/40 text-cyan-300 border border-cyan-800/40 text-xs">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-pink-400" />
                    FYP & Niche Tags
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(data.hashtags?.join(' ') || '', 'tt-hash', 'TikTok Tags')}
                    className="text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg cursor-pointer"
                  >
                    {copiedField === 'tt-hash' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {data.hashtags?.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-pink-950/40 text-pink-300 border border-pink-800/40 text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'Snapchat': {
      const data = seo.snapchat;
      if (!data) return null;

      return (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-slate-900 border border-yellow-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                SNAPCHAT SPOTLIGHT SEO ENGINE
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Ultra-short punchy captions, topic tags, and high-velocity discovery hashtags.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const fullText = `${data.caption}\n\n${data.cta}\n\n${data.hashtags?.join(' ')}`;
                handleCopy(fullText, 'snap-all', 'Snapchat Package');
              }}
              className="px-3 py-1.5 rounded-xl bg-yellow-950/80 hover:bg-yellow-900/80 border border-yellow-700/60 text-xs font-semibold text-yellow-200 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              {copiedField === 'snap-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Snapchat Package</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Short Spotlight Caption
              </span>
              <p className="text-sm font-semibold text-white bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                "{data.caption}"
              </p>
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300">
                <strong>CTA:</strong> {data.cta}
              </div>
            </div>

            <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Topic Keywords & Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {data.hashtags?.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-yellow-950/40 text-yellow-300 border border-yellow-800/40 text-xs font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'X': {
      const data = seo.x;
      if (!data) return null;

      return (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-700/20 to-slate-900 border border-slate-700/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                X (TWITTER) VIRAL POST ENGINE
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Concise, high-impact curiosity opening, fact breakdown, relevant tags, and retweet CTA.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const fullText = `${data.postText}\n\n${data.cta}\n\n${data.hashtags?.join(' ')}`;
                handleCopy(fullText, 'x-all', 'X Post Package');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-slate-200 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              {copiedField === 'x-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy X Post</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Post Content
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(data.postText, 'x-text', 'X Post Text')}
                  className="text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg cursor-pointer"
                >
                  {copiedField === 'x-text' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                {data.postText}
              </div>
              <p className="text-xs text-emerald-300 font-medium">CTA: {data.cta}</p>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Search Keywords & Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.hashtags?.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'Pinterest': {
      const data = seo.pinterest;
      if (!data) return null;

      return (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-700/10 via-rose-700/10 to-slate-900 border border-red-600/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                PINTEREST SEO & PIN TITLE ENGINE
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Optimized for evergreen search queries, discovery boards, and long-tail image SEO.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const fullText = `PIN TITLE:\n${data.pinTitle}\n\nPIN DESCRIPTION:\n${data.pinDescription}\n\nHASHTAGS:\n${data.hashtags?.join(' ')}`;
                handleCopy(fullText, 'pin-all', 'Pinterest Package');
              }}
              className="px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900/80 border border-red-700/60 text-xs font-semibold text-red-200 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              {copiedField === 'pin-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Pin SEO</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Optimized Pin Title
                </span>
                <p className="text-sm font-bold text-white bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  {data.pinTitle}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Pin Description (Evergreen)
                </span>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                  {data.pinDescription}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Long-Tail Search Queries
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.longTailKeywords?.map((kw, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 text-xs">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Pin Hashtags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.hashtags?.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-red-950/40 text-red-300 border border-red-800/40 text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'LinkedIn': {
      const data = seo.linkedin;
      if (!data) return null;

      return (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-700/10 via-cyan-700/10 to-slate-900 border border-blue-600/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                LINKEDIN PROFESSIONAL ARTICLE & POST ENGINE
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Refined, analytical, informative tone (not sensationalized) with professional takeaways and discussion CTA.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const fullText = `${data.postText}\n\n${data.cta}\n\n${data.hashtags?.join(' ')}`;
                handleCopy(fullText, 'li-all', 'LinkedIn Package');
              }}
              className="px-3 py-1.5 rounded-xl bg-blue-950/80 hover:bg-blue-900/80 border border-blue-700/60 text-xs font-semibold text-blue-200 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              {copiedField === 'li-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy LinkedIn Post</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Professional Post Text
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(data.postText, 'li-text', 'LinkedIn Post Text')}
                  className="text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg cursor-pointer"
                >
                  {copiedField === 'li-text' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed max-h-80 overflow-y-auto">
                {data.postText}
              </div>
              <p className="text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/40">
                <strong>Discussion CTA:</strong> {data.cta}
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Industry Keywords
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.keywords?.map((kw, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 text-xs">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[#0e1422] border border-slate-800 p-5 space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Professional Hashtags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.hashtags?.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-800/40 text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};
