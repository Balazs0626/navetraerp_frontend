import { Select, Tag } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useTranslation } from "@refinedev/core";

interface Product {
  id: number;
  sku: string;
  name: string;
  unit: string;
}

interface InventoryItem {
  productId: number;
  quantity: number;
}

// Kiterjesztett típus a kijelzéshez
interface ProductWithStock extends Product {
  stock?: number;
}

interface ProductSelectProps {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export const ProductWithStockSelect: React.FC<ProductSelectProps> = ({ value, disabled, onChange }) => {
  const [products, setProducts] = useState<ProductWithStock[]>([]);
  const [loading, setLoading] = useState(false);
  const { translate } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = sessionStorage.getItem("token"); // Figyelj: sessionStorage-t írtál a kódban, nem localStorage-ot!
      const headers = { Authorization: `Bearer ${token}` };

      try {
        // Párhuzamos lekérés a gyorsaságért
        const [prodRes, invRes] = await Promise.all([
          axios.get<Product[]>(`${API_URL}/products`, { headers }),
          axios.get<InventoryItem[]>(`${API_URL}/inventory_items`, { headers })
        ]);

        // Összefésülés: minden termékhez megkeressük a készletét
        const enrichedProducts = prodRes.data.map(p => ({
          ...p,
          stock: invRes.data.find(i => i.productId === p.id)?.quantity || 0
        }));

        setProducts(enrichedProducts);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Select
      disabled={disabled}
      showSearch
      optionFilterProp="filterLabel" // Egyedi filter labelt használunk
      placeholder={translate("selects.products.placeholder")}
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
    >
      {products.map((r) => (
        <Select.Option 
          key={r.id} 
          value={r.id} 
          filterLabel={`${r.sku} ${r.name}`} // Hogy a keresés működjön a névre is
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              <b>{r.sku}</b> | {r.name}
            </span>
            <Tag color={r.stock && r.stock > 0 ? "green" : "red"}>
              {r.stock} {r.unit}
            </Tag>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};