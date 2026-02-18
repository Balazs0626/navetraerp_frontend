import { useTable, List, DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
import { IInventoryItems } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker, InputNumber, Select } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, FileTextOutlined, FormOutlined, NumberOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions, CanAccess } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { WarehouseSelect } from "../../../components/WarehouseSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { CustomErrorComponent } from "../../error";


export const InventoryItemList = () => {

  const { tableProps, setFilters } = useTable<IInventoryItems>({
    resource: "inventory_items",
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

    if (values.warehouseId) {
      filters.push({
        field: "warehouseId",
        operator: "eq" as const,
        value: values.warehouseId,
      });
    }

    if (values.productId) {
      filters.push({
        field: "productId",
        operator: "eq" as const,
        value: values.productId,
      });
    }

    if (values.batchNumber) {
      filters.push({
        field: "batchNumber",
        operator: "contains" as const,
        value: values.batchNumber,
      });
    }

    setFilters(filters);
  };

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = `${translate("pages.inventory_items.list.title")} | NavetraERP`;
  }) 

  return (
    <CanAccess 
      resource="inventory_items" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
        title={translate("pages.inventory_items.list.title")}
        headerButtons={
            <Space>
              <Button icon={<PlusOutlined/>} size="large" type="primary" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:INVENTORY_ITEMS")}>
                  {translate("pages.inventory_items.buttons.create")}
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
                  <Col span={24}>
                    <Form.Item
                      name="warehouseId"
                      label={translate("pages.inventory_items.titles.warehouse")}
                    >
                      <WarehouseSelect/>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="productId"
                      label={translate("pages.inventory_items.titles.product")}
                    >
                      <ProductSelect/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="batchNumber"
                      label={translate("pages.inventory_items.titles.batch_number")}
                    >
                      <Input
                        placeholder={`${translate("pages.inventory_items.titles.batch_number")}...`}
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
              <Table.Column dataIndex={"warehouseName"} title={translate("pages.inventory_items.titles.warehouse")}/>
              <Table.Column dataIndex={"productName"} title={translate("pages.inventory_items.titles.product")}/>
              <Table.Column dataIndex={"batchNumber"} title={translate("pages.inventory_items.titles.batch_number")}/>
              <Table.Column dataIndex={"quantityOnHand"} title={translate("pages.inventory_items.titles.quantity_on_hand")}/>
              <Table.Column dataIndex={"productUnit"} title={translate("pages.inventory_items.titles.unit")}/>
              <Table.Column dataIndex={"lastUpdated"} title={translate("pages.inventory_items.titles.last_updated")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
              <Table.Column
                title={translate("pages.inventory_items.titles.actions")}
                dataIndex="actions"
                key="actions"
                render={(_, record) => (
                  <Space>
                    <DeleteButton
                      size="small"
                      recordItemId={record.id}
                      resource="inventory_items"
                      confirmTitle={translate("notifications.deleteMessage")}
                      disabled={!permissions?.includes("DELETE:INVENTORY_ITEMS")}
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
}