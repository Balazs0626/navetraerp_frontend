import { useLogin } from "@refinedev/core";
import { Form, Input, Button, Card } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { mutate: login } = useLogin();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    login(values, {
        onSuccess: () => {
            navigate("/"); // ide navigálunk a sikeres login után
        },
    });
  };

  useEffect(() => {
    document.title = "NavetraERP - Bejelentkezés";
  });

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", backgroundColor: "gray"}}>
      <Card
          title="NavetraERP - Bejelentkezés">
          <Form onFinish={onFinish} style={{ width: 300 }}>
              <Form.Item name="username" rules={[{ required: true, message: "Felhasználónév megadása kötelező!" }]}>
              <Input placeholder="Felhasználónév" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: "Jelszó megadása kötelező!" }]}>
              <Input.Password placeholder="Jelszó" />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                  Bejelentkezés
              </Button>
          </Form>
      </Card>
    </div>
  );
};
