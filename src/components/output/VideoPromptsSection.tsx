import React, { useState } from 'react';
import {
  Video,
  Copy,
  Check,
  Sparkles,
  Camera,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Volume2,
  Film,
  Compass,
  Eye,
  RotateCcw,
  Maximize2,
  ExternalLink,
} from 'lucide-react';
import { SceneItem, MasterVideoStyle, VideoFormat, Mood } from '../../types';

interface VideoPromptsSectionProps {
  scenes: SceneItem[];
  masterVideoStyle?: MasterVideoStyle;
  videoFormat: VideoFormat;
  mood: Mood;
  onCopyText: (text: string, label: string) => void;
  onRegenerate?: () => void;
  onSwitchToAdobeExpress?: () => void;
}

export const VideoPromptsSection: React.FC<VideoPromptsSectionProps> = ({
  scenes,
  masterVideoStyle,
  videoFormat,
  mood,
  onCopyText,
  onRegenerate,
  onSwitchToAdobeExpress,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showMasterStyle, setShowMasterStyle] = useState(true);

  const isVertical = videoFormat.includes('9:16');

  const handleCopy = (text: string, key: string, label: string) => {
    onCopyText(text, label);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyAllPrompts = () => {
    const formatted = scenes
      .map(
        (s) => `==================================================
SCENE ${s.sceneNumber < 10 ? `0${s.sceneNumber}` : s.sceneNumber} (${s.startTime} - ${s.endTime} | ${s.duration})
FORMAT: ${videoFormat}
CAMERA: ${s.camera}
TRANSITION: ${s.transition}
VOICE-OVER: "${s.voiceOver}"
VISUAL OBJECTIVE: ${s.visualObjective || 'Narrative hook'}
--------------------------------------------------
GOOGLE FLOW / VEO VIDEO PROMPT:
${s.videoPrompt}

NEGATIVE PROMPT / AVOID:
${s.negativePrompt || 'Avoid cartoonish look, 3D CGI render artifacts, distorted hands or faces, blurry subjects, floating text inside video render, sudden stutter, oversaturated artificial lighting, fake CGI props'}

ON-SCREEN TEXT: ${s.onScreenText} (${s.textPlacement || (isVertical ? 'Safe central area' : 'Lower third')}) [${s.textAnimation || 'Kinetic pop-in'}]
AUDIO DIRECTION:
• Atmosphere: ${s.audio?.atmosphere || 'Ambient room tone'}
• SFX: ${s.audio?.sfx || s.sound}
• Music Mood: ${s.audio?.musicMood || `${mood} score`}
CONTINUITY NOTE: ${s.continuityNote || 'Consistent appearance and color palette'}
EDITORIAL RECONSTRUCTION NOTE: ${s.editorialSafetyNote || 'Editorial visualization / documentary reenactment'}
==================================================`
      )
      .join('\n\n');

    handleCopy(formatted, 'all-prompts', 'All Video Prompts');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-slate-900/60 border border-pink-500/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Film className="w-5 h-5 text-pink-400" />
            <h3 className="text-base font-bold text-white tracking-wide font-heading">
              VIDEO PRODUCTION ENGINE — GOOGLE FLOW & VEO PROMPTS
            </h3>
            <span
              className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                isVertical
                  ? 'bg-pink-950/80 text-pink-300 border-pink-700/60'
                  : 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60'
              }`}
            >
              {videoFormat}
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Every scene is precision-engineered for Google Flow & Veo generation models with camera trajectory, lighting, depth, strict negative safety prompts, and format-specific safe margins.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
          <button
            type="button"
            id="btn-copy-all-video-prompts"
            onClick={handleCopyAllPrompts}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-pink-200 bg-pink-950/80 hover:bg-pink-900 border border-pink-700/70 transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            {copiedKey === 'all-prompts' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-pink-400" />
            )}
            <span>COPY ALL VIDEO PROMPTS</span>
          </button>

          {onSwitchToAdobeExpress && (
            <button
              type="button"
              id="btn-open-adobe-plan"
              onClick={onSwitchToAdobeExpress}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-700/60 transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>ADOBE EXPRESS PLAN</span>
            </button>
          )}

          {onRegenerate && (
            <button
              type="button"
              id="btn-regenerate-prompts"
              onClick={onRegenerate}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>REGENERATE PROMPTS</span>
            </button>
          )}
        </div>
      </div>

      {/* Master Video Style Overview Card */}
      {masterVideoStyle && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white tracking-wide">
                MASTER VIDEO STYLE & VISUAL CONTINUITY BLUEPRINT
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setShowMasterStyle(!showMasterStyle)}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {showMasterStyle ? 'Collapse Style' : 'Expand Style'}
            </button>
          </div>

          {showMasterStyle && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Cinematic Style & Aesthetic
                </span>
                <p className="text-slate-200 leading-relaxed">{masterVideoStyle.cinematicStyle}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                  Color Grading & Lighting
                </span>
                <p className="text-slate-200 leading-relaxed">{masterVideoStyle.colorLighting}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">
                  Camera Language & Pacing
                </span>
                <p className="text-slate-200 leading-relaxed">{masterVideoStyle.cameraLanguage}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Realism Level & Textures
                </span>
                <p className="text-slate-200 leading-relaxed">{masterVideoStyle.realismLevel}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Visual Continuity Rule
                </span>
                <p className="text-slate-200 leading-relaxed">{masterVideoStyle.visualContinuity}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                  Editorial / News Safety
                </span>
                <p className="text-slate-200 leading-relaxed">{masterVideoStyle.documentaryApproach}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Format Safe-Zone Directive */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white">
            {isVertical ? '9:16 Vertical Safe Area Enforced:' : '16:9 Cinematic Safe Margin Enforced:'}
          </strong>{' '}
          {isVertical
            ? 'All generated prompts and on-screen text are optimized for vertical screens with focal action and overlays centered in the middle third to prevent occlusion by TikTok / Instagram Reels / YouTube Shorts UI elements.'
            : 'Framed for horizontal 16:9 widescreen displays with balanced rule-of-thirds composition, cinematic anamorphic bokeh, and lower-third typography margins.'}
        </div>
      </div>

      {/* Individual Scene Prompts List */}
      <div className="space-y-6">
        {scenes.map((scene) => {
          const promptKey = `scene-prompt-${scene.sceneNumber}`;
          const isCopied = copiedKey === promptKey;

          return (
            <div
              key={scene.sceneNumber}
              id={`scene-card-${scene.sceneNumber}`}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-slate-700/80 transition-all shadow-lg shadow-black/20"
            >
              {/* Scene Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="w-8 h-8 rounded-xl bg-pink-950 text-pink-300 font-mono text-xs flex items-center justify-center font-bold border border-pink-800/40">
                    {scene.sceneNumber < 10 ? `0${scene.sceneNumber}` : scene.sceneNumber}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Scene {scene.sceneNumber} ({scene.startTime} - {scene.endTime})
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Duration: {scene.duration} • Camera: {scene.camera}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {scene.transition}
                  </span>
                  <button
                    type="button"
                    id={`btn-copy-prompt-${scene.sceneNumber}`}
                    onClick={() => handleCopy(scene.videoPrompt, promptKey, `Scene ${scene.sceneNumber} Prompt`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-pink-300 bg-pink-950/60 hover:bg-pink-900/80 border border-pink-700/60 transition-all cursor-pointer active:scale-95"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-pink-400" />
                        <span>COPY VIDEO PROMPT</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Narrative Context & Voice-Over */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/70 space-y-1.5">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                    Voice-Over Narration
                  </span>
                  <p className="text-slate-100 font-sans leading-relaxed pl-2 border-l-2 border-cyan-500/50">
                    "{scene.voiceOver}"
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/70 space-y-1.5">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                    Visual Objective & Narrative Intent
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {scene.visualObjective || scene.visual}
                  </p>
                </div>
              </div>

              {/* The Core Google Flow / Veo Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-pink-400" />
                    <span className="text-xs font-bold text-pink-300 tracking-wide uppercase">
                      Google Flow / Veo Video Prompt ({videoFormat})
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    High Photorealism • Cinematic Camera
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 text-xs font-mono text-slate-200 leading-relaxed select-all shadow-inner">
                  {scene.videoPrompt}
                </div>
              </div>

              {/* Negative / Avoid Instructions */}
              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>NEGATIVE / AVOID PROMPT INSTRUCTIONS:</span>
                </div>
                <p className="text-rose-200/90 text-[11px] leading-relaxed font-mono">
                  {scene.negativePrompt ||
                    'Avoid cartoonish look, 3D CGI render artifacts, distorted hands or faces, blurry subjects, floating text inside video render, sudden stutter, oversaturated artificial lighting, fake CGI props'}
                </p>
              </div>

              {/* On-Screen Text & Typography Directives */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    On-Screen Text
                  </span>
                  <span className="inline-block font-heading font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/30">
                    {scene.onScreenText}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Text Placement Safe Area
                  </span>
                  <p className="text-slate-200">
                    {scene.textPlacement || (isVertical ? 'Safe central area (middle-third)' : 'Lower-third center')}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Text Animation Style
                  </span>
                  <p className="text-slate-200">
                    {scene.textAnimation || 'Kinetic pop-in with smooth opacity fade'}
                  </p>
                </div>
              </div>

              {/* Audio Direction (Atmosphere, SFX, Music Mood) */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-[11px]">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>AUDIO DIRECTION:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
                  <div>
                    <strong className="text-slate-400 block font-normal">Background Atmosphere:</strong>
                    <span className="text-slate-200">{scene.audio?.atmosphere || 'Balanced room tone'}</span>
                  </div>
                  <div>
                    <strong className="text-slate-400 block font-normal">Sound Effects (SFX):</strong>
                    <span className="text-slate-200">{scene.audio?.sfx || scene.sound}</span>
                  </div>
                  <div>
                    <strong className="text-slate-400 block font-normal">Music Mood:</strong>
                    <span className="text-slate-200">{scene.audio?.musicMood || `${mood} score (no lyrics)`}</span>
                  </div>
                </div>
              </div>

              {/* Continuity & Editorial Safety Footnotes */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[11px] text-slate-400 border-t border-slate-800/60">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3 h-3 text-cyan-400" />
                  <span>
                    <strong className="text-slate-300">Continuity:</strong>{' '}
                    {scene.continuityNote || 'Consistent appearance, wardrobe, and lighting palette across scenes'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span className="text-slate-300 italic">
                    {scene.editorialSafetyNote || 'Editorial visualization / documentary reenactment'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
