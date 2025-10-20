import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/url";

interface Shift {
	id: number;
	shiftName: string;
}

interface ShiftSelectProps {
	value?: number;
	onChange?: (value: number) => void;
}

export const ShiftSelect: React.FC<ShiftSelectProps> = ({ value, onChange }) => {
	const [roles, setRoles] = useState<Shift[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${API_URL}/shifts`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				},
			})
			.then((res) => setRoles(res.data))
			.catch((err) => console.error("Shift fetch error:", err))
			.finally(() => setLoading(false));
	}, []);

	return (
		<Select
			showSearch
			optionFilterProp="label"
			placeholder="Válassz műszakot"
			loading={loading}
			value={value}
			onChange={onChange}
			style={{ width: "100%" }}
			options={roles.map((r) => ({
				label: r.shiftName,
				value: r.id,
			}))}
		/>
	);
};
