import { useTranslation, usePermissions } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Row, Col, Card, Typography, Space } from "antd";
import { UserOutlined, GroupOutlined, ClusterOutlined, ClockCircleOutlined, CalendarOutlined, StopOutlined, DashboardOutlined, BankOutlined, ProductOutlined, ShopOutlined, TruckOutlined, ShoppingCartOutlined, FileOutlined, SolutionOutlined, FileTextOutlined, FileProtectOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Text } = Typography;

export const SalesMainPage = () => {

  const { translate } = useTranslation();

  useEffect(() => {
      document.title = translate("pages.dashboard.sales_module.title");
  })
  const { data: permissions } = usePermissions<string[]>({});

  const navigate = useNavigate();

  return (
    <Card
      style={{
        margin: 12
      }}
      title={translate("pages.dashboard.sales_module.title")}
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
            onClick={() => permissions?.includes("VIEW:EMPLOYEES") ? navigate("/sales/customers") : undefined}
          >
            <Space direction="horizontal">
              <SolutionOutlined style={{ fontSize: 48 }} />
              <Space direction="vertical" style={{gap: 1}}>
                <Text strong>{translate("pages.dashboard.sales_module.customers")}</Text>
                <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                  {translate("pages.dashboard.sales_module.customers_description")}
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
            onClick={() => permissions?.includes("VIEW:EMPLOYEES") ? navigate("/sales/sales_orders") : undefined}
          >
            <Space direction="horizontal">
              <FileTextOutlined style={{ fontSize: 48 }} />
              <Space direction="vertical" style={{gap: 1}}>
                <Text strong>{translate("pages.dashboard.sales_module.sales_orders")}</Text>
                <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                  {translate("pages.dashboard.sales_module.sales_orders_description")}
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
            onClick={() => permissions?.includes("VIEW:EMPLOYEES") ? navigate("/sales/invoices") : undefined}
          >
            <Space direction="horizontal">
              <FileProtectOutlined style={{ fontSize: 48 }} />
              <Space direction="vertical" style={{gap: 1}}>
                <Text strong>{translate("pages.dashboard.sales_module.invoices")}</Text>
                <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                  {translate("pages.dashboard.sales_module.invoices_description")}
                </Text>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
