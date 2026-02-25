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
    const { menuItems, selectedKey } = useMenu();
    const { token } = theme.useToken();
    const { mutate: logout } = useLogout();
    const translate = useTranslate();

    const { data: permissionsData } = usePermissions<string[]>({});

    const [openKeys, setOpenKeys] = useState<string[]>([]);

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

            if (!permissionsData) return null;

            const resourceName = item.name || item.key; 

            //idg a machine
            const neededPermission = (resourceName.toString() === "employee" || resourceName.toString() === "machines") ? `VIEW:EMPLOYEES` : `VIEW:${resourceName.toString().toUpperCase()}`;
            
            const hasPermission = 
                resourceName === "dashboard" || 
                resourceName === "/" ||
                permissionsData.includes(neededPermission);

            const isParent = item.children && item.children.length > 0;

            if (!isParent && !hasPermission) {
                return null;
            }

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
            <div style={{ height: "64px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img src="/src/icons/logo.png" style={{ height: 24 }} alt="Logo" />
                {!collapsed && <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 16 }}>NavetraERP</span>}
            </div>

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