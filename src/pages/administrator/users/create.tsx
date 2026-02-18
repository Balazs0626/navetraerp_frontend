import { Create, useForm } from "@refinedev/antd"
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import { CanAccess, useNotification, useTranslate } from "@refinedev/core";
import { useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { RoleSelect } from "../../../components/RoleSelect";
import { useEffect } from "react";
import { CustomErrorComponent } from "../../error";


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
    document.title = `${translate("pages.users.create.title")} | NavetraERP`;
  })

  return (
    <CanAccess 
      resource="users" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
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
              onClick={() => navigate("/administrator/users")}
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
          <Card title={translate("pages.users.titles.user_data")} type="inner">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.users.titles.username")}
                  name="username"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input style={{ width: "100%" }} placeholder={`${translate("pages.users.titles.username")}...`} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={translate("pages.users.titles.email")}
                  name="email"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input style={{ width: "100%" }} placeholder={`${translate("pages.users.titles.email")}...`}/>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.users.titles.password_req")}
                  name="password"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input type="password" style={{ width: "100%" }} placeholder={`${translate("pages.users.titles.password_req")}...`} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={translate("pages.users.titles.confirm_password")}
                  name="confirm_password"
                  rules={[
                    { required: true, message: translate("messages.errors.required_field") },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject();
                      },
                    }),
                  ]}
                >
                  <Input type="password" style={{ width: "100%" }} placeholder={`${translate("pages.users.titles.confirm_password")}...`} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={translate("pages.users.titles.role")}
                  name="roleId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <RoleSelect/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Create>
    </CanAccess>
  )
}