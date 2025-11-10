import { useTranslation, usePermissions } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Row, Col, Card, Typography, Space } from "antd";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Text } = Typography;

export const AdmininstartorMainPage = () => {

  const { translate } = useTranslation();

  useEffect(() => {
      document.title = translate("pages.dashboard.administrator_module.title");
  })
  const { data: permissions } = usePermissions<string[]>({});

  const navigate = useNavigate();

  return (
    <Card
      style={{
        margin: 12
      }}
      title={translate("pages.dashboard.administrator_module.title")}
      type="inner"
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            hoverable={permissions?.includes("VIEW:USERS")}
            style={{ 
              borderRadius: 12,
              cursor: permissions?.includes("VIEW:USERS") ? "pointer" : "not-allowed", 
              filter: permissions?.includes("VIEW:USERS") ? "none" : "opacity(50%)"
            }}
            onClick={() => permissions?.includes("VIEW:USERS") ? navigate("users") : undefined}
          >
            <Space direction="horizontal">
              <UserOutlined style={{ fontSize: 48 }} />
              <Space direction="vertical" style={{gap: 1}}>
                <Text strong>{translate("pages.dashboard.administrator_module.users")}</Text>
                <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                  {translate("pages.dashboard.administrator_module.users_description")}
                </Text>
              </Space>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            hoverable={permissions?.includes("VIEW:ROLES")}
            style={{ 
              borderRadius: 12,
              cursor: permissions?.includes("VIEW:ROLES") ? "pointer" : "not-allowed", 
              filter: permissions?.includes("VIEW:ROLES") ? "none" : "opacity(50%)"
            }}
            onClick={() => permissions?.includes("VIEW:ROLES") ? navigate("roles") : undefined}
          >
            <Space direction="horizontal">
              <SettingOutlined style={{ fontSize: 48 }} />
              <Space direction="vertical" style={{gap: 1}}>
                <Text strong>{translate("pages.dashboard.administrator_module.roles")}</Text>
                <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                  {translate("pages.dashboard.administrator_module.roles_description")}
                </Text>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
