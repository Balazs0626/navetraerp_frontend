import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useTranslation } from "@refinedev/core";

interface ProductionOrder {
  id: number;
  receiptNumber: string;
  productName: string;
}

interface ProductionOrderSelectProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const ProductionOrderSelect: React.FC<ProductionOrderSelectProps> = ({ value, onChange }) => {
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const { translate } = useTranslation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/production_orders`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setProductionOrders(res.data))
      .catch((err) => console.error("Production order fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      showSearch
      optionFilterProp="label"
      placeholder={translate("selects.production_orders.placeholder")}
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      options={productionOrders.map((po) => ({
        label: `${po.receiptNumber} | ${po.productName}`,
        value: po.id,
      }))}
    />
  );
};
