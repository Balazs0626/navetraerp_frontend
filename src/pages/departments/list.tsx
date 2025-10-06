import { useTable, List, EditButton, DeleteButton, ExportButton } from "@refinedev/antd";
import { IDepartmentList } from "../../interfaces";
import { Button, Space, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { table } from "console";
import { useNavigate } from "react-router";
import { useExport, useTranslate, useTranslation } from "@refinedev/core";
import { useEffect } from "react";

export const DepartmentList = () => {

  const { tableProps } = useTable<IDepartmentList>({
      resource: "departments",
      pagination: {
        pageSize: 10,
      }
  });

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { triggerExport, isLoading: exportLoading } = useExport<IDepartmentList>({resource: "departments"});

  useEffect(() => {
    document.title = translate("pages.departments.list.title");
  }) 

  return (
    <List
      title="Osztályok"
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("/hr/departments/create")}>
                {translate("pages.departments.buttons.create")}
            </Button>
            {/* <ExportButton onClick={triggerExport} loading={exportLoading} size="large">Export</ExportButton> */}
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
                onClick={() => navigate(`/hr/departments/edit/${record.id}`)}
              />
              <DeleteButton
                size="small"
                recordItemId={record.id}
                resource="departments"
                confirmTitle={translate("pages.departments.list.delete_message")}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
};