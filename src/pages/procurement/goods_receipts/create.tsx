import { ArrowLeftOutlined, DeleteOutlined, ImportOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { CanAccess, useNotification, useOne, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { EmployeeOneSelect } from "../../../components/EmployeeOneSelect";
import { PurchaseOrderSelect } from "../../../components/PurchaseOrderSelect";
import { WarehouseSelect } from "../../../components/WarehouseSelect";
import { CustomErrorComponent } from "../../error";

export const GoodsReceiptCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "goods_receipts",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.goods_receipts.create.title")} | NavetraERP`;
  })

  const selectedPurchaseOrderId = Form.useWatch("purchaseOrderId", form);

  const id = selectedPurchaseOrderId;

  const { result, query } = useOne({
    resource: "purchase_orders",
    id
  });

  const purchaseOrderData = query.data;

  const loadItems = () => {
    if (purchaseOrderData?.data?.items) {
      const calculatedItems = purchaseOrderData.data.items.map((item: any) => ({
        productId: item.productId,
        quantityReceived: null,
        batchNumber: null
      }));

      form.setFieldsValue({
        items: calculatedItems
      });
    }
  };

  const handleFinish = (values: any) => {
    const formattedValues = {
        ...values,
        receiptDate: values.receiptDate?.format("YYYY-MM-DD")
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  return (
    <CanAccess 
      resource="goods_receipts" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.goods_receipts.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={loadItems}
              size="large"
              disabled={!selectedPurchaseOrderId}
            ><ImportOutlined/>{translate("pages.goods_receipts.buttons.load_items")}</Button>
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
          onFinish={handleFinish}
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
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <PurchaseOrderSelect/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.goods_receipts.titles.warehouse")}
                  name="warehouseId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <WarehouseSelect/>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label={translate("pages.goods_receipts.titles.receipt_date")}
                  name="receiptDate"
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
                  label={translate("pages.goods_receipts.titles.employee")}
                  name="receivedBy"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <EmployeeOneSelect/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Divider/>
          <Card 
            title={translate("pages.goods_receipts.titles.products")}
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
                            label={translate("pages.goods_receipts.titles.product")}
                            name={[name, "productId"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <ProductSelect />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.goods_receipts.titles.quantity_received")}
                            name={[name, "quantityReceived"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <InputNumber placeholder={`${translate("pages.goods_receipts.titles.quantity_received")}...`} min={0.01} step={0.01} style={{width: "100%"}} />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.goods_receipts.titles.batch_number")}
                            name={[name, "batchNumber"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <Input placeholder={`${translate("pages.goods_receipts.titles.batch_number")}...`}/>
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