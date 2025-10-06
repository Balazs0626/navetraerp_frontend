import { ArrowLeftOutlined } from "@ant-design/icons";
import { Edit, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export const DepartmentEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "departments",
      action: "edit",
      id,
  });

  const { open, close } = useNotification();

  const handleNotification = async () => {
    open?.({
      type: "success",
      message: translate("notifications.modify.department"),
      description: translate("notifications.success"),
      key: "notification-key",
    });
  }

  useEffect(() => {
    document.title = translate("pages.departments.edit.title");
  })

  useEffect(() => {
      if (!form) return;

      const initialValues = formProps.initialValues;

      if (!initialValues) return;

  }, [formProps.initialValues])

  return (
    <Edit
      title={translate("pages.departments.edit.title")}
      saveButtonProps={saveButtonProps}
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
        onFinish={(values) => {
          handleNotification();
          return formProps.onFinish?.(values);
        }}
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

    </Edit>
  )
};