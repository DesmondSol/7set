
import { Page, SubPage, CanvasSection, ResearchSection, Language, CopywritingSubSection } from './types';

// Define a more comprehensive type for translation keys
export type TranslationKey =
  | Page
  | SubPage
  | CanvasSection 
  | ResearchSection 
  | CopywritingSubSection 
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
  // PDF Export specific keys
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
  // User Profile
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
  | 'logo_alt_text' // Added for the logo
  // Copywriting Section Keys
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
  // Calendar specific
  | 'calendar_prev_week'
  | 'calendar_next_week'
  | 'calendar_add_post_tooltip'
  | 'day_sun_short' | 'day_mon_short' | 'day_tue_short' | 'day_wed_short' | 'day_thu_short' | 'day_fri_short' | 'day_sat_short'
  | 'month_jan' | 'month_feb' | 'month_mar' | 'month_apr' | 'month_may' | 'month_jun' | 'month_jul' | 'month_aug' | 'month_sep' | 'month_oct' | 'month_nov' | 'month_dec';

export type LocalizedContent = Record<TranslationKey, string>;

export const translations: Record<Language, Partial<LocalizedContent>> = {
  en: {
    [Page.START]: 'Start',
    [Page.BUILD]: 'Build',
    [Page.GROW]: 'Grow',
    [SubPage.STRATEGY]: 'Strategy',
    [SubPage.RESEARCH]: 'Research',
    [SubPage.COPYWRITING]: 'Copywriting',
    [SubPage.CRM]: 'CRM',
    [SubPage.EXECUTION_TRACKING]: 'Execution Tracking',
    [SubPage.LEARN]: 'Learn',
    [SubPage.AI_ADVISOR]: 'AI Advisor',

    [CanvasSection.PROJECT_OVERVIEW]: "Project Overview",
    [CanvasSection.PRODUCT_VISION]: "Product Vision",
    [CanvasSection.NORTH_STAR_METRIC]: "North Star Metric",
    [CanvasSection.PRODUCT_WHY]: "Product Why",
    [CanvasSection.PROBLEM]: "Problem",
    [CanvasSection.SOLUTION]: "Solution",
    [CanvasSection.PRODUCT_DETAIL]: "Product Detail",
    [CanvasSection.MARKET]: "Market",
    [CanvasSection.PERSONAS]: "Personas",
    [CanvasSection.JOBS_TO_BE_DONE]: "Jobs To Be Done",
    [CanvasSection.USE_CASES]: "Use Cases",
    [CanvasSection.UNIQUE_VALUE_PROPOSITION]: "Unique Value Proposition",
    [CanvasSection.UNFAIR_ADVANTAGE]: "Unfair Advantage",
    [CanvasSection.BUSINESS_MODEL]: "Business Model",
    [CanvasSection.PRICING]: "Pricing",
    [CanvasSection.COMPETITORS]: "Competitors",
    [CanvasSection.UNIT_ECONOMICS]: "Unit Economics",
    [CanvasSection.BRAND_STYLE_GUIDES]: "Brand & Style Guides",
    [CanvasSection.PRODUCT_MARKET_FIT]: "Product - Market Fit",

    [ResearchSection.QUESTIONS]: "Questions & Responses",
    [ResearchSection.GENERAL_NOTES_IMPORT]: "General Notes / Import",
    [ResearchSection.COMPETITOR_ANALYSIS]: "Competitor Analysis",
    [ResearchSection.TRENDS]: "Industry Trends",
    [ResearchSection.AI_SUMMARY]: "AI Summary",
    
    [CopywritingSubSection.MARKETING]: "Marketing Content & Plans",
    [CopywritingSubSection.PITCH_REFINEMENT]: "Pitch Refinement",

    export_all_button: 'Export All',
    ai_assistant_canvas_button_tooltip: 'AI Assistant to Fill Canvas',
    help_canvas_button_tooltip: 'Business Launch Canvas Guide',
    ai_assistant_modal_title_canvas: 'AI Assistant - Business Canvas',
    ai_modal_idea_label: 'Your Core Business Idea (Ethiopian Context):',
    ai_modal_q1_label: '1. Primary Problem Solved (in Ethiopia):',
    ai_modal_q2_label: '2. Target Customer (Ethiopian Focus):',
    ai_modal_q3_label: '3. Unique Selling Proposition (for Ethiopia):',
    ai_modal_idea_placeholder: 'e.g., "GebeyaSook", a mobile app for Ethiopian artisans to sell crafts online, focusing on traditional patterns.',
    ai_modal_q1_placeholder: 'e.g., Ethiopian artisans lack direct access to broader markets and fair pricing.',
    ai_modal_q2_placeholder: 'e.g., Tourists, diaspora, and local Ethiopians interested in authentic, high-quality crafts.',
    ai_modal_q3_placeholder: 'e.g., Direct artist-to-consumer model, integrated Telebirr payments, and promoting cultural heritage.',
    ai_modal_generate_button_canvas: 'Generate Canvas Content',
    ai_modal_generating_button_canvas: 'Generating...',
    help_modal_title_canvas: 'Business Launch Canvas Guide',
    businessLaunchCanvas_title: 'Business Launch Canvas',
    edit_button: 'Edit',
    save_button: 'Save',
    delete_button: 'Delete',
    cancel_button: 'Cancel',
    no_content_yet_placeholder: "No content yet. Click 'Edit' or use AI to generate.",
    error_ai_failed_generic: "AI generation failed or returned no data. Ensure API key is valid and inputs are clear.",
    error_ai_no_idea: "Please provide your business idea.",

    market_research_accelerator_page_title: "Market Research Accelerator",
    export_current_view_button: "Export Current View",
    help_mra_button_tooltip: "Help & Section Explanations",
    mra_help_modal_title_prefix: "Help",
    mra_sidebar_title: "Research Sections",
    mra_questions_create_set_button: "Create New Research Set",
    mra_questions_active_set_label: "Select Active Research Set:",
    mra_questions_select_set_placeholder: "-- Select a Set --",
    mra_questions_delete_set_button_title: "Delete selected set",
    mra_questions_working_on_prefix: "Working on",
    mra_questions_goal_prefix: "Goal",
    mra_questions_audience_prefix: "Audience",
    mra_questions_add_manual_label: "Add Question Manually to this Set:",
    mra_questions_add_manual_button: "Add Q",
    mra_questions_ai_generate_button: "Generate Questions with AI for this Set",
    mra_questions_ai_generating_button: "AI Generating...",
    mra_questions_ai_requires_canvas_note: "Note: AI question generation requires Business Launch Canvas data to be filled.",
    mra_questions_no_questions_placeholder:"No research questions added to this set yet.",
    mra_questions_select_set_prompt: "Please select a Research Set above to view or add questions.",
    mra_questions_no_sets_prompt: "No Research Sets created yet. Click 'Create New Research Set' to begin.",
    mra_general_notes_title: "General Notes & Bulk Data Import",
    mra_general_notes_import_csv_label: "Import Google Forms CSV Responses:",
    mra_general_notes_csv_note: "Note: CSV data will be appended. Formatting may be simplified.",
    mra_general_notes_placeholder: "Enter general research notes, paste bulk data, or summarize imported content here...",
    mra_competitor_analysis_title: "Competitor Analysis",
    mra_competitor_add_button: "Add Competitor",
    mra_competitor_no_competitors_placeholder: "No competitors added yet.",
    mra_trends_title: "Industry Trends",
    mra_trends_add_button: "Add Trend",
    mra_trends_no_trends_placeholder: "No trends added yet.",
    mra_ai_summary_title: "AI Generated Summary",
    mra_ai_summary_generate_button: "Generate AI Summary",
    mra_ai_summary_generating_button: "Generating Summary...",
    mra_ai_summary_placeholder: "Click \"Generate AI Summary\" to populate. Ensure relevant sections and strategy canvas have data.",
    mra_create_set_modal_title: "Create New Research Question Set",
    mra_create_set_name_label: "Set Name:",
    mra_create_set_goal_label: "Research Goal for this Set:",
    mra_create_set_audience_label: "Target Audience for this Set:",
    mra_create_set_button: "Create Set",
    mra_error_fill_all_fields: "Please fill in all fields for the new research set.",
    mra_error_select_or_create_set: "Please select or create a Research Set before adding questions.",

    coming_soon_title: "Coming Soon!",
    coming_soon_feature_text_prefix: "The",
    coming_soon_feature_text_suffix: "feature is under construction.",
    coming_soon_message: "We're working hard to bring you this exciting new tool. Stay tuned!",

    welcome_title: "Welcome to 7set Spark!",
    welcome_message: "Your innovation and training hub for entrepreneurs. Select a section from the navigation bar above to begin your journey.",
    lang_english: "English", 
    lang_amharic: "Amharic", 
    lang_en_short: "EN", 
    lang_am_short: "አማ", 
    logo_alt_text: "7set Spark Logo",


    exported_on_label: "Exported on",
    page_x_of_y: "Page {currentPage} of {totalPages}", 
    no_content_yet_placeholder_pdf: "No content provided.",
    mra_report_set_title: "Research Set",
    mra_report_goal_label: "Goal",
    mra_report_audience_label: "Audience",
    mra_report_question_label: "Question",
    mra_report_responses_label: "Responses",
    mra_report_pricing_label: "Pricing Strategy",
    mra_report_features_label: "Key Features",
    mra_report_strengths_label: "Strengths",
    mra_report_weaknesses_label: "Weaknesses",
    mra_report_gaps_label: "Market Gaps Addressed",
    mra_report_notes_label: "Notes",
    mra_report_description_label: "Description",
    mra_report_source_label: "Source/Evidence",
    mra_report_timeframe_label: "Timeframe",
    mra_report_location_label: "Location/Market",
    mra_report_impact_label: "Potential Impact",

    user_profile_button_tooltip: "User Profile",
    user_profile_modal_title: "User Profile",
    user_profile_name_label: "Full Name:",
    user_profile_email_label: "Email Address:",
    user_profile_phone_label: "Phone Number:",
    user_profile_other_details_label: "Other Details:",
    user_profile_photo_label: "Profile Photo:",
    user_profile_upload_photo_button: "Upload Photo",
    user_profile_change_photo_button: "Change Photo",
    user_profile_save_button: "Save Profile",
    user_profile_name_placeholder: "Enter your full name",
    user_profile_email_placeholder: "e.g., yourname@example.com",
    user_profile_phone_placeholder: "e.g., +251 91 123 4567",
    user_profile_other_details_placeholder: "e.g., Your Company / Role",
    pdf_made_by_title: "Prepared by",

    copywriting_page_title: "Copywriting Toolkit",
    copywriting_sidebar_title: "Copywriting Sections",
    copywriting_help_button_tooltip: "Copywriting Help",
    copywriting_ai_button_tooltip: "AI Copywriting Assistant",
    copywriting_marketing_title: "Marketing Content & Plans",
    copywriting_pitch_refinement_title: "Pitch Refinement",
    marketing_add_post_button: "Add New Post Manually",
    marketing_no_posts_placeholder: "No marketing posts created yet. Add one manually or use AI to generate a plan.",
    marketing_ai_generate_plan_button: "AI: Generate Marketing Plan",
    marketing_ai_generating_plan_button: "AI Generating Plan...",
    marketing_post_modal_create_title: "Create New Marketing Post",
    marketing_post_modal_edit_title: "Edit Marketing Post",
    marketing_post_title_label: "Post Title/Headline:",
    marketing_post_content_label: "Post Content/Body:",
    marketing_post_platform_label: "Target Platform(s):",
    marketing_post_scheduled_date_label: "Scheduled Date/Time:",
    marketing_post_visual_recommendation_label: "Visual Recommendation (Image/Video):",
    marketing_post_notes_label: "Internal Notes:",
    marketing_post_status_label: "Status:",
    marketing_post_status_todo: "To Do",
    marketing_post_status_in_progress: "In Progress",
    marketing_post_status_done: "Done",
    marketing_post_platform_placeholder: "e.g., Facebook, Blog, Telegram",
    marketing_post_title_placeholder: "Catchy title for your post",
    marketing_post_content_placeholder: "Write your marketing copy here...",
    marketing_post_visual_placeholder: "e.g., Photo of product in use, short video testimonial",
    marketing_post_notes_placeholder: "e.g., Coordinate with design team",
    ai_marketing_modal_title: "AI Marketing Plan Generator",
    ai_marketing_campaign_goal_label: "Main Goal of this Marketing Campaign:",
    ai_marketing_target_platforms_label: "Target Platforms (comma-separated):",
    ai_marketing_content_tone_label: "Desired Content Tone:",
    ai_marketing_duration_label: "Campaign Duration (e.g., 1 week, 1 month):",
    ai_marketing_campaign_goal_placeholder: "e.g., Launch new product, Increase brand awareness in Addis",
    ai_marketing_target_platforms_placeholder: "e.g., Facebook, Instagram, Telegram, Local Radio",
    ai_marketing_content_tone_placeholder: "e.g., Professional, Friendly, Humorous, Urgent",
    ai_marketing_duration_placeholder: "e.g., 7 days, 2 weeks",
    ai_marketing_generate_button: "Generate Marketing Plan",
    pitch_add_button: "Add New Pitch/Campaign Manually",
    pitch_no_pitches_placeholder: "No pitches or campaigns created yet.",
    pitch_ai_generate_button: "AI: Generate Pitch/Campaign Draft",
    pitch_ai_generating_button: "AI Generating Draft...",
    pitch_modal_create_title: "Create New Pitch/Campaign",
    pitch_modal_edit_title: "Edit Pitch/Campaign",
    pitch_type_label: "Type:",
    pitch_type_investor: "Investor Pitch Outline",
    pitch_type_sales: "Sales Pitch Points",
    pitch_type_email_campaign: "Email Campaign Sequence",
    pitch_title_label: "Pitch/Campaign Title:",
    pitch_target_audience_label: "Target Audience:",
    pitch_key_message_label: "Key Message/Objective:",
    pitch_content_label: "Content/Draft:",
    pitch_notes_label: "Internal Notes:",
    pitch_title_placeholder: "e.g., Seed Round Investor Deck, Sales Script for SMEs",
    pitch_target_audience_placeholder: "e.g., Angel Investors in Ethiopian Tech, Restaurant Owners",
    pitch_key_message_placeholder: "e.g., Secure $50K funding, Convert 10 new clients",
    pitch_content_placeholder: "Draft your pitch or email sequence here...",
    ai_pitch_modal_title: "AI Pitch & Campaign Generator",
    ai_pitch_type_label: "Select Pitch/Campaign Type:",
    ai_pitch_target_audience_label: "Target Audience for this Pitch/Campaign:",
    ai_pitch_key_message_label: "Key Message or Objective:",
    ai_pitch_num_emails_label: "Number of Emails (for Email Campaign):",
    ai_pitch_generate_button: "Generate Draft",
    view_details_button: "View Details",
    mark_as_done_button: "Mark as Done",
    mark_as_todo_button: "Mark as To Do",
    export_marketing_plan_button: "Export Marketing Plan",
    export_pitches_button: "Export Pitches",
    pdf_marketing_plan_title: "Marketing Plan",
    pdf_marketing_post_title: "Marketing Post",
    pdf_platform_label: "Platform(s)",
    pdf_scheduled_date_label: "Scheduled Date",
    pdf_visual_recommendation_label: "Visual Recommendation",
    pdf_status_label: "Status",
    pdf_pitches_title: "Pitches & Campaigns",
    pdf_pitch_title: "Pitch/Campaign",
    pdf_pitch_type_label: "Type",
    pdf_target_audience_label: "Target Audience",
    pdf_key_message_label: "Key Message",
    calendar_prev_week: "Previous Week",
    calendar_next_week: "Next Week",
    calendar_add_post_tooltip: "Add post for this day",
    day_sun_short: "Sun", day_mon_short: "Mon", day_tue_short: "Tue", day_wed_short: "Wed", day_thu_short: "Thu", day_fri_short: "Fri", day_sat_short: "Sat",
    month_jan: "January", month_feb: "February", month_mar: "March", month_apr: "April", month_may: "May", month_jun: "June", month_jul: "July", month_aug: "August", month_sep: "September", month_oct: "October", month_nov: "November", month_dec: "December",
  },
  am: {
    [Page.START]: 'ጀምር',
    [Page.BUILD]: 'ገንባ',
    [Page.GROW]: 'አሳድግ',
    [SubPage.STRATEGY]: 'ስትራቴጂ',
    [SubPage.RESEARCH]: 'ምርምር',
    [SubPage.COPYWRITING]: 'የፅሁፍ ዝግጅት',
    [SubPage.CRM]: 'ሲአርኤም',
    [SubPage.EXECUTION_TRACKING]: 'የአፈጻጸም ክትትል',
    [SubPage.LEARN]: 'ይማሩ',
    [SubPage.AI_ADVISOR]: 'የአርቴፊሻል ኢንተለጀንስ አማካሪ',

    [CanvasSection.PROJECT_OVERVIEW]: "የፕሮጀክት አጠቃላይ እይታ",
    [CanvasSection.PRODUCT_VISION]: "የምርት ራዕይ",
    [CanvasSection.NORTH_STAR_METRIC]: "የሰሜን ኮከብ መለኪያ",
    [CanvasSection.PRODUCT_WHY]: "የምርት ምክንያት",
    [CanvasSection.PROBLEM]: "ችግር",
    [CanvasSection.SOLUTION]: "መፍትሄ",
    [CanvasSection.PRODUCT_DETAIL]: "የምርት ዝርዝር",
    [CanvasSection.MARKET]: "ገበያ",
    [CanvasSection.PERSONAS]: "የደንበኛ ዓይነቶች",
    [CanvasSection.JOBS_TO_BE_DONE]: "ሊሰሩ የሚገባቸው ስራዎች",
    [CanvasSection.USE_CASES]: "የአጠቃቀም ሁኔታዎች",
    [CanvasSection.UNIQUE_VALUE_PROPOSITION]: "ልዩ የእሴት አቅርቦት",
    [CanvasSection.UNFAIR_ADVANTAGE]: "ኢ-ፍትሃዊ ጥቅም",
    [CanvasSection.BUSINESS_MODEL]: "የንግድ ሞዴል",
    [CanvasSection.PRICING]: "የዋጋ አወጣጥ",
    [CanvasSection.COMPETITORS]: "ተወዳዳሪዎች",
    [CanvasSection.UNIT_ECONOMICS]: "የአሃድ ኢኮኖሚክስ",
    [CanvasSection.BRAND_STYLE_GUIDES]: "የምርት ስም እና የቅጥ መመሪያዎች",
    [CanvasSection.PRODUCT_MARKET_FIT]: "የምርት-ገበያ ተስማሚነት",

    [ResearchSection.QUESTIONS]: "ጥያቄዎች እና ምላሾች",
    [ResearchSection.GENERAL_NOTES_IMPORT]: "አጠቃላይ ማስታወሻዎች / አስገባ",
    [ResearchSection.COMPETITOR_ANALYSIS]: "የተፎካካሪ ትንተና",
    [ResearchSection.TRENDS]: "የኢንዱስትሪ አዝማሚያዎች",
    [ResearchSection.AI_SUMMARY]: "የ AI ማጠቃለያ",

    [CopywritingSubSection.MARKETING]: "የግብይት ይዘት እና እቅዶች",
    [CopywritingSubSection.PITCH_REFINEMENT]: "የሀሳብ ማቅረቢያ ማሻሻያ",

    export_all_button: 'ሁሉንም ላክ',
    ai_assistant_canvas_button_tooltip: 'ሸራውን ለመሙላት የ AI ረዳት',
    help_canvas_button_tooltip: 'የቢዝነስ ማስጀመሪያ ሸራ መመሪያ',
    ai_assistant_modal_title_canvas: 'የ AI ረዳት - የቢዝነስ ሸራ',
    ai_modal_idea_label: 'የእርስዎ ዋና የንግድ ሃሳብ (የኢትዮጵያ አውድ):',
    ai_modal_q1_label: '1. ንግድዎ በዋናነት የሚፈታው ችግር (በኢትዮጵያ):',
    ai_modal_q2_label: '2. የእርስዎ ኢላማ ደንበኛ (የኢትዮጵያ ትኩረት):',
    ai_modal_q3_label: '3. የእርስዎን መፍትሄ ልዩ ወይም የተለየ የሚያደርገው (ለኢትዮጵያ):',
    ai_modal_idea_placeholder: 'ለምሳሌ፦ "ገበያሱቅ"፣ ኢትዮጵያውያን የእጅ ባለሞያዎች የባህል ሥራዎቻቸውን ኦንላይን እንዲሸጡ የሚያስችል የሞባይል መተግበሪያ፣ በባህላዊ ንድፎች ላይ ያተኮረ።',
    ai_modal_q1_placeholder: 'ለምሳሌ፦ ኢትዮጵያውያን የእጅ ባለሞያዎች ሰፊ ገበያ የማግኘት እና ፍትሃዊ ዋጋ የማግኘት ችግር አለባቸው።',
    ai_modal_q2_placeholder: 'ለምሳሌ፦ ቱሪስቶች፣ ዲያስፖራዎች፣ እና ጥራት ያላቸው የባህል ሥራዎችን የሚፈልጉ የአገር ውስጥ ኢትዮጵያውያን።',
    ai_modal_q3_placeholder: 'ለምሳሌ፦ በቀጥታ ከባለሙያ ወደ ተጠቃሚ የሚደርስ ሞዴል፣ የተቀናጀ የቴሌብር ክፍያ፣ እና የባህል ቅርሶችን ማስተዋወቅ።',
    ai_modal_generate_button_canvas: 'የሸራ ይዘት አመንጭ',
    ai_modal_generating_button_canvas: 'እያመነጨ ነው...',
    help_modal_title_canvas: 'የቢዝነስ ማስጀመሪያ ሸራ መመሪያ',
    businessLaunchCanvas_title: 'የቢዝነስ ማስጀመሪያ ሸራ',
    edit_button: 'አስተካክል',
    save_button: 'አስቀምጥ',
    delete_button: 'ሰርዝ',
    cancel_button: 'ሰርዝ',
    no_content_yet_placeholder: "እስካሁን ምንም ይዘት የለም። 'አስተካክል' የሚለውን ይጫኑ ወይም AI ይጠቀሙ።",
    error_ai_failed_generic: "የ AI ማመንጨት አልተሳካም ወይም ምንም ውሂብ አልተመለሰም። የኤፒአይ ቁልፍ ትክክል መሆኑን እና ግብአቶች ግልጽ መሆናቸውን ያረጋግጡ።",
    error_ai_no_idea: "እባክዎ የንግድ ሃሳብዎን ያቅርቡ።",

    market_research_accelerator_page_title: "የገበያ ጥናት ማፋጠኛ",
    export_current_view_button: "የአሁኑን እይታ ላክ",
    help_mra_button_tooltip: "እገዛ እና የክፍል ማብራሪያዎች",
    mra_help_modal_title_prefix: "እገዛ",
    mra_sidebar_title: "የምርምር ክፍሎች",
    mra_questions_create_set_button: "አዲስ የምርምር ስብስብ ይፍጠሩ",
    mra_questions_active_set_label: "ንቁ የምርምር ስብስብ ይምረጡ:",
    mra_questions_select_set_placeholder: "-- ስብስብ ይምረጡ --",
    mra_questions_delete_set_button_title: "የተመረጠውን ስብስብ ሰርዝ",
    mra_questions_working_on_prefix: "በመስራት ላይ ያለ",
    mra_questions_goal_prefix: "ግብ",
    mra_questions_audience_prefix: "ታዳሚ",
    mra_questions_add_manual_label: "ጥያቄ በእጅ ወደዚህ ስብስብ ያክሉ:",
    mra_questions_add_manual_button: "ጥያቄ ጨምር",
    mra_questions_ai_generate_button: "ለዚህ ስብስብ በ AI ጥያቄዎችን አመንጭ",
    mra_questions_ai_generating_button: "AI እያመነጨ ነው...",
    mra_questions_ai_requires_canvas_note: "ማሳሰቢያ: የ AI ጥያቄ ማመንጨት የቢዝነስ ማስጀመሪያ ሸራ ውሂብ መሞላት ይፈልጋል።",
    mra_questions_no_questions_placeholder:"እስካሁን ምንም የምርምር ጥያቄዎች ወደዚህ ስብስብ አልተጨመሩም።",
    mra_questions_select_set_prompt: "ጥያቄዎችን ለማየት ወይም ለመጨመር እባክዎ ከላይ የምርምር ስብስብ ይምረጡ።",
    mra_questions_no_sets_prompt: "እስካሁን የተፈጠሩ የምርምር ስብስቦች የሉም። ለመጀመር 'አዲስ የምርምር ስብስብ ይፍጠሩ' የሚለውን ይጫኑ።",
    mra_general_notes_title: "አጠቃላይ ማስታወሻዎች እና የጅምላ ውሂብ ማስገባት",
    mra_general_notes_import_csv_label: "የጉግል ቅጾች CSV ምላሾችን አስገባ:",
    mra_general_notes_csv_note: "ማሳሰቢያ: የ CSV ውሂብ ይያያዛል። ቅርጸቱ ሊቀልል ይችላል።",
    mra_general_notes_placeholder: "አጠቃላይ የምርምር ማስታወሻዎችን ያስገቡ፣ የጅምላ ውሂብ ይለጥፉ、 ወይም የገባውን ይዘት እዚህ ያጠቃልሉ...",
    mra_competitor_analysis_title: "የተፎካካሪ ትንተና",
    mra_competitor_add_button: "ተፎካካሪ ጨምር",
    mra_competitor_no_competitors_placeholder: "እስካሁን ምንም ተፎካካሪዎች አልተጨመሩም።",
    mra_trends_title: "የኢንዱስትሪ አዝማሚያዎች",
    mra_trends_add_button: "አዝማሚያ ጨምር",
    mra_trends_no_trends_placeholder: "እስካሁን ምንም አዝማሚያዎች አልተጨመሩም።",
    mra_ai_summary_title: "በ AI የተፈጠረ ማጠቃለያ",
    mra_ai_summary_generate_button: "የ AI ማጠቃለያ አመንጭ",
    mra_ai_summary_generating_button: "ማጠቃለያ እያመነጨ ነው...",
    mra_ai_summary_placeholder: "ለማመንጨት \"የ AI ማጠቃለያ አመንጭ\" የሚለውን ይጫኑ። ተዛማጅ ክፍሎች እና የስትራቴጂ ሸራ ውሂብ እንዳላቸው ያረጋግጡ።",
    mra_create_set_modal_title: "አዲስ የምርምር ጥያቄ ስብስብ ይፍጠሩ",
    mra_create_set_name_label: "የስብስብ ስም:",
    mra_create_set_goal_label: "የዚህ ስብስብ የምርምር ግብ:",
    mra_create_set_audience_label: "የዚህ ስብስብ ኢላማ ታዳሚ:",
    mra_create_set_button: "ስብስብ ፍጠር",
    mra_error_fill_all_fields: "እባክዎ ለአዲሱ የምርምር ስብስብ ሁሉንም መስኮች ይሙሉ፡፡",
    mra_error_select_or_create_set: "ጥያቄዎችን ከመጨመርዎ በፊት እባክዎ የምርምር ስብስብ ይምረጡ ወይም ይፍጠሩ፡፡",

    coming_soon_title: "በቅርቡ ይመጣል!",
    coming_soon_feature_text_prefix: "የ",
    coming_soon_feature_text_suffix: "ባህሪ በግንባታ ላይ ነው።",
    coming_soon_message: "ይህን አስደሳች አዲስ መሳሪያ ለእርስዎ ለማቅረብ ጠንክረን እየሰራን ነው። ይጠብቁን!",

    welcome_title: "እንኳን ወደ 7ሴት ስፓርክ በደህና መጡ!",
    welcome_message: "የእርስዎ የፈጠራ እና የስልጠና ማዕከል ለስራ ፈጣሪዎች። ጉዞዎን ለመጀመር ከላይ ካለው የማውጫ ቁልፎች አንድ ክፍል ይምረጡ።",
    lang_english: "English", 
    lang_amharic: "አማርኛ", 
    lang_en_short: "EN", 
    lang_am_short: "አማ", 
    logo_alt_text: "7ሴት ስፓርክ አርማ",

    exported_on_label: "የተላከበት ቀን",
    page_x_of_y: "ገጽ {currentPage} ከ {totalPages}",
    no_content_yet_placeholder_pdf: "ምንም ይዘት አልቀረበም።",
    mra_report_set_title: "የምርምር ስብስብ",
    mra_report_goal_label: "ግብ",
    mra_report_audience_label: "ታዳሚ",
    mra_report_question_label: "ጥያቄ",
    mra_report_responses_label: "ምላሾች",
    mra_report_pricing_label: "የዋጋ አወጣጥ ስትራቴጂ",
    mra_report_features_label: "ቁልፍ ባህሪዎች",
    mra_report_strengths_label: "ጥንካሬዎች",
    mra_report_weaknesses_label: "ድክመቶች",
    mra_report_gaps_label: "የተሸፈኑ የገበያ ክፍተቶች",
    mra_report_notes_label: "ማስታወሻዎች",
    mra_report_description_label: "መግለጫ",
    mra_report_source_label: "ምንጭ/ማስረጃ",
    mra_report_timeframe_label: "የጊዜ ገደብ",
    mra_report_location_label: "ቦታ/ገበያ",
    mra_report_impact_label: "ሊያስከትል የሚችለው ተጽዕኖ",

    user_profile_button_tooltip: "የተጠቃሚ መገለጫ",
    user_profile_modal_title: "የተጠቃሚ መገለጫ",
    user_profile_name_label: "ሙሉ ስም:",
    user_profile_email_label: "የኢሜይል አድራሻ:",
    user_profile_phone_label: "ስልክ ቁጥር:",
    user_profile_other_details_label: "ሌሎች ዝርዝሮች:",
    user_profile_photo_label: "የመገለጫ ፎቶ:",
    user_profile_upload_photo_button: "ፎቶ ይስቀሉ",
    user_profile_change_photo_button: "ፎቶ ይቀይሩ",
    user_profile_save_button: "መገለጫ ያስቀምጡ",
    user_profile_name_placeholder: "ሙሉ ስምዎን ያስገቡ",
    user_profile_email_placeholder: "ለምሳሌ፦ yourname@example.com",
    user_profile_phone_placeholder: "ለምሳሌ፦ +251 91 123 4567",
    user_profile_other_details_placeholder: "ለምሳሌ፦ የእርስዎ ድርጅት / ሚና",
    pdf_made_by_title: "የተዘጋጀው በ",

    copywriting_page_title: "የፅሁፍ ዝግጅት መሳሪያዎች",
    copywriting_sidebar_title: "የፅሁፍ ዝግጅት ክፍሎች",
    copywriting_help_button_tooltip: "የፅሁፍ ዝግጅት እገዛ",
    copywriting_ai_button_tooltip: "የ AI የፅሁፍ ዝግጅት ረዳት",
    copywriting_marketing_title: "የግብይት ይዘት እና እቅዶች",
    copywriting_pitch_refinement_title: "የሀሳብ ማቅረቢያ ማሻሻያ",
    marketing_add_post_button: "አዲስ የግብይት ጽሑፍ በእጅ ጨምር",
    marketing_no_posts_placeholder: "እስካሁን የተፈጠሩ የግብይት ጽሑፎች የሉም። በእጅ ይጨምሩ ወይም በ AI እቅድ ያመንጩ።",
    marketing_ai_generate_plan_button: "AI: የግብይት እቅድ አመንጭ",
    marketing_ai_generating_plan_button: "AI እቅድ እያመነጨ ነው...",
    marketing_post_modal_create_title: "አዲስ የግብይት ጽሑፍ ፍጠር",
    marketing_post_modal_edit_title: "የግብይት ጽሑፍ አስተካክል",
    marketing_post_title_label: "የጽሑፍ ርዕስ/ዋና ቃል:",
    marketing_post_content_label: "የጽሑፍ ይዘት:",
    marketing_post_platform_label: "ዒላማ መድረክ(ዎች):",
    marketing_post_scheduled_date_label: "የታቀደ ቀን/ሰዓት:",
    marketing_post_visual_recommendation_label: "የምስል/ቪዲዮ ምክር:",
    marketing_post_notes_label: "የውስጥ ማስታወሻዎች:",
    marketing_post_status_label: "ሁኔታ:",
    marketing_post_status_todo: "ሊሰራ",
    marketing_post_status_in_progress: "በሂደት ላይ",
    marketing_post_status_done: "ተከናውኗል",
    marketing_post_platform_placeholder: "ለምሳሌ፦ ፌስቡክ፣ ብሎግ፣ ቴሌግራም",
    marketing_post_title_placeholder: "ለጽሑፍዎ የሚስብ ርዕስ",
    marketing_post_content_placeholder: "የግብይት ጽሑፍዎን እዚህ ይጻፉ...",
    marketing_post_visual_placeholder: "ለምሳሌ፦ ጥቅም ላይ የዋለ ምርት ፎቶ፣ አጭር የቪዲዮ ምስክርነት",
    marketing_post_notes_placeholder: "ለምሳሌ፦ ከዲዛይን ቡድን ጋር ያስተባብሩ",
    ai_marketing_modal_title: "የ AI የግብይት እቅድ አመንጪ",
    ai_marketing_campaign_goal_label: "የዚህ የግብይት ዘመቻ ዋና ግብ:",
    ai_marketing_target_platforms_label: "ዒላማ መድረኮች (በኮማ ይለዩ):",
    ai_marketing_content_tone_label: "የሚፈለግ የይዘት ቃና:",
    ai_marketing_duration_label: "የዘመቻው ቆይታ (ለምሳሌ፦ 1 ሳምንት፣ 1 ወር):",
    ai_marketing_campaign_goal_placeholder: "ለምሳሌ፦ አዲስ ምርት ማስጀመር፣ በአዲስ አበባ የምርት ስም ግንዛቤን መጨመር",
    ai_marketing_target_platforms_placeholder: "ለምሳሌ፦ ፌስቡክ፣ ኢንስታግራም፣ ቴሌግራም፣ የአካባቢ ሬዲዮ",
    ai_marketing_content_tone_placeholder: "ለምሳሌ፦ ሙያዊ፣ ተግባቢ፣ አስቂኝ፣ አስቸኳይ",
    ai_marketing_duration_placeholder: "ለምሳሌ፦ 7 ቀናት፣ 2 ሳምንታት",
    ai_marketing_generate_button: "የግብይት እቅድ አመንጭ",
    pitch_add_button: "አዲስ ሀሳብ/ዘመቻ በእጅ ጨምር",
    pitch_no_pitches_placeholder: "እስካሁን የተፈጠሩ ሀሳቦች ወይም ዘመቻዎች የሉም።",
    pitch_ai_generate_button: "AI: የሀሳብ/ዘመቻ ረቂቅ አመንጭ",
    pitch_ai_generating_button: "AI ረቂቅ እያመነጨ ነው...",
    pitch_modal_create_title: "አዲስ ሀሳብ/ዘመቻ ፍጠር",
    pitch_modal_edit_title: "ሀሳብ/ዘመቻ አስተካክል",
    pitch_type_label: "ዓይነት:",
    pitch_type_investor: "የባለሀብት ሀሳብ ማቅረቢያ ማጠቃለያ",
    pitch_type_sales: "የሽያጭ ሀሳብ ማቅረቢያ ነጥቦች",
    pitch_type_email_campaign: "የኢሜል ዘመቻ ቅደም ተከተል",
    pitch_title_label: "የሀሳብ/ዘመቻ ርዕስ:",
    pitch_target_audience_label: "ዒላማ ታዳሚ:",
    pitch_key_message_label: "ቁልፍ መልዕክት/ዓላማ:",
    pitch_content_label: "ይዘት/ረቂቅ:",
    pitch_notes_label: "የውስጥ ማስታወሻዎች:",
    pitch_title_placeholder: "ለምሳሌ፦ የሲድ ዙር ባለሀብት ሰነድ፣ ለአነስተኛና መካከለኛ ንግዶች የሽያጭ ስክሪፕት",
    pitch_target_audience_placeholder: "ለምሳሌ፦ በኢትዮጵያ ቴክኖሎጂ ዘርፍ ያሉ ባለሀብቶች፣ የምግብ ቤት ባለቤቶች",
    pitch_key_message_placeholder: "ለምሳሌ፦ $50ሺህ የገንዘብ ድጋፍ ማግኘት፣ 10 አዲስ ደንበኞችን መለወጥ",
    pitch_content_placeholder: "የሀሳብ ማቅረቢያዎን ወይም የኢሜል ቅደም ተከተልዎን እዚህ ይቅረጹ...",
    ai_pitch_modal_title: "የ AI ሀሳብ እና ዘመቻ አመንጪ",
    ai_pitch_type_label: "የሀሳብ/ዘመቻ አይነት ይምረጡ:",
    ai_pitch_target_audience_label: "ለዚህ ሀሳብ/ዘመቻ ዒላማ ታዳሚ:",
    ai_pitch_key_message_label: "ቁልፍ መልዕክት ወይም ዓላማ:",
    ai_pitch_num_emails_label: "የኢሜሎች ብዛት (ለኢሜል ዘመቻ):",
    ai_pitch_generate_button: "ረቂቅ አመንጭ",
    view_details_button: "ዝርዝሮችን ይመልከቱ",
    mark_as_done_button: "እንደተጠናቀቀ ምልክት ያድርጉ",
    mark_as_todo_button: "እንደሚሰራ ምልክት ያድርጉ",
    export_marketing_plan_button: "የግብይት እቅድ ላክ",
    export_pitches_button: "የሀሳብ ማቅረቢያዎችን ላክ",
    pdf_marketing_plan_title: "የግብይት እቅድ",
    pdf_marketing_post_title: "የግብይት ጽሑፍ",
    pdf_platform_label: "መድረክ(ዎች)",
    pdf_scheduled_date_label: "የታቀደ ቀን",
    pdf_visual_recommendation_label: "የምስል ምክር",
    pdf_status_label: "ሁኔታ",
    pdf_pitches_title: "የሀሳብ ማቅረቢያዎች እና ዘመቻዎች",
    pdf_pitch_title: "ሀሳብ/ዘመቻ",
    pdf_pitch_type_label: "ዓይነት",
    pdf_target_audience_label: "ዒላማ ታዳሚ",
    pdf_key_message_label: "ቁልፍ መልዕክት",
    calendar_prev_week: "ያለፈው ሳምንት",
    calendar_next_week: "የሚቀጥለው ሳምንት",
    calendar_add_post_tooltip: "ለዚህ ቀን ጽሑፍ ጨምር",
    day_sun_short: "እሁድ", day_mon_short: "ሰኞ", day_tue_short: "ማክሰ", day_wed_short: "ረቡዕ", day_thu_short: "ሐሙስ", day_fri_short: "አርብ", day_sat_short: "ቅዳሜ",
    month_jan: "ጥር", month_feb: "የካቲት", month_mar: "መጋቢት", month_apr: "ሚያዝያ", month_may: "ግንቦት", month_jun: "ሰኔ", month_jul: "ሐምሌ", month_aug: "ነሐሴ", month_sep: "መስከረም", month_oct: "ጥቅምት", month_nov: "ኅዳር", month_dec: "ታኅሣሥ",
  },
};

export const getTranslator = (language: Language) => (key: TranslationKey, defaultText?: string): string => {
  let text: string | undefined = translations[language]?.[key];

  if (text === undefined) { // Not found in current language
    text = translations.en?.[key]; // Try English
  }

  if (text === undefined) { // Not found in English either
    if (defaultText !== undefined) {
      text = defaultText; // Use provided default
    } else {
      // Fallback to key itself if no translation and no default
      console.warn(`Translation key '${String(key)}' not found for language '${language}' and no default text provided.`);
      text = String(key); 
    }
  }
  return text as string; 
};
