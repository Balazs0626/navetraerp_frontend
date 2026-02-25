import { useTable, List, DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
import { IInvoiceList, ISalesOrderList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker, InputNumber, Select, Tag } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions, CanAccess } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { useSalesOrderStatus } from "../../../constants/sales_orders";
import { useInvoiceStatus } from "../../../constants/invoices";
import { CustomErrorComponent } from "../../error";


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

    if (values.receiptNumber) {
      filters.push({
        field: "receiptNumber",
        operator: "contains" as const,
        value: values.receiptNumber,
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
    document.title = `${translate("pages.invoices.list.title")} | NavetraERP`;
  })

  return (
    <CanAccess 
      resource="invoices" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
        title={translate("pages.invoices.list.title")}
        headerButtons={
            <Space>
              <Button icon={<PlusOutlined/>} size="large" type="primary" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:PURCHASE_ORDERS")}>
                {translate("pages.invoices.buttons.create")}
              </Button>
              <Button icon={<ArrowLeftOutlined/>} size="large" onClick={() => navigate("/sales")}>
                {translate("buttons.back_module")}
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
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="receiptNumber"
                      label={translate("pages.invoices.titles.id")}
                    >
                      {/* <InputNumber placeholder="Bizonylatszám..." style={{width: "100%"}}/> */}
                      <Input placeholder={`${translate("pages.invoices.titles.id")}...`}/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="status"
                      label={translate("pages.invoices.titles.status")}
                    >
                      <Select placeholder={translate("selects.invoices.placeholder_status")} options={useInvoiceStatus()}/>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="invoiceDate"
                      label={translate("pages.invoices.titles.invoice_date")}
                    >
                      <DatePicker 
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
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
              <Table.Column dataIndex={"receiptNumber"} title={translate("pages.invoices.titles.id")}/>
              <Table.Column dataIndex={"invoiceDate"} title={translate("pages.invoices.titles.invoice_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
              <Table.Column dataIndex={"dueDate"} title={translate("pages.invoices.titles.due_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
              <Table.Column 
                dataIndex={"status"} 
                title={translate("pages.invoices.titles.status")}
                render={(value) => {
                let color = "default";
                switch (value) {
                  case "draft":
                    color = "default";
                    break;
                  case "issued":
                    color = "blue";
                    break;
                  case "paid":
                    color = "green";
                    break;
                  default:
                    color = "default";
                }

                return (
                  <Tag color={color}>
                    {translate(`selects.invoices.options_status.${value}`).toUpperCase()}
                  </Tag>
                );
              }}
              />
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
                      disabled={!permissions?.includes("EDIT:PURCHASE_ORDERS") || record.status == "paid"}
                    />
                    <DeleteButton
                      size="small"
                      recordItemId={record.id}
                      resource="invoices"
                      confirmTitle={translate("notifications.deleteMessage")}
                      disabled={!permissions?.includes("DELETE:PURCHASE_ORDERS") || record.status == "paid"}
                    />
                  </Space>
                )}
              />
            </Table>
          </Col>
        </Row>
      </List>
    </CanAccess>
  )
};