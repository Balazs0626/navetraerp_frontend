import { Create, useForm } from "@refinedev/antd"
import { Card, Col, Form, Input, Row, Select, notification } from "antd";
import { Roles2 } from "../../constants/users";
import { useNotification } from "@refinedev/core";

export const UserCreate = () => {
  
  const { form, formProps, saveButtonProps } = useForm({
    resource: "User",
    redirect: false,
  });

  const { open, close } = useNotification();


  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Felhasználó létrehozása"
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
      >
        <Card title="Felhasználó adatok">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Felhasználónév"
                name="username"
                rules={[{
                  required: true,
                  message: "Felhasználónév megadása kötelező"
                }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="E-mail cím"
                name="email"
                rules={[{
                  required: true,
                  message: "E-mail cím megadása kötelező"
                }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Alapértelmezett jelszó"
                name="password"
                rules={[{
                  required: true,
                  message: "Felhasználónév megadása kötelező"
                }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Rang"
                name="roleId"
                rules={[{
                  required: true,
                  message: "E-mail cím megadása kötelező"
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