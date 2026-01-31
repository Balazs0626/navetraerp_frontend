import { useTranslation } from "@refinedev/core";

export const useStockMovementType = () => {

    const { translate } = useTranslation(); 

    const MovementType = [
        { 
            value: "in", 
            label: translate("selects.stock_movements.options.in")
        },
        { 
            value: "out", 
            label: translate("selects.stock_movements.options.out")
        },
        { 
            value: "transfer", 
            label: translate("selects.stock_movements.options.transfer")
        },
    ];

    return MovementType;
};