

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { BusinessLaunchCanvas } from './components/BusinessLaunchCanvas/BusinessLaunchCanvas';
import { MarketResearchAccelerator } from './components/MarketResearchAccelerator/MarketResearchAccelerator';
import { CopywritingPage } from './components/CopywritingPage'; 
import MindsetPage from './components/MindsetPage'; // New Mindset Page
import { ComingSoon } from './components/ComingSoon';
import { UserProfileModal } from './components/UserProfileModal';
import InfographicPage from './components/InfographicPage'; 
import { 
    Page, 
    SubPage, 
    CanvasData, 
    ALL_CANVAS_SECTIONS, 
    CanvasSection, 
    Language, 
    UserProfile, 
    MarketResearchData, 
    ResearchSection,
    CopywritingData,
    MindsetData, // New Mindset Data type
    TranslationKey
} from './types';
import { NAV_ITEMS } from './constants';
import { getTranslator } from './locales';

const initialMarketResearchData: MarketResearchData = {
  [ResearchSection.QUESTIONS]: [], 
  [ResearchSection.GENERAL_NOTES_IMPORT]: "",
  [ResearchSection.COMPETITOR_ANALYSIS]: [],
  [ResearchSection.TRENDS]: [],
  [ResearchSection.AI_SUMMARY]: "",
};

const initialCopywritingData: CopywritingData = {
  marketingPosts: [],
  pitches: [],
};

const initialMindsetData: MindsetData = {
  assessmentAnswers: {
    personality: {},
    businessAcumen: {},
    startupKnowledge: {},
  },
  assessmentStatus: {
    personality: 'not-started',
    businessAcumen: 'not-started',
    startupKnowledge: 'not-started',
  },
  profileReport: null,
  goals: {
    '6-month': { self: '', family: '', world: '' },
    '2-year': { self: '', family: '', world: '' },
    '5-year': { self: '', family: '', world: '' },
    '10-year': { self: '', family: '', world: '' },
  },
  goalsFirstSetDate: undefined,
  shouldAutoGenerateReport: false,
  goalSettingAiChatHistory: [],
};


