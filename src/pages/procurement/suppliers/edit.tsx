import { ArrowLeftOutlined } from "@ant-design/icons";
import { Edit, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export const SupplierEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "suppliers",
      action: "edit",
      id,
  });

  useEffect(() => {
    document.title = translate("pages.suppliers.edit.title");
  })

  useEffect(() => {
      if (!form) return;

      const initialValues = formProps.initialValues;

      if (!initialValues) return;

  }, [formProps.initialValues])

  return (
    <Edit
      title={translate("pages.suppliers.edit.title")}
      saveButtonProps={saveButtonProps}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/procurement/suppliers")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.suppliers.buttons.back")}</Button>
        </Space>
      }
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
      >
        <Card 
          title={translate("pages.suppliers.titles.data")}
          type="inner"
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={translate("pages.suppliers.titles.name")}
                name="name"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.suppliers.titles.tax_number")}
                name="taxNumber"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.suppliers.titles.contact_person")}
                name="contactPerson"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.suppliers.titles.email")}
                name="email"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.suppliers.titles.phone_number")}
                name="phoneNumber"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card 
					title={translate("pages.suppliers.titles.address_data")}
					style={{marginTop: 12}}
          type="inner"
				>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={translate("pages.suppliers.titles.address_country")}
                name="addressCountry"
                rules={[{ required: true }]}
              >
                <Input/> 
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.suppliers.titles.address_region")}
                name="addressRegion"
                rules={[{ required: true }]}
              >
                <Input/> 
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.suppliers.titles.address_postcode")}
                name="addressPostCode"
                rules={[{ required: true }]}
              >
                <Input/> 
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.suppliers.titles.address_city")}
                name="addressCity"
                rules={[{ required: true }]}
              >
                <Input/> 
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={translate("pages.suppliers.titles.address_first")}
                name="addressFirstLine"
                rules={[{ required: true }]}
              >
                <Input/> 
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={translate("pages.suppliers.titles.address_second")}
                name="addressSecondLine"
              >
                <Input/> 
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Edit>
  )
};