import { type InitOptions, type ResourceKey } from 'i18next';

export const enum ILocale {
  RU = 'ru',
  EN = 'en',
}

export const localeNameSpaces = ['common', 'api'] as const;

export type ILocaleNameSpace = (typeof localeNameSpaces)[number];

export type ILocaleResourceLanguage = {
  [namespace in ILocaleNameSpace]: ResourceKey;
};

export type ILocaleResource = {
  [locale in ILocale]: ILocaleResourceLanguage;
};

export interface ILocaleInitParams extends InitOptions {
  lng?: ILocale;
  fallbackLng: ILocale;
  defaultNS: ILocaleNameSpace[];
}
