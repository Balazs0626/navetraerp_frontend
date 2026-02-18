import { ArrowLeftOutlined, MailOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { CanAccess, useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { EmployeeOneSelect } from "../../components/EmployeeOneSelect";
import { CustomErrorComponent } from "../error";

export const WarehouseCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "warehouses",
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.warehouses.create.title")} | NavetraERP`;
  })

  return (
    <CanAccess 
      resource="warehouses" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.warehouses.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/warehouses")}
              size="large"
            ><ArrowLeftOutlined/>{translate("pages.warehouses.buttons.back")}</Button>
          </Space>
        }
      >
        <Form
          {...formProps}
          form={form}
          layout="vertical"
        >
          <Card 
            title={translate("pages.warehouses.titles.data")}
            type="inner"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.warehouses.titles.name")}
                  name="name"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.warehouses.titles.name")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.warehouses.titles.manager")}
                  name="managerId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <EmployeeOneSelect/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Divider/>
          <Card 
            title={translate("pages.warehouses.titles.address_data")}
            style={{marginTop: 12}}
            type="inner"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.warehouses.titles.address_country")}
                  name="addressCountry"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.warehouses.titles.address_country")}...`}/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.warehouses.titles.address_region")}
                  name="addressRegion"
                >
                  <Input placeholder={`${translate("pages.warehouses.titles.address_region")}...`}/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.warehouses.titles.address_postcode")}
                  name="addressPostCode"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.warehouses.titles.address_postcode")}...`}/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.warehouses.titles.address_city")}
                  name="addressCity"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.warehouses.titles.address_city")}...`}/> 
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.warehouses.titles.address_first")}
                  name="addressFirstLine"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.warehouses.titles.address_first")}...`}/> 
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.warehouses.titles.address_second")}
                  name="addressSecondLine"
                >
                  <Input placeholder={`${translate("pages.warehouses.titles.address_second")}...`}/> 
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Create>
    </CanAccess>
  )

}