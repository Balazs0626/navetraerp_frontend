import { ArrowLeftOutlined, DeleteOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { useList, useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { CustomerSelect } from "../../../components/CustomerSelect";
import { useSalesOrderStatus } from "../../../constants/sales_orders";
import { IProductList } from "../../../interfaces";
import { WarehouseSelect } from "../../../components/WarehouseSelect";

export const SalesOrderCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "sales_orders",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = translate("pages.sales_orders.create.title");
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
        orderDate: values.orderDate?.format("YYYY-MM-DD"),
        requiredDeliveryDate: values.requiredDeliveryDate?.format("YYYY-MM-DD"),
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };
  
  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate("pages.sales_orders.create.title")}
      goBack={null}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/sales/sales_orders")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.sales_orders.buttons.back")}</Button>
        </Space>
      }
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
        onValuesChange={() => {
          const items = form.getFieldValue("items") || [];

          const total = items.reduce((sum: any, item: any) => {
            const q = (Number(item?.quantityShipped) * Number(item?.pricePerUnit)) * (100 - Number(item?.discount))/100 || 0;
            return sum + q;
          }, 0);

          form.setFieldValue("totalAmount", total);
        }}
        onFinish={handleFinish}
      >
        <Card 
          title={translate("pages.sales_orders.titles.data")}
          type="inner"
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={translate("pages.sales_orders.titles.customer")}
                name="customerId"
                rules={[{ required: true }]}
              >
                <CustomerSelect/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.sales_orders.titles.order_date")}
                name="orderDate"
                rules={[{ required: true }]}
              >
                <DatePicker
									style={{width: '100%'}}
                  format="YYYY-MM-DD"
								/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.sales_orders.titles.required_delivery_date")}
                name="requiredDeliveryDate"
                rules={[{ required: true }]}
              >
                <DatePicker
									style={{width: '100%'}}
                  format="YYYY-MM-DD"
								/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.sales_orders.titles.status")}
                name="status"
                rules={[{ required: true }]}
              >
                <Select options={useSalesOrderStatus()}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={translate("pages.sales_orders.titles.from_warehouse")}
                name="warehouseId"
                rules={[{ required: true }]}
              >
                <WarehouseSelect/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.sales_orders.titles.total_amount")}
                name="totalAmount"
                rules={[{ required: true }]}
              >
                <InputNumber disabled style={{width: "100%"}} addonAfter="Ft"/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card 
          title={translate("pages.sales_orders.titles.products")}
          type="inner"
          style={{marginTop: 12}}
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    <Row gutter={16}>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.sales_orders.titles.product")}
                          name={[name, "productId"]}
                          rules={[{ required: true }]}
                        >
                          <ProductSelect />
                        </Form.Item>
                      </Col>
                      {/* <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.sales_orders.titles.quantity_ordered")}
                          name={[name, "quantityOrdered"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={1} step={0.01} style={{width: "100%"}} />
                        </Form.Item>
                      </Col> */}
                      <Col span={4}>
                        <Form.Item
                          shouldUpdate={(prev, curr) =>
                            prev?.items?.[name]?.productId !== curr?.items?.[name]?.productId
                          }
                          noStyle
                        >
                          {() => {
                            const productId = form.getFieldValue(["items", name, "productId"]);
                            const unit = getUnitByProductId(productId) || "";

                            return (
                              <Form.Item
                                {...restField}
                                label={translate("pages.sales_orders.titles.quantity_ordered")}
                                name={[name, "quantityOrdered"]}
                                rules={[{ required: true }]}
                              >
                                <InputNumber
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
                      {/* <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.sales_orders.titles.quantity_shipped")}
                          name={[name, "quantityShipped"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={1} step={0.01} style={{width: "100%"}} />
                        </Form.Item>
                      </Col> */}
                      <Col span={4}>
                        <Form.Item
                          shouldUpdate={(prev, curr) =>
                            prev?.items?.[name]?.productId !== curr?.items?.[name]?.productId
                          }
                          noStyle
                        >
                          {() => {
                            const productId = form.getFieldValue(["items", name, "productId"]);
                            const unit = getUnitByProductId(productId) || "";

                            return (
                              <Form.Item
                                {...restField}
                                label={translate("pages.sales_orders.titles.quantity_shipped")}
                                name={[name, "quantityShipped"]}
                                rules={[{ required: true }]}
                              >
                                <InputNumber
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
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.sales_orders.titles.price_per_unit")}
                          name={[name, "pricePerUnit"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={1} step={0.01} style={{width: "100%"}} addonAfter="Ft"/>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.sales_orders.titles.discount")}
                          name={[name, "discount"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={0} max={100} step={0.01} style={{width: "100%"}} addonAfter="%"/>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.sales_orders.titles.tax_rate")}
                          name={[name, "taxRate"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={0} max={100} step={0.01} style={{width: "100%"}} addonAfter="%"/>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Button 
                          block 
                          icon={<DeleteOutlined/>} 
                          onClick={() => remove(name)} 
                          danger
                        >
                          {translate("buttons.delete")}
                        </Button>
                      </Col>
                      <Divider/>
                    </Row>
                  </>
                ))}
                
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    {translate("buttons.add_product")}
                  </Button>
                </Form.Item>
                </>
            )}
          </Form.List>

        </Card>
      </Form>
    </Create>
  )

}