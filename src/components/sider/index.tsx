import React, { useState, useEffect } from "react";
import { useMenu, useLogout, useTranslate, usePermissions } from "@refinedev/core";
import { Layout, Menu, Button, theme, MenuProps } from "antd";
import { 
    MenuUnfoldOutlined, 
    MenuFoldOutlined, 
    LogoutOutlined, 
    UnorderedListOutlined 
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export const CustomSider = ({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (val: boolean) => void }) => {
    // A useMenu hívja meg a háttérben az accessControlProvider-t!
    const { menuItems, selectedKey } = useMenu();
    const { token } = theme.useToken();
    const { mutate: logout } = useLogout();
    const translate = useTranslate();

    const { data: permissionsData } = usePermissions<string[]>({});

    const [openKeys, setOpenKeys] = useState<string[]>([]);

    // --- DEBUG: Nézzük meg, mit ad vissza a useMenu! ---
    useEffect(() => {
        if (menuItems.length > 0) {
            console.log("CustomSider - Nyers menü elemek (Refine-tól):", menuItems);
        }
    }, [menuItems]);
    // --------------------------------------------------

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        const rootKeys = menuItems
            .filter((item) => item.children && item.children.length > 0)
            .map((item) => item.key);

        if (latestOpenKey && rootKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

const renderMenuItems = (items: any[]): MenuItem[] => {
        return items.map((item) => {
            // --- KÉZI JOGOSULTSÁG ELLENŐRZÉS ---
            // Itt manuálisan megnézzük, hogy a usernek van-e joga ehhez a menüponthoz.
            // Ez feltételezi, hogy a route neve (pl. "users") és a jog (VIEW:USERS) összeköthető.
            
            // Ha nincs még betöltve a jog, ne mutassunk semmit
            if (!permissionsData) return null;

            // 1. Megnézzük, mi ennek az elemnek a resource neve (pl. "warehouses")
            const resourceName = item.name || item.key; 

            // 2. Keresünk hozzá illő jogot a listában
            // Pl: Ha a resource "warehouses", akkor keresünk "VIEW:WAREHOUSES"-t
            const neededPermission = resourceName.toString() === "employee" ? `VIEW:EMPLOYEES` : `VIEW:${resourceName.toString().toUpperCase()}`;
            
            // 3. Van-e ilyen joga a usernek? (Kivéve a dashboardot, ami "/" vagy root)
            const hasPermission = 
                resourceName === "dashboard" || 
                resourceName === "/" ||
                permissionsData.includes(neededPermission);

            // Szülő elemek (pl. "hr", "administrator") kezelése:
            // Ha ez egy csoport, akkor engedjük tovább, majd a gyerekeknél eldől, marad-e benne valami.
            const isParent = item.children && item.children.length > 0;

            if (!isParent && !hasPermission) {
                return null; // TILTÁS: Ha nem szülő és nincs joga -> KUKA
            }
            // -------------------------------------

            const { route, label, icon, children, key } = item;
            const displayIcon = icon || <UnorderedListOutlined />;

            if (children && children.length > 0) {
                const filteredChildren = renderMenuItems(children);

                if (filteredChildren.length === 0) {
                    return null;
                }

                return {
                    key: key,
                    icon: displayIcon,
                    label: label,
                    children: filteredChildren,
                } as MenuItem;
            }

            return {
                key: route || key,
                icon: displayIcon,
                label: <Link to={route ?? "/"}>{label}</Link>,
            } as MenuItem;
        })
        .filter(Boolean) as MenuItem[];
    };

    // A menüpontok összeállítása + a kijelentkezés "menüpont" hozzáadása
    const allMenuItems: MenuItem[] = [
        ...renderMenuItems(menuItems),
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: translate("buttons.logout"),
            onClick: () => logout(),
            danger: true,
        } as MenuItem
    ];

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            trigger={null}
            width={240}
            collapsedWidth={80}
            style={{
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 1001,
                backgroundColor: token.colorBgContainer,
                borderRight: `1px solid ${token.colorBorderSecondary}`,
            }}
        >
            {/* Logo rész */}
            <div style={{ height: "64px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img src="/src/icons/logo.png" style={{ height: 24 }} alt="Logo" />
                {!collapsed && <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 16 }}>NavetraERP</span>}
            </div>

            {/* Görgethető Menü rész */}
            <div style={{ height: "calc(100vh - 128px)", overflowY: "auto", overflowX: "hidden" }}>
              <Menu
                  selectedKeys={[selectedKey]}
                  mode="inline"
                  {...(collapsed ? {} : { openKeys, onOpenChange })}
                  items={allMenuItems}
                  style={{ borderRight: 0 }}
                  inlineIndent={collapsed ? 0 : 24} 
              />
            </div>

            {/* Fix Összecsukó gomb az alján */}
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    width: "100%",
                    height: 64,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    borderRadius: 0,
                    borderTop: `1px solid ${token.colorBorderSecondary}`,
                    backgroundColor: token.colorBgContainer,
                }}
            />
        </Sider>
    );
};