const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page | null>(null);
  const [activeSubPage, setActiveSubPage] = useState<SubPage | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [canvasData, setCanvasData] = useState<CanvasData>(() => {
    const storedCanvasData = localStorage.getItem('sparkCanvasData');
    if (storedCanvasData) {
      try {
        const parsedData = JSON.parse(storedCanvasData);
        // Ensure all sections are present, defaulting to empty string if missing
        return ALL_CANVAS_SECTIONS.reduce((acc, section) => {
          acc[section] = parsedData[section] || "";
          return acc;
        }, {} as CanvasData);
      } catch (e) {
        console.error("Failed to parse canvasData from localStorage", e);
      }
    }
    // Default initialization if no stored data or parsing failed
    return ALL_CANVAS_SECTIONS.reduce((acc, section) => {
      acc[section] = ""; 
      return acc;
    }, {} as CanvasData);
  });

  const [marketResearchData, setMarketResearchData] = useState<MarketResearchData>(() => {
    const storedMarketData = localStorage.getItem('sparkMarketResearchData');
    if (storedMarketData) {
      try {
        const parsed = JSON.parse(storedMarketData);
        // Ensure structure matches MarketResearchData, defaulting parts if necessary
        return {
          [ResearchSection.QUESTIONS]: parsed[ResearchSection.QUESTIONS] || [],
          [ResearchSection.GENERAL_NOTES_IMPORT]: parsed[ResearchSection.GENERAL_NOTES_IMPORT] || "",
          [ResearchSection.COMPETITOR_ANALYSIS]: parsed[ResearchSection.COMPETITOR_ANALYSIS] || [],
          [ResearchSection.TRENDS]: parsed[ResearchSection.TRENDS] || [],
          [ResearchSection.AI_SUMMARY]: parsed[ResearchSection.AI_SUMMARY] || "",
        };
      } catch (e) {
        console.error("Failed to parse marketResearchData from localStorage", e);
      }
    }
    return initialMarketResearchData;
  });

  const [copywritingData, setCopywritingData] = useState<CopywritingData>(() => {
    const storedCopywritingData = localStorage.getItem('sparkCopywritingData');
    if (storedCopywritingData) {
      try {
        const parsed = JSON.parse(storedCopywritingData);
        return {
          marketingPosts: parsed.marketingPosts || [],
          pitches: parsed.pitches || [],
        };
      } catch (e) {
        console.error("Failed to parse copywritingData from localStorage", e);
      }
    }
    return initialCopywritingData;
  });

  const [mindsetData, setMindsetData] = useState<MindsetData>(() => {
    const storedMindsetData = localStorage.getItem('sparkMindsetData');
    if (storedMindsetData) {
      try {
        const parsed = JSON.parse(storedMindsetData);
        // Deep merge with defaults to ensure all keys are present
        return {
          assessmentAnswers: {
            personality: parsed.assessmentAnswers?.personality || {},
            businessAcumen: parsed.assessmentAnswers?.businessAcumen || {},
            startupKnowledge: parsed.assessmentAnswers?.startupKnowledge || {},
          },
          assessmentStatus: {
            personality: parsed.assessmentStatus?.personality || 'not-started',
            businessAcumen: parsed.assessmentStatus?.businessAcumen || 'not-started',
            startupKnowledge: parsed.assessmentStatus?.startupKnowledge || 'not-started',
          },
          profileReport: parsed.profileReport || null,
          goals: {
            '6-month': parsed.goals?.['6-month'] || { self: '', family: '', world: '' },
            '2-year': parsed.goals?.['2-year'] || { self: '', family: '', world: '' },
            '5-year': parsed.goals?.['5-year'] || { self: '', family: '', world: '' },
            '10-year': parsed.goals?.['10-year'] || { self: '', family: '', world: '' },
          },
          goalsFirstSetDate: parsed.goalsFirstSetDate || undefined,
          shouldAutoGenerateReport: typeof parsed.shouldAutoGenerateReport === 'boolean' 
                                      ? parsed.shouldAutoGenerateReport 
                                      : false,
          goalSettingAiChatHistory: Array.isArray(parsed.goalSettingAiChatHistory) 
                                      ? parsed.goalSettingAiChatHistory 
                                      : [],
        };
      } catch (e) {
        console.error("Failed to parse mindsetData from localStorage", e);
      }
    }
    return initialMindsetData;
  });

  const t = useCallback(getTranslator(currentLanguage), [currentLanguage]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('sparkUserProfile');
    if (storedProfile) {
      try {
        setUserProfile(JSON.parse(storedProfile));
      } catch (e) {
        console.error("Failed to parse userProfile from localStorage", e);
      }
    }
  }, []);

  const handleUpdateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('sparkUserProfile', JSON.stringify(profile));
    setIsUserProfileModalOpen(false);
  };

  const handleUpdateCanvasData = (newData: Partial<CanvasData>) => {
    setCanvasData(prev => {
      const updatedData = { ...prev, ...newData };
      localStorage.setItem('sparkCanvasData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleSaveCanvasSection = (section: CanvasSection, content: string) => {
    setCanvasData(prev => {
      const updatedData = { ...prev, [section]: content };
      localStorage.setItem('sparkCanvasData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleUpdateMarketResearchData = (updatedData: MarketResearchData) => {
    setMarketResearchData(updatedData);
    localStorage.setItem('sparkMarketResearchData', JSON.stringify(updatedData));
  };

  const handleUpdateCopywritingData = (updatedData: CopywritingData) => {
    setCopywritingData(updatedData);
    localStorage.setItem('sparkCopywritingData', JSON.stringify(updatedData));
  };

  const handleUpdateMindsetData = (updatedData: MindsetData) => {
    setMindsetData(updatedData);
    localStorage.setItem('sparkMindsetData', JSON.stringify(updatedData));
  };

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const renderContent = () => {
    if (activePage === Page.START && activeSubPage === SubPage.MINDSET) {
      return <MindsetPage
                initialData={mindsetData}
                onUpdateData={handleUpdateMindsetData}
                language={currentLanguage}
                t={t}
                userProfile={userProfile}
             />;
    }
    if (activePage === Page.START && activeSubPage === SubPage.STRATEGY) {
      return <BusinessLaunchCanvas 
                canvasData={canvasData} 
                onSaveSection={handleSaveCanvasSection}
                onMassUpdate={handleUpdateCanvasData} 
                language={currentLanguage}
                t={t}
                userProfile={userProfile}
             />;
    }
    if (activePage === Page.START && activeSubPage === SubPage.RESEARCH) {
      return <MarketResearchAccelerator 
                initialData={marketResearchData}
                onUpdateData={handleUpdateMarketResearchData}
                strategyData={canvasData} 
                language={currentLanguage}
                t={t}
                userProfile={userProfile}
              />;
    }
    if (activePage === Page.START && activeSubPage === SubPage.COPYWRITING) {
      return <CopywritingPage
                initialData={copywritingData}
                onUpdateData={handleUpdateCopywritingData}
                strategyData={canvasData}
                researchData={marketResearchData}
                language={currentLanguage}
                t={t}
                userProfile={userProfile}
              />;
    }
    if (activePage && activeSubPage) { 
      return <ComingSoon 
                featureName={t(activeSubPage as TranslationKey, activeSubPage)} 
                language={currentLanguage}
                t={t}
              />;
    }
    
    return <InfographicPage language={currentLanguage} t={t} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent"> 
      <Navbar
        navItems={NAV_ITEMS}
        onSelectPage={(page: Page | null, subPage: SubPage | null) => {
          setActivePage(page);
          setActiveSubPage(subPage);
        }}
        activeSubPage={activeSubPage}
        currentLanguage={currentLanguage}
        changeLanguage={changeLanguage}
        t={t}
        userProfile={userProfile}
        onOpenProfileModal={() => setIsUserProfileModalOpen(true)}
      />
      <main className="flex-grow container mx-auto px-2 sm:px-4 md:px-6 py-4 md:py-8 flex flex-col"> 
        <div className="flex-grow w-full h-full"> 
            {renderContent()}
        </div>
      </main>
      {isUserProfileModalOpen && (
        <UserProfileModal
          isOpen={isUserProfileModalOpen}
          onClose={() => setIsUserProfileModalOpen(false)}
          onSave={handleUpdateUserProfile}
          currentUserProfile={userProfile}
          t={t}
        />
      )}
    </div>
  );
};

export default App;