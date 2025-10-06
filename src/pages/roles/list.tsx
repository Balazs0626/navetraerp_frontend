import { DeleteButton, EditButton, List, useTable } from "@refinedev/antd";
import { Space, Table, Input, Form, Row, Col, Button } from "antd";
import { IUserList } from "../../interfaces";
import { Roles } from "../../constants/users";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { usePermissions, useTranslation } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export const RoleList = () => {

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions, isLoading } = usePermissions<string[]>({});

  const { tableProps } = useTable<IUserList>({
    resource: "roles",
  });

  useEffect(() => {
    document.title = `NavetraERP - ${translate("pages.roles.list.title")}`;
  });

  return (
    <Row gutter={[16, 16]}>
      <Col lg={24} xs={24}>
        <List
            title={translate("pages.roles.list.title")}
            headerButtons={
                <Button icon={<PlusOutlined />} size="large" onClick={() => navigate("/roles/create")}>
                    {translate("pages.roles.buttons.create")}
                </Button>
            }
        >
          <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex={"roleName"} title={translate("pages.roles.titles.role")}/>
            <Table.Column<IUserList>
              title={translate("pages.roles.list.actions")}
              dataIndex="actions"
              key="actions"
              render={(_, record) => {

                const isDefaultRole = record.id === 1;
              
                return (
                  <Space>
                    {permissions?.includes("EDIT:ROLES") &&
                      <EditButton
                        size="small"
                        recordItemId={record.id}
                        resource="roles"
                        onClick={() => navigate(`/roles/edit/${record.id}`)}
                      />
                    }
                    {permissions?.includes("DELETE:ROLES") &&
                      <DeleteButton
                        size="small"
                        recordItemId={record.id}
                        resource="roles"
                        disabled={isDefaultRole}
                        title={isDefaultRole ? translate("pages.roles.list.info") : undefined}
                        confirmTitle={translate("pages.roles.list.delete_message")}
                      />
                    }
                  </Space>
                )
              }}
            />
          </Table>
        </List>
      </Col>
    </Row>
  )
};