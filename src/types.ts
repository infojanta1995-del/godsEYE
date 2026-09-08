export type ContentType =
  | 'YouTube Short'
  | 'Instagram Reel'
  | 'Facebook Reel'
  | 'Short / Reel'
  | 'YouTube Long Video'
  | 'Facebook Video'
  | 'Documentary';

export type Duration =
  | '15 sec'
  | '30 sec'
  | '45 sec'
  | '60 sec'
  | '90 sec'
  | '2 min'
  | '5 min'
  | '10 min'
  | 'Custom';

export type VideoFormat = '9:16 Portrait' | '16:9 Horizontal';

export type Language = 'Hindi' | 'Hinglish' | 'English' | 'Gujarati';

export type ContentStyle =
  | 'Informative'
  | 'News Explainer'
  | 'Documentary'
  | 'Cinematic'
  | 'Technical'
  | 'Investigative'
  | 'Storytelling'
  | 'Suspense'
  | 'Emotional'
  | 'Breaking News'
  | 'Explainer';

export type Mood =
  | 'Serious'
  | 'Suspense'
  | 'Dramatic'
  | 'Curious'
  | 'Urgent'
  | 'Emotional'
  | 'Neutral'
  | 'Cinematic'
  | 'Suspenseful'
  | 'Inspirational'
  | 'Mysterious'
  | 'Shocking';

export type Platform =
  | 'YouTube Shorts'
  | 'YouTube'
  | 'Instagram'
  | 'Facebook'
  | 'TikTok'
  | 'Snapchat'
  | 'X'
  | 'Pinterest'
  | 'LinkedIn';

export type OutputTab =
  | 'Overview'
  | 'Story Angle'
  | 'Hooks'
  | 'Viral Hooks'
  | 'Script'
  | 'Quality Check'
  | 'Scenes'
  | 'Video Prompts'
  | 'Video Generation'
  | 'Adobe Express'
  | 'Thumbnail'
  | 'AI Voice'
  | 'Trending Intel'
  | 'SEO'
  | 'YouTube Shorts'
  | 'YouTube'
  | 'Instagram'
  | 'Facebook'
  | 'TikTok'
  | 'Snapchat'
  | 'X'
  | 'Pinterest'
  | 'LinkedIn'
  | 'Keywords'
  | 'Retention'
  | 'Audio';

export type StoryAngleData = StoryAngle;
export type StoryAnalysisData = ArticleAnalysis;
export type HooksData = HookEngineOutput;

// ==========================================
// THEME & VISUAL CUSTOMIZER TYPES (PART A-C)
// ==========================================
export type ThemePreset =
  | 'GODSEYE DARK'
  | 'LIGHT'
  | 'AMOLED'
  | 'MIDNIGHT BLUE'
  | 'GRAPHITE'
  | 'CYBER'
  | 'CINEMATIC';

export interface ThemeSettings {
  preset: ThemePreset;
  accentColor: string;
  hue: number; // -180 to 180 (default 0)
  saturation: number; // 50 to 200 (default 100)
  brightness: number; // 70 to 130 (default 100)
  accentIntensity: number; // 50 to 150 (default 100)
}

export interface StudioConfig {
  title: string;
  sourceUrl: string;
  storyContent: string;
  contentType: ContentType;
  duration: Duration;
  customDurationSeconds?: number;
  videoFormat: VideoFormat;
  language: Language;
  contentStyle: ContentStyle;
  mood: Mood;
  selectedPlatforms: Platform[];
}

export interface ArticleAnalysis {
  mainTopic: string;
  importantFacts: string[];
  people: string[];
  locations: string[];
  dates: string[];
  numbers: string[];
  mainEvent: string;
  whyItMatters: string;
  curiosityPoints: string[];
  visualOpportunities: string[];
}

