import { useTranslation } from "@refinedev/core";

export const usePurchaseOrderStatus = () => {

    const { translate } = useTranslation(); 

    const PurchaseOrderStatus = [
        { 
            value: "pending", 
            label: translate("selects.purchase_orders.options_status.pending")
        },
        { 
            value: "received", 
            label: translate("selects.purchase_orders.options_status.received")
        },
        { 
            value: "delayed", 
            label: translate("selects.purchase_orders.options_status.delayed")
        },
        { 
            value: "cancelled", 
            label: translate("selects.purchase_orders.options_status.cancelled")
        },
    ];

    return PurchaseOrderStatus;
};