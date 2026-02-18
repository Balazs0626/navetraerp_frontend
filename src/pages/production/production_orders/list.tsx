import { useTable, List, DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
import { IProductionOrderList, IPurchaseOrderList, ISupplierList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker, InputNumber, Select } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions, CanAccess } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { ProductSelect } from "../../../components/ProductSelect";
import { CustomErrorComponent } from "../../error";


export const ProductionOrderList = () => {

  const { tableProps, setFilters } = useTable<IProductionOrderList>({
    resource: "production_orders",
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

    if (values.product) {
      filters.push({
        field: "product",
        operator: "eq" as const,
        value: values.product,
      });
    }

    if (values.startDate) {
      filters.push({
        field: "startDate",
        operator: "eq" as const,
        value: dayjs(values.endDate).format("YYYY-MM-DD"),
      });
    }

    if (values.endDate) {
      filters.push({
        field: "endDate",
        operator: "eq" as const,
        value: dayjs(values.endDate).format("YYYY-MM-DD"),
      });
    }

    setFilters(filters);
  };

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = `${translate("pages.production_orders.list.title")} | NavetraERP`;
  })

  return (
    <CanAccess 
      resource="production_orders" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
        title={translate("pages.production_orders.list.title")}
        headerButtons={
            <Space>
              <Button icon={<PlusOutlined/>} size="large" type="primary" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:PRODUCTION_ORDERS")}>
                {translate("pages.production_orders.buttons.create")}
              </Button>
              <Button icon={<ArrowLeftOutlined/>} size="large" onClick={() => navigate("/production")}>
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
                      label={translate("pages.production_orders.titles.id")}
                    >
                      <Input placeholder={`${translate("pages.production_orders.titles.id")}...`}/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="product"
                      label={translate("pages.production_orders.titles.product")}
                    >
                      <ProductSelect/>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="startDate"
                      label={translate("pages.production_orders.titles.start_date")}
                    >
                      <DatePicker 
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="endDate"
                      label={translate("pages.production_orders.titles.end_date")}
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
              <Table.Column dataIndex={"receiptNumber"} title={translate("pages.production_orders.titles.id")}/>
              <Table.Column dataIndex={"productName"} title={translate("pages.production_orders.titles.product")}/>
              <Table.Column dataIndex={"startDate"} title={translate("pages.production_orders.titles.start_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
              <Table.Column dataIndex={"endDate"} title={translate("pages.production_orders.titles.end_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
              <Table.Column dataIndex={"status"} title={translate("pages.production_orders.titles.status")}/>
              <Table.Column
                title={translate("pages.production_orders.titles.actions")}
                dataIndex="actions"
                key="actions"
                render={(_, record) => (
                  <Space>
                    <ShowButton
                      size="small"
                      recordItemId={record.id}
                      resource="production_orders"
                    />
                    <EditButton
                      size="small"
                      recordItemId={record.id}
                      resource="production_orders"
                      disabled={!permissions?.includes("EDIT:PRODUCTION_ORDERS")}
                    />
                    <DeleteButton
                      size="small"
                      recordItemId={record.id}
                      resource="production_orders"
                      confirmTitle={translate("notifications.deleteMessage")}
                      disabled={!permissions?.includes("DELETE:PRODUCTION_ORDERS")}
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