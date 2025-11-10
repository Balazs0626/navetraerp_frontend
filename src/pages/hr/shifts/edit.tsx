import { ArrowLeftOutlined } from "@ant-design/icons";
import { Edit, useForm } from "@refinedev/antd";
import { useTranslation } from "@refinedev/core";
import { Button, Card, Col, Form, Input, Row, Space, TimePicker } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";

export const ShiftEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "shifts",
      action: "edit",
      id,
  });

  const timeFormat = 'HH:mm';

  useEffect(() => {
    document.title = translate("pages.positions.edit.title");
  })

  useEffect(() => {
      if (!form) return;

      const initialValues = formProps.initialValues;

      if (!initialValues) return;

  }, [formProps.initialValues])

  return (
    <Edit
      title={translate("pages.shifts.edit.title")}
      saveButtonProps={saveButtonProps}
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
                label={translate("pages.shifts.titles.shift")}
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

    </Edit>
  )
};