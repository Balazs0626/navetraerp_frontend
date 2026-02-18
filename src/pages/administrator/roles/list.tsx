import { DeleteButton, EditButton, List, useTable } from "@refinedev/antd";
import { Space, Table, Input, Form, Row, Col, Button } from "antd";
import { IUserList } from "../../../interfaces";
import { useEffect, useState } from "react";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { CanAccess, usePermissions, useTranslation } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { CustomErrorComponent } from "../../error";

const { Search } = Input;

export const RoleList = () => {

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions, isLoading } = usePermissions<string[]>({});

  const { tableProps } = useTable<IUserList>({
    resource: "roles",
  });

  useEffect(() => {
    document.title = `${translate("pages.roles.list.title")} | NavetraERP`;
  });

  return (
    <CanAccess 
      resource="roles" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
          title={translate("pages.roles.list.title")}
          headerButtons={
            <Space>
              <Button icon={<PlusOutlined />} size="large" type="primary" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:ROLES")}>
                  {translate("pages.roles.buttons.create")}
              </Button>
              <Button icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate("/administrator")}>
                  {translate("buttons.back_module")}
              </Button>
            </Space>
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
                  {/* {permissions?.includes("EDIT:ROLES") && */}
                    <EditButton
                      size="small"
                      recordItemId={record.id}
                      resource="roles"
                      disabled={!permissions?.includes("EDIT:ROLES")}
                    />
                  {/* } */}
                  {/* {permissions?.includes("DELETE:ROLES") && */}
                    <DeleteButton
                      size="small"
                      recordItemId={record.id}
                      resource="roles"
                      disabled={isDefaultRole || !permissions?.includes("DELETE:ROLES")}
                      title={isDefaultRole ? translate("pages.roles.list.info") : undefined}
                      confirmTitle={translate("notifications.deleteMessage")}
                    />
                  {/* } */}
                </Space>
              )
            }}
          />
        </Table>
      </List>
  </CanAccess>
  )
};