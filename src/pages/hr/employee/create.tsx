import { ArrowLeftOutlined, MailOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { CanAccess, useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import PhoneInput from 'antd-phone-input';
import { DepartmentSelect } from "../../../components/DepartmentSelect";
import { PositionSelect } from "../../../components/PositionSelect";
import { UserSelect } from "../../../components/UserSelect";
import { useEmployeeStatus } from "../../../constants/employee";
import { CustomErrorComponent } from "../../error";

export const EmployeeCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "employee",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.employee.create.title")} | NavetraERP`;
  })

  const employeeStatusOptions = useEmployeeStatus();

  const handleFinish = (values: any) => {
    const formattedValues = {
        ...values,
        birthDate: values.birthDate?.format("YYYY-MM-DD"),
        hireDate: values.hireDate?.format("YYYY-MM-DD"),
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  return (
    <CanAccess 
      resource="employee" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.employee.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/hr/employee")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.employee.buttons.back")}
            </Button>
          </Space>
        }
      >
        <Form
          {...formProps}
          form={form}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Card 
            title={translate("pages.employee.titles.personal_data")}
            type="inner"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.first_name")}
                  name="firstName"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.employee.titles.first_name")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.last_name")}
                  name="lastName"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.employee.titles.last_name")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.birth_date")}
                  name="birthDate"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <DatePicker
                    style={{width: '100%'}}
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.id_number")}
                  name="idNumber"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.employee.titles.id_number")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.residence_number")}
                  name="residenceNumber"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.employee.titles.residence_number")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.health_insurance_number")}
                  name="healthInsuranceNumber"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.employee.titles.health_insurance_number")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.tax_id_number")}
                  name="taxIdNumber"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.employee.titles.tax_id_number")}...`}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.phone_number")}
                  name="phoneNumber"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.employee.titles.phone_number")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.email")}
                  name="email"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input
                    type="email"
                    placeholder={`${translate("pages.employee.titles.email")}...`}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Divider/>
          <Card 
            title={translate("pages.employee.titles.address_data")}
            style={{marginTop: 12}}
            type="inner"
          >
            <Card
              title="Lakcím"
              type="inner"
            >
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.employee.titles.address_country")}
                    name="addressCountry"
                    rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  >
                    <Input placeholder={`${translate("pages.employee.titles.address_country")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.employee.titles.address_region")}
                    name="addressRegion"
                    rules={[{ required: false }]}
                  >
                    <Input placeholder={`${translate("pages.employee.titles.address_region")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.employee.titles.address_postcode")}
                    name="addressPostCode"
                    rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  >
                    <Input placeholder={`${translate("pages.employee.titles.address_postcode")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.employee.titles.address_city")}
                    name="addressCity"
                    rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  >
                    <Input placeholder={`${translate("pages.employee.titles.address_city")}...`}/> 
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={translate("pages.employee.titles.address_first")}
                    name="addressFirstLine"
                    rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  >
                    <Input placeholder={`${translate("pages.employee.titles.address_first")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={translate("pages.employee.titles.address_second")}
                    name="addressSecondLine"
                  >
                    <Input placeholder={`${translate("pages.employee.titles.address_second")}...`}/> 
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Divider/>
            <Card
              title="Tartózkodási cím"
              type="inner"
            >
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.employee.titles.address_country")}
                    name="tempAddressCountry"
                  >
                    <Input placeholder={`${translate("pages.employee.titles.address_country")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.employee.titles.address_region")}
                    name="tempAddressRegion"
                  >
                    <Input placeholder={`${translate("pages.employee.titles.address_region")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.employee.titles.address_postcode")}
                    name="tempAddressPostCode"
                  >
                    <Input placeholder={`${translate("pages.employee.titles.address_postcode")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={translate("pages.employee.titles.address_city")}
                    name="tempAddressCity"
                  >
                    <Input placeholder={`${translate("pages.employee.titles.address_city")}...`}/> 
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={translate("pages.employee.titles.address_first")}
                    name="tempAddressFirstLine"
                  >
                    <Input placeholder={`${translate("pages.employee.titles.address_first")}...`}/> 
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={translate("pages.employee.titles.address_second")}
                    name="tempAddressSecondLine"
                  >
                    <Input placeholder={`${translate("pages.employee.titles.address_second")}...`}/> 
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Card>
          <Divider/>
          <Card 
            title={translate("pages.employee.titles.work_data")}
            style={{marginTop: 12}}
            type="inner"
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.department_id")}
                  name="departmentId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <DepartmentSelect/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.position_id")}
                  name="positionId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <PositionSelect/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.user_id")}
                  name="userId"
                >
                  <UserSelect/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.hire_date")}
                  name="hireDate"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <DatePicker
                    style={{width: '100%'}}
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.salary")}
                  name="salary"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    placeholder={`${translate("pages.employee.titles.salary")}...`}
                    addonAfter="HUF"
                  /> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.status")}
                  name="status"
                  initialValue={employeeStatusOptions[0]?.value}
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Select
                    options={employeeStatusOptions}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Create>
    </CanAccess>
  )

}