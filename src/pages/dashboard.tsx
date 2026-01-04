import { useCustom, useGetIdentity, usePermissions } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Row, Col, Card, Avatar, Typography, Space, Button, Divider, Select } from "antd";
import { HomeOutlined, FileTextOutlined, TruckOutlined, UserOutlined, SettingOutlined, GroupOutlined, ClusterOutlined, ClockCircleOutlined, CalendarOutlined, StopOutlined, DashboardOutlined, SafetyOutlined, TeamOutlined, ShoppingCartOutlined, ShopOutlined, ProductOutlined, DollarOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { Column } from "@ant-design/plots";
import { act, useEffect, useState } from "react";
import { useTranslation } from "@refinedev/core";
import {API_URL} from "../constants/url";
import axios from "axios";

const { Text, Title } = Typography;

export const DashboardPage = () => {

  const { translate } = useTranslation();

  useEffect(() => {
      document.title = translate("pages.dashboard.title");
  })

  const { data: identity } = useGetIdentity<{ name: string }>();
  const { data: permissions, isLoading } = usePermissions<string[]>({});

  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/users/active_users`)
        .then(response => {
            setActiveUsers(response.data);
        })
        .catch(error => {
            console.error("Hiba az adatok lekérésekor:", error);
        });
  }, []);

  const navigate = useNavigate();

  return (
    <div style={{ padding: 24, height: "100%" }}>
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
                  {translate("pages.dashboard.active_users")}: {activeUsers || 0}
                </Title>
                <Text type="secondary">&nbsp;</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 12 }} align="middle">
        <Card
          style={{
            width: "100%",
            margin: 12,
          }}
          title={translate("pages.dashboard.main")}
          type="inner"        
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card 
                hoverable={permissions?.includes("VIEW:WAREHOUSES")}
                style={{ 
                  borderRadius: 12,
                  cursor: permissions?.includes("VIEW:WAREHOUSES") ? "pointer" : "not-allowed", 
                  filter: permissions?.includes("VIEW:WAREHOUSES") ? "none" : "opacity(50%)"
                }}
                onClick={() => permissions?.includes("VIEW:WAREHOUSES") ? navigate("warehouses") : undefined}
              >
                <Space direction="horizontal">
                  <ShopOutlined style={{ fontSize: 48 }} />
                  <Space direction="vertical" style={{gap: 1}}>
                    <Text strong>{translate("pages.dashboard.warehouses.title")}</Text>
                    <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                      {translate("pages.dashboard.warehouses.description")}
                    </Text>
                  </Space>
                </Space>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card 
                  hoverable={permissions?.includes("VIEW:PRODUCTS")}
                  style={{ 
                    borderRadius: 12,
                    cursor: permissions?.includes("VIEW:PRODUCTS") ? "pointer" : "not-allowed", 
                    filter: permissions?.includes("VIEW:PRODUCTS") ? "none" : "opacity(50%)"
                  }}
                  onClick={() => permissions?.includes("VIEW:PRODUCTS") ? navigate("products") : undefined}
                >
                  <Space direction="horizontal">
                    <ProductOutlined style={{ fontSize: 48 }} />
                    <Space direction="vertical" style={{gap: 1}}>
                      <Text strong>{translate("pages.dashboard.products.title")}</Text>
                      <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                        {translate("pages.dashboard.products.description")}
                      </Text>
                    </Space>
                  </Space>
                </Card>
              </Col>
          </Row>
        </Card>
      </Row>

        <Row gutter={[24, 24]} style={{ marginTop: 12 }} align="middle">
{/*           <div style={{ width: "100%", border: "1px solid #aaaaaa", borderRadius: 16, padding: 24, margin: 12 }}>
            <Title level={2}>{translate("pages.dashboard.modules")}</Title>

            <Divider /> */}
            <Card
              style={{
                width: "100%",
                margin: 12,
              }}
              title={translate("pages.dashboard.modules")}
              type="inner"
            >
              <Row gutter={[24, 24]}>
                {(permissions?.includes("VIEW:USERS") || 
                permissions?.includes("VIEW:ROLES")) &&
                  <Col xs={24} lg={12}>
                    <Card 
                      hoverable
                      style={{ borderRadius: 12 }}
                      onClick={() => navigate("/administrator")}
                    >
                      <Space direction="horizontal">
                        <SafetyOutlined style={{ fontSize: 48 }} />
                        <Space direction="vertical" style={{gap: 1}}>
                          <Text strong style={{fontSize: 18}}>{translate("pages.dashboard.administrator_module.title")}</Text>
                          <Text type="secondary" style={{ fontSize: 14, textAlign: "center" }}>
                            {translate("pages.dashboard.administrator_module.description")}
                          </Text>
                        </Space>
                      </Space>
                    </Card>
                  </Col>
                }
                {(permissions?.includes("VIEW:EMPLOYEES") || 
                  permissions?.includes("VIEW:DEPARTMENTS") || 
                  permissions?.includes("VIEW:POSITIONS") || 
                  permissions?.includes("VIEW:SHIFTS") || 
                  permissions?.includes("VIEW:WORK_SCHEDULES") || 
                  permissions?.includes("VIEW:LEAVE_REQUESTS") || 
                  permissions?.includes("VIEW:PERFORMANCE_REVIEWS")) &&
                  <Col xs={24} lg={12}>
                    <Card 
                      hoverable
                      style={{ borderRadius: 12 }}
                      onClick={() => navigate("/hr")}
                    >
                      <Space direction="horizontal">
                        <TeamOutlined style={{ fontSize: 48 }} />
                        <Space direction="vertical" style={{gap: 1}}>
                          <Text strong style={{fontSize: 18}}>{translate("pages.dashboard.hr_module.title")}</Text>
                          <Text type="secondary" style={{ fontSize: 14, textAlign: "center" }}>
                            {translate("pages.dashboard.hr_module.description")}
                          </Text>
                        </Space>
                      </Space>
                    </Card>
                  </Col>
                }
                {(permissions?.includes("VIEW:SUPPLIERS") || 
                  permissions?.includes("VIEW:PURCHASE_ORDERS") || 
                  permissions?.includes("VIEW:GOODS_RECEIPTS")) &&
                  <Col xs={24} lg={12}>
                    <Card 
                      hoverable
                      style={{ borderRadius: 12 }}
                      onClick={() => navigate("/procurement")}
                    >
                      <Space direction="horizontal">
                        <ShoppingCartOutlined style={{ fontSize: 48 }} />
                        <Space direction="vertical" style={{gap: 1}}>
                          <Text strong style={{fontSize: 18}}>{translate("pages.dashboard.procurement_module.title")}</Text>
                          <Text type="secondary" style={{ fontSize: 14, textAlign: "center" }}>
                            {translate("pages.dashboard.procurement_module.description")}
                          </Text>
                        </Space>
                      </Space>
                    </Card>
                  </Col>
                }
                {(permissions?.includes("VIEW:SUPPLIERS") || 
                  permissions?.includes("VIEW:PURCHASE_ORDERS") || 
                  permissions?.includes("VIEW:GOODS_RECEIPTS")) &&
                  <Col xs={24} lg={12}>
                    <Card 
                      hoverable
                      style={{ borderRadius: 12 }}
                      onClick={() => navigate("/sales")}
                    >
                      <Space direction="horizontal">
                        <DollarOutlined style={{ fontSize: 48 }} />
                        <Space direction="vertical" style={{gap: 1}}>
                          <Text strong style={{fontSize: 18}}>{translate("pages.dashboard.sales_module.title")}</Text>
                          <Text type="secondary" style={{ fontSize: 14, textAlign: "center" }}>
                            {translate("pages.dashboard.sales_module.description")}
                          </Text>
                        </Space>
                      </Space>
                    </Card>
                  </Col>
                }
              </Row>
            </Card>
{/*           </div> */}
{/*           <div style={{ width: "100%", border: "1px solid #aaaaaa", borderRadius: 16, padding: 24, margin: 12 }}>
            <Title level={2}>{translate("pages.dashboard.modules")}</Title>

            <Divider />
            <Row gutter={[24, 24]}>
              {permissions?.includes("VIEW:USERS") &&
                <Col xs={24} lg={12}>
                  <Card 
                    hoverable
                    style={{ borderRadius: 12, height: 100 }}
                    onClick={() => navigate("/users")}
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
              }

              {permissions?.includes("VIEW:ROLES") &&
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Card 
                    hoverable
                    style={{ borderRadius: 12, height: 180 }}
                    onClick={() => navigate("/roles")}
                  >
                    <Space direction="vertical" align="center" style={{ width: "100%", marginTop: 16 }}>
                      <SettingOutlined style={{ fontSize: 32 }} />
                      <Text strong>{translate("pages.dashboard.administrator_module.roles")}</Text>
                      <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                        {translate("pages.dashboard.administrator_module.roles_description")}
                      </Text>
                    </Space>
                  </Card>
                </Col>
              }
            </Row>
          </div> */}
        </Row>
{/*       {(permissions?.includes("VIEW:EMPLOYEES") || 
        permissions?.includes("VIEW:DEPARTMENTS") || 
        permissions?.includes("VIEW:POSITIONS") || 
        permissions?.includes("VIEW:SHIFTS") || 
        permissions?.includes("VIEW:WORK_SCHEDULES") || 
        permissions?.includes("VIEW:LEAVE_REQUESTS") || 
        permissions?.includes("VIEW:PERFORMANCE_REVIEWS")
      ) &&
        <Row gutter={[24, 24]} style={{ marginTop: 12 }} align="middle">
          <div style={{ width: "100%", border: "1px solid #aaaaaa", borderRadius: 16, padding: 24, margin: 12 }}>
            <Title level={2}>{translate("pages.dashboard.hr_module.title")}</Title>

            <Divider />
            <Row gutter={[24, 24]}>
              {permissions?.includes("VIEW:EMPLOYEE") &&
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Card 
                    hoverable
                    style={{ borderRadius: 12, height: 180 }}
                    onClick={() => navigate("/hr/employee")}
                  >
                    <Space direction="vertical" align="center" style={{ width: "100%", marginTop: 16 }}>
                      <UserOutlined style={{ fontSize: 32 }} />
                      <Text strong>{translate("pages.dashboard.hr_module.employee")}</Text>
                      <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                        {translate("pages.dashboard.hr_module.employee_description")}
                      </Text>
                    </Space>
                  </Card>
                </Col>
              }

              {permissions?.includes("VIEW:DEPARTMENTS") &&
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Card 
                    hoverable
                    style={{ borderRadius: 12, height: 180 }}
                    onClick={() => navigate("/hr/departments")}
                  >
                    <Space direction="vertical" align="center" style={{ width: "100%", marginTop: 16 }}>
                      <GroupOutlined style={{ fontSize: 32 }} />
                      <Text strong>{translate("pages.dashboard.hr_module.departments")}</Text>
                      <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                        {translate("pages.dashboard.hr_module.departments_description")}
                      </Text>
                    </Space>
                  </Card>
                </Col>
              }

                {permissions?.includes("VIEW:POSITIONS") &&
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Card 
                      hoverable
                      style={{ borderRadius: 12, height: 180 }}
                      onClick={() => navigate("/hr/positions")}
                    >
                      <Space direction="vertical" align="center" style={{ width: "100%", marginTop: 16 }}>
                        <ClusterOutlined style={{ fontSize: 32 }} />
                        <Text strong>{translate("pages.dashboard.hr_module.positions")}</Text>
                        <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                          {translate("pages.dashboard.hr_module.positions_description")}
                        </Text>
                      </Space>
                    </Card>
                  </Col>
                }

                {permissions?.includes("VIEW:SHIFTS") &&
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Card 
                      hoverable
                      style={{ borderRadius: 12, height: 180 }}
                      onClick={() => navigate("/hr/shifts")}
                    >
                      <Space direction="vertical" align="center" style={{ width: "100%", marginTop: 16 }}>
                        <ClockCircleOutlined style={{ fontSize: 32 }} />
                        <Text strong>{translate("pages.dashboard.hr_module.shifts")}</Text>
                        <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                          {translate("pages.dashboard.hr_module.shifts_description")}
                        </Text>
                      </Space>
                    </Card>
                  </Col>
                }

                {permissions?.includes("VIEW:WORK_SCHEDULES") &&
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Card 
                      hoverable
                      style={{ borderRadius: 12, height: 180 }}
                      onClick={() => navigate("/hr/work_schedules")}
                    >
                      <Space direction="vertical" align="center" style={{ width: "100%", marginTop: 16 }}>
                        <CalendarOutlined style={{ fontSize: 32 }} />
                        <Text strong>{translate("pages.dashboard.hr_module.work_schedules")}</Text>
                        <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                          {translate("pages.dashboard.hr_module.work_schedules_description")}
                        </Text>
                      </Space>
                    </Card>
                  </Col>
                }

                {permissions?.includes("VIEW:LEAVE_REQUESTS") &&
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Card 
                      hoverable
                      style={{ borderRadius: 12, height: 180 }}
                      onClick={() => navigate("/hr/leave_requests")}
                    >
                      <Space direction="vertical" align="center" style={{ width: "100%", marginTop: 16 }}>
                        <StopOutlined style={{ fontSize: 32 }} />
                        <Text strong>{translate("pages.dashboard.hr_module.leave_requests")}</Text>
                        <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                          {translate("pages.dashboard.hr_module.leave_requests_description")}
                        </Text>
                      </Space>
                    </Card>
                  </Col>
                }

                {permissions?.includes("VIEW:PERFORMANCE_REVIEWS") &&
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Card 
                      hoverable
                      style={{ borderRadius: 12, height: 180 }}
                      onClick={() => navigate("/hr/performance_reviews")}
                    >
                      <Space direction="vertical" align="center" style={{ width: "100%", marginTop: 16 }}>
                        <DashboardOutlined style={{ fontSize: 32 }} />
                        <Text strong>{translate("pages.dashboard.hr_module.performance_reviews")}</Text>
                        <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                          {translate("pages.dashboard.hr_module.performance_reviews_description")}
                        </Text>
                      </Space>
                    </Card>
                  </Col>
                }
            </Row>
          </div>
        </Row>
      } */}
    </div>
  );
};
