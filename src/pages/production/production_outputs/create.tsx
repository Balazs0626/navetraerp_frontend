import { ArrowLeftOutlined, DeleteOutlined, ImportOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { CanAccess, useList, useNotification, useOne, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { EmployeeOneSelect } from "../../../components/EmployeeOneSelect";
import { WarehouseSelect } from "../../../components/WarehouseSelect";
import { useProductionOrderStatus } from "../../../constants/production_orders";
import { ProductionOrderSelect } from "../../../components/ProductionOrderSelect";
import { IProductList } from "../../../interfaces";
import { CustomErrorComponent } from "../../error";

export const ProductionOutputCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "production_outputs",
    redirect: false,
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.production_outputs.create.title")} | NavetraERP`;
  })

  const { result: productsData } = useList<IProductList>({
    resource: "products",
    pagination: { mode: "off" },
  });
  
  const products = productsData?.data ?? [];

  const getUnitByProductId = (productId?: number) => {
    return products.find(p => p.id === productId)?.unit ?? "";
  };

  const handleFinish = (values: any) => {
    const formattedValues = {
        ...values,
        dateProduced: values.dateProduced?.format("YYYY-MM-DD"),
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  return (
    <CanAccess 
      resource="production_outputs" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.production_outputs.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/production/production_outputs")}
              size="large"
            ><ArrowLeftOutlined/>{translate("pages.production_outputs.buttons.back")}</Button>
          </Space>
        }
      >
        <Form
          {...formProps}
          form={form}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Card 
            title={translate("pages.production_outputs.titles.data")}
            type="inner"
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.production_outputs.titles.production_order")}
                  name="productionOrderId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <ProductionOrderSelect/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.production_outputs.titles.product")}
                  name="productId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <ProductSelect/>
                </Form.Item>
              </Col>
  {/*             <Col span={8}>
                <Form.Item
                  label={translate("pages.production_outputs.titles.quantity_produced")}
                  name="quantityProduced"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <InputNumber min={1} step={0.01} style={{width: "100%"}} />
                </Form.Item>
              </Col> */}
              <Col span={8}>
                <Form.Item
                  shouldUpdate={(prev, curr) => prev.productId !== curr.productId}
                  noStyle
                >
                  {() => {
                    const productId = form.getFieldValue("productId");
                    const unit = getUnitByProductId(productId) || "";

                    return (
                      <Form.Item
                        label={translate("pages.production_outputs.titles.quantity_produced")}
                        name="quantityProduced"
                        rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                      >
                        <InputNumber
                          placeholder={`${translate("pages.production_outputs.titles.quantity_produced")}...`}
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
              <Col span={8}>
                <Form.Item
                  label={translate("pages.production_outputs.titles.warehouse")}
                  name="warehouseId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <WarehouseSelect/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.production_outputs.titles.date_produced")}
                  name="dateProduced"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <DatePicker
                    style={{width: '100%'}}
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Create>
    </CanAccess>
  )
}