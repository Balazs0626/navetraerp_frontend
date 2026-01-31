import { ArrowLeftOutlined, PrinterOutlined } from "@ant-design/icons";
import { Show, DateField, RefreshButton } from "@refinedev/antd";
import { useShow, useTranslation } from "@refinedev/core";
import { Typography, Descriptions, Rate, Space, Button, Col, Row, Table, Divider } from "antd";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const { Title, Text } = Typography;

export const InvoiceShow = () => {

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
      title: "Megnevezés",
      dataIndex: "productName",
      key: "productName"
    },
    {
      title: "Mennyiség",
      dataIndex: "quantity",
      key: "quantity",
      render: (text: any, data: any) => (
        <>
          {String(data?.quantity).replace(".", ",")} {data?.productUnit}
        </>
      ),
    },
    {
      title: "Áfa(%)",
      dataIndex: "taxRate",
      key: "taxRate",
      render: (text: any, data: any) => (
        <>
          {data?.taxRate} %
        </>
      ),
    },
    {
      title: "Nettó",
      dataIndex: "netPrice",
      key: "netPrice",
      render: (text: any, data: any) => (
        <>
          {data?.netPrice} Ft
        </>
      ),
    },
    {
      title: "Áfa",
      dataIndex: "tax",
      key: "tax",
      render: (text: any, data: any) => (
        <>
          {data?.tax} Ft
        </>
      ),
    },
    {
      title: "Bruttó",
      dataIndex: "grossPrice",
      key: "grossPrice",
      render: (text: any, data: any) => (
        <>
          {data?.grossPrice} Ft
        </>
      ),
    },
  ];


  return (
      <Show
        goBack={null}
        title={translate("pages.invoices.show.title")}
        headerButtons={
          <Space>
            <Button type="primary" size="large" icon={<PrinterOutlined />} onClick={reactToPrintFn}>
              {translate("buttons.print")}
            </Button>
            <RefreshButton
              size="large"  
            />
            <Button
              onClick={() => navigate("/sales/invoices")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.invoices.buttons.back")}
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
                <Title level={2} style={{textAlign: "center", padding: 50}}>Számla</Title>
              </Col>
            </Row>
            <Row gutter={16} align="middle" style={{padding: 24, margin: 24, borderTop: "1px solid black", borderBottom: "1px solid black"}}>
              {/* <Col xs={3}></Col> */}
              <Col xs={12} style={{borderRight: "1px solid black"}}>
                <div style={{width: "fit-content", margin: "0 auto", textAlign: "left"}}>
                  <Title level={4} style={{textAlign: "left"}}>Eladó:</Title>
                  <Row gutter={16}>
                    <Col xs={24} style={{textAlign: "left"}}>
                      <Title level={3}>{record?.sellerName}</Title>
                      <Text>{record?.sellerAddress_1}</Text>
                      <br></br>
                      <Text>{record?.sellerAddress_2}</Text>
                      <br></br>
                      <Text><b>Adószám: </b>{record?.sellerTaxNumber}</Text>
                    </Col>
                  </Row>
                </div>
              </Col>
              {/* <Col xs={7}></Col> */}
              <Col xs={12}>
                <div style={{width: "fit-content", margin: "0 auto", textAlign: "left"}}>
                  <Title level={4} style={{textAlign: "left"}}>Vevő:</Title>
                  <Row gutter={16}>
                    <Col xs={24} style={{textAlign: "left"}}>
                      <Title level={3}>{record?.customerName}</Title>
                      <Text>{record?.customerAddress_1}</Text>
                      <br></br>
                      <Text>{record?.customerAddress_2}</Text>
                      <br></br>
                      <Text><b>Adószám: </b>{record?.customerTaxNumber}</Text>
                    </Col>
                  </Row>
                </div>
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
            <Row gutter={16} style={{margin: 24, paddingBottom: 24, borderBottom: "1px solid black"}}>
              <Col xs={6}>
                <Title level={5}>Áfa összesítő</Title>
                <Text>{record?.totalTaxRate}%-os áfa</Text>
              </Col>
              <Col xs={6}>
                <Title level={5}>Nettó</Title>
                <Text>{record?.totalAmount} Ft</Text>
              </Col>
              <Col xs={6}>
                <Title level={5}>Áfa</Title>
                <Text>{record?.totalTax} Ft</Text>
              </Col>
              <Col xs={6}>
                <Title level={5}>Bruttó</Title>
                <Text>{record?.paidAmount} Ft</Text>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} style={{textAlign: "right", padding: 24}}>
                <Text style={{fontSize: "1.3em"}}><b>Fizetendő végösszeg:</b> {record?.paidAmount} Ft</Text>
                <br></br>
                <Text style={{fontSize: "1.15em"}}>azaz, {record?.paidAmountText} forint</Text>
              </Col>
            </Row>
          </Col>
        </div>
      </Show>
  );
};