import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useTranslation } from "@refinedev/core";
import dayjs from "dayjs";
import { IMachineList } from "../interfaces";

interface MachineSelectProps {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export const MachineSelect: React.FC<MachineSelectProps> = ({ value, disabled, onChange }) => {
  const [machines, setMachines] = useState<IMachineList[]>([]);
  const [loading, setLoading] = useState(false);

  const { translate } = useTranslation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/machines`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setMachines(res.data))
      .catch((err) => console.error("Machine fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      disabled={disabled}
      showSearch
      optionFilterProp="label"
      placeholder={translate("selects.machines.placeholder")}
      loading={loading}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      options={machines
        .filter((m: any) => m.active === true)
        .map((m) => ({
          label: `${m.name} | ${m.code}`,
          value: m.id,
        }))
      }
    />
  );
};
