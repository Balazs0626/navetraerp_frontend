import { ArrowLeftOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

export const ShiftCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "shifts",
    redirect: false
  });

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const timeFormat = 'HH:mm';

  useEffect(() => {
    document.title = translate("pages.shifts.create.title");
  })  

  return (
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
        <Card title={translate("pages.shifts.titles.data")}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={translate("pages.shifts.titles.name")}
                name="shiftName"
                rules={[{ required: true }]}
              >
                <Input/>
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
                  return null; // Ha nincs kiválasztva idő
                }}
                rules={[{ required: true }]}
              >
                <TimePicker
                  style={{width: '100%'}}
                  format={timeFormat}
                  placeholder="Válasszon kezdő időpontot"
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
                  return null; // Ha nincs kiválasztva idő
                }}
                rules={[{ required: true }]}
              >
                <TimePicker
                  style={{width: '100%'}}
                  format={timeFormat}
                  placeholder="Válasszon záró időpontot"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Create>
  )

}