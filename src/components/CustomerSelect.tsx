import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useTranslation } from "@refinedev/core";

interface Customer {
  id: number;
  name: string;
}

interface CustomerSelectProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const CustomerSelect: React.FC<CustomerSelectProps> = ({ value, onChange }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const { translate } = useTranslation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/customers`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Customer fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      showSearch
      optionFilterProp="label"
      placeholder={translate("selects.customers.placeholder")}
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      options={customers.map((customer) => ({
        label: customer.name,
        value: customer.id,
      }))}
    />
  );
};