export interface ContentDirectorAnalysis {
  storyType: string;
  mainStory: string;
  mainEvent: string;
  importantFacts: string[];
  peopleOrgs: string[];
  location: string;
  timeline: string;
  whyThisStoryMatters: string;
  strongestReveal: string;
  curiosityOpportunity: string;
  emotionalDriver: string;
  visualPotential: string;
  audienceInterest: string;
  potentialAngles: string[];
  bestFormat: string;
  bestDuration: string;
  bestContentStyle: string;
  bestMood: string;
  bestStoryAngle: string;
  whyAngleWorks: string;
  factualIntegrity?: string;
  // Backward compatibility fields:
  mainStoryAngle?: string;
  strongestInformation?: string;
  curiosityGap?: string;
}

export interface StoryAngleOption {
  id: string;
  type: 'Curiosity' | 'Breaking development' | 'Human impact' | 'Explainer' | 'Investigation' | string;
  angle: string;
  shortExplanation: string;
  curiosityPotential: number;
  visualPotential: number;
  isRecommended?: boolean;
}

export interface StoryAngle {
  mainAngle: string;
  whyInteresting: string;
  curiosityElement: string;
  emotionalElement: string;
  visualElement: string;
  bestStoryAngle?: string;
  bestAngleReason?: string;
  angles?: StoryAngleOption[];
  contentDirector?: ContentDirectorAnalysis;
}

export type HookCategory =
  | 'Curiosity'
  | 'Question'
  | 'Mystery'
  | 'Shock / Revelation'
  | 'Breaking-news style'
  | 'Storytelling'
  | 'Information gap'
  | 'Emotional'
  | 'Consequence'
  | 'Contrarian'
  | 'High-stakes / consequence';

export interface HookItem {
  id: string;
  category: HookCategory;
  text: string;
  curiosityScore: number;
  hookStrengthScore: number;
  retentionScore: number;
  clarityScore: number;
  totalScore: number;
  isBestHook?: boolean;
}

export interface HookEngineOutput {
  curiosity: string;
  shock: string;
  question: string;
  story: string;
  informationGap: string;
  bestHook: string;
  reason: string;
  hookList?: HookItem[];
  totalScore?: number;
}

export interface ScriptSection {
  phase: string;
  name: string;
  narration: string;
  narrationText?: string;
  cue?: string;
  categoryType?: 'FACT' | 'SOURCE INFORMATION' | 'AI INTERPRETATION';
}

export interface VoiceOverDirection {
  voiceStyle: string;
  speed: string;
  energy: string;
  emotion: string;
  pauses: string;
  emphasis: string[];
  narrationStyle: string;
}

export interface ContentQualityMetric {
  score: number;
  status: 'passed' | 'optimized';
  note: string;
}

export interface ContentQualityCheck {
  overallScore: number;
  hookStrength: ContentQualityMetric;
  curiosity: ContentQualityMetric;
  clarity: ContentQualityMetric;
  pacing: ContentQualityMetric;
  informationDensity?: ContentQualityMetric;
  storyFlow?: ContentQualityMetric;
  endingStrength: ContentQualityMetric;
  visualPotential?: ContentQualityMetric;
  factualSafety?: ContentQualityMetric;
  repetition?: ContentQualityMetric;
  weakSentences?: ContentQualityMetric;
  boringSections?: ContentQualityMetric;
  unsupportedClaims?: ContentQualityMetric;
  missingContext?: ContentQualityMetric;
  autoImprovementsApplied: string[];
  factualIntegrityVerified: boolean;
  disclaimer?: string;
}

export interface AutoImproveResult {
  originalScript: string;
  improvedScript: string;
  improvedPolishedScript: string;
  improvedSections: ScriptSection[];
  whatWasImproved: string[];
  updatedQualityCheck: ContentQualityCheck;
}

export interface HighRetentionScript {
  title: string;
  language: string;
  style: string;
  mood: string;
  duration: string;
  text: string;
  fullScript?: string;
  polishedScript?: string;
  sections: ScriptSection[];
  selectedAngle?: string;
  selectedHook?: string;
  structureType?: string;
}

