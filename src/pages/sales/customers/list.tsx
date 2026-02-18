import { useTable, List, DeleteButton, EditButton } from "@refinedev/antd";
import { ICustomerList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions, CanAccess } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { CustomErrorComponent } from "../../error";


export const CustomerList = () => {

  const { tableProps, setFilters } = useTable<ICustomerList>({
    resource: "customers",
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
    document.title = `${translate("pages.customers.list.title")} | NavetraERP`;
  })

  return (
    <CanAccess 
      resource="customers" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
        title={translate("pages.customers.list.title")}
        headerButtons={
            <Space>
              <Button icon={<PlusOutlined/>} size="large" type="primary" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:SUPPLIERS")}>
                {translate("pages.customers.buttons.create")}
              </Button>
              <Button icon={<ArrowLeftOutlined/>} size="large" onClick={() => navigate("/sales")}>
                {translate("buttons.back_module")}
              </Button>
            </Space>
        }
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex={"name"} title={translate("pages.customers.titles.name")}/>
          <Table.Column dataIndex={"email"} title={translate("pages.customers.titles.email")}/>
          <Table.Column dataIndex={"phoneNumber"} title={translate("pages.customers.titles.phone_number")}/>
          <Table.Column
            title={translate("pages.customers.titles.actions")}
            dataIndex="actions"
            key="actions"
            render={(_, record) => (
              <Space>
                <EditButton
                  size="small"
                  recordItemId={record.id}
                  resource="customers"
                  disabled={!permissions?.includes("EDIT:SUPPLIERS")}
                />
                <DeleteButton
                  size="small"
                  recordItemId={record.id}
                  resource="customers"
                  confirmTitle={translate("notifications.deleteMessage")}
                  disabled={!permissions?.includes("DELETE:SUPPLIERS")}
                />
              </Space>
            )}
          />
        </Table>
      </List>
    </CanAccess>
  )
};