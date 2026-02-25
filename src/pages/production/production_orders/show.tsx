import { ArrowLeftOutlined, PrinterOutlined } from "@ant-design/icons";
import { Show, RefreshButton } from "@refinedev/antd";
import { CanAccess, useShow, useTranslation } from "@refinedev/core";
import { Typography, Descriptions, Rate, Space, Button, Col, Row, Table } from "antd";
import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";
import { CustomErrorComponent } from "../../error";

const { Title, Text } = Typography;

export const ProductionOrderShow = () => {

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { result: data } = useShow();
  const record = data;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    document.title = `${translate("pages.production_orders.show.title")} | NavetraERP`;
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
      title: "Termék",
      dataIndex: "componentProductName",
      key: "componentProductName"
    },
    {
      title: "Mennyiség",
      dataIndex: "quantityUsed",
      key: "quantityUsed"
    },
    {
      title: "Egység",
      dataIndex: "componentProductUnit",
      key: "componentProductUnit"
    },
    {
      title: "Raktár",
      dataIndex: "warehouseName",
      key: "warehouseName"
    },
    {
      title: "Felhasználás dátuma",
      dataIndex: "dateUsed",
      key: "dateUsed",
      render: (text: any) => (
        <>
          {dayjs(text).format("YYYY. MM. DD.")}
        </>
      ),
    }
  ];

  const machineColumns = [
    {
      title: "Gép neve",
      dataIndex: "machineName",
      key: "machineName"
    },
    {
      title: "Gép kódja",
      dataIndex: "machineCode",
      key: "machineCode"
    },
    {
      title: "Kezdés dátuma",
      dataIndex: "startDate",
      key: "startDate",
      render: (text: any) => (
        <>
          {dayjs(text).format("YYYY. MM. DD.")}
        </>
      ),
    },
    {
      title: "Befejezés dátuma",
      dataIndex: "endDate",
      key: "endDate",
      render: (text: any) => (
        <>
          {dayjs(text).format("YYYY. MM. DD.")}
        </>
      ),
    }
  ];

  return (
    <CanAccess 
      resource="production_orders" 
      action="show" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Show
        goBack={null}
        title={translate("pages.production_orders.show.title")}
        headerButtons={
          <Space>
            <Button type="primary" size="large" icon={<PrinterOutlined />} onClick={reactToPrintFn}>
              {translate("buttons.print")}
            </Button>
            <RefreshButton
              size="large"  
            />
            <Button
              onClick={() => navigate("/production/production_orders")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.production_orders.buttons.back")}
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
                <Title level={2} style={{textAlign: "center", padding: 50}}>Termelési rendelés</Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} style={{paddingLeft: 24}}>
                <Text style={{fontSize: "1.3em"}}><b>Bizonylatszám:</b> {record?.receiptNumber}</Text>
                <br/>
                <Text style={{fontSize: "1.3em"}}><b>Kezdés dátuma:</b> {dayjs(record?.startDate).format("YYYY. MM. DD.")}</Text>
                <br/>
                <Text style={{fontSize: "1.3em"}}><b>Befejezés dátuma:</b> {dayjs(record?.endDate).format("YYYY. MM. DD.")}</Text>
                <br/>
                <Text style={{fontSize: "1.3em"}}><b>Termék:</b> {record?.productName}</Text>
              </Col>
            </Row>
            <br></br>
            <Table
              pagination={false}
              columns={columns}
              rowKey="id"
              dataSource={record?.components}
              style={{margin: 24, paddingTop: 24}}
              title={() => (
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  Komponensek:
                </div>
              )}
            />
            <Table
              pagination={false}
              columns={machineColumns}
              rowKey="id"
              dataSource={record?.machines}
              style={{margin: 24, paddingTop: 24}}
              title={() => (
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  Gépek:
                </div>
              )}
            />
          </Col>
        </div>
      </Show>
    </CanAccess>
  );
};