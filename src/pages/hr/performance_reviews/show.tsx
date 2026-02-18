import { ArrowLeftOutlined } from "@ant-design/icons";
import { Show, DateField, RefreshButton } from "@refinedev/antd";
import { CanAccess, useShow, useTranslation } from "@refinedev/core";
import { Typography, Descriptions, Rate, Space, Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CustomErrorComponent } from "../../error";

const { Title, Text } = Typography;

export const PerformanceReviewShow = () => {

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { result: data } = useShow();
  const record = data;

  useEffect(() => {
    document.title = `${translate("pages.performance_reviews.show.title")} | NavetraERP`;
  })  

  return (
    <CanAccess 
      resource="performance_reviews" 
      action="show" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Show
        goBack={null}
        title={translate("pages.performance_reviews.show.title")}
        headerButtons={
          <Space>
            <RefreshButton
              size="large"  
            />
            <Button
              onClick={() => navigate("/hr/performance_reviews")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.performance_reviews.buttons.back")}
            </Button>
          </Space>
        }
      >
          <Descriptions 
              title={translate("pages.performance_reviews.titles.details")} 
              bordered 
              column={{ xs: 1, sm: 2, md: 3 }}
          >
              <Descriptions.Item label={translate("pages.performance_reviews.titles.employee")}>
                  <Text>{record?.employeeName}</Text>
              </Descriptions.Item>
            
              <Descriptions.Item label={translate("pages.performance_reviews.titles.date")}>
                  <DateField value={record?.reviewDate} format="YYYY. MM. DD." />
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.performance_reviews.titles.score")}>
                  <Rate value={record?.score} count={5} disabled />
              </Descriptions.Item>

              <Descriptions.Item label={translate("pages.performance_reviews.titles.comment")} span={3}>
                  <Text>{record?.comment}</Text>
              </Descriptions.Item>
              
          </Descriptions>
          
      </Show>
    </CanAccess>
  );
};