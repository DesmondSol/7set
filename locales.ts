
import { Page, SubPage, CanvasSection, ResearchSection, Language } from './types';

// Define a more comprehensive type for translation keys
export type TranslationKey =
  | Page
  | SubPage
  | CanvasSection 
  | ResearchSection // Added ResearchSection here
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
  | 'mra_report_notes_label' // Generic notes label
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
  | 'lang_am_short';

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
    lang_english: "English", // Full name for dropdown list item
    lang_amharic: "Amharic", // Full name for dropdown list item
    lang_en_short: "EN", // Short name for display
    lang_am_short: "አማ", // Short name for display (Amharic for AM)

    // PDF Export translations
    exported_on_label: "Exported on",
    page_x_of_y: "Page {currentPage} of {totalPages}", // Use placeholders for dynamic values
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

    // User Profile
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
    pdf_made_by_title: "Prepared by"
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
    mra_general_notes_placeholder: "አጠቃላይ የምርምር ማስታወሻዎችን ያስገቡ፣ የጅምላ ውሂብ ይለጥፉ፣ ወይም የገባውን ይዘት እዚህ ያጠቃልሉ...",
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
    lang_english: "English", // Full name for dropdown list item
    lang_amharic: "አማርኛ", // Full name for dropdown list item
    lang_en_short: "EN", // Short name for display
    lang_am_short: "አማ", // Short name for display

    // PDF Export translations (Amharic placeholders)
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

    // User Profile
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
    pdf_made_by_title: "የተዘጋጀው በ"
  }
};

// Helper function for translations
export const getTranslator = (language: Language) => (key: TranslationKey, defaultText?: string): string => {
  let text = translations[language]?.[key] || translations.en?.[key];
  if (!text && defaultText) text = defaultText;
  if (!text) text = String(key); // Fallback to key itself if no translation found

  // Handle placeholders like {currentPage} and {totalPages} for page_x_of_y
  if (key === 'page_x_of_y' && typeof text === 'string') {
      // Allow dynamic replacement if needed, but the current structure doesn't pass these values here.
      // The calling code in PDF generation will handle replacement.
  }
  return text;
};
