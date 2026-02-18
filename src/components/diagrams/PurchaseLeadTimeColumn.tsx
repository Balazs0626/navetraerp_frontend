import React, { useMemo } from "react";
import { useList, useTranslation } from "@refinedev/core";
import { Column } from "@ant-design/plots";
import { Card, Spin, Typography, theme, Alert, Empty } from "antd";
import dayjs from "dayjs";
import { IPurchaseOrderList, IGoodsReceiptList } from "../../interfaces";

export const PurchaseLeadTimeColumn = () => {

  const { translate } = useTranslation();
  const { token } = theme.useToken();

  const { result: ordersData, query: ordersQuery } = useList<IPurchaseOrderList>({
    resource: "purchase_orders",
    pagination: { pageSize: 500 },
  });

  const ordersLoading = ordersQuery.isLoading;

  const { result: receiptsData, query: receiptsQuery } = useList<IGoodsReceiptList>({
    resource: "goods_receipts",
    pagination: { pageSize: 500 },
  });

  const receiptsLoading = receiptsQuery.isLoading;

  const chartData = useMemo(() => {

    const orders = ordersData?.data || [];
    const receipts = receiptsData?.data || [];

    return receipts.map((receipt) => {

      const relatedOrder = orders.find((o) => o.id === receipt.purchaseOrderId);

      if (relatedOrder) {
        const orderDate = dayjs(relatedOrder.orderDate);
        const receiptDate = dayjs(receipt.receiptDate);
        
        const leadTimeDays = receiptDate.diff(orderDate, "day");

        return {
          orderId: relatedOrder.receiptNumber,
          days: leadTimeDays < 0 ? 0 : leadTimeDays,
          date: receipt.receiptDate,
        };
      }
      return null;
    })
    .filter(Boolean)
    .sort((a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix());
  }, [ordersData, receiptsData]); 

  const averageLeadTime = useMemo(() => {
    if (chartData.length === 0) return 0;
    const sum = chartData.reduce((acc, curr: any) => acc + curr.days, 0);
    return sum / chartData.length;
  }, [chartData]);

  const config = {
    data: chartData,
    xField: "orderId",
    yField: "days",
    style: {
      fill: token.colorPrimary,
    },
    scrollbar: {
      x: {
        ratio: 1, 
      }
    },
    axis: {
      x: {
        labelFill: token.colorTextBase,
        labelFontSize: 14
      },
      y: {
        labelFill: token.colorTextBase,
        labelFontSize: 14,
        labelFormatter: (val: number) => `${val} ${translate("diagrams.purchase_orders.unit")}`,
      }
    },
    tooltip: {
      items: [
        {
          channel: "y",
          name: translate("diagrams.purchase_orders.tooltip"),
          valueFormatter: (val: number) => `${val} ${translate("diagrams.purchase_orders.unit")}`,
        },
      ],
    },
    annotations: chartData.length > 0 ? [
      {
        type: "lineY",
        yField: averageLeadTime,
        style: {
          stroke: token.colorError,
          lineDash: [4, 4],
          lineWidth: 2,
        },
        label: {
          text: `${translate("diagrams.purchase_orders.label")}: ${averageLeadTime.toFixed(1)} ${translate("diagrams.purchase_orders.unit")}`,
          fontSize: 14,
          position: "right",
          style: {
            fill: token.colorText,
            textAlign: "end",
          },
        },
      }
    ] : [],
  };

  if (receiptsLoading || ordersLoading) {
    return (
      <Card style={{ textAlign: "center", padding: "50px" }}>
        <Spin />
      </Card>
    );
  }

  return (
    <Card title={translate("diagrams.purchase_orders.title")} type="inner">
      <div style={{ height: 400 }}>
        {chartData.length > 0 ? (
          <Column {...config} key={`chart-${chartData.length}`} />
        ) : (
          <div style={{ textAlign: "center", paddingTop: 100 }}>
            <Empty />
          </div>
        )}
      </div>
    </Card>
  );
};