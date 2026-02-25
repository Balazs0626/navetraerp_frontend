import { ArrowLeftOutlined, DeleteOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { CanAccess, useList, useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select, TabsProps, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import PhoneInput from 'antd-phone-input';
import { DepartmentSelect } from "../../components/DepartmentSelect";
import { PositionSelect } from "../../components/PositionSelect";
import { UserSelect } from "../../components/UserSelect";
import { useEmployeeStatus } from "../../constants/employee";
import { EmployeeOneSelect } from "../../components/EmployeeOneSelect";
import { useProductActiveStatus } from "../../constants/products";
import dayjs from "dayjs";
import { ProductSelect } from "../../components/ProductSelect";
import { CustomErrorComponent } from "../error";
import { IProductList } from "../../interfaces";

export const ProductCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "products",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.products.create.title")} | NavetraERP`;
  })

  const { result: productsData } = useList<IProductList>({
    resource: "products",
    pagination: { mode: "off" },
  });
  
  const products = productsData?.data ?? [];

  const getUnitByProductId = (productId?: number) => {
    return products.find(p => p.id === productId)?.unit ?? "";
  };

  return (
    <CanAccess 
      resource="products" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.products.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/products")}
              size="large"
            ><ArrowLeftOutlined/>{translate("pages.products.buttons.back")}</Button>
          </Space>
        }
      >
        <Form
          {...formProps}
          form={form}
          layout="vertical"
        >
          {/* <Tabs defaultActiveKey="1" items={items} type="card"/> */}

          <Card 
            title={translate("pages.products.titles.data")}
            type="inner"
          >
            <Form.Item
              name="createdAt"
              rules={[{ required: true, message: translate("messages.errors.required_field") }]}
              hidden
              getValueProps={(value) => ({
                value: value ? dayjs(value) : "",
              })}
              getValueFromEvent={(value) => value ? value.format("YYYY-MM-DD") : null}
              initialValue={dayjs(Date.now()).format("YYYY-MM-DD")}
            >
              <DatePicker/>
            </Form.Item>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.products.titles.sku")}
                  name="sku"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.products.titles.sku")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.products.titles.name")}
                  name="name"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.products.titles.name")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.products.titles.unit")}
                  name="unit"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.products.titles.unit")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.products.titles.price_per_unit")}
                  name="pricePerUnit"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <InputNumber placeholder={`${translate("pages.products.titles.price_per_unit")}...`} step={0.01} min={0.01} style={{width: "100%"}} addonAfter="HUF"/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.products.titles.active")}
                  name="active"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Select placeholder={translate("selects.products.placeholder_status")} options={useProductActiveStatus()} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.products.titles.description")}
                  name="description"
                >
                  <Input.TextArea placeholder={`${translate("pages.products.titles.description")}...`}/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Divider/>
          <Card 
            title={translate("pages.products.titles.bom")}
            type="inner"
            style={{marginTop: 12}}
          >
            <Form.List name="bomComponents">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <>
                      <Row gutter={16}>
                        <Col span={4}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.products.titles.component")}
                            name={[name, "componentProductId"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <ProductSelect />
                          </Form.Item>
                        </Col>
{/*                         <Col span={4}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.products.titles.quantity_per_unit")}
                            name={[name, "quantityPerUnit"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <InputNumber placeholder={`${translate("pages.products.titles.quantity_per_unit")}...`} min={0.01} step={0.01} style={{width: "100%"}} />
                          </Form.Item>
                        </Col> */}
                        <Col span={4}>
                          <Form.Item
                            shouldUpdate={(prev, curr) =>
                              prev?.bomComponents?.[name]?.componentProductId !== curr?.bomComponents?.[name]?.componentProductId
                            }
                            noStyle
                          >
                            {() => {
                              const productId = form.getFieldValue(["bomComponents", name, "componentProductId"]);
                              const unit = getUnitByProductId(productId) || "";

                              return (
                                <Form.Item
                                  {...restField}
                                  label={translate("pages.products.titles.quantity_per_unit")}
                                  name={[name, "quantityPerUnit"]}
                                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                                >
                                  <InputNumber
                                    placeholder={`${translate("pages.products.titles.quantity_per_unit")}...`}
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
                      {translate("buttons.add_component")}
                    </Button>
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