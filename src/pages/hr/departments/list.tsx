import { useTable, List, EditButton, DeleteButton, ExportButton } from "@refinedev/antd";
import { IDepartmentCreate, IDepartmentList } from "../../../interfaces";
import { Button, Card, Input, Space, Table } from "antd";
import { ArrowLeftOutlined, ImportOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { CanAccess, useExport, useImport, usePermissions, useTranslation } from "@refinedev/core";
import { useEffect } from "react";
import { CustomErrorComponent } from "../../error";

export const DepartmentList = () => {

  const { tableProps } = useTable<IDepartmentList>({
      resource: "departments",
      pagination: {
        pageSize: 10,
      }
  });

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = `${translate("pages.departments.list.title")} | NavetraERP`;
  }) 

  return (
    <CanAccess 
      resource="departments" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
        title={translate("pages.departments.list.title")}
        headerButtons={
            <Space>
              <Button icon={<PlusOutlined/>} size="large" type="primary" onClick={() => navigate("/hr/departments/create")} disabled={!permissions?.includes("CREATE:DEPARTMENTS")}>
                  {translate("pages.departments.buttons.create")}
              </Button>
              <Button icon={<ArrowLeftOutlined/>} size="large" onClick={() => navigate("/hr")}>
                  {translate("buttons.back_module")}
              </Button>
            </Space>
        }
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex={"departmentName"} title={translate("pages.departments.titles.department")}/>
          <Table.Column dataIndex={"description"} title={translate("pages.departments.titles.description")}/>
          <Table.Column<IDepartmentList>
            title={translate("pages.departments.list.actions")}
            dataIndex="actions"
            key="actions"
            render={(_, record) => (
              <Space>
                <EditButton
                  size="small"
                  recordItemId={record.id}
                  resource="departments"
                  disabled={!permissions?.includes("EDIT:DEPARTMENTS")}
                />
                <DeleteButton
                  size="small"
                  recordItemId={record.id}
                  resource="departments"
                  confirmTitle={translate("notifications.deleteMessage")}
                  disabled={!permissions?.includes("DELETE:DEPARTMENTS")}
                />
              </Space>
            )}
          />
        </Table>
      </List>
    </CanAccess>
  )
};