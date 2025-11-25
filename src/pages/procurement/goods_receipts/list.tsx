import { useTable, List, DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
import { IGoodsReceiptList, IPurchaseOrderList, ISupplierList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker } from "antd";
import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';


export const GoodsReceiptList = () => {

  const { tableProps, setFilters } = useTable<IGoodsReceiptList>({
    resource: "goods_receipts",
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
    document.title = translate("pages.goods_receipts.list.title");
  }) 

  return (
    <List
      title={translate("pages.goods_receipts.list.title")}
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:WORK_SCHEDULES")}>
                {translate("pages.goods_receipts.buttons.create")}
            </Button>
          </Space>
      }
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={"purchaseOrderId"} title={translate("pages.goods_receipts.titles.purchase_order_id")}/>
        <Table.Column dataIndex={"warehouseName"} title={translate("pages.goods_receipts.titles.warehouse")}/>
        <Table.Column dataIndex={"receiptDate"} title={translate("pages.goods_receipts.titles.receipt_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
        <Table.Column
          title={translate("pages.goods_receipts.titles.actions")}
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            <Space>
              <ShowButton
                size="small"
                recordItemId={record.id}
                resource="goods_receipts"
              />
              <DeleteButton
                size="small"
                recordItemId={record.id}
                resource="goods_receipts"
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