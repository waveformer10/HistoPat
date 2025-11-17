import { AxiosResponse } from "axios";
import { IUserEdit } from "service/@types/user";
import { apiHistopat } from "service/api/ApiHistopat";

export async function editUser(data: IUserEdit) {
    const { idUser, ...rest } = data;
    return await apiHistopat.put(`/api/User/${idUser}`, { ...rest });
}