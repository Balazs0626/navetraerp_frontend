import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en/common.json";
import hu from "../locales/hu/common.json";

i18n.use(initReactI18next).init({
    lng: "hu",
    resources: {
        en: {
            translation: en,
        },
        hu: {
            translation: hu,
        },
    },
    supportedLngs: ["en", "hu"],
    fallbackLng: ["en", "hu"],
});

export default i18n;