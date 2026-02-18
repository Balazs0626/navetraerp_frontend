import { AccessControlProvider } from "@refinedev/core";
import { authProvider } from "./authProvider";

// 1. Konkrét erőforrások és a hozzájuk szükséges jogok
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

// 2. Szülő menüpontok (csoportok)
// Ezeknél elég, ha BÁRMELYIK gyerekhez van joga a usernek
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

    // Alap ellenőrzések
    if (!permissions) return { can: false, reason: "Nincs bejelentkezve" };
    if (!resource) return { can: true };

    // 1. Átalakítjuk a Refine action-t a te jog-formátumodra
    // create -> CREATE, edit -> EDIT, show -> VIEW, list -> VIEW, delete -> DELETE
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
            // Ha valami más action jön, alapból tiltjuk vagy engedjük (igény szerint)
            return { can: false };
    }

    // 2. Összerakjuk az elvárt jog nevét. Pl: "CREATE:WAREHOUSES"
    // Feltételezzük, hogy a resource neve (pl. "warehouses") egyezik a jogban lévővel
    let requiredPermission = `${requiredPrefix}:${resource.toUpperCase()}`;

    if (resource == "employee") {
        requiredPermission = `${requiredPrefix}:EMPLOYEES`;
    }

    // 3. Megnézzük, hogy a usernek megvan-e ez a jog
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