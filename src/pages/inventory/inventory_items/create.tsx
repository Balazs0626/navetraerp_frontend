import { ArrowLeftOutlined, DeleteOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { WarehouseSelect } from "../../../components/WarehouseSelect";

export const InventoryItemCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "inventory_items",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = translate("pages.inventory_items.create.title");
  })

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate("pages.inventory_items.create.title")}
      goBack={null}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/inventory/inventory_items")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.inventory_items.buttons.back")}</Button>
        </Space>
      }
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
      >
        <Card 
          title={translate("pages.inventory_items.titles.data")}
          type="inner"
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={translate("pages.inventory_items.titles.warehouse")}
                name="warehouseId"
                rules={[{ required: true }]}
              >
                <WarehouseSelect/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.inventory_items.titles.product")}
                name="productId"
                rules={[{ required: true }]}
              >
                <ProductSelect/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.inventory_items.titles.quantity_on_hand")}
                name="quantityOnHand"
                rules={[{ required: true }]}
              >
                <InputNumber min={0.01} step={0.01} placeholder={translate("inputs.inventory_items.placeholder.quantity_on_hand")} style={{ width: "100%" }}/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.inventory_items.titles.batch_number")}
                name="batchNumber"
                rules={[{ required: true }]}
              >
                <Input placeholder={translate("inputs.inventory_items.placeholder.batch_number")}/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Create>
  )

}