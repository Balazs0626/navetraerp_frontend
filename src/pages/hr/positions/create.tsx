import { ArrowLeftOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { CanAccess, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CustomErrorComponent } from "../../error";

export const PositionCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "positions",
    redirect: false
  });

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.positions.create.title")} | NavetraERP`;
  })  

  return (
    <CanAccess 
      resource="positions" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
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
          <Card title={translate("pages.positions.titles.data")} type="inner">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.positions.titles.name")}
                  name="positionName"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.positions.titles.name")}...`}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.positions.titles.description")}
                  name="description"
                >
                  <Input.TextArea placeholder={`${translate("pages.positions.titles.description")}...`}/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Create>
    </CanAccess>
  )
}