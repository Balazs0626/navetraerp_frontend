import { ArrowLeftOutlined, PrinterOutlined } from "@ant-design/icons";
import { Show, DateField, RefreshButton } from "@refinedev/antd";
import { useCustom, useOne, useShow, useTranslation } from "@refinedev/core";
import { Typography, Descriptions, Rate, Space, Button, Col, Row, Table } from "antd";
import { useNavigate, useParams } from "react-router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const { Title, Text } = Typography;

export const ProductBomShow = () => {

  const navigate = useNavigate();
  const { translate } = useTranslation();
  const { id } = useParams();
  
  const { result, query } = useOne({
    resource: "products",
    id
  })

  const record = query.data;

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
        border-bottom: 1pt solid black !important;
      }

      .ant-table-thead > tr > th {
        background: #f0f0f0 !important;
        color: black !important;
        border: none !important;
        border-bottom: 1pt solid black !important;
      }

      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  `;
};


  const columns = [
    {
      title: "Cikkszám",
      dataIndex: "componentProductSku",
      key: "componentProductSku"
    },
    {
      title: "Megnevezés",
      dataIndex: "componentProductName",
      key: "productName"
    },
    {
      title: "Mennyiség",
      dataIndex: "quantityPerUnit",
      key: "quantityPerUnit",
    },
    {
      title: "Egység",
      dataIndex: "componentProductUnit",
      key: "componentProductUnit",
    },
    {
      title: "Egységenkénti ár",
      dataIndex: "componentProductPricePerUnit",
      key: "componentProductPricePerUnit",
      render: (text: any, data: any) => (
        <>
          {data.componentProductPricePerUnit} Ft
        </>
      ),
    },
    {
      title: "Ár",
      dataIndex: "componentProductAllPrice",
      key: "componentProductAllPrice",
      render: (text: any, data: any) => (
        <>
          {data.componentProductAllPrice} Ft
        </>
      ),
    },
  ];

  return (
      <Show
        goBack={null}
        title={translate("pages.products.bom")}
        headerButtons={
          <Space>
            <Button type="primary" size="large" icon={<PrinterOutlined />} onClick={reactToPrintFn}>
              {translate("buttons.print")}
            </Button>
            <RefreshButton
              size="large"  
            />
            <Button
              onClick={() => navigate("/products")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.products.buttons.back")}
            </Button>
          </Space>
        }
      >
        <div 
          ref={contentRef}
        >
          <style>{getPrintStyle()}</style>
            <Row gutter={16}>
              <Col xs={24}>
                <Title level={2} style={{textAlign: "center", padding: 50}}>Anyagjegyzék</Title>
              </Col>
            </Row>
            <Table
              pagination={false}
              columns={columns}
              rowKey="id"
              dataSource={record?.data.bomComponents}
              style={{marginLeft: 24, marginRight: 24}}
              title={() => (
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  {record?.data.name}
                </div>
              )}
            />
        </div>
      </Show>
  );
};