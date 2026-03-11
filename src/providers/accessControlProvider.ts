import { AccessControlProvider } from "@refinedev/core";
import { authProvider } from "./authProvider";

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action }) => {
    const permissions = (await authProvider.getPermissions?.()) as string[] | null;

    if (!permissions) return { can: false, reason: "Nincs bejelentkezve" };
    if (!resource) return { can: true };

    let requiredPrefix = "";
    
    switch (action) {
        case "list":
          requiredPrefix = "VIEW";
          break;
        case "show":
            requiredPrefix = "VIEW";
            break;
        case "create":
            requiredPrefix = "CREATE";
            break;
        case "edit":
            requiredPrefix = "EDIT";
            break;
        case "delete":
            requiredPrefix = "DELETE";
            break;
        default:
            return { can: false };
    }

    let requiredPermission = `${requiredPrefix}:${resource.toUpperCase()}`;

    if (resource == "employee") {
        requiredPermission = `${requiredPrefix}:EMPLOYEES`;
    }


    //idg
    if (resource == "machines") {
        requiredPermission = `${requiredPrefix}:EMPLOYEES`;
    }

    const hasPermission = permissions.includes(requiredPermission);

    

    if (hasPermission) {
        return { can: true };
    } else {
        return { 
            can: false, 
            reason: `Hiányzó jogosultság: ${requiredPermission}` 
        };
    }
  },
};