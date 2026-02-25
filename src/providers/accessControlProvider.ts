import { AccessControlProvider } from "@refinedev/core";
import { authProvider } from "./authProvider";

const resourcePermissions: Record<string, string[]> = {
  company_data: ["VIEW:COMPANY_DATA"], 
  warehouses: ["VIEW:WAREHOUSES"],
  products: ["VIEW:PRODUCTS"],
  users: ["VIEW:USERS"],
  roles: ["VIEW:ROLES"],
  employee: ["VIEW:EMPLOYEES"],
  departments: ["VIEW:DEPARTMENTS"],
  positions: ["VIEW:POSITIONS"],
  shifts: ["VIEW:SHIFTS"],
  work_schedules: ["VIEW:WORK_SCHEDULES"],
  leave_requests: ["VIEW:LEAVE_REQUESTS"],
  performance_reviews: ["VIEW:PERFORMANCE_REVIEWS"],
  suppliers: ["VIEW:SUPPLIERS"],
  purchase_orders: ["VIEW:PURCHASE_ORDERS"],
  goods_receipts: ["VIEW:GOODS_RECEIPTS"],
  customers: ["VIEW:CUSTOMERS"],
  sales_orders: ["VIEW:SALES_ORDERS"],
  invoices: ["VIEW:INVOICES"],
  production_orders: ["VIEW:PRODUCTION_ORDERS"],
  production_outputs: ["VIEW:PRODUCTION_OUTPUTS"],
  inventory_items: ["VIEW:INVENTORY_ITEMS"],
  stock_movements: ["VIEW:STOCK_MOVEMENTS"],
  inventory_counts: ["VIEW:INVENTORY_COUNTS"],
};

const parentModules: Record<string, string[]> = {
  administrator: ["VIEW:USERS", "VIEW:ROLES"],
  hr: ["VIEW:EMPLOYEES", "VIEW:DEPARTMENTS", "VIEW:POSITIONS", "VIEW:SHIFTS", "VIEW:WORK_SCHEDULES", "VIEW:LEAVE_REQUESTS", "VIEW:PERFORMANCE_REVIEWS"],
  procurement: ["VIEW:SUPPLIERS", "VIEW:PURCHASE_ORDERS", "VIEW:GOODS_RECEIPTS"],
  sales: ["VIEW:CUSTOMERS", "VIEW:SALES_ORDERS", "VIEW:INVOICES"],
  production: ["VIEW:PRODUCTION_ORDERS", "VIEW:PRODUCTION_OUTPUTS"],
  inventory: ["VIEW:INVENTORY_ITEMS", "VIEW:STOCK_MOVEMENTS", "VIEW:INVENTORY_COUNTS"],
};

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