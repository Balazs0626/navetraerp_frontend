import { useUpdatePassword, useTranslation } from "@refinedev/core";
import { Form, Input, Button, Card, Typography, theme, message } from "antd";
import { useEffect } from "react";
import { LockOutlined } from "@ant-design/icons";
import { useSearchParams, useNavigate } from "react-router-dom";
import Logo from "../../icons/logo.png";

const { Title, Text } = Typography;

export const ResetPasswordPage = () => {
  const { mutate: updatePassword } = useUpdatePassword();
  const { translate } = useTranslation();
  const { token: antdToken } = theme.useToken();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    document.title = `${translate("pages.reset_password.title")} | NavetraERP`;
    
    if (!token || !email) {
      navigate("/login");
    }
  }, [token, email, navigate]);

  const onFinish = (values: any) => {
    updatePassword({
      token: token!,
      email: email!,
      password: values.password,
    });
  };

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      justifyContent: "center", 
      alignItems: "center", 
      background: antdToken.colorBgBase,
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
          <Title level={2} style={{ margin: 0, color: antdToken.colorPrimary }}>
            NavetraERP
          </Title>
          <Text type="secondary">{translate("pages.reset_password.title")}</Text>
        </div>

        <Form 
          layout="vertical" 
          onFinish={onFinish} 
          requiredMark={false}
        >
          <Form.Item 
            label={translate("pages.reset_password.titles.password")}
            name="password" 
            rules={[
              { required: true },
              { min: 6 }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder={`${translate("pages.reset_password.titles.password")}...`}
              size="large"
            />
          </Form.Item>

          <Form.Item 
            label={translate("pages.reset_password.titles.confirm_password")}
            name="confirmPassword" 
            dependencies={['password']}
            rules={[
              { required: true },
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
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder={`${translate("pages.reset_password.titles.confirm_password")}...`}
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
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
              {translate("pages.reset_password.buttons.save_password")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};