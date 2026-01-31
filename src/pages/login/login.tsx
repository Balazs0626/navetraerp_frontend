import { useLogin, useTranslation } from "@refinedev/core";
import { Form, Input, Button, Card } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { mutate: login } = useLogin();
  const navigate = useNavigate();

  const { translate } = useTranslation();

  const onFinish = (values: any) => {
    login(values, {
        onSuccess: () => {
            navigate("/");
        },
    });
  };

  useEffect(() => {
    document.title = `${translate("pages.login.title")} | NavetraERP`;
  });

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", backgroundColor: "gray"}}>
      <Card
          title={translate("pages.login.titles.login")}>
          <Form onFinish={onFinish} style={{ width: 300 }}>
              <Form.Item name="username" rules={[{ required: true }]}>
                <Input placeholder={translate("pages.login.titles.username")} />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true }]}>
                <Input.Password placeholder={translate("pages.login.titles.password")} />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                  {translate("buttons.login")}
              </Button>
          </Form>
      </Card>
    </div>
  );
};
