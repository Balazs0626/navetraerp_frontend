import { ArrowLeftOutlined, DeleteOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, NumberField, useForm } from "@refinedev/antd";
import { CanAccess, useApiUrl, useList, useNotification, useTranslation } from "@refinedev/core";
import { Button, Space, Form, Card, Col, Row, Input, DatePicker, InputNumber, Divider, Typography, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SupplierSelect } from "../../../components/SupplierSelect";
import { ProductSelect } from "../../../components/ProductSelect";
import { usePurchaseOrderStatus } from "../../../constants/purchase_orders";
import { WarehouseSelect } from "../../../components/WarehouseSelect";
import { EmployeeOneSelect } from "../../../components/EmployeeOneSelect";
import { useStockMovementType } from "../../../constants/stock_movements";
import { IProductList } from "../../../interfaces";
import { CustomErrorComponent } from "../../error";

export const InventoryCountCreate = () => {

  const { form, formProps, saveButtonProps } = useForm({
    resource: "inventory_counts",
    redirect: false
  });

  const { Title } = Typography;

  const { translate } = useTranslation();
  const navigate = useNavigate();
  const apiUrl = useApiUrl();

  useEffect(() => {
    document.title = `${translate("pages.inventory_counts.create.title")} | NavetraERP`;
  }) 

  const warehouse = Form.useWatch("warehouseId", form);

  const handleFinish = (values: any) => {
    const formattedValues = {
        ...values,
        countDate: values.countDate?.format("YYYY-MM-DD")
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  const { result: productsData } = useList<IProductList>({
    resource: "products",
    pagination: { mode: "off" },
  });
  
  const products = productsData?.data ?? [];

  const getUnitByProductId = (productId?: number) => {
    return products.find(p => p.id === productId)?.unit ?? "";
  };

  const handleValuesChange = async (changedValues: any, allValues: any) => {
    if (changedValues.items) {
      const items = changedValues.items;
      
      items.forEach(async (changedItem: any, index: number) => {
        if (changedItem?.productId) {
          const warehouseId = allValues.warehouseId; 

          if (!warehouseId) return;

          try {
            const query = new URLSearchParams({
                productId: changedItem.productId,
                warehouseId: warehouseId,
            }).toString();

            const response = await fetch(`${apiUrl}/inventory_items?${query}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}` // Ha kell token
                }
            });
            
            const result = await response.json();

            const data = result.data || result; 
            
            const currentStock = (data && data.length > 0) ? data[0].quantityOnHand : 0;

            const currentItems = form.getFieldValue("items");
            if (currentItems[index]) {
              currentItems[index].systemQuantity = currentStock;
              form.setFieldsValue({ items: currentItems });
            }

          } catch (error) {
            console.error("Hiba a készlet lekérésekor:", error);
          }
        }
      });
    }
  };

  return (
    <CanAccess 
      resource="inventory_counts" 
      action="create" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Create
        saveButtonProps={saveButtonProps}
        title={translate("pages.inventory_counts.create.title")}
        goBack={null}
        headerButtons={
          <Space>
            <Button
              onClick={() => navigate("/inventory/inventory_counts")}
              size="large"
            ><ArrowLeftOutlined/>{translate("pages.inventory_counts.buttons.back")}</Button>
          </Space>
        }
      >
        <Form
          {...formProps}
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          onValuesChange={handleValuesChange}
        >
          <Card 
            title={translate("pages.inventory_counts.titles.data")}
            type="inner"
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.inventory_counts.titles.warehouse")}
                  name="warehouseId"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <WarehouseSelect/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.inventory_counts.titles.count_date")}
                  name="countDate"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <DatePicker
                    style={{width: '100%'}}
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={translate("pages.inventory_counts.titles.counted_by")}
                  name="countedById"
                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                >
                  <EmployeeOneSelect/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Divider/>
          <Card 
            title={translate("pages.inventory_counts.titles.products")}
            type="inner"
            style={{marginTop: 12}}
          >
            <Form.List name="items">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <>
                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            label={translate("pages.inventory_counts.titles.product")}
                            name={[name, "productId"]}
                            rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                          >
                            <ProductSelect />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            shouldUpdate={(prev, curr) =>
                              prev?.items?.[name]?.productId !== curr?.items?.[name]?.productId
                            }
                            noStyle
                          >
                            {() => {
                              const productId = form.getFieldValue(["items", name, "productId"]);
                              const unit = getUnitByProductId(productId) || "";

                              return (
                                <Form.Item
                                  {...restField}
                                  label={translate("pages.inventory_counts.titles.counted_quantity")}
                                  name={[name, "countedQuantity"]}
                                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                                >
                                  <InputNumber
                                    placeholder={`${translate("pages.inventory_counts.titles.counted_quantity")}...`}
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
                        <Col span={8}>
                          <Form.Item
                            shouldUpdate={(prev, curr) =>
                              prev?.items?.[name]?.productId !== curr?.items?.[name]?.productId || prev?.items?.[name]?.systemQuantity !== curr?.items?.[name]?.systemQuantity
                            }
                            noStyle
                          >
                            {() => {
                              const productId = form.getFieldValue(["items", name, "productId"]);
                              const unit = getUnitByProductId(productId) || "";

                              return (
                                <Form.Item
                                  {...restField}
                                  label={translate("pages.inventory_counts.titles.system_quantity")}
                                  name={[name, "systemQuantity"]}
                                  rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                                >
                                  <InputNumber
                                    placeholder={`${translate("pages.inventory_counts.titles.system_quantity")}...`}
                                    min={0.01}
                                    step={0.01}
                                    style={{ width: "100%" }}
                                    addonAfter={unit}
                                    disabled
                                  />
                                </Form.Item>
                              );
                            }}
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
                      disabled={!warehouse}
                    >
                      {translate("buttons.add_product")}
                    </Button>
                  </Form.Item>
                  </>
              )}
            </Form.List>
          </Card>
        </Form>
      </Create>
    </CanAccess>
  )

}

{/* /* import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { useTranslation, useList, useApiUrl } from "@refinedev/core"; // useApiUrl importálása
import { Button, Space, Form, Card, Col, Row, DatePicker, InputNumber, Divider } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ProductSelect } from "../../../components/ProductSelect";
import { WarehouseSelect } from "../../../components/WarehouseSelect";
import { EmployeeOneSelect } from "../../../components/EmployeeOneSelect";
import { IProductList } from "../../../interfaces";

export const InventoryCountCreate = () => {
  const { form, formProps, saveButtonProps } = useForm({
    resource: "inventory_counts",
    redirect: false
  });

  const { translate } = useTranslation();
  const navigate = useNavigate();
  const apiUrl = useApiUrl(); // API URL lekérése

  const warehouse = Form.useWatch("warehouseId", form);

  useEffect(() => {
    document.title = translate("pages.inventory_counts.create.title");
  });

  const { result: productsData } = useList<IProductList>({
    resource: "products",
    pagination: { mode: "off" },
  });
  
  const products = productsData?.data ?? [];

  const getUnitByProductId = (productId?: number) => {
    return products.find(p => p.id === productId)?.unit ?? "";
  };

  // --- MÓDOSÍTOTT KÉSZLET LEKÉRDEZÉS LOGIKA (FETCH) ---
  const handleValuesChange = async (changedValues: any, allValues: any) => {
    if (changedValues.items) {
      const items = changedValues.items;
      
      items.forEach(async (changedItem: any, index: number) => {
        // Ha változott a termék ID
        if (changedItem?.productId) {
          const warehouseId = allValues.warehouseId; 

          if (!warehouseId) return;

          try {
            // Összeállítjuk a query stringet a szűréshez.
            // A Refine backendek általában támogatják a query parametereket.
            // Ellenőrizd, hogy a te backend API-d pontosan milyen szintaxist vár!
            // Ez egy általános REST példa: ?product_id=X&warehouse_id=Y
            const query = new URLSearchParams({
                productId: changedItem.productId,
                warehouseId: warehouseId,
            }).toString();

            // Sima fetch hívás az inventory_items végpontra
            const response = await fetch(`${apiUrl}/inventory_items?${query}`, {
                headers: {
                    // Ha szükséges token, azt a dataProvider általában kezeli, 
                    // de nyers fetch-nél, ha van auth, lehet, hogy be kell állítani.
                    // Ha a böngésző cookie-t használ, akkor ez nem kell.
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${localStorage.getItem("token")}` // Ha kell token
                }
            });
            
            const result = await response.json();

            // A Refine API válasz általában { data: [...] } szerkezetű
            // Ha a te backend-ed máshogy adja vissza, itt kell módosítani.
            const data = result.data || result; 
            
            // Kivesszük az első találatot (ha van)
            const currentStock = (data && data.length > 0) ? data[0].quantityOnHand : 0;

            // Form frissítése
            const currentItems = form.getFieldValue("items");
            if (currentItems[index]) {
              currentItems[index].systemQuantity = currentStock;
              form.setFieldsValue({ items: currentItems });
            }

          } catch (error) {
            console.error("Hiba a készlet lekérésekor:", error);
          }
        }
      });
    }
  };
  // -----------------------------------------------------

  const handleFinish = (values: any) => {
    const formattedValues = {
        ...values,
        countDate: values.countDate?.format("YYYY-MM-DD")
    };

    if (formProps.onFinish) {
        formProps.onFinish(formattedValues);
    }
  };

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title={translate("pages.inventory_counts.create.title")}
      goBack={null}
      headerButtons={
        <Space>
          <Button
            onClick={() => navigate("/inventory/inventory_counts")}
            size="large"
          ><ArrowLeftOutlined/>{translate("pages.inventory_counts.buttons.back")}</Button>
        </Space>
      }
    >
      <Form
        {...formProps}
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onValuesChange={handleValuesChange}
      >
        <Card 
          title={translate("pages.inventory_counts.titles.data")}
          type="inner"
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={translate("pages.inventory_counts.titles.warehouse")}
                name="warehouseId" // FONTOS: warehouseId a neve
                rules={[{ required: true, message: translate("messages.errors.required_field") }]}
              >
                <WarehouseSelect/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={translate("pages.inventory_counts.titles.count_date")}
                name="countDate"
                rules={[{ required: true, message: translate("messages.errors.required_field") }]}
              >
                <DatePicker
                  style={{width: '100%'}}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={translate("pages.inventory_counts.titles.counted_by")}
                name="countedById"
                rules={[{ required: true, message: translate("messages.errors.required_field") }]}
              >
                <EmployeeOneSelect/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card 
          title={translate("pages.inventory_counts.titles.products")}
          type="inner"
          style={{marginTop: 12}}
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={16} key={key}>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        label={translate("pages.inventory_counts.titles.product")}
                        name={[name, "productId"]}
                        rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                      >
                        <ProductSelect />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        shouldUpdate={(prev, curr) =>
                          prev?.items?.[name]?.productId !== curr?.items?.[name]?.productId
                        }
                        noStyle
                      >
                        {() => {
                          const productId = form.getFieldValue(["items", name, "productId"]);
                          const unit = getUnitByProductId(productId) || "";

                          return (
                            <Form.Item
                              {...restField}
                              label={translate("pages.inventory_counts.titles.counted_quantity")}
                              name={[name, "countedQuantity"]}
                              rules={[{ required: true, message: translate("messages.errors.required_field") }]}
                            >
                              <InputNumber
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
                    <Col span={8}>
                      <Form.Item
                        shouldUpdate={(prev, curr) =>
                          prev?.items?.[name]?.productId !== curr?.items?.[name]?.productId ||
                          prev?.items?.[name]?.systemQuantity !== curr?.items?.[name]?.systemQuantity
                        }
                        noStyle
                      >
                        {() => {
                          const productId = form.getFieldValue(["items", name, "productId"]);
                          const unit = getUnitByProductId(productId) || "";

                          return (
                            <Form.Item
                              {...restField}
                              label={translate("pages.inventory_counts.titles.system_quantity")}
                              name={[name, "systemQuantity"]}
                            >
                              <InputNumber
                                style={{ width: "100%" }}
                                addonAfter={unit}
                                disabled
                                placeholder="Auto..."
                              />
                            </Form.Item>
                          );
                        }}
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Divider style={{margin: "12px 0"}} />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    disabled={!warehouse}
                  >
                    {translate("buttons.add_product")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>
      </Form>
    </Create>
  )
}  */}