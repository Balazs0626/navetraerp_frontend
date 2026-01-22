import { useTranslation } from "@refinedev/core";

export const useProductionOrderStatus = () => {

    const { translate } = useTranslation(); 

    const ProductionOrderStatus = [
        { 
            value: "planned", 
            label: translate("selects.production_orders.options.planned")
        },
        { 
            value: "in_progress", 
            label: translate("selects.production_orders.options.in_progress")
        },
        { 
            value: "finished", 
            label: translate("selects.production_orders.options.finished")
        }
    ];

    return ProductionOrderStatus;
};