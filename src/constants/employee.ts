import { useTranslation } from "@refinedev/core";

export const useEmployeeStatus = () => {

    const { translate } = useTranslation(); 

    const EmployeeStatus = [
        { 
            value: "active", 
            label: translate("selects.employees.options_status.active")
        },
        { 
            value: "inactive", 
            label: translate("selects.employees.options_status.inactive")
        },
        { 
            value: "pending", 
            label: translate("selects.employees.options_status.pending")
        },
    ];

    return EmployeeStatus;
};