export interface AudioDirection {
  atmosphere: string;
  sfx: string;
  musicMood: string;
}

export interface SceneItem {
  sceneNumber: number;
  startTime: string;
  endTime: string;
  duration: string;
  time?: string;
  voiceOver: string;
  visual: string;
  visualObjective?: string;
  videoPrompt: string;
  negativePrompt?: string;
  onScreenText: string;
  textPlacement?: string;
  textAnimation?: string;
  camera: string;
  transition: string;
  mood: string;
  sound: string;
  audio?: AudioDirection;
  continuityNote?: string;
  editorialSafetyNote?: string;
}

export interface MasterVideoStyle {
  cinematicStyle: string;
  colorLighting: string;
  cameraLanguage: string;
  realismLevel: string;
  pacing: string;
  visualContinuity: string;
  documentaryApproach: string;
  aspectRatio: string;
  mood: string;
  visualAesthetic?: string;
  colorPalette?: string;
  lighting?: string;
  cameraMovement?: string;
  atmosphere?: string;
  negativePrompt?: string;
}

export interface AdobeExpressScene {
  sceneNumber: number;
  duration: string;
  visual: string;
  voiceOver: string;
  onScreenText: string;
  textPosition: string;
  captionSubtitle: string;
  transition: string;
  musicDirection?: string;
  soundEffect?: string;
  audioDirection: string;
  editingInstruction: string;
  clip?: string;
  time?: string;
  voiceOverLine?: string;
  subtitleText?: string;
  musicCue?: string;
  sfxCue?: string;
  cutInstruction?: string;
}

export interface FinalEditingChecklist {
  aspectRatio: string;
  resolutionRecommendation: string;
  captionCheck: string;
  audioCheck: string;
  textSafeArea: string;
  thumbnailCheck: string;
  brandingCheck: string;
  factCheckReminder: string;
}

export interface AdobeExpressPackage {
  projectTitle: string;
  aspectRatio: string;
  targetDuration: string;
  overview: string;
  scenes: AdobeExpressScene[];
  timeline?: any[];
  checklist?: FinalEditingChecklist;
}

export interface RetentionAnalysisData {
  hookStrength: number;
  curiosity: number;
  storyFlow: number;
  emotionalImpact: number;
  visualPotential: number;
  shareabilityPotential: number;
  aiEstimateDisclaimer?: string;
  improvements: string[];
  top3RetentionImprovements?: string[];
}

// ==========================================
// PART 1: THUMBNAIL ENGINE DATA STRUCTURES
// ==========================================
export interface ThumbnailConcept {
  concept: string;
  subject: string;
  background: string;
  visualStory: string;
  emotion: string;
  curiosityElement: string;
  composition: string;
  headline: string; // Suggested Thumbnail Text (separated from prompt)
  imagePrompt: string; // Photorealistic AI image generation prompt
}

export interface BestThumbnail {
  conceptName: string;
  headlineText: string;
  imagePrompt: string;
  selectionRationale: string;
  mobileReadability: string;
  focalSubject: string;
}

export interface PlatformThumbnail {
  concept: string;
  headline: string;
  imagePrompt: string;
  composition: string;
}

export interface ThumbnailPackage {
  concepts: ThumbnailConcept[];
  bestThumbnail?: BestThumbnail;
  youtube: PlatformThumbnail;
  facebook: PlatformThumbnail;
}

// ==========================================
// PART 2: MULTI-PLATFORM SEO DATA STRUCTURES
// ==========================================
export interface YouTubeShortsTitles {
  highCtr: string;
  curiosity: string;
  searchOptimized: string;
  informative: string;
  dramatic: string;
}

export interface YouTubeShortsSeo {
  titles: YouTubeShortsTitles;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  longTailKeywords: string[];
  searchPhrases: string[];
  hashtags: string[];
  cta: string;
}

