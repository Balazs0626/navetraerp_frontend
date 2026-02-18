import { I18nProvider } from "@refinedev/core";
import i18n from "../i18n";

export const i18nProvider: I18nProvider = {
  translate: (key: string, params?: object, defaultMessage?: string): string => {
    return i18n.t(key, { ...params, defaultValue: defaultMessage }) as string;
  },
  changeLocale: (lang: string) => {
    return i18n.changeLanguage(lang);
  },
  getLocale: () => {
    return i18n.language;
  },
};