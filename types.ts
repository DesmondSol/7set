// Define the TranslationKey type directly in types.ts
// This includes all string literals and enums previously defined in locales.ts for this type.
export type TranslationKey =
  | Page
  | SubPage
  | CanvasSection 
  | ResearchSection 
  | CopywritingSubSection 
  | MindsetSubSection
  | 'export_all_button'
  | 'ai_assistant_canvas_button_tooltip'
  | 'help_canvas_button_tooltip'
  | 'ai_assistant_modal_title_canvas'
  | 'ai_modal_idea_label'
  | 'ai_modal_q1_label'
  | 'ai_modal_q2_label'
  | 'ai_modal_q3_label'
  | 'ai_modal_idea_placeholder' 
  | 'ai_modal_q1_placeholder'   
  | 'ai_modal_q2_placeholder'   
  | 'ai_modal_q3_placeholder'   
  | 'ai_modal_generate_button_canvas'
  | 'ai_modal_generating_button_canvas'
  | 'help_modal_title_canvas'
  | 'businessLaunchCanvas_title' 
  | 'edit_button'
  | 'save_button'
  | 'delete_button'
  | 'cancel_button'
  | 'no_content_yet_placeholder'
  | 'error_ai_failed_generic'
  | 'error_ai_no_idea'
  | 'market_research_accelerator_page_title'
  | 'export_current_view_button'
  | 'help_mra_button_tooltip'
  | 'mra_help_modal_title_prefix'
  | 'mra_sidebar_title'
  | 'mra_questions_create_set_button'
  | 'mra_questions_active_set_label'
  | 'mra_questions_select_set_placeholder'
  | 'mra_questions_delete_set_button_title'
  | 'mra_questions_working_on_prefix'
  | 'mra_questions_goal_prefix'
  | 'mra_questions_audience_prefix'
  | 'mra_questions_add_manual_label'
  | 'mra_questions_add_manual_button'
  | 'mra_questions_ai_generate_button'
  | 'mra_questions_ai_generating_button'
  | 'mra_questions_ai_requires_canvas_note'
  | 'mra_questions_no_questions_placeholder'
  | 'mra_questions_select_set_prompt'
  | 'mra_questions_no_sets_prompt'
  | 'mra_general_notes_title'
  | 'mra_general_notes_import_csv_label'
  | 'mra_general_notes_csv_note'
  | 'mra_general_notes_placeholder'
  | 'mra_competitor_analysis_title'
  | 'mra_competitor_add_button'
  | 'mra_competitor_no_competitors_placeholder'
  | 'mra_trends_title'
  | 'mra_trends_add_button'
  | 'mra_trends_no_trends_placeholder'
  | 'mra_ai_summary_title'
  | 'mra_ai_summary_generate_button'
  | 'mra_ai_summary_generating_button'
  | 'mra_ai_summary_placeholder'
  | 'mra_create_set_modal_title'
  | 'mra_create_set_name_label'
  | 'mra_create_set_goal_label'
  | 'mra_create_set_audience_label'
  | 'mra_create_set_button'
  | 'mra_error_fill_all_fields'
  | 'mra_error_select_or_create_set'
  | 'coming_soon_title'
  | 'coming_soon_feature_text_prefix'
  | 'coming_soon_feature_text_suffix'
  | 'coming_soon_message'
  | 'welcome_title'
  | 'welcome_message'
  | 'lang_english'
  | 'lang_amharic'
  | 'exported_on_label'
  | 'page_x_of_y'
  | 'no_content_yet_placeholder_pdf'
  | 'mra_report_set_title'
  | 'mra_report_goal_label'
  | 'mra_report_audience_label'
  | 'mra_report_question_label'
  | 'mra_report_responses_label'
  | 'mra_report_pricing_label'
  | 'mra_report_features_label'
  | 'mra_report_strengths_label'
  | 'mra_report_weaknesses_label'
  | 'mra_report_gaps_label'
  | 'mra_report_notes_label' 
  | 'mra_report_description_label'
  | 'mra_report_source_label'
  | 'mra_report_timeframe_label'
  | 'mra_report_location_label'
  | 'mra_report_impact_label'
  | 'user_profile_button_tooltip'
  | 'user_profile_modal_title'
  | 'user_profile_name_label'
  | 'user_profile_email_label'
  | 'user_profile_phone_label'
  | 'user_profile_other_details_label'
  | 'user_profile_photo_label'
  | 'user_profile_upload_photo_button'
  | 'user_profile_change_photo_button'
  | 'user_profile_save_button'
  | 'user_profile_name_placeholder'
  | 'user_profile_email_placeholder'
  | 'user_profile_phone_placeholder'
  | 'user_profile_other_details_placeholder'
  | 'pdf_made_by_title'
  | 'lang_en_short'
  | 'lang_am_short'
  | 'logo_alt_text' 
  | 'copywriting_page_title'
  | 'copywriting_sidebar_title'
  | 'copywriting_help_button_tooltip'
  | 'copywriting_ai_button_tooltip'
  | 'copywriting_marketing_title'
  | 'copywriting_pitch_refinement_title'
  | 'marketing_add_post_button'
  | 'marketing_no_posts_placeholder'
  | 'marketing_ai_generate_plan_button' 
  | 'marketing_ai_generating_plan_button'
  | 'marketing_post_modal_create_title'
  | 'marketing_post_modal_edit_title'
  | 'marketing_post_title_label'
  | 'marketing_post_content_label'
  | 'marketing_post_platform_label'
  | 'marketing_post_scheduled_date_label'
  | 'marketing_post_visual_recommendation_label'
  | 'marketing_post_notes_label'
  | 'marketing_post_status_label'
  | 'marketing_post_status_todo'
  | 'marketing_post_status_in_progress'
  | 'marketing_post_status_done'
  | 'marketing_post_platform_placeholder'
  | 'marketing_post_title_placeholder'
  | 'marketing_post_content_placeholder'
  | 'marketing_post_visual_placeholder'
  | 'marketing_post_notes_placeholder'
  | 'ai_marketing_modal_title'
  | 'ai_marketing_campaign_goal_label'
  | 'ai_marketing_target_platforms_label'
  | 'ai_marketing_content_tone_label'
  | 'ai_marketing_duration_label'
  | 'ai_marketing_campaign_goal_placeholder'
  | 'ai_marketing_target_platforms_placeholder'
  | 'ai_marketing_content_tone_placeholder'
  | 'ai_marketing_duration_placeholder'
  | 'ai_marketing_generate_button'
  | 'pitch_add_button'
  | 'pitch_no_pitches_placeholder'
  | 'pitch_ai_generate_button'
  | 'pitch_ai_generating_button'
  | 'pitch_modal_create_title'
  | 'pitch_modal_edit_title'
  | 'pitch_type_label'
  | 'pitch_type_investor'
  | 'pitch_type_sales'
  | 'pitch_type_email_campaign'
  | 'pitch_title_label'
  | 'pitch_target_audience_label'
  | 'pitch_key_message_label'
  | 'pitch_content_label'
  | 'pitch_notes_label'
  | 'pitch_title_placeholder'
  | 'pitch_target_audience_placeholder'
  | 'pitch_key_message_placeholder'
  | 'pitch_content_placeholder'
  | 'ai_pitch_modal_title'
  | 'ai_pitch_type_label'
  | 'ai_pitch_target_audience_label'
  | 'ai_pitch_key_message_label'
  | 'ai_pitch_num_emails_label' 
  | 'ai_pitch_generate_button'
  | 'view_details_button'
  | 'mark_as_done_button'
  | 'mark_as_todo_button'
  | 'export_marketing_plan_button'
  | 'export_pitches_button'
  | 'pdf_marketing_plan_title'
  | 'pdf_marketing_post_title'
  | 'pdf_platform_label'
  | 'pdf_scheduled_date_label'
  | 'pdf_visual_recommendation_label'
  | 'pdf_status_label'
  | 'pdf_pitches_title'
  | 'pdf_pitch_title'
  | 'pdf_pitch_type_label'
  | 'pdf_target_audience_label'
  | 'pdf_key_message_label'
  | 'calendar_prev_week'
  | 'calendar_next_week'
  | 'calendar_add_post_tooltip'
  | 'day_sun_short' | 'day_mon_short' | 'day_tue_short' | 'day_wed_short' | 'day_thu_short' | 'day_fri_short' | 'day_sat_short'
  | 'month_jan' | 'month_feb' | 'month_mar' | 'month_apr' | 'month_may' | 'month_jun' | 'month_jul' | 'month_aug' | 'month_sep' | 'month_oct' | 'month_nov' | 'month_dec'
  | 'infographic_title'
  | 'infographic_subtitle'
  | 'infographic_blueprint_title'
  | 'infographic_blueprint_desc'
  | 'infographic_stage1_name' 
  | 'infographic_stage1_desc'
  | 'infographic_stage2_name' 
  | 'infographic_stage2_desc'
  | 'infographic_stage3_name' 
  | 'infographic_stage3_desc'
  | 'infographic_deepdive_start_title'
  | 'infographic_deepdive_start_desc'
  | 'infographic_chart_start_week1'
  | 'infographic_chart_start_week2'
  | 'infographic_chart_start_week3'
  | 'infographic_chart_start_week4'
  | 'infographic_deepdive_build_title'
  | 'infographic_deepdive_build_desc'
  | 'infographic_chart_build_mvp'
  | 'infographic_chart_build_finance'
  | 'infographic_chart_build_marketing'
  | 'infographic_chart_build_legal'
  | 'infographic_deepdive_grow_title'
  | 'infographic_deepdive_grow_desc'
  | 'infographic_chart_grow_legal'
  | 'infographic_chart_grow_finance'
  | 'infographic_chart_grow_ops'
  | 'infographic_chart_grow_hr'
  | 'infographic_chart_grow_negotiation'
  | 'infographic_chart_grow_kpi'
  | 'infographic_actionled_title'
  | 'infographic_actionled_desc'
  | 'infographic_actionled_workshops'
  | 'infographic_actionled_app'
  | 'infographic_actionled_projects'
  | 'infographic_chart_learning_action'
  | 'infographic_chart_learning_theory'
  | 'infographic_chart_learning_title'
  | 'infographic_weekly_title'
  | 'infographic_weekly_desc'
  | 'infographic_chart_hours_weekday'
  | 'infographic_chart_hours_weekend'
  | 'infographic_chart_hours_title'
  | 'infographic_ecosystem_title'
  | 'infographic_eco_networking_title'
  | 'infographic_eco_networking_desc'
  | 'infographic_eco_speakers_title'
  | 'infographic_eco_speakers_desc'
  | 'infographic_eco_amas_title'
  | 'infographic_eco_amas_desc'
  | 'infographic_eco_gamenights_title'
  | 'infographic_eco_gamenights_desc'
  | 'infographic_goal_title'
  | 'infographic_goal_prizes_amount'
  | 'infographic_goal_prizes_desc'
  | 'infographic_goal_investment_amount'
  | 'infographic_goal_investment_desc'
  | 'infographic_footer_copyright'
  | 'infographic_footer_address'
  | 'infographic_footer_poweredby'
  | 'mindset_page_title'
  | 'mindset_sidebar_title'
  | 'mindset_assessment_title'
  | 'mindset_profile_report_title'
  | 'mindset_goal_setting_title'
  | 'mindset_assessment_explanation'
  | 'mindset_profile_report_explanation'
  | 'mindset_goal_setting_explanation'
  | 'mindset_assessment_personality_button'
  | 'mindset_assessment_acumen_button'
  | 'mindset_assessment_knowledge_button'
  | 'mindset_assessment_modal_title_personality'
  | 'mindset_assessment_modal_title_acumen'
  | 'mindset_assessment_modal_title_knowledge'
  | 'mindset_assessment_progress_label'
  | 'mindset_assessment_question_count_label' 
  | 'mindset_assessment_questions_remaining_label' 
  | 'mindset_assessment_next_button'
  | 'mindset_assessment_prev_button'
  | 'mindset_assessment_submit_button'
  | 'mindset_assessment_start_prompt'
  | 'mindset_profile_report_generate_button'
  | 'mindset_profile_report_generating_button'
  | 'mindset_profile_report_prompt_complete_assessments'
  | 'mindset_profile_report_founder_type_title'
  | 'mindset_profile_report_strengths_weaknesses_title'
  | 'mindset_profile_report_cofounder_title'
  | 'mindset_profile_report_key_takeaways_title'
  | 'mindset_goal_setting_6_month_title'
  | 'mindset_goal_setting_2_year_title'
  | 'mindset_goal_setting_5_year_title'
  | 'mindset_goal_setting_10_year_title'
  | 'mindset_goal_setting_self_label'
  | 'mindset_goal_setting_family_label'
  | 'mindset_goal_setting_world_label'
  | 'mindset_goal_setting_self_placeholder'
  | 'mindset_goal_setting_family_placeholder'
  | 'mindset_goal_setting_world_placeholder'
  | 'mindset_goal_setting_ai_coach_button_tooltip'
  | 'mindset_ai_coach_modal_title'
  | 'mindset_ai_coach_input_placeholder'
  | 'mindset_ai_coach_welcome_message'
  | 'mindset_help_button_tooltip'
  | 'export_profile_report_button'
  | 'export_goals_button'
  | 'pdf_profile_report_title'
  | 'pdf_goals_title'
  | 'pdf_score_label'
  // Personality Questions
  | 'q_p1_text' | 'q_p1_opt_very_uncomfortable' | 'q_p1_opt_uncomfortable' | 'q_p1_opt_neutral' | 'q_p1_opt_comfortable' | 'q_p1_opt_very_comfortable'
  | 'q_p2_text' | 'q_p2_opt_analyze' | 'q_p2_opt_action' | 'q_p2_opt_seek_help' | 'q_p2_opt_wait'
  | 'q_p3_text' | 'q_p3_opt_delegate' | 'q_p3_opt_control' | 'q_p3_opt_collaborate' | 'q_p3_opt_avoid'
  | 'q_p4_text' // Scale 1-5
  | 'q_p5_text' | 'q_p5_opt_data' | 'q_p5_opt_intuition' | 'q_p5_opt_advice' | 'q_p5_opt_trial_error'
  // Business Acumen Questions
  | 'q_ba1_text' | 'q_ba1_opt_detailed_plan' | 'q_ba1_opt_flexible_approach' | 'q_ba1_opt_customer_feedback' | 'q_ba1_opt_competitor_focus'
  | 'q_ba2_text' | 'q_ba2_opt_revenue_first' | 'q_ba2_opt_profit_first' | 'q_ba2_opt_growth_first' | 'q_ba2_opt_balance'
  | 'q_ba3_text' // Scale 1-5
  | 'q_ba4_text' | 'q_ba4_opt_organic' | 'q_ba4_opt_paid_ads' | 'q_ba4_opt_partnerships' | 'q_ba4_opt_sales_team'
  | 'q_ba5_text' // Scenario
    | 'q_ba5_opt_cut_costs' | 'q_ba5_opt_increase_marketing' | 'q_ba5_opt_pivot_product' | 'q_ba5_opt_seek_funding'
  // Startup Knowledge Questions
  | 'q_sk1_text' | 'q_sk1_opt_mvp_basic' | 'q_sk1_opt_mvp_polished' | 'q_sk1_opt_mvp_many_features' | 'q_sk1_opt_mvp_no_need'
  | 'q_sk2_text' // Scale 1-5 (Understanding of pivoting)
  | 'q_sk3_text' | 'q_sk3_opt_bootstrapping' | 'q_sk3_opt_friends_family' | 'q_sk3_opt_angel_investors' | 'q_sk3_opt_venture_capital'
  | 'q_sk4_text' // Scenario: Validating product-market fit
    | 'q_sk4_opt_surveys' | 'q_sk4_opt_interviews' | 'q_sk4_opt_presales' | 'q_sk4_opt_analytics'
  | 'q_sk5_text' | 'q_sk5_opt_solo' | 'q_sk5_opt_complementary' | 'q_sk5_opt_similar_skills' | 'q_sk5_opt_friends'
  // Radar Chart Labels
  | 'radar_chart_risk_tolerance'
  | 'radar_chart_leadership'
  | 'radar_chart_adaptability'
  | 'radar_chart_market_insight'
  | 'radar_chart_financial_literacy'
  | 'radar_chart_strategic_thinking'
  | 'radar_chart_technical_skills'
  | 'radar_chart_sales_ability'
  | 'radar_chart_resilience'
  | 'radar_chart_creativity'
  | 'founder_type_visionary_catalyst_title'
  | 'founder_type_visionary_catalyst_desc'
  | 'cofounder_suggestion_operational_excellence'
  | 'takeaway_focus_on_execution'
  | 'goal_promise_cast_on'
  ;

