import { ArrowLeftOutlined, DeleteOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { EmployeeOneSelect } from "../../../components/EmployeeOneSelect";
import { PurchaseOrderSelect } from "../../../components/PurchaseOrderSelect";
import { WarehouseSelect } from "../../../components/WarehouseSelect";

export const GoodsReceiptCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "goods_receipts",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = translate("pages.goods_receipts.create.title");
  })

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate("pages.goods_receipts.create.title")}
      goBack={null}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/procurement/goods_receipts")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.goods_receipts.buttons.back")}</Button>
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
            const q = Number(item?.quantityOrdered) || 0;
            return sum + q;
          }, 0);

          form.setFieldValue("totalAmount", total);
        }}
      >
        <Card 
          title={translate("pages.goods_receipts.titles.data")}
          type="inner"
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={translate("pages.goods_receipts.titles.purchase_order")}
                name="purchaseOrderId"
                rules={[{ required: true }]}
              >
                <PurchaseOrderSelect/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.goods_receipts.titles.warehouse")}
                name="warehouseId"
                rules={[{ required: true }]}
              >
                <WarehouseSelect/>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label={translate("pages.goods_receipts.titles.receipt_date")}
                name="receiptDate"
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
                label={translate("pages.goods_receipts.titles.employee")}
                name="receivedBy"
                rules={[{ required: true }]}
              >
                <EmployeeOneSelect/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card 
          title={translate("pages.goods_receipts.titles.data")}
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
                          label={translate("pages.goods_receipts.titles.product")}
                          name={[name, "productId"]}
                          rules={[{ required: true }]}
                        >
                          <ProductSelect />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.goods_receipts.titles.quantity_received")}
                          name={[name, "quantityReceived"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={0.01} step={0.01} style={{width: "100%"}} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.goods_receipts.titles.batch_number")}
                          name={[name, "batchNumber"]}
                          rules={[{ required: true }]}
                        >
                          <Input />
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