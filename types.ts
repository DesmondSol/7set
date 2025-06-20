
export type Language = 'en' | 'am';

export enum Page {
  START = 'Start',
  BUILD = 'Build',
  GROW = 'Grow',
}

export enum SubPage {
  // Start
  STRATEGY = 'Strategy',
  RESEARCH = 'Research',
  COPYWRITING = 'Copywriting',
  // Build
  CRM = 'CRM',
  EXECUTION_TRACKING = 'Execution Tracking',
  // Grow
  LEARN = 'Learn',
  AI_ADVISOR = 'AI Advisor',
}

export interface NavItem {
  label: Page;
  subItems: SubPage[];
}

export enum CanvasSection {
  PROJECT_OVERVIEW = "Project Overview",
  PRODUCT_VISION = "Product Vision",
  NORTH_STAR_METRIC = "North Star Metric",
  PRODUCT_WHY = "Product Why",
  PROBLEM = "Problem",
  SOLUTION = "Solution",
  PRODUCT_DETAIL = "Product Detail",
  MARKET = "Market",
  PERSONAS = "Personas",
  JOBS_TO_BE_DONE = "Jobs To Be Done",
  USE_CASES = "Use Cases",
  UNIQUE_VALUE_PROPOSITION = "Unique Value Proposition",
  UNFAIR_ADVANTAGE = "Unfair Advantage",
  BUSINESS_MODEL = "Business Model",
  PRICING = "Pricing",
  COMPETITORS = "Competitors",
  UNIT_ECONOMICS = "Unit Economics",
  BRAND_STYLE_GUIDES = "Brand & Style Guides",
  PRODUCT_MARKET_FIT = "Product - Market Fit",
}

export const ALL_CANVAS_SECTIONS: CanvasSection[] = Object.values(CanvasSection);

export type CanvasData = Record<CanvasSection, string>;

export interface CanvasSectionHelp {
  title: CanvasSection;
  explanation: Record<Language, string>;
  example?: Record<Language, string>;
}

export enum ResearchSection {
  QUESTIONS = "Research Questions & Responses", 
  GENERAL_NOTES_IMPORT = "General Notes & Bulk Import", 
  COMPETITOR_ANALYSIS = "Competitor Analysis",
  TRENDS = "Trends",
  AI_SUMMARY = "AI Summary",
}

export interface ResearchQuestionItem {
  id: string;
  text: string;
  responses: { id: string; text: string }[];
}

export interface ResearchQuestionnaireSet {
  id: string;
  name: string; 
  researchGoal: string;
  targetAudience: string;
  questions: ResearchQuestionItem[];
}

export interface CompetitorProfile {
  id: string;
  name: string;
  pricingStrategy: string;
  keyFeatures: string;
  strengths: string;
  weaknesses: string;
  marketGapsAddressed: string;
  notes: string;
}

export interface TrendEntry {
  id: string;
  title: string;
  description: string;
  sourceEvidence: string;
  timeframe: string;
  locationMarket: string;
  potentialImpact: string;
  notes: string;
}

export interface MarketResearchData {
  [ResearchSection.QUESTIONS]: ResearchQuestionnaireSet[]; 
  [ResearchSection.GENERAL_NOTES_IMPORT]: string; 
  [ResearchSection.COMPETITOR_ANALYSIS]: CompetitorProfile[];
  [ResearchSection.TRENDS]: TrendEntry[];
  [ResearchSection.AI_SUMMARY]: string;
}

export interface ResearchSectionHelp {
  title: ResearchSection;
  sidebarTitle: Record<Language, string>;
  explanation: Record<Language, string>;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  otherDetails: string;
  photo: string | null; 
}

// --- Copywriting Section Types ---
export enum CopywritingSubSection {
  MARKETING = "Marketing Content & Plans",
  PITCH_REFINEMENT = "Pitch Refinement",
}

export type MarketingPostStatus = 'todo' | 'in-progress' | 'done';

export interface MarketingPost {
  id: string;
  title: string;
  content: string;
  platform: string; // e.g., "Facebook", "Blog", "Instagram"
  scheduledDate: string; // ISO date-time string or just date string
  visualRecommendation: string; // Text description
  notes?: string;
  status: MarketingPostStatus;
}

export type PitchType = 'investor_pitch' | 'sales_pitch' | 'email_campaign';

export interface Pitch {
  id: string;
  type: PitchType;
  title: string;
  targetAudience: string;
  keyMessage: string;
  content: string; // Could be JSON string for structured email sequences
  notes?: string;
}

export interface CopywritingData {
  marketingPosts: MarketingPost[];
  pitches: Pitch[];
}

export interface CopywritingSectionHelp {
  title: CopywritingSubSection;
  sidebarTitle: Record<Language, string>;
  explanation: Record<Language, string>;
}
// --- End Copywriting Section Types ---
