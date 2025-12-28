import { Refine, Authenticated, ErrorComponent } from "@refinedev/core";
import { BrowserRouter, Routes, Route, Outlet, redirect } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { CatchAllNavigate } from "@refinedev/react-router";
import { DashboardPage } from "./pages/dashboard";
import { RefineThemes, ThemedLayout, ThemedTitle, useNotificationProvider } from "@refinedev/antd";
import { App as AntdApp, ConfigProvider, Select, Switch, theme, notification } from "antd";
import { CalendarOutlined, ClockCircleOutlined, ClusterOutlined, DashboardOutlined, DashOutlined, FileOutlined, FileTextFilled, FileTextOutlined, GroupOutlined, HomeFilled, HomeOutlined, ProductFilled, ProductOutlined, SettingOutlined, ShopOutlined, ShoppingCartOutlined, StopOutlined, TruckOutlined, UserOutlined } from "@ant-design/icons";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { UserList } from "./pages/administrator/users/list";
import { useEffect, useState } from "react";
import { UserCreate } from "./pages/administrator/users/create";
import { I18nProvider, NotificationProvider } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import "./providers/i18nProvider";
import huLocale from "antd/es/locale/hu_HU";
import enLocale from "antd/es/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/hu";
import "dayjs/locale/en";

