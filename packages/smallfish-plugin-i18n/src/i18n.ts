import i18next from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';

import resources from '@/i18n';

Object.keys(resources).map(key => {
  resources[key] = {
    translation: resources[key],
  };
});

const params = {
  resources,
  fallbackLng: {
    en: ['en-Us'],
    default: ['en-US'],
  },
};

i18next.use(languageDetector).init(params);

export default i18next;
