import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useRolesData } from "../constants/roles";
import { useTranslation } from "@refinedev/core";

interface Role {
  id: number;
  roleName: string;
}

interface RoleSelectProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const RoleSelect: React.FC<RoleSelectProps> = ({ value, onChange }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  const { translate } = useTranslation();

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
      placeholder={translate("selects.roles.placeholder")}
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
