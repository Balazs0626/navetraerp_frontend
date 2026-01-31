import { useTable, List, DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
import { IInventoryItems, IStockMovements } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker, InputNumber, Select } from "antd";
import { CalendarOutlined, FileTextOutlined, FormOutlined, NumberOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { WarehouseSelect } from "../../../components/WarehouseSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { useStockMovementType } from "../../../constants/stock_movements";


export const StockMovementList = () => {

  const { tableProps, setFilters } = useTable<IStockMovements>({
    resource: "stock_movements",
    pagination: {
      pageSize: 10,
    },
    filters: {
      permanent: [],
      initial: [],
    }
  });

  const [form] = Form.useForm();

  const onSearch = (values: any) => {
    const filters = [];

    if (values.productId) {
      filters.push({
        field: "productId",
        operator: "eq" as const,
        value: values.productId,
      });
    }

    if (values.referenceDocument) {
      filters.push({
        field: "referenceDocument",
        operator: "contains" as const,
        value: values.referenceDocument,
      });
    }

    if (values.movementType) {
      filters.push({
        field: "movementType",
        operator: "eq" as const,
        value: values.movementType,
      });
    }

    if (values.movementDate) {
      filters.push({
        field: "movementDate",
        operator: "eq" as const,
        value: dayjs(values.movementDate).format("YYYY-MM-DD"),
      });
    }

    setFilters(filters);
  };

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = `${translate("pages.stock_movements.list.title")} | NavetraERP`;
  }) 

  return (
    <List
      title={translate("pages.stock_movements.list.title")}
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:PURCHASE_ORDERS")}>
                {translate("pages.stock_movements.buttons.create")}
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
                    name="productId"
                    label={translate("pages.stock_movements.titles.product")}
                  >
                    <ProductSelect/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="referenceDocument"
                    label={translate("pages.stock_movements.titles.reference_document")}
                  >
                    <Input placeholder={translate("inputs.stock_movements.placeholder.reference_document")}/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="movementType"
                    label={translate("pages.stock_movements.titles.movement_type")}
                  >
                    <Select options={useStockMovementType()}/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="movementDate"
                    label={translate("pages.stock_movements.titles.movement_date")}
                  >
                    <DatePicker 
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
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
              </Row>
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={16}>
          <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex={"productName"} title={translate("pages.stock_movements.titles.product")}/>
            <Table.Column dataIndex={"referenceDocument"} title={translate("pages.stock_movements.titles.reference_document")}/>
            <Table.Column dataIndex={"movementType"} title={translate("pages.stock_movements.titles.movement_type")}/>
            <Table.Column dataIndex={"movementDate"} title={translate("pages.stock_movements.titles.movement_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
            <Table.Column
              title={translate("pages.stock_movements.titles.actions")}
              dataIndex="actions"
              key="actions"
              render={(_, record) => (
                <Space>
                  <ShowButton
                    size="small"
                    recordItemId={record.id}
                    resource="stock_movements"
                  />
                  <EditButton
                    size="small"
                    recordItemId={record.id}
                    resource="stock_movements"
                    disabled={!permissions?.includes("EDIT:SUPPLIERS")}
                  />
                  <DeleteButton
                    size="small"
                    recordItemId={record.id}
                    resource="stock_movements"
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