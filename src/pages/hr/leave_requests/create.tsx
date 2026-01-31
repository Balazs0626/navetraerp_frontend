import { ArrowLeftOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLeaveRequestStatus, useLeaveRequestType } from "../../../constants/leave_requests";
import { EmployeeOneSelect } from "../../../components/EmployeeOneSelect";

export const LeaveRequestCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "leave_requests",
    redirect: false
  });

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = translate("pages.leave_requests.create.title");
  })  

  const handleFinish = (values: any) => {
    const formattedValues = {
        ...values,
        startDate: values.startDate?.format("YYYY-MM-DD"),
        endDate: values.endDate?.format("YYYY-MM-DD"),
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate("pages.leave_requests.create.title")}
      goBack={null}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/hr/leave_requests")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.leave_requests.buttons.back")}</Button>
        </Space>
      }
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Card title={translate("pages.leave_requests.titles.data")}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={translate("pages.leave_requests.titles.employee")}
                name="employeeId"
                rules={[{ required: true }]}
              >
                <EmployeeOneSelect/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={translate("pages.leave_requests.titles.start_date")}
                name="startDate"
                rules={[{ required: true }]}
              >
                <DatePicker 
                  format="YYYY-MM-DD"
                  style={{width: "100%"}}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={translate("pages.leave_requests.titles.end_date")}
                name="endDate"
                rules={[{ required: true }]}
              >
                <DatePicker 
                  format="YYYY-MM-DD"
                  style={{width: "100%"}}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                  label={translate("pages.leave_requests.titles.leave_type")}
                  name="leaveType"
                  rules={[{ required: true }]}
              >
                <Select
                    options={useLeaveRequestType()}
                    placeholder={translate("selects.leave_requests.placeholder_type")}
                /> 
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label={translate("pages.leave_requests.titles.status")}
                  name="status"
                  rules={[{ required: true }]}
              >
                <Select
                    options={useLeaveRequestStatus()}
                    placeholder={translate("selects.leave_requests.placeholder_status")}
                /> 
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Create>
  )

}