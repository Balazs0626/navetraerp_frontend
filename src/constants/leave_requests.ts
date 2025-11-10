import { useTranslation } from "@refinedev/core";

export const useLeaveRequestStatus = () => {

    const { translate } = useTranslation(); 

    const LeaveRequestStatus = [
        { 
            value: "approved", 
            label: translate("selects.leave_requests.options_status.approved")
        },
        { 
            value: "rejected", 
            label: translate("selects.leave_requests.options_status.rejected")
        },
        { 
            value: "pending", 
            label: translate("selects.leave_requests.options_status.pending")
        },
    ];

    return LeaveRequestStatus;
};

export const useLeaveRequestType = () => {

    const { translate } = useTranslation(); 

    const LeaveRequestType = [
        { 
            value: "paid_leave", 
            label: translate("selects.leave_requests.options_type.paid_leave")
        },
        { 
            value: "sick_leave", 
            label: translate("selects.leave_requests.options_type.sick_leave")
        },
        { 
            value: "unpaid_leave", 
            label: translate("selects.leave_requests.options_type.unpaid_leave")
        },
        { 
            value: "business_trip", 
            label: translate("selects.leave_requests.options_type.business_trip")
        },
        { 
            value: "training", 
            label: translate("selects.leave_requests.options_type.training")
        },
        { 
            value: "unexcused_absence", 
            label: translate("selects.leave_requests.options_type.unexcused_absence")
        },
    ];

    return LeaveRequestType;
};