
import React, { useState, useEffect, useCallback } from 'react';
import jsPDF from 'jspdf';
import { CanvasSection, CanvasData, ALL_CANVAS_SECTIONS, CanvasSectionHelp, Language, UserProfile } from '../../types';
import { CANVAS_SECTIONS_HELP, GENERIC_ERROR_MESSAGE } from '../../constants';
import { generateBusinessCanvasContent } from '../../services/geminiService';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { FloatingActionButton } from '../common/FloatingActionButton';
import { TranslationKey } from '../../locales';


interface SectionContentEditorProps {
  section: CanvasSection;
  content: string;
  onSave: (section: CanvasSection, newContent: string) => void;
  t: (key: TranslationKey, defaultText?: string) => string;
  language: Language;
}

const SectionContentEditor: React.FC<SectionContentEditorProps> = ({ section, content, onSave, t, language }) => {
  const [editing, setEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);

  useEffect(() => {
    setCurrentContent(content); 
  }, [content]);

  const handleSave = () => {
    onSave(section, currentContent);
    setEditing(false);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-2xl font-semibold text-blue-700">{t(section as TranslationKey, section)}</h3>
        {!editing && (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            {t('edit_button', 'Edit')}
             <PencilIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {editing ? (
        <div>
          <textarea
            value={currentContent}
            onChange={(e) => setCurrentContent(e.target.value)}
            className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            placeholder={`${t('no_content_yet_placeholder', 'Enter details for')} ${t(section as TranslationKey, section)}...`}
          />
          <div className="mt-3 flex space-x-2">
            <Button onClick={handleSave} size="sm">{t('save_button', 'Save')}</Button>
            <Button variant="outline" size="sm" onClick={() => { setEditing(false); setCurrentContent(content); }}>{t('cancel_button', 'Cancel')}</Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 whitespace-pre-wrap min-h-[50px]">
            {content || <span className="text-gray-400 italic">{t('no_content_yet_placeholder')}</span>}
        </p>
      )}
    </div>
  );
};

interface BusinessLaunchCanvasProps {
  canvasData: CanvasData;
  onSaveSection: (section: CanvasSection, content: string) => void;
  onMassUpdate: (newData: Partial<CanvasData>) => void;
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
  userProfile: UserProfile | null;
}

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


export const BusinessLaunchCanvas: React.FC<BusinessLaunchCanvasProps> = ({ canvasData, onSaveSection, onMassUpdate, language, t, userProfile }) => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  
  const [aiForm, setAiForm] = useState({ idea: '', q1: '', q2: '', q3: '' });
  const [error, setError] = useState<string | null>(null);

  const addPageFooter = (doc: jsPDF, pageNumber: number, totalPages: number) => {
    doc.setFontSize(FOOTER_FONT_SIZE);
    doc.setTextColor(100);
    const footerText = t('page_x_of_y', `Page ${pageNumber} of ${totalPages}`)
                        .replace('{currentPage}', String(pageNumber))
                        .replace('{totalPages}', String(totalPages));
    doc.text(footerText, MARGIN_MM, A4_HEIGHT_MM - MARGIN_MM / 2);
    doc.setTextColor(0);
  };
  
  const addTextWithPageBreak = (
    doc: jsPDF, 
    text: string | string[], 
    x: number, 
    currentYRef: { value: number }, 
    options: any, 
    lineHeight: number, 
    totalPagesRef: { current: number }
  ) => {
    const lines = Array.isArray(text) ? text : doc.splitTextToSize(text, CONTENT_WIDTH_MM - (x - MARGIN_MM));

    lines.forEach((line: string) => {
        if (currentYRef.value > A4_HEIGHT_MM - MARGIN_MM - lineHeight) { 
            addPageFooter(doc, doc.getNumberOfPages(), totalPagesRef.current); 
            doc.addPage();
            totalPagesRef.current = doc.getNumberOfPages();
            currentYRef.value = MARGIN_MM; 
        }
        doc.text(line, x, currentYRef.value, options); 
        currentYRef.value += lineHeight;
    });
  };


  const handleExport = () => {
    const doc = new jsPDF();
    let currentYRef = { value: MARGIN_MM };
    const totalPagesRef = { current: 1 }; 

    // Add User Profile Section
    if (userProfile) {
        doc.setFontSize(SECTION_TITLE_FONT_SIZE);
        doc.setFont("helvetica", "bold");
        addTextWithPageBreak(doc, t('pdf_made_by_title'), MARGIN_MM, currentYRef, {}, LINE_HEIGHT_SECTION_TITLE, totalPagesRef);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(TEXT_FONT_SIZE);

        let textX = MARGIN_MM;
        if (userProfile.photo) {
            try {
                // Ensure photo is valid base64 string (remove data:image/jpeg;base64, part if present)
                const base64Image = userProfile.photo.split(',')[1] || userProfile.photo;
                const imageType = userProfile.photo.startsWith('data:image/png') ? 'PNG' : 'JPEG';
                doc.addImage(base64Image, imageType, MARGIN_MM, currentYRef.value, USER_PHOTO_SIZE_MM, USER_PHOTO_SIZE_MM);
                textX = MARGIN_MM + USER_PHOTO_SIZE_MM + 5; // Indent text next to photo
            } catch (e) {
                console.error("Error adding image to PDF:", e);
                // Continue without image if error
            }
        }
        
        const profileDetails = [
            `${t('user_profile_name_label')} ${userProfile.name}`,
            `${t('user_profile_email_label')} ${userProfile.email || '-'}`,
            `${t('user_profile_phone_label')} ${userProfile.phone || '-'}`,
            `${t('user_profile_other_details_label')} ${userProfile.otherDetails || '-'}`
        ];

        let textStartY = currentYRef.value;
        profileDetails.forEach(detail => {
            if (currentYRef.value > A4_HEIGHT_MM - MARGIN_MM - LINE_HEIGHT_NORMAL && textStartY + (USER_PHOTO_SIZE_MM / 2) > A4_HEIGHT_MM - MARGIN_MM - LINE_HEIGHT_NORMAL) { // Check if new page is needed
                 // Only add new page if not enough space for text next to photo
                 if (userProfile.photo && currentYRef.value < textStartY + USER_PHOTO_SIZE_MM + 5 ) {
                     // Still on the same line as photo, don't break page yet
                 } else {
                    addPageFooter(doc, doc.getNumberOfPages(), totalPagesRef.current);
                    doc.addPage();
                    totalPagesRef.current = doc.getNumberOfPages();
                    currentYRef.value = MARGIN_MM;
                    textStartY = MARGIN_MM; // Reset textStartY for new page
                    textX = MARGIN_MM; // Reset textX if new page and no photo
                 }
            }
            // Ensure we don't write text over the photo space if photo exists
            const yPos = userProfile.photo && currentYRef.value < textStartY + USER_PHOTO_SIZE_MM + 5 ? currentYRef.value : textStartY;

            const lines = doc.splitTextToSize(detail, CONTENT_WIDTH_MM - (textX - MARGIN_MM));
            lines.forEach((line: string) => {
                 if (currentYRef.value > A4_HEIGHT_MM - MARGIN_MM - LINE_HEIGHT_NORMAL) {
                    addPageFooter(doc, doc.getNumberOfPages(), totalPagesRef.current);
                    doc.addPage();
                    totalPagesRef.current = doc.getNumberOfPages();
                    currentYRef.value = MARGIN_MM;
                    textX = MARGIN_MM;
                 }
                 doc.text(line, textX, currentYRef.value);
                 currentYRef.value += LINE_HEIGHT_NORMAL;
            });
        });
        // Ensure Y is below photo if photo was added
        if (userProfile.photo) {
            currentYRef.value = Math.max(currentYRef.value, textStartY + USER_PHOTO_SIZE_MM + LINE_HEIGHT_NORMAL);
        } else {
            currentYRef.value += LINE_HEIGHT_NORMAL; // Extra space if no photo
        }
    }


    doc.setFontSize(TITLE_FONT_SIZE);
    doc.setFont("helvetica", "bold");
    const mainTitleText = `7set Spark - ${t('businessLaunchCanvas_title', "Business Launch Canvas")}`;
    addTextWithPageBreak(doc, mainTitleText, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_TITLE, totalPagesRef);
    currentYRef.value += LINE_HEIGHT_NORMAL / 2; 
    doc.setFont("helvetica", "normal");

    doc.setFontSize(TEXT_FONT_SIZE - 1);
    const exportDateText = `${t('exported_on_label', 'Exported on')}: ${new Date().toLocaleString(language === 'am' ? 'am-ET' : 'en-US')}`;
    addTextWithPageBreak(doc, exportDateText, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_NORMAL, totalPagesRef);
    currentYRef.value += LINE_HEIGHT_NORMAL;

    ALL_CANVAS_SECTIONS.forEach(section => {
      if (currentYRef.value > A4_HEIGHT_MM - MARGIN_MM - (LINE_HEIGHT_SECTION_TITLE * 2) ) { 
          addPageFooter(doc, doc.getNumberOfPages(), totalPagesRef.current);
          doc.addPage();
          totalPagesRef.current = doc.getNumberOfPages();
          currentYRef.value = MARGIN_MM;
      }
      doc.setFontSize(SECTION_TITLE_FONT_SIZE);
      doc.setFont("helvetica", "bold");
      const sectionTitleText = t(section as TranslationKey, section);
      addTextWithPageBreak(doc, sectionTitleText, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_SECTION_TITLE, totalPagesRef);
      doc.setFont("helvetica", "normal");
      
      doc.setFontSize(TEXT_FONT_SIZE);
      const contentText = canvasData[section] || t('no_content_yet_placeholder_pdf', 'No content provided.');
      addTextWithPageBreak(doc, contentText, MARGIN_MM, currentYRef, {}, LINE_HEIGHT_NORMAL * 0.9, totalPagesRef);
      currentYRef.value += LINE_HEIGHT_NORMAL / 2; 
    });
    
    for (let i = 1; i <= totalPagesRef.current; i++) {
        doc.setPage(i);
        addPageFooter(doc, i, totalPagesRef.current);
    }

    doc.save(language === 'am' ? 'የቢዝነስ_ማስጀመሪያ_ሸራ.pdf' : 'business_launch_canvas.pdf');
  };

  const handleAiGenerate = async () => {
    if (!aiForm.idea.trim()) {
        setError(t('error_ai_no_idea', "Please provide your business idea."));
        return;
    }
    setIsLoadingAi(true);
    setError(null);
    try {
        const result = await generateBusinessCanvasContent(
            aiForm.idea, 
            aiForm.q1, 
            aiForm.q2, 
            aiForm.q3,
            ALL_CANVAS_SECTIONS,
            language
        );
        if (result) {
            onMassUpdate(result);
            setIsAiModalOpen(false);
            setAiForm({ idea: '', q1: '', q2: '', q3: ''});
        } else {
            setError(t('error_ai_failed_generic', GENERIC_ERROR_MESSAGE + " (AI generation failed or returned no data)"));
        }
    } catch (e) {
        console.error(e);
        setError(t('error_ai_failed_generic', "Failed to generate content. ") + (e as Error).message);
    } finally {
        setIsLoadingAi(false);
    }
  };

  const handleAiInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAiForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem-2rem)] relative"> 
      <div className="flex-grow p-1 md:p-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-red-700">{t('businessLaunchCanvas_title', 'Business Launch Canvas')}</h2>
          <Button onClick={handleExport} variant="primary" leftIcon={<DownloadIcon className="h-5 w-5"/>}>{t('export_all_button', 'Export All')}</Button>
        </div>
        
        <div className="space-y-6">
          {ALL_CANVAS_SECTIONS.map(section => (
              <div key={section} id={`section-${section.replace(/\s+/g, '-')}`}>
                <SectionContentEditor 
                    section={section}
                    content={canvasData[section]}
                    onSave={onSaveSection}
                    t={t}
                    language={language}
                />
              </div>
          ))}
        </div>
      </div>

      <FloatingActionButton
        icon={<HelpIcon className="h-6 w-6" />}
        tooltip={t('help_canvas_button_tooltip', "Business Launch Canvas Guide")}
        onClick={() => setIsHelpModalOpen(true)}
        className="bottom-28 right-6 z-50"
        colorClass="bg-blue-600 hover:bg-blue-700"
        size="sm"
      />
      <FloatingActionButton
        icon={<SparklesIcon className="h-7 w-7"/>}
        tooltip={t('ai_assistant_canvas_button_tooltip', "AI Assistant to Fill Canvas")}
        onClick={() => setIsAiModalOpen(true)}
        className="bottom-6 right-6 z-50"
        colorClass="bg-red-600 hover:bg-red-700"
        size="lg"
      />

      <Modal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} title={t('ai_assistant_modal_title_canvas', "AI Assistant - Business Canvas")} size="xl">
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
        <div className="space-y-4">
          <div>
            <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-1">{t('ai_modal_idea_label')}</label>
            <textarea id="idea" name="idea" rows={3} value={aiForm.idea} onChange={handleAiInputChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder={t('ai_modal_idea_placeholder')}/>
          </div>
          <div>
            <label htmlFor="q1" className="block text-sm font-medium text-gray-700 mb-1">{t('ai_modal_q1_label')}</label>
            <input type="text" id="q1" name="q1" value={aiForm.q1} onChange={handleAiInputChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder={t('ai_modal_q1_placeholder')}/>
          </div>
          <div>
            <label htmlFor="q2" className="block text-sm font-medium text-gray-700 mb-1">{t('ai_modal_q2_label')}</label>
            <input type="text" id="q2" name="q2" value={aiForm.q2} onChange={handleAiInputChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder={t('ai_modal_q2_placeholder')}/>
          </div>
          <div>
            <label htmlFor="q3" className="block text-sm font-medium text-gray-700 mb-1">{t('ai_modal_q3_label')}</label>
            <input type="text" id="q3" name="q3" value={aiForm.q3} onChange={handleAiInputChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder={t('ai_modal_q3_placeholder')}/>
          </div>
          <Button onClick={handleAiGenerate} disabled={isLoadingAi} className="w-full" variant="primary">
            {isLoadingAi ? (
              <SpinnerIcon className="animate-spin h-5 w-5 mr-2" />
            ) : (
              <SparklesIcon className="h-5 w-5 mr-2" />
            )}
            {isLoadingAi ? t('ai_modal_generating_button_canvas') : t('ai_modal_generate_button_canvas')}
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} title={t('help_modal_title_canvas', "Business Launch Canvas Guide")} size="xl">
        <div className="space-y-6">
          {CANVAS_SECTIONS_HELP.map(helpItem => (
            <div key={helpItem.title} className="p-4 bg-gray-50 rounded-lg shadow">
              <h4 className="text-xl font-semibold text-blue-700 mb-2">{t(helpItem.title as TranslationKey, helpItem.title)}</h4>
              <p className="text-gray-700 mb-2 whitespace-pre-line">{helpItem.explanation[language] || helpItem.explanation.en}</p>
              {helpItem.example && (helpItem.example[language] || helpItem.example.en) && (
                <div>
                  <h5 className="text-sm font-semibold text-gray-600 mb-1">{language === 'am' ? 'ምሳሌ:' : 'Example:'}</h5>
                  <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded whitespace-pre-line border border-blue-200">
                    {helpItem.example[language] || helpItem.example.en}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

// --- SVG Icons ---
const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
  </svg>
);

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const HelpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
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
