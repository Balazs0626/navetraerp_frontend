import { useTable, List, EditButton, DeleteButton, ExportButton } from "@refinedev/antd";
import { ILeaveRequestList } from "../../../interfaces";
import { Button, Space, Table, Row, Col, Card, Form, Input, Select } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useInvalidate, useTranslation, usePermissions, useExport } from "@refinedev/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../constants/url";
import { useLeaveRequestStatus, useLeaveRequestType } from "../../../constants/leave_requests";
import dayjs from "dayjs";
import { debug } from "console";

export const LeaveRequestList = () => {

  const { tableProps, setFilters, filters } = useTable<ILeaveRequestList>({
    resource: "leave_requests",
    pagination: {
      pageSize: 10,
    },
    filters: {
      permanent: [],
      initial: [],
    },
  });

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = translate("pages.leave_requests.list.title");
  }) 

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [selectedRows, setSelectedRows] = useState<ILeaveRequestList[]>([]);

  const invalidate = useInvalidate();

/*   const [exportFilters, setExportFilters] = useState<any[]>([]); */

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: any, rows: any) => {
      setSelectedRowKeys(keys)
      setSelectedRows(rows)

/*       exportFilters.push({
        field: "id",
        operator: "eq",
        value: keys[keys.length - 1],
      }); */

    },
  };

/*   console.log(exportFilters); */

  const { triggerExport, isLoading: exportLoading } = useExport<ILeaveRequestList>({
    filters: filters,
    mapData: (item: any) => {
      if (selectedRowKeys.length > 0) {
        if (selectedRowKeys.includes(item.id)) {
          return item;
        }
        return {};
      } else {
        return item;
      }
    }
   //filters: exportFilters
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

      if (values.leaveType) {
        
        filters.push({
          field: "leaveType",
          operator: "eq" as const,
          value: values.leaveType,
        });
      }

      if (values.status) {
        
        filters.push({
          field: "status",
          operator: "eq" as const,
          value: values.status,
        });
      }
  
      setFilters(filters);
    };

  const handleAction = async (action: any) => {
    if (selectedRowKeys.length === 0) {
      return;
    }

    try {
      await axios.put(`${API_URL}/leave_requests/${action}`, {
        ids: selectedRowKeys,
      });

      setSelectedRowKeys([]);

      invalidate({
            resource: "leave_requests",
            invalidates: ["list"],
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <List
      title={translate("pages.leave_requests.list.title")}
      headerButtons={
        <Space>
          {permissions?.includes("EDIT:LEAVE_REQUESTS") &&
            <>
              <Button
                type="primary"
                onClick={() => handleAction('approve')}
                size="large"
                disabled={selectedRowKeys.length === 0}
              >
                {translate("pages.leave_requests.buttons.approve")}
              </Button>
              <Button
                danger
                onClick={() => handleAction('reject')}
                size="large"
                disabled={selectedRowKeys.length === 0}
              >
                {translate("pages.leave_requests.buttons.reject")}
              </Button>
            </>
          }
          <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("/hr/leave_requests/create")} disabled={!permissions?.includes("CREATE:LEAVE_REQUESTS")}>
              {translate("pages.leave_requests.buttons.create")}
          </Button>
          <ExportButton onClick={triggerExport} loading={exportLoading} size="large">Export</ExportButton>
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
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="employeeName"
                    label={translate("pages.leave_requests.titles.employee")}
                  >
                    <Input placeholder="Dolgozó neve..." allowClear />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="leaveType"
                    label={translate("pages.leave_requests.titles.leave_type")}
                  >
                    <Select
                      placeholder={translate("selects.leave_requests.placeholder_type")}
                      options={useLeaveRequestType()}
                    /> 
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="status"
                    label={translate("pages.leave_requests.titles.status")}
                  >
                    <Select
                      placeholder={translate("selects.leave_requests.placeholder_status")}
                      options={useLeaveRequestStatus()}
                    /> 
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
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
              </Row>
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={16}>
          <Table {...tableProps} rowKey="id" rowSelection={rowSelection}>
            <Table.Column dataIndex={"employeeName"} title={translate("pages.leave_requests.titles.employee")}/>
            <Table.Column dataIndex={"leaveType"} title={translate("pages.leave_requests.titles.leave_type")} render={(value) => translate(`selects.leave_requests.options_type.${value}`)}/>
            <Table.Column dataIndex={"startDate"} title={translate("pages.leave_requests.titles.start_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
            <Table.Column dataIndex={"endDate"} title={translate("pages.leave_requests.titles.end_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
            <Table.Column 
              dataIndex={"status"} 
              title={translate("pages.leave_requests.titles.status")}
              align="center"
              render={(value: string) => (
                  <Space>
                    {value === "pending" ? (
                      <ClockCircleOutlined
                        style={{ color: '#FAAD14', fontSize: 18 }}
                      />
                    ) : value === "approved" ? (
                      <CheckCircleOutlined
                        style={{ color: '#52C41A', fontSize: 18 }}
                      />
                    ) : (
                      <CloseCircleOutlined
                        style={{ color: '#FF4D4F', fontSize: 18 }}
                      />
                    )}
                  </Space>
                )}
            />
            <Table.Column<ILeaveRequestList>
              title={translate("pages.leave_requests.list.actions")}
              dataIndex="actions"
              key="actions"
              render={(_, record) => (
                <Space>
                  <DeleteButton
                    size="small"
                    recordItemId={record.id}
                    resource="leave_requests"
                    confirmTitle={translate("notifications.deleteMessage")}
                    disabled={!permissions?.includes("DELETE:LEAVE_REQUESTS")}
                  />
                </Space>
              )}
            />
          </Table>
        </Col>
      </Row>
    </List>
  )
};