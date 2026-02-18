import { ArrowLeftOutlined } from "@ant-design/icons";
import { Show, DateField, RefreshButton } from "@refinedev/antd";
import { CanAccess, useShow, useTranslation } from "@refinedev/core";
import { Typography, Descriptions, Rate, Space, Button } from "antd";
import { useNavigate } from "react-router";
import { CustomErrorComponent } from "../../error";

const { Title, Text } = Typography;

export const StockMovementShow = () => {

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { result: data } = useShow();
  const record = data;

  return (
    <CanAccess 
      resource="stock_movements" 
      action="show" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Show
        goBack={null}
        title={translate("pages.stock_movements.show.title")}
        headerButtons={
          <Space>
            <RefreshButton
              size="large"  
            />
            <Button
              onClick={() => navigate("/inventory/stock_movements")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.stock_movements.buttons.back")}
            </Button>
          </Space>
        }
      >
          <Descriptions 
              title={translate("pages.stock_movements.titles.details")} 
              bordered 
              column={{ xs: 1, sm: 2, md: 3 }}
          >
              <Descriptions.Item label={translate("pages.stock_movements.titles.product")}>
                  <Text>{record?.productName}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.stock_movements.titles.quantity")}>
                  <Text>{record?.quantity} {record?.productUnit}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.stock_movements.titles.from_warehouse")}>
                  <Text>{record?.fromWarehouseName == null || record?.fromWarehouseName == "" ? "-" : record?.fromWarehouseName}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.stock_movements.titles.to_warehouse")}>
                  <Text>{record?.toWarehouseName == null || record?.toWarehouseName == "" ? "-" : record?.toWarehouseName}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.stock_movements.titles.reference_document")}>
                  <Text>{record?.referenceDocument == null || record?.referenceDocument == "" ? "-" : record?.referenceDocument}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.stock_movements.titles.movement_type")}>
                  <Text>{record?.movementType}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.stock_movements.titles.movement_date")}>
                  <DateField value={record?.movementDate} format="YYYY. MM. DD." />
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.stock_movements.titles.performed_by")}>
                  <Text>{record?.performedByName == null || record?.performedByName == "" ? "-" : record?.performedByName}</Text>
              </Descriptions.Item>
              
          </Descriptions>
          
      </Show>
    </CanAccess>
  )
}