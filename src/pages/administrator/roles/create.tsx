import { Create, useForm } from "@refinedev/antd"
import { Button, Card, Col, Divider, Form, Input, Row, Select, Space } from "antd";
import { CanAccess, useNotification, useTranslate } from "@refinedev/core";
import { useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { RoleSelect } from "../../../components/RoleSelect";
import { useEffect, useState } from "react";
import { API_URL } from "../../../constants/url";
import axios from "axios";
import { useRolesData } from "../../../constants/roles";
import { CustomErrorComponent } from "../../error";

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

  useEffect(() => {
    document.title = `${translate("pages.roles.create.title")} | NavetraERP`;
  })

  return (
    <CanAccess 
      resource="roles" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.roles.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/administrator/roles")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.roles.buttons.back")}
            </Button>
          </Space>
        }
      >
        <Form
          {...formProps}
          form={form}
          layout="vertical"
        >
          <Card title={translate("pages.roles.titles.default_data")} type="inner">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.roles.titles.name")}
                  name="roleName"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={translate("pages.roles.titles.name") + "..."}/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Divider/>
          <Card title={translate("pages.roles.titles.permissions")} style={{marginTop: 24}} type="inner">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label={translate("pages.roles.titles.permissions")}
                  name="permissions"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  getValueProps={(permissions: any[]) => ({
                    value: permissions?.map((p) => p.permissionId) || [],
                  })}
                  getValueFromEvent={(values: number[]) => {
                    return values.map((id) => ({ permissionId: id }));
                  }}
                >
                  <Select
                    mode="multiple"
                    options={allPermissions
                      .map((p) => ({
                        label: translate(`selects.permissions.options.` + p.permissionName),//p.permissionName,
                        value: p.permissionId,
                      }))
                    }
                    placeholder={translate("selects.permissions.placeholder")}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Create>
    </CanAccess>
  )
}