import { useTable, List, DeleteButton, EditButton } from "@refinedev/antd";
import { ISupplierList } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions, CanAccess } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { CustomErrorComponent } from "../../error";


export const SupplierList = () => {

  const { tableProps, setFilters } = useTable<ISupplierList>({
    resource: "suppliers",
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
    document.title = `${translate("pages.suppliers.list.title")} | NavetraERP`;
  })

  return (
    <CanAccess 
      resource="suppliers" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
        title={translate("pages.suppliers.list.title")}
        headerButtons={
            <Space>
              <Button icon={<PlusOutlined/>} size="large" type="primary" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:SUPPLIERS")}>
                {translate("pages.suppliers.buttons.create")}
              </Button>
              <Button icon={<ArrowLeftOutlined/>} size="large" onClick={() => navigate("/procurement")}>
                {translate("buttons.back_module")}
              </Button>
            </Space>
        }
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex={"name"} title={translate("pages.suppliers.titles.name")}/>
          <Table.Column dataIndex={"contactPerson"} title={translate("pages.suppliers.titles.contact_person")}/>
          <Table.Column dataIndex={"email"} title={translate("pages.suppliers.titles.email")}/>
          <Table.Column dataIndex={"phoneNumber"} title={translate("pages.suppliers.titles.phone_number")}/>
          <Table.Column
            title={translate("pages.suppliers.titles.actions")}
            dataIndex="actions"
            key="actions"
            render={(_, record) => (
              <Space>
                <EditButton
                  size="small"
                  recordItemId={record.id}
                  resource="suppliers"
                  disabled={!permissions?.includes("EDIT:SUPPLIERS")}
                />
                <DeleteButton
                  size="small"
                  recordItemId={record.id}
                  resource="suppliers"
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
}