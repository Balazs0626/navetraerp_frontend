import { ArrowLeftOutlined, DeleteOutlined, ImportOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { CanAccess, useList, useNotification, useOne, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { CustomerSelect } from "../../../components/CustomerSelect";
import { useSalesOrderStatus } from "../../../constants/sales_orders";
import { SalesOrderSelect } from "../../../components/SalesOrderSelect";
import { IProductList } from "../../../interfaces";
import { useInvoiceStatus } from "../../../constants/invoices";
import { CustomErrorComponent } from "../../error";

export const InvoiceCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "invoices",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.invoices.create.title")} | NavetraERP`;
  })

  const selectedSalesOrderId = Form.useWatch("salesOrderId", form);

  const id = selectedSalesOrderId;

  const { result, query } = useOne({
    resource: "sales_orders",
    id
  });

  const salesOrderData = query.data;

  const loadItems = () => {
    if (salesOrderData?.data?.items) {
      const calculatedItems = salesOrderData.data.items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantityShipped || 1,
        pricePerUnit: item.pricePerUnitWithDiscount,
        taxRate: item.taxRate
      }));

      const total = calculatedItems.reduce((sum: number, item: any) => {
        return sum + (Number(item.quantity) * Number(item.pricePerUnit) || 0);
      }, 0);

      const totalWithTax = calculatedItems.reduce((sum: number, item: any) => {
        return sum + (Number(item.quantity) * Number(item.pricePerUnit) * (1 + Number(item.taxRate) / 100) || 0);
      }, 0);

      form.setFieldsValue({
        items: calculatedItems,
        totalAmount: total,
        paidAmount: totalWithTax
      });
    }
  };

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
        invoiceDate: values.invoiceDate?.format("YYYY-MM-DD"),
        dueDate: values.dueDate?.format("YYYY-MM-DD"),
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  return (
    <CanAccess 
      resource="invoices" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.invoices.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={loadItems}
              size="large"
              disabled={!selectedSalesOrderId}
            ><ImportOutlined/>{translate("pages.invoices.buttons.load_items")}</Button>
            <Button
              onClick={() => navigate("/sales/invoices")}
              size="large"
            ><ArrowLeftOutlined/>{translate("pages.invoices.buttons.back")}</Button>
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
              const q = Number(item?.quantity) * Number(item?.pricePerUnit) || 0;
              return sum + q;
            }, 0);

            const totalWithTax = items.reduce((sum: any, item: any) => {
              const q = Number(item?.quantity) * Number(item?.pricePerUnit) * (1 + Number(item?.taxRate)/100) || 0;
              return sum + q;
            }, 0);

            form.setFieldValue("totalAmount", total);

            form.setFieldValue("paidAmount", totalWithTax);
          }}
          onFinish={handleFinish}
        >
          <Card 
            title={translate("pages.invoices.titles.data")}
            type="inner"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.invoices.titles.sales_order")}
                  name="salesOrderId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <SalesOrderSelect/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.invoices.titles.invoice_date")}
                  name="invoiceDate"
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
                  label={translate("pages.invoices.titles.due_date")}
                  name="dueDate"
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
                  label={translate("pages.invoices.titles.status")}
                  name="status"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Select placeholder={translate("selects.invoices.placeholder_status")} options={useInvoiceStatus()}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.invoices.titles.total_amount")}
                  name="totalAmount"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <InputNumber disabled style={{width: "100%"}} addonAfter="HUF"/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.invoices.titles.paid_amount")}
                  name="paidAmount"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <InputNumber disabled style={{width: "100%"}} addonAfter="HUF"/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Divider/>
          <Card 
            title={translate("pages.invoices.titles.products")}
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
                            label={translate("pages.invoices.titles.product")}
                            name={[name, "productId"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <ProductSelect />
                          </Form.Item>
                        </Col>
                        {/* <Col span={4}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.invoices.titles.quantity")}
                            name={[name, "quantity"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <InputNumber min={1} step={0.01} style={{width: "100%"}} addonAfter="HUF"/>
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
                                  label={translate("pages.invoices.titles.quantity")}
                                  name={[name, "quantity"]}
                                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                                >
                                  <InputNumber
                                    placeholder={`${translate("pages.invoices.titles.quantity")}...`}
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
                            label={translate("pages.invoices.titles.price_per_unit")}
                            name={[name, "pricePerUnit"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <InputNumber placeholder={`${translate("pages.invoices.titles.price_per_unit")}...`} min={0.01} step={0.01} style={{width: "100%"}} addonAfter="HUF"/>
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.sales_orders.titles.tax_rate")}
                            name={[name, "taxRate"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <InputNumber placeholder={`${translate("pages.invoices.titles.tax_rate")}...`} min={0} max={100} step={0.01} style={{width: "100%"}} addonAfter="%"/>
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