
import React, { useState, useEffect } from 'react';
import { 
    CopywritingData, 
    Pitch,
    PitchType,
    Language, 
    UserProfile, 
    CanvasData, 
    MarketResearchData,
    CanvasSection // Added import
} from '../../types';
import { TranslationKey } from '../../locales';
import { Button } from '../common/Button';
import { PitchModal } from './PitchModal';
import { AiPitchModal } from './AiPitchModal';
import { generatePitchContent } from '../../services/geminiService';
import { GENERIC_ERROR_MESSAGE } from '../../constants';

interface PitchRefinerProps {
  copywritingData: CopywritingData;
  onUpdateData: (data: CopywritingData) => void;
  strategyData: Partial<CanvasData>;
  researchData: MarketResearchData;
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
  userProfile: UserProfile | null;
  openAiModalFlag: boolean;
  setOpenAiModalFlag: (isOpen: boolean) => void;
}

export const PitchRefiner: React.FC<PitchRefinerProps> = ({
  copywritingData,
  onUpdateData,
  strategyData,
  researchData,
  language,
  t,
  userProfile,
  openAiModalFlag,
  setOpenAiModalFlag
}) => {
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [editingPitch, setEditingPitch] = useState<Pitch | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenPitchModal = (pitch: Pitch | null = null) => {
    setEditingPitch(pitch);
    setIsPitchModalOpen(true);
  };

  const handleSavePitch = (pitchToSave: Pitch) => {
    let updatedPitches: Pitch[];
    if (editingPitch && pitchToSave.id) { // Check if editingPitch and its id exist
      updatedPitches = copywritingData.pitches.map(p => p.id === pitchToSave.id ? pitchToSave : p);
    } else {
      updatedPitches = [...copywritingData.pitches, { ...pitchToSave, id: `pitch-${Date.now()}` }];
    }
    onUpdateData({ ...copywritingData, pitches: updatedPitches });
    setIsPitchModalOpen(false);
    setEditingPitch(null);
  };

  const handleDeletePitch = (pitchId: string) => {
    if (window.confirm(t('delete_button') + ` "${copywritingData.pitches.find(p=>p.id === pitchId)?.title || 'pitch'}"?`)) {
        const updatedPitches = copywritingData.pitches.filter(p => p.id !== pitchId);
        onUpdateData({ ...copywritingData, pitches: updatedPitches });
    }
  };

  const handleAiGeneratePitch = async (inputs: { pitchType: PitchType; targetAudience: string; keyMessage: string; numEmails?: number }) => {
    if (!strategyData || Object.keys(strategyData).filter(k => strategyData[k as CanvasSection]?.trim()).length === 0) {
        setError(t('mra_questions_ai_requires_canvas_note')); // Re-use translation or add specific one
        return;
    }
    setIsLoadingAi(true);
    setError(null);
    try {
      const generatedContent = await generatePitchContent(strategyData, researchData, inputs, language);
      if (generatedContent && generatedContent.title && generatedContent.content) {
        const newPitch: Pitch = {
          id: `ai-pitch-${Date.now()}`,
          type: inputs.pitchType,
          title: generatedContent.title,
          targetAudience: inputs.targetAudience,
          keyMessage: inputs.keyMessage,
          content: generatedContent.content, // This might be a JSON string for email campaigns
        };
        onUpdateData({ ...copywritingData, pitches: [...copywritingData.pitches, newPitch] });
        setOpenAiModalFlag(false); // Close AI modal
      } else {
        setError(t('error_ai_failed_generic', "AI could not generate pitch content."));
      }
    } catch (e) {
      console.error(e);
      setError(t('error_ai_failed_generic'));
    } finally {
      setIsLoadingAi(false);
    }
  };

  const getPitchTypeName = (type: PitchType): string => {
    if (type === 'investor_pitch') return t('pitch_type_investor');
    if (type === 'sales_pitch') return t('pitch_type_sales');
    if (type === 'email_campaign') return t('pitch_type_email_campaign');
    return type;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold text-blue-700">{t('copywriting_pitch_refinement_title')}</h3>
         <div className="flex space-x-2">
            {/* Redundant AI button removed. AI is triggered by FAB on CopywritingPage */}
            <Button onClick={() => handleOpenPitchModal(null)} leftIcon={<PlusIcon className="h-5 w-5"/>}>
                {t('pitch_add_button')}
            </Button>
        </div>
      </div>
      
      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}

      {copywritingData.pitches.length === 0 ? (
        <p className="text-gray-500 italic text-center py-8">{t('pitch_no_pitches_placeholder')}</p>
      ) : (
        <div className="space-y-4">
          {copywritingData.pitches.map(pitch => (
            <div key={pitch.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-red-700">{pitch.title}</h4>
                  <p className="text-xs text-gray-500 mb-1">
                    {t('pitch_type_label')}: {getPitchTypeName(pitch.type)} | {t('pitch_target_audience_label')}: {pitch.targetAudience}
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap line-clamp-3">{pitch.content}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-1 mt-2 sm:mt-0 flex-shrink-0">
                  <Button size="sm" variant="outline" onClick={() => handleOpenPitchModal(pitch)} className="text-xs">{t('edit_button')}</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDeletePitch(pitch.id)} className="text-xs"><TrashIcon className="h-4 w-4"/></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isPitchModalOpen && (
        <PitchModal
          isOpen={isPitchModalOpen}
          onClose={() => { setIsPitchModalOpen(false); setEditingPitch(null);}}
          onSave={handleSavePitch}
          pitchData={editingPitch}
          language={language}
          t={t}
        />
      )}

      {openAiModalFlag && (
        <AiPitchModal
          isOpen={openAiModalFlag}
          onClose={() => setOpenAiModalFlag(false)}
          onGenerate={handleAiGeneratePitch}
          isLoading={isLoadingAi}
          language={language}
          t={t}
        />
      )}
    </div>
  );
};

// --- SVG Icons ---
const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);
const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 7.5l.813 2.846a4.5 4.5 0 01-3.09 3.09L12.187 15l-2.846.813a4.5 4.5 0 01-3.09-3.09L5.437 10.5l2.846-.813a4.5 4.5 0 013.09-3.09L12 3.75l.813 2.846a4.5 4.5 0 013.09 3.09L18.75 9l-2.846.813a4.5 4.5 0 01-3.09-3.09L12.187 6 12 5.25l.187.75z" />
  </svg>
);
const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25-.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
  </svg>
);
