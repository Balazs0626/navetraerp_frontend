
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