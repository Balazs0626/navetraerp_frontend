import React, { useEffect } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { useTranslation } from "@refinedev/core";
import { Form, Input, Row, Col, Divider, Typography, Card, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Title } = Typography;

export const CompanyDataEdit = () => {
  const { translate } = useTranslation();

  const navigate = useNavigate();

  const { formProps, saveButtonProps, query } = useForm({
    resource: "company_data",
    id: "",
    action: "edit",
    redirect: "show",
  });

  const record = query?.data?.data;

  useEffect(() => {
    document.title = `${translate("pages.company_data.edit.title")} | NavetraERP`;
  })

  return (
    <Edit 
        saveButtonProps={saveButtonProps} 
        title={translate("pages.company_data.edit.title")}
        headerButtons={
          <Button
            onClick={() => navigate("/company_data")}
            size="large"
            icon={<ArrowLeftOutlined/>}
          >
            {translate("buttons.back")}
          </Button>
        }
    >
      <Form {...formProps} layout="vertical">
        <Card title={translate("pages.company_data.titles.data")} type="inner">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label={translate("pages.company_data.titles.name")}
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={translate("pages.company_data.titles.tax_number")}
                name="taxNumber"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={translate("pages.company_data.titles.eu_tax_number")}
                name="euTaxNumber"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={translate("pages.company_data.titles.registration_number")}
                name="registrationNumber"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={translate("pages.company_data.titles.email")}
                name="email"
                rules={[{ type: "email" }]}

              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={translate("pages.company_data.titles.phone_number")}
                name="phoneNumber"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label={translate("pages.company_data.titles.bank_account_number")}
                name="bankAccountNumber"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Divider/>
        <Card title={translate("pages.company_data.titles.billing_address_data")} type="inner">
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item label={translate("pages.company_data.titles.country")} name="billingCountry" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label={translate("pages.company_data.titles.region")} name="billingRegion" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label={translate("pages.company_data.titles.post_code")} name="billingPostCode" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={translate("pages.company_data.titles.city")} name="billingCity" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={translate("pages.company_data.titles.address_1")} name="billingAddress1" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label={translate("pages.company_data.titles.address_2")} name="billingAddress2">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Divider/>
        <Card title={translate("pages.company_data.titles.shipping_address_data")} type="inner">
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item label={translate("pages.company_data.titles.country")} name="shippingCountry">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label={translate("pages.company_data.titles.region")} name="shippingRegion">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label={translate("pages.company_data.titles.post_code")} name="shippingPostCode">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={translate("pages.company_data.titles.city")} name="shippingCity">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={translate("pages.company_data.titles.address_1")} name="shippingAddress1">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label={translate("pages.company_data.titles.address_2")} name="shippingAddress2">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Edit>
  );
};