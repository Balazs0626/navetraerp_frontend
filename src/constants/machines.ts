import { useTranslation } from "@refinedev/core";

export const useMachineActiveStatus = () => {

    const { translate } = useTranslation(); 

    const MachineActiveStatus = [
        { 
            value: true, 
            label: translate("selects.machines.options_active.active")
        },
        { 
            value: false, 
            label: translate("selects.machines.options_active.inactive")
        }
    ];

    return MachineActiveStatus;
};