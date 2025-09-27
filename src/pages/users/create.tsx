import { Create, useForm } from "@refinedev/antd"
import { Card, Col, Form, Input, Row, Select, notification } from "antd";
import { Roles2 } from "../../constants/users";
import { useNotification, useTranslate } from "@refinedev/core";


export const UserCreate = () => {
  
  const { form, formProps, saveButtonProps } = useForm({
    resource: "User",
    redirect: false,
  });

  const { open, close } = useNotification();

  const translate = useTranslate();

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate("pages.users.create.title")}
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
      >
        <Card title={translate("pages.users.create.data_card")}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={translate("pages.users.common.username")}
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
                label={translate("pages.users.common.email")}
                name="email"
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={translate("pages.users.create.password")}
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
                label={translate("pages.users.common.role")}
                name="roleId"
                rules={[{
                  required: true,
                }]}
              >
                <Select
                  value={2}
                  //onChange={setSearchField}
                  options={Roles2}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Create>
  )
}