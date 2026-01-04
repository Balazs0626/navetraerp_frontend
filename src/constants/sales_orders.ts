import { useTranslation } from "@refinedev/core";

export const useSalesOrderStatus = () => {

    const { translate } = useTranslation(); 

    const SalesOrderStatus = [
        { 
            value: "draft", 
            label: translate("selects.sales_orders.options.draft")
        },
        { 
            value: "confirmed", 
            label: translate("selects.sales_orders.options.confirmed")
        },
        { 
            value: "delivered", 
            label: translate("selects.sales_orders.options.delivered")
        },
        { 
            value: "invoiced", 
            label: translate("selects.sales_orders.options.invoiced")
        },
        { 
            value: "closed", 
            label: translate("selects.sales_orders.options.closed")
        },
    ];

    return SalesOrderStatus;
};