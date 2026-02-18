import { useTable, List, DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
import { IInventoryCounts, IInventoryItems, IStockMovements } from "../../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker, InputNumber, Select } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, FileTextOutlined, FormOutlined, NumberOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions, CanAccess } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { WarehouseSelect } from "../../../components/WarehouseSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { useStockMovementType } from "../../../constants/stock_movements";
import { CustomErrorComponent } from "../../error";


export const InventoryCountList = () => {

  const { tableProps, setFilters } = useTable<IInventoryCounts>({
    resource: "inventory_counts",
    pagination: {
      pageSize: 10,
    },
    filters: {
      permanent: [],
      initial: [],
    }
  });

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = `${translate("pages.inventory_counts.list.title")} | NavetraERP`;
  }) 

  return (
    <CanAccess 
      resource="inventory_counts" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
        title={translate("pages.inventory_counts.list.title")}
        headerButtons={
            <Space>
              <Button icon={<PlusOutlined/>} size="large" type="primary" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:INVENTORY_COUNTS")}>
                  {translate("pages.inventory_counts.buttons.create")}
              </Button>
              <Button icon={<ArrowLeftOutlined/>} size="large" onClick={() => navigate("/inventory")}>
                {translate("buttons.back_module")}
              </Button>
            </Space>
        }
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex={"id"} title={translate("pages.inventory_counts.titles.id")}/>
          <Table.Column dataIndex={"warehouseName"} title={translate("pages.inventory_counts.titles.warehouse")}/>
          <Table.Column dataIndex={"countedByName"} title={translate("pages.inventory_counts.titles.counted_by")}/>
          <Table.Column dataIndex={"countDate"} title={translate("pages.inventory_counts.titles.count_date")} render={(value) => dayjs(value).format("YYYY. MM. DD.")}/>
          <Table.Column
            title={translate("pages.inventory_counts.titles.actions")}
            dataIndex="actions"
            key="actions"
            render={(_, record) => (
              <Space>
                <ShowButton
                  size="small"
                  recordItemId={record.id}
                  resource="inventory_counts"
                />
                <DeleteButton
                  size="small"
                  recordItemId={record.id}
                  resource="inventory_counts"
                  confirmTitle={translate("notifications.deleteMessage")}
                  disabled={!permissions?.includes("DELETE:INVENTORY_COUNTS")}
                />
              </Space>
            )}
          />
        </Table>
      </List>
    </CanAccess>
  )
}