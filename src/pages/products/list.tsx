import { useTable, List, DeleteButton, EditButton } from "@refinedev/antd";
import { IProductList } from "../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker } from "antd";
import { CalendarOutlined, CheckCircleOutlined, CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';


export const ProductList = () => {

  const { tableProps, setFilters } = useTable<IProductList>({
    resource: "products",
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
    document.title = translate("pages.products.list.title");
  }) 

  return (
    <List
      title={translate("pages.products.list.title")}
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:WORK_SCHEDULES")}>
                {translate("pages.products.buttons.create")}
            </Button>
          </Space>
      }
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={"sku"} title={translate("pages.products.titles.sku")}/>
        <Table.Column dataIndex={"name"} title={translate("pages.products.titles.name")}/>
        <Table.Column 
          dataIndex="active"
          title={translate("pages.products.titles.active")}
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
        <Table.Column
          title={translate("pages.products.list.actions")}
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            <Space>
              <EditButton
                size="small"
                recordItemId={record.id}
                resource="products"
                onClick={() => navigate(`edit/${record.id}`)}
                disabled={!permissions?.includes("EDIT:WORK_SCHEDULES")}
              />
              <DeleteButton
                size="small"
                recordItemId={record.id}
                resource="products"
                confirmTitle={translate("notifications.deleteMessage")}
                disabled={!permissions?.includes("DELETE:WORK_SCHEDULES")}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
};