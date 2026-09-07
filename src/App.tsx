import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ArticleInputSection } from './components/ArticleInputSection';
import { StudioControls } from './components/StudioControls';
import { GenerateAction } from './components/GenerateAction';
import { OutputWorkspace } from './components/OutputWorkspace';
import { BeginnerGuideModal } from './components/BeginnerGuideModal';
import { DashboardSummary } from './components/DashboardSummary';
import { ActiveProjectBar } from './components/ActiveProjectBar';
import { ProjectHistoryDrawer } from './components/ProjectHistoryDrawer';
import { SampleStory, SAMPLE_STORIES } from './data/sampleStories';
import { GODSEYE_API } from './services/apiClient';
import {
  createNewProject,
  getAllProjects,
  getProjectById,
  saveProject,
  deleteProject,
  duplicateProject,
  getActiveProjectId,
  setActiveProjectId,
  generateProjectName,
} from './services/projectStorage';
import {
  StudioConfig,
  ContentType,
  Duration,
  VideoFormat,
  Language,
  ContentStyle,
  Mood,
  Platform,
  GodseyeAiResult,
  RegenerateComponentType,
  GodseyeProject,
} from './types';

const INITIAL_CONFIG: StudioConfig = {
  title: '',
  sourceUrl: '',
  storyContent: '',
  contentType: 'YouTube Short',
  duration: '60 sec',
  customDurationSeconds: 60,
  videoFormat: '9:16 Portrait',
  language: 'Hindi', // Default Hindi as mandated
  contentStyle: 'Informative',
  mood: 'Neutral',
  selectedPlatforms: ['YouTube Shorts', 'Instagram', 'YouTube'],
};

