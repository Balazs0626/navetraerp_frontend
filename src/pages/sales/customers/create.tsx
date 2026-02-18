import { ArrowLeftOutlined, MailOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { CanAccess, useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CustomErrorComponent } from "../../error";

export const CustomerCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "customers",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.customers.create.title")} | NavetraERP`;
  })

  return (
    <CanAccess 
      resource="customers" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.customers.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/sales/customers")}
              size="large"
            ><ArrowLeftOutlined/>{translate("pages.customers.buttons.back")}</Button>
          </Space>
        }
      >
        <Form
          {...formProps}
          form={form}
          layout="vertical"
        >
          <Card 
            title={translate("pages.customers.titles.data")}
            type="inner"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.customers.titles.name")}
                  name="name"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.customers.titles.name")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.customers.titles.tax_number")}
                  name="taxNumber"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.customers.titles.tax_number")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.customers.titles.eu_tax_number")}
                  name="euTaxNumber"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.customers.titles.eu_tax_number")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.customers.titles.bank_account_number")}
                  name="bankAccountNumber"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.customers.titles.bank_account_number")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.customers.titles.email")}
                  name="email"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.customers.titles.email")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.customers.titles.phone_number")}
                  name="phoneNumber"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.customers.titles.phone_number")}...`}/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Divider/>
          <Card 
            title={translate("pages.customers.titles.address_data")}
            style={{marginTop: 12}}
            type="inner"
          >
            <Card 
              title={translate("pages.customers.titles.billing_address_data")}
              style={{marginTop: 12}}
              type="inner"
            >
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.customers.titles.address_country")}
                    name="billingAddressCountry"
                    rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  >
                    <Input placeholder={`${translate("pages.customers.titles.address_country")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.customers.titles.address_region")}
                    name="billingAddressRegion"
                  >
                    <Input placeholder={`${translate("pages.customers.titles.address_region")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.customers.titles.address_postcode")}
                    name="billingAddressPostCode"
                    rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  >
                    <Input placeholder={`${translate("pages.customers.titles.address_postcode")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.customers.titles.address_city")}
                    name="billingAddressCity"
                    rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  >
                    <Input placeholder={`${translate("pages.customers.titles.address_city")}...`}/> 
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={translate("pages.customers.titles.address_first")}
                    name="billingAddressFirstLine"
                    rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  >
                    <Input placeholder={`${translate("pages.customers.titles.address_first")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={translate("pages.customers.titles.address_second")}
                    name="billingAddressSecondLine"
                  >
                    <Input placeholder={`${translate("pages.customers.titles.address_second")}...`}/> 
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Divider/>
            <Card 
              title={translate("pages.customers.titles.shipping_address_data")}
              style={{marginTop: 12}}
              type="inner"
            >
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.customers.titles.address_country")}
                    name="shippingAddressCountry"
                    rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  >
                    <Input placeholder={`${translate("pages.customers.titles.address_country")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.customers.titles.address_region")}
                    name="shippingAddressRegion"
                  >
                    <Input placeholder={`${translate("pages.customers.titles.address_region")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.customers.titles.address_postcode")}
                    name="shippingAddressPostCode"
                    rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  >
                    <Input placeholder={`${translate("pages.customers.titles.address_postcode")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.customers.titles.address_city")}
                    name="shippingAddressCity"
                    rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  >
                    <Input placeholder={`${translate("pages.customers.titles.address_city")}...`}/> 
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={translate("pages.customers.titles.address_first")}
                    name="shippingAddressFirstLine"
                    rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  >
                    <Input placeholder={`${translate("pages.customers.titles.address_first")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={translate("pages.customers.titles.address_second")}
                    name="shippingAddressSecondLine"
                  >
                    <Input placeholder={`${translate("pages.customers.titles.address_second")}...`}/> 
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Card>
        </Form>
      </Create>
    </CanAccess>
  )

}