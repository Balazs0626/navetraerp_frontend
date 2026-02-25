import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useTranslation } from "@refinedev/core";
import dayjs from "dayjs";

interface SalesOrder {
  id: number;
  orderDate: string;
  receiptNumber: string;
  status: string;
}

interface SalesOrderSelectProps {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export const SalesOrderSelect: React.FC<SalesOrderSelectProps> = ({ value, disabled, onChange }) => {
  const [salesOrders, setSalesOrder] = useState<SalesOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const { translate } = useTranslation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/sales_orders`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setSalesOrder(res.data))
      .catch((err) => console.error("Sales order fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      disabled={disabled}
      showSearch
      optionFilterProp="label"
      placeholder={translate("selects.sales_orders.placeholder")}
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      options={salesOrders
        .filter((so: any) => so.status !== "closed" && so.status !== "invoiced")
        .map((so) => ({
          label: `${so.receiptNumber} | ${dayjs(so.orderDate).format("YYYY. MM. DD.")}`,
          value: so.id,
        }))
      }
    />
  );
};
