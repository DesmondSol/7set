
import React from 'react';
import { TranslationKey } from '../locales';
import { Language } from '../types';

interface ComingSoonProps {
  featureName: string; // This will be the already translated feature name
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ featureName, t }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center p-6 bg-white rounded-lg shadow-xl">
      <img src="https://picsum.photos/seed/comingsoon/300/200" alt="Coming Soon" className="rounded-lg shadow-md mb-8" />
      <h1 className="text-5xl font-bold text-blue-700 mb-4">{t('coming_soon_title')}</h1>
      <p className="text-2xl text-gray-600 mb-2">
        {t('coming_soon_feature_text_prefix')} <strong className="text-red-600">{featureName}</strong> {t('coming_soon_feature_text_suffix')}
      </p>
      <p className="text-lg text-gray-500">{t('coming_soon_message')}</p>
    </div>
  );
};
