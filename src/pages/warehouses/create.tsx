import { ArrowLeftOutlined, MailOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import PhoneInput from 'antd-phone-input';
import { DepartmentSelect } from "../../components/DepartmentSelect";
import { PositionSelect } from "../../components/PositionSelect";
import { UserSelect } from "../../components/UserSelect";
import { useEmployeeStatus } from "../../constants/employee";
import { EmployeeOneSelect } from "../../components/EmployeeOneSelect";

export const WarehouseCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "warehouses",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = translate("pages.warehouses.create.title");
  })

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate("pages.employee.create.title")}
      goBack={null}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("warehouses")}
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
    </Create>
  )

}