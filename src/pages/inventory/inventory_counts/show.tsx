import { ArrowLeftOutlined } from "@ant-design/icons";
import { Show, DateField, RefreshButton } from "@refinedev/antd";
import { CanAccess, useShow, useTranslation } from "@refinedev/core";
import { Typography, Descriptions, Rate, Space, Button, Table } from "antd";
import { useNavigate } from "react-router";
import { CustomErrorComponent } from "../../error";

const { Title, Text } = Typography;

export const InventoryCountShow = () => {

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { result: data } = useShow();
  const record = data;

  const columns = [
    {
      title: translate("pages.inventory_counts.titles.product"),
      dataIndex: "productName",
      key: "productName"
    },
    {
      title: translate("pages.inventory_counts.titles.counted_quantity"),
      dataIndex: "countedQuantity",
      key: "countedQuantity"
    },
    {
      title: translate("pages.inventory_counts.titles.system_quantity"),
      dataIndex: "systemQuantity",
      key: "systemQuantity"
    },
    {
      title: translate("pages.inventory_counts.titles.unit"),
      dataIndex: "productUnit",
      key: "productUnit"
    }
  ];

  return (
    <CanAccess 
      resource="inventory_counts" 
      action="show" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Show
        goBack={null}
        title={translate("pages.inventory_counts.show.title")}
        headerButtons={
          <Space>
            <RefreshButton
              size="large"  
            />
            <Button
              onClick={() => navigate("/inventory/inventory_counts")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.inventory_counts.buttons.back")}
            </Button>
          </Space>
        }
      >
          <Descriptions 
              title={translate("pages.inventory_counts.titles.details")} 
              bordered 
              column={{ xs: 1, sm: 2, md: 3 }}
          >
              <Descriptions.Item label={translate("pages.inventory_counts.titles.id")}>
                  <Text>{record?.id}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.inventory_counts.titles.warehouse")}>
                  <Text>{record?.warehouseName}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.inventory_counts.titles.count_date")}>
                  <DateField value={record?.countDate} format="YYYY. MM. DD." />
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.inventory_counts.titles.counted_by")}>
                  <Text>{record?.countedByName}</Text>
              </Descriptions.Item>
              
          </Descriptions>
          <Table
            pagination={false}
            columns={columns}
            rowKey="id"
            dataSource={record?.items}
            style={{paddingTop: 12}}
          />
      </Show>
    </CanAccess>
  )
}