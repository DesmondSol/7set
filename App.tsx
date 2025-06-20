
import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { BusinessLaunchCanvas } from './components/BusinessLaunchCanvas/BusinessLaunchCanvas';
import { MarketResearchAccelerator } from './components/MarketResearchAccelerator/MarketResearchAccelerator';
import { ComingSoon } from './components/ComingSoon';
import { Page, SubPage, CanvasData, ALL_CANVAS_SECTIONS, CanvasSection, Language } from './types';
import { NAV_ITEMS } from './constants';
import { getTranslator, TranslationKey } from './locales'; // Import localization utilities

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page | null>(null);
  const [activeSubPage, setActiveSubPage] = useState<SubPage | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const [canvasData, setCanvasData] = useState<CanvasData>(
    ALL_CANVAS_SECTIONS.reduce((acc, section) => {
      acc[section] = ""; 
      return acc;
    }, {} as CanvasData)
  );

  const t = useCallback(getTranslator(currentLanguage), [currentLanguage]);

  const handleUpdateCanvasData = (newData: Partial<CanvasData>) => {
    setCanvasData(prev => ({ ...prev, ...newData }));
  };

  const handleSaveCanvasSection = (section: CanvasSection, content: string) => {
    setCanvasData(prev => ({ ...prev, [section]: content }));
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
             />;
    }
    if (activePage === Page.START && activeSubPage === SubPage.RESEARCH) {
      return <MarketResearchAccelerator 
                strategyData={canvasData} 
                language={currentLanguage}
                t={t}
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
        <img src="https://picsum.photos/seed/welcome/400/300" alt="Welcome" className="rounded-lg shadow-md mb-8" />
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
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      {/* Footer removed */}
    </div>
  );
};

export default App;
