import { ArrowLeftOutlined } from "@ant-design/icons";
import { Show, DateField, RefreshButton } from "@refinedev/antd";
import { useShow, useTranslation } from "@refinedev/core";
import { Typography, Descriptions, Rate, Space, Button } from "antd";
import { useNavigate } from "react-router";
import { useProductActiveStatus } from "../../constants/products";

const { Title, Text } = Typography;

export const ProductShow = () => {

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { result: data } = useShow();
  const record = data;

  const productStatus = useProductActiveStatus().find(status => status.value === record?.active)?.label || "Ismeretlen";

  return (
      <Show
        goBack={null}
        title={translate("pages.products.show.title")}
        headerButtons={
          <Space>
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
          <Descriptions 
              title={translate("pages.products.titles.details")} 
              bordered 
              column={{ xs: 1, sm: 2, md: 3 }}
          >
              <Descriptions.Item label={translate("pages.products.titles.sku")}>
                  <Text>{record?.sku}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.products.titles.name")}>
                  <Text>{record?.name}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.products.titles.price_per_unit")}>
                  <Text>{record?.pricePerUnit} Ft/{record?.unit}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.products.titles.active")}>
                  <Text>{productStatus}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.products.titles.description")}>
                  <Text>{record?.description}</Text>
              </Descriptions.Item>
              
          </Descriptions>
          
      </Show>
  );
};