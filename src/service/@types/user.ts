export interface IUserBase {
    name: string;
    active: boolean;
}

export interface IRole extends IUserBase {
    idRole: number
}

export interface IUserSave {
    name: string;
    roleId?: number;
    userName: string;
    password: string;
    active: boolean;
}

export interface IUserFind extends IUserBase {
    idUser: number;
    idRoles: IRole[];
    createdAt: string;
    lastModified?: string;
}

export interface IUserEdit extends IUserBase {
    idUser: number;
    idRoles: IRole[];
}

export interface UserLogin {
    UserName: string;
    Password: string;
}