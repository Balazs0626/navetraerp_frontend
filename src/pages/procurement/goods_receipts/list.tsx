import { useTable, List, DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
import { IGoodsReceiptList, IPurchaseOrderList, ISupplierList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker, InputNumber } from "antd";
import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { WarehouseSelect } from "../../../components/WarehouseSelect";


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

  const [form] = Form.useForm();

  const onSearch = (values: any) => {
    const filters = [];

    if (values.purchaseOrderId) {
      filters.push({
        field: "purchaseOrderId",
        operator: "contains" as const,
        value: values.purchaseOrderId,
      });
    }

    if (values.warehouseId) {
      filters.push({
        field: "warehouseId",
        operator: "contains" as const,
        value: values.warehouseId,
      });
    }

    if (values.date) {
      filters.push({
        field: "date",
        operator: "eq" as const,
        value: dayjs(values.date).format("YYYY-MM-DD"),
      });
    }

    setFilters(filters);
  };

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
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:GOODS_RECEIPTS")}>
                {translate("pages.goods_receipts.buttons.create")}
            </Button>
          </Space>
      }
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card
            title={translate("titles.search")}
            type="inner"
          >
            <Form form={form} layout="vertical" onFinish={onSearch}>
              <Form.Item
                name="purchaseOrderId"
                label={translate("pages.goods_receipts.titles.purchase_order_id")}
              >
                <InputNumber placeholder="Dolgozó neve..." style={{width: "100%"}}/>
              </Form.Item>

              <Form.Item
                name="warehouseId"
                label={translate("pages.goods_receipts.titles.warehouse")}
              >
                <WarehouseSelect/>
              </Form.Item>

              <Form.Item
                name="date"
                label={translate("pages.goods_receipts.titles.date")}
              >
                <DatePicker 
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                  >
                    {translate("buttons.search")}
                  </Button>
                  <Button
                    onClick={() => {
                      form.resetFields();
                      setFilters([], "replace");
                    }}
                  >
                    {translate("buttons.clear")}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={16}>
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
                    disabled={!permissions?.includes("DELETE:GOODS_RECEIPTS")}
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