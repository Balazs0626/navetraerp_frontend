import { ArrowLeftOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { CanAccess, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, DatePicker, Rate, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { EmployeeOneSelect } from "../../../components/EmployeeOneSelect";
import dayjs from "dayjs";
import { CustomErrorComponent } from "../../error";

export const PerformanceReviewCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "performance_reviews",
    redirect: false
  });

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${translate("pages.performance_reviews.create.title")} | NavetraERP`;
  })  

  const handleFinish = (values: any) => {
    const formattedValues = {
        ...values,
        reviewDate: values.reviewDate?.format("YYYY-MM-DD")
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  return (
    <CanAccess 
      resource="performance_reviews" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.performance_reviews.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/hr/performance_reviews")}
              size="large"
            ><ArrowLeftOutlined/>{translate("pages.performance_reviews.buttons.back")}</Button>
          </Space>
        }
      >
        <Form
          {...formProps}
          form={form}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Card title={translate("pages.performance_reviews.titles.data")} type="inner">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.performance_reviews.titles.employee")}
                  name="employeeId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <EmployeeOneSelect/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.performance_reviews.titles.date")}
                  name="reviewDate"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                  initialValue={dayjs()}
                >
                  <DatePicker 
                    format="YYYY-MM-DD"
                    style={{width: "100%"}}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.performance_reviews.titles.score")}
                  name="score"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Rate 
                    value={0} 
                    count={5} 
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                    label={translate("pages.performance_reviews.titles.comment")}
                    name="comment"
                >
                  <Input.TextArea placeholder={`${translate("pages.performance_reviews.titles.comment")}...`}/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Create>
    </CanAccess>
  )
}