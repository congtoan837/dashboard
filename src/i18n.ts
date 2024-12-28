// i18n.ts
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './lang/en.json'; // Ensure this path is correct
import vi from './lang/vi.json'; // Ensure this path is correct

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {translation: en},
            vi: {translation: vi},
        },
        lng: 'vi',  // Default language
        fallbackLng: 'vi',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
