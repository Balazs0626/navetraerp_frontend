import React, { useMemo } from "react";
import { useList, useTranslation } from "@refinedev/core";
import { Area } from "@ant-design/plots";
import { Card, Spin, Typography, Space, theme, Tooltip, Empty } from "antd";
import dayjs from "dayjs";
import { ISalesOrderList } from "../../interfaces";

const { Title, Text } = Typography;

export const SalesOrderTrendArea = () => {

  const { translate } = useTranslation();
  const { token } = theme.useToken();

  const { result: data, query } = useList<ISalesOrderList>({
    resource: "sales_orders",
    pagination: {
        pageSize: 1000,
    }
  });

  const isLoading = query.isLoading;

  const chartData = useMemo(() => {
    const rawOrders = data?.data || [];
    
    const grouped = rawOrders.reduce((acc: Record<string, number>, order) => {
      const date = dayjs(order.orderDate).format("YYYY-MM-DD");
      const amount = Number(order.totalAmount);
      acc[date] = (acc[date] || 0) + amount;
      return acc;
    }, {});

    return Object.keys(grouped).map((date) => ({
      date,
      count: grouped[date],
    })).sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
  }, [data]);

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
          name: translate("diagrams.sales_orders.tooltip"),
          valueFormatter: (val: number) => `${val.toLocaleString()} HUF`,
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
        labelFormatter: (v: number) => `${v.toLocaleString()} HUF`
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