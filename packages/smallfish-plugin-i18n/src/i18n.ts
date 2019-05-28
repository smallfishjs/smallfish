import i18next from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';

import resources from '@/i18n';
import config from '@/config/config';

Object.keys(resources).map(key => {
  resources[key] = {
    translation: resources[key],
  };
});

const i18n = config.i18n || {};
const params = {
  resources,
  fallbackLng: {
    en: ['en-Us'],
    default: ['en-US'],
  },
};

// if user assign language not use auto detector
if (i18n.lng) {
  params.lng = i18n.lng;
  i18next.init(params);
} else {
  i18next.use(languageDetector).init(params);
}

export default i18next;
