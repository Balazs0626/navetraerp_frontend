import { ArrowLeftOutlined } from "@ant-design/icons";
import { Edit, useForm } from "@refinedev/antd";
import { CanAccess, useList, useNotification, useTranslation } from "@refinedev/core";
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useStockMovementType } from "../../../constants/stock_movements";
import { EmployeeOneSelect } from "../../../components/EmployeeOneSelect";
import { WarehouseSelect } from "../../../components/WarehouseSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import dayjs from "dayjs";
import { IProductList } from "../../../interfaces";
import { CustomErrorComponent } from "../../error";

export const StockMovementEdit = () => {
  const { id } = useParams();

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { formProps, form, saveButtonProps } = useForm({
      resource: "stock_movements",
      action: "edit",
      id,
  });

  useEffect(() => {
    document.title = `${translate("pages.stock_movements.edit.title")} | NavetraERP`;
  })

  const { result: productsData } = useList<IProductList>({
    resource: "products",
    pagination: { mode: "off" },
  });
  
  const products = productsData?.data ?? [];

  const getUnitByProductId = (productId?: number) => {
    return products.find(p => p.id === productId)?.unit ?? "";
  };

  useEffect(() => {
      if (!form) return;

      const initialValues = formProps.initialValues;

      if (!initialValues) return;

  }, [formProps.initialValues])

  return (
    <CanAccess 
      resource="stock_movements" 
      action="edit" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Edit
        title={translate("pages.stock_movements.edit.title")}
        goBack={null}
        saveButtonProps={saveButtonProps}
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
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
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
                  shouldUpdate={(prev, curr) => prev.productId !== curr.productId}
                  noStyle
                >
                  {() => {
                    const productId = form.getFieldValue("productId");
                    const unit = getUnitByProductId(productId) || "";

                    return (
                      <Form.Item
                        label={translate("pages.stock_movements.titles.quantity")}
                        name="quantity"
                        rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                      >
                        <InputNumber
                          placeholder={`${translate("pages.stock_movements.titles.quantity")}...`}
                          min={0.01}
                          step={0.01}
                          style={{ width: "100%" }}
                          addonAfter={unit}
                        />
                      </Form.Item>
                    );
                  }}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.stock_movements.titles.reference_document")}
                  name="referenceDocument"
                >
                  <Input style={{ width: "100%" }} placeholder={`${translate("pages.stock_movements.titles.reference_document")}...`}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.stock_movements.titles.performed_by")}
                  name="performedById"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <EmployeeOneSelect/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={translate("pages.stock_movements.titles.movement_date")}
                  name="movementDate"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
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
              <Col span={6}>
                <Form.Item
                  label={translate("pages.stock_movements.titles.movement_type")}
                  name="movementType"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <Select options={useStockMovementType()}/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Edit>
    </CanAccess>
  )
}