import { useTranslation } from "@refinedev/core";

export const useProductionOrderStatus = () => {

    const { translate } = useTranslation(); 

    const ProductionOrderStatus = [
        { 
            value: "planned", 
            label: translate("selects.production_orders.options_status.planned")
        },
        { 
            value: "in_progress", 
            label: translate("selects.production_orders.options_status.in_progress")
        },
        { 
            value: "finished", 
            label: translate("selects.production_orders.options_status.finished")
        }
    ];

    return ProductionOrderStatus;
};