import { ArrowLeftOutlined, DeleteOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { CanAccess, useList, useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select, Alert } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { CustomErrorComponent } from "../../error";
import { IProductList } from "../../../interfaces";

export const PurchaseOrderCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "purchase_orders",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.purchase_orders.create.title")} | NavetraERP`;
  })

  const { result: productsData } = useList<IProductList>({
    resource: "products",
    pagination: { mode: "off" },
  });
  
  const products = productsData?.data ?? [];

  const getUnitByProductId = (productId?: number) => {
    return products.find(p => p.id === productId)?.unit ?? "";
  };

  const getProductDetailsById = (productId?: number) => {
    return products.find(p => p.id === productId);
  };

  const handleFinish = (values: any) => {
    const formattedValues = {
        ...values,
        orderDate: values.orderDate?.format("YYYY-MM-DD"),
        expectedDeliveryDate: values.expectedDeliveryDate?.format("YYYY-MM-DD")
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  return (
    <CanAccess 
      resource="purchase_orders" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.purchase_orders.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/procurement/purchase_orders")}
              size="large"
            ><ArrowLeftOutlined/>{translate("pages.purchase_orders.buttons.back")}</Button>
          </Space>
        }
      >
        <Alert
          type="warning"
          showIcon
          message="Figyelem!"
          description="A rendelési bizonylatok, nem felelnek meg hivatalos dokumentumnak! A cég rendeléseinek nyilvántartására szolgál!"
        />
        <Divider/>
        <Form
          {...formProps}
          form={form}
          layout="vertical"
          onValuesChange={(changedValues) => {

            if (changedValues.items) {
              changedValues.items.forEach((item: any, index: number) => {
                if (item && item.productId) {
                  const productDetails = getProductDetailsById(item.productId);
                  
                  if (productDetails) {
                    const currentItems = [...form.getFieldValue("items")];
                    
                    currentItems[index].pricePerUnit = productDetails.pricePerUnit;

                    form.setFieldsValue({ items: currentItems });
                  }
                }
              });
            }

            const items = form.getFieldValue("items") || [];

            const total = items.reduce((sum: any, item: any) => {
              const q = (Number(item?.quantityOrdered) * Number(item?.pricePerUnit)) * (100 - Number(item?.discount))/100 || 0;
              return sum + q;
            }, 0);

            form.setFieldValue("totalAmount", total);
          }}
          onFinish={handleFinish}
        >
          <Card 
            title={translate("pages.purchase_orders.titles.data")}
            type="inner"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.purchase_orders.titles.supplier")}
                  name="supplierId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <SupplierSelect/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.purchase_orders.titles.order_date")}
                  name="orderDate"
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
                  label={translate("pages.purchase_orders.titles.expected_delivery_date")}
                  name="expectedDeliveryDate"
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
                  label={translate("pages.purchase_orders.titles.status")}
                  name="status"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Select placeholder={translate("selects.purchase_orders.placeholder_status")} options={usePurchaseOrderStatus()}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.purchase_orders.titles.total_amount")}
                  name="totalAmount"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <InputNumber placeholder={`${translate("pages.purchase_orders.titles.total_amount")}...`} disabled style={{width: "100%"}} addonAfter="HUF"/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Divider/>
          <Card 
            title={translate("pages.purchase_orders.titles.products")}
            type="inner"
            style={{marginTop: 12}}
          >
            <Form.List 
              name="items"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 1) {
                      return Promise.reject(new Error(translate("messages.errors.required_item")));
                    }
                  },
                }
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <>
                      <Row gutter={16}>
                        <Col span={4}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.purchase_orders.titles.product")}
                            name={[name, "productId"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <ProductSelect />
                          </Form.Item>
                        </Col>
{/*                         <Col span={4}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.purchase_orders.titles.amount")}
                            name={[name, "quantityOrdered"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <InputNumber placeholder={`${translate("pages.purchase_orders.titles.amount")}...`} min={1} step={0.01} style={{width: "100%"}} />
                          </Form.Item>
                        </Col> */}
                        <Col span={4}>
                          <Form.Item
                            shouldUpdate={(prev, curr) =>
                              prev?.items?.[name]?.productId !== curr?.bomComponents?.[name]?.productId
                            }
                            noStyle
                          >
                            {() => {
                              const productId = form.getFieldValue(["items", name, "productId"]);
                              const unit = getUnitByProductId(productId) || "";

                              return (
                                <Form.Item
                                  {...restField}
                                  label={translate("pages.purchase_orders.titles.amount")}
                                  name={[name, "quantityOrdered"]}
                                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                                >
                                  <InputNumber
                                    placeholder={`${translate("pages.purchase_orders.titles.amount")}...`}
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
                            label={translate("pages.purchase_orders.titles.price_per_unit")}
                            name={[name, "pricePerUnit"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <InputNumber placeholder={`${translate("pages.purchase_orders.titles.price_per_unit")}...`} min={1} step={0.01} style={{width: "100%"}} addonAfter="HUF"/>
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.purchase_orders.titles.discount")}
                            name={[name, "discount"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <InputNumber placeholder={`${translate("pages.purchase_orders.titles.discount")}...`} min={0} max={100} step={0.01} style={{width: "100%"}} addonAfter="%"/>
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.purchase_orders.titles.tax_rate")}
                            name={[name, "taxRate"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <InputNumber placeholder={`${translate("pages.purchase_orders.titles.tax_rate")}...`} min={0} max={100} step={0.01} style={{width: "100%"}} addonAfter="%"/>
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
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>

          </Card>
        </Form>
      </Create>
    </CanAccess>
  )
}