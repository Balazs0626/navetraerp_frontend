import { useTranslation, usePermissions } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Row, Col, Card, Typography, Space, Collapse, Tabs } from "antd";
import { UserOutlined, GroupOutlined, ClusterOutlined, ClockCircleOutlined, CalendarOutlined, StopOutlined, DashboardOutlined, BankOutlined, ProductOutlined, ShopOutlined, TruckOutlined, ShoppingCartOutlined, FileOutlined, OrderedListOutlined, ExportOutlined, AppstoreAddOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { TabsProps } from "antd/lib";
import { ProductionOrderBar } from "../../components/diagrams/ProductionOrderBar";

const { Text } = Typography;

export const ProductionMainPage = () => {

  const { translate } = useTranslation();

  useEffect(() => {
      document.title = translate("pages.dashboard.production_module.title");
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
      title: translate("pages.production_orders.list.title"),
      icon: <AppstoreAddOutlined />,
      content: <ProductionOrderBar/>,
      permission: "VIEW:PRODUCTION_ORDERS",
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
      title={translate("pages.dashboard.production_module.title")}
      type="inner"
    >
      <Row gutter={[24, 24]}>

        <Col xs={24} lg={12}>
          <Card 
            hoverable={permissions?.includes("VIEW:PRODUCTION_ORDERS")}
            style={{ 
              borderRadius: 12,
              cursor: permissions?.includes("VIEW:PRODUCTION_ORDERS") ? "pointer" : "not-allowed", 
              filter: permissions?.includes("VIEW:PRODUCTION_ORDERS") ? "none" : "opacity(50%)"
            }}
            onClick={() => permissions?.includes("VIEW:PRODUCTION_ORDERS") ? navigate("/production/production_orders") : undefined}
          >
            <Space direction="horizontal">
              <AppstoreAddOutlined style={{ fontSize: 48 }} />
              <Space direction="vertical" style={{gap: 1}}>
                <Text strong>{translate("pages.dashboard.production_module.production_orders")}</Text>
                <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                  {translate("pages.dashboard.production_module.production_orders_description")}
                </Text>
              </Space>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            hoverable={permissions?.includes("VIEW:PRODUCTION_OUTPUTS")}
            style={{ 
              borderRadius: 12,
              cursor: permissions?.includes("VIEW:PRODUCTION_OUTPUTS") ? "pointer" : "not-allowed", 
              filter: permissions?.includes("VIEW:PRODUCTION_OUTPUTS") ? "none" : "opacity(50%)"
            }}
            onClick={() => permissions?.includes("VIEW:PRODUCTION_OUTPUTS") ? navigate("/production/production_outputs") : undefined}
          >
            <Space direction="horizontal">
              <ExportOutlined style={{ fontSize: 48 }} />
              <Space direction="vertical" style={{gap: 1}}>
                <Text strong>{translate("pages.dashboard.production_module.production_outputs")}</Text>
                <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                  {translate("pages.dashboard.production_module.production_outputs_description")}
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
