import { useTable, List, DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
import { IInvoiceList, ISalesOrderList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker, InputNumber, Select } from "antd";
import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { useSalesOrderStatus } from "../../../constants/sales_orders";


export const InvoiceList = () => {

  const { tableProps, setFilters } = useTable<IInvoiceList>({
    resource: "invoices",
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

    if (values.invoiceDate) {
      filters.push({
        field: "invoiceDate",
        operator: "eq" as const,
        value: dayjs(values.invoiceDate).format("YYYY-MM-DD"),
      });
    }

    setFilters(filters);
  };

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = translate("pages.invoices.list.title");
  }) 

  return (
    <List
      title={translate("pages.invoices.list.title")}
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:PURCHASE_ORDERS")}>
                {translate("pages.invoices.buttons.create")}
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
                label={translate("pages.invoices.titles.id")}
              >
                <InputNumber placeholder="Bizonylatszám..." style={{width: "100%"}}/>
              </Form.Item>

              <Form.Item
                name="status"
                label={translate("pages.invoices.titles.status")}
              >
                <Select options={useSalesOrderStatus()}/>
              </Form.Item>

              <Form.Item
                name="invoiceDate"
                label={translate("pages.invoices.titles.invoice_date")}
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
            <Table.Column dataIndex={"id"} title={translate("pages.invoices.titles.id")}/>
            <Table.Column dataIndex={"invoiceDate"} title={translate("pages.invoices.titles.invoice_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
            <Table.Column dataIndex={"dueDate"} title={translate("pages.invoices.titles.due_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
            <Table.Column dataIndex={"status"} title={translate("pages.invoices.titles.status")}/>
            <Table.Column
              title={translate("pages.invoices.titles.actions")}
              dataIndex="actions"
              key="actions"
              render={(_, record) => (
                <Space>
                  <ShowButton
                    size="small"
                    recordItemId={record.id}
                    resource="invoices"
                  />
                  <EditButton
                    size="small"
                    recordItemId={record.id}
                    resource="invoices"
                    disabled={!permissions?.includes("EDIT:PURCHASE_ORDERS")}
                  />
                  <DeleteButton
                    size="small"
                    recordItemId={record.id}
                    resource="invoices"
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