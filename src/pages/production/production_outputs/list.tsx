import { useTable, List, DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
import { IProductionOrderList, IPurchaseOrderList, ISupplierList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker, InputNumber, Select } from "antd";
import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { ProductSelect } from "../../../components/ProductSelect";


export const ProductionOutputList = () => {

  const { tableProps, setFilters } = useTable<IProductionOrderList>({
    resource: "production_outputs",
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
    document.title = translate("pages.production_outputs.list.title");
  }) 

  return (
    <List
      title={translate("pages.production_outputs.list.title")}
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:PURCHASE_ORDERS")}>
                {translate("pages.production_outputs.buttons.create")}
            </Button>
          </Space>
      }
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={24}>
          <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex={"productionOrderReceiptNumber"} title={translate("pages.production_outputs.titles.production_order_receipt_number")}/>
            <Table.Column dataIndex={"productName"} title={translate("pages.production_outputs.titles.product")}/>
            <Table.Column dataIndex={"quantityProduced"} title={translate("pages.production_outputs.titles.quantity_produced")} />
            <Table.Column dataIndex={"productUnit"} title={translate("pages.production_outputs.titles.product_unit")} />
            <Table.Column dataIndex={"warehouseName"} title={translate("pages.production_outputs.titles.warehouse")}/>
            <Table.Column dataIndex={"dateProduced"} title={translate("pages.production_outputs.titles.date_produced")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
            <Table.Column
              title={translate("pages.production_outputs.titles.actions")}
              dataIndex="actions"
              key="actions"
              render={(_, record) => (
                <Space>
                  <EditButton
                    size="small"
                    recordItemId={record.id}
                    resource="production_outputs"
                    disabled={!permissions?.includes("EDIT:PURCHASE_ORDERS")}
                  />
                  <DeleteButton
                    size="small"
                    recordItemId={record.id}
                    resource="production_outputs"
                    confirmTitle={translate("notifications.deleteMessage")}
                    disabled={!permissions?.includes("DELETE:PURCHASE_ORDERS")}
                  />
                </Space>
              )}
            />
          </Table>
        </Col>
      </Row>
    </List>
  )
};