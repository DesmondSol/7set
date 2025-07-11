// Define the TranslationKey type directly in types.ts
// This includes all string literals and enums previously defined in locales.ts for this type.
export type TranslationKey =
  | Page
  | SubPage
  | CanvasSection 
  | ResearchSection 
  | CopywritingSubSection 
  | MindsetSubSection
  | ProductDesignSubSection
  | EconomicsSubSection
  | SalesSubSection
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
  | 'save_and_close_button'
  | 'delete_button'
  | 'cancel_button'
  | 'confirm_button'
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
  | 'infographic_title' | 'infographic_subtitle' | 'infographic_blueprint_title' | 'infographic_blueprint_desc'
  | 'infographic_stage1_name' | 'infographic_stage1_desc' | 'infographic_stage2_name' | 'infographic_stage2_desc' | 'infographic_stage3_name' | 'infographic_stage3_desc'
  | 'infographic_deepdive_start_title' | 'infographic_deepdive_start_desc' | 'infographic_chart_start_week1' | 'infographic_chart_start_week2' | 'infographic_chart_start_week3' | 'infographic_chart_start_week4'
  | 'infographic_deepdive_build_title' | 'infographic_deepdive_build_desc' | 'infographic_chart_build_mvp' | 'infographic_chart_build_finance' | 'infographic_chart_build_marketing' | 'infographic_chart_build_legal'
  | 'infographic_deepdive_grow_title' | 'infographic_deepdive_grow_desc' | 'infographic_chart_grow_legal' | 'infographic_chart_grow_finance' | 'infographic_chart_grow_ops' | 'infographic_chart_grow_hr' | 'infographic_chart_grow_negotiation' | 'infographic_chart_grow_kpi'
  | 'infographic_actionled_title' | 'infographic_actionled_desc' | 'infographic_actionled_workshops' | 'infographic_actionled_app' | 'infographic_actionled_projects' | 'infographic_chart_learning_action' | 'infographic_chart_learning_theory' | 'infographic_chart_learning_title'
  | 'infographic_weekly_title' | 'infographic_weekly_desc' | 'infographic_chart_hours_weekday' | 'infographic_chart_hours_weekend' | 'infographic_chart_hours_title'
  | 'infographic_ecosystem_title' | 'infographic_eco_networking_title' | 'infographic_eco_networking_desc' | 'infographic_eco_speakers_title' | 'infographic_eco_speakers_desc' | 'infographic_eco_amas_title' | 'infographic_eco_amas_desc' | 'infographic_eco_gamenights_title' | 'infographic_eco_gamenights_desc'
  | 'infographic_goal_title' | 'infographic_goal_prizes_amount' | 'infographic_goal_prizes_desc' | 'infographic_goal_investment_amount' | 'infographic_goal_investment_desc'
  | 'infographic_footer_copyright' | 'infographic_footer_address' | 'infographic_footer_poweredby'
  | 'infographic_partners_title' | 'infographic_trainers_title' | 'infographic_testimonials_title'
  | 'visit_website_button' | 'partner_modal_title' | 'trainer_modal_title' | 'testimonial_modal_title'
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
  | 'q_p1_text' | 'q_p1_opt_very_uncomfortable' | 'q_p1_opt_uncomfortable' | 'q_p1_opt_neutral' | 'q_p1_opt_comfortable' | 'q_p1_opt_very_comfortable'
  | 'q_p2_text' | 'q_p2_opt_analyze' | 'q_p2_opt_action' | 'q_p2_opt_seek_help' | 'q_p2_opt_wait'
  | 'q_p3_text' | 'q_p3_opt_delegate' | 'q_p3_opt_control' | 'q_p3_opt_collaborate' | 'q_p3_opt_avoid'
  | 'q_p4_text'
  | 'q_p5_text' | 'q_p5_opt_data' | 'q_p5_opt_intuition' | 'q_p5_opt_advice' | 'q_p5_opt_trial_error'
  | 'q_ba1_text' | 'q_ba1_opt_detailed_plan' | 'q_ba1_opt_flexible_approach' | 'q_ba1_opt_customer_feedback' | 'q_ba1_opt_competitor_focus'
  | 'q_ba2_text' | 'q_ba2_opt_revenue_first' | 'q_ba2_opt_profit_first' | 'q_ba2_opt_growth_first' | 'q_ba2_opt_balance'
  | 'q_ba3_text'
  | 'q_ba4_text' | 'q_ba4_opt_organic' | 'q_ba4_opt_paid_ads' | 'q_ba4_opt_partnerships' | 'q_ba4_opt_sales_team'
  | 'q_ba5_text' | 'q_ba5_opt_cut_costs' | 'q_ba5_opt_increase_marketing' | 'q_ba5_opt_pivot_product' | 'q_ba5_opt_seek_funding'
  | 'q_sk1_text' | 'q_sk1_opt_mvp_basic' | 'q_sk1_opt_mvp_polished' | 'q_sk1_opt_mvp_many_features' | 'q_sk1_opt_mvp_no_need'
  | 'q_sk2_text'
  | 'q_sk3_text' | 'q_sk3_opt_bootstrapping' | 'q_sk3_opt_friends_family' | 'q_sk3_opt_angel_investors' | 'q_sk3_opt_venture_capital'
  | 'q_sk4_text' | 'q_sk4_opt_surveys' | 'q_sk4_opt_interviews' | 'q_sk4_opt_presales' | 'q_sk4_opt_analytics'
  | 'q_sk5_text' | 'q_sk5_opt_solo' | 'q_sk5_opt_complementary' | 'q_sk5_opt_similar_skills' | 'q_sk5_opt_friends'
  | 'founder_type_visionary_catalyst_title' | 'founder_type_visionary_catalyst_desc' | 'cofounder_suggestion_operational_excellence' | 'takeaway_focus_on_execution'
  | 'radar_chart_risk_tolerance' | 'radar_chart_leadership' | 'radar_chart_adaptability' | 'radar_chart_market_insight' | 'radar_chart_financial_literacy' | 'radar_chart_strategic_thinking' | 'radar_chart_technical_skills' | 'radar_chart_sales_ability' | 'radar_chart_resilience' | 'radar_chart_creativity'
  | 'goal_promise_cast_on'
  | 'lang_en_short'
  | 'lang_am_short'
  | 'logo_alt_text'
  | 'personas_page_title'
  | 'personas_sidebar_title'
  | 'personas_create_new_button'
  | 'personas_welcome_title'
  | 'personas_welcome_message'
  | 'personas_edit_persona_title'
  | 'persona_name_label' | 'persona_name_placeholder'
  | 'persona_profession_label' | 'persona_profession_placeholder'
  | 'persona_gender_label' | 'persona_gender_male' | 'persona_gender_female' | 'persona_gender_other' | 'persona_gender_select'
  | 'persona_age_label' | 'persona_age_placeholder'
  | 'persona_location_label' | 'persona_location_placeholder'
  | 'persona_marital_status_label' | 'persona_marital_status_single' | 'persona_marital_status_married' | 'persona_marital_status_relationship' | 'persona_marital_status_divorced' | 'persona_marital_status_widowed' | 'persona_marital_status_select'
  | 'persona_education_label' | 'persona_education_high_school' | 'persona_education_bachelors' | 'persona_education_masters' | 'persona_education_phd' | 'persona_education_other' | 'persona_education_select'
  | 'persona_bio_label' | 'persona_bio_placeholder'
  | 'persona_personality_title'
  | 'personality_analytical' | 'personality_creative'
  | 'personality_busy' | 'personality_time_rich'
  | 'personality_messy' | 'personality_organized'
  | 'personality_independent' | 'personality_team_player'
  | 'persona_traits_title'
  | 'traits_buying_authority' | 'traits_technical' | 'traits_social_media' | 'traits_self_helping'
  | 'persona_goals_label' | 'persona_goals_placeholder'
  | 'persona_likes_label' | 'persona_likes_placeholder'
  | 'persona_dislikes_label' | 'persona_dislikes_placeholder'
  | 'persona_frustrations_label' | 'persona_frustrations_placeholder'
  | 'persona_skills_label' | 'persona_skills_placeholder'
  | 'persona_jobs_to_be_done_title'
  | 'jtbd_add_new_button'
  | 'jtbd_edit_button'
  | 'jtbd_no_jobs_placeholder'
  | 'jtbd_modal_title_add' | 'jtbd_modal_title_edit'
  | 'jtbd_title_label' | 'jtbd_title_placeholder'
  | 'jtbd_situation_label' | 'jtbd_situation_prompt' | 'jtbd_situation_placeholder'
  | 'jtbd_motivation_label' | 'jtbd_motivation_prompt' | 'jtbd_motivation_placeholder'
  | 'jtbd_outcome_label' | 'jtbd_outcome_prompt' | 'jtbd_outcome_placeholder'
  | 'jtbd_emotional_job_label' | 'jtbd_emotional_job_prompt' | 'jtbd_emotional_job_placeholder'
  | 'jtbd_social_job_label' | 'jtbd_social_job_prompt' | 'jtbd_social_job_placeholder'
  | 'add_button'
  | 'export_personas_button'
  | 'export_all_personas_button'
  | 'personas_help_button_tooltip'
  | 'personas_ai_generate_button_tooltip'
  | 'ai_persona_modal_title'
  | 'ai_persona_idea_label' | 'ai_persona_idea_placeholder'
  | 'ai_persona_q1_label' | 'ai_persona_q1_placeholder'
  | 'ai_persona_q2_label' | 'ai_persona_q2_placeholder'
  | 'ai_persona_q3_label' | 'ai_persona_q3_placeholder'
  | 'ai_persona_generate_button' | 'ai_persona_generating_button'
  | 'personas_help_modal_title'
  | 'pdf_persona_report_title'
  | 'pdf_persona_demographics_title'
  | 'pdf_persona_bio_title'
  | 'pdf_persona_personality_title'
  | 'pdf_persona_traits_title'
  | 'pdf_persona_goals_title'
  | 'pdf_persona_frustrations_title'
  | 'pdf_persona_jtbd_title'
  | 'personas_help_intro'
  | 'personas_help_name_title' | 'personas_help_name_desc'
  | 'personas_help_demographics_title' | 'personas_help_demographics_desc'
  | 'personas_help_bio_title' | 'personas_help_bio_desc'
  | 'personas_help_personality_title' | 'personas_help_personality_desc'
  | 'personas_help_traits_title' | 'personas_help_traits_desc'
  | 'personas_help_goals_title' | 'personas_help_goals_desc'
  | 'personas_help_frustrations_title' | 'personas_help_frustrations_desc'
  | 'personas_help_jtbd_title' | 'personas_help_jtbd_desc'
  | 'product_design_page_title'
  | 'product_design_sidebar_title'
  | 'brainstorm_board_explanation'
  | 'product_planning_explanation'
  | 'action_board_explanation'
  | 'feedback_aggregator_explanation'
  | 'brainstorm_add_idea_button'
  | 'brainstorm_new_idea_placeholder'
  | 'planning_add_feature_button'
  | 'planning_no_features_placeholder'
  | 'planning_feature_modal_title_add'
  | 'planning_feature_modal_title_edit'
  | 'planning_feature_name_label'
  | 'planning_feature_priority_label'
  | 'planning_version_history_title'
  | 'planning_version_number_label'
  | 'planning_active_version_label'
  | 'planning_version_description_label'
  | 'planning_version_problem_solved_label'
  | 'planning_version_feedback_notes_label'
  | 'planning_version_create_new_button'
  | 'planning_priority_low'
  | 'planning_priority_medium'
  | 'planning_priority_high'
  | 'planning_priority_critical'
  | 'action_board_add_item_button'
  | 'action_board_status_idea'
  | 'action_board_status_design'
  | 'action_board_status_build'
  | 'action_board_status_deploy'
  | 'action_item_modal_title_add'
  | 'action_item_modal_title_edit'
  | 'action_item_title_label'
  | 'action_item_description_label'
  | 'action_item_feature_link_label'
  | 'action_item_no_feature_link_option'
  | 'feedback_aggregator_add_button'
  | 'feedback_aggregator_no_feedback_placeholder'
  | 'feedback_modal_title_add'
  | 'feedback_modal_title_edit'
  | 'feedback_content_label'
  | 'feedback_source_label'
  | 'feedback_urgency_label'
  | 'feedback_feature_link_label'
  | 'feedback_source_app_store'
  | 'feedback_source_survey'
  | 'feedback_source_social_media'
  | 'feedback_source_manual'
  | 'feedback_urgency_low'
  | 'feedback_urgency_medium'
  | 'feedback_urgency_high'
  | 'feedback_filter_by_source'
  | 'feedback_filter_by_urgency'
  | 'feedback_filter_all_sources'
  | 'feedback_filter_all_urgencies'
  | 'product_design_help_button_tooltip'
  | 'product_design_ai_button_tooltip'
  | 'ai_feature_modal_title'
  | 'ai_feature_modal_description'
  | 'ai_feature_generate_button'
  | 'ai_feature_generating_button'
  | 'economics_page_title'
  | 'economics_sidebar_title'
  | 'economics_help_button_tooltip'
  | 'cost_revenue_explanation'
  | 'unit_economics_explanation'
  | 'burn_rate_explanation'
  | 'financial_projection_explanation'
  | 'fp_title'
  | 'fp_subtitle'
  | 'fp_inputs_title'
  | 'fp_results_title'
  | 'fp_starting_capital_label'
  | 'fp_products_services_title'
  | 'fp_add_product_button'
  | 'fp_product_name_label'
  | 'fp_product_price_label'
  | 'fp_product_cost_label'
  | 'fp_product_initial_sales_label'
  | 'fp_remove_product_button_tooltip'
  | 'fp_growth_assumptions_title'
  | 'fp_sales_growth_rate_label'
  | 'fp_other_monthly_revenue_label'
  | 'fp_other_monthly_expenses_label'
  | 'fp_generate_button'
  | 'fp_table_metric_header'
  | 'fp_table_month1_header'
  | 'fp_table_month2_header'
  | 'fp_table_month3_header'
  | 'fp_table_total_header'
  | 'fp_table_revenue'
  | 'fp_table_cogs'
  | 'fp_table_gross_profit'
  | 'fp_table_other_expenses'
  | 'fp_table_net_profit'
  | 'fp_table_ending_balance'
  | 'costs_title'
  | 'revenues_title'
  | 'total_costs'
  | 'total_revenues'
  | 'net_profit'
  | 'net_loss'
  | 'add_cost_button'
  | 'add_revenue_button'
  | 'financial_item_name_label'
  | 'financial_item_amount_label'
  | 'financial_item_category_label'
  | 'financial_item_type_label'
  | 'financial_item_type_one_time'
  | 'financial_item_type_recurring'
  | 'financial_item_date_label'
  | 'financial_item_details_label'
  | 'financial_item_details_placeholder'
  | 'cost_revenue_modal_title_add_cost'
  | 'cost_revenue_modal_title_edit_cost'
  | 'cost_revenue_modal_title_add_revenue'
  | 'cost_revenue_modal_title_edit_revenue'
  | 'ue_title'
  | 'ue_subtitle'
  | 'ue_inputs_title'
  | 'ue_results_title'
  | 'ue_avg_revenue_label'
  | 'ue_avg_revenue_tooltip'
  | 'ue_cogs_label'
  | 'ue_cogs_tooltip'
  | 'ue_cac_label'
  | 'ue_cac_tooltip'
  | 'ue_customer_lifetime_label'
  | 'ue_customer_lifetime_tooltip'
  | 'ue_gross_margin_label'
  | 'ue_gross_margin_result'
  | 'ue_ltv_label'
  | 'ue_ltv_result'
  | 'ue_ltv_cac_ratio_label'
  | 'ue_ltv_cac_ratio_result'
  | 'ue_breakeven_label'
  | 'ue_breakeven_result'
  | 'br_title'
  | 'br_subtitle'
  | 'br_inputs_title'
  | 'br_results_title'
  | 'br_starting_capital_label'
  | 'br_hiring_spend_label'
  | 'br_marketing_spend_label'
  | 'br_base_burn_label'
  | 'br_base_burn_tooltip'
  | 'br_total_burn_label'
  | 'br_total_burn_tooltip'
  | 'br_net_burn_label'
  | 'br_net_burn_tooltip'
  | 'br_runway_label'
  | 'br_runway_tooltip'
  | 'br_runway_infinite'
  | 'br_chart_title'
  | 'br_chart_capital_label'
  | 'br_chart_month_label'
  | 'sales_page_title'
  | 'sales_sidebar_title'
  | 'sales_help_button_tooltip'
  | 'goto_market_explanation'
  | 'crm_pipeline_explanation'
  | 'launch_sequence_builder_title'
  | 'add_phase_button'
  | 'new_phase_default_name'
  | 'add_activity_button'
  | 'new_activity_placeholder'
  | 'activity_status_todo'
  | 'activity_status_in_progress'
  | 'activity_status_done'
  | 'crm_pipeline_title'
  | 'crm_stage_prospects'
  | 'crm_stage_negotiation'
  | 'crm_stage_closed'
  | 'crm_stage_lost'
  | 'crm_add_prospects_button'
  | 'crm_add_prospects_modal_title'
  | 'crm_add_prospects_instructions'
  | 'crm_edit_lead_modal_title'
  | 'crm_qualify_lead_modal_title'
  | 'crm_lead_name_label'
  | 'crm_lead_email_label'
  | 'crm_lead_phone_label'
  | 'crm_lead_details_label'
  | 'crm_needs_analysis_label'
  | 'crm_value_proposition_label'
  | 'crm_comments_label'
  | 'crm_lost_reason_label'
  | 'crm_mark_as_lost_modal_title'
  | 'crm_qualify_button'
  | 'crm_mark_won_button'
  | 'crm_mark_lost_button'
  | 'crm_no_leads_in_stage'
  | StrategySubSection
  | 'strategy_page_title'
  | 'strategy_sidebar_title'
  | 'strategy_help_button_tooltip'
  | 'canvas_explanation'
  | 'personas_explanation'
  | CostCategory
  | RevenueCategory
  ;


