import { useTable, List, EditButton, DeleteButton, ExportButton } from "@refinedev/antd";
import { IPositionList, IShiftList } from "../../interfaces";
import { Button, Space, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { table } from "console";
import { useNavigate } from "react-router";
import { useExport, useTranslate, useTranslation } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export const ShiftList = () => {

  const { tableProps } = useTable<IShiftList>({
    resource: "shifts",
    pagination: {
      pageSize: 10,
    }
  });

  const navigate = useNavigate();
  const { translate } = useTranslation();

  useEffect(() => {
    document.title = translate("pages.shifts.list.title");
  }) 

  return (
    <List
      title={translate("pages.shifts.list.title")}
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("/hr/shifts/create")}>
                {translate("pages.shifts.buttons.create")}
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
              />
              <DeleteButton
                size="small"
                recordItemId={record.id}
                resource="shifts"
                confirmTitle={translate("notifications.deleteMessage")}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
};