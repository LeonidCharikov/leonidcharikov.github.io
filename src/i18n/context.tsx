import {createContext, useContext, useEffect, useMemo, useState, type ReactNode} from 'react';
import {cs} from './locales/cs';
import {en} from './locales/en';
import {ru} from './locales/ru';
import type {Locale, TranslationDictionary} from './types';

export const SUPPORTED_LOCALES: {code: Locale; label: string; nativeName: string}[] = [
  {code: 'en', label: 'EN', nativeName: 'English'},
  {code: 'cs', label: 'CS', nativeName: 'Čeština'},
  {code: 'ru', label: 'RU', nativeName: 'Русский'},
];

const DICTIONARIES: Record<Locale, TranslationDictionary> = {
  en,
  cs,
  ru,
};

const STORAGE_KEY = 'leonid_portfolio_locale';

function resolveInitialLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && saved in DICTIONARIES) {
      return saved as Locale;
    }
  } catch {
    // Ignore storage access errors in restricted frames
  }

  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  if (browserLang in DICTIONARIES) {
    return browserLang as Locale;
  }
  return 'en';
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationDictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({children}: {children: ReactNode}) {
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage access errors in restricted frames
    }
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: DICTIONARIES[locale],
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}
