import { ArrowLeftOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const DepartmentCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "departments",
    redirect: false
  });

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { open, close } = useNotification();

  const handleNotification = async () => {
    open?.({
      type: "success",
      message: translate("notifications.create.department"),
      description: translate("notifications.success"),
      key: "notification-key",
    });
  }

  useEffect(() => {
    document.title = translate("pages.departments.create.title");
  })  

  return (
    <Create
      saveButtonProps={{...saveButtonProps, onClick: (event) => {
        saveButtonProps.onClick?.(event);
        handleNotification();
      }}}
      title={translate("pages.departments.create.title")}
      goBack={null}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/hr/departments")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.departments.buttons.back")}</Button>
        </Space>
      }
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
      >
        <Card title={translate("pages.departments.titles.data")}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={translate("pages.departments.titles.name")}
                name="departmentName"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={translate("pages.departments.titles.description")}
                name="description"
              >
                <TextArea/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Create>
  )

}