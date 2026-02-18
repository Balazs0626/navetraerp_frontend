import { ArrowLeftOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { CanAccess, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, TimePicker } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { CustomErrorComponent } from "../../error";

export const ShiftCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "shifts",
    redirect: false
  });

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const timeFormat = 'HH:mm';

  useEffect(() => {
    document.title = `${translate("pages.shifts.create.title")} | NavetraERP`;
  })  

  return (
    <CanAccess 
      resource="shifts" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.shifts.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/hr/shifts")}
              size="large"
            ><ArrowLeftOutlined/>{translate("pages.shifts.buttons.back")}</Button>
          </Space>
        }
      >
        <Form
          {...formProps}
          form={form}
          layout="vertical"
        >
          <Card title={translate("pages.shifts.titles.data")} type="inner">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.shifts.titles.name")}
                  name="shiftName"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Input placeholder={`${translate("pages.shifts.titles.name")}...`}/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.shifts.titles.start_time")}
                  name="startTime"
                  getValueProps={(value) => ({
                    value: value ? dayjs(value, timeFormat) : null 
                  })}
                  getValueFromEvent={(timeMoment) => {
                    if (timeMoment && dayjs.isDayjs(timeMoment)) {
                      return timeMoment.format(timeFormat);
                    }
                    return null;
                  }}
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <TimePicker
                    style={{width: '100%'}}
                    format={timeFormat}
                    placeholder={`${translate("pages.shifts.titles.start_time")}...`}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.shifts.titles.end_time")}
                  name="endTime"
                  getValueProps={(value) => ({
                    value: value ? dayjs(value, timeFormat) : null 
                  })}
                  getValueFromEvent={(timeMoment) => {
                    if (timeMoment && dayjs.isDayjs(timeMoment)) {
                      return timeMoment.format(timeFormat);
                    }
                    return null;
                  }}
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <TimePicker
                    style={{width: '100%'}}
                    format={timeFormat}
                    placeholder={`${translate("pages.shifts.titles.end_time")}...`}
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