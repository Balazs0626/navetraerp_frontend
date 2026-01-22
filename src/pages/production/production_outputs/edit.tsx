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
import { ProductionOrderSelect } from "../../../components/ProductionOrderSelect";

export const ProductionOutputEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "production_outputs",
      action: "edit",
      id,
  });

  useEffect(() => {
    document.title = translate("pages.production_outputs.edit.title");
  })

  useEffect(() => {
    if (!form) return;

    const initialValues = formProps.initialValues;

    if (!initialValues) return;

  }, [formProps.initialValues])

  const handleFinish = (values: any) => {
    const formattedValues = {
        ...values,
        dateProduced: values.dateProduced?.format("YYYY-MM-DD"),
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  return (
    <Edit
      title={translate("pages.production_outputs.edit.title")}
      saveButtonProps={saveButtonProps}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/production/production_outputs")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.production_outputs.buttons.back")}</Button>
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
          title={translate("pages.production_outputs.titles.data")}
          type="inner"
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={translate("pages.production_outputs.titles.production_order")}
                name="productionOrderId"
                rules={[{ required: true }]}
              >
                <ProductionOrderSelect/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={translate("pages.production_outputs.titles.product")}
                name="productId"
                rules={[{ required: true }]}
              >
                <ProductSelect/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={translate("pages.production_outputs.titles.quantity_produced")}
                name="quantityProduced"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} step={0.01} style={{width: "100%"}} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={translate("pages.production_outputs.titles.warehouse")}
                name="warehouseId"
                rules={[{ required: true }]}
              >
                <WarehouseSelect/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={translate("pages.production_outputs.titles.date_produced")}
                name="dateProduced"
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
        </Card>
      </Form>
    </Edit>
  )
};