
import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { MindsetData, Language, AssessmentQuestion, AssessmentCategory } from '../../types';
import { TranslationKey } from '../../types';
// import { getAssessmentQuestions } from '../../services/geminiService'; // Or from constants

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentType: AssessmentCategory;
  mindsetData: MindsetData;
  onUpdateMindsetData: (data: MindsetData) => void;
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
}

// Placeholder questions - these would ideally come from a service or constants.ts
const ALL_QUESTIONS_TEMP: AssessmentQuestion[] = [
    // Personality
    { id: 'p1', textKey: 'q_personality_1_text', type: 'multiple-choice-scale', scaleMin: 1, scaleMax: 5, category: 'personality' },
    // ... add 9 more for personality
    // Business Acumen
    { id: 'b1', textKey: 'q_acumen_1_text', type: 'multiple-choice-options', optionsKey: 'q_acumen_1_options_key', category: 'business_acumen' },
    // ... add 9 more for acumen
    // Startup Knowledge
    { id: 's1', textKey: 'q_knowledge_1_text', type: 'scenario-options', optionsKey: 'q_knowledge_1_options_key', category: 'startup_knowledge' },
    // ... add 9 more for knowledge
];


const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  assessmentType,
  mindsetData,
  onUpdateMindsetData,
  language,
  t,
}) => {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});

  useEffect(() => {
    if (isOpen) {
      // const fetchedQuestions = getAssessmentQuestions(assessmentType); // Replace with actual fetch/get
      const fetchedQuestions = ALL_QUESTIONS_TEMP.filter(q => q.category === assessmentType).slice(0,10); // Temp: slice to 10
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setAnswers(mindsetData.assessmentAnswers[assessmentType] || {});
    }
  }, [isOpen, assessmentType, mindsetData.assessmentAnswers]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswerChange = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const updatedAnswers = { ...mindsetData.assessmentAnswers, [assessmentType]: answers };
    const updatedStatus = { ...mindsetData.assessmentStatus, [assessmentType]: 'completed' as const };
    onUpdateMindsetData({ ...mindsetData, assessmentAnswers: updatedAnswers, assessmentStatus: updatedStatus });
    onClose();
  };
  
  const progressPercent = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  let modalTitleKey: TranslationKey = 'mindset_assessment_modal_title_personality';
  if (assessmentType === 'business_acumen') modalTitleKey = 'mindset_assessment_modal_title_acumen';
  if (assessmentType === 'startup_knowledge') modalTitleKey = 'mindset_assessment_modal_title_knowledge';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t(modalTitleKey)} size="xl">
      {totalQuestions === 0 ? <p>{t('coming_soon_message')}</p> : (
        <div className="space-y-6">
          {/* Progress Bar and Counter */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-slate-300 mb-1">
              <span>{t('mindset_assessment_progress_label')}</span>
              <span>
                {t('mindset_assessment_question_count_label', `Question ${currentQuestionIndex + 1} of ${totalQuestions}`)
                    .replace('{current}', (currentQuestionIndex + 1).toString())
                    .replace('{total}', totalQuestions.toString())}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
            </div>
             <p className="text-xs text-slate-400 mt-1 text-right">
                {t('mindset_assessment_questions_remaining_label', `${totalQuestions - (currentQuestionIndex + 1)} questions remaining`)
                    .replace('{remaining}', (totalQuestions - (currentQuestionIndex + 1)).toString())}
            </p>
          </div>

          {/* Question Area */}
          {currentQuestion && (
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <p className="text-lg font-medium text-slate-100 mb-4">{t(currentQuestion.textKey)}</p>
              {/* Render options based on currentQuestion.type */}
              {/* This part needs to be fleshed out with actual option rendering logic */}
              <div className="text-slate-400">(Options rendering to be implemented here based on question type)</div>
              {currentQuestion.type === 'multiple-choice-scale' && currentQuestion.scaleMin && currentQuestion.scaleMax && (
                  <div className="flex justify-between mt-2">
                      {Array.from({ length: (currentQuestion.scaleMax - currentQuestion.scaleMin + 1) }, (_, i) => currentQuestion.scaleMin! + i).map(val => (
                          <label key={val} className="flex flex-col items-center space-x-2 text-slate-300 cursor-pointer">
                               <input 
                                  type="radio" 
                                  name={currentQuestion.id} 
                                  value={val}
                                  checked={answers[currentQuestion.id] === val}
                                  onChange={() => handleAnswerChange(currentQuestion.id, val)}
                                  className="form-radio h-5 w-5 text-blue-500 bg-slate-600 border-slate-500 focus:ring-blue-500"
                                />
                               <span className="text-xs mt-1">{val}</span>
                          </label>
                      ))}
                  </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-700">
            <Button onClick={handlePrev} disabled={currentQuestionIndex === 0} variant="outline">
              {t('mindset_assessment_prev_button')}
            </Button>
            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button onClick={handleNext} variant="primary">
                {t('mindset_assessment_next_button')}
              </Button>
            ) : (
              <Button onClick={handleSubmit} variant="primary" className="bg-green-600 hover:bg-green-500">
                {t('mindset_assessment_submit_button')}
              </Button>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AssessmentModal;
