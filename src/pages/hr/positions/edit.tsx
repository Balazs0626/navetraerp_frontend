import { ArrowLeftOutlined } from "@ant-design/icons";
import { Edit, useForm } from "@refinedev/antd";
import { CanAccess, useNotification, useTranslation } from "@refinedev/core";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { CustomErrorComponent } from "../../error";

export const PositionEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "positions",
      action: "edit",
      id,
  });

/*   const { open, close } = useNotification();

  const handleNotification = async () => {
    open?.({
      type: "success",
      message: translate("notifications.modify.position"),
      description: translate("notifications.success"),
      key: "notification-key",
    });
  } */

  useEffect(() => {
    document.title = `${translate("pages.positions.edit.title")} | NavetraERP`;
  }) 

  useEffect(() => {
      if (!form) return;

      const initialValues = formProps.initialValues;

      if (!initialValues) return;

  }, [formProps.initialValues])

  return (
    <CanAccess 
      resource="positions" 
      action="edit" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Edit
        title={translate("pages.positions.edit.title")}
        goBack={null}
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

      </Edit>
    </CanAccess>
  )
}