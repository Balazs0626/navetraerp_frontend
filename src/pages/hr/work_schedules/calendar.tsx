import { useEffect, useRef } from "react";
import { CanAccess, useList, usePermissions, useTranslation } from "@refinedev/core";
import { Calendar, Badge, Spin, Typography, Card, Button, Tooltip, Alert, Divider } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, InfoCircleOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { CustomErrorComponent } from "../../error";

const { Text } = Typography;

export const WorkSchedulesCalendar = () => {
  const { result, query } = useList({
    resource: "work_schedules",
  });

  const work_schedules = result?.data ?? [];

  const { translate } = useTranslation();
  const navigate = useNavigate();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = `${translate("pages.work_schedules.list.title")} | NavetraERP`;
  })

  const lastClickRef = useRef<{ time: number; date: string } | null>(null);

  const onSelect = (value: any) => {
    const clickedDate = value.format("YYYY-MM-DD");
    const now = Date.now();

    if (
      lastClickRef.current &&
      lastClickRef.current.date === clickedDate &&
      now - lastClickRef.current.time < 400
    ) {
      if (permissions?.includes("CREATE:WORK_SCHEDULES")) {
        navigate(`/hr/work_schedules/create?date=${clickedDate}`);
      }
    } else {
      lastClickRef.current = { time: now, date: clickedDate };
    }
  }

  const dateCellRender = (value: any) => {
    const date = value.format("YYYY-MM-DD");

    const daily = work_schedules.filter(
      (b: any) => dayjs(b.date).format("YYYY-MM-DD") === date
    );

    if (daily.length === 0) return null;

    return (
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {daily.map((item) => (
          <li key={item.id} style={{ marginBottom: 4 }}>
            <Badge
              color={
                item.startTime === "08:00:00" && item.endTime === "16:00:00"
                  ? "green"
                : (item.startTime === "06:00:00" && item.endTime === "14:00:00")
                  ? "orange"
                : item.startTime === "14:00:00" && item.endTime === "22:00:00"
                  ? "pink"
                : item.startTime === "22:00:00" && item.endTime === "06:00:00"
                  ? "red"
                : "purple"
              }
              text={
                <>
                  <Text strong>
                    {item.employeeName}
                  </Text>
                  <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {item.shiftName} | {item.startTime.slice(0, 5)} - {item.endTime.slice(0, 5)}
                    </Text>
                  </div>
                </>
              }
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <CanAccess 
      resource="work_schedules" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <Alert
        type="info"
        description={translate("pages.work_schedules.titles.info")}
        showIcon
      />
      <Divider/>
      <Card
        type="inner"
        title={translate("pages.work_schedules.titles.calendar")}
        extra={
          <div
            style={{
              display: "flex",
              gap: 8
            }}
          >
            <Button icon={<UnorderedListOutlined/>} size="large" onClick={() => navigate("/hr/work_schedules")}>
              {translate("pages.work_schedules.buttons.list")}
            </Button>
            <Button icon={<ArrowLeftOutlined/>} size="large" onClick={() => navigate("/hr")}>
              {translate("buttons.back_module")}
            </Button>
          </div>
        }
      > 
        <Calendar
            fullscreen
            dateCellRender={dateCellRender}
            defaultValue={dayjs()}
            onSelect={onSelect}
        />
      </Card>
    </CanAccess>
  );
};
