import { ArrowLeftOutlined, DashboardOutlined, SettingOutlined } from "@ant-design/icons";
import { Show, DateField, RefreshButton, EditButton } from "@refinedev/antd";
import { useShow, useTranslation } from "@refinedev/core";
import { Typography, Descriptions, Rate, Space, Button, Table, Divider } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

export const CompanyDataShow = () => {

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { result: data } = useShow({
    resource: "company_data",
    id: ""
  });

  const record = data;

  useEffect(() => {
    document.title = `${translate("pages.company_data.show.title")} | NavetraERP`;
  })

  return (
      <Show
        goBack={null}
        title={translate("pages.company_data.show.title")}
        headerButtons={
          <Space>
            <RefreshButton
              size="large"  
            />
            <EditButton
              size="large"
              resource="company_data"
              id=""
              onClick={() => navigate("/company_data/edit")}
            />
            <Button
              onClick={() => navigate("/")}
              size="large"
              icon={<DashboardOutlined/>}
            >
              {translate("buttons.dashboard")}
            </Button>
          </Space>
        }
      >
          <Descriptions 
              title={translate("pages.company_data.titles.data")} 
              bordered 
              column={{ xs: 1, sm: 2, md: 3 }}
          >
              <Descriptions.Item label={translate("pages.company_data.titles.name")}>
                  <Text>{record?.name}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.company_data.titles.tax_number")}>
                  <Text>{record?.taxNumber}</Text>
              </Descriptions.Item>
              
              <Descriptions.Item label={translate("pages.company_data.titles.eu_tax_number")}>
                  <Text>{record?.euTaxNumber}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.company_data.titles.bank_account_number")}>
                  <Text>{record?.bankAccountNumber}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.company_data.titles.registration_number")}>
                  <Text>{record?.registrationNumber}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.company_data.titles.email")}>
                  <Text>{record?.email}</Text>
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.company_data.titles.phone_number")}>
                  <Text>{record?.phoneNumber}</Text>
              </Descriptions.Item>
          </Descriptions>

          <Divider/>

          <Descriptions 
              title={translate("pages.company_data.titles.billing_address_data")} 
              bordered 
              column={{ xs: 1, sm: 2, md: 3 }}
          >
            <Descriptions.Item label={translate("pages.company_data.titles.country")}>
                <Text>{record?.billingCountry}</Text>
            </Descriptions.Item>

            <Descriptions.Item label={translate("pages.company_data.titles.region")}>
                <Text>{record?.billingRegion}</Text>
            </Descriptions.Item>
            
            <Descriptions.Item label={translate("pages.company_data.titles.post_code")}>
                <Text>{record?.billingPostCode}</Text>
            </Descriptions.Item>

            <Descriptions.Item label={translate("pages.company_data.titles.city")}>
                <Text>{record?.billingCity}</Text>
            </Descriptions.Item>

            <Descriptions.Item label={translate("pages.company_data.titles.address_1")}>
                <Text>{record?.billingAddress1}</Text>
            </Descriptions.Item>

            <Descriptions.Item label={translate("pages.company_data.titles.address_2")}>
                <Text>{record?.billingAddress2}</Text>
            </Descriptions.Item>
          </Descriptions>

          <Divider/>

          <Descriptions 
              title={translate("pages.company_data.titles.shipping_address_data")} 
              bordered 
              column={{ xs: 1, sm: 2, md: 3 }}
          >
            <Descriptions.Item label={translate("pages.company_data.titles.country")}>
                <Text>{record?.shippingCountry}</Text>
            </Descriptions.Item>

            <Descriptions.Item label={translate("pages.company_data.titles.region")}>
                <Text>{record?.shippingRegion}</Text>
            </Descriptions.Item>
            
            <Descriptions.Item label={translate("pages.company_data.titles.post_code")}>
                <Text>{record?.shippingPostCode}</Text>
            </Descriptions.Item>

            <Descriptions.Item label={translate("pages.company_data.titles.city")}>
                <Text>{record?.shippingCity}</Text>
            </Descriptions.Item>

            <Descriptions.Item label={translate("pages.company_data.titles.address_1")}>
                <Text>{record?.shippingAddress1}</Text>
            </Descriptions.Item>

            <Descriptions.Item label={translate("pages.company_data.titles.address_2")}>
                <Text>{record?.shippingAddress2}</Text>
            </Descriptions.Item>
          </Descriptions>
      </Show>
  );
};