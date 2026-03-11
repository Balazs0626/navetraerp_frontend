import { useShow, useTranslation, CanAccess } from "@refinedev/core";
import { Show, NumberField, TextField, DateField, EmailField } from "@refinedev/antd";
import { Typography, Card, Row, Col, Descriptions, Divider, Tag, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { CustomErrorComponent } from "../../error";
import { useEmployeeStatus } from "../../../constants/employee";

const { Title } = Typography;

export const EmployeeShow = () => {
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const { result } = useShow({
    resource: "employee",
  });

  const record = result;

  const employeeStatusOptions = useEmployeeStatus();

  const getStatusLabel = (statusValue: string) => {
    const status = employeeStatusOptions.find((s) => s.value === statusValue);
    return status ? status.label : statusValue;
  };

  return (
    <CanAccess
      resource="employee"
      action="show"
      fallback={<CustomErrorComponent status="403" />}
    >
      <Show
        title={translate("pages.employee.show.title")}
        goBack={null}
        headerButtons={() => (
          <>
            <Button
              onClick={() => navigate("/hr/employee")}
              icon={<ArrowLeftOutlined />}
              size="large"
            >
              {translate("pages.employee.buttons.back")}
            </Button>
          </>
        )}
      >
        <Card
          title={translate("pages.employee.titles.personal_data")}
          type="inner"
        >
          <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
            <Descriptions.Item label={translate("pages.employee.titles.first_name")}>
              <TextField value={record?.firstName} />
            </Descriptions.Item>
            <Descriptions.Item label={translate("pages.employee.titles.last_name")}>
              <TextField value={record?.lastName} />
            </Descriptions.Item>
            <Descriptions.Item label={translate("pages.employee.titles.birth_date")}>
              <DateField value={record?.birthDate} format="YYYY-MM-DD" />
            </Descriptions.Item>
            <Descriptions.Item label={translate("pages.employee.titles.email")}>
              <EmailField value={record?.email} />
            </Descriptions.Item>
            <Descriptions.Item label={translate("pages.employee.titles.phone_number")}>
              <TextField value={record?.phoneNumber} />
            </Descriptions.Item>
            <Descriptions.Item label={translate("pages.employee.titles.id_number")}>
              <TextField value={record?.idNumber} />
            </Descriptions.Item>
            <Descriptions.Item label={translate("pages.employee.titles.tax_id_number")}>
              <TextField value={record?.taxIdNumber} />
            </Descriptions.Item>
            <Descriptions.Item label={translate("pages.employee.titles.health_insurance_number")}>
              <TextField value={record?.healthInsuranceNumber} />
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Divider />

        <Card
          title={translate("pages.employee.titles.address_data")}
          type="inner"
        >
          <Row gutter={24}>
            <Col span={12}>
              <Title level={5}>{translate("pages.employee.titles.address")}</Title>
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label={translate("pages.employee.titles.address_country")}>
                  {record?.addressCountry}
                </Descriptions.Item>
                <Descriptions.Item label={translate("pages.employee.titles.address_postcode")}>
                  {record?.addressPostCode}
                </Descriptions.Item>
                <Descriptions.Item label={translate("pages.employee.titles.address_city")}>
                  {record?.addressCity}
                </Descriptions.Item>
                <Descriptions.Item label={translate("pages.employee.titles.address_first")}>
                  {record?.addressFirstLine}
                </Descriptions.Item>
                {record?.addressSecondLine !== "" && (
                  <Descriptions.Item label={translate("pages.employee.titles.address_second")}>
                    {record?.addressSecondLine}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Col>
            <Col span={12}>
              <Title level={5}>{translate("pages.employee.titles.temp_address")}</Title>
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label={translate("pages.employee.titles.address_country")}>
                  {record?.tempAddressCountry || "-"}
                </Descriptions.Item>
                <Descriptions.Item label={translate("pages.employee.titles.address_postcode")}>
                  {record?.tempAddressPostCode || "-"}
                </Descriptions.Item>
                <Descriptions.Item label={translate("pages.employee.titles.address_city")}>
                  {record?.tempAddressCity || "-"}
                </Descriptions.Item>
                <Descriptions.Item label={translate("pages.employee.titles.address_first")}>
                  {record?.tempAddressFirstLine || "-"}
                </Descriptions.Item>
                {record?.tempAddressSecondLine !== "" && (
                  <Descriptions.Item label={translate("pages.employee.titles.address_second")}>
                    {record?.tempAddressSecondLine}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Col>
          </Row>
        </Card>

        <Divider />

        <Card
          title={translate("pages.employee.titles.work_data")}
          type="inner"
          style={{ marginBottom: 24 }}
        >
          <Descriptions column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}>
            <Descriptions.Item label={translate("pages.employee.titles.department_id")}>
              <TextField value={record?.departmentName} />
            </Descriptions.Item>
            <Descriptions.Item label={translate("pages.employee.titles.position_id")}>
              <TextField value={record?.positionName} />
            </Descriptions.Item>
            <Descriptions.Item label={translate("pages.employee.titles.hire_date")}>
              <DateField value={record?.hireDate} format="YYYY-MM-DD" />
            </Descriptions.Item>
            <Descriptions.Item label={translate("pages.employee.titles.salary")}>
              <NumberField 
                value={record?.salary} 
                options={{ style: "currency", currency: "HUF", maximumFractionDigits: 0 }} 
              />
            </Descriptions.Item>
            <Descriptions.Item label={translate("pages.employee.titles.status")}>
              <Tag color="blue">{getStatusLabel(record?.status)}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label={translate("pages.employee.titles.user_id")}>
              <TextField value={record?.userName || "-"} />
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Show>
    </CanAccess>
  );
};