import { ArrowLeftOutlined, PrinterOutlined } from "@ant-design/icons";
import { Show, DateField, RefreshButton } from "@refinedev/antd";
import { CanAccess, useShow, useTranslation } from "@refinedev/core";
import { Typography, Descriptions, Rate, Space, Button, Col, Row, Table, Divider } from "antd";
import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { CustomErrorComponent } from "../../error";

const { Title, Text } = Typography;

export const DeliveryNoteShow = () => {

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { result: data } = useShow();
  const record = data;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  console.log(record);

  useEffect(() => {
    document.title = `${translate("pages.delivery_notes.show.title")} | NavetraERP`;
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
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Egység",
      dataIndex: "productUnit",
      key: "productUnit",
    },
  ];


  return (
    <CanAccess 
      resource="delivery_notes" 
      action="show" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Show
        goBack={null}
        title={translate("pages.delivery_notes.show.title")}
        headerButtons={
          <Space>
            <Button type="primary" size="large" icon={<PrinterOutlined />} onClick={reactToPrintFn}>
              {translate("buttons.print")}
            </Button>
            <RefreshButton size="large" />
            <Button onClick={() => navigate("/inventory/delivery_notes")} size="large">
              <ArrowLeftOutlined/>{translate("pages.delivery_notes.buttons.back")}
            </Button>
          </Space>
        }
      >
        <div ref={contentRef} style={{ padding: "20px" }}>
          <style>{getPrintStyle()}</style>
          
          <Row justify="space-between" style={{ marginBottom: 20 }}>
            <Col>
              <Text strong style={{ fontSize: "16px" }}>Bizonylat száma: {record?.receiptNumber}</Text>
            </Col>
            <Col style={{ textAlign: "right" }}>
              <Text>Kelt: <b>{record?.createDate ? new Date(record.createDate).toLocaleDateString("hu-HU") : "-"}</b></Text><br />
              <Text>Szállítás dátuma: <b>{record?.shippingDate ? new Date(record.shippingDate).toLocaleDateString("hu-HU") : "-"}</b></Text>
            </Col>
          </Row>

          <Title level={2} style={{ textAlign: "center", margin: "30px 0", textTransform: "uppercase", letterSpacing: "2px" }}>Szállítólevél</Title>

          {/* Partner adatok dobozban */}
          <Row gutter={0} style={{ border: "1px solid black", marginBottom: 20 }}>
            <Col span={12} style={{ padding: 15, borderRight: "1px solid black" }}>
              <Text type="secondary" strong>SZÁLLÍTÓ</Text>
              <Title level={4} style={{ marginTop: 5 }}>{record?.shipperName}</Title>
              <Text>{record?.shipperAddress_1}</Text><br />
              <Text>{record?.shipperAddress_2}</Text><br />
              <Text><b>Adószám:</b> {record?.shipperTaxNumber}</Text><br />
              <Text><b>EU adószám:</b> {record?.shipperEuTaxNumber}</Text>
            </Col>
            <Col span={12} style={{ padding: 15 }}>
              <Text type="secondary" strong>VEVŐ</Text>
              <Title level={4} style={{ marginTop: 5 }}>{record?.customerName}</Title>
              <Text>{record?.customerAddress_1}</Text><br />
              <Text>{record?.customerAddress_2}</Text><br />
              <Text><b>Adószám:</b> {record?.customerTaxNumber}</Text><br />
              <Text><b>EU adószám:</b> {record?.customerEuTaxNumber}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: 20, padding: "0 10px" }}>
            <Col span={24}>
              <Text>Szállító jármű rendszáma: <b>{record?.licensePlate || "-"}</b></Text>
            </Col>
          </Row>

          <Table
            pagination={false}
            columns={columns}
            rowKey="id"
            dataSource={record?.items}
            style={{margin: 24, paddingTop: 48}}
          />

          <Row justify="space-between" style={{ marginTop: 100, padding: "0 40px" }}>
            <Col span={9} style={{ textAlign: "center" }}>
              <div style={{ borderTop: "1px solid black", paddingTop: 5 }}>
                <Text strong>Kiadta (Szállító)</Text>
              </div>
            </Col>
            <Col span={9} style={{ textAlign: "center" }}>
              <div style={{ borderTop: "1px solid black", paddingTop: 5 }}>
                <Text strong>Átvette (Vevő)</Text>
              </div>
            </Col>
          </Row>
        </div>
      </Show>
    </CanAccess>
  );
};