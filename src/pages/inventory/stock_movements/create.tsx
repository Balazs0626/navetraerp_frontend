import { ArrowLeftOutlined, DeleteOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { CanAccess, useLink, useList, useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { WarehouseSelect } from "../../../components/WarehouseSelect";
import { EmployeeOneSelect } from "../../../components/EmployeeOneSelect";
import { useStockMovementType } from "../../../constants/stock_movements";
import { IProductList } from "../../../interfaces";
import { CustomErrorComponent } from "../../error";

export const StockMovementCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "stock_movements",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.stock_movements.create.title")} | NavetraERP`;
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
      resource="stock_movements" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.stock_movements.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/inventory/stock_movements")}
              size="large"
            ><ArrowLeftOutlined/>{translate("pages.stock_movements.buttons.back")}</Button>
          </Space>
        }
      >
        <Form
          {...formProps}
          form={form}
          layout="vertical"
        >
          <Card 
            title={translate("pages.stock_movements.titles.data")}
            type="inner"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.stock_movements.titles.product")}
                  name="productId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <ProductSelect/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.stock_movements.titles.from_warehouse")}
                  name="fromWarehouseId"
                >
                  <WarehouseSelect/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.stock_movements.titles.to_warehouse")}
                  name="toWarehouseId"
                >
                  <WarehouseSelect/>
                </Form.Item>
              </Col>
  {/*             <Col span={6}>
                <Form.Item
                  label={translate("pages.stock_movements.titles.quantity")}
                  name="quantity"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <InputNumber min={0.01} step={0.01} style={{ width: "100%" }} placeholder={translate("inputs.stock_movements.placeholder.quantity")}/>
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
                        label={translate("pages.stock_movements.titles.quantity")}
                        name="quantity"
                        rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                      >
                        <InputNumber
                          placeholder={`${translate("pages.stock_movements.titles.quantity")}...`}
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
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.stock_movements.titles.reference_document")}
                  name="referenceDocument"
                >
                  <Input style={{ width: "100%" }} placeholder={`${translate("pages.stock_movements.titles.reference_document")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.stock_movements.titles.performed_by")}
                  name="performedById"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <EmployeeOneSelect/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.stock_movements.titles.movement_date")}
                  name="movementDate"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <DatePicker
                    style={{width: '100%'}}
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.stock_movements.titles.movement_type")}
                  name="movementType"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Select placeholder={translate("selects.stock_movements.placeholder_movement_type")} options={useStockMovementType()}/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Create>
    </CanAccess>
  )
}