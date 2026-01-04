import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useTranslation } from "@refinedev/core";

interface SalesOrder {
  id: number;
  orderDate: string;
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
      placeholder={translate("selects.sales_order.placeholder")}
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      options={salesOrders.map((so) => ({
        label: `${so.id} | ${so.orderDate}`,
        value: so.id,
      }))}
    />
  );
};
