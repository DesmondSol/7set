
import React, { useState, useEffect, useRef } from 'react';
import { NavItem, Page, SubPage, Language, UserProfile } from '../types';
import { TranslationKey } from '../locales';

interface NavbarProps {
  navItems: NavItem[];
  onSelectPage: (page: Page, subPage: SubPage) => void;
  activeSubPage: SubPage | null;
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: TranslationKey, defaultText?: string) => string;
  userProfile: UserProfile | null;
  onOpenProfileModal: () => void;
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


export const Navbar: React.FC<NavbarProps> = ({ 
    navItems, 
    onSelectPage, 
    activeSubPage, 
    currentLanguage, 
    changeLanguage, 
    t,
    userProfile,
    onOpenProfileModal 
}) => {
  const [openDropdown, setOpenDropdown] = useState<Page | null>(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  
  const mainNavDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null); // Though not a dropdown, for consistency if needed later

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
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-white">7set</span> <span className="text-blue-300">Spark</span>
        </div>
        
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

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Language Toggle */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="px-2 py-1 sm:px-3 text-sm sm:text-base font-medium rounded-md hover:bg-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center"
            >
              {currentLanguage === 'am' ? t('lang_am_short') : t('lang_en_short')}
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
                    {lang === 'am' ? t('lang_amharic') : t('lang_english')} {/* Full name in dropdown */}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Button */}
          <div className="relative" ref={profileDropdownRef}>
             <button
                onClick={onOpenProfileModal}
                className="w-10 h-10 rounded-full bg-blue-300 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-red-700 flex items-center justify-center overflow-hidden"
                title={t('user_profile_button_tooltip')}
              >
                {userProfile?.photo ? (
                  <img src={userProfile.photo} alt={t('user_profile_button_tooltip')} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-6 h-6 text-red-700" />
                )}
            </button>
          </div>
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

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
);
