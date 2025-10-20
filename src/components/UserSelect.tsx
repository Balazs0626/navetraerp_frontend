import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";

interface User {
  id: number;
  username: string;
}

interface UserSelectProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const UserSelect: React.FC<UserSelectProps> = ({ value, onChange }) => {
  const [roles, setRoles] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("User fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      allowClear
      showSearch
      optionFilterProp="label"
      placeholder="Válassz felhasználót"
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      options={roles.map((r) => ({
        label: r.username,
        value: r.id,
      }))}
    />
  );
};
