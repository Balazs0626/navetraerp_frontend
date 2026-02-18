import { ArrowLeftOutlined } from "@ant-design/icons";
import { Edit, useForm } from "@refinedev/antd";
import { CanAccess, useNotification, useTranslation } from "@refinedev/core";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { CustomErrorComponent } from "../../error";

export const DepartmentEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "departments",
      action: "edit",
      id,
  });

  useEffect(() => {
    document.title = `${translate("pages.departments.edit.title")} | NavetraERP`;
  })

  useEffect(() => {
      if (!form) return;

      const initialValues = formProps.initialValues;

      if (!initialValues) return;

  }, [formProps.initialValues])

  return (
    <CanAccess 
      resource="departments" 
      action="edit" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Edit
        title={translate("pages.departments.edit.title")}
        goBack={null}
        saveButtonProps={saveButtonProps}
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

      </Edit>
    </CanAccess>
  )
};