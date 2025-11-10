import { ArrowLeftOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { useNotification, useParsed, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, TimePicker, DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import dayjs from "dayjs";
import { EmployeeSelect } from "../../../components/EmployeeSelect";
import { ShiftSelect } from "../../../components/ShiftSelect";

export const WorkScheduleCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "work_schedules",
    redirect: false
  });

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const dateFromQuery = searchParams?.get("date");

  useEffect(() => {
    document.title = translate("pages.work_schedules.create.title");

    if (dateFromQuery) {
      form.setFieldsValue({ date: dateFromQuery });
    }
  }, [dateFromQuery])

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate("pages.work_schedules.create.title")}
      goBack={null}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/hr/work_schedules")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.work_schedules.buttons.back")}</Button>
        </Space>
      }
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
      >
        <Card title={translate("pages.work_schedules.titles.data")} type="inner">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="employeeIds"
                label={translate("pages.work_schedules.titles.employee")}
                rules={[{ required: true }]}
              >
                <EmployeeSelect/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="shiftId"
                label={translate("pages.work_schedules.titles.shift")}
                rules={[{ required: true }]}
              >
                <ShiftSelect/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="date"
                label={translate("pages.work_schedules.titles.date")}
                rules={[{ required: true }]}
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : "",
                })}
                getValueFromEvent={(value) => value ? value.format("YYYY-MM-DD") : null}
              >
                <DatePicker 
                  disabled={dateFromQuery === null ? false : true}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Create>
  )

}