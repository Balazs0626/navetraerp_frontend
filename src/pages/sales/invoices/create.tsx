import { ArrowLeftOutlined, DeleteOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { CustomerSelect } from "../../../components/CustomerSelect";
import { useSalesOrderStatus } from "../../../constants/sales_orders";
import { SalesOrderSelect } from "../../../components/SalesOrderSelect";

export const InvoiceCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "invoices",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = translate("pages.invoices.create.title");
  })

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate("pages.invoices.create.title")}
      goBack={null}
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
        onValuesChange={() => {
          const items = form.getFieldValue("items") || [];

          const total = items.reduce((sum: any, item: any) => {
            const q = Number(item?.quantity) * Number(item?.pricePerUnit) || 0;
            return sum + q;
          }, 0);

          form.setFieldValue("totalAmount", total);

          form.setFieldValue("paidAmount", (total * 1.27));
        }}
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
                <SalesOrderSelect/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.invoices.titles.invoice_date")}
                name="invoiceDate"
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
                label={translate("pages.invoices.titles.due_date")}
                name="dueDate"
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
                label={translate("pages.invoices.titles.status")}
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
                label={translate("pages.invoices.titles.total_amount")}
                name="totalAmount"
                rules={[{ required: true }]}
              >
                <InputNumber disabled style={{width: "100%"}} addonAfter="Ft"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.invoices.titles.paid_amount")}
                name="paidAmount"
                rules={[{ required: true }]}
              >
                <InputNumber disabled style={{width: "100%"}} addonAfter="Ft"/>
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
                          <ProductSelect />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.invoices.titles.quantity")}
                          name={[name, "quantity"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={1} step={0.01} style={{width: "100%"}} addonAfter="Ft"/>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.invoices.titles.price_per_unit")}
                          name={[name, "pricePerUnit"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={1} step={0.01} style={{width: "100%"}} addonAfter="Ft"/>
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