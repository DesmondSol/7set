
import React, { useState } from 'react';
import { MindsetData, Language, GoalTimeframe, GoalDetail } from '../../types';
import { TranslationKey } from '../../types';
import { Button } from '../common/Button';
import { FloatingActionButton } from '../common/FloatingActionButton';
// import AiCoachModal from './AiCoachModal'; // Uncomment when ready

interface GoalSettingProps {
  mindsetData: MindsetData;
  onUpdateMindsetData: (data: MindsetData) => void;
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
}

const GoalCard: React.FC<{
  timeframe: GoalTimeframe;
  titleKey: TranslationKey;
  goals: GoalDetail;
  onGoalChange: (timeframe: GoalTimeframe, field: keyof GoalDetail, value: string) => void;
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
}> = ({ timeframe, titleKey, goals, onGoalChange, language, t }) => {
  
  const currentGoals = goals; // Directly use the passed goals for the specific timeframe

  return (
    <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
      <h4 className="text-xl font-semibold text-blue-400 mb-4">{t(titleKey)}</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">{t('mindset_goal_setting_self_label')}</label>
          <textarea 
            value={currentGoals.self}
            onChange={(e) => onGoalChange(timeframe, 'self', e.target.value)}
            rows={3}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('mindset_goal_setting_self_placeholder')} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">{t('mindset_goal_setting_family_label')}</label>
          <textarea 
            value={currentGoals.family}
            onChange={(e) => onGoalChange(timeframe, 'family', e.target.value)}
            rows={3}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('mindset_goal_setting_family_placeholder')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">{t('mindset_goal_setting_world_label')}</label>
          <textarea 
            value={currentGoals.world}
            onChange={(e) => onGoalChange(timeframe, 'world', e.target.value)}
            rows={3}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('mindset_goal_setting_world_placeholder')}
          />
        </div>
      </div>
    </div>
  );
};


const GoalSetting: React.FC<GoalSettingProps> = ({ mindsetData, onUpdateMindsetData, language, t }) => {
  const [isAiCoachModalOpen, setIsAiCoachModalOpen] = useState(false);

  const handleGoalChange = (timeframe: GoalTimeframe, field: keyof GoalDetail, value: string) => {
    onUpdateMindsetData({
      ...mindsetData,
      goals: {
        ...mindsetData.goals,
        [timeframe]: {
          ...mindsetData.goals[timeframe],
          [field]: value,
        }
      }
    });
  };

  const goalTimeframes: { timeframe: GoalTimeframe, titleKey: TranslationKey }[] = [
    { timeframe: '6-month', titleKey: 'mindset_goal_setting_6_month_title' },
    { timeframe: '2-year', titleKey: 'mindset_goal_setting_2_year_title' },
    { timeframe: '5-year', titleKey: 'mindset_goal_setting_5_year_title' },
    { timeframe: '10-year', titleKey: 'mindset_goal_setting_10_year_title' },
  ];

  return (
    <div className="relative">
      <h3 className="text-2xl font-semibold text-blue-400 mb-6 p-1">{t('mindset_goal_setting_title')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goalTimeframes.map(item => (
          <GoalCard
            key={item.timeframe}
            timeframe={item.timeframe}
            titleKey={item.titleKey}
            goals={mindsetData.goals[item.timeframe]}
            onGoalChange={handleGoalChange}
            language={language}
            t={t}
          />
        ))}
      </div>
      
      <FloatingActionButton
        icon={<SparklesIcon className="h-6 w-6" />}
        tooltip={t('mindset_goal_setting_ai_coach_button_tooltip')}
        onClick={() => setIsAiCoachModalOpen(true)}
        className="bottom-0 right-0 md:bottom-[-2rem] md:right-[-0.5rem]" // Adjust position relative to this component's container
        colorClass="bg-green-600 hover:bg-green-500" // Different color for AI coach
        size="md"
      />

      {/* 
      {isAiCoachModalOpen && (
        <AiCoachModal
          isOpen={isAiCoachModalOpen}
          onClose={() => setIsAiCoachModalOpen(false)}
          mindsetData={mindsetData}
          onUpdateMindsetData={onUpdateMindsetData}
          language={language}
          t={t}
        />
      )} 
      */}
       <p className="text-center mt-8 text-slate-400 text-sm"> {/* Placeholder for AI Coach Modal */}
        (AI Coach Modal will open here when implemented)
      </p>
    </div>
  );
};

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 7.5l.813 2.846a4.5 4.5 0 01-3.09 3.09L12.187 15l-2.846.813a4.5 4.5 0 01-3.09-3.09L5.437 10.5l2.846-.813a4.5 4.5 0 013.09-3.09L12 3.75l.813 2.846a4.5 4.5 0 013.09 3.09L18.75 9l-2.846.813a4.5 4.5 0 01-3.09-3.09L12.187 6 12 5.25l.187.75z" />
  </svg>
);

export default GoalSetting;
