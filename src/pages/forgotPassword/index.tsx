import { useForgotPassword, useTranslation } from "@refinedev/core";
import { Form, Input, Button, Card, Typography, theme } from "antd";
import { useEffect } from "react";
import { MailOutlined } from "@ant-design/icons";
import Logo from "../../icons/logo.png";

const { Title, Text } = Typography;

export const ForgotPasswordPage = () => {
  const { mutate: forgotPassword } = useForgotPassword();
  const { translate } = useTranslation();
  const { token } = theme.useToken();

  const onFinish = (values: any) => {
    forgotPassword(values);
  };

  useEffect(() => {
    document.title = `${translate("pages.forgotPassword.title")} | NavetraERP`;
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
          <img src={Logo} width={64} alt="Logo" />
          <Title level={2} style={{ margin: 0, color: token.colorPrimary }}>
            NavetraERP
          </Title>
          <Text type="secondary">{translate("pages.forgot_password.title")}</Text>
        </div>

        <Form 
          layout="vertical" 
          onFinish={onFinish} 
          requiredMark={false}
        >
          <Form.Item 
            label={translate("pages.forgot_password.titles.email")}
            name="email" 
            rules={[
              { required: true },
              { type: "email" }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder={`${translate("pages.forgot_password.titles.email")}...`}
              size="large"
            />
          </Form.Item>

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
              {translate("pages.forgot_password.buttons.send_reset")}
            </Button>
          </Form.Item>
        </Form>
        
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Button type="link" href="/login">
            {translate("pages.forgot_password.buttons.back_login")}
          </Button>
        </div>
      </Card>
    </div>
  );
};