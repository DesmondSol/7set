import React, { useState, useEffect } from 'react';
import {
  CopywritingData,
  Pitch,
  PitchType,
  Language,
  UserProfile,
  CanvasData,
  MarketResearchData,
  CanvasSection,
  TranslationKey
} from '../../types';
import { Button } from '../common/Button';
import { PitchModal } from './PitchModal';
import { AiPitchModal } from './AiPitchModal';
import { generatePitchContent } from '../../services/geminiService';
import { GENERIC_ERROR_MESSAGE } from '../../constants';
import { addUserProfileHeader, addPageFooter, addTextWithPageBreaks, MARGIN_MM, LINE_HEIGHT_NORMAL, TITLE_FONT_SIZE, LINE_HEIGHT_TITLE, SECTION_TITLE_FONT_SIZE, LINE_HEIGHT_SECTION_TITLE } from '../../utils/pdfUtils';


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
  setOpenAiModalFlag,
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
    if (editingPitch && pitchToSave.id) { // Editing existing pitch
      updatedPitches = copywritingData.pitches.map(p => p.id === pitchToSave.id ? pitchToSave : p);
    } else { // Adding new pitch
      updatedPitches = [...copywritingData.pitches, { ...pitchToSave, id: `pitch-${Date.now()}` }];
    }
    onUpdateData({ ...copywritingData, pitches: updatedPitches });
    setIsPitchModalOpen(false);
    setEditingPitch(null);
  };

  const handleDeletePitch = (pitchId: string) => {
    if (window.confirm(t('delete_button') + ` "${copywritingData.pitches.find(p => p.id === pitchId)?.title || 'pitch'}"?`)) {
      const updatedPitches = copywritingData.pitches.filter(p => p.id !== pitchId);
      onUpdateData({ ...copywritingData, pitches: updatedPitches });
    }
  };

  const handleAiGeneratePitch = async (inputs: { pitchType: PitchType; targetAudience: string; keyMessage: string; numEmails?: number }) => {
    if (!strategyData || Object.keys(strategyData).filter(k => strategyData[k as CanvasSection]?.trim()).length === 0) {
      setError(t('mra_questions_ai_requires_canvas_note')); // Re-use relevant error message
      return;
    }
    setIsLoadingAi(true);
    setError(null);
    try {
      const generatedContent = await generatePitchContent(strategyData, researchData, inputs, language);
      if (generatedContent && generatedContent.title && generatedContent.content) {
        const newPitch: Pitch = {
          id: `pitch-ai-${Date.now()}`,
          type: inputs.pitchType,
          title: generatedContent.title,
          targetAudience: inputs.targetAudience,
          keyMessage: inputs.keyMessage,
          content: generatedContent.content,
          notes: language === 'am' ? 'በ AI የተፈጠረ ረቂቅ' : 'Draft generated by AI',
        };
        onUpdateData({ ...copywritingData, pitches: [...copywritingData.pitches, newPitch] });
        setOpenAiModalFlag(false);
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

  const handleExportPitches = async () => {
    const { default: jsPDF } = await import('jspdf'); // Dynamic import
    const doc = new jsPDF();
    const yRef = { value: MARGIN_MM };
    const totalPagesRef = { current: doc.getNumberOfPages() };

    addUserProfileHeader(doc, userProfile, yRef, totalPagesRef, t);

    doc.setFontSize(TITLE_FONT_SIZE);
    doc.setFont("helvetica", "bold");
    addTextWithPageBreaks(doc, t('pdf_pitches_title'), MARGIN_MM, yRef, {}, LINE_HEIGHT_TITLE, totalPagesRef, t);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const exportDateText = `${t('exported_on_label')}: ${new Date().toLocaleString(language === 'am' ? 'am-ET' : 'en-US')}`;
    addTextWithPageBreaks(doc, exportDateText, MARGIN_MM, yRef, {}, LINE_HEIGHT_NORMAL, totalPagesRef, t);
    yRef.value += LINE_HEIGHT_NORMAL;

    copywritingData.pitches.forEach((pitch, index) => {
      if (index > 0) yRef.value += LINE_HEIGHT_NORMAL;

      doc.setFontSize(SECTION_TITLE_FONT_SIZE - 2);
      doc.setFont("helvetica", "bold");
      addTextWithPageBreaks(doc, `${t('pdf_pitch_title')}: ${pitch.title}`, MARGIN_MM, yRef, {}, LINE_HEIGHT_SECTION_TITLE, totalPagesRef, t);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      addTextWithPageBreaks(doc, `${t('pdf_pitch_type_label')}: ${t(pitch.type as TranslationKey, pitch.type)}`, MARGIN_MM + 2, yRef, {}, LINE_HEIGHT_NORMAL, totalPagesRef, t);
      addTextWithPageBreaks(doc, `${t('pdf_target_audience_label')}: ${pitch.targetAudience}`, MARGIN_MM + 2, yRef, {}, LINE_HEIGHT_NORMAL, totalPagesRef, t);
      addTextWithPageBreaks(doc, `${t('pdf_key_message_label')}: ${pitch.keyMessage}`, MARGIN_MM + 2, yRef, {}, LINE_HEIGHT_NORMAL, totalPagesRef, t);

      yRef.value += LINE_HEIGHT_NORMAL / 2;
      addTextWithPageBreaks(doc, pitch.content, MARGIN_MM + 2, yRef, {}, LINE_HEIGHT_NORMAL, totalPagesRef, t);

      if (pitch.notes) {
        yRef.value += LINE_HEIGHT_NORMAL / 2;
        addTextWithPageBreaks(doc, `${t('marketing_post_notes_label')}: ${pitch.notes}`, MARGIN_MM + 2, yRef, {}, LINE_HEIGHT_NORMAL, totalPagesRef, t);
      }
    });

    addPageFooter(doc, totalPagesRef.current, totalPagesRef.current, t);

    doc.save(`${t('pdf_pitches_title', 'pitches_and_campaigns').toLowerCase().replace(/\s/g, '_')}.pdf`);
  };


  return (
    <div className="space-y-8">
      <div className="p-6 bg-slate-800 rounded-xl shadow-xl border border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-xl font-semibold text-blue-400">{t('copywriting_pitch_refinement_title')}</h3>
          <div className="flex space-x-3">
            <Button onClick={() => handleOpenPitchModal(null)} leftIcon={<PlusIcon className="h-5 w-5" />} variant="secondary">
              {t('pitch_add_button')}
            </Button>
            <Button onClick={handleExportPitches} leftIcon={<DownloadIcon className="h-5 w-5" />} variant="outline">
              {t('export_pitches_button')}
            </Button>
          </div>
        </div>

        {error && <p className="text-red-400 bg-red-900/30 p-3 rounded-lg mb-4 text-sm">{error}</p>}

        {copywritingData.pitches.length === 0 ? (
          <p className="text-slate-500 italic text-center py-6">{t('pitch_no_pitches_placeholder')}</p>
        ) : (
          <div className="space-y-4">
            {copywritingData.pitches.map(pitch => (
              <div key={pitch.id} className="p-4 bg-slate-700/50 rounded-lg shadow-md border border-slate-600 hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                  <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-slate-100">{pitch.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 mb-1">
                      <span className="font-medium">{t('pitch_type_label')}</span> {t(pitch.type as TranslationKey, pitch.type)} |
                      <span className="font-medium ml-2">{t('pitch_target_audience_label')}</span> {pitch.targetAudience}
                    </p>
                    <p className="text-sm text-slate-300 line-clamp-2">{pitch.content}</p>
                  </div>
                  <div className="flex-shrink-0 flex sm:flex-col items-end sm:items-center gap-2 pt-2 sm:pt-0">
                    <Button variant="outline" size="sm" onClick={() => handleOpenPitchModal(pitch)}>
                      {t('view_details_button')}
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeletePitch(pitch.id)}>
                      {t('delete_button')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isPitchModalOpen && (
        <PitchModal
          isOpen={isPitchModalOpen}
          onClose={() => { setIsPitchModalOpen(false); setEditingPitch(null); }}
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
const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);