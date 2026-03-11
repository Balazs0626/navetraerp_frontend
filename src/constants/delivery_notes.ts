import { useTranslation } from "@refinedev/core";

export const useDeliveryNoteStatus = () => {

    const { translate } = useTranslation(); 

    const DeliveryNoteStatus = [
        { 
            value: "draft", 
            label: translate("selects.delivery_notes.options_status.draft")
        },
        { 
            value: "shipped", 
            label: translate("selects.delivery_notes.options_status.shipped")
        },
        { 
            value: "delivered", 
            label: translate("selects.delivery_notes.options_status.delivered")
        },
        { 
            value: "cancelled", 
            label: translate("selects.delivery_notes.options_status.cancelled")
        }
    ];

    return DeliveryNoteStatus;
};