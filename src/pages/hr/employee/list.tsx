import { useTable, List, EditButton, DeleteButton, ExportButton, ImportButton } from "@refinedev/antd";
import { IDepartmentList, IEmployeeCreate, IEmployeeList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input } from "antd";
import { ArrowLeftOutlined, CheckCircleOutlined, CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { CanAccess, useExport, useImport, usePermissions, useTranslation } from "@refinedev/core";
import { useEffect } from "react";
import { DepartmentSelect } from "../../../components/DepartmentSelect";
import { PositionSelect } from "../../../components/PositionSelect";
import dayjs from "dayjs";
import { CustomErrorComponent } from "../../error";

export const EmployeeList = () => {

  const { tableProps, setFilters } = useTable<IEmployeeList>({
      resource: "employee",
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
  
      if (values.fullName) {
        filters.push({
          field: "fullName",
          operator: "contains" as const,
          value: values.fullName,
        });
      }

      if (values.departmentId) {
        
        filters.push({
          field: "departmentId",
          operator: "eq" as const,
          value: values.departmentId,
        });
      }

      if (values.positionId) {
        
        filters.push({
          field: "positionId",
          operator: "eq" as const,
          value: values.positionId,
        });
      }

      console.log(filters);
  
      setFilters(filters);
    };

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = translate("pages.employee.list.title");
  }) 

  return (
    <CanAccess 
      resource="employee" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
        title={translate("pages.employee.list.title")}
        headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" type="primary" onClick={() => navigate("/hr/employee/create")} disabled={!permissions?.includes("CREATE:EMPLOYEES")}>
              {translate("pages.employee.buttons.create")}
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
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="fullName"
                      label={translate("pages.employee.titles.employee")}
                    >
                      <Input placeholder={`${translate("pages.employee.titles.employee")}...`} allowClear/>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="departmentId"
                      label={translate("pages.employee.titles.department_name")}
                    >
                      <DepartmentSelect/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="positionId"
                      label={translate("pages.employee.titles.position_name")}
                    >
                      <PositionSelect
                        style={{width: "50%"}}
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
            <Table {...tableProps} rowKey="id">
              <Table.Column dataIndex={"fullName"} title={translate("pages.employee.titles.employee")}/>
              <Table.Column dataIndex={"departmentName"} title={translate("pages.employee.titles.department_name")}/>
              <Table.Column dataIndex={"positionName"} title={translate("pages.employee.titles.position_name")}/>
              <Table.Column 
                  dataIndex="hasUser"
                  title={translate("pages.employee.titles.has_user")}
                  align="center"
                  render={(value: boolean) => (
                    <Space>
                      {value ? (
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
              <Table.Column<IDepartmentList>
                title={translate("pages.employee.list.actions")}
                dataIndex="actions"
                key="actions"
                render={(_, record) => (
                  <Space>
                    <EditButton
                      size="small"
                      recordItemId={record.id}
                      resource="employee"
                      onClick={() => navigate(`/hr/employee/edit/${record.id}`)}
                      disabled={!permissions?.includes("EDIT:EMPLOYEES")}
                    />
                    <DeleteButton
                      size="small"
                      recordItemId={record.id}
                      resource="employee"
                      confirmTitle={translate("notifications.deleteMessage")}
                      disabled={!permissions?.includes("DELETE:EMPLOYEES")}
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