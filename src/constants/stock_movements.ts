import { useTranslation } from "@refinedev/core";

export const useStockMovementType = () => {

    const { translate } = useTranslation(); 

    const MovementType = [
        { 
            value: "in", 
            label: translate("selects.stock_movements.options_movement_type.in")
        },
        { 
            value: "out", 
            label: translate("selects.stock_movements.options_movement_type.out")
        },
        { 
            value: "transfer", 
            label: translate("selects.stock_movements.options_movement_type.transfer")
        },
    ];

    return MovementType;
};