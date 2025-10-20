
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
    departmentName: string;
    positionName: string;
    hasUser: boolean;
}

//Beosztás

export interface IWorkScheduleList {
    id: number;
    employeeName: string;
    shiftName: string;
    date: string;
}