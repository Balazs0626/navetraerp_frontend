import { ArrowLeftOutlined, DeleteOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { CanAccess, useList, useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { WarehouseSelect } from "../../../components/WarehouseSelect";
import { IProductList } from "../../../interfaces";
import { CustomErrorComponent } from "../../error";

export const InventoryItemCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "inventory_items",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.inventory_items.create.title")} | NavetraERP`;
  })

  const { result: productsData } = useList<IProductList>({
    resource: "products",
    pagination: { mode: "off" },
  });
  
  const products = productsData?.data ?? [];

  const getUnitByProductId = (productId?: number) => {
    return products.find(p => p.id === productId)?.unit ?? "";
  };

  return (
    <CanAccess 
      resource="inventory_items" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
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
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <WarehouseSelect/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.inventory_items.titles.product")}
                  name="productId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <ProductSelect/>
                </Form.Item>
              </Col>
  {/*             <Col span={6}>
                <Form.Item
                  label={translate("pages.inventory_items.titles.quantity_on_hand")}
                  name="quantityOnHand"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <InputNumber min={0.01} step={0.01} placeholder={`${translate("pages.inventory_items.titles.quantity_on_hand")}...`} style={{ width: "100%" }}/>
                </Form.Item>
              </Col> */}
              <Col span={6}>
                <Form.Item
                  shouldUpdate={(prev, curr) => prev.productId !== curr.productId}
                  noStyle
                >
                  {() => {
                    const productId = form.getFieldValue("productId");
                    const unit = getUnitByProductId(productId) || "";

                    return (
                      <Form.Item
                        label={translate("pages.inventory_items.titles.quantity_on_hand")}
                        name="quantity_on_hand"
                        rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                      >
                        <InputNumber
                          placeholder={`${translate("pages.inventory_items.titles.quantity_on_hand")}...`}
                          min={0.01}
                          step={0.01}
                          style={{ width: "100%" }}
                          addonAfter={unit}
                        />
                      </Form.Item>
                    );
                  }}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.inventory_items.titles.batch_number")}
                  name="batchNumber"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.inventory_items.titles.batch_number")}...`}/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Create>
    </CanAccess>
  )
}