import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useTranslation } from "@refinedev/core";

interface PurchaseOrder {
  id: number;
  orderDate: string;
}

interface PurchaseOrderSelectProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const PurchaseOrderSelect: React.FC<PurchaseOrderSelectProps> = ({ value, onChange }) => {
  const [purchaseOrders, setPurchaseOrder] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const { translate } = useTranslation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/purchase_orders`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setPurchaseOrder(res.data))
      .catch((err) => console.error("Purchase order fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      showSearch
      optionFilterProp="label"
      placeholder={translate("selects.purchase_order.placeholder")}
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      options={purchaseOrders.map((r) => ({
        label: `${r.id} | ${r.orderDate}`,
        value: r.id,
      }))}
    />
  );
};
