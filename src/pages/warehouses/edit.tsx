import { ArrowLeftOutlined } from "@ant-design/icons";
import { Edit, useForm } from "@refinedev/antd";
import { CanAccess, useNotification, useTranslation } from "@refinedev/core";
import { Button, Card, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useProductActiveStatus } from "../../constants/products";
import dayjs from "dayjs";
import { EmployeeOneSelect } from "../../components/EmployeeOneSelect";
import { CustomErrorComponent } from "../error";

export const WarehouseEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "warehouses",
      action: "edit",
      id,
  });

  useEffect(() => {
    document.title = `${translate("pages.warehouses.edit.title")} | NavetraERP`;
  })

  useEffect(() => {
      if (!form) return;

      const initialValues = formProps.initialValues;

      if (!initialValues) return;

  }, [formProps.initialValues])

  return (
    <CanAccess 
      resource="warehouses" 
      action="edit" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Edit
        title={translate("pages.warehouses.edit.title")}
        goBack={null}
        saveButtonProps={saveButtonProps}
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
          <Form.Item
              name="addressId"
              hidden
            ></Form.Item>
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
      </Edit>
    </CanAccess>
  )
};