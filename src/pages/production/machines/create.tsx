import { ArrowLeftOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { CanAccess, useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CustomErrorComponent } from "../../error";
import { useMachineActiveStatus } from "../../../constants/machines";

export const MachineCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "machines"
  });

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.machines.create.title")} | NavetraERP`;
  })  

  return (
    <CanAccess 
      resource="machines" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.machines.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/production/machines")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.machines.buttons.back")}
            </Button>
          </Space>
        }
      >
        <Form
          {...formProps}
          form={form}
          layout="vertical"
        >
          <Card title={translate("pages.machines.titles.data")} type="inner">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.machines.titles.name")}
                  name="name"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.machines.titles.name")}...`}/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.machines.titles.code")}
                  name="code"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.machines.titles.code")}...`}/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.machines.titles.active")}
                  name="active"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Select placeholder={translate("selects.machines.placeholder_status")} options={useMachineActiveStatus()} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.machines.titles.description")}
                  name="description"
                >
                  <Input.TextArea placeholder={`${translate("pages.machines.titles.description")}...`}/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Create>
    </CanAccess>
  )

}