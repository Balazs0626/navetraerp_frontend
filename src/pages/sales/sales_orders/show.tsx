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

export const SalesOrderShow = () => {

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { result: data } = useShow();
  const record = data;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    document.title = `${translate("pages.sales_orders.show.title")} | NavetraERP`;
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
      title: "Rendelt mennyiség",
      dataIndex: "quantityOrdered",
      key: "quantityOrdered",
      render: (data: any) => (
        <>
          {data?.quantityOrdered} {data?.productUnit}
        </>
      ),
    },
    {
      title: "Szállított mennyiség",
      dataIndex: "quantityShipped",
      key: "quantityShipped",
      render: (data: any) => (
        <>
          {data?.quantityShipped} {data?.productUnit}
        </>
      ),
    },
    {
      title: "Egységár",
      dataIndex: "pricePerUnit",
      key: "pricePerUnit",
      render: (data: any) => (
        <>
          {data?.pricePerUnit} Ft
        </>
      ),
    },
    {
      title: "Kedvezmény",
      dataIndex: "discount",
      key: "discount",
      render: (data: any) => (
        <>
          {data?.discount} %
        </>
      ),
    },
    {
      title: "Összesen",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (data: any) => (
        <>
          {data?.totalPrice} Ft
        </>
      ),
    },
  ];

  return (
    <CanAccess 
      resource="sales_orders" 
      action="show" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Show
        goBack={null}
        title={translate("pages.sales_orders.show.title")}
        headerButtons={
          <Space>
            <Button type="primary" size="large" icon={<PrinterOutlined />} onClick={reactToPrintFn}>
              {translate("buttons.print")}
            </Button>
            <RefreshButton
              size="large"  
            />
            <Button
              onClick={() => navigate("/sales/sales_orders")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.sales_orders.buttons.back")}
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
              <Col xs={24}>
                <Title level={2} style={{textAlign: "center", padding: 50}}>Értékesítési rendelés</Title>
              </Col>
            </Row>
            <Row gutter={16}>

              <Col span={14} style={{paddingLeft: 24}}>
                
                <div style={{border: "1px solid black", padding: 10}}>
                  <Title level={4} style={{textAlign: "left"}}>Vevő:</Title>
                  <Row gutter={16} align="bottom">
                    <Col xs={12} style={{textAlign: "left"}}>
                      <Title level={3}>{record?.customerName}</Title>
                      <Text><b>Adószám: </b>{record?.customerTaxNumber}</Text>
                      <br/>
                      <Text><b>Közösségi adószám: </b>{record?.customerEuTaxNumber}</Text>
                      <br/>
                      <br/>
                      <Text><b>Számlázási cím:</b></Text>
                      <br/>
                      <Text>{record?.customerBillingAddress_1}</Text>
                      <br/>
                      <Text>{record?.customerBillingAddress_2}</Text>
                      <br/>
                      
                    </Col>
                    <Col span={10} style={{textAlign: "left"}}>
                      <Text><b>Szállítási cím:</b></Text>
                      <br/>
                      <Text>{record?.customerShippingAddress_1}</Text>
                      <br/>
                      <Text>{record?.customerShippingAddress_2}</Text>
                      <br/>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xs={10} style={{paddingRight: 24}}>
                <Text style={{fontSize: "1.3em"}}><b>Bizonylatszám:</b> {record?.receiptNumber}</Text>
                <br/>
                <Text style={{fontSize: "1.3em"}}><b>Rendelés dátuma:</b> {dayjs(record?.orderDate).format("YYYY. MM. DD.")}</Text>
                <br/>
                <Text style={{fontSize: "1.3em"}}><b>Szállítás dátuma:</b> {dayjs(record?.requiredDeliveryDate).format("YYYY. MM. DD.")}</Text>
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
            <Row gutter={16}>
              <Col xs={12} style={{textAlign: "left", padding: 24}}>
                <Text>A feltüntetett ár NETTÓ ÁR kedvezményekkel!</Text>
              </Col>
              <Col xs={12} style={{textAlign: "right", padding: 24}}>
                <Text style={{fontSize: "1.3em"}}><b>Összesen:</b> {record?.totalAmount} Ft</Text>
              </Col>
            </Row>
          </Col>
        </div>
      </Show>
    </CanAccess>
  );
};