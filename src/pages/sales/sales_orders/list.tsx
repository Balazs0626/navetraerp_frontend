import { useTable, List, DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
import { ISalesOrderList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker, InputNumber, Select } from "antd";
import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { useSalesOrderStatus } from "../../../constants/sales_orders";


export const SalesOrderList = () => {

  const { tableProps, setFilters } = useTable<ISalesOrderList>({
    resource: "sales_orders",
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

    if (values.id) {
      filters.push({
        field: "id",
        operator: "eq" as const,
        value: values.id,
      });
    }

    if (values.status) {
      filters.push({
        field: "status",
        operator: "eq" as const,
        value: values.status,
      });
    }

    if (values.orderDate) {
      filters.push({
        field: "orderDate",
        operator: "eq" as const,
        value: dayjs(values.orderDate).format("YYYY-MM-DD"),
      });
    }

    setFilters(filters);
  };

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = translate("pages.sales_orders.list.title");
  }) 

  return (
    <List
      title={translate("pages.sales_orders.list.title")}
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:PURCHASE_ORDERS")}>
                {translate("pages.sales_orders.buttons.create")}
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
                name="id"
                label={translate("pages.sales_orders.titles.id")}
              >
                <InputNumber placeholder="Bizonylatszám..." style={{width: "100%"}}/>
              </Form.Item>

              <Form.Item
                name="status"
                label={translate("pages.sales_orders.titles.status")}
              >
                <Select options={useSalesOrderStatus()}/>
              </Form.Item>

              <Form.Item
                name="orderDate"
                label={translate("pages.sales_orders.titles.order_date")}
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
            <Table.Column dataIndex={"id"} title={translate("pages.sales_orders.titles.id")}/>
            <Table.Column dataIndex={"orderDate"} title={translate("pages.sales_orders.titles.order_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
            <Table.Column dataIndex={"requiredDeliveryDate"} title={translate("pages.sales_orders.titles.required_delivery_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
            <Table.Column dataIndex={"status"} title={translate("pages.sales_orders.titles.status")}/>
            <Table.Column
              title={translate("pages.sales_orders.titles.actions")}
              dataIndex="actions"
              key="actions"
              render={(_, record) => (
                <Space>
                  <ShowButton
                    size="small"
                    recordItemId={record.id}
                    resource="sales_orders"
                  />
                  <EditButton
                    size="small"
                    recordItemId={record.id}
                    resource="sales_orders"
                    disabled={!permissions?.includes("EDIT:PURCHASE_ORDERS")}
                  />
                  <DeleteButton
                    size="small"
                    recordItemId={record.id}
                    resource="sales_orders"
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