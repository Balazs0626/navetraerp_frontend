import { useTranslation } from "@refinedev/core";

export const useInvoiceStatus = () => {

    const { translate } = useTranslation(); 

    const InvoiceStatus = [
        { 
            value: "draft", 
            label: translate("selects.invoices.options_status.draft")
        },
        { 
            value: "issued", 
            label: translate("selects.invoices.options_status.issued")
        },
        { 
            value: "paid", 
            label: translate("selects.invoices.options_status.paid")
        }
    ];

    return InvoiceStatus;
};