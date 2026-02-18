import React, { useMemo } from "react";
import { useList, HttpError, useTranslation } from "@refinedev/core";
import { Bar, Column } from "@ant-design/plots";
import { Card, Empty, Spin, theme, Typography } from "antd";
import { IProductionOrderList } from "../../interfaces";

export const ProductionOrderBar = () => {

  const { translate } = useTranslation();
  const {token} = theme.useToken();

  const { result, query } = useList<IProductionOrderList, HttpError>({
    resource: "production_orders",
  });

  const response = result;

  const chartData = useMemo(() => {

    const list = (response as any)?.result || response?.data || [];
    
    if (!Array.isArray(list)) return [];

    const stats = list.reduce((acc: any[], curr: IProductionOrderList) => {

      const translatedStatus = translate(`selects.production_orders.options_status.${curr.status}`, curr.status);
      
      const existing = acc.find((item) => item.type === translatedStatus);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ type: translatedStatus, count: 1 });
      }
      return acc;
    }, []);

    return stats;
  }, [response, translate]);


  const config = {
    data: chartData,
    xField: "type",
    yField: "count",
    legend: false as const,
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF"
      }
    },
    tooltip: {
      items: [
        {
          channel: "y",
          name: translate("diagrams.production_orders.tooltip"),
          valueFormatter: (val: number) => `${val} ${translate("diagrams.production_orders.unit")}`,
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
        labelFormatter: (val: number) => `${val} ${translate("diagrams.production_orders.unit")}`,
      }
    }
  };

  if (query.isLoading) {
    return (
      <Card style={{ textAlign: "center", padding: "20px" }}>
        <Spin />
      </Card>
    );
  }

  return (
    <Card 
      title={translate("diagrams.production_orders.title")} 
      type="inner"
    >
      <div style={{ height: 400 }}>
        {chartData.length > 0 ? (
          <Bar {...config} key={`chart-${chartData.length}`} />
        ) : (
          <div style={{ textAlign: "center", paddingTop: 100 }}>
            <Empty />
          </div>
        )}
      </div>
    </Card>
  );
};
