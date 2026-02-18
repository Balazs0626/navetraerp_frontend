import { ArrowLeftOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { CanAccess, useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CustomErrorComponent } from "../../error";

export const DepartmentCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "departments",
    redirect: false
  });

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.departments.create.title")} | NavetraERP`;
  })  

  return (
    <CanAccess 
      resource="departments" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.departments.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/hr/departments")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.departments.buttons.back")}
            </Button>
          </Space>
        }
      >
        <Form
          {...formProps}
          form={form}
          layout="vertical"
        >
          <Card title={translate("pages.departments.titles.data")} type="inner">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.departments.titles.name")}
                  name="departmentName"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.departments.titles.name")}...`}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.departments.titles.description")}
                  name="description"
                >
                  <Input.TextArea placeholder={`${translate("pages.departments.titles.description")}...`}/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Create>
    </CanAccess>
  )

}