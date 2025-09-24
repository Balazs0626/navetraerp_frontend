import { useGetIdentity, usePermissions } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Row, Col, Card, Avatar, Typography, Space, Button, Divider, Select } from "antd";
import { HomeOutlined, FileTextOutlined, TruckOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { Column } from "@ant-design/plots";
import { useEffect } from "react";
import { useTranslation } from "@refinedev/core";

const { Text, Title } = Typography;

export const DashboardPage: React.FC = () => {

  const { translate } = useTranslation();

  useEffect(() => {
      document.title = "NavetraERP - Kezdőlap";
  })

  const { data: identity } = useGetIdentity<{ name: string }>();
  const { data: permissions, isLoading } = usePermissions<string[]>({});

  console.log(permissions);

  const navigate = useNavigate();

  return (
    <div style={{ padding: 24, height: "100vh" }}>
      <Row gutter={[24, 24]} align="middle">
        <Col span={12}>
          <Card style={{ borderRadius: 16 }}>
            <Space size="large" align="center">
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  {translate("pages.dashboard.welcome")}, {identity?.name}!
                </Title>
                <Text type="secondary">{translate("pages.dashboard.welcome_message")}:</Text>
              </div>
            </Space>
          </Card>
        </Col>

        <Col span={12}>
          <Card style={{ borderRadius: 16 }}>
            <Space size="large" align="center">
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  Aktív felhasználók:
                </Title>
                <Text type="secondary">teszt</Text>
              </div>
            </Space>
          </Card>
        </Col>

        {permissions?.includes("read:user") && (
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{ borderRadius: 12, height: 180 }}
              onClick={() => navigate("/daily-reports")}
            >
              <Space direction="vertical" align="center" style={{ width: "100%", marginTop: 16 }}>
                <FileTextOutlined style={{ fontSize: 32 }} />
                <Text strong>Napi jelentések</Text>
                <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                  Jelentések rögzítése, szerkesztése, listázása
                </Text>
              </Space>
            </Card>
          </Col>
        )}
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 12 }} align="middle">
        <div style={{ width: "100%", border: "1px solid #aaaaaa", borderRadius: 16, padding: 24, margin: 12 }}>
          <Title level={2}>Adminisztrátor modul</Title>
          <Divider />
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card 
              hoverable
              style={{ borderRadius: 12, height: 180 }}
              onClick={() => navigate("/users/create")}
            >
              <Space direction="vertical" align="center" style={{ width: "100%", marginTop: 16 }}>
                <UserOutlined style={{ fontSize: 32 }} />
                <Text strong>Felhasználók</Text>
                <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                  Felhasználók listázása, módosítása, törlése
                </Text>
              </Space>
            </Card>
          </Col>
        </div>
      </Row>
    </div>
  );
};
