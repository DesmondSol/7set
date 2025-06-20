
import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import jsPDF from 'jspdf';
import { 
    MarketResearchData, 
    ResearchSection, 
    ResearchQuestionItem, 
    ResearchSectionHelp,
    CompetitorProfile,
    TrendEntry,
    CanvasData,
    CanvasSection, 
    ResearchQuestionnaireSet,
    Language,
    UserProfile
} from '../../types';
import { RESEARCH_SECTIONS_HELP, GENERIC_ERROR_MESSAGE } from '../../constants';
import { generateMarketResearchQuestions, generateMarketResearchSummary } from '../../services/geminiService';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { FloatingActionButton } from '../common/FloatingActionButton';
import { TranslationKey } from '../../locales';

// PDF Export Helper Constants
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN_MM = 15;
const CONTENT_WIDTH_MM = A4_WIDTH_MM - 2 * MARGIN_MM;
const LINE_HEIGHT_NORMAL = 7; 
const LINE_HEIGHT_TITLE = 9; 
const LINE_HEIGHT_SECTION_TITLE = 8; 

const TITLE_FONT_SIZE = 18;
const SECTION_TITLE_FONT_SIZE = 14;
const TEXT_FONT_SIZE = 10;
const FOOTER_FONT_SIZE = 8;
const USER_PHOTO_SIZE_MM = 25;

interface ResearchQuestionCardProps {
  item: ResearchQuestionItem;
  questionSetId: string;
  onUpdateQuestionText: (questionSetId: string, questionId: string, text: string) => void;
  onRemoveQuestion: (questionSetId: string, questionId: string) => void;
  onAddResponse: (questionSetId: string, questionId: string, responseText: string) => void;
  onRemoveResponse: (questionSetId: string, questionId: string, responseId: string) => void;
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
}

