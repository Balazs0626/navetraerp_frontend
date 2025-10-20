import { useTable, List, EditButton, DeleteButton, ExportButton } from "@refinedev/antd";
import { IDepartmentList, IEmployeeList } from "../../interfaces";
import { Button, Space, Table } from "antd";
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleFilled, CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { table } from "console";
import { useNavigate } from "react-router";
import { useExport, useTranslate, useTranslation } from "@refinedev/core";
import { useEffect } from "react";

export const EmployeeList = () => {

  const { tableProps } = useTable<IEmployeeList>({
      resource: "employee",
      pagination: {
        pageSize: 10,
      }
  });

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { triggerExport, isLoading: exportLoading } = useExport<IEmployeeList>({resource: "employee"});

  useEffect(() => {
    document.title = translate("pages.employee.list.title");
  }) 

  return (
    <List
      title={translate("pages.employee.list.title")}
      headerButtons={
        <Space>
          <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("/hr/employee/create")}>
            {translate("pages.employee.buttons.create")}
          </Button>
        </Space>
      }
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={"fullName"} title={translate("pages.employee.titles.employee")}/>
        <Table.Column dataIndex={"departmentName"} title={translate("pages.employee.titles.department_name")}/>
        <Table.Column dataIndex={"positionName"} title={translate("pages.employee.titles.position_name")}/>
        <Table.Column 
            dataIndex="hasUser"
            title={translate("pages.employee.titles.has_user")}
            align="center"
            render={(value: boolean) => (
              <Space>
                {value ? (
                    <CheckCircleOutlined 
                        style={{ color: '#52C41A', fontSize: 18 }} 
                    />
                ) : (
                    <CloseCircleOutlined 
                        style={{ color: '#FF4D4F', fontSize: 18 }} 
                    />
                )}
              </Space>
            )}
        />
        <Table.Column<IDepartmentList>
          title={translate("pages.employee.list.actions")}
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            <Space>
              <EditButton
                size="small"
                recordItemId={record.id}
                resource="employee"
                onClick={() => navigate(`/hr/employee/edit/${record.id}`)}
              />
              <DeleteButton
                size="small"
                recordItemId={record.id}
                resource="employee"
                confirmTitle={translate("notifications.deleteMessage")}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
};