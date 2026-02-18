import { useTranslation } from "@refinedev/core";

export const useSalesOrderStatus = () => {

    const { translate } = useTranslation(); 

    const SalesOrderStatus = [
        { 
            value: "draft", 
            label: translate("selects.sales_orders.options_status.draft")
        },
        { 
            value: "confirmed", 
            label: translate("selects.sales_orders.options_status.confirmed")
        },
        { 
            value: "delivered", 
            label: translate("selects.sales_orders.options_status.delivered")
        },
        { 
            value: "invoiced", 
            label: translate("selects.sales_orders.options_status.invoiced")
        },
        { 
            value: "closed", 
            label: translate("selects.sales_orders.options_status.closed")
        },
    ];

    return SalesOrderStatus;
};