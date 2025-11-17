import { AxiosResponse } from "axios";
import { IRoleEdit } from "service/@types/role";
import { apiHistopat } from "service/api/ApiHistopat";

export async function editRole(data: IRoleEdit) {
    const { idRole, ...rest } = data;
    return await apiHistopat.put(`/api/Role/${idRole}`, { ...rest });
}