export type Language = 'en' | 'am';

export enum Page {
  START = 'Start',
  BUILD = 'Build',
  GROW = 'Grow',
}

export enum SubPage {
  MINDSET = 'Mindset',
  STRATEGY = 'Strategy',
  RESEARCH = 'Research',
  COPYWRITING = 'Copywriting',
  CRM = 'CRM',
  EXECUTION_TRACKING = 'Execution Tracking',
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

export enum CopywritingSubSection {
  MARKETING = "Marketing Content & Plans",
  PITCH_REFINEMENT = "Pitch Refinement",
}

export type MarketingPostStatus = 'todo' | 'in-progress' | 'done';

export interface MarketingPost {
  id: string;
  title: string;
  content: string;
  platform: string;
  scheduledDate: string;
  visualRecommendation: string;
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
  content: string;
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

export enum MindsetSubSection {
  ENTREPRENEURIAL_ASSESSMENT = "Entrepreneurial Assessment",
  PROFILE_REPORT = "Profile Report",
  GOAL_SETTING = "Goal Setting",
}

export type AssessmentCategory = 'personality' | 'businessAcumen' | 'startupKnowledge';

export interface AssessmentQuestionOption {
  value: string;
  labelKey: TranslationKey; 
}
export interface AssessmentQuestion {
  id: string;
  textKey: TranslationKey; 
  type: 'multiple-choice-scale' | 'multiple-choice-options' | 'scenario-options';
  options?: AssessmentQuestionOption[]; // optionsKey removed, options directly used
  category: AssessmentCategory;
  scaleMin?: number;
  scaleMax?: number;
}

export type AssessmentAnswers = Record<string, string | number>;

export interface AssessmentScores {
    riskTolerance: number;      
    leadership: number;         
    adaptability: number;       
    marketInsight: number;      
    financialLiteracy: number;  
    strategicThinking: number;  
    technicalSkills?: number;    
    salesAbility?: number;       
    resilience?: number;         
    creativity?: number;         
}

export interface FounderProfileReportData {
  founderTypeTitle: string;
  founderTypeDescription: string;
  scores: AssessmentScores;
  cofounderPersonaSuggestion: string;
  keyTakeaways: string[];
  generatedDate: string;
  language: Language; // Track the language of the report
}

export interface GoalDetail {
  self: string;
  family: string;
  world: string;
}

export type GoalTimeframe = '6-month' | '2-year' | '5-year' | '10-year';

export interface GoalSettingData {
  '6-month': GoalDetail;
  '2-year': GoalDetail;
  '5-year': GoalDetail;
  '10-year': GoalDetail;
}

export interface MindsetData {
  assessmentAnswers: {
    personality: AssessmentAnswers;
    businessAcumen: AssessmentAnswers;
    startupKnowledge: AssessmentAnswers;
  };
  assessmentStatus: {
    personality: 'not-started' | 'in-progress' | 'completed';
    businessAcumen: 'not-started' | 'in-progress' | 'completed';
    startupKnowledge: 'not-started' | 'in-progress' | 'completed';
  };
  profileReport: FounderProfileReportData | null;
  goals: GoalSettingData;
  goalsFirstSetDate?: string; // Optional: stores ISO string of date when goals are first saved
  shouldAutoGenerateReport: boolean; // Added this field
  goalSettingAiChatHistory: { role: 'user' | 'model', parts: {text: string}[] }[];
}

export interface MindsetSectionHelp {
  title: MindsetSubSection;
  sidebarTitle: Record<Language, TranslationKey>; 
  explanationKey: TranslationKey; 
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}