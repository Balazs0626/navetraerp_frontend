import { useTranslation, usePermissions } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Row, Col, Card, Typography, Space, Collapse, Tabs, TabsProps } from "antd";
import { UserOutlined, GroupOutlined, ClusterOutlined, ClockCircleOutlined, CalendarOutlined, StopOutlined, DashboardOutlined, BankOutlined, ProductOutlined, ShopOutlined, TruckOutlined, ShoppingCartOutlined, FileOutlined, SolutionOutlined, FileTextOutlined, FileProtectOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { SalesOrderTrendArea } from "../../components/diagrams/SalesOrderTrendArea";

const { Text } = Typography;

export const SalesMainPage = () => {

  const { translate } = useTranslation();

  useEffect(() => {
      document.title = translate("pages.dashboard.sales_module.title");
  })
  const { data: permissions } = usePermissions<string[]>({});

  const navigate = useNavigate();

  const hasAccess = (requiredPerm: string) => {
    if (!requiredPerm) return true; 
    return permissions?.includes(requiredPerm);
  };

  const panelsData = [
    {
      key: "1",
      title: translate("pages.sales_orders.list.title"),
      icon: <FileTextOutlined />,
      content: <SalesOrderTrendArea/>,
      permission: "VIEW:SALES_ORDERS",
    }
  ];

  const collapseItems = panelsData.map((panel: any) => {
    const accessible = hasAccess(panel.permission);

    return {
      key: panel.key,
      label: accessible ? (
        <span>{panel.icon} {panel.title}</span>
      ) : (
        <span style={{ color: "gray" }}>
          <LockOutlined /> {panel.title}
        </span>
      ),
      children: panel.content,
      collapsible: accessible ? "header" : "disabled",
    };
  });

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Modul",
      children: <Card
      style={{
        margin: 12
      }}
      title={translate("pages.dashboard.sales_module.title")}
      type="inner"
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            hoverable={permissions?.includes("VIEW:CUSTOMERS")}
            style={{ 
              borderRadius: 12,
              cursor: permissions?.includes("VIEW:CUSTOMERS") ? "pointer" : "not-allowed", 
              filter: permissions?.includes("VIEW:CUSTOMERS") ? "none" : "opacity(50%)"
            }}
            onClick={() => permissions?.includes("VIEW:CUSTOMERS") ? navigate("/sales/customers") : undefined}
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
            hoverable={permissions?.includes("VIEW:SALES_ORDERS")}
            style={{ 
              borderRadius: 12,
              cursor: permissions?.includes("VIEW:SALES_ORDERS") ? "pointer" : "not-allowed", 
              filter: permissions?.includes("VIEW:SALES_ORDERS") ? "none" : "opacity(50%)"
            }}
            onClick={() => permissions?.includes("VIEW:SALES_ORDERS") ? navigate("/sales/sales_orders") : undefined}
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
            hoverable={permissions?.includes("VIEW:INVOICES")}
            style={{ 
              borderRadius: 12,
              cursor: permissions?.includes("VIEW:INVOICES") ? "pointer" : "not-allowed", 
              filter: permissions?.includes("VIEW:INVOICES") ? "none" : "opacity(50%)"
            }}
            onClick={() => permissions?.includes("VIEW:INVOICES") ? navigate("/sales/invoices") : undefined}
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
    },
    {
      key: "2",
      label: "Diagramok",
      children: <Collapse items={collapseItems as any} bordered={false} />,
    },
    
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} type="card"/>
  );
};
