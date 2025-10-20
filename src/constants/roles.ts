import { useTranslation } from "@refinedev/core";

export const useRolesData = () => {

    const { translate } = useTranslation();

    const Roles = [
        { label: translate("constants.roles.users.view"), value: "VIEW:USERS" },
        { label: translate("constants.roles.users.create"), value: "CREATE:USERS" },
        { label: translate("constants.roles.users.edit"), value: "EDIT:USERS" },
        { label: translate("constants.roles.users.delete"), value: "DELETE:USERS" }
    ];

    return Roles;
};