import { UserEdit } from "./pages/administrator/users";
import { RoleCreate, RoleEdit, RoleList } from "./pages/administrator/roles";
import { DepartmentEdit, DepartmentList, DepartmentCreate } from "./pages/hr/departments";
import { PositionCreate, PositionEdit, PositionList } from "./pages/hr/positions";
import { ShiftEdit, ShiftCreate, ShiftList } from "./pages/hr/shifts";
import { EmployeeList, EmployeeCreate, EmployeeEdit } from "./pages/hr/employee";
import { WorkSchedulesCalendar, WorkScheduleList, WorkScheduleCreate } from "./pages/hr/work_schedules";
import { LeaveRequestCreate, LeaveRequestList } from "./pages/hr/leave_requests";
import { PerformanceReviewCreate, PerformanceReviewList, PerformanceReviewShow } from "./pages/hr/performance_reviews";
import routerProvider from "@refinedev/react-router";
import { AdmininstartorMainPage } from "./pages/administrator/main";
import { HRMainPage } from "./pages/hr/main";
import { ProcurementMainPage } from "./pages/procurement/main";
import { WarehouseCreate, WarehouseList } from "./pages/warehouses";
import { ProductCreate, ProductEdit, ProductList } from "./pages/products";
import { WarehouseEdit } from "./pages/warehouses/edit";
import { ProductShow } from "./pages/products/show";
import { SupplierList } from "./pages/procurement/suppliers/list";
import { SupplierCreate } from "./pages/procurement/suppliers";
import { SupplierEdit } from "./pages/procurement/suppliers/edit";
import { PurchaseOrderList } from "./pages/procurement/purchase_orders/list";
import { PurchaseOrderCreate } from "./pages/procurement/purchase_orders";
import { PurchaseOrderShow } from "./pages/procurement/purchase_orders/show";
import { GoodsReceiptList } from "./pages/procurement/goods_receipts";
import { GoodsReceiptCreate } from "./pages/procurement/goods_receipts/create";
import { GoodsReceiptShow } from "./pages/procurement/goods_receipts/show";

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
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            accessControlProvider={{
              can: async ({ resource, action }) => {
                const permissions = (await authProvider.getPermissions?.()) as string[] | null;

                if (!permissions) {
                  return { can: false };
                }

                if (resource === "warehouses" && action === "list") {
                  return { can: permissions.includes("VIEW:WAREHOUSES") };
                }

                if (resource === "products" && action === "list") {
                  return { can: permissions.includes("VIEW:PRODUCTS") };
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

                if (resource === "hr" && action === "list") {
                  return { can: (
                    permissions.includes("VIEW:EMPLOYEES") || 
                    permissions.includes("VIEW:DEPARTMENTS") || 
                    permissions.includes("VIEW:POSITIONS")) || 
                    permissions.includes("VIEW:SHIFTS") || 
                    permissions.includes("VIEW:WORK_SCHEDULES") || 
                    permissions.includes("VIEW:LEAVE_REQUESTS") || 
                    permissions.includes("VIEW:PERFORMANCE_REVIEWS")};
                }

                if (resource === "employee" && action === "list") {
                  return { can: permissions.includes("VIEW:EMPLOYEES") };
                }

                if (resource === "departments" && action === "list") {
                  return { can: permissions.includes("VIEW:DEPARTMENTS") };
                }

                if (resource === "positions" && action === "list") {
                  return { can: permissions.includes("VIEW:POSITIONS") };
                }

                if (resource === "shifts" && action === "list") {
                  return { can: permissions.includes("VIEW:SHIFTS") };
                }

                if (resource === "work_schedules" && action === "list") {
                  return { can: permissions.includes("VIEW:WORK_SCHEDULES") };
                }

                if (resource === "leave_requests" && action === "list") {
                  return { can: permissions.includes("VIEW:LEAVE_REQUESTS") };
                }

                if (resource === "performance_reviews" && action === "list") {
                  return { can: permissions.includes("VIEW:PERFORMANCE_REVIEWS") };
                }

                if (resource === "procurement" && action === "list") {
                  return { can: (permissions.includes("VIEW:SUPPLIERS") || permissions.includes("VIEW:PURCHASE_ORDERS") || permissions.includes("VIEW:GOODS_RECEIPTS"))};
                }

                if (resource === "suppliers" && action === "list") {
                  return { can: permissions.includes("VIEW:SUPPLIERS") };
                }

                if (resource === "purchase_orders" && action === "list") {
                  return { can: permissions.includes("VIEW:PURCHASE_ORDERS") };
                }

                if (resource === "goods_receipts" && action === "list") {
                  return { can: permissions.includes("VIEW:GOODS_RECEIPTS") };
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
                name: "warehouses",
                list: "warehouses",
                create: "warehouses/create",
                edit: "warehouses/edit/:id",
                meta: {
                  label: t("pages.sidebar.warehouses"),
                  icon: <ShopOutlined/>,
                }
              },
              {
                name: "products",
                list: "products",
                create: "products/create",
                edit: "products/edit/:id",
                show: "products/show/:id",
                meta: {
                  label: t("pages.sidebar.products"),
                  icon: <ProductOutlined/>,
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
                list: "/administrator/users",
                create: "/administrator/users/create",
                edit: "/administrator/users/edit/:id",
                meta: {
                  label: t("pages.sidebar.users"),
                  icon: <UserOutlined/>,
                  parent: "administrator"
                }
              },
              {
                name: "roles",
                list: "/administrator/roles",
                create: "/administrator/roles/create",
                edit: "/administrator/roles/edit/:id",
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
                edit: "/hr/employee/edit/:id",
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
                create: "/hr/positions/create",
                edit: "/hr/positions/edit/:id",
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
              },
              {
                name: "leave_requests",
                list: "/hr/leave_requests",
                create: "hr/leave_requests/create",
                meta: {
                  label: t("pages.sidebar.leave_requests"),
                  icon: <StopOutlined/>,
                  parent: "hr"
                }
              },
              {
                name: "performance_reviews",
                list: "/hr/performance_reviews",
                create: "/hr/performance_reviews/create",
                show: "/hr/performance_reviews/show/:id",
                meta: {
                  label: t("pages.sidebar.performance_reviews"),
                  icon: <DashboardOutlined/>,
                  parent: "hr"
                }
              },
              {
                name: "procurement",
                meta: {
                  label: t("pages.sidebar.procurement")
                }
              },
              {
                name: "suppliers",
                list: "/procurement/suppliers",
                create: "/procurement/suppliers/create",
                edit: "/procurement/suppliers/edit/:id",
                meta: {
                  label: t("pages.sidebar.suppliers"),
                  icon: <TruckOutlined/>,
                  parent: "procurement"
                }
              },
              {
                name: "purchase_orders",
                list: "/procurement/purchase_orders",
                create: "/procurement/purchase_orders/create",
                show: "/procurement/purchase_orders/show/:id",
                meta: {
                  label: t("pages.sidebar.purchase_orders"),
                  icon: <ShoppingCartOutlined/>,
                  parent: "procurement"
                }
              },
              {
                name: "goods_receipts",
                list: "/procurement/goods_receipts",
                create: "/procurement/goods_receipts/create",
                show: "/procurement/goods_receipts/show/:id",
                meta: {
                  label: t("pages.sidebar.goods_receipts"),
                  icon: <FileOutlined/>,
                  parent: "procurement"
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
                          padding: 16,
                          backgroundColor: mode === "light" ? "#eeeeeeff" : "#1f1f1f",
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

                <Route path="administrator">

                  <Route index element={<AdmininstartorMainPage/>}/>

                  <Route path="users">
                    <Route index element={<UserList/>}/>
                    <Route path="create" element={<UserCreate/>}/>
                    <Route path="edit/:id" element={<UserEdit/>}/>
                  </Route>

                  <Route path="roles">
                    <Route index element={<RoleList/>}/>
                    <Route path="create" element={<RoleCreate/>}/>
                    <Route path="edit/:id" element={<RoleEdit/>}/>
                  </Route>
                </Route>
                
                <Route path="hr">

                  <Route index element={<HRMainPage/>}/>

                  <Route path="employee">
                    <Route index element={<EmployeeList/>}/>
                    <Route path="create" element={<EmployeeCreate/>}/>
                    <Route path="edit/:id" element={<EmployeeEdit/>}/>
                  </Route>
                
                  <Route path="departments">
                    <Route index element={<DepartmentList/>}/>
                    <Route path="create" element={<DepartmentCreate/>}/>
                    <Route path="edit/:id" element={<DepartmentEdit/>}/>
                  </Route>

                  <Route path="positions">
                    <Route index element={<PositionList/>}/>
                    <Route path="create" element={<PositionCreate/>}/>
                    <Route path="edit/:id" element={<PositionEdit/>}/>
                  </Route>

                  <Route path="shifts">
                    <Route index element={<ShiftList/>}/>
                    <Route path="create" element={<ShiftCreate/>}/>
                    <Route path="edit/:id" element={<ShiftEdit/>}/>
                  </Route>

                  <Route path="work_schedules">
                    <Route index element={<WorkScheduleList/>}/>
                    <Route path="calendar" element={<WorkSchedulesCalendar/>}/>
                    <Route path="create" element={<WorkScheduleCreate/>}/>
                  </Route>

                  <Route path="leave_requests">
                    <Route index element={<LeaveRequestList/>}/>
                    <Route path="create" element={<LeaveRequestCreate/>}/>
                  </Route>

                  <Route path="performance_reviews">
                    <Route index element={<PerformanceReviewList/>}/>
                    <Route path="create" element={<PerformanceReviewCreate/>}/>
                    <Route path="show/:id" element={<PerformanceReviewShow/>}/>
                  </Route>
                </Route>

                <Route path="procurement">
                  <Route index element={<ProcurementMainPage/>}/>
                  <Route path="suppliers">
                    <Route index element={<SupplierList/>}/>
                    <Route path="create" element={<SupplierCreate/>}/>
                    <Route path="edit/:id" element={<SupplierEdit/>}/>
                  </Route>

                  <Route path="purchase_orders">
                    <Route index element={<PurchaseOrderList/>}/>
                    <Route path="create" element={<PurchaseOrderCreate/>}/>
                    <Route path="show/:id" element={<PurchaseOrderShow/>}/>
                  </Route>

                  <Route path="goods_receipts">
                    <Route index element={<GoodsReceiptList/>}/>
                    <Route path="create" element={<GoodsReceiptCreate/>}/>
                    <Route path="show/:id" element={<GoodsReceiptShow/>}/>
                  </Route>
                </Route>

                {/* <Route path="main"> */}
                <Route path="warehouses">
                  <Route index element={<WarehouseList/>}/>
                  <Route path="create" element={<WarehouseCreate/>}/>
                  <Route path="edit/:id" element={<WarehouseEdit/>}/>
                </Route>

                <Route path="products">
                  <Route index element={<ProductList/>}/>
                  <Route path="create" element={<ProductCreate/>}/>
                  <Route path="edit/:id" element={<ProductEdit/>}/>
                  <Route path="show/:id" element={<ProductShow/>}/>
                </Route>
                {/* </Route> */}

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