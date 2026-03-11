import { useTable, List, DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
import { IDeliveryNotes, IInvoiceList, ISalesOrderList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker, InputNumber, Select, Tag } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions, CanAccess } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { useSalesOrderStatus } from "../../../constants/sales_orders";
import { useInvoiceStatus } from "../../../constants/invoices";
import { CustomErrorComponent } from "../../error";
import { useDeliveryNoteStatus } from "../../../constants/delivery_notes";


export const DeliveryNoteList = () => {

  const { tableProps, setFilters } = useTable<IDeliveryNotes>({
    resource: "delivery_notes",
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

    if (values.createDate) {
      filters.push({
        field: "createDate",
        operator: "eq" as const,
        value: dayjs(values.createDate).format("YYYY-MM-DD"),
      });
    }

    if (values.shippingDate) {
      filters.push({
        field: "shippingDate",
        operator: "eq" as const,
        value: dayjs(values.shippingDate).format("YYYY-MM-DD"),
      });
    }

    setFilters(filters);
  };

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = `${translate("pages.delivery_notes.list.title")} | NavetraERP`;
  })

  return (
    <CanAccess 
      resource="delivery_notes" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
        title={translate("pages.delivery_notes.list.title")}
        headerButtons={
            <Space>
              <Button icon={<PlusOutlined/>} size="large" type="primary" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:DELIVERY_NOTES")}>
                {translate("pages.delivery_notes.buttons.create")}
              </Button>
              <Button icon={<ArrowLeftOutlined/>} size="large" onClick={() => navigate("/inventory")}>
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
                      label={translate("pages.delivery_notes.titles.id")}
                    >
                      <Input placeholder={`${translate("pages.delivery_notes.titles.id")}...`}/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="status"
                      label={translate("pages.delivery_notes.titles.status")}
                    >
                      <Select placeholder={translate("selects.delivery_notes.placeholder_status")} options={useDeliveryNoteStatus()}/>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="createDate"
                      label={translate("pages.delivery_notes.titles.create_date")}
                    >
                      <DatePicker 
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="shippingDate"
                      label={translate("pages.delivery_notes.titles.shipping_date")}
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
              <Table.Column dataIndex={"receiptNumber"} title={translate("pages.delivery_notes.titles.id")}/>
              <Table.Column dataIndex={"createDate"} title={translate("pages.delivery_notes.titles.create_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
              <Table.Column dataIndex={"shippingDate"} title={translate("pages.delivery_notes.titles.shipping_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
              <Table.Column 
                dataIndex={"status"} 
                title={translate("pages.delivery_notes.titles.status")}
                render={(value) => {
                let color = "default";
                switch (value) {
                  case "draft":
                    color = "default";
                    break;
                  case "shipped":
                    color = "blue";
                    break;
                  case "delivered":
                    color = "green";
                    break;
                  case "cancelled":
                    color = "volcano";
                    break;
                  default:
                    color = "default";
                }

                return (
                  <Tag color={color}>
                    {translate(`selects.delivery_notes.options_status.${value}`).toUpperCase()}
                  </Tag>
                );
              }}
              />
              <Table.Column
                title={translate("pages.delivery_notes.titles.actions")}
                dataIndex="actions"
                key="actions"
                render={(_, record) => (
                  <Space>
                    <ShowButton
                      size="small"
                      recordItemId={record.id}
                      resource="delivery_notes"
                    />
                    <EditButton
                      size="small"
                      recordItemId={record.id}
                      resource="delivery_notes"
                      disabled={!permissions?.includes("EDIT:DELIVERY_NOTES")}
                    />
                    <DeleteButton
                      size="small"
                      recordItemId={record.id}
                      resource="delivery_notes"
                      confirmTitle={translate("notifications.deleteMessage")}
                      disabled={!permissions?.includes("DELETE:DELIVERY_NOTES")}
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