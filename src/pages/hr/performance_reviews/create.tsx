import { ArrowLeftOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, DatePicker, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { EmployeeOneSelect } from "../../../components/EmployeeOneSelect";
import dayjs from "dayjs";

export const PerformanceReviewCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "performance_reviews",
    redirect: false
  });

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = translate("pages.performance_reviews.create.title");
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
        <Card title={translate("pages.performance_reviews.titles.data")}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={translate("pages.performance_reviews.titles.employee")}
                name="employeeId"
                rules={[{ required: true }]}
              >
                <EmployeeOneSelect/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={translate("pages.performance_reviews.titles.date")}
                name="reviewDate"
                rules={[{ required: true }]}
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
                rules={[{ required: true }]}
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
                <TextArea/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Create>
  )

}