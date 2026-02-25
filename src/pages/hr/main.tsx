import { useTranslation, usePermissions } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Row, Col, Card, Typography, Space, FloatButton } from "antd";
import { UserOutlined, GroupOutlined, ClusterOutlined, ClockCircleOutlined, CalendarOutlined, StopOutlined, DashboardOutlined, RobotOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { AiAssistantDrawer } from "../../components/ai";

const { Text } = Typography;

export const HRMainPage = () => {

  const { translate } = useTranslation();

  useEffect(() => {
      document.title = translate("pages.dashboard.hr_module.title");
  })
  const { data: permissions } = usePermissions<string[]>({});

  const navigate = useNavigate();

  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <>
      <Card
        style={{
          margin: 12
        }}
        title={translate("pages.dashboard.hr_module.title")}
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
              onClick={() => permissions?.includes("VIEW:EMPLOYEES") ? navigate("employee") : undefined}
            >
              <Space direction="horizontal">
                <UserOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.hr_module.employee")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.hr_module.employee_description")}
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              hoverable={permissions?.includes("VIEW:DEPARTMENTS")}
              style={{ 
                borderRadius: 12,
                cursor: permissions?.includes("VIEW:DEPARTMENTS") ? "pointer" : "not-allowed", 
                filter: permissions?.includes("VIEW:DEPARTMENTS") ? "none" : "opacity(50%)"
              }}
              onClick={() => permissions?.includes("VIEW:DEPARTMENTS") ? navigate("departments") : undefined}
            >
              <Space direction="horizontal">
                <GroupOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.hr_module.departments")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.hr_module.departments_description")}
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              hoverable={permissions?.includes("VIEW:POSITIONS")}
              style={{ 
                borderRadius: 12,
                cursor: permissions?.includes("VIEW:POSITIONS") ? "pointer" : "not-allowed", 
                filter: permissions?.includes("VIEW:POSITIONS") ? "none" : "opacity(50%)"
              }}
              onClick={() => permissions?.includes("VIEW:POSITIONS") ? navigate("positions") : undefined}
            >
              <Space direction="horizontal">
                <ClusterOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.hr_module.positions")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.hr_module.positions_description")}
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              hoverable={permissions?.includes("VIEW:SHIFTS")}
              style={{ 
                borderRadius: 12,
                cursor: permissions?.includes("VIEW:SHIFTS") ? "pointer" : "not-allowed", 
                filter: permissions?.includes("VIEW:SHIFTS") ? "none" : "opacity(50%)"
              }}
              onClick={() => permissions?.includes("VIEW:SHIFTS") ? navigate("shifts") : undefined}
            >
              <Space direction="horizontal">
                <ClockCircleOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.hr_module.shifts")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.hr_module.shifts_description")}
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              hoverable={permissions?.includes("VIEW:WORK_SCHEDULES")}
              style={{ 
                borderRadius: 12,
                cursor: permissions?.includes("VIEW:WORK_SCHEDULES") ? "pointer" : "not-allowed", 
                filter: permissions?.includes("VIEW:WORK_SCHEDULES") ? "none" : "opacity(50%)"
              }}
              onClick={() => permissions?.includes("VIEW:WORK_SCHEDULES") ? navigate("work_schedules") : undefined}
            >
              <Space direction="horizontal">
                <CalendarOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.hr_module.work_schedules")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.hr_module.work_schedules_description")}
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              hoverable={permissions?.includes("VIEW:LEAVE_REQUESTS")}
              style={{ 
                borderRadius: 12,
                cursor: permissions?.includes("VIEW:LEAVE_REQUESTS") ? "pointer" : "not-allowed", 
                filter: permissions?.includes("VIEW:LEAVE_REQUESTS") ? "none" : "opacity(50%)"
              }}
              onClick={() => permissions?.includes("VIEW:LEAVE_REQUESTS") ? navigate("leave_requests") : undefined}
            >
              <Space direction="horizontal">
                <StopOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.hr_module.leave_requests")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.hr_module.leave_requests_description")}
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              hoverable={permissions?.includes("VIEW:PERFORMANCE_REVIEWS")}
              style={{ 
                borderRadius: 12,
                cursor: permissions?.includes("VIEW:PERFORMANCE_REVIEWS") ? "pointer" : "not-allowed", 
                filter: permissions?.includes("VIEW:PERFORMANCE_REVIEWS") ? "none" : "opacity(50%)"
              }}
              onClick={() => permissions?.includes("VIEW:PERFORMANCE_REVIEWS") ? navigate("performance_reviews") : undefined}
            >
              <Space direction="horizontal">
                <DashboardOutlined style={{ fontSize: 48 }} />
                <Space direction="vertical" style={{gap: 1}}>
                  <Text strong>{translate("pages.dashboard.hr_module.performance_reviews")}</Text>
                  <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
                    {translate("pages.dashboard.hr_module.performance_reviews_description")}
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>

      <FloatButton
          icon={<RobotOutlined />}
          type="primary"
          style={{ right: 24, bottom: 24, width: 64, height: 64 }}
          onClick={() => setIsAiOpen(true)}
          tooltip={<div>{translate("ai.assistant")}</div>}
      />

      {/* Az AI Oldalsáv */}
      <AiAssistantDrawer 
          open={isAiOpen} 
          onClose={() => setIsAiOpen(false)}
          module="hr" 
      />
    </>
  );
};
