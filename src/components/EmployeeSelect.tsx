import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useTranslation } from "@refinedev/core";

interface Employee {
  id: number;
  fullName: string;
  departmentName: string;
  positionName: string;
}

interface EmployeeSelectProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const EmployeeSelect: React.FC<EmployeeSelectProps> = ({ value, onChange }) => {
  const [roles, setRoles] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  const { translate } = useTranslation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/employee`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Employee fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      showSearch
      optionFilterProp="label"
      placeholder={translate("selects.employees.placeholder")}
      loading={loading}
      value={value}
      mode="multiple"
      onChange={onChange}
      style={{ width: "100%" }}
      options={roles.map((r) => ({
        label: `${r.fullName} | ${r.departmentName} | ${r.positionName}`,
        value: r.id,
      }))}
    />
  );
};
