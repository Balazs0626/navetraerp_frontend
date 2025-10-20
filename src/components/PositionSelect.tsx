import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";

interface Position {
  id: number;
  positionName: string;
}

interface PositionSelectProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const PositionSelect: React.FC<PositionSelectProps> = ({ value, onChange }) => {
  const [roles, setRoles] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/positions`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Department fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      showSearch
      optionFilterProp="label"
      placeholder="Válassz pozíciót"
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      options={roles.map((r) => ({
        label: r.positionName,
        value: r.id,
      }))}
    />
  );
};
