import { Column } from "@ant-design/plots";
import { Card, Empty, Skeleton, Space, Spin, theme } from "antd";
import { WarehouseSelect } from "../WarehouseSelect";
import { useMemo, useState } from "react";
import { useList, useTranslation } from "@refinedev/core";

export const StockColumn = () => {

  const { translate } = useTranslation();
  const { token } = theme.useToken();

  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string | null>(null);

  const { result: listData } = useList({
    resource: "inventory_items",
    filters: [
      {
        field: "warehouseId",
        operator: "eq",
        value: selectedWarehouseId,
      },
    ],
    pagination: { mode: "off" },
    queryOptions: {
      enabled: !!selectedWarehouseId,
    },
    meta: {
        populate: ["product"] 
    }
  });

  const chartData = useMemo(() => {
    const items = listData?.data ?? []; 

    return items.map((item: any) => ({
      productName: item.productName,
      quantityWithUnit: `${Number(item.quantityOnHand)} ${item.productUnit}`, 
      quantity: Number(item.quantityOnHand)
    })).sort((a, b) => b.quantity - a.quantity);

  }, [listData]);
  
  const isLoading = false;

  const config = {
    data: chartData,
    xField: "productName",
    yField: "quantity",
    legend: false as const,
    label: {
      position: "middle" as const,
      style: { fill: "#ffffff" },
    },
    scrollbar: {
      x: {
        ratio: 1, 
      }
    },
    tooltip: {
      items: [
        {
          channel: "y",
          name: translate("diagrams.sales_orders.tooltip"),
          valueFormatter: (val: number) => `${val.toLocaleString()}`,
        },
      ],
    },
    axis: {
      x: {
        labelFill: token.colorTextBase,
        labelFontSize: 14
      },
      y: {
        labelFill: token.colorTextBase,
        labelFontSize: 14,
        labelFormatter: (v: number) => `${v.toLocaleString()}`
      }
    },
  };

  if (isLoading) {
    return (
      <Card style={{ textAlign: "center", padding: "50px" }}>
        <Spin />
      </Card>
    );
  }

  return (
    <Card 
      title={translate("diagrams.inventory_items.title")}
      type="inner"
      extra={
        <Space>
          {`${translate("pages.inventory_items.titles.warehouse")}:`}
          <WarehouseSelect
            onChange={(value: any) => setSelectedWarehouseId(value)}
          />
        </Space>
          
      }
    >
      {!selectedWarehouseId ? (
        <Empty />
      ) : chartData.length === 0 ? (
        <Empty />
      ) : (
        <div style={{ height: "400px" }}>
            <Column {...config} />
        </div>
      )}
    </Card>
  );
};