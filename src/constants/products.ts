import { useTranslation } from "@refinedev/core";

export const useProductActiveStatus = () => {

    const { translate } = useTranslation(); 

    const ProductActiveStatus = [
        { 
            value: true, 
            label: translate("selects.products.options_active.active")
        },
        { 
            value: false, 
            label: translate("selects.products.options_active.inactive")
        }
    ];

    return ProductActiveStatus;
};