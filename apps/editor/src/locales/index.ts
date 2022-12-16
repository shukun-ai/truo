import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { zhTranslation } from './zh/translation';

export const resources = {
  zh: {
    translation: zhTranslation,
  },
};

export function configureLocals() {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'zh',

    interpolation: {
      escapeValue: false,
    },
  });
}