const ResearchQuestionCard: React.FC<ResearchQuestionCardProps> = ({ 
    item, questionSetId, onUpdateQuestionText, onRemoveQuestion, onAddResponse, onRemoveResponse, language, t 
}) => {
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const [newResponse, setNewResponse] = useState('');

  useEffect(() => {
    setEditText(item.text);
  }, [item.text]);

  const handleSaveQuestion = () => {
    onUpdateQuestionText(questionSetId, item.id, editText);
    setIsEditingQuestion(false);
  };

  const handleAddResponse = () => {
    if (newResponse.trim()) {
      onAddResponse(questionSetId, item.id, newResponse.trim());
      setNewResponse('');
    }
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg shadow mb-4">
      <div className="flex justify-between items-start mb-2">
        {isEditingQuestion ? (
          <div className="flex-grow mr-2">
            <textarea 
              value={editText} 
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 border border-blue-300 rounded-md text-sm"
              rows={2}
            />
            <Button size="sm" onClick={handleSaveQuestion} className="mt-1 mr-1">{t('save_button', 'Save Q')}</Button>
            <Button size="sm" variant="outline" onClick={() => {setIsEditingQuestion(false); setEditText(item.text);}} className="mt-1">{t('cancel_button')}</Button>
          </div>
        ) : (
          <p className="text-gray-800 font-medium flex-grow mr-2 text-sm whitespace-pre-wrap">{item.text}</p>
        )}
        <div className="flex-shrink-0 flex items-center space-x-1">
          {!isEditingQuestion && <Button variant="outline" size="sm" onClick={() => setIsEditingQuestion(true)} className="p-1"><PencilIcon className="h-4 w-4"/></Button>}
          <Button variant="danger" size="sm" onClick={() => onRemoveQuestion(questionSetId, item.id)} className="p-1"><TrashIcon className="h-4 w-4"/></Button>
        </div>
      </div>
      
      <div className="ml-4 mt-2">
        <h4 className="text-xs font-semibold text-gray-600 mb-1">{language === 'am' ? 'የግል ምላሾች፡' : 'Individual Responses:'}</h4>
        {item.responses.length > 0 ? (
          item.responses.map((resp) => ( 
            <div key={resp.id} className="text-xs text-gray-700 bg-white p-1.5 rounded shadow-sm mb-1 flex justify-between items-center">
              <span className="whitespace-pre-wrap flex-grow">{resp.text}</span>
              <Button size="sm" variant="danger" onClick={() => onRemoveResponse(questionSetId, item.id, resp.id)} className="p-0.5 ml-2"><TrashIcon className="h-3 w-3"/></Button>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400 italic">{language === 'am' ? 'እስካሁን ምንም የግል ምላሾች አልተመዘገቡም።' : 'No individual responses recorded yet.'}</p>
        )}
        <div className="flex items-center mt-2">
          <input 
            type="text" 
            value={newResponse} 
            onChange={(e) => setNewResponse(e.target.value)} 
            placeholder={language === 'am' ? 'የግል ምላሽ አክል...' : "Add individual response..."}
            className="flex-grow p-1 border border-gray-300 rounded-l-md text-xs"
          />
          <Button size="sm" onClick={handleAddResponse} className="rounded-l-none text-xs px-2 py-1.5" disabled={!newResponse.trim()}>
            {language === 'am' ? 'ምላሽ ጨምር' : 'Add Resp.'}
          </Button>
        </div>
      </div>
    </div>
  );
};


interface CompetitorProfileEditorProps {
    profile: CompetitorProfile;
    onSave: (updatedProfile: CompetitorProfile) => void;
    onDelete: (id: string) => void;
    language: Language;
    t: (key: TranslationKey, defaultText?: string) => string;
}
const CompetitorProfileEditor: React.FC<CompetitorProfileEditorProps> = ({ profile, onSave, onDelete, language, t }) => {
    const [localProfile, setLocalProfile] = useState(profile);
    useEffect(() => setLocalProfile(profile), [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const fieldLabels: { key: keyof CompetitorProfile; label: string; type?: string }[] = [
        { key: 'name', label: language === 'am' ? 'የተፎካካሪ ስም' : 'Competitor Name' },
        { key: 'pricingStrategy', label: language === 'am' ? 'የዋጋ አወጣጥ ስትራቴጂ' : 'Pricing Strategy', type: 'textarea' },
        { key: 'keyFeatures', label: language === 'am' ? 'ቁልፍ ባህሪዎች' : 'Key Features', type: 'textarea' },
        { key: 'strengths', label: language === 'am' ? 'ጥንካሬዎች' : 'Strengths', type: 'textarea' },
        { key: 'weaknesses', label: language === 'am' ? 'ድክመቶች' : 'Weaknesses', type: 'textarea' },
        { key: 'marketGapsAddressed', label: language === 'am' ? 'የሚሸፍኗቸው/የሚፈጥሯቸው የገበያ ክፍተቶች' : 'Market Gaps They Address/Create', type: 'textarea' },
        { key: 'notes', label: language === 'am' ? 'አጠቃላይ ማስታወሻዎች' : 'General Notes', type: 'textarea' },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            {fieldLabels.map(field => field.key !== 'id' && (
                <div key={field.key} className="mb-3">
                    <label htmlFor={`${profile.id}-${field.key}`} className="block text-sm font-medium text-gray-700 mb-1">{field.label}:</label>
                    {field.type === 'textarea' ? (
                        <textarea
                            id={`${profile.id}-${field.key}`}
                            name={field.key}
                            value={localProfile[field.key] as string}
                            onChange={handleChange}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    ) : (
                        <input
                            type="text"
                            id={`${profile.id}-${field.key}`}
                            name={field.key}
                            value={localProfile[field.key] as string}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    )}
                </div>
            ))}
            <div className="flex justify-end space-x-2 mt-3">
                <Button variant="danger" size="sm" onClick={() => onDelete(profile.id)}>{language === 'am' ? 'መገለጫ ሰርዝ' : 'Delete Profile'}</Button>
                <Button variant="primary" size="sm" onClick={() => onSave(localProfile)}>{language === 'am' ? 'መገለጫ አስቀምጥ' : 'Save Profile'}</Button>
            </div>
        </div>
    );
};

interface TrendEntryEditorProps {
 entry: TrendEntry;
  onSave: (updatedEntry: TrendEntry) => void;
  onDelete: (id: string) => void;
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
}
const TrendEntryEditor: React.FC<TrendEntryEditorProps> = ({ entry, onSave, onDelete, language, t }) => {
    const [localEntry, setLocalEntry] = useState(entry);
    useEffect(() => setLocalEntry(entry), [entry]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalEntry(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const fieldLabels: { key: keyof TrendEntry; label: string; type?: string }[] = [
        { key: 'title', label: language === 'am' ? 'የአዝማሚያ ርዕስ' : 'Trend Title' },
        { key: 'description', label: language === 'am' ? 'መግለጫ' : 'Description', type: 'textarea' },
        { key: 'sourceEvidence', label: language === 'am' ? 'ምንጭ/ማስረጃ (አገናኞች፣ ሪፖርቶች)' : 'Source/Evidence (links, reports)', type: 'textarea' },
        { key: 'timeframe', label: language === 'am' ? 'የጊዜ ገደብ/ወቅታዊነት' : 'Timeframe/Recency' },
        { key: 'locationMarket', label: language === 'am' ? 'የታየበት ቦታ/ገበያ' : 'Observed Location/Market' },
        { key: 'potentialImpact', label: language === 'am' ? 'በንግድዎ ላይ ሊኖረው የሚችለው ተጽዕኖ' : 'Potential Impact on Your Business', type: 'textarea' },
        { key: 'notes', label: language === 'am' ? 'አጠቃላይ ማስታወሻዎች' : 'General Notes', type: 'textarea' },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
             {fieldLabels.map(field => field.key !== 'id' && (
                <div key={field.key} className="mb-3">
                    <label htmlFor={`${entry.id}-${field.key}`} className="block text-sm font-medium text-gray-700 mb-1">{field.label}:</label>
                    {field.type === 'textarea' ? (
                        <textarea
                            id={`${entry.id}-${field.key}`}
                            name={field.key}
                            value={localEntry[field.key] as string}
                            onChange={handleChange}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    ) : (
                        <input
                            type="text"
                            id={`${entry.id}-${field.key}`}
                            name={field.key}
                            value={localEntry[field.key] as string}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    )}
                </div>
            ))}
            <div className="flex justify-end space-x-2 mt-3">
                <Button variant="danger" size="sm" onClick={() => onDelete(entry.id)}>{language === 'am' ? 'አዝማሚያ ሰርዝ' : 'Delete Trend'}</Button>
                <Button variant="primary" size="sm" onClick={() => onSave(localEntry)}>{language === 'am' ? 'አዝማሚያ አስቀምጥ' : 'Save Trend'}</Button>
            </div>
        </div>
    );
};

interface MarketResearchAcceleratorProps {
  initialData: MarketResearchData;
  onUpdateData: (data: MarketResearchData) => void;
  strategyData: Partial<CanvasData>; 
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
  userProfile: UserProfile | null;
}

const addPageFooterToDoc = (doc: jsPDF, lang: Language, translator: Function, pageNumber: number, totalPages: number) => {
    doc.setFontSize(FOOTER_FONT_SIZE);
    doc.setTextColor(100);
    const footerText = translator('page_x_of_y', `Page ${pageNumber} of ${totalPages}`)
                        .replace('{currentPage}', String(pageNumber))
                        .replace('{totalPages}', String(totalPages));
    doc.text(footerText, MARGIN_MM, A4_HEIGHT_MM - MARGIN_MM / 2); 
    doc.setTextColor(0);
};

const addTextWithPageBreakToDoc = (
    doc: jsPDF, 
    text: string | string[], 
    x: number, 
    currentYRef: { value: number }, 
    options: any, 
    lineHeight: number, 
    totalPagesRef: { current: number }, 
    lang: Language, 
    translator: Function
) => {
    const lines = Array.isArray(text) ? text : doc.splitTextToSize(text, CONTENT_WIDTH_MM - (x - MARGIN_MM) );

    lines.forEach((line: string) => {
        if (currentYRef.value > A4_HEIGHT_MM - MARGIN_MM - lineHeight) {
            addPageFooterToDoc(doc, lang, translator, doc.getNumberOfPages(), totalPagesRef.current);
            doc.addPage();
            totalPagesRef.current = doc.getNumberOfPages();
            currentYRef.value = MARGIN_MM;
        }
        doc.text(line, x, currentYRef.value, options); 
        currentYRef.value += lineHeight;
    });
};


export const MarketResearchAccelerator: React.FC<MarketResearchAcceleratorProps> = ({ initialData, onUpdateData, strategyData, language, t, userProfile }) => {
  const [activeResearchSection, setActiveResearchSection] = useState<ResearchSection>(ResearchSection.QUESTIONS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [currentHelpContent, setCurrentHelpContent] = useState<ResearchSectionHelp | null>(
    RESEARCH_SECTIONS_HELP.find(h => h.title === activeResearchSection) || RESEARCH_SECTIONS_HELP[0]
  );
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeQuestionnaireSetId, setActiveQuestionnaireSetId] = useState<string | null>(null);
  const [isCreateSetModalOpen, setIsCreateSetModalOpen] = useState(false);
  const [newSetForm, setNewSetForm] = useState({ name: '', researchGoal: '', targetAudience: '' });
  
  const [manualQuestion, setManualQuestion] = useState('');
  const [editingCompetitorId, setEditingCompetitorId] = useState<string | null>(null);
  const [editingTrendId, setEditingTrendId] = useState<string | null>(null);

   useEffect(() => {
    if (window.innerWidth < 768) { 
        setIsSidebarOpen(false);
    }
    if (!activeQuestionnaireSetId && initialData[ResearchSection.QUESTIONS].length > 0) {
      setActiveQuestionnaireSetId(initialData[ResearchSection.QUESTIONS][0].id);
    }
  }, [initialData[ResearchSection.QUESTIONS], activeQuestionnaireSetId]);


  const handleCreateNewQuestionnaireSet = () => {
    if (!newSetForm.name.trim() || !newSetForm.researchGoal.trim() || !newSetForm.targetAudience.trim()) {
      setError(t('mra_error_fill_all_fields'));
      return;
    }
    setError(null);
    const newSet: ResearchQuestionnaireSet = {
      id: `set-${Date.now()}`,
      name: newSetForm.name.trim(),
      researchGoal: newSetForm.researchGoal.trim(),
      targetAudience: newSetForm.targetAudience.trim(),
      questions: []
    };
    onUpdateData({
      ...initialData,
      [ResearchSection.QUESTIONS]: [...initialData[ResearchSection.QUESTIONS], newSet]
    });
    setActiveQuestionnaireSetId(newSet.id);
    setIsCreateSetModalOpen(false);
    setNewSetForm({ name: '', researchGoal: '', targetAudience: '' });
  };

  const handleDeleteQuestionnaireSet = (setId: string) => {
    const confirmMessage = language === 'am' 
      ? "ይህን ሙሉ የምርምር ስብስብ እና ሁሉንም ጥያቄዎቹን መሰረዝ እንደሚፈልጉ እርግጠኛ ነዎት?"
      : "Are you sure you want to delete this entire research set and all its questions?";
    if (window.confirm(confirmMessage)) {
        const updatedSets = initialData[ResearchSection.QUESTIONS].filter(set => set.id !== setId);
        onUpdateData({
            ...initialData,
            [ResearchSection.QUESTIONS]: updatedSets
        });
        if (activeQuestionnaireSetId === setId) {
            setActiveQuestionnaireSetId(updatedSets.length > 0 ? updatedSets[0].id : null);
        }
    }
  };

  const handleGeneralNotesChange = useCallback((value: string) => {
    onUpdateData({ ...initialData, [ResearchSection.GENERAL_NOTES_IMPORT]: value });
  }, [initialData, onUpdateData]);

  const handleAddManualQuestion = () => {
    if (manualQuestion.trim() && activeQuestionnaireSetId) {
      const newQuestion: ResearchQuestionItem = { 
        id: `manual-${Date.now()}`, 
        text: manualQuestion.trim(),
        responses: [] 
      };
      const updatedSets = initialData[ResearchSection.QUESTIONS].map(set => 
        set.id === activeQuestionnaireSetId 
          ? { ...set, questions: [...set.questions, newQuestion] }
          : set
      );
      onUpdateData({ 
        ...initialData, 
        [ResearchSection.QUESTIONS]: updatedSets
      });
      setManualQuestion('');
    } else if (!activeQuestionnaireSetId) {
        setError(t('mra_error_select_or_create_set'));
    }
  };

  const handleUpdateQuestionText = (questionSetId: string, questionId: string, text: string) => {
    const updatedSets = initialData[ResearchSection.QUESTIONS].map(set => 
      set.id === questionSetId 
        ? { ...set, questions: set.questions.map(q => q.id === questionId ? { ...q, text } : q) }
        : set
    );
    onUpdateData({
      ...initialData,
      [ResearchSection.QUESTIONS]: updatedSets
    });
  };

  const handleRemoveQuestion = (questionSetId: string, questionId: string) => {
    const updatedSets = initialData[ResearchSection.QUESTIONS].map(set => 
      set.id === questionSetId 
        ? { ...set, questions: set.questions.filter(q => q.id !== questionId) }
        : set
    );
    onUpdateData({
      ...initialData,
      [ResearchSection.QUESTIONS]: updatedSets
    });
  };
  
  const handleAddResponseToQuestion = (questionSetId: string, questionId: string, responseText: string) => {
    const updatedSets = initialData[ResearchSection.QUESTIONS].map(set => {
      if (set.id === questionSetId) {
        return { 
          ...set, 
          questions: set.questions.map(q => {
            if (q.id === questionId) {
              return { ...q, responses: [...q.responses, {id: `resp-${Date.now()}`, text: responseText}] };
            }
            return q;
          }) 
        };
      }
      return set;
    });
    onUpdateData({
      ...initialData,
      [ResearchSection.QUESTIONS]: updatedSets
    });
  };

  const handleRemoveResponseFromQuestion = (questionSetId: string, questionId: string, responseId: string) => {
     const updatedSets = initialData[ResearchSection.QUESTIONS].map(set => {
      if (set.id === questionSetId) {
        return { 
          ...set, 
          questions: set.questions.map(q => {
            if (q.id === questionId) {
              return { ...q, responses: q.responses.filter(r => r.id !== responseId) };
            }
            return q;
          }) 
        };
      }
      return set;
    });
    onUpdateData({
      ...initialData,
      [ResearchSection.QUESTIONS]: updatedSets
    });
  };

  const handleAiGenerateQuestions = async () => {
    const currentSet = initialData[ResearchSection.QUESTIONS].find(s => s.id === activeQuestionnaireSetId);
    if (!currentSet) {
      setError(t('mra_error_select_or_create_set'));
      return;
    }
    if (!strategyData || Object.keys(strategyData).filter(k=>strategyData[k as CanvasSection]?.trim()).length === 0) {
        setError(t('mra_questions_ai_requires_canvas_note'));
        return;
    }

    setIsLoadingAi(true);
    setError(null);
    try {
      const questions = await generateMarketResearchQuestions(strategyData, currentSet.researchGoal, currentSet.targetAudience, language);
      if (questions.length > 0) {
        const updatedSets = initialData[ResearchSection.QUESTIONS].map(set => 
          set.id === activeQuestionnaireSetId 
            ? { ...set, questions: [...set.questions, ...questions] } 
            : set
        );
        onUpdateData({ 
          ...initialData, 
          [ResearchSection.QUESTIONS]: updatedSets 
        });
      } else {
         setError(t('error_ai_failed_generic', "AI could not generate questions. Try rephrasing research goal/audience or check API key and Strategy Canvas content."));
      }
    } catch (e) { console.error(e); setError(t('error_ai_failed_generic')); } 
    finally { setIsLoadingAi(false); }
  };

  const handleAddCompetitor = () => {
    const newCompetitor: CompetitorProfile = {
      id: `comp-${Date.now()}`, name: language === 'am' ? "አዲስ ተፎካካሪ" : "New Competitor", pricingStrategy: "", keyFeatures: "",
      strengths: "", weaknesses: "", marketGapsAddressed: "", notes: ""
    };
    onUpdateData({ ...initialData, [ResearchSection.COMPETITOR_ANALYSIS]: [...initialData[ResearchSection.COMPETITOR_ANALYSIS], newCompetitor] });
    setEditingCompetitorId(newCompetitor.id); 
  };

  const handleSaveCompetitor = (updatedProfile: CompetitorProfile) => {
    const updatedCompetitors = initialData[ResearchSection.COMPETITOR_ANALYSIS].map(c => c.id === updatedProfile.id ? updatedProfile : c);
    onUpdateData({
      ...initialData,
      [ResearchSection.COMPETITOR_ANALYSIS]: updatedCompetitors
    });
    setEditingCompetitorId(null);
  };

  const handleDeleteCompetitor = (id: string) => {
    const updatedCompetitors = initialData[ResearchSection.COMPETITOR_ANALYSIS].filter(c => c.id !== id);
    onUpdateData({
      ...initialData,
      [ResearchSection.COMPETITOR_ANALYSIS]: updatedCompetitors
    });
    if (editingCompetitorId === id) setEditingCompetitorId(null);
  };

  const handleAddTrend = () => {
    const newTrend: TrendEntry = {
      id: `trend-${Date.now()}`, title: language === 'am' ? "አዲስ አዝማሚያ" : "New Trend", description: "", sourceEvidence: "", 
      timeframe: "", locationMarket: "", potentialImpact: "", notes: ""
    };
    onUpdateData({ ...initialData, [ResearchSection.TRENDS]: [...initialData[ResearchSection.TRENDS], newTrend] });
    setEditingTrendId(newTrend.id); 
  };

  const handleSaveTrend = (updatedEntry: TrendEntry) => {
    const updatedTrends = initialData[ResearchSection.TRENDS].map(t => t.id === updatedEntry.id ? updatedEntry : t);
    onUpdateData({
      ...initialData,
      [ResearchSection.TRENDS]: updatedTrends
    });
    setEditingTrendId(null);
  };

  const handleDeleteTrend = (id: string) => {
    const updatedTrends = initialData[ResearchSection.TRENDS].filter(t => t.id !== id);
    onUpdateData({
      ...initialData,
      [ResearchSection.TRENDS]: updatedTrends
    });
     if (editingTrendId === id) setEditingTrendId(null);
  };

  const handleGenerateSummary = async () => {
    setIsLoadingAi(true);
    setError(null);
    try {
      const summary = await generateMarketResearchSummary(
        { 
          [ResearchSection.QUESTIONS]: initialData[ResearchSection.QUESTIONS],
          [ResearchSection.GENERAL_NOTES_IMPORT]: initialData[ResearchSection.GENERAL_NOTES_IMPORT],
          [ResearchSection.COMPETITOR_ANALYSIS]: initialData[ResearchSection.COMPETITOR_ANALYSIS],
          [ResearchSection.TRENDS]: initialData[ResearchSection.TRENDS],
        },
        strategyData,
        language
      );
      onUpdateData({ ...initialData, [ResearchSection.AI_SUMMARY]: summary || (language === 'am' ? "AI ማጠቃለያ ማመንጨት አልቻለም።" : "AI could not generate a summary.") });
       if (!summary) setError(t('error_ai_failed_generic', "AI could not generate a summary. Ensure relevant sections and strategy canvas have data or check API key."));
    } catch (e) { console.error(e); setError(t('error_ai_failed_generic')); } 
    finally { setIsLoadingAi(false); }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const simplifiedCsvContent = text.split('\n').map(line => line.split(',').join(' | ')).join('\n'); 
        const importHeader = language === 'am' ? "--- ከ CSV የገባ ውሂብ ---" : "--- Imported CSV Data ---";
        onUpdateData({ 
            ...initialData, 
            [ResearchSection.GENERAL_NOTES_IMPORT]: 
                (initialData[ResearchSection.GENERAL_NOTES_IMPORT] ? initialData[ResearchSection.GENERAL_NOTES_IMPORT] + "\n\n" : "") + 
                importHeader + "\n" + 
                simplifiedCsvContent 
        });
      };
      reader.readAsText(file);
      event.target.value = ''; 
    }
  };
  
  const handleExport = () => {
    const doc = new jsPDF();
    const currentYRef = { value: MARGIN_MM };
    const totalPagesRef = { current: 1 };

    // Add User Profile Section
    if (userProfile) {
        doc.setFontSize(SECTION_TITLE_FONT_SIZE);
        doc.setFont("helvetica", "bold");
        addTextWithPageBreakToDoc(doc, t('pdf_made_by_title'), MARGIN_MM, currentYRef, {}, LINE_HEIGHT_SECTION_TITLE, totalPagesRef, language, t);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(TEXT_FONT_SIZE);

        let textX = MARGIN_MM;
        if (userProfile.photo) {
            try {
                const base64Image = userProfile.photo.split(',')[1] || userProfile.photo;
                const imageType = userProfile.photo.startsWith('data:image/png') ? 'PNG' : 'JPEG';
                doc.addImage(base64Image, imageType, MARGIN_MM, currentYRef.value, USER_PHOTO_SIZE_MM, USER_PHOTO_SIZE_MM);
                textX = MARGIN_MM + USER_PHOTO_SIZE_MM + 5;
            } catch (e) { console.error("Error adding image to MRA PDF:", e); }
        }
        
        const profileDetails = [
            `${t('user_profile_name_label')} ${userProfile.name}`,
            `${t('user_profile_email_label')} ${userProfile.email || '-'}`,
            `${t('user_profile_phone_label')} ${userProfile.phone || '-'}`,
            `${t('user_profile_other_details_label')} ${userProfile.otherDetails || '-'}`
        ];
        
        let textStartY = currentYRef.value;
        profileDetails.forEach(detail => {
             const lines = doc.splitTextToSize(detail, CONTENT_WIDTH_MM - (textX - MARGIN_MM));
             lines.forEach((line: string) => {
                 if (currentYRef.value > A4_HEIGHT_MM - MARGIN_MM - LINE_HEIGHT_NORMAL) {
                    addPageFooterToDoc(doc, language, t, doc.getNumberOfPages(), totalPagesRef.current);
                    doc.addPage();
                    totalPagesRef.current = doc.getNumberOfPages();
                    currentYRef.value = MARGIN_MM;
                    textX = MARGIN_MM;
                 }
                 doc.text(line, textX, currentYRef.value);
                 currentYRef.value += LINE_HEIGHT_NORMAL;
            });
        });
        if (userProfile.photo) {
            currentYRef.value = Math.max(currentYRef.value, textStartY + USER_PHOTO_SIZE_MM + LINE_HEIGHT_NORMAL);
        } else {
            currentYRef.value += LINE_HEIGHT_NORMAL; 
        }
    }


    const activeSectionHelp = RESEARCH_SECTIONS_HELP.find(h => h.title === activeResearchSection);
    const translatedSectionTitleForFileName = activeSectionHelp?.sidebarTitle[language] || activeResearchSection;
    const translatedSectionTitleForDisplay = activeSectionHelp?.sidebarTitle[language] || t(activeResearchSection as TranslationKey, activeResearchSection);

    doc.setFontSize(TITLE_FONT_SIZE);
    doc.setFont("helvetica", "bold");
    const mainTitleText = `7set Spark - ${t('market_research_accelerator_page_title')} - ${translatedSectionTitleForDisplay}`;
    addTextWithPageBreakToDoc(doc, mainTitleText, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_TITLE, totalPagesRef, language, t);
    currentYRef.value += LINE_HEIGHT_NORMAL / 2;
    doc.setFont("helvetica", "normal");

    doc.setFontSize(TEXT_FONT_SIZE - 1);
    const exportDateText = `${t('exported_on_label', 'Exported on')}: ${new Date().toLocaleString(language === 'am' ? 'am-ET' : 'en-US')}`;
    addTextWithPageBreakToDoc(doc, exportDateText, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_NORMAL, totalPagesRef, language, t);
    currentYRef.value += LINE_HEIGHT_NORMAL;

    doc.setFontSize(TEXT_FONT_SIZE);

    switch (activeResearchSection) {
      case ResearchSection.QUESTIONS:
        initialData[ResearchSection.QUESTIONS].forEach(set => {
          doc.setFontSize(SECTION_TITLE_FONT_SIZE);
          doc.setFont("helvetica", "bold");
          const setTitleText = `${t('mra_report_set_title', 'Research Set')}: ${set.name} (${t('mra_report_goal_label', 'Goal')}: ${set.researchGoal}, ${t('mra_report_audience_label', 'Audience')}: ${set.targetAudience})`;
          addTextWithPageBreakToDoc(doc, setTitleText, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_SECTION_TITLE, totalPagesRef, language, t);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(TEXT_FONT_SIZE);

          set.questions.forEach(q => {
            const qText = `${t('mra_report_question_label', 'Question')}: ${q.text}`;
            addTextWithPageBreakToDoc(doc, qText, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_NORMAL * 0.9, totalPagesRef, language, t);
            if (q.responses.length > 0) {
              const rTitle = `  ${t('mra_report_responses_label', 'Responses')}:`;
              addTextWithPageBreakToDoc(doc, rTitle, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_NORMAL * 0.9, totalPagesRef, language, t);
              q.responses.forEach(r => {
                addTextWithPageBreakToDoc(doc, `    - ${r.text}`, MARGIN_MM + 5, currentYRef, {}, LINE_HEIGHT_NORMAL * 0.9, totalPagesRef, language, t);
              });
            }
            currentYRef.value += LINE_HEIGHT_NORMAL * 0.5; // Space after question
          });
          currentYRef.value += LINE_HEIGHT_NORMAL; // Space after set
        });
        break;
      case ResearchSection.GENERAL_NOTES_IMPORT:
        const notes = initialData[ResearchSection.GENERAL_NOTES_IMPORT] || t('no_content_yet_placeholder_pdf', 'No content provided.');
        addTextWithPageBreakToDoc(doc, notes, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_NORMAL * 0.9, totalPagesRef, language, t);
        break;
      case ResearchSection.COMPETITOR_ANALYSIS:
        initialData[ResearchSection.COMPETITOR_ANALYSIS].forEach(comp => {
          doc.setFontSize(SECTION_TITLE_FONT_SIZE);
          doc.setFont("helvetica", "bold");
          addTextWithPageBreakToDoc(doc, comp.name, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_SECTION_TITLE, totalPagesRef, language, t);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(TEXT_FONT_SIZE);
          
          const fields = [
            { labelKey: 'mra_report_pricing_label', defaultLabel: 'Pricing Strategy', value: comp.pricingStrategy },
            { labelKey: 'mra_report_features_label', defaultLabel: 'Key Features', value: comp.keyFeatures },
            { labelKey: 'mra_report_strengths_label', defaultLabel: 'Strengths', value: comp.strengths },
            { labelKey: 'mra_report_weaknesses_label', defaultLabel: 'Weaknesses', value: comp.weaknesses },
            { labelKey: 'mra_report_gaps_label', defaultLabel: 'Market Gaps Addressed', value: comp.marketGapsAddressed },
            { labelKey: 'mra_report_notes_label', defaultLabel: 'Notes', value: comp.notes },
          ];
          fields.forEach(field => {
            if (field.value) {
              const fieldText = `${t(field.labelKey as TranslationKey, field.defaultLabel)}: ${field.value}`;
              addTextWithPageBreakToDoc(doc, fieldText, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_NORMAL * 0.9, totalPagesRef, language, t);
            }
          });
          currentYRef.value += LINE_HEIGHT_NORMAL;
        });
        break;
      case ResearchSection.TRENDS:
        initialData[ResearchSection.TRENDS].forEach(trend => {
          doc.setFontSize(SECTION_TITLE_FONT_SIZE);
          doc.setFont("helvetica", "bold");
          addTextWithPageBreakToDoc(doc, trend.title, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_SECTION_TITLE, totalPagesRef, language, t);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(TEXT_FONT_SIZE);
          const fields = [
            { labelKey: 'mra_report_description_label', defaultLabel: 'Description', value: trend.description },
            { labelKey: 'mra_report_source_label', defaultLabel: 'Source/Evidence', value: trend.sourceEvidence },
            { labelKey: 'mra_report_timeframe_label', defaultLabel: 'Timeframe', value: trend.timeframe },
            { labelKey: 'mra_report_location_label', defaultLabel: 'Location/Market', value: trend.locationMarket },
            { labelKey: 'mra_report_impact_label', defaultLabel: 'Potential Impact', value: trend.potentialImpact },
            { labelKey: 'mra_report_notes_label', defaultLabel: 'Notes', value: trend.notes },
          ];
          fields.forEach(field => {
            if (field.value) {
              const fieldText = `${t(field.labelKey as TranslationKey, field.defaultLabel)}: ${field.value}`;
              addTextWithPageBreakToDoc(doc, fieldText, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_NORMAL * 0.9, totalPagesRef, language, t);
            }
          });
          currentYRef.value += LINE_HEIGHT_NORMAL;
        });
        break;
      case ResearchSection.AI_SUMMARY:
        const summary = initialData[ResearchSection.AI_SUMMARY] || t('no_content_yet_placeholder_pdf', 'No summary generated.');
        addTextWithPageBreakToDoc(doc, summary, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_NORMAL * 0.9, totalPagesRef, language, t);
        break;
    }

    for (let i = 1; i <= totalPagesRef.current; i++) {
        doc.setPage(i);
        addPageFooterToDoc(doc, language, t, i, totalPagesRef.current);
    }

    const fileNameBase = language === 'am' ? 'የገበያ_ጥናት' : 'market_research';
    doc.save(`${fileNameBase}_${translatedSectionTitleForFileName.toLowerCase().replace(/\s+|&|\//g, '_')}.pdf`);
  };

  const openHelpModalForSection = (sectionKey: ResearchSection) => {
    const help = RESEARCH_SECTIONS_HELP.find(h => h.title === sectionKey);
    setCurrentHelpContent(help || { 
        title: sectionKey, 
        sidebarTitle: {en: sectionKey, am: sectionKey}, 
        explanation: {en: "No help text available.", am: "ምንም የእገዛ ጽሑፍ የለም።"} 
    });
    setIsHelpModalOpen(true);
  };
  
  const currentActiveSet = initialData[ResearchSection.QUESTIONS].find(s => s.id === activeQuestionnaireSetId);

  const renderSectionContent = () => {
    if (error && activeResearchSection !== ResearchSection.AI_SUMMARY) { 
      if(activeResearchSection !== ResearchSection.QUESTIONS) setError(null);
    }
    const currentSectionHelp = RESEARCH_SECTIONS_HELP.find(h => h.title === activeResearchSection);
    const translatedSectionTitle = currentSectionHelp?.sidebarTitle[language] || t(activeResearchSection as TranslationKey, activeResearchSection);


    switch (activeResearchSection) {
      case ResearchSection.QUESTIONS:
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4 p-4 bg-gray-100 rounded-lg shadow">
                <div>
                    <h3 className="text-xl font-semibold text-blue-700">{RESEARCH_SECTIONS_HELP.find(h => h.title === ResearchSection.QUESTIONS)?.sidebarTitle[language] || "Research Question Sets"}</h3>
                    <p className="text-sm text-gray-600">{language === 'am' ? 'የተለያዩ ግቦች ወይም ታዳሚዎች ላሏቸው የተለያዩ የምርምር ጥያቄ ስብስቦችን ያስተዳድሩ።' : 'Manage different sets of research questions for various goals or audiences.'}</p>
                </div>
                <Button onClick={() => { setIsCreateSetModalOpen(true); setError(null); }} leftIcon={<PlusIcon className="h-5 w-5"/>}>
                    {t('mra_questions_create_set_button')}
                </Button>
            </div>

            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}

            {initialData[ResearchSection.QUESTIONS].length > 0 && (
                <div className="mb-6">
                    <label htmlFor="activeQuestionnaireSet" className="block text-sm font-medium text-gray-700 mb-1">{t('mra_questions_active_set_label')}</label>
                    <div className="flex items-center space-x-2">
                        <select 
                            id="activeQuestionnaireSet"
                            value={activeQuestionnaireSetId || ""}
                            onChange={(e) => setActiveQuestionnaireSetId(e.target.value)}
                            className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>{t('mra_questions_select_set_placeholder')}</option>
                            {initialData[ResearchSection.QUESTIONS].map(set => (
                                <option key={set.id} value={set.id}>{set.name} ({set.researchGoal})</option>
                            ))}
                        </select>
                        {activeQuestionnaireSetId && (
                             <Button variant="danger" size="sm" onClick={() => handleDeleteQuestionnaireSet(activeQuestionnaireSetId)} title={t('mra_questions_delete_set_button_title')}>
                                <TrashIcon className="h-4 w-4"/>
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {currentActiveSet ? (
              <div className="p-4 border border-blue-200 rounded-lg bg-white shadow-md">
                <h4 className="text-lg font-semibold text-red-700 mb-1">{t('mra_questions_working_on_prefix')}: "{currentActiveSet.name}"</h4>
                <p className="text-xs text-gray-500 mb-1">{t('mra_questions_goal_prefix')}: {currentActiveSet.researchGoal}</p>
                <p className="text-xs text-gray-500 mb-3">{t('mra_questions_audience_prefix')}: {currentActiveSet.targetAudience}</p>
                
                <div className="bg-blue-50 p-3 rounded-md shadow-inner mb-4">
                  <label htmlFor="manualQuestion" className="block text-sm font-medium text-gray-700 mb-1">{t('mra_questions_add_manual_label')}</label>
                  <div className="flex space-x-2">
                    <input
                      type="text" id="manualQuestion" value={manualQuestion} onChange={(e) => setManualQuestion(e.target.value)}
                      className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder={language === 'am' ? 'የምርምር ጥያቄዎን ያስገቡ' : "Enter your research question"}
                    />
                    <Button onClick={handleAddManualQuestion} disabled={!manualQuestion.trim()}>{t('mra_questions_add_manual_button')}</Button>
                  </div>
                </div>
                <Button variant="secondary" onClick={() => {handleAiGenerateQuestions(); setError(null);}} leftIcon={<SparklesIcon className="h-5 w-5"/>} disabled={isLoadingAi || !strategyData || Object.keys(strategyData).filter(k=>strategyData[k as CanvasSection]?.trim()).length === 0}>
                  {isLoadingAi ? t('mra_questions_ai_generating_button') : t('mra_questions_ai_generate_button')}
                </Button>
                {(!strategyData || Object.keys(strategyData).filter(k=>strategyData[k as CanvasSection]?.trim()).length === 0) && <p className="text-xs text-orange-600 mt-1">{t('mra_questions_ai_requires_canvas_note')}</p>}

                <div className="mt-4 space-y-2">
                  {currentActiveSet.questions.length > 0 ? (
                    currentActiveSet.questions.map(q => (
                      <ResearchQuestionCard 
                        key={q.id} item={q} 
                        questionSetId={currentActiveSet.id}
                        onUpdateQuestionText={handleUpdateQuestionText} 
                        onRemoveQuestion={handleRemoveQuestion}
                        onAddResponse={handleAddResponseToQuestion}
                        onRemoveResponse={handleRemoveResponseFromQuestion}
                        language={language}
                        t={t}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 italic mt-3">{t('mra_questions_no_questions_placeholder')}</p>
                  )}
                </div>
              </div>
            ) : (
                <p className="text-gray-500 italic p-4 text-center">
                    {initialData[ResearchSection.QUESTIONS].length > 0 
                        ? t('mra_questions_select_set_prompt')
                        : t('mra_questions_no_sets_prompt')
                    }
                </p>
            )}
          </div>
        );
      case ResearchSection.GENERAL_NOTES_IMPORT:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-700">{translatedSectionTitle}</h3>
             <div className="bg-white p-4 rounded-lg shadow">
                <label htmlFor="csvUpload" className="block text-sm font-medium text-gray-700 mb-2">{t('mra_general_notes_import_csv_label')}</label>
                <input type="file" id="csvUpload" accept=".csv" onChange={handleFileUpload} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                <p className="text-xs text-gray-500 mt-1">{t('mra_general_notes_csv_note')}</p>
             </div>
            <textarea
              value={initialData[ResearchSection.GENERAL_NOTES_IMPORT]}
              onChange={(e) => handleGeneralNotesChange(e.target.value)}
              rows={10}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder={t('mra_general_notes_placeholder')}
            />
          </div>
        );
      case ResearchSection.COMPETITOR_ANALYSIS:
        const currentCompetitor = initialData[ResearchSection.COMPETITOR_ANALYSIS].find(c => c.id === editingCompetitorId);
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-700">{translatedSectionTitle}</h3>
              <Button onClick={handleAddCompetitor} leftIcon={<PlusIcon className="h-5 w-5"/>}>{t('mra_competitor_add_button')}</Button>
            </div>
            {editingCompetitorId && currentCompetitor ? (
              <CompetitorProfileEditor profile={currentCompetitor} onSave={handleSaveCompetitor} onDelete={handleDeleteCompetitor} language={language} t={t} />
            ) : (
              <div className="space-y-2">
                {initialData[ResearchSection.COMPETITOR_ANALYSIS].length === 0 && <p className="text-gray-500 italic">{t('mra_competitor_no_competitors_placeholder')}</p>}
                {initialData[ResearchSection.COMPETITOR_ANALYSIS].map(comp => (
                  <div key={comp.id} className="bg-white p-3 rounded-md shadow flex justify-between items-center">
                    <span className="text-gray-700">{comp.name}</span>
                    <Button variant="outline" size="sm" onClick={() => {setEditingCompetitorId(comp.id); setEditingTrendId(null);}}>{t('edit_button')}</Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case ResearchSection.TRENDS:
        const currentTrend = initialData[ResearchSection.TRENDS].find(t => t.id === editingTrendId);
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-700">{translatedSectionTitle}</h3>
                <Button onClick={handleAddTrend} leftIcon={<PlusIcon className="h-5 w-5"/>}>{t('mra_trends_add_button')}</Button>
            </div>
            {editingTrendId && currentTrend ? (
                <TrendEntryEditor entry={currentTrend} onSave={handleSaveTrend} onDelete={handleDeleteTrend} language={language} t={t} />
            ) : (
                <div className="space-y-2">
                    {initialData[ResearchSection.TRENDS].length === 0 && <p className="text-gray-500 italic">{t('mra_trends_no_trends_placeholder')}</p>}
                    {initialData[ResearchSection.TRENDS].map(trend => (
                        <div key={trend.id} className="bg-white p-3 rounded-md shadow flex justify-between items-center">
                            <span className="text-gray-700">{trend.title}</span>
                             <Button variant="outline" size="sm" onClick={() => {setEditingTrendId(trend.id); setEditingCompetitorId(null);}}>{t('edit_button')}</Button>
                        </div>
                    ))}
                </div>
            )}
          </div>
        );
      case ResearchSection.AI_SUMMARY:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-700">{translatedSectionTitle}</h3>
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-2">{error}</p>}
            <Button onClick={() => {handleGenerateSummary(); setError(null);}} disabled={isLoadingAi} variant="primary" leftIcon={<SparklesIcon className="h-5 w-5"/>}>
              {isLoadingAi ? (<><SpinnerIcon className="h-5 w-5 mr-2" /> {t('mra_ai_summary_generating_button')}</>) : t('mra_ai_summary_generate_button')}
            </Button>
            <div className="bg-white p-4 rounded-lg shadow min-h-[200px] whitespace-pre-wrap text-gray-700">
              {isLoadingAi && !initialData[ResearchSection.AI_SUMMARY] ? <div className="flex justify-center items-center h-full"><SpinnerIcon className="h-8 w-8 text-blue-600" /></div> : (initialData[ResearchSection.AI_SUMMARY] || <span className="italic text-gray-400">{t('mra_ai_summary_placeholder')}</span>)}
            </div>
          </div>
        );
      default: return <p>Select a section</p>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-8rem-2rem)] relative">
      <aside className={`fixed md:absolute top-20 md:top-auto bottom-0 right-0 h-full md:h-auto md:max-h-full w-full max-w-xs md:w-[300px] bg-gradient-to-br from-blue-700 to-blue-800 text-white p-6 shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 z-40 overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{t('mra_sidebar_title')}</h3>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-blue-200 hover:text-white">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            {Object.values(ResearchSection).map(section => {
              const helpInfo = RESEARCH_SECTIONS_HELP.find(h => h.title === section);
              const sidebarTitle = helpInfo?.sidebarTitle[language] || t(section as TranslationKey, section);
              return (
                <li key={section}>
                  <a
                    href="#"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      setActiveResearchSection(section);
                      setCurrentHelpContent(helpInfo || {title: section, sidebarTitle: {[language]:t(section as TranslationKey, section)} as any, explanation: {en: "Error", am: "ስህተት"}});
                      setEditingCompetitorId(null); 
                      setEditingTrendId(null);    
                      if(window.innerWidth < 768) setIsSidebarOpen(false); 
                    }}
                    className={`block px-3 py-2 rounded-md transition-colors ${activeResearchSection === section ? 'bg-red-600 font-semibold' : 'hover:bg-blue-600'}`}
                  >
                    {sidebarTitle}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <main className={`flex-grow p-4 md:p-6 bg-gray-50 shadow-inner overflow-y-auto transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:mr-[300px]' : 'mr-0'}`}>
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-red-700">{t('market_research_accelerator_page_title')}</h2>
            <div className="flex items-center space-x-2">
                <Button onClick={handleExport} variant="primary" leftIcon={<DownloadIcon className="h-5 w-5"/>}>{t('export_current_view_button')}</Button>
                <Button variant="outline" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
                    {isSidebarOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                </Button>
            </div>
         </div>
         {renderSectionContent()}
      </main>

       <FloatingActionButton
        icon={<HelpIcon className="h-6 w-6" />}
        tooltip={t('help_mra_button_tooltip')}
        onClick={() => openHelpModalForSection(activeResearchSection)}
        className="bottom-6 right-6 z-50" 
        colorClass="bg-blue-600 hover:bg-blue-700"
        size="md" 
      />

      <Modal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} title={`${t('mra_help_modal_title_prefix')}: ${currentHelpContent?.sidebarTitle[language] || currentHelpContent?.title || ''}`} size="lg">
        <p className="text-gray-700 whitespace-pre-line">
            {currentHelpContent?.explanation[language] || currentHelpContent?.explanation.en}
        </p>
      </Modal>

      <Modal isOpen={isCreateSetModalOpen} onClose={() => {setIsCreateSetModalOpen(false); setError(null); setNewSetForm({name: '', researchGoal: '', targetAudience: ''})}} title={t('mra_create_set_modal_title')} size="lg">
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
        <div className="space-y-4">
          <div>
            <label htmlFor="setName" className="block text-sm font-medium text-gray-700 mb-1">{t('mra_create_set_name_label')}</label>
            <input type="text" id="setName" value={newSetForm.name} onChange={(e) => setNewSetForm(prev => ({...prev, name: e.target.value}))} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder={language==='am'? 'ለምሳሌ፣ የቅድመ ተጠቃሚ አስተያየት':'e.g., Early Adopter Feedback'}/>
          </div>
          <div>
            <label htmlFor="setGoal" className="block text-sm font-medium text-gray-700 mb-1">{t('mra_create_set_goal_label')}</label>
            <textarea id="setGoal" rows={2} value={newSetForm.researchGoal} onChange={(e) => setNewSetForm(prev => ({...prev, researchGoal: e.target.value}))} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder={language==='am' ? 'ለምሳሌ፣ ለዋና ባህሪ X ያለውን ፍላጎት ማረጋገጥ' : "e.g., Validate demand for core feature X"}/>
          </div>
           <div>
            <label htmlFor="setAudience" className="block text-sm font-medium text-gray-700 mb-1">{t('mra_create_set_audience_label')}</label>
            <input type="text" id="setAudience" value={newSetForm.targetAudience} onChange={(e) => setNewSetForm(prev => ({...prev, targetAudience: e.target.value}))} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder={language === 'am' ? 'ለምሳሌ፣ በቴክኖሎጂ የተካኑ አነስተኛ የንግድ ባለቤቶች' : "e.g., Tech-savvy small business owners"}/>
          </div>
          <Button onClick={handleCreateNewQuestionnaireSet} className="w-full" variant="primary">
            {t('mra_create_set_button')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

// --- SVG Icons (remain the same) ---
const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
  </svg>
);

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
  </svg>
);

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

const SpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" {...props} className={`animate-spin ${props.className || ''}`}>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const HelpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