export interface ChapterSuggestion {
  time: string;
  title: string;
}

export interface YouTubeLongSeo {
  titles: string[];
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  longTailKeywords: string[];
  searchPhrases: string[];
  chapters: ChapterSuggestion[];
  hashtags: string[];
  cta: string;
}

export interface InstagramReelsSeo {
  caption: string;
  firstLineHook: string;
  searchKeywords: string[];
  hashtags: string[];
  cta: string;
}

export interface FacebookReelsSeo {
  caption: string;
  searchKeywords: string[];
  hashtags: string[];
  cta: string;
}

export interface FacebookVideoSeo {
  title: string;
  description: string;
  keywords: string[];
  hashtags: string[];
  cta: string;
}

export interface TikTokSeo {
  caption: string;
  searchKeywords: string[];
  hashtags: string[];
  cta: string;
}

export interface SnapchatSeo {
  caption: string;
  topicKeywords: string[];
  hashtags: string[];
  cta: string;
}

export interface XSeo {
  postText: string;
  searchKeywords: string[];
  hashtags: string[];
  cta: string;
}

export interface PinterestSeo {
  pinTitle: string;
  pinDescription: string;
  searchKeywords: string[];
  longTailKeywords: string[];
  hashtags: string[];
}

export interface LinkedInSeo {
  postText: string;
  keywords: string[];
  hashtags: string[];
  cta: string;
}

export interface MultiPlatformSeoPackage {
  youtubeShorts: YouTubeShortsSeo;
  youtubeLong: YouTubeLongSeo;
  instagram: InstagramReelsSeo;
  facebookReels: FacebookReelsSeo;
  facebookVideo: FacebookVideoSeo;
  tiktok: TikTokSeo;
  snapchat: SnapchatSeo;
  x: XSeo;
  pinterest: PinterestSeo;
  linkedin: LinkedInSeo;
}

// ==========================================
// PART 3: KEYWORD ENGINE DATA STRUCTURE
// ==========================================
export interface KeywordsPackage {
  primary: string[];
  secondary: string[];
  longTail: string[];
  questions: string[];
  relatedSearches: string[];
  topicKeywords: string[];
}

export type TitleCategory =
  | 'High CTR'
  | 'Curiosity'
  | 'Search Optimized'
  | 'Informative'
  | 'Dramatic'
  | 'Question'
  | 'News Explainer';

export interface TitleOption {
  id: string;
  title: string;
  category: TitleCategory;
  ctrPotential: number;
  searchRelevance: number;
  curiosity: number;
  clarity: number;
  totalScore: number;
  isRecommended?: boolean;
}

export interface TitleEngineOutput {
  options: TitleOption[];
  recommendedTitle: string;
  explanation: string;
}

export interface TrendingIntelligenceData {
  topic: string;
  trendPotential: number; // 1-10
  searchPotential: number; // 1-10
  audienceInterest: number; // 1-10
  saturationRisk: 'Low' | 'Medium' | 'High';
  disclaimer: string; // "Trend data unavailable — AI topic potential estimate."
  insights: string[];
}

export type RegenerateComponentType =
  | 'hook'
  | 'script'
  | 'scenes'
  | 'videoPrompts'
  | 'thumbnail'
  | 'seo';

// Master Godseye AI Generation Result
export interface GodseyeAiResult {
  analysis: ArticleAnalysis;
  storyAngle: StoryAngle;
  contentDirector?: ContentDirectorAnalysis;
  hooks: HookEngineOutput;
  script: HighRetentionScript;
  polishedScript?: string;
  voiceOverDirection?: VoiceOverDirection;
  qualityCheck?: ContentQualityCheck;
  scenes: SceneItem[];
  masterVideoStyle?: MasterVideoStyle;
  adobeExpressPlan?: AdobeExpressPackage;
  retention: RetentionAnalysisData;
  thumbnails: ThumbnailPackage;
  seo: MultiPlatformSeoPackage;
  titleEngine?: TitleEngineOutput;
  trendIntelligence?: TrendingIntelligenceData;
  keywords: KeywordsPackage;
  disclaimer: string;
  // Step 7 extensions:
  ttsAudio?: TTSAudioData;
  videoSettings?: VideoSettingsConfig;
  sceneStatuses?: Record<number, SceneStatusType>;
}

