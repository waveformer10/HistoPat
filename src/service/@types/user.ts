export interface IUserBase {
    name: string;
    active: boolean;
}

export interface IUserFind extends IUserBase {
    idUser: number;
    idRoles: number[];
    createdAt: string;
    lastModified?: string;
}

export interface IUserEdit extends IUserBase {
    idUser: number;
}