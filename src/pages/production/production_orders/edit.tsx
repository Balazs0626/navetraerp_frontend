import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Edit, useForm } from "@refinedev/antd";
import { useList, useNotification, useTranslation } from "@refinedev/core";
import { Button, Card, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { SalesOrderSelect } from "../../../components/SalesOrderSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { useSalesOrderStatus } from "../../../constants/sales_orders";
import dayjs from "dayjs";
import { CustomerSelect } from "../../../components/CustomerSelect";
import { IProductList } from "../../../interfaces";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { WarehouseSelect } from "../../../components/WarehouseSelect";
import { EmployeeOneSelect } from "../../../components/EmployeeOneSelect";

export const ProductionOrderEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "production_orders",
      action: "edit",
      id,
  });

  useEffect(() => {
    document.title = translate("pages.production_orders.edit.title");
  })

  useEffect(() => {
    if (!form) return;

    const initialValues = formProps.initialValues;

    if (!initialValues) return;

  }, [formProps.initialValues])

  const handleFinish = (values: any) => {
    const formattedValues = {
        ...values,
        startDate: values.startDate?.format ? values.startDate.format("YYYY-MM-DD") : values.startDate,
        endDate: values.endDate?.format ? values.endDate.format("YYYY-MM-DD") : values.endDate,
        components: values.components?.map((item: any) => ({
          ...item,
          dateUsed: item.dateUsed?.format ? item.dateUsed.format("YYYY-MM-DD") : item.dateUsed
        }))
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  return (
    <Edit
      title={translate("pages.production_orders.edit.title")}
      saveButtonProps={saveButtonProps}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/production/production_orders")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.production_orders.buttons.back")}</Button>
        </Space>
      }
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Card 
          title={translate("pages.production_orders.titles.data")}
          type="inner"
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={translate("pages.production_orders.titles.product")}
                name="productId"
                rules={[{ required: true }]}
              >
                <ProductSelect/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={translate("pages.production_orders.titles.start_date")}
                name="startDate"
                rules={[{ required: true }]}
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : "",
                })}
              >
                <DatePicker
                  style={{width: '100%'}}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={translate("pages.production_orders.titles.end_date")}
                name="endDate"
                rules={[{ required: true }]}
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : "",
                })}
              >
                <DatePicker
                  style={{width: '100%'}}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={translate("pages.production_orders.titles.planned_quantity")}
                name="plannedQuantity"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} step={0.01} style={{width: "100%"}}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={translate("pages.production_orders.titles.status")}
                name="status"
                rules={[{ required: true }]}
              >
                <Select options={usePurchaseOrderStatus()}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={translate("pages.production_orders.titles.responsible_employee")}
                name="responsibleEmployeeId"
                rules={[{ required: true }]}
              >
                <EmployeeOneSelect/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card 
          title={translate("pages.production_orders.titles.components")}
          type="inner"
          style={{marginTop: 12}}
        >
          <Form.List name="components">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.production_orders.titles.component_product")}
                          name={[name, "componentProductId"]}
                          rules={[{ required: true }]}
                        >
                          <ProductSelect />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.production_orders.titles.quantity_used")}
                          name={[name, "quantityUsed"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={1} step={0.01} style={{width: "100%"}} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          label={translate("pages.production_orders.titles.warehouse")}
                          name={[name, "warehouseId"]}
                          rules={[{ required: true }]}
                        >
                          <WarehouseSelect />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label={translate("pages.production_orders.titles.date_used")}
                          name={[name, "dateUsed"]}
                          rules={[{ required: true }]}
                          getValueProps={(value) => ({
                            value: value ? dayjs(value) : "",
                          })}
                        >
                          <DatePicker
                            style={{width: '100%'}}
                            format="YYYY-MM-DD"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Button 
                          block 
                          icon={<DeleteOutlined/>} 
                          onClick={() => remove(name)} 
                          danger
                        >
                          {translate("buttons.delete")}
                        </Button>
                      </Col>
                      <Divider/>
                    </Row>
                  </>
                ))}
                
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    {translate("buttons.add_product")}
                  </Button>
                </Form.Item>
                </>
            )}
          </Form.List>

        </Card>
      </Form>
    </Edit>
  )
};