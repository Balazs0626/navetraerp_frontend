import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Edit, useForm } from "@refinedev/antd";
import { useList, useNotification, useTranslation } from "@refinedev/core";
import { Button, Card, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { SalesOrderCreate } from "../sales_orders";
import { SalesOrderSelect } from "../../../components/SalesOrderSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { useSalesOrderStatus } from "../../../constants/sales_orders";
import dayjs from "dayjs";
import { CustomerSelect } from "../../../components/CustomerSelect";
import { IProductList } from "../../../interfaces";

export const SalesOrderEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "sales_orders",
      action: "edit",
      id,
  });

  useEffect(() => {
    document.title = translate("pages.sales_orders.edit.title");
  })

  useEffect(() => {
    if (!form) return;

    const initialValues = formProps.initialValues;

    if (!initialValues) return;

  }, [formProps.initialValues])

  const { result: productsData } = useList<IProductList>({
    resource: "products",
    pagination: { mode: "off" },
  });

  const products = productsData?.data ?? [];

  const getUnitByProductId = (productId?: number) => {
    return products.find(p => p.id === productId)?.unit ?? "";
  };

  return (
    <Edit
      title={translate("pages.sales_orders.edit.title")}
      saveButtonProps={saveButtonProps}
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
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : "",
                })}
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
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : "",
                })}
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
    </Edit>
  )
};