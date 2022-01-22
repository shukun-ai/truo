import 'react-i18next';
import { zhTranslation } from './locales/zh/translation';

declare module 'react-i18next' {
  interface Resources {
    translation: typeof zhTranslation;
  }
}
