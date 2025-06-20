
import React, { useState, useEffect } from 'react';
import { 
    CopywritingData, 
    CopywritingSubSection, 
    Language, 
    UserProfile, 
    CanvasData, 
    MarketResearchData,
    CopywritingSectionHelp
} from '../types';
import { TranslationKey } from '../locales';
import { COPYWRITING_SECTIONS_HELP } from '../constants';
import { MarketingPlanner } from './Copywriting/MarketingPlanner';
import { PitchRefiner } from './Copywriting/PitchRefiner';
import { FloatingActionButton } from './common/FloatingActionButton';
import { Modal } from './common/Modal';
import { Button } from './common/Button';

interface CopywritingPageProps {
  initialData: CopywritingData;
  onUpdateData: (data: CopywritingData) => void;
  strategyData: Partial<CanvasData>;
  researchData: MarketResearchData;
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
  userProfile: UserProfile | null;
}

export const CopywritingPage: React.FC<CopywritingPageProps> = ({
  initialData,
  onUpdateData,
  strategyData,
  researchData,
  language,
  t,
  userProfile
}) => {
  const [activeSubSection, setActiveSubSection] = useState<CopywritingSubSection>(CopywritingSubSection.MARKETING);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  
  // AI Modals will be specific to sub-components, but the FAB logic is here
  const [isAiModalOpen, setIsAiModalOpen] = useState(false); 


  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  const currentHelpContent = COPYWRITING_SECTIONS_HELP.find(h => h.title === activeSubSection) || COPYWRITING_SECTIONS_HELP[0];

  const handleSubSectionSelect = (subSection: CopywritingSubSection) => {
    setActiveSubSection(subSection);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const openAiModal = () => {
    // This function will likely be passed down and specific AI modal state will be handled in MarketingPlanner/PitchRefiner
    // For now, it just sets a generic flag. The sub-components will decide which AI modal to show.
    setIsAiModalOpen(true); 
  };


  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-8rem-2rem)] relative">
      <aside className={`fixed md:absolute top-20 md:top-auto bottom-0 right-0 h-full md:h-auto md:max-h-full w-full max-w-xs md:w-[300px] bg-gradient-to-br from-red-700 to-red-800 text-white p-6 shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 z-40 overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{t('copywriting_sidebar_title')}</h3>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-red-200 hover:text-white">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            {Object.values(CopywritingSubSection).map(subSection => {
              const helpInfo = COPYWRITING_SECTIONS_HELP.find(h => h.title === subSection);
              const sidebarTitle = helpInfo?.sidebarTitle[language] || t(subSection as TranslationKey, subSection);
              return (
                <li key={subSection}>
                  <a
                    href="#"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      handleSubSectionSelect(subSection);
                    }}
                    className={`block px-3 py-2 rounded-md transition-colors ${activeSubSection === subSection ? 'bg-blue-600 font-semibold' : 'hover:bg-red-600'}`}
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
            <h2 className="text-3xl font-bold text-red-700">{t('copywriting_page_title')}</h2>
            <Button variant="outline" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
                {isSidebarOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
        </div>

        {activeSubSection === CopywritingSubSection.MARKETING && (
          <MarketingPlanner
            copywritingData={initialData}
            onUpdateData={onUpdateData}
            strategyData={strategyData}
            researchData={researchData}
            language={language}
            t={t}
            userProfile={userProfile}
            openAiModalFlag={isAiModalOpen} // This indicates the FAB was clicked
            setOpenAiModalFlag={setIsAiModalOpen} // To close the modal from MarketingPlanner
          />
        )}
        {activeSubSection === CopywritingSubSection.PITCH_REFINEMENT && (
          <PitchRefiner
            copywritingData={initialData}
            onUpdateData={onUpdateData}
            strategyData={strategyData}
            researchData={researchData}
            language={language}
            t={t}
            userProfile={userProfile}
            openAiModalFlag={isAiModalOpen} // This indicates the FAB was clicked
            setOpenAiModalFlag={setIsAiModalOpen} // To close the modal from PitchRefiner
          />
        )}
      </main>
      
      <FloatingActionButton
        icon={<HelpIcon className="h-6 w-6" />}
        tooltip={t('copywriting_help_button_tooltip')}
        onClick={() => setIsHelpModalOpen(true)}
        className="bottom-28 right-6 z-50"
        colorClass="bg-blue-600 hover:bg-blue-700"
        size="sm"
      />
      <FloatingActionButton
        icon={<SparklesIcon className="h-7 w-7"/>}
        tooltip={t('copywriting_ai_button_tooltip')}
        onClick={openAiModal} 
        className="bottom-6 right-6 z-50"
        colorClass="bg-red-600 hover:bg-red-700"
        size="lg"
      />

      <Modal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} title={`${t('mra_help_modal_title_prefix')}: ${currentHelpContent?.sidebarTitle[language] || currentHelpContent?.title || ''}`} size="lg">
        <p className="text-gray-700 whitespace-pre-line">
            {currentHelpContent?.explanation[language] || currentHelpContent?.explanation.en}
        </p>
      </Modal>
    </div>
  );
};

// --- SVG Icons (re-use from other components or define if new needed) ---
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

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 7.5l.813 2.846a4.5 4.5 0 01-3.09 3.09L12.187 15l-2.846.813a4.5 4.5 0 01-3.09-3.09L5.437 10.5l2.846-.813a4.5 4.5 0 013.09-3.09L12 3.75l.813 2.846a4.5 4.5 0 013.09 3.09L18.75 9l-2.846.813a4.5 4.5 0 01-3.09-3.09L12.187 6 12 5.25l.187.75z" />
  </svg>
);

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
