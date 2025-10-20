import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";

interface Department {
  id: number;
  departmentName: string;
}

interface DepartmentSelectProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const DepartmentSelect: React.FC<DepartmentSelectProps> = ({ value, onChange }) => {
  const [roles, setRoles] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/departments`, {
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
      placeholder="Válassz osztályt"
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      options={roles.map((r) => ({
        label: r.departmentName,
        value: r.id,
      }))}
    />
  );
};
