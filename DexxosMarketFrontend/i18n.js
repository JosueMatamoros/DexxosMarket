import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // Importa el detector de idioma
import enTranslation from './translations/en.json';
import esTranslation from './translations/es.json';
import jaTranslation from './translations/ja.json';

i18n
  .use(LanguageDetector) // Usa el detector de idioma
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
      ja: { translation: jaTranslation }
    },
    fallbackLng: 'en', // Idioma de respaldo
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator'], // Prioridad para detectar el idioma
      caches: ['localStorage', 'cookie'] // Guarda el idioma en localStorage o cookies
    }
  });

export default i18n;
