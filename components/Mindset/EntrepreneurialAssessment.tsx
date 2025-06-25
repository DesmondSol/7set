
import React, { useState } from 'react';
import { MindsetData, Language } from '../../types';
import { TranslationKey } from '../../types';
import { Button } from '../common/Button';
// Import AssessmentModal once created
// import AssessmentModal from './AssessmentModal'; 

interface EntrepreneurialAssessmentProps {
  mindsetData: MindsetData;
  onUpdateMindsetData: (data: MindsetData) => void;
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
}

const EntrepreneurialAssessment: React.FC<EntrepreneurialAssessmentProps> = ({ mindsetData, onUpdateMindsetData, language, t }) => {
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [currentAssessmentType, setCurrentAssessmentType] = useState<'personality' | 'business_acumen' | 'startup_knowledge' | null>(null);

  const openAssessment = (type: 'personality' | 'business_acumen' | 'startup_knowledge') => {
    setCurrentAssessmentType(type);
    setIsAssessmentModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6 bg-slate-800 rounded-xl shadow-xl border border-slate-700">
      <h3 className="text-2xl font-semibold text-blue-400 mb-6">{t('mindset_assessment_title')}</h3>
      <p className="text-slate-300 mb-8">{t('mindset_assessment_start_prompt')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full py-4"
          onClick={() => openAssessment('personality')}
        >
          {t('mindset_assessment_personality_button')} 
          {mindsetData.assessmentStatus.personality === 'completed' && <CheckIcon className="ml-2 h-5 w-5 text-green-400" />}
        </Button>
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full py-4"
          onClick={() => openAssessment('business_acumen')}
        >
          {t('mindset_assessment_acumen_button')}
          {mindsetData.assessmentStatus.businessAcumen === 'completed' && <CheckIcon className="ml-2 h-5 w-5 text-green-400" />}
        </Button>
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full py-4"
          onClick={() => openAssessment('startup_knowledge')}
        >
          {t('mindset_assessment_knowledge_button')}
          {mindsetData.assessmentStatus.startupKnowledge === 'completed' && <CheckIcon className="ml-2 h-5 w-5 text-green-400" />}
        </Button>
      </div>

      {/* 
      {isAssessmentModalOpen && currentAssessmentType && (
        <AssessmentModal
          isOpen={isAssessmentModalOpen}
          onClose={() => setIsAssessmentModalOpen(false)}
          assessmentType={currentAssessmentType}
          mindsetData={mindsetData}
          onUpdateMindsetData={onUpdateMindsetData}
          language={language}
          t={t}
        />
      )}
      */}
      <p className="text-center mt-8 text-slate-400 text-sm"> {/* Placeholder for Assessment Modal */}
        (Assessment Modal for {currentAssessmentType || "none selected"} will open here when implemented)
      </p>
    </div>
  );
};

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
);


export default EntrepreneurialAssessment;
