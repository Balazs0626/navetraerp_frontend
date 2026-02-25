import type { RefineThemedLayoutHeaderProps } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Select,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";
import React, { useContext, useEffect } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/hu";
import "dayjs/locale/en";
import { GlobalOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutHeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgContainer,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "16px",
    padding: "0px 24px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  const { t, i18n } = useTranslation();

  return (
    <AntdLayout.Header style={headerStyles}>
        <Select
          value={i18n.language}
          style={{ width: 120 }}
          onChange={(value) => {
            i18n.changeLanguage(value)
            localStorage.setItem("locale", value)
            dayjs.locale(value);

          }}
          options={[
            { label: "🇭🇺 Magyar", value: "hu" },
            { label: "🇬🇧 English", value: "en" },
          ]}
        />
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />
        <Space style={{ marginLeft: "8px" }} size="middle">
          {user?.name && <Text strong>{user.name}</Text>}
        </Space>
    </AntdLayout.Header>
  );
};
