import i18next from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';

import resources from '@/i18n';

const i18nConfig = JSON.parse(window._smallfish_i18n_config || '{}');

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

// if user assign language not use auto detector
if (i18nConfig.lng || i18nConfig.language) {
  params.lng = i18nConfig.lng || i18nConfig.language;
  i18next.init(params);
} else {
  i18next.use(languageDetector).init(params);
}

export default i18next;
