import { ArrowLeftOutlined, MailOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const CustomerCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "customers",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = translate("pages.customers.create.title");
  })

  return (
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
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.customers.titles.tax_number")}
                name="taxNumber"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.customers.titles.email")}
                name="email"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.customers.titles.phone_number")}
                name="phoneNumber"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
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
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.customers.titles.address_region")}
                  name="billingAddressRegion"
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.customers.titles.address_postcode")}
                  name="billingAddressPostCode"
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.customers.titles.address_city")}
                  name="billingAddressCity"
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.customers.titles.address_first")}
                  name="billingAddressFirstLine"
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.customers.titles.address_second")}
                  name="billingAddressSecondLine"
                >
                  <Input/> 
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
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.customers.titles.address_region")}
                  name="shippingAddressRegion"
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.customers.titles.address_postcode")}
                  name="shippingAddressPostCode"
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.customers.titles.address_city")}
                  name="shippingAddressCity"
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.customers.titles.address_first")}
                  name="shippingAddressFirstLine"
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.customers.titles.address_second")}
                  name="shippingAddressSecondLine"
                >
                  <Input/> 
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Card>
      </Form>
    </Create>
  )

}