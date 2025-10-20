import { ArrowLeftOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const PositionCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "positions",
    redirect: false
  });

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = translate("pages.positions.create.title");
  })  

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate("pages.positions.create.title")}
      goBack={null}
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
    </Create>
  )

}