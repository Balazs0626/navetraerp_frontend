import { RefineThemes } from "@refinedev/antd";
import { ConfigProvider, theme } from "antd";
import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import huLocale from "antd/es/locale/hu_HU";
import enLocale from "antd/es/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/hu";
import "dayjs/locale/en";
import { useTranslation } from "react-i18next";

type ColorModeContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const { darkAlgorithm, defaultAlgorithm } = theme;

  const { t, i18n } = useTranslation();

  const [antdLocale, setAntdLocale] = useState(huLocale);

  useEffect(() => {
    if (i18n.language === "hu") {
      dayjs.locale("hu");
      setAntdLocale(huLocale);
    } else {
      dayjs.locale("en");
      setAntdLocale(enLocale);
    }
  }, [i18n.language]);

  return (
    <ColorModeContext.Provider
      value={{
        mode,
        setMode,
      }}
    >
      <ConfigProvider
        // you can change the theme colors here. example: ...RefineThemes.Magenta,
        locale={antdLocale}
        theme={{
          ...RefineThemes.Magenta,
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
          token: {
            colorBgLayout: mode === "light" ? "#e0e0e0" : "#141414",
            colorBgContainer: mode === "light" ? "#eeeeee" : "#1f1f1f",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
