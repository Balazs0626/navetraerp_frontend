
//Felhasználók

export interface IUserList {
    id: number;
    username: string;
    email: string;
    role: string;
}

//Szerepkörök

export interface IRoleList {
    id: number;
    roleName: string;
}

  // HR \\

//Osztályok

export interface IDepartmentList {
    id: number;
    departmentName: string;
    description: string;
}

export interface IDepartmentCreate {
    departmentName: string;
    description: string;
}

//Pozíciók

export interface IPositionList {
    id: number;
    positionName: string;
    description: string;
}

//Műszakok

export interface IShiftList {
    id: number;
    shiftName: string;
    startTime: string;
    endTime: string;
}

//Dolgozók

export interface IEmployeeList {
    id: number;
    fullName: string;
    departmentId: number;
    departmentName: string;
    positionId: number;
    positionName: string;
    hasUser: boolean;
}

export interface IEmployeeCreate {
  firstName: string;
  lastName: string;
  birthDate: string;
  idNumber: string;
  residenceNumber: string;
  healthInsuranceNumber: string;
  taxIdNumber: string;
  hireDate: string;
  departmentId: number;
  positionId: number;
  userId: number;
  email: string;
  phoneNumber: string;
  salary: number;
  status: string;
  addressCountry: string;
  addressRegion: string;
  addressPostCode: string;
  addressCity: string;
  addressFirstLine: string;
  addressSecondLine: string;
  tempAddressCountry: string;
  tempAddressRegion: string;
  tempAddressPostCode: string;
  tempAddressCity: string;
  tempAddressFirstLine: string;
  tempAddressSecondLine: string;
}

//Beosztás

export interface IWorkScheduleList {
    id: number;
    employeeName: string;
    shiftName: string;
    date: string;
}

//Távollétek

export interface ILeaveRequestList {
    id: number;
    employeeName: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    status: string;
}

//Teljesítmény értékelések

export interface IPerfromanceReview {
    id: number;
    employeeName: string;
    reviewDate: string;
    score: number;
    comment: string;
}

  // Main \\

export interface IWarehouseList {
    id: number;
    name: string;
    address: string;
    managerName: string;
}

export interface IProductList {
    id: number;
    sku: string;
    name: string;
    unit: string;
    active: boolean;
}

export interface IProductCreate {
    sku: string;
    name: string;
    unit: string;
    pricePerUnit: number;
    active: string;
    description: string;
    createdAt: string;
}

  // Beszerzés \\

export interface ISupplierList {
    id: number;
    name: string;
    contactPerson: string;
    email: string;
    phoneNumber: string;
}

export interface IPurchaseOrderList {
    id: number;
    orderDate: string;
    expectedDeliveryDate: string;
    status: string;
}

export interface IGoodsReceiptList {
    id: number;
    purchaseOrderId: number;
    warehouseName: string;
    receiptDate: string;
}

  // Értékesítés \\

export interface ICustomerList {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
}

export interface ISalesOrderList {
    id: number;
    orderDate: string;
    requiredDeliveryDate: string;
    status: string;
}

export interface IInvoiceList {
    id: number;
    invoiceDate: string;
    dueDate: string;
    status: string;
}