import { Refine, Authenticated, ErrorComponent } from "@refinedev/core";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { CatchAllNavigate } from "@refinedev/react-router";
import { API_URL } from "./constants/url"
import { DashboardPage } from "./pages/dashboard";
import { RefineThemes, ThemedLayout, ThemedTitle, useNotificationProvider } from "@refinedev/antd";
import { App as AntdApp, ConfigProvider, Select, Switch, theme, Typography } from "antd";
import { FileTextFilled, FileTextOutlined, HomeFilled, HomeOutlined, ProductFilled, ProductOutlined, UserOutlined } from "@ant-design/icons";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { UserList } from "./pages/users/list";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "./contexts/color-mode";
import { UserCreate } from "./pages/users/create";
import { I18nProvider } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import "./providers/i18nProvider";

import { notification } from "antd";
import { NotificationProvider } from "@refinedev/core";

export const notificationProvider: NotificationProvider = {
    open: ({ type, message, description, key }) => {
        const translatedMessage = message || (type === "success" ? "Siker" : "Hiba");
        const translatedDescription = description || (type === "success" ? "A művelet sikeresen megtörtént." : "Hiba történt a művelet során.");
        
        switch (type) {
        case "success":
          notification.success({ message, description, key });
          break;
        case "error":
          notification.error({ message, description, key });
          break;
        default:
          notification.open({ message, description, key });
      }
    },
    close: (key?: string) => {
        if (key) {
            // cast-oljuk string-re, hogy TypeScript ne húzza alá
            notification.destroy;
        }
    },
};

const { Option } = Select;

export default function App() {

  const colorModeFromLS = localStorage.getItem("colorMode");
  const isSystemDark = window?.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultMode = colorModeFromLS || (isSystemDark ? "dark" : "light");
  const [mode, setMode] = useState(defaultMode);

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  const { darkAlgorithm, defaultAlgorithm } = theme;

  const { t, i18n } = useTranslation();

  const [locale, setLocale] = useState(i18n.language);

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale) {
      setLocale(savedLocale);
      i18n.changeLanguage(savedLocale);
    }
  }, []);

  const i18nProvider: I18nProvider = {
      translate: (key: string, params: object) => {
          return t(key, params as any) as string;
      },
      changeLocale: (lang: string) => i18n.changeLanguage(lang),
      getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          ...RefineThemes.Blue,
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
          token: {
            colorBgLayout: mode === "light" ? "#e0e0e0ff" : "#141414",
            colorBgContainer: mode === "light" ? "#f0f2f5" : "#1f1f1f",
          },
        }}
      >
        <AntdApp>
          <Refine
            authProvider={authProvider}
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
            notificationProvider={useNotificationProvider}
            accessControlProvider={{
              can: async ({ resource, action }) => {
                const permissions = (await authProvider.getPermissions?.()) as string[] | null;

                if (!permissions) {
                  return { can: false };
                }

                if (resource === "User" && action === "list") {
                  return { can: permissions.includes("VIEW:USERS") };
                }

                return { can: true };
              },
            }}
            resources={[
              { 
                name: "dashboard" ,
                list: "/",
                meta: {
                  label: "Kezdőlap",
                  icon: <HomeOutlined/>
                }
              },
              {
                name: "User",
                list: "/users",
                create: "/users/create",
                meta: {
                  label: "Felhasználók",
                  icon: <UserOutlined/>
                }
              },
            ]}
            options={{ syncWithLocation: true }}
          >
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route
                path="/"
                element={
                  <Authenticated                    
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayout
                      Title={() => (
                        <ThemedTitle
                          collapsed={false}
                          text="NavetraERP"
                        />
                      )}
                      Header={() => (
                        <div style={{
                          display: "flex",
                          justifyContent: "flex-end", // jobb oldalra tolja
                          alignItems: "center",
                          gap: 16, // kis térköz a header elemek között
                          paddingRight: 16, // opcionális padding
                          paddingTop: 16
                        }}>
                          <Select
                            value={i18n.language}
                            style={{ width: 120 }}
                            onChange={(value) => {
                              i18n.changeLanguage(value)
                              localStorage.setItem("locale", value)
                            }}
                            options={[
                              { label: "🇭🇺 Magyar", value: "hu" },
                              { label: "🇬🇧 English", value: "en" },
                            ]}
                          />

                          {/* Ide lehet rakni egy Dark/Light switch-et is */}
                          <Switch
                            checked={mode === "dark"}
                            onChange={(checked) => setMode(checked ? "dark" : "light")}
                            checkedChildren="🌙"
                            unCheckedChildren="☀️"
                          />
                        </div>
                      )}
                    >
                      <Outlet/>
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route path="/" element={<DashboardPage/>}/>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/users/create" element={<UserCreate/>}/>
              </Route>
              <Route
                  element={
                    <Authenticated key="catch-all">
                      <ThemedLayout>
                        <Outlet />
                      </ThemedLayout>
                    </Authenticated>
                  }
                >
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}