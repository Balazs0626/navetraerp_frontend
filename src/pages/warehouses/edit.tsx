import { ArrowLeftOutlined } from "@ant-design/icons";
import { Edit, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useProductActiveStatus } from "../../constants/products";
import dayjs from "dayjs";
import { EmployeeOneSelect } from "../../components/EmployeeOneSelect";

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
    document.title = translate("pages.warehouses.edit.title");
  })

  useEffect(() => {
      if (!form) return;

      const initialValues = formProps.initialValues;

      if (!initialValues) return;

  }, [formProps.initialValues])

  return (
    <Edit
      title={translate("pages.warehouses.edit.title")}
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
        <Card 
          title={translate("pages.warehouses.titles.data")}
          type="inner"
        >
          <Form.Item
            name="addressId"
            hidden
          >
            <Input/>
          </Form.Item>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={translate("pages.warehouses.titles.name")}
                name="name"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.warehouses.titles.manager")}
                name="managerId"
                rules={[{ required: true }]}
              >
                <EmployeeOneSelect/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
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
                rules={[{ required: true }]}
              >
                <Input/> 
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.warehouses.titles.address_region")}
                name="addressRegion"
                rules={[{ required: true }]}
              >
                <Input/> 
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.warehouses.titles.address_postcode")}
                name="addressPostCode"
                rules={[{ required: true }]}
              >
                <Input/> 
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.warehouses.titles.address_city")}
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
                label={translate("pages.warehouses.titles.address_first")}
                name="addressFirstLine"
                rules={[{ required: true }]}
              >
                <Input/> 
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={translate("pages.warehouses.titles.address_second")}
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