// ==========================================
// STEP 7: VIDEO GENERATION HUB & TTS ENGINE
// ==========================================
export type VideoWorkflowType =
  | 'Google Flow / Veo'
  | 'Other AI Video Tool'
  | 'Adobe Express'
  | 'Manual Production';

export type SceneStatusType = 'NOT READY' | 'READY' | 'COPIED' | 'COMPLETED';

export type VideoQualityOption = 'Standard' | 'High' | 'Cinematic';

export type CameraStyleOption =
  | 'Auto'
  | 'Cinematic'
  | 'Documentary'
  | 'Handheld'
  | 'Technical'
  | 'Dramatic';

export type MotionLevelOption = 'Low' | 'Medium' | 'High';

export type VisualConsistencyOption = 'Standard' | 'High';

export interface VideoSettingsConfig {
  videoQuality: VideoQualityOption;
  cameraStyle: CameraStyleOption;
  motionLevel: MotionLevelOption;
  visualConsistency: VisualConsistencyOption;
}

export interface VideoProvider {
  name: string;
  isConfigured: boolean;
  generateClip?: (prompt: string, options: any) => Promise<{ clipUrl: string }>;
}

// TTS Engine Types
export type TTSVoice = 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr' | 'Aoede';

export type TTSSpeakingStyle =
  | 'News Presenter'
  | 'Documentary'
  | 'Cinematic'
  | 'Suspense'
  | 'Dramatic'
  | 'Informative'
  | 'Technical'
  | 'Emotional'
  | 'Storytelling';

export type TTSLanguage =
  | 'Hindi'
  | 'English'
  | 'Hinglish'
  | 'Gujarati'
  | 'Marathi'
  | 'Bengali'
  | 'Tamil'
  | 'Telugu'
  | 'Punjabi';

export interface TTSConfig {
  language: TTSLanguage;
  voice: TTSVoice;
  speed: number;
  speakingStyle: TTSSpeakingStyle;
  pitch: string;
  energy: string;
  customDirection?: string;
}

export interface SceneTiming {
  sceneNumber: number;
  startTime: string;
  endTime: string;
  duration: string;
  voiceOver: string;
}

export interface TTSAudioData {
  audioUrl?: string;
  durationSeconds?: number;
  base64Data?: string;
  mimeType?: string;
  status: 'IDLE' | 'GENERATING' | 'READY' | 'FAILED';
  error?: string;
  voiceUsed?: string;
  languageUsed?: string;
  sceneTimings?: SceneTiming[];
  generatedAt?: string;
}


// ==========================================
// STEP 6: PROJECT HISTORY DATA STRUCTURES
// ==========================================
export type ProjectStatus = 'DRAFT' | 'GENERATED' | 'READY';

export interface GodseyeProject {
  id: string;
  name: string;
  status: ProjectStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  article: {
    title: string;
    content: string;
    url: string;
  };
  settings: {
    contentType: ContentType;
    duration: Duration;
    customDurationSeconds?: number;
    videoFormat: VideoFormat;
    language: Language;
    contentStyle: ContentStyle;
    mood: Mood;
    platforms: Platform[];
  };
  content: GodseyeAiResult | null;
}

export interface ProjectFilterOptions {
  searchQuery: string;
  statusFilter: 'ALL' | ProjectStatus;
  contentTypeFilter?: ContentType | 'ALL';
  sortBy: 'recent' | 'oldest' | 'name';
}
