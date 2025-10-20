import { Edit, useForm } from "@refinedev/antd";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useNotification, useTranslate } from "@refinedev/core";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { RoleSelect } from "../../components/RoleSelect";
import { getDefaultAutoSelectFamilyAttemptTimeout } from "net";

export const UserEdit = () => {

  const { id } = useParams();

  const translate = useTranslate();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "users",
      action: "edit",
      id,
  });

/*   const { open, close } = useNotification();

  const handleNotification = async () => {
    open?.({
      type: "success",
      message: translate("notifications.modify.user"),
      description: translate("notifications.success"),
      key: "notification-key",
    });
  } */

  useEffect(() => {
    document.title = `NavetraERP - ${translate("pages.users.edit.title")}`;
  })

  useEffect(() => {
      if (!form) return;

      const initialValues = formProps.initialValues;

      if (!initialValues) return;

  }, [formProps.initialValues])

  return (
    <Edit
        title={translate("pages.users.edit.title")}
        saveButtonProps={saveButtonProps}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/users")}
              size="large"
            ><ArrowLeftOutlined/>{translate("pages.users.buttons.back")}</Button>
          </Space>
        }
    >
      <Form
          {...formProps}
          form={form}
          layout="vertical"
/*           onFinish={(values) => {

              handleNotification();

              return formProps.onFinish?.(values);
          }} */
      >
        <Card title={translate("pages.users.titles.user_data")}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={translate("pages.users.titles.username")}
                name="username"
                rules={[{
                  required: true,
                }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={translate("pages.users.titles.email")}
                name="email"
              >
                <Input type="email" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={translate("pages.users.titles.password")}
                name="passwordHash"
                rules={[{
                  //required: true,
                  
                }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={translate("pages.users.titles.role")}
                name="roleId"
                rules={[{
                  required: true,
                }]}
              >
                <RoleSelect/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Edit>
  )
}