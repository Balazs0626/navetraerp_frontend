import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Edit, useForm } from "@refinedev/antd";
import { CanAccess, useList, useNotification, useTranslation } from "@refinedev/core";
import { Button, Card, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { SalesOrderSelect } from "../../../components/SalesOrderSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { useSalesOrderStatus } from "../../../constants/sales_orders";
import dayjs from "dayjs";
import { IProductList } from "../../../interfaces";
import { useInvoiceStatus } from "../../../constants/invoices";
import { CustomErrorComponent } from "../../error";
import { CustomerSelect } from "../../../components/CustomerSelect";
import { useDeliveryNoteStatus } from "../../../constants/delivery_notes";

export const DeliveryNoteEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "delivery_notes",
      action: "edit",
      id,
  });

  useEffect(() => {
    document.title = `${translate("pages.delivery_notes.edit.title")} | NavetraERP`;
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
        shippingDate: values.shippingDate?.format ? values.shippingDate.format("YYYY-MM-DD") : values.shippingDate
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  return (
    <CanAccess 
      resource="delivery_notes" 
      action="edit" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Edit
        title={translate("pages.delivery_notes.edit.title")}
        goBack={null}
        saveButtonProps={saveButtonProps}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/inventory/delivery_notes")}
              size="large"
            ><ArrowLeftOutlined/>{translate("pages.delivery_notes.buttons.back")}</Button>
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
            title={translate("pages.delivery_notes.titles.data")}
            type="inner"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.delivery_notes.titles.customer")}
                  name="customerId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <CustomerSelect/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.delivery_notes.titles.license_plate")}
                  name="licensePlate"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.delivery_notes.titles.shipping_date")}
                  name="shippingDate"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
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
                  label={translate("pages.delivery_notes.titles.status")}
                  name="status"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Select placeholder={translate("selects.delivery_notes.placeholder_status")} options={useDeliveryNoteStatus()}/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Divider/>
          <Card 
            title={translate("pages.delivery_notes.titles.products")}
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
                        <Col span={6}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.delivery_notes.titles.product")}
                            name={[name, "productId"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <ProductSelect />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
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
                                  label={translate("pages.delivery_notes.titles.quantity")}
                                  name={[name, "quantity"]}
                                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                                >
                                  <InputNumber
                                    placeholder={`${translate("pages.delivery_notes.titles.quantity")}...`}
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
      </Edit>
    </CanAccess>
  )
};