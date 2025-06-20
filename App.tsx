
import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { BusinessLaunchCanvas } from './components/BusinessLaunchCanvas/BusinessLaunchCanvas';
import { MarketResearchAccelerator } from './components/MarketResearchAccelerator/MarketResearchAccelerator';
import { CopywritingPage } from './components/CopywritingPage'; // New Import
import { ComingSoon } from './components/ComingSoon';
import { UserProfileModal } from './components/UserProfileModal';
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
    CopywritingData // New Import
} from './types';
import { NAV_ITEMS } from './constants';
import { getTranslator, TranslationKey } from './locales';

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
        return ALL_CANVAS_SECTIONS.reduce((acc, section) => {
          acc[section] = parsedData[section] || "";
          return acc;
        }, {} as CanvasData);
      } catch (e) {
        console.error("Failed to parse canvasData from localStorage", e);
      }
    }
    return ALL_CANVAS_SECTIONS.reduce((acc, section) => {
      acc[section] = ""; 
      return acc;
    }, {} as CanvasData);
  });

  const [marketResearchData, setMarketResearchData] = useState<MarketResearchData>(() => {
    const storedMarketData = localStorage.getItem('sparkMarketResearchData');
    if (storedMarketData) {
      try {
        return JSON.parse(storedMarketData);
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
        return JSON.parse(storedCopywritingData);
      } catch (e) {
        console.error("Failed to parse copywritingData from localStorage", e);
      }
    }
    return initialCopywritingData;
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

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const renderContent = () => {
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
    if (activeSubPage) { 
      return <ComingSoon 
                featureName={t(activeSubPage as TranslationKey, activeSubPage)} 
                language={currentLanguage}
                t={t}
              />;
    }
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-gray-700">
        <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-8 rounded-xl shadow-2xl mb-8 inline-block transform hover:scale-105 transition-transform duration-300">
          <img 
            src="https://7setspark.com/wp-content/uploads/2023/12/Asset-5-179x35.webp" 
            alt={t('logo_alt_text')} 
            className="h-10 sm:h-12 w-auto" // Adjusted height
          />
        </div>
        <h1 className="text-4xl font-bold text-blue-700 mb-4">{t('welcome_title')}</h1>
        <p className="text-xl text-center max-w-2xl">
          {t('welcome_message')}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-blue-50">
      <Navbar
        navItems={NAV_ITEMS}
        onSelectPage={(page, subPage) => {
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
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
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
