import React from "react";
import { Result, Button, Space, theme } from "antd";
import { useGo, useNavigation, useTranslation } from "@refinedev/core";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

interface CustomErrorComponentProps {
    status?: "403" | "404" | "500";
    errorMessage?: string;
}

export const CustomErrorComponent: React.FC<CustomErrorComponentProps> = ({ status, errorMessage }) => {
    const { translate } = useTranslation();
    const go = useGo();
    const navigate = useNavigate();
    const { token } = theme.useToken();

    const activeStatus = status || "404";

    let title = "404";
    let subTitle = translate("pages.error.404");

    if (activeStatus === "403") {
        title = "403";
        subTitle = errorMessage || translate("pages.error.403");
    } else if (activeStatus === "500") {
        title = "500";
        subTitle = translate("pages.error.500");
    }

    return (
      <Result
        status={activeStatus as any}
        title={title}
        subTitle={subTitle}
        extra={
          <Space size="middle">
            <Button 
                type="primary" 
                icon={<HomeOutlined />}
                onClick={() => navigate("/")}
            >
                {translate("pages.error.backHome",)}
            </Button>
          </Space>
        }
      />
    );
};