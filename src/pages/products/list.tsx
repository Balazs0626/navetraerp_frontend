import { useTable, List, DeleteButton, EditButton, ExportButton, ShowButton } from "@refinedev/antd";
import { IProductCreate, IProductList } from "../../interfaces";
import { Form, Button, Card, Col, Row, Space, Table, Input, DatePicker, Select } from "antd";
import { CalendarOutlined, CheckCircleOutlined, CloseCircleOutlined, ImportOutlined, PlusOutlined, ProductOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation, usePermissions, useImport, useExport, useNavigation, useGo } from "@refinedev/core";
import { useEffect } from "react";
import dayjs from 'dayjs';
import { useProductActiveStatus } from "../../constants/products";


export const ProductList = () => {

  const { tableProps, setFilters } = useTable<IProductList>({
    resource: "products",
    pagination: {
      pageSize: 10,
    },
    filters: {
      permanent: [],
      initial: [],
    },
  });

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = translate("pages.products.list.title");
  })

  const [form] = Form.useForm();

  const onSearch = (values: any) => {
    const filters = [];

    if (values.sku) {
      filters.push({
        field: "sku",
        operator: "contains" as const,
        value: values.sku,
      });
    }

    if (values.name) {
      
      filters.push({
        field: "name",
        operator: "contains" as const,
        value: values.name,
      });
    }

    if (values.active != null) {
      
      filters.push({
        field: "active",
        operator: "eq" as const,
        value: values.active,
      });
    }

    setFilters(filters);
  };

  const { triggerExport, isLoading: exportLoading } = useExport<IProductList>({resource: "products"});

  const { inputProps } = useImport<IProductCreate>({
    resource: "products",
    paparseOptions: {
      header: false
    },
    mapData: (item) => {
      return {
        sku: item.sku,
        name: item.name,
        unit: item.unit,
        pricePerUnit: Number(item.pricePerUnit),
        active: item.active === "true",
        description: item.description,
        createdAt: dayjs(Date.now()).format("YYYY-MM-DD")
      }
    }
  })

  return (
    <List
      title={translate("pages.products.list.title")}
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("create")} disabled={!permissions?.includes("CREATE:PRODUCTS")}>
                {translate("pages.products.buttons.create")}
            </Button>
            <ExportButton onClick={triggerExport} loading={exportLoading} size="large">Export</ExportButton>
            <Input 
              {...inputProps}
              prefix={<><ImportOutlined/><div>Import:</div></>}
              size="large"
            />
          </Space>
      }
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card
            title={translate("titles.search")}
            type="inner"
          >
            <Form form={form} layout="vertical" onFinish={onSearch}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="sku"
                    label={translate("pages.products.titles.sku")}
                  >
                    <Input placeholder="Cikkszám..." allowClear />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label={translate("pages.products.titles.name")}
                  >
                    <Input placeholder="Termék neve..." allowClear />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="active"
                    label={translate("pages.products.titles.active")}
                  >
                    <Select
                      placeholder={translate("selects.leave_requests.placeholder_status")}
                      options={useProductActiveStatus()}
                    /> 
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Form.Item>
                  <Space>
                    <Button 
                      type="primary" 
                      htmlType="submit"
                    >
                      {translate("buttons.search")}
                    </Button>
                    <Button
                      onClick={() => {
                        form.resetFields();
                        setFilters([], "replace");
                      }}
                    >
                      {translate("buttons.clear")}
                    </Button>
                  </Space>
                </Form.Item>
              </Row>
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={16}>
          <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex={"sku"} title={translate("pages.products.titles.sku")}/>
            <Table.Column dataIndex={"name"} title={translate("pages.products.titles.name")}/>
            <Table.Column 
              dataIndex="active"
              title={translate("pages.products.titles.active")}
              align="center"
              render={(value: boolean) => (
                <Space>
                  {value ? (
                      <CheckCircleOutlined 
                          style={{ color: '#52C41A', fontSize: 18 }} 
                      />
                  ) : (
                      <CloseCircleOutlined 
                          style={{ color: '#FF4D4F', fontSize: 18 }} 
                      />
                  )}
                </Space>
              )}
            />
            <Table.Column<IProductList>
              title={translate("pages.products.list.actions")}
              dataIndex="actions"
              key="actions"
              render={(_, record) => (
                <Space>
                  <ShowButton
                    size="small"
                    recordItemId={record.id}
                    resource="products"
                  />
                  <Button
                    size="small"
                    resource="products"
                    onClick={() => navigate(`bom/${record.id}`)}
                    icon={<ProductOutlined/>}
                    disabled={record.componentCount === 0}
                  >
                    Anyagjegyzék
                  </Button>
                  <EditButton
                    size="small"
                    recordItemId={record.id}
                    resource="products"
                    onClick={() => navigate(`edit/${record.id}`)}
                    disabled={!permissions?.includes("EDIT:PRODUCTS")}
                  />
                  <DeleteButton
                    size="small"
                    recordItemId={record.id}
                    resource="products"
                    confirmTitle={translate("notifications.deleteMessage")}
                    disabled={!permissions?.includes("DELETE:PRODUCTS")}
                  />
                </Space>
              )}
            />
          </Table>
        </Col>
      </Row>
    </List>
  )
};