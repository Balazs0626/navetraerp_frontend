import { Edit, useForm } from "@refinedev/antd";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { CanAccess, useNotification, useTranslate } from "@refinedev/core";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { RoleSelect } from "../../../components/RoleSelect";
import { getDefaultAutoSelectFamilyAttemptTimeout } from "net";
import { CustomErrorComponent } from "../../error";

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
    document.title = `${translate("pages.users.edit.title")} | NavetraERP`;
  })

  useEffect(() => {
      if (!form) return;

      const initialValues = formProps.initialValues;

      if (!initialValues) return;

  }, [formProps.initialValues])

  return (
    <CanAccess 
      resource="users" 
      action="edit" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Edit
          title={translate("pages.users.edit.title")}
          goBack={null}
          saveButtonProps={saveButtonProps}
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
  /*           onFinish={(values) => {

                handleNotification();

                return formProps.onFinish?.(values);
            }} */
        >
          <Card title={translate("pages.users.titles.user_data")} type="inner">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.users.titles.username")}
                  name="username"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input style={{ width: "100%" }} placeholder={`${translate("pages.users.titles.username")}...`}/>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={translate("pages.users.titles.email")}
                  name="email"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input type="email" style={{ width: "100%" }} placeholder={`${translate("pages.users.titles.email")}...`}/>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.users.titles.password")}
                  name="passwordHash"
                >
                  <Input type="password" style={{ width: "100%" }} placeholder={`${translate("pages.users.titles.password")}...`}/>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={translate("pages.users.titles.confirm_password")}
                  name="confirm_password"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('passwordHash') === value) {
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
      </Edit>
    </CanAccess>
  )
}