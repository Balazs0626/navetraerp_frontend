import React, { useState } from "react";
import { Layout, theme } from "antd";
import { CustomSider } from "../sider";
import { ThemedSider } from "@refinedev/antd";

export const CustomLayout: React.FC<{ children: React.ReactNode; Header?: React.FC }> = ({ children, Header }) => {

  const [collapsed, setCollapsed] = useState(false);

  const { token } = theme.useToken();

  const siderWidth = collapsed ? "80px" : "240px";

  return (
      <Layout hasSider style={{ minHeight: "100vh" }}>
        <CustomSider collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout style={{ marginLeft: siderWidth, transition: "all 0.2s", backgroundColor: token.colorBgLayout }}>
          {Header && <Header />}
          <Layout.Content style={{ padding: "24px" }}>
              {children}
          </Layout.Content>
        </Layout>
      </Layout>
  );
};