export default function App() {
  const [config, setConfig] = useState<StudioConfig>(INITIAL_CONFIG);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isProjectsDrawerOpen, setIsProjectsDrawerOpen] = useState(false);
  const [isOutputInitialized, setIsOutputInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('Analyzing your story...');
  const [statusMessage, setStatusMessage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [aiResult, setAiResult] = useState<GodseyeAiResult | null>(null);

  // STEP 6: Project History State
  const [projects, setProjects] = useState<GodseyeProject[]>([]);
  const [currentProject, setCurrentProject] = useState<GodseyeProject>(() =>
    createNewProject(INITIAL_CONFIG)
  );
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const autoSaveTimerRef = useRef<any>(null);

  // Initialize projects on mount
  useEffect(() => {
    try {
      let savedProjects = getAllProjects();

      // If storage is empty, initialize with a sample project
      if (savedProjects.length === 0) {
        const sample = SAMPLE_STORIES[0];
        const starterProject = createNewProject({
          title: sample.title,
          sourceUrl: sample.url,
          storyContent: sample.fullStory,
          contentStyle: sample.suggestedStyle as ContentStyle,
          mood: sample.suggestedMood as Mood,
        });
        starterProject.name = 'James Webb Space Telescope Exoplanet Discovery';
        starterProject.status = 'DRAFT';
        saveProject(starterProject);
        savedProjects = [starterProject];
      }

      setProjects(savedProjects);

      // Check for last active project
      const activeId = getActiveProjectId();
      const targetProject = activeId
        ? savedProjects.find((p) => p.id === activeId) || savedProjects[0]
        : savedProjects[0];

      if (targetProject) {
        loadProjectIntoWorkspace(targetProject);
      }
    } catch (err) {
      console.error('Failed to initialize projects:', err);
      setErrorMessage('Could not load project storage.');
    }
  }, []);

  // Helper to load a project into active workspace
  const loadProjectIntoWorkspace = (project: GodseyeProject) => {
    setCurrentProject(project);
    setActiveProjectId(project.id);
    setConfig({
      title: project.article.title || '',
      sourceUrl: project.article.url || '',
      storyContent: project.article.content || '',
      contentType: project.settings.contentType,
      duration: project.settings.duration,
      customDurationSeconds: project.settings.customDurationSeconds || 60,
      videoFormat: project.settings.videoFormat,
      language: project.settings.language,
      contentStyle: project.settings.contentStyle,
      mood: project.settings.mood,
      selectedPlatforms: project.settings.platforms,
    });
    setAiResult(project.content);
    setIsOutputInitialized(Boolean(project.content));
  };

  // Debounced auto-save for draft changes (metadata / settings / article)
  const triggerAutoSaveDraft = (
    updatedConfig: StudioConfig,
    updatedName?: string
  ) => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    setIsAutoSaving(true);

    autoSaveTimerRef.current = setTimeout(() => {
      setCurrentProject((prev) => {
        const nameToUse =
          updatedName !== undefined
            ? updatedName
            : prev.name && prev.name !== 'New Godseye Project'
            ? prev.name
            : generateProjectName(updatedConfig.title, updatedConfig.storyContent);

        const updated: GodseyeProject = {
          ...prev,
          name: nameToUse,
          updatedAt: new Date().toISOString(),
          article: {
            title: updatedConfig.title,
            content: updatedConfig.storyContent,
            url: updatedConfig.sourceUrl,
          },
          settings: {
            contentType: updatedConfig.contentType,
            duration: updatedConfig.duration,
            customDurationSeconds: updatedConfig.customDurationSeconds,
            videoFormat: updatedConfig.videoFormat,
            language: updatedConfig.language,
            contentStyle: updatedConfig.contentStyle,
            mood: updatedConfig.mood,
            platforms: updatedConfig.selectedPlatforms,
          },
        };

        const success = saveProject(updated);
        if (!success) {
          setErrorMessage('Could not save project.');
        } else {
          setProjects(getAllProjects());
        }
        setIsAutoSaving(false);
        return updated;
      });
    }, 800);
  };

  // Handlers for Section 1 (Article / Story)
  const handleTitleChange = (title: string) => {
    const updated = { ...config, title };
    setConfig(updated);
    triggerAutoSaveDraft(updated);
  };

  const handleUrlChange = (sourceUrl: string) => {
    const updated = { ...config, sourceUrl };
    setConfig(updated);
    triggerAutoSaveDraft(updated);
  };

  const handleStoryChange = (storyContent: string) => {
    const updated = { ...config, storyContent };
    setConfig(updated);
    triggerAutoSaveDraft(updated);
  };

  const handleApplySample = (sample: SampleStory) => {
    const updated: StudioConfig = {
      ...config,
      title: sample.title,
      sourceUrl: sample.url,
      storyContent: sample.fullStory,
      contentStyle: (sample.suggestedStyle as ContentStyle) || config.contentStyle,
      mood: (sample.suggestedMood as Mood) || config.mood,
    };
    setConfig(updated);
    setStatusMessage(`Loaded sample: "${sample.title}"`);
    triggerAutoSaveDraft(updated, sample.title);
    setTimeout(() => setStatusMessage(undefined), 3000);
  };

  const handleClearStory = () => {
    const updated: StudioConfig = {
      ...config,
      title: '',
      sourceUrl: '',
      storyContent: '',
    };
    setConfig(updated);
    setAiResult(null);
    triggerAutoSaveDraft(updated);
  };

  // Handlers for Sections 2-8 (Studio Controls)
  const handleContentTypeChange = (contentType: ContentType) => {
    let videoFormat = config.videoFormat;
    if (
      contentType === 'YouTube Short' ||
      contentType === 'Instagram Reel' ||
      contentType === 'Facebook Reel' ||
      contentType === 'Short / Reel'
    ) {
      videoFormat = '9:16 Portrait';
    } else if (
      contentType === 'YouTube Long Video' ||
      contentType === 'Facebook Video' ||
      contentType === 'Documentary'
    ) {
      videoFormat = '16:9 Horizontal';
    }
    const updated: StudioConfig = { ...config, contentType, videoFormat };
    setConfig(updated);
    triggerAutoSaveDraft(updated);
  };

  const handleDurationChange = (duration: Duration) => {
    const updated = { ...config, duration };
    setConfig(updated);
    triggerAutoSaveDraft(updated);
  };

  const handleCustomDurationSecondsChange = (customDurationSeconds: number) => {
    const updated = { ...config, customDurationSeconds };
    setConfig(updated);
    triggerAutoSaveDraft(updated);
  };

  const handleVideoFormatChange = (videoFormat: VideoFormat) => {
    const updated = { ...config, videoFormat };
    setConfig(updated);
    triggerAutoSaveDraft(updated);
  };

  const handleLanguageChange = (language: Language) => {
    const updated = { ...config, language };
    setConfig(updated);
    triggerAutoSaveDraft(updated);
  };

  const handleContentStyleChange = (contentStyle: ContentStyle) => {
    const updated = { ...config, contentStyle };
    setConfig(updated);
    triggerAutoSaveDraft(updated);
  };

  const handleMoodChange = (mood: Mood) => {
    const updated = { ...config, mood };
    setConfig(updated);
    triggerAutoSaveDraft(updated);
  };

  const handleTogglePlatform = (platform: Platform) => {
    const exists = config.selectedPlatforms.includes(platform);
    let selectedPlatforms = config.selectedPlatforms;
    if (exists) {
      if (selectedPlatforms.length > 1) {
        selectedPlatforms = selectedPlatforms.filter((p) => p !== platform);
      }
    } else {
      selectedPlatforms = [...selectedPlatforms, platform];
    }
    const updated = { ...config, selectedPlatforms };
    setConfig(updated);
    triggerAutoSaveDraft(updated);
  };

  // ==========================================
  // PROJECT HISTORY ACTIONS (STEP 6)
  // ==========================================
  const handleNewProject = () => {
    const newProj = createNewProject(INITIAL_CONFIG);
    saveProject(newProj);
    setActiveProjectId(newProj.id);
    setCurrentProject(newProj);
    setConfig(INITIAL_CONFIG);
    setAiResult(null);
    setIsOutputInitialized(false);
    setProjects(getAllProjects());
    setStatusMessage('Started a new project workspace.');
    setTimeout(() => setStatusMessage(undefined), 2500);
  };

  const handleOpenProject = (project: GodseyeProject) => {
    try {
      loadProjectIntoWorkspace(project);
      setStatusMessage(`Loaded project: "${project.name}"`);
      setTimeout(() => setStatusMessage(undefined), 3000);

      // If project has content, scroll to output area
      if (project.content) {
        setTimeout(() => {
          const outputElem = document.getElementById('output-area');
          if (outputElem) {
            outputElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    } catch (err) {
      setErrorMessage('Could not load project.');
    }
  };

  const handleDuplicateProject = (id?: string) => {
    const targetId = id || currentProject.id;
    const duplicated = duplicateProject(targetId);
    if (duplicated) {
      const updatedList = getAllProjects();
      setProjects(updatedList);
      setStatusMessage(`Duplicated as "${duplicated.name}"`);
      setTimeout(() => setStatusMessage(undefined), 3000);
    } else {
      setErrorMessage('Could not duplicate project.');
    }
  };

  const handleDeleteProject = (id: string) => {
    const success = deleteProject(id);
    if (success) {
      const remaining = getAllProjects();
      setProjects(remaining);

      // If current active was deleted, open another or create new
      if (currentProject.id === id) {
        if (remaining.length > 0) {
          loadProjectIntoWorkspace(remaining[0]);
        } else {
          handleNewProject();
        }
      }
      setStatusMessage('Project deleted.');
      setTimeout(() => setStatusMessage(undefined), 2500);
    } else {
      setErrorMessage('Failed to delete project.');
    }
  };

  const handleRenameProject = (id: string, newName: string) => {
    const target = getProjectById(id);
    if (target) {
      const updated: GodseyeProject = {
        ...target,
        name: newName,
        updatedAt: new Date().toISOString(),
      };
      saveProject(updated);
      setProjects(getAllProjects());
      if (currentProject.id === id) {
        setCurrentProject(updated);
      }
      setStatusMessage(`Project renamed to "${newName}".`);
      setTimeout(() => setStatusMessage(undefined), 2500);
    }
  };

  // Section 9: Main Button click handler with Real AI Generation Workflow & Auto-Save
  const handleGenerate = async () => {
    let currentConfig = config;

    // If story is empty, auto-load starter sample for beginner convenience
    if (!currentConfig.storyContent.trim()) {
      const sample = SAMPLE_STORIES[0];
      currentConfig = {
        ...currentConfig,
        title: currentConfig.title || sample.title,
        sourceUrl: currentConfig.sourceUrl || sample.url,
        storyContent: sample.fullStory,
      };
      setConfig(currentConfig);
    }

    setIsLoading(true);
    setErrorMessage(undefined);
    setStatusMessage(undefined);
    setLoadingStage('Analyzing your story...');

    // Progress through specified loading states
    const timer1 = setTimeout(() => {
      setLoadingStage('Building your GODSEYE content...');
    }, 1800);

    const timer2 = setTimeout(() => {
      setLoadingStage('Preparing scenes and prompts...');
    }, 3800);

    try {
      const response = await GODSEYE_API.generateStudioContent(currentConfig);

      clearTimeout(timer1);
      clearTimeout(timer2);

      if (response.success && response.data) {
        setLoadingStage('GODSEYE CONTENT READY');
        setAiResult(response.data);
        setIsOutputInitialized(true);
        setStatusMessage('GODSEYE CONTENT READY');

        // STEP 6: AUTO-SAVE TO PROJECT HISTORY
        const nameToUse =
          currentProject.name && currentProject.name !== 'New Godseye Project'
            ? currentProject.name
            : generateProjectName(currentConfig.title, currentConfig.storyContent);

        const updatedProject: GodseyeProject = {
          ...currentProject,
          name: nameToUse,
          status: 'READY',
          updatedAt: new Date().toISOString(),
          article: {
            title: currentConfig.title,
            content: currentConfig.storyContent,
            url: currentConfig.sourceUrl,
          },
          settings: {
            contentType: currentConfig.contentType,
            duration: currentConfig.duration,
            customDurationSeconds: currentConfig.customDurationSeconds,
            videoFormat: currentConfig.videoFormat,
            language: currentConfig.language,
            contentStyle: currentConfig.contentStyle,
            mood: currentConfig.mood,
            platforms: currentConfig.selectedPlatforms,
          },
          content: response.data,
        };

        const saved = saveProject(updatedProject);
        if (saved) {
          setCurrentProject(updatedProject);
          setProjects(getAllProjects());
          setActiveProjectId(updatedProject.id);
        } else {
          setErrorMessage('Could not save project.');
        }

        // Scroll smoothly to output workspace
        setTimeout(() => {
          const outputElem = document.getElementById('output-area');
          if (outputElem) {
            outputElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 200);
      } else {
        setErrorMessage(
          response.error || 'Failed to generate content. Please verify your story and try again.'
        );
      }
    } catch (err: any) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setErrorMessage(err?.message || 'Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Granular component regeneration handler (Step 5 Upgrade + Step 6 Auto-Save)
  const handleRegenerateComponent = async (component: RegenerateComponentType) => {
    if (!aiResult) return;
    setIsLoading(true);
    setLoadingStage(`Regenerating ${component}...`);
    try {
      const response = await GODSEYE_API.regenerateComponent(component, config, aiResult);
      if (response.success && response.data) {
        let updatedResult: GodseyeAiResult | null = null;
        setAiResult((prev) => {
          if (!prev) return prev;
          const updated = { ...prev };
          if (component === 'hook') {
            updated.hooks = response.data;
          } else if (component === 'script') {
            if (response.data.script) updated.script = response.data.script;
            if (response.data.voiceOverDirection)
              updated.voiceOverDirection = response.data.voiceOverDirection;
            if (response.data.polishedScript)
              updated.polishedScript = response.data.polishedScript;
            if (response.data.qualityCheck)
              updated.qualityCheck = response.data.qualityCheck;
          } else if (component === 'scenes') {
            if (Array.isArray(response.data.scenes)) updated.scenes = response.data.scenes;
          } else if (component === 'videoPrompts') {
            if (Array.isArray(response.data.scenes)) updated.scenes = response.data.scenes;
          } else if (component === 'thumbnail') {
            updated.thumbnails = response.data;
          } else if (component === 'seo') {
            if (response.data.seo) updated.seo = response.data.seo;
            if (response.data.keywords) updated.keywords = response.data.keywords;
          }
          updatedResult = updated;
          return updated;
        });

        // Persist updated component into project
        if (updatedResult) {
          const updatedProject: GodseyeProject = {
            ...currentProject,
            content: updatedResult,
            updatedAt: new Date().toISOString(),
          };
          saveProject(updatedProject);
          setCurrentProject(updatedProject);
          setProjects(getAllProjects());
        }

        setStatusMessage(`Regenerated ${component.toUpperCase()} successfully!`);
        setTimeout(() => setStatusMessage(undefined), 3000);
      } else {
        setErrorMessage(response.error || `Failed to regenerate ${component}.`);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || `Failed to regenerate ${component}.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset handler
  const handleReset = () => {
    handleNewProject();
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation / Brand Header with Projects Counter & New Project Button */}
      <Header
        onOpenGuide={() => setIsGuideOpen(true)}
        onReset={handleReset}
        projectsCount={projects.length}
        onOpenProjects={() => setIsProjectsDrawerOpen(true)}
        onNewProject={handleNewProject}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* STEP 6: Dashboard Summary with Project Metrics & Quick Access */}
        <DashboardSummary
          projects={projects}
          activeProjectId={currentProject.id}
          onOpenProjectsList={() => setIsProjectsDrawerOpen(true)}
          onOpenProject={handleOpenProject}
          onNewProject={handleNewProject}
        />

        {/* STEP 6: Active Project Bar (Rename inline, Status, Auto-save, Quick Actions) */}
        <ActiveProjectBar
          currentProject={currentProject}
          onRenameProject={(newName) => handleRenameProject(currentProject.id, newName)}
          onDuplicateProject={() => handleDuplicateProject(currentProject.id)}
          onNewProject={handleNewProject}
          onOpenDrawer={() => setIsProjectsDrawerOpen(true)}
          isAutoSaving={isAutoSaving}
        />

        {/* 1. ARTICLE / STORY SECTION */}
        <ArticleInputSection
          title={config.title}
          sourceUrl={config.sourceUrl}
          storyContent={config.storyContent}
          onChangeTitle={handleTitleChange}
          onChangeUrl={handleUrlChange}
          onChangeStory={handleStoryChange}
          onApplySample={handleApplySample}
          onClear={handleClearStory}
        />

        {/* 2-8. STUDIO CONTROLS SECTIONS */}
        <StudioControls
          contentType={config.contentType}
          onChangeContentType={handleContentTypeChange}
          duration={config.duration}
          customDurationSeconds={config.customDurationSeconds || 60}
          onChangeDuration={handleDurationChange}
          onChangeCustomDurationSeconds={handleCustomDurationSecondsChange}
          videoFormat={config.videoFormat}
          onChangeVideoFormat={handleVideoFormatChange}
          language={config.language}
          onChangeLanguage={handleLanguageChange}
          contentStyle={config.contentStyle}
          onChangeContentStyle={handleContentStyleChange}
          mood={config.mood}
          onChangeMood={handleMoodChange}
          selectedPlatforms={config.selectedPlatforms}
          onTogglePlatform={handleTogglePlatform}
        />

        {/* 9. MAIN BUTTON SECTION */}
        <GenerateAction
          config={config}
          hasStoryContent={Boolean(config.storyContent.trim())}
          isLoading={isLoading}
          loadingStage={loadingStage}
          onGenerate={handleGenerate}
          statusMessage={statusMessage}
          errorMessage={errorMessage}
        />

        {/* 10. OUTPUT WORKSPACE SECTION */}
        <OutputWorkspace
          config={config}
          hasStoryContent={Boolean(config.storyContent.trim())}
          isInitialized={isOutputInitialized}
          aiResult={aiResult}
          isLoading={isLoading}
          onRegenerate={handleGenerate}
          onRegenerateComponent={handleRegenerateComponent}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#07090e] py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 font-medium text-slate-400">
            <span>GODSEYE AI</span>
            <span>•</span>
            <span className="text-slate-500">AI Content Command Center</span>
          </p>
          <p className="text-slate-600 text-[11px]">
            Server-Side Gemini 3.8 Flash Engine • Real-Time Story Analysis & Video Synthesis
          </p>
        </div>
      </footer>

      {/* Beginner Guide Modal */}
      <BeginnerGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* STEP 6: Project History Drawer (Slide-Over) */}
      <ProjectHistoryDrawer
        isOpen={isProjectsDrawerOpen}
        onClose={() => setIsProjectsDrawerOpen(false)}
        projects={projects}
        activeProjectId={currentProject.id}
        onOpenProject={handleOpenProject}
        onNewProject={handleNewProject}
        onDuplicateProject={handleDuplicateProject}
        onDeleteProject={handleDeleteProject}
        onRenameProject={handleRenameProject}
      />
    </div>
  );
}

