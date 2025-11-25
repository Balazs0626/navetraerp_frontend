import { useTable, List, DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
import { IPurchaseOrderList, ISupplierList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker } from "antd";
import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';


export const PurchaseOrderList = () => {

  const { tableProps, setFilters } = useTable<IPurchaseOrderList>({
    resource: "purchase_orders",
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
    document.title = translate("pages.purchase_orders.list.title");
  }) 

  return (
    <List
      title={translate("pages.purchase_orders.list.title")}
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:WORK_SCHEDULES")}>
                {translate("pages.purchase_orders.buttons.create")}
            </Button>
          </Space>
      }
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={"id"} title={translate("pages.purchase_orders.titles.id")}/>
        <Table.Column dataIndex={"orderDate"} title={translate("pages.purchase_orders.titles.order_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
        <Table.Column dataIndex={"expectedDeliveryDate"} title={translate("pages.purchase_orders.titles.expected_delivery_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
        <Table.Column dataIndex={"status"} title={translate("pages.purchase_orders.titles.status")}/>
        <Table.Column
          title={translate("pages.purchase_orders.titles.actions")}
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            <Space>
              <ShowButton
                size="small"
                recordItemId={record.id}
                resource="purchase_orders"
              />
              <EditButton
                size="small"
                recordItemId={record.id}
                resource="purchase_orders"
                disabled={!permissions?.includes("EDIT:WORK_SCHEDULES")}
              />
              <DeleteButton
                size="small"
                recordItemId={record.id}
                resource="purchase_orders"
                confirmTitle={translate("notifications.deleteMessage")}
                disabled={!permissions?.includes("DELETE:WORK_SCHEDULES")}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
};