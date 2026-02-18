import { ArrowLeftOutlined, DeleteOutlined, ImportOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { CanAccess, useList, useNotification, useOne, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { EmployeeOneSelect } from "../../../components/EmployeeOneSelect";
import { WarehouseSelect } from "../../../components/WarehouseSelect";
import { useProductionOrderStatus } from "../../../constants/production_orders";
import { IProductList } from "../../../interfaces";
import { CustomErrorComponent } from "../../error";

export const ProductionOrderCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "production_orders",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.production_orders.create.title")} | NavetraERP`;
  })

  const selectedProductId = Form.useWatch("productId", form);
  const plannedQuantity = Form.useWatch("plannedQuantity", form);

  const id = selectedProductId;

  const { result, query } = useOne({
    resource: "products",
    id
  });

  const productData = query.data;

  const loadBom = () => {
    if (productData?.data?.bomComponents) {
      const calculatedItems = productData.data.bomComponents.map((item: any) => ({
        componentProductId: item.componentProductId,
        quantityUsed: (item.quantityPerUnit || 0) * (form.getFieldValue("plannedQuantity") || 1),
        warehouseId: null,
        dateUsed: null
      }));

      form.setFieldsValue({
        components: calculatedItems
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
        startDate: values.startDate?.format("YYYY-MM-DD"),
        endDate: values.endDate?.format("YYYY-MM-DD"),
        components: values.components?.map((item: any) => ({
          ...item,
          dateUsed: item.dateUsed.format("YYYY-MM-DD")
        }))
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  return (
    <CanAccess 
      resource="production_orders" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.production_orders.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={loadBom}
              size="large"
              disabled={!selectedProductId || !plannedQuantity || !productData?.data.bomComponents || productData?.data?.bomComponents?.length === 0}
            ><ImportOutlined/>{translate("pages.production_orders.buttons.load_bom")}</Button>
            <Button
              onClick={() => navigate("/production/production_orders")}
              size="large"
            ><ArrowLeftOutlined/>{translate("pages.production_orders.buttons.back")}</Button>
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
            title={translate("pages.production_orders.titles.data")}
            type="inner"
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.production_orders.titles.product")}
                  name="productId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <ProductSelect/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.production_orders.titles.start_date")}
                  name="startDate"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <DatePicker
                    style={{width: '100%'}}
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.production_orders.titles.end_date")}
                  name="endDate"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <DatePicker
                    style={{width: '100%'}}
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
  {/*             <Col span={8}>
                <Form.Item
                  label={translate("pages.production_orders.titles.planned_quantity")}
                  name="plannedQuantity"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <InputNumber min={1} step={0.01} style={{width: "100%"}}/>
                </Form.Item>
              </Col> */}
              <Col span={8}>
                <Form.Item
                  shouldUpdate={(prev, curr) => prev.productId !== curr.productId}
                  noStyle
                >
                  {() => {
                    const productId = form.getFieldValue("productId");
                    const unit = getUnitByProductId(productId) || "";

                    return (
                      <Form.Item
                        label={translate("pages.production_orders.titles.planned_quantity")}
                        name="plannedQuantity"
                        rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                      >
                        <InputNumber
                          placeholder={`${translate("pages.production_orders.titles.planned_quantity")}...`}
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
              <Col span={8}>
                <Form.Item
                  label={translate("pages.production_orders.titles.status")}
                  name="status"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Select placeholder={translate("selects.production_orders.placeholder_status")} options={useProductionOrderStatus()}/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.production_orders.titles.responsible_employee")}
                  name="responsibleEmployeeId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <EmployeeOneSelect/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Divider/>
          <Card 
            title={translate("pages.production_orders.titles.components")}
            type="inner"
            style={{marginTop: 12}}
          >
            <Form.List 
              name="components"
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
                            label={translate("pages.production_orders.titles.component_product")}
                            name={[name, "componentProductId"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <ProductSelect />
                          </Form.Item>
                        </Col>
  {/*                       <Col span={6}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.production_orders.titles.quantity_used")}
                            name={[name, "quantityUsed"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <InputNumber min={1} step={0.01} style={{width: "100%"}} />
                          </Form.Item>
                        </Col> */}
                        <Col span={6}>
                          <Form.Item
                            shouldUpdate={(prev, curr) =>
                              prev?.components?.[name]?.componentProductId !== curr?.components?.[name]?.componentProductId
                            }
                            noStyle
                          >
                            {() => {
                              const productId = form.getFieldValue(["components", name, "componentProductId"]);
                              const unit = getUnitByProductId(productId) || "";

                              return (
                                <Form.Item
                                  {...restField}
                                  label={translate("pages.production_orders.titles.quantity_used")}
                                  name={[name, "quantityUsed"]}
                                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                                >
                                  <InputNumber
                                    placeholder={`${translate("pages.production_orders.titles.quantity_used")}...`}
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
                        <Col span={6}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.production_orders.titles.warehouse")}
                            name={[name, "warehouseId"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <WarehouseSelect />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            label={translate("pages.production_orders.titles.date_used")}
                            name={[name, "dateUsed"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <DatePicker
                              style={{width: '100%'}}
                              format="YYYY-MM-DD"
                            />
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