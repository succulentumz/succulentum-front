import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { format } from 'date-fns';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enApi from './locales/api/en-EN';
import en from './locales/en-EN';
import ru from './locales/ru-RU';
import { ILocale, localeNameSpaces, type ILocaleInitParams, type ILocaleResource } from './types';

export const resources = {
  [ILocale.EN]: {
    common: en,
    api: enApi,
  },
  [ILocale.RU]: {
    common: ru,
    api: {},
  },
} satisfies ILocaleResource;

export const initParams = {
  ns: localeNameSpaces,
  defaultNS: ['common'],
  resources,
  lng: ILocale.EN,
  fallbackLng: ILocale.EN,
  detection: {
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    order: ['localStorage', 'cookie', 'navigator'],
    caches: ['cookie', 'localStorage'],
    cookieMinutes: 365 * 24 * 60, // one year,
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'em', 'b', 'i', 'p', 'ul', 'ol', 'li'],
  },
} satisfies ILocaleInitParams;

i18n.use(LanguageDetector).use(initReactI18next).init(initParams);

const tCommon = i18n.getFixedT(null, null);

export { i18n, tCommon };