// GENERAL
export type Language = 'en' | 'am';

export enum Page {
  START = 'Start',
  BUILD = 'Build',
  GROW = 'Grow',
}

export enum SubPage {
  MINDSET = 'Mindset',
  STRATEGY = 'Strategy',
  // PERSONAS = 'Personas', // No longer a top-level subpage
  RESEARCH = 'Research',
  COPYWRITING = 'Copywriting',
  PRODUCT_DESIGN = 'Product Design',
  ECONOMICS = 'Economics',
  SALES = 'Sales',
  LEARN = 'Learn',
  AI_ADVISOR = 'AI Advisor',
}

export interface NavItem {
  label: Page;
  subItems: SubPage[];
}

// USER PROFILE
export interface UserProfile {
    name: string;
    email?: string;
    phone?: string;
    otherDetails?: string;
    photo?: string | null; // Base64 string for the photo
}

// STRATEGY HUB
export enum StrategySubSection {
  BUSINESS_CANVAS = 'Business Canvas',
  PERSONAS = 'Personas',
}

export interface StrategySectionHelp {
    title: StrategySubSection;
    sidebarTitle: Record<Language, TranslationKey>;
    explanationKey: TranslationKey;
}

// BUSINESS LAUNCH CANVAS (STRATEGY)
export enum CanvasSection {
  PROJECT_OVERVIEW = "Project Overview",
  PRODUCT_VISION = "Product Vision",
  NORTH_STAR_METRIC = "North Star Metric",
  PRODUCT_WHY = "Product Why",
  PROBLEM = "Problem",
  SOLUTION = "Solution",
  PRODUCT_DETAIL = "Product Detail",
  MARKET = "Market",
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

export const ALL_CANVAS_SECTIONS: CanvasSection[] = [
  CanvasSection.PROJECT_OVERVIEW,
  CanvasSection.PRODUCT_VISION,
  CanvasSection.NORTH_STAR_METRIC,
  CanvasSection.PRODUCT_WHY,
  CanvasSection.PROBLEM,
  CanvasSection.SOLUTION,
  CanvasSection.PRODUCT_DETAIL,
  CanvasSection.MARKET,
  CanvasSection.USE_CASES,
  CanvasSection.UNIQUE_VALUE_PROPOSITION,
  CanvasSection.UNFAIR_ADVANTAGE,
  CanvasSection.BUSINESS_MODEL,
  CanvasSection.PRICING,
  CanvasSection.COMPETITORS,
  CanvasSection.UNIT_ECONOMICS,
  CanvasSection.BRAND_STYLE_GUIDES,
  CanvasSection.PRODUCT_MARKET_FIT,
];

export type CanvasData = {
  [key in CanvasSection]: string;
};

export interface CanvasSectionHelp {
    title: CanvasSection;
    explanation: Record<Language, string>;
    example?: Record<Language, string>;
}

// PERSONAS
export interface JobToBeDone {
  id: string;
  title: string;
  situation: string; // WHEN I...
  motivation: string; // I WANT TO...
  outcome: string; // SO I CAN...
  emotionalJob: string; // MAKING ME FEEL...
  socialJob: string; // OTHERS SEE I'M...
}

export interface Personality {
  analyticalCreative: number; // 0-100, 0=Analytical, 100=Creative
  busyTimeRich: number; // 0-100, 0=Busy, 100=Time Rich
  messyOrganized: number; // 0-100, 0=Messy, 100=Organized
  independentTeamPlayer: number; // 0-100, 0=Independent, 100=Team Player
}

export interface Traits {
  buyingAuthority: number; // 0-100
  technical: number; // 0-100
  socialMedia: number; // 0-100
  selfHelping: number; // 0-100
}

export type Gender = 'Male' | 'Female' | 'Other' | '';
export type MaritalStatus = 'Single' | 'Married' | 'In a relationship' | 'Divorced' | 'Widowed' | '';
export type Education = 'High School' | "Bachelor's Degree" | "Master's Degree" | 'PhD' | 'Other' | '';


export interface Persona {
  id: string;
  icon: string; // e.g. an emoji or an identifier for an SVG icon
  name: string;
  profession: string;
  gender: Gender;
  age: number | '';
  location: string;
  maritalStatus: MaritalStatus;
  education: Education;
  bio: string;
  personality: Personality;
  traits: Traits;
  goals: string;
  likes: string;
  dislikes: string;
  frustrations: string; // Frustrations & Pain Points
  skills: string;
  jobsToBeDone: JobToBeDone[];
}

export type PersonasData = Persona[];

// MARKET RESEARCH
export enum ResearchSection {
  QUESTIONS = "Questions & Responses",
  GENERAL_NOTES_IMPORT = "General Notes / Import",
  COMPETITOR_ANALYSIS = "Competitor Analysis",
  TRENDS = "Industry Trends",
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

export type MarketResearchData = {
  [ResearchSection.QUESTIONS]: ResearchQuestionnaireSet[];
  [ResearchSection.GENERAL_NOTES_IMPORT]: string;
  [ResearchSection.COMPETITOR_ANALYSIS]: CompetitorProfile[];
  [ResearchSection.TRENDS]: TrendEntry[];
  [ResearchSection.AI_SUMMARY]: string;
};

export interface ResearchSectionHelp {
    title: ResearchSection;
    sidebarTitle: Record<Language, string>;
    explanation: Record<Language, string>;
}

// COPYWRITING
export enum CopywritingSubSection {
    MARKETING = "Marketing Content & Plans",
    PITCH_REFINEMENT = "Pitch Refinement"
}

export type MarketingPostStatus = 'todo' | 'in-progress' | 'done';

export interface MarketingPost {
    id: string;
    title: string;
    content: string;
    platform: string;
    scheduledDate: string; // ISO format string
    visualRecommendation: string;
    notes: string;
    status: MarketingPostStatus;
}

export type PitchType = 'investor_pitch' | 'sales_pitch' | 'email_campaign';

export interface Pitch {
    id: string;
    type: PitchType;
    title: string;
    targetAudience: string;
    keyMessage: string;
    content: string; // For investor/sales pitch, this is the main text. For email, this could be a JSON string of the email sequence.
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


// MINDSET
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
    category: AssessmentCategory;
    options?: AssessmentQuestionOption[];
    scaleMin?: number;
    scaleMax?: number;
}


export type AssessmentAnswers = {
  [key in AssessmentCategory]?: Record<string, string | number>;
};

export type AssessmentStatus = {
  [key in AssessmentCategory]: 'not-started' | 'completed';
};

export type GoalTimeframe = '6-month' | '2-year' | '5-year' | '10-year';
export interface GoalDetail {
  self: string;
  family: string;
  world: string;
}
export type GoalSettingData = {
  [key in GoalTimeframe]: GoalDetail;
};

export interface AssessmentScores {
    riskTolerance: number; // 0-100
    leadership: number;
    adaptability: number;
    marketInsight: number;
    financialLiteracy: number;
    strategicThinking: number;
    resilience: number;
    creativity: number;
    salesAbility: number;
    technicalSkills: number;
}

export interface FounderProfileReportData {
    founderTypeTitle: string;
    founderTypeDescription: string;
    scores: AssessmentScores;
    cofounderPersonaSuggestion: string;
    keyTakeaways: string[];
    generatedDate: string; // ISO
    language: Language;
}

export interface MindsetData {
  assessmentAnswers: AssessmentAnswers;
  assessmentStatus: AssessmentStatus;
  profileReport: FounderProfileReportData | null;
  goals: GoalSettingData;
  goalsFirstSetDate?: string; // ISO date string
  shouldAutoGenerateReport: boolean;
  goalSettingAiChatHistory: { role: 'user' | 'model'; parts: {text: string}[] }[];
}

export interface MindsetSectionHelp {
    title: MindsetSubSection;
    sidebarTitle: Record<Language, TranslationKey>;
    explanationKey: TranslationKey;
}

// PRODUCT DESIGN
export enum ProductDesignSubSection {
    BRAINSTORM_BOARD = 'Brainstorm Board',
    PRODUCT_PLANNING = 'Product Planning',
    ACTION_BOARD = 'Action Board',
    FEEDBACK_AGGREGATOR = 'Feedback Aggregator',
}

export interface BrainstormIdea {
    id: string;
    content: string;
    color: string;
}

export type FeaturePriority = 'low' | 'medium' | 'high' | 'critical';

export interface FeatureVersion {
  id: string;
  versionNumber: number;
  description: string;
  problemSolved: string;
  feedbackNotes: string; // Simplified from feedback linking for now
  createdAt: string; // ISO Date
}

export interface ProductFeature {
  id: string;
  name: string;
  priority: FeaturePriority;
  versions: FeatureVersion[]; // Last item in the array is the active one
  createdAt: string; // ISO Date
}

export enum ActionBoardStatus {
    IDEA = 'idea',
    DESIGN = 'design',
    BUILD = 'build',
    DEPLOY = 'deploy',
}

export interface ActionItem {
    id: string;
    title: string;
    description: string;
    status: ActionBoardStatus;
    featureId: string | null; // Link to ProductFeature ID, can be null
    createdAt: string; // ISO Date
}

export type FeedbackSource = 'app_store' | 'survey' | 'social_media' | 'manual';
export type FeedbackUrgency = 'low' | 'medium' | 'high';

export interface FeedbackItem {
    id: string;
    content: string;
    source: FeedbackSource;
    urgency: FeedbackUrgency;
    featureId: string | null; // Link to ProductFeature ID
    createdAt: string; // ISO Date
}


export interface ProductDesignData {
    brainstormIdeas: BrainstormIdea[];
    features: ProductFeature[];
    actionItems: ActionItem[];
    feedbackItems: FeedbackItem[];
}

export interface ProductDesignSectionHelp {
    title: ProductDesignSubSection;
    sidebarTitle: Record<Language, TranslationKey>;
    explanationKey: TranslationKey;
}

// ECONOMICS
export enum EconomicsSubSection {
    COST_REVENUE = 'Cost & Revenue',
    UNIT_ECONOMICS = 'EconomicsSection_UnitEconomics',
    BURN_RATE = 'Burn Rate',
    FINANCIAL_PROJECTION = 'Financial Projection Generator',
}

export enum CostCategory {
    OPERATIONAL = 'cost_category_operational',
    MARKETING_SALES = 'cost_category_marketing_sales',
    SALARIES_FEES = 'cost_category_salaries_fees',
    TAXES = 'cost_category_taxes',
    CAPEX = 'cost_category_capex',
    ADMIN_OVERHEADS = 'cost_category_admin_overheads',
}

export enum RevenueCategory {
    PRODUCT_SALES = 'revenue_category_product_sales',
    SERVICE_FEES = 'revenue_category_service_fees',
    SUBSCRIPTION_FEES = 'revenue_category_subscription_fees',
    INVESTMENT = 'revenue_category_investment',
    OTHER = 'revenue_category_other',
}

interface FinancialItem {
    id: string;
    name: string;
    amount: number;
    date: string; // ISO Date string, e.g., "2024-07-30"
    type: 'one_time' | 'recurring';
    details: string;
}

export interface CostItem extends FinancialItem {
    category: CostCategory;
}

export interface RevenueItem extends FinancialItem {
    category: RevenueCategory;
}

export interface UnitEconomicsData {
    avgRevenue: number | '';
    cogs: number | ''; // Cost of Goods Sold
    cac: number | ''; // Customer Acquisition Cost
    customerLifetime: number | ''; // in months
}

export interface BurnRateData {
    startingCapital: number | '';
    additionalHiringSpend: number | '';
    additionalMarketingSpend: number | '';
}

export interface ProjectionProduct {
    id: string;
    name: string;
    price: number | '';
    cost: number | '';
    initialSales: number | '';
}

export interface FinancialProjectionInputs {
    startingCapital: number | '';
    products: ProjectionProduct[];
    salesGrowthRate: number | ''; // as a percentage
    monthlyRevenue: number | ''; // Other recurring revenue
    monthlyExpenses: number | ''; // Other recurring expenses
}

export interface FinancialProjectionResultMonth {
    month: number;
    revenue: number;
    cogs: number;
    grossProfit: number;
    otherExpenses: number;
    netProfit: number;
    endingBalance: number;
}

export interface FinancialProjection {
    inputs: FinancialProjectionInputs;
    result: FinancialProjectionResultMonth[] | null;
}

export interface EconomicsData {
    costs: CostItem[];
    revenues: RevenueItem[];
    unitEconomics: UnitEconomicsData;
    burnRate: BurnRateData;
    financialProjection: FinancialProjection;
}

export interface EconomicsSectionHelp {
    title: EconomicsSubSection;
    sidebarTitle: Record<Language, TranslationKey>;
    explanationKey: TranslationKey;
}

// SALES
export enum SalesSubSection {
    GO_TO_MARKET = 'Go-to-Market Architect',
    CRM_PIPELINE = 'CRM Pipeline',
}

export type ActivityStatus = 'todo' | 'in_progress' | 'done';

export interface Activity {
    id: string;
    name: string;
    status: ActivityStatus;
}

export interface LaunchPhase {
    id: string;
    name: string;
    activities: Activity[];
}

export type CrmStage = 'prospects' | 'negotiation' | 'closed' | 'lost';

export interface CrmLead {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    details?: string;
    stage: CrmStage;
    needsAnalysis?: string;
    valueProposition?: string;
    comments?: string; // For lost reason or general notes
    createdAt: string; // ISO date string
}

export interface SalesData {
    launchSequence: LaunchPhase[];
    crmLeads: CrmLead[];
}

export interface SalesSectionHelp {
    title: SalesSubSection;
    sidebarTitle: Record<Language, TranslationKey>;
    explanationKey: TranslationKey;
}


// INFOGRAPHIC PAGE
export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  website: string;
}

export interface Trainer {
  id: string;
  name: string;
  photoUrl: string;
  specialty: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorTitle: string;
  photoUrl: string;
  quote: string;
}