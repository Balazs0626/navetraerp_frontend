import { useTranslation } from '@refinedev/core';

export const useEmployeeStatus = () => {

    const { translate } = useTranslation(); 

    const EmployeeStatus = [
        { 
            value: 'active', 
            label: translate('common.status_options.active')
        },
        { 
            value: 'inactive', 
            label: translate('common.status_options.inactive')
        },
        { 
            value: 'pending', 
            label: translate('common.status_options.pending')
        },
    ];

    return EmployeeStatus;
};