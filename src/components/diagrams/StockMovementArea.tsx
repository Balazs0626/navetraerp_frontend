import { Area, Column } from "@ant-design/plots";
import { Card, Empty, Skeleton, Space, Spin, theme } from "antd";
import { WarehouseSelect } from "../WarehouseSelect";
import { useMemo, useState } from "react";
import { useList, useTranslation } from "@refinedev/core";
import { IStockMovements } from "../../interfaces";
import dayjs from "dayjs";

export const StockMovementArea = () => {

  const { translate } = useTranslation();
  const { token } = theme.useToken();

  const { result: stockMovementsListData, query } = useList<IStockMovements>({
    resource: "stock_movements",
    filters: [
      {
        field: "movementDateGte",
        operator: "gte",
        value: dayjs().subtract(30, "days").format("YYYY-MM-DD"),
      },
    ],
    pagination: { mode: "off" },
  });

  const isLoading = query.isLoading;

  const chartData = useMemo(() => {
    const movements = stockMovementsListData?.data ?? [];

    const stats = movements.reduce((acc: any, curr: any) => {
      const date = dayjs(curr.movementDate).format("YYYY-MM-DD");
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(stats)
      .map((key) => ({
        date: key,
        count: stats[key],
      }))
      .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
  }, [stockMovementsListData]);

  const config = {
    data: chartData,
    xField: "date",
    yField: "count",
    smooth: true,
    slider: {
      start: 0,
      end: 1,
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
          name: translate("diagrams.stock_movements.tooltip"),
          valueFormatter: (val: number) => `${val.toLocaleString()} ${translate("diagrams.stock_movements.unit")}`,
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
        labelFontSize: 14
      }
    },
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "#ffffff",
        stroke: token.colorPrimary,
        lineWidth: 2,
      },
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
    <Card title={translate("diagrams.sales_orders.title")} type="inner">
      <div style={{ height: 400 }}>
        {chartData.length > 0 ? (
          <Area {...config} />
        ) : (
          <div style={{ textAlign: "center", paddingTop: 100 }}>
            <Empty />
          </div>
        )}
      </div>
    </Card>
  );
};