import { useTranslation } from "@refinedev/core";

export const usePurchaseOrderStatus = () => {

    const { translate } = useTranslation(); 

    const PurchaseOrderStatus = [
        { 
            value: "pending", 
            label: translate("selects.purchase_orders.options.pending")
        },
        { 
            value: "received", 
            label: translate("selects.purchase_orders.options.received")
        },
        { 
            value: "delayed", 
            label: translate("selects.purchase_orders.options.delayed")
        },
        { 
            value: "cancelled", 
            label: translate("selects.purchase_orders.options.cancelled")
        },
    ];

    return PurchaseOrderStatus;
};