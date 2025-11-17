export interface IRoleBase {
    name: string;
    active: boolean;
}

export interface IRoleFind extends IRoleBase {
    idRole: number;
    createdAt: string;
    lastModified?: string;
}

export interface IRoleEdit extends IRoleBase {
    idRole: number;
}