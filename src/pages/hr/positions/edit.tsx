import { ArrowLeftOutlined } from "@ant-design/icons";
import { Edit, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export const PositionEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "positions",
      action: "edit",
      id,
  });

  const { open, close } = useNotification();

  const handleNotification = async () => {
    open?.({
      type: "success",
      message: translate("notifications.modify.position"),
      description: translate("notifications.success"),
      key: "notification-key",
    });
  }

  useEffect(() => {
    document.title = translate("pages.positions.edit.title");
  })

  useEffect(() => {
      if (!form) return;

      const initialValues = formProps.initialValues;

      if (!initialValues) return;

  }, [formProps.initialValues])

  return (
    <Edit
      title={translate("pages.positions.edit.title")}
      saveButtonProps={saveButtonProps}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/hr/positions")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.positions.buttons.back")}</Button>
        </Space>
      }
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
      >
        <Card title={translate("pages.positions.titles.data")}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={translate("pages.positions.titles.name")}
                name="positionName"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={translate("pages.positions.titles.description")}
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