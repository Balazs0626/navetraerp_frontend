import { useTable, List, EditButton, DeleteButton } from "@refinedev/antd";
import { IPositionList, IShiftList } from "../../../interfaces";
import { Button, Space, Table } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { CanAccess, usePermissions, useTranslation } from "@refinedev/core";
import { useEffect } from "react";
import { CustomErrorComponent } from "../../error";

export const ShiftList = () => {

  const { tableProps } = useTable<IShiftList>({
    resource: "shifts",
    pagination: {
      pageSize: 10,
    }
  });

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = `${translate("pages.shifts.list.title")} | NavetraERP`;
  })

  return (
    <CanAccess 
      resource="shifts" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
        title={translate("pages.shifts.list.title")}
        headerButtons={
            <Space>
              <Button icon={<PlusOutlined/>} size="large" type="primary" onClick={() => navigate("/hr/shifts/create")} disabled={!permissions?.includes("CREATE:SHIFTS")}>
                  {translate("pages.shifts.buttons.create")}
              </Button>
              <Button icon={<ArrowLeftOutlined/>} size="large" onClick={() => navigate("/hr")}>
                {translate("buttons.back_module")}
              </Button>
            </Space>
        }
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex={"shiftName"} title={translate("pages.shifts.titles.shift")}/>
          <Table.Column 
            dataIndex={"startTime"} 
            title={translate("pages.shifts.titles.start_time")}
            render={(value) => {
              if (typeof value === 'string' && value.length >= 5) {
                return value.substring(0, 5);
              }
              return value;
            }}
          />
          <Table.Column 
            dataIndex={"endTime"} 
            title={translate("pages.shifts.titles.end_time")}
            render={(value) => {
              if (typeof value === 'string' && value.length >= 5) {
                return value.substring(0, 5);
              }
              return value;
            }}
          />
          <Table.Column<IPositionList>
            title={translate("pages.shifts.list.actions")}
            dataIndex="actions"
            key="actions"
            render={(_, record) => (
              <Space>
                <EditButton
                  size="small"
                  recordItemId={record.id}
                  resource="shifts"
                  onClick={() => navigate(`/hr/shifts/edit/${record.id}`)}
                  disabled={!permissions?.includes("EDIT:SHIFTS")}
                />
                <DeleteButton
                  size="small"
                  recordItemId={record.id}
                  resource="shifts"
                  confirmTitle={translate("notifications.deleteMessage")}
                  disabled={!permissions?.includes("DELETE:SHIFTS")}
                />
              </Space>
            )}
          />
        </Table>
      </List>
    </CanAccess>
  )
}