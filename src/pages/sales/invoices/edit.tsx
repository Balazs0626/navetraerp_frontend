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
import { IProductList } from "../../../interfaces";
import { useInvoiceStatus } from "../../../constants/invoices";

export const InvoiceEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "invoices",
      action: "edit",
      id,
  });

  useEffect(() => {
    document.title = translate("pages.invoices.edit.title");
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

  const handleFinish = (values: any) => {
    const formattedValues = {
        ...values,
        invoiceDate: values.invoiceDate?.format ? values.invoiceDate.format("YYYY-MM-DD") : values.invoiceDate,
        dueDate: values.dueDate?.format ? values.dueDate.format("YYYY-MM-DD") : values.dueDate
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  return (
    <Edit
      title={translate("pages.invoices.edit.title")}
      saveButtonProps={saveButtonProps}
      headerButtons={
        <Space>
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
                rules={[{ required: true }]}
              >
                <SalesOrderSelect disabled/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.invoices.titles.invoice_date")}
                name="invoiceDate"
                rules={[{ required: true }]}
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : "",
                })}
              >
                <DatePicker
                  style={{width: '100%'}}
                  format="YYYY-MM-DD"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.invoices.titles.due_date")}
                name="dueDate"
                rules={[{ required: true }]}
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : "",
                })}
              >
                <DatePicker
                  style={{width: '100%'}}
                  format="YYYY-MM-DD"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.invoices.titles.status")}
                name="status"
                rules={[{ required: true }]}
              >
                <Select options={useInvoiceStatus()}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={translate("pages.invoices.titles.total_amount")}
                name="totalAmount"
                rules={[{ required: true }]}
              >
                <InputNumber disabled style={{width: "100%"}} addonAfter="HUF"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.invoices.titles.paid_amount")}
                name="paidAmount"
                rules={[{ required: true }]}
              >
                <InputNumber disabled style={{width: "100%"}} addonAfter="HUF"/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card 
          title={translate("pages.invoices.titles.products")}
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
                          label={translate("pages.invoices.titles.product")}
                          name={[name, "productId"]}
                          rules={[{ required: true }]}
                        >
                          <ProductSelect disabled/>
                        </Form.Item>
                      </Col>
{/*                       <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.invoices.titles.quantity")}
                          name={[name, "quantity"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={1} step={0.01} style={{width: "100%"}} disabled/>
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
                                rules={[{ required: true }]}
                              >
                                <InputNumber
                                  min={0.01}
                                  step={0.01}
                                  style={{ width: "100%" }}
                                  addonAfter={unit}
                                  disabled
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
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={1} step={0.01} style={{width: "100%"}} addonAfter="HUF" disabled/>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.invoices.titles.tax_rate")}
                          name={[name, "taxRate"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={0} max={100} step={0.01} style={{width: "100%"}} addonAfter="%" disabled/>
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
                          disabled
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
                    disabled
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