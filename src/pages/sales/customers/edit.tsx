import { ArrowLeftOutlined } from "@ant-design/icons";
import { Edit, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Card, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export const CustomerEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "customers",
      action: "edit",
      id,
  });

  useEffect(() => {
    document.title = translate("pages.customers.edit.title");
  })

  useEffect(() => {
      if (!form) return;

      const initialValues = formProps.initialValues;

      if (!initialValues) return;

  }, [formProps.initialValues])

  return (
    <Edit
      title={translate("pages.customers.edit.title")}
      saveButtonProps={saveButtonProps}
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
          title={translate("pages.customers.titles.address_date")}
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
    </Edit>
  )
};