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
  | 'Documentary'
  | 'Cinematic'
  | 'Technical'
  | 'Suspense'
  | 'Emotional'
  | 'Breaking News'
  | 'Explainer'
  | 'Investigative'
  | 'Storytelling';

export type Mood =
  | 'Neutral'
  | 'Urgent'
  | 'Dramatic'
  | 'Suspenseful'
  | 'Emotional'
  | 'Serious'
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
  | 'Quality Check'
  | 'Script'
  | 'Scenes'
  | 'Video Prompts'
  | 'Adobe Express'
  | 'Thumbnail'
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
  | 'Retention';

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

export interface StoryAngle {
  mainAngle: string;
  whyInteresting: string;
  curiosityElement: string;
  emotionalElement: string;
  visualElement: string;
}

export interface HookEngineOutput {
  curiosity: string;
  shock: string;
  question: string;
  story: string;
  informationGap: string;
  bestHook: string;
  reason: string;
}

export interface ScriptSection {
  phase: string;
  name: string;
  narration: string;
  cue?: string;
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
  repetition: ContentQualityMetric;
  weakSentences: ContentQualityMetric;
  boringSections: ContentQualityMetric;
  unsupportedClaims: ContentQualityMetric;
  missingContext: ContentQualityMetric;
  endingStrength: ContentQualityMetric;
  autoImprovementsApplied: string[];
  factualIntegrityVerified: boolean;
}

export interface HighRetentionScript {
  title: string;
  language: string;
  style: string;
  mood: string;
  duration: string;
  text: string;
  polishedScript?: string;
  sections: ScriptSection[];
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
  keywords: KeywordsPackage;
  disclaimer: string;
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
