import { Edit, useForm } from "@refinedev/antd";
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../constants/url";
import { useNotification, useTranslate } from "@refinedev/core";
import { ArrowLeftOutlined } from "@ant-design/icons";

interface RolePermissionDto {
  id: number;
  permissionId: number;
  moduleId: number;
  permissionName: string;
}

export const RoleEdit = () => {
  const { id } = useParams();

  const { formProps, form, saveButtonProps } = useForm({
    resource: "roles",
    action: "edit",
    id,
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
    document.title = `NavetraERP - ${translate("pages.roles.edit.title")}`;
  })

  return (
    <Edit 
      title={translate("pages.roles.edit.title")}
      saveButtonProps={saveButtonProps}
      headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/administrator/roles")}
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
    </Edit>
  );
};
