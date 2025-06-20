
import React, { useState, useEffect, useRef } from 'react';
import { NavItem, Page, SubPage, Language } from '../types';
import { TranslationKey } from '../locales';

interface NavbarProps {
  navItems: NavItem[];
  onSelectPage: (page: Page, subPage: SubPage) => void;
  activeSubPage: SubPage | null;
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: TranslationKey, defaultText?: string) => string;
}

const useClickOutside = <T extends HTMLElement,>(ref: React.RefObject<T>, handler: (event: MouseEvent | TouchEvent) => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};


export const Navbar: React.FC<NavbarProps> = ({ navItems, onSelectPage, activeSubPage, currentLanguage, changeLanguage, t }) => {
  const [openDropdown, setOpenDropdown] = useState<Page | null>(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  
  const mainNavDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(mainNavDropdownRef, () => setOpenDropdown(null));
  useClickOutside(langDropdownRef, () => setIsLangDropdownOpen(false));

  const handleNavClick = (page: Page) => {
    setOpenDropdown(openDropdown === page ? null : page);
  };

  const handleSubItemClick = (page: Page, subPage: SubPage) => {
    onSelectPage(page, subPage);
    setOpenDropdown(null);
  };

  const handleLanguageChange = (lang: Language) => {
    changeLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <div className="text-2xl font-bold tracking-tight"> {/* Reduced logo size */}
          <span className="text-white">7set</span> <span className="text-blue-300">Spark</span>
        </div>
        
        {/* Centered Navigation Items */}
        <div className="flex-grow flex justify-center items-center space-x-1 sm:space-x-2" ref={mainNavDropdownRef}>
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              <button
                onClick={() => handleNavClick(item.label)}
                className={`px-3 py-2 sm:px-4 text-base sm:text-lg font-medium rounded-md hover:bg-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300
                  ${openDropdown === item.label ? 'bg-red-500' : ''}`}
              >
                {t(item.label as TranslationKey, item.label)}
              </button>
              {openDropdown === item.label && (
                <div className="absolute mt-2 w-auto max-w-[90vw] sm:max-w-sm md:w-56 bg-white rounded-md shadow-xl z-20 right-0 lg:left-0 py-1">
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubItemClick(item.label, subItem);
                      }}
                      className={`block px-4 py-3 text-sm transition-colors duration-150 whitespace-normal
                        ${activeSubPage === subItem 
                          ? 'bg-blue-500 text-white' 
                          : 'text-gray-700 hover:bg-red-100 hover:text-red-700'
                        }`}
                    >
                      {t(subItem as TranslationKey, subItem)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Language Toggle on the right */}
        <div className="relative" ref={langDropdownRef}>
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="px-3 py-2 sm:px-4 text-base sm:text-lg font-medium rounded-md hover:bg-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center"
          >
            {currentLanguage === 'am' ? t('lang_amharic') : t('lang_english')}
            <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform duration-200 ${isLangDropdownOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {isLangDropdownOpen && (
            <div className="absolute mt-2 w-auto max-w-[70vw] sm:max-w-[12rem] md:w-36 bg-white rounded-md shadow-xl z-20 right-0 py-1">
              {(['en', 'am'] as Language[]).map((lang) => (
                <a
                  key={lang}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLanguageChange(lang);
                  }}
                  className={`block px-4 py-3 text-sm transition-colors duration-150 whitespace-normal
                    ${currentLanguage === lang
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-red-100 hover:text-red-700'
                    }`}
                >
                  {lang === 'am' ? t('lang_amharic') : t('lang_english')}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);
    