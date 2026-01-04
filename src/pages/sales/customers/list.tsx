import { useTable, List, DeleteButton, EditButton } from "@refinedev/antd";
import { ICustomerList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker } from "antd";
import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';


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
    document.title = translate("pages.customers.list.title");
  }) 

  return (
    <List
      title={translate("pages.customers.list.title")}
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:SUPPLIERS")}>
                {translate("pages.customers.buttons.create")}
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
  )
};