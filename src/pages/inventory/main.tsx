import { useTranslation, usePermissions } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Row, Col, Card, Typography, Space } from "antd";
import { UserOutlined, GroupOutlined, ClusterOutlined, ClockCircleOutlined, CalendarOutlined, StopOutlined, DashboardOutlined, BankOutlined, ProductOutlined, ShopOutlined, TruckOutlined, ShoppingCartOutlined, FileOutlined, OrderedListOutlined, AppstoreOutlined, DragOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Text } = Typography;

export const InventoryMainPage = () => {

  const { translate } = useTranslation();

  useEffect(() => {
      document.title = translate("pages.dashboard.inventory_module.title");
  })
  const { data: permissions } = usePermissions<string[]>({});

  const navigate = useNavigate();

  return (
    <Card
      style={{
        margin: 12
      }}
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
    </Card>
  );
};
