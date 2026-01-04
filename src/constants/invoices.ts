import { useTranslation } from "@refinedev/core";

export const useInvoiceStatus = () => {

    const { translate } = useTranslation(); 

    const InvoiceStatus = [
        { 
            value: "draft", 
            label: translate("selects.invoices.options.draft")
        },
        { 
            value: "issued", 
            label: translate("selects.invoices.options.issued")
        },
        { 
            value: "paid", 
            label: translate("selects.invoices.options.paid")
        }
    ];

    return InvoiceStatus;
};