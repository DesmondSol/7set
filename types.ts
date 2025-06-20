
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

// Ensure ALL_CANVAS_SECTIONS is defined early and clearly
export const ALL_CANVAS_SECTIONS: CanvasSection[] = Object.values(CanvasSection);

export type CanvasData = Record<CanvasSection, string>;

export interface CanvasSectionHelp {
  title: CanvasSection; // This remains the enum key for internal linking
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
  text: string; // This text could be in the AI-generated language
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
  [ResearchSection.AI_SUMMARY]: string; // AI summary will be in the selected language
}

export interface ResearchSectionHelp {
  title: ResearchSection; // This remains the enum key
  sidebarTitle: Record<Language, string>; // New field for concise sidebar title
  explanation: Record<Language, string>;
}
