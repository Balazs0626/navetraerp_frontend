import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useTranslation } from "@refinedev/core";

interface Warehouse {
  id: number;
  name: string;
}

interface WarehouseSelectProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const WarehouseSelect: React.FC<WarehouseSelectProps> = ({ value, onChange }) => {
  const [warehouses, setWarehouse] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(false);

  const { translate } = useTranslation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/warehouses`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setWarehouse(res.data))
      .catch((err) => console.error("Warehouse order fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      showSearch
      optionFilterProp="label"
      placeholder={translate("selects.warehouses.placeholder")}
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      options={warehouses.map((r) => ({
        label: `${r.name}`,
        value: r.id,
      }))}
    />
  );
};
