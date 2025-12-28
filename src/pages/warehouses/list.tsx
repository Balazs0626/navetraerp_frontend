import { useTable, List, DeleteButton, EditButton } from "@refinedev/antd";
import { IWarehouseList } from "../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker } from "antd";
import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';


export const WarehouseList = () => {

  const { tableProps, setFilters } = useTable<IWarehouseList>({
    resource: "warehouses",
    pagination: {
      pageSize: 10,
    },
    filters: {
      permanent: [],
      initial: [],
    },
  });

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = translate("pages.warehouses.list.title");
  }) 

  return (
    <List
      title={translate("pages.warehouses.list.title")}
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:WAREHOUSES")}>
                {translate("pages.warehouses.buttons.create")}
            </Button>
          </Space>
      }
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={"name"} title={translate("pages.warehouses.titles.name")}/>
        <Table.Column dataIndex={"address"} title={translate("pages.warehouses.titles.address")}/>
        <Table.Column dataIndex={"managerName"} title={translate("pages.warehouses.titles.manager")}/>
        <Table.Column
          title={translate("pages.warehouses.list.actions")}
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            <Space>
              <EditButton
                size="small"
                recordItemId={record.id}
                resource="warehouses"
                onClick={() => navigate(`edit/${record.id}`)}
                disabled={!permissions?.includes("EDIT:WAREHOUSES")}
              />
              <DeleteButton
                size="small"
                recordItemId={record.id}
                resource="warehouses"
                confirmTitle={translate("notifications.deleteMessage")}
                disabled={!permissions?.includes("DELETE:WAREHOUSES")}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
};