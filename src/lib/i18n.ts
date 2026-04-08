import vi from '@/messages/vi.json';
import en from '@/messages/en.json';

export type Locale = 'vi' | 'en';

const messages = {
  vi,
  en,
};

let currentLocale: Locale = 'vi';

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function getLocale() {
  return currentLocale;
}

export function t(path: string) {
  const message = messages[currentLocale];

  return path.split('.').reduce((obj: any, key) => obj?.[key], message) ?? path;
}
