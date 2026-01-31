import { ArrowLeftOutlined, DeleteOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { WarehouseSelect } from "../../../components/WarehouseSelect";
import { EmployeeOneSelect } from "../../../components/EmployeeOneSelect";
import { useStockMovementType } from "../../../constants/stock_movements";

export const StockMovementCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "stock_movements",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = translate("pages.stock_movements.create.title");
  })

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate("pages.stock_movements.create.title")}
      goBack={null}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/inventory/stock_movements")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.stock_movements.buttons.back")}</Button>
        </Space>
      }
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
      >
        <Card 
          title={translate("pages.stock_movements.titles.data")}
          type="inner"
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={translate("pages.stock_movements.titles.product")}
                name="productId"
                rules={[{ required: true }]}
              >
                <ProductSelect/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.stock_movements.titles.from_warehouse")}
                name="fromWarehouseId"
              >
                <WarehouseSelect/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.stock_movements.titles.to_warehouse")}
                name="toWarehouseId"
              >
                <WarehouseSelect/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.stock_movements.titles.quantity")}
                name="quantity"
                rules={[{ required: true }]}
              >
                <InputNumber min={0.01} step={0.01} style={{ width: "100%" }} placeholder={translate("inputs.stock_movements.placeholder.quantity")}/>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label={translate("pages.stock_movements.titles.reference_document")}
                name="referenceDocument"
              >
                <Input style={{ width: "100%" }} placeholder={translate("inputs.stock_movements.placeholder.reference_document")}/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.stock_movements.titles.performed_by")}
                name="performedById"
                rules={[{ required: true }]}
              >
                <EmployeeOneSelect/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.stock_movements.titles.movement_date")}
                name="movementDate"
                rules={[{ required: true }]}
              >
                <DatePicker
									style={{width: '100%'}}
                  format="YYYY-MM-DD"
								/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={translate("pages.stock_movements.titles.movement_type")}
                name="movementType"
                rules={[{ required: true }]}
              >
                <Select options={useStockMovementType()}/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Create>
  )

}