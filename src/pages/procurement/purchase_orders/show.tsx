import { ArrowLeftOutlined, PrinterOutlined } from "@ant-design/icons";
import { Show, DateField, RefreshButton } from "@refinedev/antd";
import { useShow, useTranslation } from "@refinedev/core";
import { Typography, Descriptions, Rate, Space, Button, Col, Row, Table } from "antd";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const { Title, Text } = Typography;

export const PurchaseOrderShow = () => {

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { result: data } = useShow();
  const record = data;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

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
      dataIndex: "quantityOrdered",
      key: "quantityOrdered",
      render: (text: any, data: any) => (
        <>
          {data?.quantityOrdered} db
        </>
      ),
    },
    {
      title: "Nettó",
      dataIndex: "nettoPrice",
      key: "nettoPrice",
      render: (text: any, data: any) => (
        <>
          {data?.nettoPrice} {record?.currency}
        </>
      ),
    },
    {
      title: "Áfa",
      dataIndex: "taxRate",
      key: "taxRate",
      render: (text: any, data: any) => (
        <>
          {data?.taxRate} %
        </>
      ),
    },
    {
      title: "Bruttó",
      dataIndex: "bruttoPrice",
      key: "bruttoPrice",
      render: (text: any, data: any) => (
        <>
          {data?.bruttoPrice} {record?.currency}
        </>
      ),
    },
    {
      title: "Kedvezmény",
      dataIndex: "discount",
      key: "discount",
      render: (text: any, data: any) => (
        <>
          {data?.discount} %
        </>
      ),
    },
  ];

  return (
      <Show
        goBack={null}
        title={translate("pages.purchase_orders.show.title")}
        headerButtons={
          <Space>
            <Button type="primary" size="large" icon={<PrinterOutlined />} onClick={reactToPrintFn}>
              {translate("pages.buttons.print")}
            </Button>
            <RefreshButton
              size="large"  
            />
            <Button
              onClick={() => navigate("/procurement/purchase_orders")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.purchase_orders.buttons.back")}
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
              <Text style={{margin: 20}}>Bizonylat száma: {record?.id}</Text>
              <Col xs={24}>
                <Title level={2} style={{textAlign: "center", padding: 50}}>Rendelési bizonylat</Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={3}></Col>
              <Col xs={6}>
                <Title level={4} style={{textAlign: "left"}}>Eladó:</Title>
                <Row gutter={16}>
                  <Col xs={24} style={{textAlign: "left"}}>
                    <Title level={3}>{record?.supplierName}</Title>
                    <Text>{record?.supplierAddressCountry}, {record?.supplierAddressRegion}</Text>
                    <br></br>
                    <Text>{record?.supplierAddressPostCode}, {record?.supplierAddressCity} {record?.supplierAddressFirstLine} {record?.supplierAddressSecondLine}</Text>
                    <br></br>
                    <Text><b>Adószám: </b>{record?.supplierTaxNumber}</Text>
                  </Col>
                </Row>
              </Col>
              <Col xs={7}></Col>
              <Col xs={8}>
                <Title level={4} style={{textAlign: "left"}}>Vevő:</Title>
                <Row gutter={16}>
                  <Col xs={24} style={{textAlign: "left"}}>
                    <Title level={3}>Saját Kft.</Title>
                    <Text>Magyarország, Vas</Text>
                    <br></br>
                    <Text>9600, Sárvár Fő utca 43.</Text>
                    <br></br>
                    <Text><b>Adószám: </b>123456789-11</Text>
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
  );
};