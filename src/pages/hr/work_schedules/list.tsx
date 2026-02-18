import { useTable, List, DeleteButton, ExportButton } from "@refinedev/antd";
import { IWorkScheduleList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions, useExport, CanAccess } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { CustomErrorComponent } from "../../error";


export const WorkScheduleList = () => {

  const { tableProps, setFilters } = useTable<IWorkScheduleList>({
    resource: "work_schedules",
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
        field: "name",
        operator: "contains" as const,
        value: values.employeeName,
      });
    }

    if (values.date) {
      filters.push({
        field: "date",
        operator: "eq" as const,
        value: dayjs(values.date).format("YYYY-MM-DD"),
      });
    }

    setFilters(filters);
  };

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = `${translate("pages.work_schedules.list.title")} | NavetraERP`;
  })

  return (
    <CanAccess 
      resource="work_schedules" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
        title={translate("pages.work_schedules.list.title")}
        headerButtons={
            <Space>
              <Button icon={<PlusOutlined/>} size="large" type="primary" onClick={() => navigate("/hr/work_schedules/create")} disabled={!permissions?.includes("CREATE:WORK_SCHEDULES")}>
                  {translate("pages.work_schedules.buttons.create")}
              </Button>
              <Button icon={<CalendarOutlined/>} size="large" onClick={() => navigate("/hr/work_schedules/calendar")}>
                  {translate("pages.work_schedules.buttons.calendar")}
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
                  label={translate("pages.work_schedules.titles.employee")}
                >
                  <Input placeholder={`${translate("pages.work_schedules.titles.employee")}...`} allowClear />
                </Form.Item>

                <Form.Item
                  name="date"
                  label={translate("pages.work_schedules.titles.date")}
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
              <Table.Column dataIndex={"employeeName"} title={translate("pages.work_schedules.titles.employee")}/>
              <Table.Column dataIndex={"shiftName"} title={translate("pages.work_schedules.titles.shift")}/>
              <Table.Column 
                dataIndex={"date"} 
                title={translate("pages.work_schedules.titles.date")}
                render={(value) => dayjs(value).format("YYYY. MM. DD.")}
              />
              <Table.Column
                title={translate("pages.work_schedules.list.actions")}
                dataIndex="actions"
                key="actions"
                render={(_, record) => (
                  <Space>
                    <DeleteButton
                      size="small"
                      recordItemId={record.id}
                      resource="work_schedules"
                      confirmTitle={translate("notifications.deleteMessage")}
                      disabled={!permissions?.includes("DELETE:WORK_SCHEDULES")}
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
}