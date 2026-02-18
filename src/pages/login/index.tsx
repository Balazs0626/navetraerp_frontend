import { useLogin, useTranslation } from "@refinedev/core";
import { Form, Input, Button, Card, Typography, Space, theme } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../../icons/logo.png";

const { Title, Text } = Typography;

export const LoginPage = () => {
  const { mutate: login } = useLogin();
  const navigate = useNavigate();
  const { translate } = useTranslation();
  const { token } = theme.useToken();

  const onFinish = (values: any) => {
    login(values, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  useEffect(() => {
    document.title = `${translate("pages.login.title")} | NavetraERP`;
  }, [translate]);

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      justifyContent: "center", 
      alignItems: "center", 
      background: token.colorBgBase,
    }}>
      <Card
        style={{ 
          width: 400, 
          borderRadius: 16, 
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          padding: 12
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img src={Logo} width={64} />
          <Title level={2} style={{ margin: 0, color: token.colorPrimary }}>
            NavetraERP
          </Title>
          <Text type="secondary">{translate("pages.login.title")}</Text>
        </div>

        <Form 
          layout="vertical" 
          onFinish={onFinish} 
          requiredMark={false}
        >
          <Form.Item 
            label={translate("pages.login.titles.username")}
            name="username" 
            rules={[{ required: true }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder={`${translate("pages.login.titles.username")}...`}
              size="large"
            />
          </Form.Item>

          <Form.Item 
            label={translate("pages.login.titles.password")}
            name="password" 
            rules={[{ required: true }]}
          >
            <Input.Password 
              prefix={<LockOutlined />}
              placeholder={`${translate("pages.login.titles.password")}...`}
              size="large"
            />
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Button type="link" href="/forgot_password">
              {translate("pages.login.buttons.forgot_password")}
            </Button>
          </div>

          <Form.Item style={{ marginTop: 8 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
              style={{ 
                borderRadius: 8, 
                height: 45, 
                fontWeight: "bold",
                fontSize: 16
              }}
            >
              {translate("buttons.login")}
            </Button>
          </Form.Item>
        </Form>
        
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            © {new Date().getFullYear()} NavetraERP
          </Text>
        </div>
      </Card>
    </div>
  );
};