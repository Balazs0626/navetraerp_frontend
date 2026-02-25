import { useTranslation, usePermissions } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Row, Col, Card, Typography, Space, TabsProps, Collapse, Tabs, FloatButton } from "antd";
import { UserOutlined, GroupOutlined, ClusterOutlined, ClockCircleOutlined, CalendarOutlined, StopOutlined, DashboardOutlined, BankOutlined, ProductOutlined, ShopOutlined, TruckOutlined, ShoppingCartOutlined, FileOutlined, LockOutlined, RobotOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { PurchaseLeadTimeColumn } from "../../components/diagrams/PurchaseLeadTimeColumn";
import { AiAssistantDrawer } from "../../components/ai";

const { Text } = Typography;

export const ProcurementMainPage = () => {

  const { translate } = useTranslation();

  useEffect(() => {
      document.title = translate("pages.dashboard.procurement_module.title");
  })
  const { data: permissions } = usePermissions<string[]>({});

  const navigate = useNavigate();

  const [isAiOpen, setIsAiOpen] = useState(false);

  const hasAccess = (requiredPerm: string) => {
    if (!requiredPerm) return true; 
    return permissions?.includes(requiredPerm);
  };

  const panelsData = [
    {
      key: "1",
      title: translate("pages.purchase_orders.list.title"),
      icon: <ShoppingCartOutlined />,
      content: <PurchaseLeadTimeColumn/>,
      permission: "VIEW:PURCHASE_ORDERS",
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
      children:     <Card
      style={{
        margin: 12
      }}
      title={translate("pages.dashboard.procurement_module.title")}
      type="inner"
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            hoverable={permissions?.includes("VIEW:SUPPLIERS")}
            style={{ 
              borderRadius: 12,
              cursor: permissions?.includes("VIEW:SUPPLIERS") ? "pointer" : "not-allowed", 
              filter: permissions?.includes("VIEW:SUPPLIERS") ? "none" : "opacity(50%)"
            }}
            onClick={() => permissions?.includes("VIEW:SUPPLIERS") ? navigate("/procurement/suppliers") : undefined}
          >
            <Space direction="horizontal">
              <TruckOutlined style={{ fontSize: 48 }} />
              <Space direction="vertical" style={{gap: 1}}>
                <Text strong>{translate("pages.dashboard.procurement_module.suppliers")}</Text>
                <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                  {translate("pages.dashboard.procurement_module.suppliers_description")}
                </Text>
              </Space>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            hoverable={permissions?.includes("VIEW:PURCHASE_ORDERS")}
            style={{ 
              borderRadius: 12,
              cursor: permissions?.includes("VIEW:PURCHASE_ORDERS") ? "pointer" : "not-allowed", 
              filter: permissions?.includes("VIEW:PURCHASE_ORDERS") ? "none" : "opacity(50%)"
            }}
            onClick={() => permissions?.includes("VIEW:PURCHASE_ORDERS") ? navigate("/procurement/purchase_orders") : undefined}
          >
            <Space direction="horizontal">
              <ShoppingCartOutlined style={{ fontSize: 48 }} />
              <Space direction="vertical" style={{gap: 1}}>
                <Text strong>{translate("pages.dashboard.procurement_module.purchase_orders")}</Text>
                <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                  {translate("pages.dashboard.procurement_module.purchase_orders_description")}
                </Text>
              </Space>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            hoverable={permissions?.includes("VIEW:GOODS_RECEIPTS")}
            style={{ 
              borderRadius: 12,
              cursor: permissions?.includes("VIEW:GOODS_RECEIPTS") ? "pointer" : "not-allowed", 
              filter: permissions?.includes("VIEW:GOODS_RECEIPTS") ? "none" : "opacity(50%)"
            }}
            onClick={() => permissions?.includes("VIEW:GOODS_RECEIPTS") ? navigate("/procurement/goods_receipts") : undefined}
          >
            <Space direction="horizontal">
              <FileOutlined style={{ fontSize: 48 }} />
              <Space direction="vertical" style={{gap: 1}}>
                <Text strong>{translate("pages.dashboard.procurement_module.goods_receipts")}</Text>
                <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                  {translate("pages.dashboard.procurement_module.goods_receipts")}
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
    <>
      <Tabs defaultActiveKey="1" items={items} type="card"/>
      <FloatButton
          icon={<RobotOutlined />}
          type="primary"
          style={{ right: 24, bottom: 24, width: 64, height: 64 }}
          onClick={() => setIsAiOpen(true)}
          tooltip={<div>{translate("ai.assistant")}</div>}
      />

      <AiAssistantDrawer 
          open={isAiOpen} 
          onClose={() => setIsAiOpen(false)}
          module="procurement" 
      />
    </>
  );

};
