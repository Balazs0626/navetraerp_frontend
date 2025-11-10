import { useTranslation, usePermissions } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Row, Col, Card, Typography, Space } from "antd";
import { UserOutlined, GroupOutlined, ClusterOutlined, ClockCircleOutlined, CalendarOutlined, StopOutlined, DashboardOutlined, BankOutlined, ProductOutlined, ShopOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Text } = Typography;

export const ProcurementMainPage = () => {

  const { translate } = useTranslation();

  useEffect(() => {
      document.title = translate("pages.dashboard.procurement_module.title");
  })
  const { data: permissions } = usePermissions<string[]>({});

  const navigate = useNavigate();

  return (
    <Card
      style={{
        margin: 12
      }}
      title={translate("pages.dashboard.procurement_module.title")}
      type="inner"
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            hoverable={permissions?.includes("VIEW:EMPLOYEES")}
            style={{ 
              borderRadius: 12,
              cursor: permissions?.includes("VIEW:EMPLOYEES") ? "pointer" : "not-allowed", 
              filter: permissions?.includes("VIEW:EMPLOYEES") ? "none" : "opacity(50%)"
            }}
            onClick={() => permissions?.includes("VIEW:EMPLOYEES") ? navigate("/main/warehouses") : undefined}
          >
            <Space direction="horizontal">
              <ShopOutlined style={{ fontSize: 48 }} />
              <Space direction="vertical" style={{gap: 1}}>
                <Text strong>{translate("pages.dashboard.")}</Text>
                <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                  {translate("pages.dashboard.")}
                </Text>
              </Space>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
              hoverable={permissions?.includes("VIEW:EMPLOYEES")}
              style={{ 
                borderRadius: 12,
                cursor: permissions?.includes("VIEW:EMPLOYEES") ? "pointer" : "not-allowed", 
                filter: permissions?.includes("VIEW:EMPLOYEES") ? "none" : "opacity(50%)"
              }}
              onClick={() => permissions?.includes("VIEW:EMPLOYEES") ? navigate("/main/products") : undefined}
            >
              <Space direction="horizontal">
                <ProductOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.")}
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
      </Row>
    </Card>
  );
};
