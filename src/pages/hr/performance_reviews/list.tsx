import { useTable, List, DeleteButton, ShowButton } from "@refinedev/antd";
import { IPerfromanceReview } from "../../../interfaces";
import { Button, Rate, Space, Table, Row, Col, Input, Form, Card, DatePicker } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { CanAccess, usePermissions, useTranslation } from "@refinedev/core";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { CustomErrorComponent } from "../../error";

export const PerformanceReviewList = () => {

  const { tableProps, setFilters } = useTable<IPerfromanceReview>({
    resource: "performance_reviews",
    pagination: {
      pageSize: 10,
    },
    filters: {
      permanent: [],
      initial: [],
    },
  });

  const [form] = Form.useForm();

  const onSearch = (values: any) => {
    const filters = [];

    if (values.employeeName) {
      filters.push({
        field: "employeeName",
        operator: "contains" as const,
        value: values.employeeName,
      });
    }

    if (values.reviewDate) {
      filters.push({
        field: "date",
        operator: "eq" as const,
        value: dayjs(values.reviewDate).format("YYYY-MM-DD"),
      });
    }

    setFilters(filters);
  };

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = `${translate("pages.performance_reviews.list.title")} | NavetraERP`;
  })  

  return (
    <CanAccess 
      resource="performance_reviews" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
        title={translate("pages.performance_reviews.list.title")}
        headerButtons={
            <Space>
              <Button icon={<PlusOutlined/>} size="large" type="primary" onClick={() => navigate("/hr/performance_reviews/create")} disabled={!permissions?.includes("CREATE:PERFORMANCE_REVIEWS")}>
                  {translate("pages.performance_reviews.buttons.create")}
              </Button>
              <Button icon={<ArrowLeftOutlined/>} size="large" onClick={() => navigate("/hr")}>
                {translate("buttons.back_module")}
              </Button>
            </Space>
        }
      >
        <Row gutter={[16, 16]}>

          <Col xs={24} lg={8}>
            <Card
              title={translate("titles.search")}
              type="inner"
            >
              <Form form={form} layout="vertical" onFinish={onSearch}>
                <Form.Item
                  name="employeeName"
                  label={translate("pages.performance_reviews.titles.employee")}
                >
                  <Input placeholder={`${translate("pages.performance_reviews.titles.employee")}...`} allowClear />
                </Form.Item>

                <Form.Item
                  name="reviewDate"
                  label={translate("pages.performance_reviews.titles.date")}
                >
                  <DatePicker 
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button 
                      type="primary" 
                      htmlType="submit"
                    >
                      {translate("buttons.search")}
                    </Button>
                    <Button
                      onClick={() => {
                        form.resetFields();
                        setFilters([], "replace");
                      }}
                    >
                      {translate("buttons.clear")}
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={16}>
            <Table {...tableProps} rowKey="id">
              <Table.Column dataIndex={"employeeName"} title={translate("pages.performance_reviews.titles.employee")}/>
              <Table.Column 
                dataIndex={"reviewDate"} 
                title={translate("pages.performance_reviews.titles.date")}
                render={(value) => dayjs(value).format("YYYY. MM. DD.")}
              />
              <Table.Column 
                dataIndex={"score"} 
                title={translate("pages.performance_reviews.titles.score")}
                render={(score: number) => (
                  <Rate 
                      count={5} 
                      value={score} 
                      disabled 
                  />
                )}
              />
              <Table.Column<IPerfromanceReview>
                title={translate("pages.performance_reviews.list.actions")}
                dataIndex="actions"
                key="actions"
                render={(_, record) => (
                  <Space>
                    <DeleteButton
                      size="small"
                      recordItemId={record.id}
                      resource="performance_reviews"
                      confirmTitle={translate("notifications.deleteMessage")}
                      disabled={!permissions?.includes("DELETE:PERFORMANCE_REVIEWS")}
                    />
                    <ShowButton
                      size="small"
                      recordItemId={record.id}
                      resource="performance_reviews"
                    />
                  </Space>
                )}
              />
            </Table>
          </Col>
        </Row>
      </List>
    </CanAccess>
  )
};