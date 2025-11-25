import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useTranslation } from "@refinedev/core";

interface Product {
  id: number;
  sku: string;
  name: string;
}

interface ProductSelectProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const ProductSelect: React.FC<ProductSelectProps> = ({ value, onChange }) => {
  const [products, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const { translate } = useTranslation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Product fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      showSearch
      optionFilterProp="label"
      placeholder={translate("selects.products.placeholder")}
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      options={products.map((r) => ({
        label: `${r.sku} | ${r.name}`,
        value: r.id,
      }))}
    />
  );
};
