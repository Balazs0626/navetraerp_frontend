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

export const EmployeeCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "employee",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = translate("pages.employee.create.title");
  })

  const employeeStatusOptions = useEmployeeStatus();

  const phoneNumberToFormString = (value: any) => {
    if (value && value.valid && value.valid()) {
        const { countryCode, areaCode, phoneNumber } = value;
        
        return `+${countryCode} ${areaCode} ${phoneNumber.replace(/(\d{3})(\d{4})/, '$1 $2')}`;
    }
    return '';
};

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate("pages.employee.create.title")}
      goBack={null}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/hr/employee")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.employee.buttons.back")}</Button>
        </Space>
      }
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
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
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.employee.titles.last_name")}
                name="lastName"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
						<Col span={6}>
              <Form.Item
                label={translate("pages.employee.titles.birth_date")}
                name="birthDate"
                rules={[{ required: true }]}
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
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
						<Col span={6}>
              <Form.Item
                label={translate("pages.employee.titles.residence_number")}
                name="residenceNumber"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
						<Col span={6}>
              <Form.Item
                label={translate("pages.employee.titles.health_insurance_number")}
                name="healthInsuranceNumber"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
						<Col span={6}>
              <Form.Item
                label={translate("pages.employee.titles.tax_id_number")}
                name="taxIdNumber"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>
            </Col>
					</Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={translate("pages.employee.titles.phone_number")}
                name="phoneNumber"
                rules={[
                  { required: true },
                  //{ validator: phoneValidator }
                ]}
                validateTrigger={false}
                getValueFromEvent={phoneNumberToFormString}
              >
                <PhoneInput
                  enableSearch
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.employee.titles.email")}
                name="email"
                rules={[{ required: true }]}
              >
                <Input
                  type="email"
                  prefix={<MailOutlined/>}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
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
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.address_region")}
                  name="addressRegion"
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.address_postcode")}
                  name="addressPostCode"
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.address_city")}
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
                  label={translate("pages.employee.titles.address_first")}
                  name="addressFirstLine"
                  rules={[{ required: true }]}
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.employee.titles.address_second")}
                  name="addressSecondLine"
                >
                  <Input/> 
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
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.address_region")}
                  name="tempAddressRegion"
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.address_postcode")}
                  name="tempAddressPostCode"
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.employee.titles.address_city")}
                  name="tempAddressCity"
                >
                  <Input/> 
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.employee.titles.address_first")}
                  name="tempAddressFirstLine"
                >
                  <Input/> 
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={translate("pages.employee.titles.address_second")}
                  name="tempAddressSecondLine"
                >
                  <Input/> 
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Card>
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
                rules={[{ required: true }]}
              >
                <DepartmentSelect/>
              </Form.Item>
            </Col>
						<Col span={6}>
              <Form.Item
                label={translate("pages.employee.titles.position_id")}
                name="positionId"
                rules={[{ required: true }]}
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
                rules={[{ required: true }]}
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
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                /> 
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.employee.titles.status")}
                name="status"
                initialValue={employeeStatusOptions[0]?.value}
                rules={[{ required: true }]}
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
  )

}