import { useTranslation, usePermissions, useList, useSelect } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Row, Col, Card, Typography, Space, Skeleton, Select, Empty, Divider, theme, Collapse, CollapseProps, Tabs, FloatButton } from "antd";
import { UserOutlined, GroupOutlined, ClusterOutlined, ClockCircleOutlined, CalendarOutlined, StopOutlined, DashboardOutlined, BankOutlined, ProductOutlined, ShopOutlined, TruckOutlined, ShoppingCartOutlined, FileOutlined, OrderedListOutlined, AppstoreOutlined, DragOutlined, LockOutlined, InfoCircleFilled, RightOutlined, DollarOutlined, StockOutlined, RobotFilled, RobotOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { Area, Bar, Column } from "@ant-design/plots";
import { useSimpleList } from "@refinedev/antd";
import { IInventoryItems, IStockMovements } from "../../interfaces";
import { WarehouseSelect } from "../../components/WarehouseSelect";
import Panel from "antd/lib/splitter/Panel";
import dayjs from "dayjs";
import { StockColumn } from "../../components/diagrams/StockColumn";
import { StockMovementArea } from "../../components/diagrams/StockMovementArea";
import { TabsProps } from "antd/lib";
import { AiAssistantDrawer } from "../../components/ai";

const { Text } = Typography;

export const InventoryMainPage = () => {

  const { translate } = useTranslation();

  const [isAiOpen, setIsAiOpen] = useState(false);

  useEffect(() => {
      document.title = translate("pages.dashboard.inventory_module.title");
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
      title: translate("pages.inventory_items.list.title"),
      icon: <AppstoreOutlined />,
      content: <StockColumn/>,
      permission: "VIEW:INVENTORY_ITEMS",
    },
    {
      key: "2",
      title: translate("pages.stock_movements.list.title"),
      icon: <DragOutlined />,
      content: <StockMovementArea/>,
      permission: "VIEW:STOCK_MOVEMENTS",
    },
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
      label: translate("titles.sub_modules"),
      children: <Card
        title={translate("pages.dashboard.inventory_module.title")}
        type="inner"
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card 
              hoverable={permissions?.includes("VIEW:INVENTORY_ITEMS")}
              style={{ 
                borderRadius: 12,
                cursor: permissions?.includes("VIEW:INVENTORY_ITEMS") ? "pointer" : "not-allowed", 
                filter: permissions?.includes("VIEW:INVENTORY_ITEMS") ? "none" : "opacity(50%)"
              }}
              onClick={() => permissions?.includes("VIEW:INVENTORY_ITEMS") ? navigate("/inventory/inventory_items") : undefined}
            >
              <Space direction="horizontal">
                <AppstoreOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.inventory_module.inventory_items")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.inventory_module.inventory_items_description")}
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              hoverable={permissions?.includes("VIEW:STOCK_MOVEMENTS")}
              style={{ 
                borderRadius: 12,
                cursor: permissions?.includes("VIEW:STOCK_MOVEMENTS") ? "pointer" : "not-allowed", 
                filter: permissions?.includes("VIEW:STOCK_MOVEMENTS") ? "none" : "opacity(50%)"
              }}
              onClick={() => permissions?.includes("VIEW:STOCK_MOVEMENTS") ? navigate("/inventory/stock_movements") : undefined}
            >
              <Space direction="horizontal">
                <DragOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.inventory_module.stock_movements")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.inventory_module.stock_movements_description")}
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              hoverable={permissions?.includes("VIEW:INVENTORY_COUNTS")}
              style={{ 
                borderRadius: 12,
                cursor: permissions?.includes("VIEW:INVENTORY_COUNTS") ? "pointer" : "not-allowed", 
                filter: permissions?.includes("VIEW:INVENTORY_COUNTS") ? "none" : "opacity(50%)"
              }}
              onClick={() => permissions?.includes("VIEW:INVENTORY_COUNTS") ? navigate("/inventory/inventory_counts") : undefined}
            >
              <Space direction="horizontal">
                <OrderedListOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.inventory_module.inventory_counts")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.inventory_module.inventory_counts_description")}
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              hoverable={permissions?.includes("VIEW:DELIVERY_NOTES")}
              style={{ 
                borderRadius: 12,
                cursor: permissions?.includes("VIEW:DELIVERY_NOTES") ? "pointer" : "not-allowed", 
                filter: permissions?.includes("VIEW:DELIVERY_NOTES") ? "none" : "opacity(50%)"
              }}
              onClick={() => permissions?.includes("VIEW:DELIVERY_NOTES") ? navigate("/inventory/delivery_notes") : undefined}
            >
              <Space direction="horizontal">
                <TruckOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.inventory_module.delivery_notes")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.inventory_module.delivery_notes_description")}
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>,
    },
    {
      key: "2",
      label: translate("titles.diagrams"),
      children: <Collapse items={collapseItems as any} bordered={false} />,
    },
    
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items}/>
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
          module="inventory" 
      />
      {/* <Collapse items={collapseItems as any} bordered={false} />
      <Divider/>
      <Card
        title={translate("pages.dashboard.inventory_module.title")}
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
              onClick={() => permissions?.includes("VIEW:EMPLOYEES") ? navigate("/inventory/inventory_items") : undefined}
            >
              <Space direction="horizontal">
                <AppstoreOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.inventory_module.inventory_items")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.inventory_module.inventory_items_description")}
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
              onClick={() => permissions?.includes("VIEW:EMPLOYEES") ? navigate("/inventory/stock_movements") : undefined}
            >
              <Space direction="horizontal">
                <DragOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.inventory_module.stock_movements")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.inventory_module.stock_movements_description")}
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
              onClick={() => permissions?.includes("VIEW:EMPLOYEES") ? navigate("/inventory/inventory_counts") : undefined}
            >
              <Space direction="horizontal">
                <OrderedListOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.inventory_module.inventory_counts")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.inventory_module.inventory_counts_description")}
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card> */}
    </>
  );
};
