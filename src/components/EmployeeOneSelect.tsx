import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";
import { useTranslation } from "@refinedev/core";

interface EmployeeOne {
    id: number;
    fullName: string;
}

interface EmployeeOneSelectProps {
    value?: number;
    onChange?: (value: number) => void;
}

export const EmployeeOneSelect: React.FC<EmployeeOneSelectProps> = ({ value, onChange }) => {
    const [employees, setEmployees] = useState<EmployeeOne[]>([]);
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
            .then((res) => setEmployees(res.data))
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
            onChange={onChange}
            style={{ width: "100%" }}
            options={employees.map((e) => ({
                label: e.fullName,
                value: e.id,
            }))}
        />
    );
};
