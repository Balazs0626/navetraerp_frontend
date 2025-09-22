import { Refine, AuthProvider, Authenticated, ErrorComponent } from "@refinedev/core";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { CatchAllNavigate } from "@refinedev/react-router";
import { API_URL } from "./constants/url"
import { DashboardPage } from "./pages/dashboard";
import { RefineThemes, ThemedLayout, ThemedTitle } from "@refinedev/antd";
import { App as AntdApp, ConfigProvider, Switch, theme, Typography } from "antd";
import { FileTextFilled, FileTextOutlined, HomeFilled, HomeOutlined, ProductFilled, ProductOutlined, UserOutlined } from "@ant-design/icons";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { UserList } from "./pages/users/list";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "./contexts/color-mode";

export default function App() {

  const { mode, setMode } = useContext(ColorModeContext);

  const { Text } = Typography;

  const { darkAlgorithm, defaultAlgorithm } = theme;

  useEffect(() => {
        localStorage.setItem("colorMode", mode);
    }, [mode]);

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          ...RefineThemes.Blue,
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
          token: {
            colorBgLayout: mode === "light" ? "#f0f2f5" : "#141414",
            colorBgContainer: mode === "light" ? "#f0f2f5" : "#1f1f1f",
          },
        }}
      >
        <AntdApp>
          <Refine
            authProvider={authProvider}
            dataProvider={dataProvider}
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
                    >
                      <Outlet/>
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route path="/" element={<DashboardPage/>}/>
                <Route path="/users" element={<UserList/>}/>
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
