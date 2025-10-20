import { Refine, Authenticated, ErrorComponent } from "@refinedev/core";
import { BrowserRouter, Routes, Route, Outlet, redirect } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { CatchAllNavigate } from "@refinedev/react-router";
import { DashboardPage } from "./pages/dashboard";
import { RefineThemes, ThemedLayout, ThemedTitle, useNotificationProvider } from "@refinedev/antd";
import { App as AntdApp, ConfigProvider, Select, Switch, theme, Typography } from "antd";
import { CalendarOutlined, ClockCircleOutlined, ClusterOutlined, FileTextFilled, FileTextOutlined, GroupOutlined, HomeFilled, HomeOutlined, ProductFilled, ProductOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { UserList } from "./pages/users/list";
import { useEffect, useState } from "react";
import { UserCreate } from "./pages/users/create";
import { I18nProvider } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import "./providers/i18nProvider";
import huLocale from "antd/es/locale/hu_HU";
import enLocale from "antd/es/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/hu";
import "dayjs/locale/en";

import { notification } from "antd";
import { NotificationProvider } from "@refinedev/core";
import { UserEdit } from "./pages/users";
import { RoleCreate, RoleEdit, RoleList } from "./pages/roles";
import { DepartmentEdit, DepartmentList } from "./pages/departments";
import { DepartmentCreate } from "./pages/departments/create";
import { PositionList } from "./pages/positions/list";
import { PositionCreate, PositionEdit } from "./pages/positions";
import { ShiftList } from "./pages/shifts/list";
import { ShiftCreate } from "./pages/shifts/create";
import { ShiftEdit } from "./pages/shifts";
import { EmployeeList } from "./pages/employee";
import { EmployeeCreate } from "./pages/employee/create";
import { EmployeeEdit } from "./pages/employee/edit";
import { WorkSchedulesCalendar } from "./pages/work_schedules/calendar";
import { WorkScheduleCreate } from "./pages/work_schedules/create";
import { WorkScheduleList } from "./pages/work_schedules/list";

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
        notification.destroy;
      }
    },
};

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

  const i18nProvider: I18nProvider = {
      translate: (key: string, params: object) => {
          return t(key, params as any) as string;
      },
      changeLocale: (lang: string) => i18n.changeLanguage(lang),
      getLocale: () => i18n.language,
  };

  const { token } = theme.useToken();

  return (
    <BrowserRouter>
      <ConfigProvider
        locale={antdLocale}
        theme={{
          ...RefineThemes.Blue,
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
          token: {
            colorBgLayout: mode === "light" ? "#e0e0e0ff" : "#141414",
            colorBgContainer: mode === "light" ? "#eeeeeeff" : "#1f1f1f",
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

                if (resource === "administrator" && action === "list") {
                  return { can: (permissions.includes("VIEW:USERS") || permissions.includes("VIEW:ROLES"))};
                }

                if (resource === "users" && action === "list") {
                  return { can: permissions.includes("VIEW:USERS") };
                }

                if (resource === "roles" && action === "list") {
                  return { can: permissions.includes("VIEW:ROLES") };
                }

                return { can: true };
              },
            }}
            resources={[
              { 
                name: "dashboard" ,
                list: "/",
                meta: {
                  label: t("pages.sidebar.dashboard"),
                  icon: <HomeOutlined/>
                }
              },
              {
                name: "administrator",
                meta: {
                  label: t("pages.sidebar.administrator"),
                }
              },
              {
                name: "users",
                list: "/users",
                create: "/users/create",
                edit: "/users/edit/:id",
                meta: {
                  label: t("pages.sidebar.users"),
                  icon: <UserOutlined/>,
                  parent: "administrator"
                }
              },
              {
                name: "roles",
                list: "/roles",
                create: "/roles/create",
                edit: "/roles/edit:id",
                meta: {
                  label: t("pages.sidebar.roles"),
                  icon: <SettingOutlined/>,
                  parent: "administrator"
                }
              },
              {
                name: "hr",
                meta: {
                  label: t("pages.sidebar.hr")
                }
              },
              {
                name: "employee",
                list: "/hr/employee",
                create: "/hr/employee/create",
                edit: "/hr/employee/edit:id",
                meta: {
                  label: t("pages.sidebar.employee"),
                  icon: <UserOutlined/>,
                  parent: "hr"
                }
              },
              {
                name: "departments",
                list: "/hr/departments",
                meta: {
                  label: t("pages.sidebar.departments"),
                  icon: <GroupOutlined/>,
                  parent: "hr"
                }
              },
              {
                name: "positions",
                list: "/hr/positions",
                meta: {
                  label: t("pages.sidebar.positions"),
                  icon: <ClusterOutlined/>,
                  parent: "hr"
                }
              },
              {
                name: "shifts",
                list: "/hr/shifts",
                meta: {
                  label: t("pages.sidebar.shifts"),
                  icon: <ClockCircleOutlined/>,
                  parent: "hr"
                }
              },
              {
                name: "work_schedules",
                list: "/hr/work_schedules",
                create: "hr/work_schedules/create",
                meta: {
                  label: t("pages.sidebar.work_schedules"),
                  icon: <CalendarOutlined/>,
                  parent: "hr"
                }
              }
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
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: 16,
                          padding: 16
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

                <Route path="/users">
                  <Route index element={<UserList/>}/>
                  <Route path="create" element={<UserCreate/>}/>
                  <Route path="edit/:id" element={<UserEdit/>}/>
                </Route>

                <Route path="/roles">
                  <Route index element={<RoleList/>}/>
                  <Route path="create" element={<RoleCreate/>}/>
                  <Route path="edit/:id" element={<RoleEdit/>}/>
                </Route>

                <Route path="/hr/employee">
                  <Route index element={<EmployeeList/>}/>
                  <Route path="create" element={<EmployeeCreate/>}/>
                  <Route path="edit/:id" element={<EmployeeEdit/>}/>
                </Route>

                <Route path="/hr/departments">
                  <Route index element={<DepartmentList/>}/>
                  <Route path="create" element={<DepartmentCreate/>}/>
                  <Route path="edit/:id" element={<DepartmentEdit/>}/>
                </Route>

                <Route path="/hr/positions">
                  <Route index element={<PositionList/>}/>
                  <Route path="create" element={<PositionCreate/>}/>
                  <Route path="edit/:id" element={<PositionEdit/>}/>
                </Route>

                <Route path="/hr/shifts">
                  <Route index element={<ShiftList/>}/>
                  <Route path="create" element={<ShiftCreate/>}/>
                  <Route path="edit/:id" element={<ShiftEdit/>}/>
                </Route>

                <Route path="/hr/work_schedules">
                  <Route index element={<WorkScheduleList/>}/>
                  <Route path="calendar" element={<WorkSchedulesCalendar/>}/>
                  <Route path="create" element={<WorkScheduleCreate/>}/>
                </Route>
                
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