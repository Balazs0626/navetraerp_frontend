import { Create, useForm } from "@refinedev/antd"
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";
import { useNotification, useTranslate } from "@refinedev/core";
import { useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { RoleSelect } from "../../components/RoleSelect";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants/url";
import axios from "axios";

interface RolePermissionDto {
  id: number;
  permissionId: number;
  moduleId: number;
  permissionName: string;
}

export const RoleCreate = () => {
  
  const { form, formProps, saveButtonProps } = useForm({
    resource: "roles",
    redirect: false
  });

  const translate = useTranslate();
  const navigate = useNavigate();

  const [allPermissions, setAllPermissions] = useState<RolePermissionDto[]>([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/roles/all-permissions`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((res) => {
        setAllPermissions(res.data);
      });
  }, []);

  const { open, close } = useNotification();

  const handleNotification = async () => {
    open?.({
      type: "success",
      message: translate("notifications.create.role"),
      description: translate("notifications.success"),
      key: "notification-key",
    });
  }

  useEffect(() => {
    document.title = `NavetraERP - ${translate("pages.users.create.title")}`;
  })

  return (
    <Create
      saveButtonProps={{
        ...saveButtonProps, 
        onClick: (event) => {
          saveButtonProps.onClick?.(event);
          handleNotification();
        }
      }}
      title={translate("pages.users.create.title")}
      goBack={null}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/roles")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.roles.buttons.back")}</Button>
        </Space>
      }
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
      >
        <Card title={translate("pages.roles.titles.default_data")}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={translate("pages.roles.titles.name")}
                name="roleName"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title={translate("pages.roles.titles.permissions")} style={{marginTop: 24}}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label={translate("pages.roles.titles.permissions")}
                name="permissions"
                getValueProps={(permissions: any[]) => ({
                  value: permissions?.map((p) => p.permissionId) || [],
                })}
                getValueFromEvent={(values: number[]) => {
                  return values.map((id) => ({ permissionId: id }));
                }}
              >
                <Select
                  mode="multiple"
                  placeholder="Válassz jogosultságokat"
                  options={allPermissions
                    .map((p) => ({
                      label: p.permissionName,
                      value: p.permissionId,
                    }))
                }
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Create>
  )
}