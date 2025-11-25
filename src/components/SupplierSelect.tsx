import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useTranslation } from "@refinedev/core";

interface Supplier {
  id: number;
  name: string;
}

interface SupplierSelectProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const SupplierSelect: React.FC<SupplierSelectProps> = ({ value, onChange }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);

  const { translate } = useTranslation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/suppliers`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.error("Supplier fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      showSearch
      optionFilterProp="label"
      placeholder={translate("selects.suppliers.placeholder")}
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      options={suppliers.map((r) => ({
        label: r.name,
        value: r.id,
      }))}
    />
  );
};
