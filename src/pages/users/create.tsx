import { Create, useForm } from "@refinedev/antd"
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import { useNotification, useTranslate } from "@refinedev/core";
import { useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { RoleSelect } from "../../components/RoleSelect";
import { useEffect } from "react";


export const UserCreate = () => {
  
  const { form, formProps, saveButtonProps } = useForm({
    resource: "users",
    redirect: false
  });

  const translate = useTranslate();
  const navigate = useNavigate();

/*   const { open, close } = useNotification();

  const handleNotification = async () => {
    open?.({
      type: "success",
      message: translate("notifications.create.user"),
      description: translate("notifications.success"),
      key: "notification-key",
    });
  } */

  useEffect(() => {
    document.title = `NavetraERP - ${translate("pages.users.create.title")}`;
  })

  return (
    <Create
/*       saveButtonProps={{...saveButtonProps, onClick: (event) => {
        saveButtonProps.onClick?.(event);
        handleNotification();
      }}} */
      saveButtonProps={saveButtonProps}
      title={translate("pages.users.create.title")}
      goBack={null}
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
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={translate("pages.users.titles.password")}
                name="password"
                rules={[{
                  required: true,
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
    </Create>
  )
}