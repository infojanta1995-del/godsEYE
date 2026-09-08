import React from 'react';
import { Eye, Sparkles, HelpCircle, RotateCcw, FolderArchive, Plus, Palette } from 'lucide-react';

interface HeaderProps {
  onOpenGuide: () => void;
  onReset: () => void;
  projectsCount?: number;
  onOpenProjects?: () => void;
  onNewProject?: () => void;
  onOpenTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGuide,
  onReset,
  projectsCount = 0,
  onOpenProjects,
  onNewProject,
  onOpenTheme,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-[#0c1017]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-slate-900 border border-cyan-500/40 shadow-lg shadow-cyan-500/10">
            <Eye className="w-6 h-6 text-cyan-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-heading">
                GODSEYE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">AI</span>
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-700/40">
                Studio v1.0
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              AI Content Command Center
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onNewProject && (
            <button
              type="button"
              id="btn-header-new-project"
              onClick={onNewProject}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm shadow-cyan-500/20 cursor-pointer"
              title="Create a new fresh workspace project"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline">New Project</span>
            </button>
          )}

          {onOpenProjects && (
            <button
              type="button"
              id="btn-header-projects"
              onClick={onOpenProjects}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-800/60 transition-colors cursor-pointer"
              title="Open Saved Projects Drawer"
            >
              <FolderArchive className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Projects</span>
              <span className="px-1.5 py-0.2 rounded-full bg-cyan-900 text-cyan-200 text-[10px] font-mono font-bold">
                {projectsCount}
              </span>
            </button>
          )}

          {onOpenTheme && (
            <button
              type="button"
              id="btn-header-theme"
              onClick={onOpenTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors cursor-pointer"
              title="Theme Customizer & Hue Shifter"
            >
              <Palette className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Theme</span>
            </button>
          )}

          <button
            type="button"
            id="btn-beginner-guide"
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/70 transition-colors cursor-pointer"
            title="How to use GODSEYE AI"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Guide</span>
          </button>

          <button
            type="button"
            id="btn-reset-studio"
            onClick={onReset}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 transition-colors cursor-pointer"
            title="Reset active studio settings"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
