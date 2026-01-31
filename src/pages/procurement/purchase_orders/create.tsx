import { ArrowLeftOutlined, DeleteOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";

export const PurchaseOrderCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "purchase_orders",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = translate("pages.purchase_orders.create.title");
  })

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
      <Form
        {...formProps}
        form={form}
        layout="vertical"
        onValuesChange={() => {
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
                rules={[{ required: true }]}
              >
                <SupplierSelect/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.purchase_orders.titles.order_date")}
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
                label={translate("pages.purchase_orders.titles.expected_delivery_date")}
                name="expectedDeliveryDate"
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
                label={translate("pages.purchase_orders.titles.status")}
                name="status"
                rules={[{ required: true }]}
              >
                <Select options={usePurchaseOrderStatus()}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={translate("pages.purchase_orders.titles.total_amount")}
                name="totalAmount"
                rules={[{ required: true }]}
              >
                <InputNumber disabled style={{width: "100%"}}/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.purchase_orders.titles.currency")}
                name="currency"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card 
          title={translate("pages.purchase_orders.titles.products")}
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
                          label={translate("pages.purchase_orders.titles.product")}
                          name={[name, "productId"]}
                          rules={[{ required: true }]}
                        >
                          <ProductSelect />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.purchase_orders.titles.amount")}
                          name={[name, "quantityOrdered"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={1} step={0.01} style={{width: "100%"}} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.purchase_orders.titles.price_per_unit")}
                          name={[name, "pricePerUnit"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={1} step={0.01} style={{width: "100%"}} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.purchase_orders.titles.discount")}
                          name={[name, "discount"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={0} max={100} step={0.01} style={{width: "100%"}}/>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.purchase_orders.titles.tax_rate")}
                          name={[name, "taxRate"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={0} max={100} step={0.01} style={{width: "100%"}}/>
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