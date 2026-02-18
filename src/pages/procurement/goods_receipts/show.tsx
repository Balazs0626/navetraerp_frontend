import { ArrowLeftOutlined, PrinterOutlined } from "@ant-design/icons";
import { Show, DateField, RefreshButton } from "@refinedev/antd";
import { CanAccess, useShow, useTranslation } from "@refinedev/core";
import { Typography, Descriptions, Rate, Space, Button, Col, Row, Table } from "antd";
import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";
import { CustomErrorComponent } from "../../error";

const { Title, Text } = Typography;

export const GoodsReceiptShow = () => {

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { result: data } = useShow();
  const record = data;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
      document.title = `${translate("pages.goods_receipts.show.title")} | NavetraERP`;
    })

  const getPrintStyle = () => {
    return `
      @media print {
        * {
          color: black !important;
        }

        .ant-table,
        .ant-table-container,
        .ant-table-content {
          background: white !important;
        }

        .ant-table-tbody > tr > td {
          background: white !important;
          color: black !important;
          border: none !important;
          border-bottom: 1px solid black !important;
        }

        .ant-table-thead > tr > th {
          background: #f0f0f0 !important;
          color: black !important;
          border: none !important;
          border-bottom: 1px solid black !important;
        }

        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    `;
  };


  const columns = [
    {
      title: "Cikkszám",
      dataIndex: "productSku",
      key: "productSku"
    },
    {
      title: "Megnevezés",
      dataIndex: "productName",
      key: "productName"
    },
    {
      title: "Mennyiség",
      dataIndex: "quantityReceived",
      key: "quantityReceived"
    },
    {
      title: "Egység",
      dataIndex: "productUnit",
      key: "productUnit"
    },
    {
      title: "Tételszám",
      dataIndex: "batchNumber",
      key: "batchNumber"
    }
  ];

  return (
    <CanAccess 
      resource="goods_receipts" 
      action="show" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Show
        goBack={null}
        title={translate("pages.goods_receipts.show.title")}
        headerButtons={
          <Space>
            <Button type="primary" size="large" icon={<PrinterOutlined />} onClick={reactToPrintFn}>
              {translate("buttons.print")}
            </Button>
            <RefreshButton
              size="large"  
            />
            <Button
              onClick={() => navigate("/procurement/goods_receipts")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.goods_receipts.buttons.back")}
            </Button>
          </Space>
        }
      >
        <div 
          ref={contentRef}
        >
          <style>{getPrintStyle()}</style>
          <Col xs={24}>
            <Row gutter={16}>
              <Text style={{margin: 20}}>Bizonylat száma: {record?.receiptNumber}</Text>
              <Text style={{margin: 20}}>{dayjs(record?.receiptDate).format("YYYY. MM. DD.")}</Text>
              <Col xs={24}>
                <Title level={2} style={{textAlign: "center", padding: 50}}>Átvételi bizonylat</Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={3}></Col>
              <Col xs={6}>
                <Title level={4} style={{textAlign: "left"}}>Átvevő:</Title>
                <Text>{record?.receivedByName}</Text>
                <Title level={4} style={{textAlign: "left"}}>Rendelési bizonylat:</Title>
                <Text>{record?.purchaseOrderReceiptNumber}</Text>
              </Col>
              <Col xs={7}></Col>
              <Col xs={8}>
                <Title level={4} style={{textAlign: "left"}}>Raktár:</Title>
                <Row gutter={16}>
                  <Col xs={24} style={{textAlign: "left"}}>
                    <Title level={3}>{record?.warehouseName}</Title>
                    <Text>{record?.warehouseAddress_1}</Text>
                    <br></br>
                    <Text>{record?.warehouseAddress_2}</Text>
                  </Col>
                </Row>
              </Col>
            </Row>
            <br></br>
            <Table
              pagination={false}
              columns={columns}
              rowKey="id"
              dataSource={record?.items}
              style={{margin: 24, paddingTop: 48}}
            />
          </Col>
        </div>
      </Show>
    </CanAccess>
  )
}