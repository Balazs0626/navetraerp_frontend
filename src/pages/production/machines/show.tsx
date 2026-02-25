import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import { RefreshButton, Show } from "@refinedev/antd";
import { CanAccess, useNavigation, useShow, useTranslation } from "@refinedev/core";
import { Button, Card, Descriptions, Space, Tag } from "antd";
import { useEffect } from "react";
import { CustomErrorComponent } from "../../error";
import { useNavigate } from "react-router";

export const MachineShow = () => {
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const { result: data } = useShow({
    resource: "machines",
  });

  const record = data;

  useEffect(() => {
    document.title = `${translate("pages.machines.show.title")} | NavetraERP`;
  }, [translate]);

  return (
    <CanAccess
      resource="machines"
      action="show"
      fallback={<CustomErrorComponent status="403" />}
    >
      <Show
        title={translate("pages.machines.show.title")}
        goBack={null}
        headerButtons={
          <Space>
            <RefreshButton
              size="large"  
            />
            <Button
              onClick={() => navigate("/production/machines")}
              size="large"
            >
              <ArrowLeftOutlined/>{translate("pages.machines.buttons.back")}
            </Button>
          </Space>
        }
      >
        <Descriptions title={translate("pages.machines.titles.details")}  column={3} bordered layout="vertical">
          <Descriptions.Item label={translate("pages.machines.titles.name")}>
            {record?.name}
          </Descriptions.Item>
          
          <Descriptions.Item label={translate("pages.machines.titles.code")}>
            {record?.code || "-"}
          </Descriptions.Item>

          <Descriptions.Item label={translate("pages.machines.titles.active")}>
            {record?.active ? (
              <Tag color="green">{translate("selects.machines.options_active.active")}</Tag>
            ) : (
              <Tag color="red">{translate("selects.machines.options_active.inactive")}</Tag>
            )}
          </Descriptions.Item>

          <Descriptions.Item label={translate("pages.machines.titles.description")} span={2}>
            {record?.description || "-"}
          </Descriptions.Item>
        </Descriptions>
      </Show>
    </CanAccess>
  );
};