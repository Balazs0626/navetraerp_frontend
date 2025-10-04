import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";

interface Role {
  id: number;
  roleName: string;
}

interface RoleSelectProps {
  value?: number; // form-ból jön
  onChange?: (value: number) => void; // form-nak visszaad
}

export const RoleSelect: React.FC<RoleSelectProps> = ({ value, onChange }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/roles`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Role fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      showSearch
      optionFilterProp="label"
      placeholder="Válassz szerepet"
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      options={roles.map((r) => ({
        label: r.roleName,
        value: r.id,
      }))}
    />
  );
};
